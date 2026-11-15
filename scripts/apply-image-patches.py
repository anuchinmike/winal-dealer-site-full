#!/usr/bin/env python3
from pathlib import Path

ROOT = Path("/home/magency/projects/winal-dealer-site/site")

# Coating lightbox: swatch path -> /full/ sibling
old_import = 'import { openCasePhotoGallery } from "@/app/case-fancybox";'
new_import = 'import { coatingLightboxSrc, openCasePhotoGallery } from "@/app/case-fancybox";'
old_map = "swatches.map((item) => ({ src: item.image, caption: item.label })),"
new_map = "swatches.map((item) => ({ src: coatingLightboxSrc(item.image), caption: item.label })),"

for path in (ROOT / "src/app").glob("*-product-modal.tsx"):
    text = path.read_text(encoding="utf-8")
    original = text
    if old_map in text:
        text = text.replace(old_import, new_import)
        text = text.replace(old_map, new_map)
    if text != original:
        path.write_text(text, encoding="utf-8")
        print(f"lightbox {path.name}")

# Lazy-load below-fold rasters on homepage / cases
replacements = [
    (
        'src/app/page.tsx',
        [
            (
                '<img src={image} alt="" className="absolute inset-0 size-full rounded-lg object-cover" style={imageStyle} />',
                '<img src={image} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full rounded-lg object-cover" style={imageStyle} />',
            ),
            (
                '<img src={assets.surfaceMainImage} alt="" className="size-full object-cover" />',
                '<img src={assets.surfaceMainImage} alt="" loading="lazy" decoding="async" className="size-full object-cover" />',
            ),
            (
                '<img src={image} alt="" className="pointer-events-none absolute inset-0 size-full rounded-2xl object-cover" style={imageStyle} />',
                '<img src={image} alt="" loading="lazy" decoding="async" className="pointer-events-none absolute inset-0 size-full rounded-2xl object-cover" style={imageStyle} />',
            ),
        ],
    ),
]

for rel, pairs in replacements:
    path = ROOT / rel
    text = path.read_text(encoding="utf-8")
    original = text
    for old, new in pairs:
        if old not in text:
            print(f"MISSING {rel}: {old[:60]}")
            continue
        text = text.replace(old, new)
    if text != original:
        path.write_text(text, encoding="utf-8")
        print(f"lazy {rel}")

# Cases photos
cases = ROOT / "src/app/cases-section.tsx"
text = cases.read_text(encoding="utf-8")
text2 = text.replace(
    'className="absolute inset-0 size-full max-w-none object-cover"',
    'loading="lazy" decoding="async" className="absolute inset-0 size-full max-w-none object-cover"',
    1,
)
# product tiles + hero — add lazy to remaining case photos that don't have loading yet
import re
text2 = re.sub(
    r"<img\n(\s+)src=\{product\.image\}",
    r"<img\n\1src={product.image}\n\1loading=\"lazy\"\n\1decoding=\"async\"",
    text2,
    count=2,
)
text2 = re.sub(
    r"<img\n(\s+)src=\{heroImages\[safeHeroIndex\]\}",
    r"<img\n\1src={heroImages[safeHeroIndex]}\n\1loading=\"lazy\"\n\1decoding=\"async\"",
    text2,
    count=1,
)
if text2 != text:
    cases.write_text(text2, encoding="utf-8")
    print("lazy cases-section")

rail = ROOT / "src/app/cases-gallery-rail.tsx"
rail_text = rail.read_text(encoding="utf-8")
rail2 = re.sub(
    r"<img\n(\s+)src=\{caseItem\.galleryThumb\}",
    r"<img\n\1src={caseItem.galleryThumb}\n\1loading=\"lazy\"\n\1decoding=\"async\"",
    rail_text,
    count=1,
)
if rail2 != rail_text:
    rail.write_text(rail2, encoding="utf-8")
    print("lazy cases-gallery-rail")

print("patches done")
