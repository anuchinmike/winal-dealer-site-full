import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = "/home/magency/projects/winal-dealer-site/site";
const SRC = path.join(ROOT, "assets/image-sources");
const OUT = path.join(ROOT, "public/images/catalog/case-tiles");
const MAX_SIDE = 496;

/** Uncropped catalog-card sources. Gallery JPEGs match GALLERY_CARDS in optimize-dealer-images.mjs. */
const sources = {
  "wall-sml-hpl": "product-modal/wall-sml-hpl/gallery/sten-panel-sml-hpl-sk.jpg",
  "wall-sml-pvc": "product-modal/wall-sml-pvc/gallery/sten-panel-winal-sml-pvh-2.jpg",
  "wall-sml-polymer": "product-modal/wall-polymer-shared/gallery/sten-panel-sml-winal-high-glow-premium-1.jpg",
  "invisible-reverse": "catalog/invisible-reverse.webp",
  ufr: "catalog/ufr-print.webp",
  "cloud-i": "catalog/card-cloud-system-i.webp",
  "cloud-b": "catalog/card-cloud-system-b.webp",
  "family-wisound": "catalog/card-wisound.webp",
  "soundcore-25": "catalog/soundcore-25.webp",
  "mounting-profiles": "catalog/mounting-profiles.webp",
};

fs.mkdirSync(OUT, { recursive: true });

for (const [id, file] of Object.entries(sources)) {
  const input = path.join(SRC, file);
  if (!fs.existsSync(input)) {
    throw new Error(`Missing source: ${input}`);
  }

  const meta = await sharp(input).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (!width || !height) {
    throw new Error(`No dimensions for ${input}`);
  }

  const scale = Math.min(1, MAX_SIDE / Math.max(width, height));
  const nextWidth = Math.max(1, Math.round(width * scale));
  const nextHeight = Math.max(1, Math.round(height * scale));
  const output = path.join(OUT, `${id}.webp`);

  await sharp(input)
    .resize(nextWidth, nextHeight, { fit: "fill", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output);

  const stat = fs.statSync(output);
  console.log(
    `${id} ${width}x${height} -> ${nextWidth}x${nextHeight} ${(stat.size / 1024).toFixed(1)}KB  ${file}`,
  );
}
