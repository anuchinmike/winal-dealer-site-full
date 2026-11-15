#!/usr/bin/env python3
"""Sync dealer cases section: Figma UI assets + fixed dealer cases from cases-registry."""

# After this script copies masters into public/, run `node scripts/optimize-dealer-images.mjs` so display URLs stay WebP derivatives. Do not reintroduce .jpg/.png paths in src/data/dealer-cases.ts.

from __future__ import annotations

import hashlib
import json
import re
import shutil
import urllib.request
from datetime import date
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
CASES_ROOT = Path(r"D:\Yandex.Disk\Проекты\Винал\🛠️ Задачи по сайту winal.ru\Кейсы")
REGISTRY = CASES_ROOT / "data" / "cases-registry.yaml"

DEALER_CASE_SLUGS = [
    "padel-centr",
    "paneli-winal-na-100000-m2-kinostudii-gorkogo",
    "aktovyy-zal-institut",
    "soyz-holl-dremin",
    "vnutrennyaya-otdelka-mediczinskih-uchrezhdenij-romashkino",
    "sportivnaya-baza-podmoskovnye-zori-otdelka-panelyami-winal-sml-polimer-polikeram-soft-tach-premium",
    "onkobolnitsa-62-skolkovo-otdelka-sten-paneli-sml-pvh",
    "voenkomat-zelenograd",
    "cheremushkinskiy-rayonnyy-sud",
    "istoricheskiy-manezh-moskino-proekt-winal",
    "vnutrennyaya-otdelka-hollov-stenovymi-panelyami-winal-zhk-akademik-g-troiczk",
]

ASSETS_SRC = ROOT / "assets-src" / "figma" / "node-1291-1442"
PUBLIC_UI = ROOT / "public" / "images" / "home" / "cases" / "ui"
PUBLIC_CASES = ROOT / "public" / "images" / "home" / "cases"

FIGMA_EXPORT_URL = "https://www.figma.com/api/mcp/asset/03c36550-1109-4e4c-8d1b-19250730995b.png"

# name, figma_node_id, url — pinned to Figma node 1291:1442 (2026-08-09)
SVG_ASSETS: list[tuple[str, str, str]] = [
    ("icon-all.svg", "1315:1181", "https://www.figma.com/api/mcp/asset/d6fd2334-0684-4a37-9e53-9fb5be8c4434.svg"),
    ("icon-offices.svg", "1315:1171", "https://www.figma.com/api/mcp/asset/7ccad24a-9553-44fa-a6cc-9d169d5f4c18.svg"),
    ("icon-med.svg", "1291:1456", "https://www.figma.com/api/mcp/asset/26374123-460b-499c-a6e3-7731fff5b763.svg"),
    ("icon-sport.svg", "1291:1460", "https://www.figma.com/api/mcp/asset/3fc9f743-ab9a-44fa-85e8-480c0923cc2d.svg"),
    ("icon-education.svg", "1291:1464", "https://www.figma.com/api/mcp/asset/5c0da901-2ee3-4918-aea1-c541e0256d75.svg"),
    ("icon-acoustics.svg", "1291:1469", "https://www.figma.com/api/mcp/asset/b6645f89-8506-4be3-8944-3b6f19dac134.svg"),
    ("icon-residential.svg", "1291:1474", "https://www.figma.com/api/mcp/asset/bb0da1f3-c0c7-408c-a1e1-117c88b6c739.svg"),
    ("icon-public.svg", "1291:1479", "https://www.figma.com/api/mcp/asset/3ada176c-dbf9-4047-908a-950084a382ac.svg"),
    ("chevron-right-glass.svg", "1291:1487", "https://www.figma.com/api/mcp/asset/08da5e4e-fecd-407c-a73c-e555322b5774.svg"),
    ("arrow-white-left.svg", "I1291:1501", "https://www.figma.com/api/mcp/asset/b7aa3dee-e11e-477b-aba6-c6552585506e.svg"),
    ("icon-external-link.svg", "I1291:1502", "https://www.figma.com/api/mcp/asset/8a645eca-c595-4dd6-8359-5f27547fb0f6.svg"),
    ("caret-left-gallery.svg", "1291:1529", "https://www.figma.com/api/mcp/asset/17107b7c-404c-4f76-911b-c4134a041f04.svg"),
    ("chevron-right-gallery.svg", "1291:1532", "https://www.figma.com/api/mcp/asset/39ca44b0-f667-48d0-b648-bd163783631b.svg"),
]

CATEGORY_CHIPS = [
    {"id": "offices", "label": "Офисы", "icon": "icon-offices.svg"},
    {"id": "med", "label": "Медицина", "icon": "icon-med.svg"},
    {"id": "sport", "label": "Спорт", "icon": "icon-sport.svg"},
    {"id": "education", "label": "Образование", "icon": "icon-education.svg"},
    {"id": "acoustics", "label": "Акустика", "icon": "icon-acoustics.svg"},
    {"id": "residential", "label": "Жилые комплексы", "icon": "icon-residential.svg"},
    {"id": "public", "label": "Общественные пространства", "icon": "icon-public.svg"},
]

EYEBROW = {
    "offices": "ОФИСЫ",
    "med": "МЕДИЦИНСКИЕ ОБЪЕКТЫ",
    "sport": "СПОРТИВНЫЕ ОБЪЕКТЫ",
    "education": "ОБРАЗОВАНИЕ",
    "acoustics": "АКУСТИКА",
    "residential": "ЖИЛЫЕ КОМПЛЕКСЫ",
    "public": "ОБЩЕСТВЕННЫЕ ПРОСТРАНСТВА",
}

GALLERY_CATEGORY_SHORT = {
    "offices": "Офис",
    "med": "Медицина",
    "sport": "Спорт",
    "education": "Образование",
    "acoustics": "Акустика",
    "residential": "Жилые комплексы",
    "public": "Общественные пространства",
}

GALLERY_TITLE_OVERRIDES = {
    "paneli-winal-na-100000-m2-kinostudii-gorkogo": "Киностудия им. Горького",
    "voenkomat-zelenograd": "Военкомат г. Зеленоград",
    "soyz-holl-dremin": "СОЮЗ Холл",
    "vnutrennyaya-otdelka-mediczinskih-uchrezhdenij-romashkino": "Ромашково",
    "sportivnaya-baza-podmoskovnye-zori-otdelka-panelyami-winal-sml-polimer-polikeram-soft-tach-premium": "Подмосковные Зори",
    "vnutrennyaya-otdelka-hollov-stenovymi-panelyami-winal-zhk-akademik-g-troiczk": "ЖК Академик",
    "istoricheskiy-manezh-moskino-proekt-winal": "Москино: манеж",
}

GALLERY_THUMB_CROP = {
    "paneli-winal-na-100000-m2-kinostudii-gorkogo": {
        "height": "129.31%",
        "top": "-29.15%",
        "left": "0.19%",
    },
    "voenkomat-zelenograd": {
        "height": "129.31%",
        "top": "-29.12%",
        "left": "-0.01%",
    },
}

PRODUCT_CROP_PRESETS = [
    {"variant": "square"},
    {"variant": "square"},
    {"height": "150.23%", "top": "-38.27%", "left": "0.15%"},
    {"width": "232px", "height": "154px", "left": "-43.75px", "top": "-15px"},
]

# Pinned to Figma node 1291:1442 product feature images (Padel featured case).
FIGMA_CASE_PRODUCT_ASSETS: dict[str, list[tuple[str, str, str]]] = {
    "padel-centr": [
        (
            "product-1.png",
            "1300:1706",
            "https://www.figma.com/api/mcp/asset/7f053462-9c0e-4312-86c4-193129544923.png",
        ),
        (
            "product-2.png",
            "1300:1730",
            "https://www.figma.com/api/mcp/asset/e92d5dec-0c77-409f-8993-8fdc9520e189.png",
        ),
        (
            "product-3.png",
            "1300:1732",
            "https://www.figma.com/api/mcp/asset/b0b4ce94-1734-4eb0-9592-2dd344f5da6d.png",
        ),
        (
            "product-4.png",
            "1300:1737",
            "https://www.figma.com/api/mcp/asset/d79b7bba-ab56-4578-bb76-561f9d265732.png",
        ),
    ],
}

FIGMA_PRODUCT_CROP_PRESETS: dict[str, list[dict]] = {
    "padel-centr": [
        {"variant": "square", "top": "-10.25px"},
        {"variant": "square", "top": "-10.25px"},
        {"width": "100%", "height": "100%", "top": "0", "left": "0"},
        {"width": "232px", "height": "154px", "left": "-43.75px", "top": "-15px"},
    ],
}

TAXONOMY_TO_CATEGORY = {
    "offices": "offices",
    "med": "med",
    "sport-objects": "sport",
    "obrazovanie": "education",
    "jil-komplex": "residential",
}

SLUG_CATEGORY_OVERRIDES = {
    "voenkomat-zelenograd": "offices",
    "cheremushkinskiy-rayonnyy-sud": "public",
    "paneli-winal-na-100000-m2-kinostudii-gorkogo": "public",
    "sportivnyy-kompleks-yuzhnoe-butovo-keis-winal": "sport",
    "soyz-holl-dremin": "public",
    "vnutrennyaya-otdelka-mediczinskih-uchrezhdenij-romashkino": "med",
    "sportivnaya-baza-podmoskovnye-zori-otdelka-panelyami-winal-sml-polimer-polikeram-soft-tach-premium": "sport",
    "vnutrennyaya-otdelka-hollov-stenovymi-panelyami-winal-zhk-akademik-g-troiczk": "residential",
    "istoricheskiy-manezh-moskino-proekt-winal": "public",
}

ACOUSTIC_KEYWORDS = re.compile(
    r"wisound|soundcore|cloud|acoustic|акуст|urban|mute|wallpro",
    re.I,
)

DESCRIPTION_OVERRIDES = {
    "padel-centr": (
        "Падел-центр как новая точка роста для Winal! Есть объекты, после которых компания понимает, "
        "что теперь мы можем больше. «Академия падела Ходынка» стала для Winal именно таким проектом."
    ),
}

HERO_CROP = {"height": "118.23%", "top": "-9.11%"}


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "dealer-sync/1.0"})
    with urllib.request.urlopen(req, timeout=120) as resp:
        dest.write_bytes(resp.read())


def resolve_category(case: dict) -> str:
    slug = case.get("slug", "")
    if slug in SLUG_CATEGORY_OVERRIDES:
        return SLUG_CATEGORY_OVERRIDES[slug]
    tax = case.get("wp_taxonomy_reshenia")
    if tax in TAXONOMY_TO_CATEGORY:
        return TAXONOMY_TO_CATEGORY[tax]
    folder = resolve_case_folder(case)
    products_path = resolve_products_registry_path(case)
    if products_path and products_path.exists():
        pr = yaml.safe_load(products_path.read_text(encoding="utf-8")) or {}
        blob = json.dumps(pr, ensure_ascii=False)
        if ACOUSTIC_KEYWORDS.search(blob):
            return "acoustics"
    return "public"


def list_case_images(case: dict) -> list[Path]:
    folder = CASES_ROOT / case.get("folder", "")
    featured = case.get("featured_file")
    paths: list[Path] = []
    if featured:
        fp = CASES_ROOT / featured
        if fp.exists():
            paths.append(fp)
    for sub in ("media/webp", "media/prod"):
        media = folder / sub
        if media.exists():
            files = sorted(media.glob("*.webp")) + sorted(media.glob("*.jpg")) + sorted(media.glob("*.png"))
            for f in files:
                if f not in paths:
                    paths.append(f)
    raw = folder / "raw"
    if raw.exists() and not paths:
        files = sorted(raw.glob("*.webp")) + sorted(raw.glob("*.jpg")) + sorted(raw.glob("*.png"))
        paths.extend(files[:6])
    return paths[:6]


def resolve_case_folder(case: dict) -> Path:
    folder = CASES_ROOT / case.get("folder", "")
    if folder.exists():
        return folder
    prep = (case.get("gallery_registry_prep") or {}).get("products_registry")
    if prep:
        alt = CASES_ROOT / prep
        if alt.exists():
            return alt.parent
    prod_mirror = case.get("prod_mirror_path")
    if prod_mirror:
        alt = CASES_ROOT / prod_mirror
        if alt.parent.parent.exists():
            return alt.parent.parent
    return folder


def resolve_products_registry_path(case: dict) -> Path | None:
    case_folder = resolve_case_folder(case)
    candidates = [
        case_folder / "products-registry.yaml",
    ]
    prep = (case.get("gallery_registry_prep") or {}).get("products_registry")
    if prep:
        candidates.append(CASES_ROOT / prep)
    files = case.get("files") or {}
    if isinstance(files, dict) and files.get("products_registry"):
        candidates.append(CASES_ROOT / files["products_registry"])
    for candidate in candidates:
        if candidate.exists():
            return candidate
    return None


def fetch_featured_media_id(wp_post_id: int | None, cache: dict[int, int | None]) -> int | None:
    if not wp_post_id:
        return None
    if wp_post_id in cache:
        return cache[wp_post_id]
    featured_id: int | None = None
    try:
        url = f"https://winal.ru/wp-json/wp/v2/gallery/{wp_post_id}"
        req = urllib.request.Request(url, headers={"User-Agent": "dealer-sync/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode())
        raw = data.get("featured_media")
        featured_id = int(raw) if raw else None
    except Exception as exc:
        print(f"WARN: featured_media read failed for post {wp_post_id}: {exc}")
    cache[wp_post_id] = featured_id
    return featured_id


def keep_registry_entries(pr: dict) -> list[dict]:
    entries: list[dict] = []
    for entry in pr.get("files") or []:
        if entry.get("gallery_action") != "keep":
            continue
        if entry.get("status") == "deleted_on_prod":
            continue
        entries.append(entry)
    return entries


def find_entry_by_attachment(pr: dict, attachment_id: int | None) -> dict | None:
    if not attachment_id:
        return None
    for entry in pr.get("files") or []:
        for key in ("wp_attachment_id", "wp_gallery_attachment_id"):
            raw = entry.get(key)
            if raw and int(raw) == int(attachment_id):
                return entry
    return None


def find_featured_entry(case: dict, pr: dict, featured_media_id: int | None) -> dict | None:
    for entry in keep_registry_entries(pr):
        if entry.get("role") == "featured":
            return entry

    featured_file = case.get("featured_file")
    if featured_file:
        featured_name = Path(featured_file).name
        for entry in pr.get("files") or []:
            file_name = Path(str(entry.get("file", ""))).name
            if file_name == featured_name or str(entry.get("file", "")).endswith(featured_file):
                return entry

    if featured_media_id:
        matched = find_entry_by_attachment(pr, featured_media_id)
        if matched:
            return matched

    for entry in keep_registry_entries(pr):
        if int(entry.get("gallery_pos") or 0) == 1:
            return entry

    return None


def gallery_sort_key(entry: dict) -> tuple:
    gallery_pos = entry.get("gallery_pos")
    if gallery_pos is not None:
        return (0, int(gallery_pos), str(entry.get("file") or ""))
    sort_index = entry.get("sort_index")
    if sort_index is not None:
        return (1, int(sort_index), str(entry.get("file") or ""))
    photo_ref = entry.get("photo_ref")
    if photo_ref is not None and str(photo_ref).isdigit():
        return (2, int(photo_ref), str(entry.get("file") or ""))
    return (3, 0, str(entry.get("file") or ""))


def order_gallery_entries(case: dict, pr: dict, featured_media_id: int | None) -> list[dict]:
    keep_entries = keep_registry_entries(pr)
    featured_entry = find_featured_entry(case, pr, featured_media_id)
    sorted_keep = sorted(keep_entries, key=gallery_sort_key)

    ordered: list[dict] = []
    seen_attachment_ids: set[int] = set()

    def append_entry(entry: dict | None) -> None:
        if not entry:
            return
        attachment_id = entry.get("wp_attachment_id")
        if attachment_id is not None:
            attachment_id = int(attachment_id)
            if attachment_id in seen_attachment_ids:
                return
            seen_attachment_ids.add(attachment_id)
        ordered.append(entry)

    append_entry(featured_entry)
    for entry in sorted_keep:
        append_entry(entry)
    return ordered


def _resolve_webp_by_gallery_pos(case_folder: Path, gallery_pos: int, role: str) -> Path | None:
    webp_dir = case_folder / "media" / "webp"
    if not webp_dir.exists():
        return None
    if int(gallery_pos) == 1 or role == "featured":
        featured = sorted(webp_dir.glob("*featured*.webp"))
        if featured:
            return featured[0]
    numbered = sorted(webp_dir.glob(f"*gallery-{int(gallery_pos):02d}*.webp"))
    if numbered:
        return numbered[0]
    numbered = sorted(webp_dir.glob(f"*gallery-{int(gallery_pos)}*.webp"))
    return numbered[0] if numbered else None


def resolve_registry_file(case_folder: Path, file_entry: dict) -> Path | None:
    fname = file_entry.get("file", "")
    if not fname:
        return None

    if "/" in fname or "\\" in fname:
        rooted = CASES_ROOT / Path(fname.replace("\\", "/"))
        if rooted.exists():
            return rooted

    stem = Path(fname).stem
    candidates = [
        case_folder / "media" / "webp" / f"{stem}.webp",
        case_folder / "media" / "webp" / Path(fname).name,
        case_folder / "media" / "prod" / Path(fname).name,
        case_folder / fname,
        CASES_ROOT / fname,
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate

    gallery_pos = file_entry.get("gallery_pos")
    if gallery_pos is not None:
        matched = _resolve_webp_by_gallery_pos(case_folder, int(gallery_pos), str(file_entry.get("role") or ""))
        if matched:
            return matched

    return None


def list_prod_gallery_images(case: dict, featured_cache: dict[int, int | None]) -> list[Path]:
    registry_path = resolve_products_registry_path(case)
    case_folder = resolve_case_folder(case)
    if not registry_path:
        return list_case_images(case)

    pr = yaml.safe_load(registry_path.read_text(encoding="utf-8")) or {}
    featured_media_id = fetch_featured_media_id(case.get("wp_post_id"), featured_cache)
    ordered_entries = order_gallery_entries(case, pr, featured_media_id)

    paths: list[Path] = []
    seen: set[str] = set()
    for entry in ordered_entries:
        resolved = resolve_registry_file(case_folder, entry)
        if not resolved:
            print(f"WARN: missing gallery file for {case.get('slug')}: {entry.get('file')}")
            continue
        key = str(resolved.resolve())
        if key in seen:
            continue
        seen.add(key)
        paths.append(resolved)
    return paths


def find_plaque_template_id(product_name: str, plaques: dict) -> str | None:
    for key, plaque in plaques.items():
        plaque_product = plaque.get("product", "")
        if plaque_product.lower() == product_name.lower():
            return key
        if product_name.lower() in plaque_product.lower() or plaque_product.lower() in product_name.lower():
            return key
    name_lower = product_name.lower()
    if "hpl" in name_lower:
        for key in plaques:
            if "hpl" in key:
                return key
    if "пвх" in name_lower or "pvh" in name_lower:
        for key in plaques:
            if "pvh" in key:
                return key
    if "двер" in name_lower or "invisible" in name_lower:
        for key in plaques:
            if "door" in key or "doori" in key:
                return key
    return None


def find_keep_file_for_template(pr: dict, case_folder: Path, template_id: str) -> Path | None:
    for entry in pr.get("files") or []:
        if entry.get("gallery_action") != "keep" and entry.get("status") != "on_prod":
            if entry.get("gallery_action") != "keep":
                continue
        overlays = entry.get("overlay_plaques") or {}
        for item in overlays.get("items") or []:
            if item.get("template_id") == template_id:
                resolved = resolve_registry_file(case_folder, entry)
                if resolved:
                    return resolved
    return None


def find_ufr_file(pr: dict, case_folder: Path) -> Path | None:
    for entry in pr.get("files") or []:
        if entry.get("gallery_action") != "keep":
            continue
        overlays = entry.get("overlay_plaques") or {}
        for item in overlays.get("items") or []:
            text = item.get("text") or {}
            decor = str(text.get("decor", ""))
            if "уф" in decor.lower() or "ufr" in decor.lower():
                resolved = resolve_registry_file(case_folder, entry)
                if resolved:
                    return resolved
    return None


def normalize_product_labels(product_name: str, is_ufr: bool = False) -> tuple[str, str]:
    if is_ufr:
        return "Декоративные панели", "UFR печать"
    name_lower = product_name.lower()
    if "двер" in name_lower or "invisible" in name_lower:
        return "Интерьерные двери", "WINAL™ Invisible Basic СМЛ РЕВЕРС"
    if "hpl" in name_lower:
        return "Стеновые панели", "WINAL™ СМЛ HPL"
    if "пвх" in name_lower or "pvh" in name_lower:
        return "Стеновые панели", "WINAL™ СМЛ ПВХ"
    if "ufr" in name_lower or "печат" in name_lower or "уф" in name_lower:
        return "Декоративные панели", "UFR печать"
    return "Стеновые панели", product_name


def product_crop_for_index(index: int, slug: str | None = None) -> dict:
    presets = FIGMA_PRODUCT_CROP_PRESETS.get(slug or "", PRODUCT_CROP_PRESETS)
    preset = presets[min(index, len(presets) - 1)]
    crop = {k: v for k, v in preset.items() if k != "variant"}
    if preset.get("variant") == "square":
        crop["variant"] = "square"
    return crop


def product_specs_from_registry(pr: dict, slug: str) -> list[tuple[str, str | None, bool]]:
    sidebar = pr.get("case_sidebar_products") or []
    plaques = pr.get("plaque_templates") or {}
    specs: list[tuple[str, str | None, bool]] = []
    for item in sidebar[:4]:
        product_name = item.get("product", "")
        template_id = find_plaque_template_id(product_name, plaques)
        specs.append((product_name, template_id, False))
    if slug == "padel-centr" and len(specs) < 4:
        specs.append(("UFR печать", None, True))
    return specs[:4]


def product_tiles_from_figma(
    case: dict,
    slug: str,
    dest_dir: Path,
    manifest_assets: list[dict],
) -> list[dict]:
    assets = FIGMA_CASE_PRODUCT_ASSETS.get(slug)
    if not assets:
        return []

    folder = resolve_case_folder(case)
    products_path = resolve_products_registry_path(case)
    pr = yaml.safe_load(products_path.read_text(encoding="utf-8")) if products_path and products_path.exists() else {}
    specs = product_specs_from_registry(pr or {}, slug)

    products_src = ASSETS_SRC / "products" / slug
    products_src.mkdir(parents=True, exist_ok=True)

    tiles: list[dict] = []
    for idx, (fname, node_id, url) in enumerate(assets):
        src = products_src / fname
        download(url, src)
        dest = dest_dir / fname
        shutil.copy2(src, dest)
        manifest_assets.append(
            {
                "role": f"{slug}-{fname.replace('.', '-')}",
                "figmaNodeId": node_id,
                "format": "png",
                "sourcePath": str(src.relative_to(ROOT)).replace("\\", "/"),
                "publicPath": str(dest.relative_to(ROOT)).replace("\\", "/"),
                "sha256": sha256(src),
            }
        )

        product_name, _, is_ufr = specs[idx] if idx < len(specs) else ("", None, False)
        category_label, product_label = normalize_product_labels(product_name, is_ufr=is_ufr)
        tiles.append(
            {
                "categoryLabel": category_label,
                "productLabel": product_label,
                "image": f"/images/home/cases/{slug}/{fname}",
                "imageCrop": product_crop_for_index(idx, slug),
            }
        )
    return tiles


def product_tiles(case: dict, slug: str, dest_dir: Path, manifest_assets: list[dict] | None = None) -> list[dict]:
    if slug in FIGMA_CASE_PRODUCT_ASSETS and manifest_assets is not None:
        figma_tiles = product_tiles_from_figma(case, slug, dest_dir, manifest_assets)
        if figma_tiles:
            return figma_tiles
    folder = resolve_case_folder(case)
    products_path = resolve_products_registry_path(case)
    tiles: list[dict] = []
    if not products_path or not products_path.exists():
        return tiles

    pr = yaml.safe_load(products_path.read_text(encoding="utf-8")) or {}
    fallback_images = list_case_images(case)
    specs = product_specs_from_registry(pr, slug)

    for idx, (product_name, template_id, is_ufr) in enumerate(specs[:4]):
        img_src: Path | None = None
        if is_ufr:
            img_src = find_ufr_file(pr, folder)
        elif template_id:
            img_src = find_keep_file_for_template(pr, folder, template_id)
        if not img_src and fallback_images:
            img_src = fallback_images[min(idx, len(fallback_images) - 1)]
        if not img_src:
            continue

        category_label, product_label = normalize_product_labels(product_name, is_ufr=is_ufr)
        ext = img_src.suffix
        out = dest_dir / f"product-{idx + 1}{ext}"
        shutil.copy2(img_src, out)
        tile: dict = {
            "categoryLabel": category_label,
            "productLabel": product_label,
            "image": f"/images/home/cases/{slug}/{out.name}",
            "imageCrop": product_crop_for_index(idx, slug),
        }
        tiles.append(tile)

    return tiles


def case_description(case: dict) -> str:
    slug = case.get("slug", "")
    if slug in DESCRIPTION_OVERRIDES:
        return DESCRIPTION_OVERRIDES[slug]
    title = case.get("title", "")
    short = case.get("case_short_title", "")
    if title and len(title) <= 220:
        return title
    if short:
        return f"Реализованный объект WINAL: {short}."
    return "Реализованный объект WINAL."


def case_display_title(case: dict) -> str:
    short = case.get("case_short_title")
    if short and short != case.get("title"):
        if "академия падела" in short.lower():
            return "Академия падела Ходынка"
        return short
    title = case.get("title", "")
    if "«" in title and "»" in title:
        m = re.search(r"«([^»]+)»", title)
        if m:
            return m.group(1)
    return short or title[:80]


def gallery_title(case: dict) -> str:
    slug = case.get("slug", "")
    if slug in GALLERY_TITLE_OVERRIDES:
        return GALLERY_TITLE_OVERRIDES[slug]
    return case.get("case_short_title") or case_display_title(case)


def gallery_category_label(category_id: str) -> str:
    return GALLERY_CATEGORY_SHORT.get(category_id, category_id)


def ts_escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("`", "\\`").replace("${", "\\${")


def main() -> None:
    ref_dir = ASSETS_SRC / "reference"
    svg_dir = ASSETS_SRC / "svg"
    ref_dir.mkdir(parents=True, exist_ok=True)
    svg_dir.mkdir(parents=True, exist_ok=True)
    PUBLIC_UI.mkdir(parents=True, exist_ok=True)

    manifest_assets: list[dict] = []

    ref_path = ref_dir / "node-1291-1442--cases-frame.png"
    download(FIGMA_EXPORT_URL, ref_path)
    manifest_assets.append(
        {
            "role": "reference-frame",
            "figmaNodeId": "1291:1442",
            "format": "png",
            "sourcePath": str(ref_path.relative_to(ROOT)).replace("\\", "/"),
            "publicPath": None,
            "sha256": sha256(ref_path),
        }
    )

    for name, node_id, url in SVG_ASSETS:
        src = svg_dir / name
        download(url, src)
        pub = PUBLIC_UI / name
        shutil.copy2(src, pub)
        manifest_assets.append(
            {
                "role": name.replace(".svg", ""),
                "figmaNodeId": node_id,
                "format": "svg",
                "sourcePath": str(src.relative_to(ROOT)).replace("\\", "/"),
                "publicPath": str(pub.relative_to(ROOT)).replace("\\", "/"),
                "sha256": sha256(src),
            }
        )

    registry = yaml.safe_load(REGISTRY.read_text(encoding="utf-8"))
    by_slug: dict[str, dict] = {}
    for case in registry["cases"].values():
        slug = case.get("slug")
        if slug:
            by_slug[slug] = case

    dealer_cases: list[dict] = []
    featured_cache: dict[int, int | None] = {}
    for slug in DEALER_CASE_SLUGS:
        case = by_slug.get(slug)
        if not case:
            print(f"WARN: slug not in registry: {slug}")
            continue
        if case.get("wp_status") != "publish":
            print(f"WARN: slug not published: {slug}")
            continue

        dest_dir = PUBLIC_CASES / slug
        dest_dir.mkdir(parents=True, exist_ok=True)
        images = list_prod_gallery_images(case, featured_cache)
        if not images:
            print(f"WARN: no images for {slug}")
            continue

        hero_src = images[0]
        thumb_src = images[0]
        hero_name = f"hero{hero_src.suffix}"
        thumb_name = f"thumb{thumb_src.suffix}"
        shutil.copy2(hero_src, dest_dir / hero_name)
        shutil.copy2(thumb_src, dest_dir / thumb_name)

        gallery_public_paths: list[str] = []
        for i, img in enumerate(images):
            gname = f"gallery-{i + 1:02d}{img.suffix}"
            shutil.copy2(img, dest_dir / gname)
            gallery_public_paths.append(f"/images/home/cases/{slug}/{gname}")

        category_id = resolve_category(case)

        case_entry: dict = {
            "id": case["id"],
            "slug": slug,
            "wpUrl": case["wp_url"],
            "categoryId": category_id,
            "categoryEyebrow": EYEBROW[category_id],
            "title": case_display_title(case),
            "description": case_description(case),
            "heroImage": gallery_public_paths[0],
            "heroImages": gallery_public_paths,
            "heroCrop": HERO_CROP,
            "galleryThumb": f"/images/home/cases/{slug}/{thumb_name}",
            "galleryTitle": gallery_title(case),
            "galleryCategoryLabel": gallery_category_label(category_id),
            "products": product_tiles(case, slug, dest_dir, manifest_assets),
        }
        if slug in GALLERY_THUMB_CROP:
            case_entry["galleryThumbCrop"] = GALLERY_THUMB_CROP[slug]

        dealer_cases.append(case_entry)
        featured_name = Path(images[0]).name
        print(f"OK {slug}: {len(gallery_public_paths)} gallery images, featured={featured_name}")

    manifest = {
        "figmaFileKey": "PS0BzL7Uw1QQvlYJrhMmfF",
        "figmaNodeId": "1291:1442",
        "exportedAt": date.today().isoformat(),
        "assets": manifest_assets,
        "cases": [c["slug"] for c in dealer_cases],
    }
    (ASSETS_SRC / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "/** Generated by scripts/sync-dealer-cases.py — do not edit by hand. */",
        "",
        "export type DealerCaseCategoryId =",
        '  | "offices"',
        '  | "med"',
        '  | "sport"',
        '  | "education"',
        '  | "acoustics"',
        '  | "residential"',
        '  | "public";',
        "",
        "export type DealerCaseImageCrop = {",
        "  width?: string;",
        "  height?: string;",
        "  top?: string;",
        "  left?: string;",
        "  variant?: \"square\";",
        "};",
        "",
        "export type DealerCaseProductTile = {",
        "  categoryLabel: string;",
        "  productLabel: string;",
        "  image: string;",
        "  imageCrop?: DealerCaseImageCrop;",
        "};",
        "",
        "export type DealerCase = {",
        "  id: string;",
        "  slug: string;",
        "  wpUrl: string;",
        "  categoryId: DealerCaseCategoryId;",
        "  categoryEyebrow: string;",
        "  title: string;",
        "  description: string;",
        "  heroImage: string;",
        "  heroImages: string[];",
        "  heroCrop?: DealerCaseImageCrop;",
        "  galleryThumb: string;",
        "  galleryThumbCrop?: DealerCaseImageCrop;",
        "  galleryTitle: string;",
        "  galleryCategoryLabel: string;",
        "  products: DealerCaseProductTile[];",
        "};",
        "",
        "export type DealerCaseCategoryChip = {",
        "  id: DealerCaseCategoryId;",
        "  label: string;",
        "  icon: string;",
        "};",
        "",
        'const UI = "/images/home/cases/ui";',
        "",
        "export const dealerCaseCategoryChips: DealerCaseCategoryChip[] = [",
    ]
    for chip in CATEGORY_CHIPS:
        lines.append(
            f'  {{ id: "{chip["id"]}", label: "{chip["label"]}", icon: `${{UI}}/{chip["icon"]}` }},'
        )
    lines.append("];")
    lines.append("")
    lines.append("export const dealerCases: DealerCase[] = [")
    for c in dealer_cases:
        products_json = json.dumps(c["products"], ensure_ascii=False)
        hero_images_json = json.dumps(c["heroImages"], ensure_ascii=False)
        hero_crop_json = json.dumps(c.get("heroCrop"), ensure_ascii=False)
        thumb_crop_json = json.dumps(c.get("galleryThumbCrop"), ensure_ascii=False)
        lines.append("  {")
        lines.append(f'    id: "{c["id"]}",')
        lines.append(f'    slug: "{c["slug"]}",')
        lines.append(f'    wpUrl: "{c["wpUrl"]}",')
        lines.append(f'    categoryId: "{c["categoryId"]}",')
        lines.append(f'    categoryEyebrow: "{ts_escape(c["categoryEyebrow"])}",')
        lines.append(f'    title: "{ts_escape(c["title"])}",')
        lines.append(f'    description: "{ts_escape(c["description"])}",')
        lines.append(f'    heroImage: "{c["heroImage"]}",')
        lines.append(f"    heroImages: {hero_images_json},")
        lines.append(f"    heroCrop: {hero_crop_json},")
        lines.append(f'    galleryThumb: "{c["galleryThumb"]}",')
        if c.get("galleryThumbCrop"):
            lines.append(f"    galleryThumbCrop: {thumb_crop_json},")
        lines.append(f'    galleryTitle: "{ts_escape(c["galleryTitle"])}",')
        lines.append(f'    galleryCategoryLabel: "{ts_escape(c["galleryCategoryLabel"])}",')
        lines.append(f"    products: {products_json},")
        lines.append("  },")
    lines.append("];")
    lines.append("")

    out_ts = ROOT / "src" / "data" / "dealer-cases.ts"
    out_ts.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {out_ts} with {len(dealer_cases)} cases")
    print("Slugs:", ", ".join(c["slug"] for c in dealer_cases))


if __name__ == "__main__":
    main()
