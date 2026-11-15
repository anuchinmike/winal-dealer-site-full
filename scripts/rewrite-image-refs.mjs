#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAP_PATH = path.join(ROOT, "scripts", ".image-rewrite-map.json");
const SRC = path.join(ROOT, "src");

const rewrite = JSON.parse(fs.readFileSync(MAP_PATH, "utf8"));
const catalogCard = {};
const extMap = {};

for (const [from, to] of Object.entries(rewrite)) {
  if (from.startsWith("__catalog_card__")) {
    catalogCard[from.slice("__catalog_card__".length)] = to;
  } else {
    extMap[from] = to;
  }
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(ts|tsx|js|mjs)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

function replaceLongest(text, map) {
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  let next = text;
  let count = 0;
  for (const key of keys) {
    if (!key || key === map[key]) continue;
    if (!next.includes(key)) continue;
    const pieces = next.split(key);
    if (pieces.length > 1) {
      count += pieces.length - 1;
      next = pieces.join(map[key]);
    }
  }
  return { text: next, count };
}

const files = walk(SRC);
let changedFiles = 0;
for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  let next = original;
  const rel = path.relative(ROOT, file).split(path.sep).join("/");

  if (rel.endsWith("src/data/dealer-catalog-products.ts")) {
    const card = replaceLongest(next, catalogCard);
    next = card.text;
  }

  const ext = replaceLongest(next, extMap);
  next = ext.text;

  if (next !== original) {
    fs.writeFileSync(file, next);
    changedFiles += 1;
    console.log(`updated ${rel}`);
  }
}

console.log(`changedFiles=${changedFiles}`);
