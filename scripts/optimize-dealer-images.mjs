#!/usr/bin/env node
/**
 * Generate display-sized WebP derivatives for the dealer Next.js public tree.
 * Reads masters from assets/image-sources, writes to public/images.
 *
 * Usage:
 *   node scripts/optimize-dealer-images.mjs
 *   node scripts/optimize-dealer-images.mjs --skip-copy
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_IMAGES = path.join(ROOT, "public", "images");
const SOURCES = path.join(ROOT, "assets", "image-sources");
const MANIFEST_PATH = path.join(ROOT, "docs", "dealer-image-slots.json");
const REWRITE_MAP_PATH = path.join(ROOT, "scripts", ".image-rewrite-map.json");

const WEBP_QUALITY = 80;
const CARD_W = 320;
const CARD_H = 798;
const CARD_DPR = 2;
const SWATCH_W = 138;
const SWATCH_H = 194;
const SKIP_COPY = process.argv.includes("--skip-copy");

const RASTER_EXT = new Set([".webp", ".jpg", ".jpeg", ".png", ".gif", ".avif"]);

/** Unique catalog card images that currently point at modal gallery files. */
const GALLERY_CARDS = [
  ["wall-sml-pvc", "product-modal/wall-sml-pvc/gallery/sten-panel-winal-sml-pvh-2.jpg"],
  ["wall-sml-hpl", "product-modal/wall-sml-hpl/gallery/sten-panel-sml-hpl-sk.jpg"],
  ["wall-polymer-shared", "product-modal/wall-polymer-shared/gallery/sten-panel-sml-winal-high-glow-premium-1.jpg"],
  ["wall-gkl-pvc", "product-modal/wall-gkl-pvc/gallery/panel-gkl-pvh.jpg"],
  ["wall-gsp-pvc", "product-modal/wall-gsp-pvc/gallery/panel-akril-gkl-gvlv-5.jpg"],
  ["slat-sml-acryl", "product-modal/slat-sml-acryl/gallery/paneli-reechnie-negoruchie-derevo-winal-1.jpg"],
  ["slat-sml-pvc", "product-modal/slat-sml-pvc/gallery/paneli-reechnie-negoruchie-derevo-winal-2.jpg"],
  ["slat-sml-hpl", "product-modal/slat-sml-hpl/gallery/paneli-reechnie-hpl-sml-alumini-lm1003.jpg"],
];

/** object-position baked into catalog card crops (filename → CSS position). */
const CARD_OBJECT_POSITION = {
  "soundcore-25.webp": "right center",
  "invisible-basic.webp": "left center",
  "invisible-clean.webp": "65% center",
  "card-invisible.webp": "46% center",
  "card-profiles.webp": "40% center",
  "card-plinths.webp": "40% center",
  "card-cloud-system-w.webp": "55% center",
  "card-cloud-system-c.webp": "55% center",
  "plinth-hidden.webp": "center 56%",
};

const FEATURE_CARDS = new Set([
  "feature-card-acoustic.webp",
  "feature-card-geometry.webp",
  "feature-card-joints.webp",
  "feature-card-surface.webp",
]);

const DESIGN_CARDS = {
  "design-card-ufr.webp": "center bottom",
  "design-card-ral.webp": "50% 50%",
  "design-card-veneer.webp": "50% 50%",
  "design-card-patterns.webp": "50% 50%",
};

function parseObjectPosition(value = "50% 50%") {
  const parts = String(value).trim().split(/\s+/);
  const kwX = { left: 0, center: 0.5, right: 1 };
  const kwY = { top: 0, center: 0.5, bottom: 1 };
  const parseToken = (token, axis) => {
    if (token.endsWith("%")) {
      const n = Number.parseFloat(token);
      return Number.isFinite(n) ? Math.min(1, Math.max(0, n / 100)) : 0.5;
    }
    const map = axis === "x" ? kwX : kwY;
    if (token in map) return map[token];
    return 0.5;
  };
  if (parts.length === 1) {
    if (parts[0] === "top" || parts[0] === "bottom") {
      return { x: 0.5, y: parseToken(parts[0], "y") };
    }
    return { x: parseToken(parts[0], "x"), y: 0.5 };
  }
  return { x: parseToken(parts[0], "x"), y: parseToken(parts[1], "y") };
}

function coverExtract(srcW, srcH, destW, destH, pos) {
  const { x: px, y: py } = parseObjectPosition(pos);
  const scale = Math.max(destW / srcW, destH / srcH);
  const overflowX = srcW * scale - destW;
  const overflowY = srcH * scale - destH;
  let left = (overflowX / scale) * px;
  let top = (overflowY / scale) * py;
  let width = destW / scale;
  let height = destH / scale;
  left = Math.max(0, Math.round(left));
  top = Math.max(0, Math.round(top));
  width = Math.max(1, Math.round(width));
  height = Math.max(1, Math.round(height));
  if (left + width > srcW) width = srcW - left;
  if (top + height > srcH) height = srcH - top;
  return { left, top, width, height };
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function relFrom(abs, root) {
  return path.relative(root, abs).split(path.sep).join("/");
}

function publicUrl(relPosix) {
  return `/images/${relPosix}`;
}

function toWebpRel(relPosix) {
  return relPosix.replace(/\.(jpe?g|png|gif|avif)$/i, ".webp");
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function classify(relPosix) {
  const name = path.posix.basename(relPosix);
  const dir = path.posix.dirname(relPosix);

  if (relPosix.includes("/_sources/")) return { role: "source-only" };
  if (dir === "catalog" && name.endsWith(".webp") && !name.startsWith("icon-") && !name.startsWith("logo-") && !name.startsWith("tab-") && !name.startsWith("pagination")) {
    return { role: "catalog-card", pos: CARD_OBJECT_POSITION[name] || "50% 50%" };
  }
  if ((relPosix.includes("/coatings/") || name.startsWith("coating-")) && !relPosix.includes("/full/")) {
    return { role: "coating-swatch" };
  }
  if (dir === "home" && FEATURE_CARDS.has(name)) {
    return { role: "feature-card" };
  }
  if (dir === "home" && name in DESIGN_CARDS) {
    return { role: "design-card", pos: DESIGN_CARDS[name] };
  }
  if (dir === "home" && name === "surface-main-image.webp") {
    return { role: "surface-main" };
  }
  if (dir === "home" && (name === "hero-video-poster.webp" || name === "decor-w-left.webp" || name === "decor-glass-logo.webp")) {
    return { role: "home-fit", maxSide: 1920 };
  }
  if (relPosix.startsWith("home/cases/")) {
    if (name.startsWith("thumb.")) return { role: "case-thumb" };
    if (name.startsWith("product-")) return { role: "case-product" };
    if (name.startsWith("gallery-") || name.startsWith("hero.")) return { role: "fit", maxSide: 1600 };
    return { role: "fit", maxSide: 1600 };
  }
  if (relPosix.startsWith("product-modal/")) {
    return { role: "fit", maxSide: 1600 };
  }
  if (relPosix.startsWith("home/")) {
    return { role: "fit", maxSide: 1600 };
  }
  return { role: "fit", maxSide: 1600 };
}

async function writeWebp(pipeline, destAbs, { width, height } = {}) {
  ensureDir(destAbs);
  let img = pipeline.webp({ quality: WEBP_QUALITY, effort: 4 });
  if (width && height) {
    img = pipeline.resize(width, height, { fit: "fill" }).webp({ quality: WEBP_QUALITY, effort: 4 });
  }
  await img.toFile(destAbs);
}

async function processCover(srcAbs, destAbs, destW, destH, pos) {
  const meta = await sharp(srcAbs, { failOn: "none" }).metadata();
  const srcW = meta.width || destW;
  const srcH = meta.height || destH;
  const outW = Math.round(destW * CARD_DPR);
  const outH = Math.round(destH * CARD_DPR);
  const extract = coverExtract(srcW, srcH, destW, destH, pos);
  const targetW = Math.min(outW, extract.width * CARD_DPR);
  const targetH = Math.min(outH, extract.height * CARD_DPR);
  await sharp(srcAbs, { failOn: "none" })
    .extract(extract)
    .resize(Math.max(1, Math.round(targetW)), Math.max(1, Math.round(targetH)), { fit: "fill" })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(destAbs);
  return { extract, outW: Math.round(targetW), outH: Math.round(targetH), srcW, srcH };
}

async function processFit(srcAbs, destAbs, maxSide) {
  const meta = await sharp(srcAbs, { failOn: "none" }).metadata();
  const srcW = meta.width || maxSide;
  const srcH = meta.height || maxSide;
  const long = Math.max(srcW, srcH);
  const img = sharp(srcAbs, { failOn: "none" }).rotate();
  if (long > maxSide) {
    await img
      .resize({ width: srcW >= srcH ? maxSide : undefined, height: srcH > srcW ? maxSide : undefined, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(destAbs);
  } else {
    await img.webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(destAbs);
  }
  const out = await sharp(destAbs).metadata();
  return { srcW, srcH, outW: out.width, outH: out.height };
}

function copySources() {
  if (!fs.existsSync(PUBLIC_IMAGES)) {
    throw new Error(`Missing ${PUBLIC_IMAGES}`);
  }
  fs.mkdirSync(SOURCES, { recursive: true });
  console.log("Copying public/images → assets/image-sources …");
  execSync(`rsync -a --delete "${PUBLIC_IMAGES}/" "${SOURCES}/"`, { stdio: "inherit" });
}

function removePublicOriginals(relPosix, wroteWebpRel) {
  const originalPublic = path.join(PUBLIC_IMAGES, relPosix);
  const webpPublic = path.join(PUBLIC_IMAGES, wroteWebpRel);
  if (originalPublic !== webpPublic && fs.existsSync(originalPublic)) {
    fs.unlinkSync(originalPublic);
  }
}

async function main() {
  if (!SKIP_COPY) {
    copySources();
  }
  if (!fs.existsSync(SOURCES)) {
    throw new Error("assets/image-sources is missing; run without --skip-copy first");
  }

  const files = walk(SOURCES).filter((abs) => RASTER_EXT.has(path.extname(abs).toLowerCase()));
  const rewrite = {};
  const manifest = {
    generatedAt: new Date().toISOString(),
    cardSlot: { width: CARD_W, height: CARD_H, dpr: CARD_DPR, note: "union of homepage hover and T-02A lab boxes" },
    files: [],
  };

  let processed = 0;
  let skipped = 0;

  for (const srcAbs of files) {
    const relPosix = relFrom(srcAbs, SOURCES);
    const cls = classify(relPosix);

    if (cls.role === "source-only") {
      const leftover = path.join(PUBLIC_IMAGES, relPosix);
      if (fs.existsSync(leftover)) fs.unlinkSync(leftover);
      skipped += 1;
      continue;
    }

    const webpRel = toWebpRel(relPosix);
    const destAbs = path.join(PUBLIC_IMAGES, webpRel);
    ensureDir(destAbs);

    const fromUrl = publicUrl(relPosix);
    const toUrl = publicUrl(webpRel);
    if (fromUrl !== toUrl) rewrite[fromUrl] = toUrl;

    try {
      if (cls.role === "catalog-card") {
        const info = await processCover(srcAbs, destAbs, CARD_W, CARD_H, cls.pos);
        manifest.files.push({ rel: webpRel, role: cls.role, pos: cls.pos, ...info });
      } else if (cls.role === "coating-swatch") {
        await processCover(srcAbs, destAbs, SWATCH_W, SWATCH_H, "center top");
        const fullRel = path.posix.join(path.posix.dirname(webpRel), "full", path.posix.basename(webpRel));
        const fullAbs = path.join(PUBLIC_IMAGES, fullRel);
        ensureDir(fullAbs);
        await processFit(srcAbs, fullAbs, 1600);
        manifest.files.push({ rel: webpRel, role: "coating-swatch", full: fullRel });
      } else if (cls.role === "feature-card") {
        await processCover(srcAbs, destAbs, 284, 184, "50% 50%");
        manifest.files.push({ rel: webpRel, role: cls.role });
      } else if (cls.role === "design-card") {
        await processCover(srcAbs, destAbs, 332, 575, cls.pos);
        manifest.files.push({ rel: webpRel, role: cls.role, pos: cls.pos });
      } else if (cls.role === "surface-main") {
        await processCover(srcAbs, destAbs, 860, 840, "50% 50%");
        manifest.files.push({ rel: webpRel, role: cls.role });
      } else if (cls.role === "case-thumb") {
        await processCover(srcAbs, destAbs, 242, 115, "50% 50%");
        manifest.files.push({ rel: webpRel, role: cls.role });
      } else if (cls.role === "case-product") {
        await processCover(srcAbs, destAbs, 124, 124, "50% 50%");
        manifest.files.push({ rel: webpRel, role: cls.role });
      } else {
        const maxSide = cls.maxSide || 1600;
        await processFit(srcAbs, destAbs, maxSide);
        manifest.files.push({ rel: webpRel, role: "fit", maxSide });
      }
      removePublicOriginals(relPosix, webpRel);
      processed += 1;
      if (processed % 25 === 0) console.log(`processed ${processed}/${files.length}`);
    } catch (error) {
      console.error(`FAIL ${relPosix}:`, error.message);
    }
  }

  fs.mkdirSync(path.join(PUBLIC_IMAGES, "catalog", "cards"), { recursive: true });
  for (const [id, sourceRel] of GALLERY_CARDS) {
    const srcAbs = path.join(SOURCES, sourceRel);
    if (!fs.existsSync(srcAbs)) {
      console.error(`missing gallery card source ${sourceRel}`);
      continue;
    }
    const destRel = `catalog/cards/${id}.webp`;
    const destAbs = path.join(PUBLIC_IMAGES, destRel);
    await processCover(srcAbs, destAbs, CARD_W, CARD_H, "50% 50%");
    const fromUrl = publicUrl(sourceRel);
    const toUrl = publicUrl(destRel);
    rewrite[`__catalog_card__${fromUrl}`] = toUrl;
    manifest.files.push({ rel: destRel, role: "catalog-card-from-gallery", source: sourceRel, id });
    processed += 1;
  }

  ensureDir(MANIFEST_PATH);
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  fs.writeFileSync(REWRITE_MAP_PATH, JSON.stringify(rewrite, null, 2));
  console.log(`done processed=${processed} skipped=${skipped} rewriteKeys=${Object.keys(rewrite).length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
