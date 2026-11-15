#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith(".webp")) acc.push(full);
  }
  return acc;
}

const files = walk(path.resolve("public/images"));
let n = 0;
for (const file of files) {
  const st = fs.statSync(file);
  const rel = file.replaceAll("\\", "/");
  const isCard = rel.includes("/catalog/");
  const limit = isCard ? 150 * 1024 : 400 * 1024;
  if (st.size <= limit) continue;
  const tmp = `${file}.tmp.webp`;
  const quality = st.size > 500 * 1024 ? 65 : 72;
  await sharp(file).webp({ quality, effort: 5 }).toFile(tmp);
  const next = fs.statSync(tmp).size;
  if (next < st.size) {
    fs.renameSync(tmp, file);
    n += 1;
    console.log(`${Math.round(st.size / 1024)}k -> ${Math.round(next / 1024)}k q=${quality} ${rel}`);
  } else {
    fs.unlinkSync(tmp);
  }
}
console.log(`recompressed ${n}`);
