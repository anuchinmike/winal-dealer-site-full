import { ceilingGklAcrylModalAssets, ceilingGklAcrylProductModal } from "@/data/ceiling-gkl-acryl-product-modal";
import { ceilingGklPvcModalAssets, ceilingGklPvcProductModal } from "@/data/ceiling-gkl-pvc-product-modal";
import { ceilingSmlAcrylModalAssets, ceilingSmlAcrylProductModal } from "@/data/ceiling-sml-acryl-product-modal";
import { ceilingSmlPvcModalAssets, ceilingSmlPvcProductModal } from "@/data/ceiling-sml-pvc-product-modal";
import { cloudBModalAssets, cloudBProductModal } from "@/data/cloud-b-product-modal";
import { cloudCModalAssets, cloudCProductModal } from "@/data/cloud-c-product-modal";
import { cloudIModalAssets, cloudIProductModal } from "@/data/cloud-i-product-modal";
import { cloudWModalAssets, cloudWProductModal } from "@/data/cloud-w-product-modal";
import { crystalBaseWnlModalAssets, crystalBaseWnlProductModal } from "@/data/crystal-base-wnl-product-modal";
import { catalogCoverImage } from "@/data/dealer-catalog-page";
import {
  dealerCatalogProductsByTab,
  type DealerCatalogAction,
  type DealerCatalogChild,
  type DealerCatalogProduct,
  type DealerCatalogTabId,
} from "@/data/dealer-catalog-products";
import { hiddenAluminumBaseboardModalAssets, hiddenAluminumBaseboardProductModal } from "@/data/hidden-aluminum-baseboard-product-modal";
import { invisibleBasicModalAssets, invisibleBasicProductModal } from "@/data/invisible-basic-product-modal";
import { invisibleBasicReverseModalAssets, invisibleBasicReverseProductModal } from "@/data/invisible-basic-reverse-product-modal";
import { invisibleCleanModalAssets, invisibleCleanProductModal } from "@/data/invisible-clean-product-modal";
import { miniBaseModalAssets, miniBaseProductModal } from "@/data/mini-base-product-modal";
import { minwinModalAssets, minwinProductModal } from "@/data/minwin-product-modal";
import { radiatorScreenBoxModalAssets, radiatorScreenBoxProductModal } from "@/data/radiator-screen-box-product-modal";
import { radiatorScreenOverlayModalAssets, radiatorScreenOverlayProductModal } from "@/data/radiator-screen-overlay-product-modal";
import { radiatorScreenSillModalAssets, radiatorScreenSillProductModal } from "@/data/radiator-screen-sill-product-modal";
import { radiusSolutionsModalAssets, radiusSolutionsProductModal } from "@/data/radius-solutions-product-modal";
import {
  rythmWallExtraFeatures,
  rythmWallHeroFeatures,
  rythmWallModalAssets,
  rythmWallModels,
  rythmWallProductModal,
} from "@/data/rythmwall-product-modal";
import { slatSmlAcrylModalAssets, slatSmlAcrylProductModal } from "@/data/slat-sml-acryl-product-modal";
import { slatSmlHplModalAssets, slatSmlHplProductModal } from "@/data/slat-sml-hpl-product-modal";
import { slatSmlPvcModalAssets, slatSmlPvcProductModal } from "@/data/slat-sml-pvc-product-modal";
import { soundcore14ModalAssets, soundcore14ProductModal } from "@/data/soundcore-14-product-modal";
import { soundcore25ModalAssets, soundcore25ProductModal } from "@/data/soundcore-25-product-modal";
import { strongBaseWnlModalAssets, strongBaseWnlProductModal } from "@/data/strong-base-wnl-product-modal";
import { ufrPrintProductModal, ufrPrintProjects } from "@/data/ufr-print-product-modal";
import { urbanCModalAssets, urbanCProductModal } from "@/data/urban-c-product-modal";
import { urbanWModalAssets, urbanWProductModal } from "@/data/urban-w-product-modal";
import { wallGklAcrylModalAssets, wallGklAcrylProductModal } from "@/data/wall-gkl-acryl-product-modal";
import { wallGklPolymerModalAssets, wallGklPolymerProductModal } from "@/data/wall-gkl-polymer-product-modal";
import { wallGklPvcModalAssets, wallGklPvcProductModal } from "@/data/wall-gkl-pvc-product-modal";
import { wallGspHplModalAssets, wallGspHplProductModal } from "@/data/wall-gsp-hpl-product-modal";
import { wallGspPvcModalAssets, wallGspPvcProductModal } from "@/data/wall-gsp-pvc-product-modal";
import { wallSmlAcrylModalAssets, wallSmlAcrylProductModal } from "@/data/wall-sml-acryl-product-modal";
import { wallSmlHplModalAssets, wallSmlHplProductModal } from "@/data/wall-sml-hpl-product-modal";
import { wallSmlPolymerModalAssets, wallSmlPolymerProductModal } from "@/data/wall-sml-polymer-product-modal";
import { wallSmlPvcModalAssets, wallSmlPvcProductModal } from "@/data/wall-sml-pvc-product-modal";
import { wallProModalAssets, wallProProductModal } from "@/data/wallpro-product-modal";
import { winisolModalAssets, winisolProductModal } from "@/data/winisol-product-modal";
import { wisoundModalAssets, wisoundProductModal } from "@/data/wisound-product-modal";

// Pages of the multi-page site, built from the catalogue (families, products, sections) and the
// product-modal data, so the modal and the page read the same texts and pictures.
// Addresses: /catalog/<section>, /catalog/<family>, /catalog/<family>/<product>, /catalog/<product>.

export type ProductFeature = { icon: string; title: string; description: string };
export type ProductSwatch = { id: string; image: string; label: string };
export type ProductCoatingGroup = { chip: string; swatches: readonly ProductSwatch[] };
export type ProductGalleryImage = { src: string; caption: string };
export type ProductRow = { label: string; value: string };
export type ProductFact = { label: string; value?: string; chips?: readonly string[]; description?: string };
export type ProductTile = { label: string; image: string; description?: string; href?: string };

/** One content block of a product page. Every field is optional; the page shows what is there. */
export type ProductInfoBlock = {
  kind: "info";
  title: string;
  subtitle?: string;
  caption?: string;
  facts?: readonly ProductFact[];
  items?: readonly string[];
  rows?: readonly ProductRow[];
  tiles?: readonly ProductTile[];
  table?: { columns: readonly string[]; rows: readonly (readonly string[])[]; highlight?: number };
  note?: string;
  /** Features shown next to the rows (wall panels: specs + extra features). */
  features?: readonly ProductFeature[];
};
export type ProductCoatingsBlock = {
  kind: "coatings";
  title: string;
  groups: readonly ProductCoatingGroup[];
  ral?: { chart: string; note: string };
};
export type ProductBlock = ProductInfoBlock | ProductCoatingsBlock;

export type ProductPageData = {
  id: string;
  /** Catalogue id (dealer-catalog-products). */
  catalogId: string;
  /** Short name for chips and neighbour links. */
  shortTitle: string;
  categoryLabel: string;
  title: string;
  description: string;
  /** Catalogue card text and cover. */
  cardDescription: string;
  cover: string;
  primaryCta: string;
  secondaryCta?: string;
  heroFeatures: readonly ProductFeature[];
  blocks: readonly ProductBlock[];
  gallery: readonly ProductGalleryImage[];
  /** Catalogue action that used to open this product's modal. */
  action: DealerCatalogAction;
  /** Set for a product inside a family. */
  familyId?: string;
  sectionId: DealerCatalogTabId;
};

export type ProductFamily = {
  id: string;
  catalogId: string;
  title: string;
  description: string;
  contextTitle: string;
  contextSubtitle: string;
  cover: string;
  sectionId: DealerCatalogTabId;
  products: readonly ProductPageData[];
};

type ProductContent = Pick<
  ProductPageData,
  "categoryLabel" | "title" | "description" | "primaryCta" | "secondaryCta" | "heroFeatures" | "blocks" | "gallery"
>;

/* ---------- adapters: modal data → page content ---------- */

type Any = Record<string, unknown>;
const isObj = (v: unknown): v is Any => typeof v === "object" && v !== null && !Array.isArray(v);
const isStrArr = (v: unknown): v is string[] => Array.isArray(v) && v.every((x) => typeof x === "string");
const str = (v: unknown) => (typeof v === "string" ? v : undefined);

function galleryOf(list: readonly (string | { src: string; caption?: string })[] | undefined, caption: string): ProductGalleryImage[] {
  return (list ?? []).map((item) => (typeof item === "string" ? { src: item, caption } : { src: item.src, caption: item.caption ?? caption }));
}

/** Panels with the full coatings palette (wall and slat panels). */
type CoatingModal = {
  categoryLabel: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  heroFeatures: readonly ProductFeature[];
  coatingTitle: string;
  coatingGroups: readonly ProductCoatingGroup[];
  specs: { title: string; productName: string; rows: readonly ProductRow[] };
  ralNote?: string;
  extraFeatures: readonly ProductFeature[];
};

function fromCoatingModal(modal: CoatingModal, assets: { gallery: readonly ProductGalleryImage[]; ralChart?: string }): ProductContent {
  return {
    categoryLabel: modal.categoryLabel,
    title: modal.title,
    description: modal.description,
    primaryCta: modal.primaryCta,
    secondaryCta: modal.secondaryCta,
    heroFeatures: modal.heroFeatures,
    gallery: galleryOf(assets.gallery, modal.title),
    blocks: [
      { kind: "info", title: modal.specs.title, subtitle: modal.specs.productName, rows: modal.specs.rows, features: modal.extraFeatures },
      {
        kind: "coatings",
        title: modal.coatingTitle,
        groups: modal.coatingGroups,
        ral: modal.ralNote && assets.ralChart ? { chart: assets.ralChart, note: modal.ralNote } : undefined,
      },
    ],
  };
}

const HERO_KEYS = new Set(["categoryLabel", "title", "description", "primaryCta", "secondaryCta", "features", "heroFeatures"]);
const MAP_LABELS: Record<string, string> = { sml: "Крупный формат, СМЛ", gkl: "Крупный формат, ГКЛ" };
const FALLBACK_TITLES: Record<string, string> = { variants: "Исполнения", formats: "Форматы", coatings: "Покрытия" };

/** One modal section ({title, caption, rows, chips…}) → one info block. */
function sectionBlock(key: string, value: unknown): ProductInfoBlock | null {
  if (Array.isArray(value)) {
    // Top-level list of variants with pictures (WISOUND).
    const tiles = value.filter(isObj).filter((v) => str(v.image));
    if (!tiles.length) return null;
    return {
      kind: "info",
      title: FALLBACK_TITLES[key] ?? key,
      tiles: tiles.map((v) => ({
        label: str(v.productName) ?? str(v.label) ?? str(v.name) ?? "",
        image: str(v.image)!,
        description: [str(v.kmClass), [str(v.baseLabel), str(v.baseDescription)].filter(Boolean).join(" — ")].filter(Boolean).join(" · "),
      })),
    };
  }
  if (!isObj(value)) return null;
  const block: ProductInfoBlock & { facts: ProductFact[]; items: string[]; rows: ProductRow[]; tiles: ProductTile[] } = {
    kind: "info",
    title: str(value.title) ?? str(value.label) ?? FALLBACK_TITLES[key] ?? key,
    caption: str(value.caption) ?? str(value.description) ?? str(value.text),
    note: str(value.note) ?? str(value.quote),
    facts: [],
    items: [],
    rows: [],
    tiles: [],
  };
  for (const [k, v] of Object.entries(value)) {
    if (["title", "label", "caption", "description", "text", "note", "quote"].includes(k)) continue;
    if (isStrArr(v)) block.items.push(...v);
    else if (Array.isArray(v)) {
      for (const row of v.filter(isObj)) {
        if (str(row.image)) block.tiles.push({ label: str(row.name) ?? str(row.label) ?? "", image: str(row.image)! });
        else if (str(row.name) && str(row.value)) block.rows.push({ label: str(row.name)!, value: str(row.value)! });
        else if (str(row.label) && str(row.value)) block.rows.push({ label: str(row.label)!, value: str(row.value)! });
        else if (str(row.label) && isStrArr(row.chips)) block.facts.push({ label: str(row.label)!, chips: row.chips });
      }
    } else if (isObj(v)) {
      if (str(v.label)) {
        block.facts.push({ label: str(v.label)!, value: str(v.value), chips: isStrArr(v.chips) ? v.chips : undefined, description: str(v.description) });
      } else {
        // Plain map of values (WISOUND large formats by base).
        for (const [name, text] of Object.entries(v)) if (typeof text === "string") block.facts.push({ label: MAP_LABELS[name] ?? name, value: text });
      }
    }
  }
  const empty = !block.caption && !block.facts.length && !block.items.length && !block.rows.length && !block.tiles.length;
  return empty ? null : block;
}

type GenericModal = Any & {
  categoryLabel: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta?: string;
  features: readonly ProductFeature[];
};

function fromGenericModal(modal: GenericModal, gallery: ProductGalleryImage[], extra: ProductInfoBlock[] = []): ProductContent {
  const blocks: ProductBlock[] = [];
  for (const [key, value] of Object.entries(modal)) {
    if (HERO_KEYS.has(key)) continue;
    const block = sectionBlock(key, value);
    if (block) blocks.push(block);
  }
  return {
    categoryLabel: modal.categoryLabel,
    title: modal.title,
    description: modal.description,
    primaryCta: modal.primaryCta,
    secondaryCta: modal.secondaryCta,
    heroFeatures: modal.features,
    gallery,
    blocks: [...blocks, ...extra],
  };
}

const generic = (modal: unknown, assets: { gallery: readonly (string | { src: string; caption?: string })[] }) => {
  const m = modal as GenericModal;
  return fromGenericModal(m, galleryOf(assets.gallery, m.title));
};

function minwinContent(): ProductContent {
  const m = minwinProductModal;
  const columns = m.comparison.columns;
  return {
    ...fromGenericModal(
      { ...m, comparison: undefined, coatings: undefined } as unknown as GenericModal,
      galleryOf([minwinModalAssets.hero, minwinModalAssets.marketingImage], m.title),
    ),
    blocks: [
      {
        kind: "info",
        title: m.comparison.title,
        table: {
          columns: ["", ...columns.map((c) => c.label)],
          rows: m.comparison.rows.map((row) => [row.label, ...columns.map((c) => (row.values as Record<string, string>)[c.id] ?? "")]),
          highlight: columns.findIndex((c) => "highlighted" in c && c.highlighted) + 1,
        },
      },
      {
        kind: "info",
        title: m.coatings.label,
        caption: m.coatings.description,
        tiles: m.coatings.items.map((item) => ({ label: item.label, image: item.image })),
      },
      { kind: "info", title: m.useCases.title, caption: m.useCases.description },
      { kind: "info", title: m.marketing.title, caption: m.marketing.quote },
    ],
  };
}

function rythmWallContent(): ProductContent {
  const m = rythmWallProductModal;
  return {
    categoryLabel: m.categoryLabel,
    title: m.title,
    description: m.description,
    primaryCta: m.primaryCta,
    secondaryCta: m.secondaryCta,
    heroFeatures: [...rythmWallHeroFeatures, ...rythmWallExtraFeatures.slice(0, 2)],
    gallery: [
      { src: rythmWallModalAssets.heroInterior, caption: m.title },
      ...rythmWallModels.map((model) => ({ src: model.interiorImage, caption: `${m.title} ${model.code}` })),
    ],
    blocks: [
      {
        kind: "info",
        title: "Модели",
        caption: "Две серии: строгая прямоугольная графика (C) и выразительная волна (B).",
        facts: [
          { label: m.seriesC.label, description: m.seriesC.description },
          { label: m.seriesB.label, description: m.seriesB.description },
        ],
        tiles: rythmWallModels.map((model) => ({ label: model.code, image: model.image, description: `Серия ${model.series} · ${model.dimensions}` })),
      },
      {
        kind: "info",
        title: m.specsTitle,
        table: {
          columns: ["Модель", "Размеры", "Толщина", "Вес", "Покрытие"],
          rows: rythmWallModels.map((model) => [model.code, model.dimensions, model.thickness, model.weight, model.finish]),
        },
        features: rythmWallExtraFeatures.slice(2),
      },
    ],
  };
}

function ufrContent(): ProductContent {
  const m = ufrPrintProductModal;
  const base = fromGenericModal({ ...m, examples: undefined } as unknown as GenericModal, []);
  return {
    ...base,
    gallery: ufrPrintProjects.flatMap((project) => project.photos.map((photo) => ({ src: photo.src, caption: photo.caption }))),
    blocks: [
      ...base.blocks,
      {
        kind: "info",
        title: m.examples.title,
        caption: m.examples.caption,
        tiles: ufrPrintProjects.map((project) => ({
          label: project.title,
          image: project.photos[0].src,
          description: project.description,
          href: project.href,
        })),
      },
    ],
  };
}

function wisoundContent(): ProductContent {
  const m = wisoundProductModal;
  const base = generic(m, wisoundModalAssets);
  const coatingNames = ["Акрил", "ПВХ", "HPL", "Натуральный шпон", "Polimerprint"];
  return {
    ...base,
    blocks: base.blocks.map((block) =>
      block.kind === "info" && block.title === m.coatings.label
        ? { ...block, tiles: wisoundModalAssets.coatings.map((image, i) => ({ label: coatingNames[i] ?? "", image })) }
        : block,
    ),
  };
}

/** Catalogue action → page content. */
const CONTENT: Partial<Record<DealerCatalogAction, () => ProductContent>> = {
  wall_sml_acryl_modal: () => fromCoatingModal(wallSmlAcrylProductModal, wallSmlAcrylModalAssets),
  wall_sml_pvc_modal: () => fromCoatingModal(wallSmlPvcProductModal, wallSmlPvcModalAssets),
  wall_sml_hpl_modal: () => fromCoatingModal(wallSmlHplProductModal, wallSmlHplModalAssets),
  wall_sml_polymer_modal: () => fromCoatingModal(wallSmlPolymerProductModal, wallSmlPolymerModalAssets),
  wall_gkl_acryl_modal: () => fromCoatingModal(wallGklAcrylProductModal, wallGklAcrylModalAssets),
  wall_gkl_pvc_modal: () => fromCoatingModal(wallGklPvcProductModal, wallGklPvcModalAssets),
  wall_gkl_polymer_modal: () => fromCoatingModal(wallGklPolymerProductModal, wallGklPolymerModalAssets),
  wall_gsp_pvc_modal: () => fromCoatingModal(wallGspPvcProductModal, wallGspPvcModalAssets),
  wall_gsp_hpl_modal: () => fromCoatingModal(wallGspHplProductModal, wallGspHplModalAssets),
  slat_sml_acryl_modal: () => fromCoatingModal(slatSmlAcrylProductModal, slatSmlAcrylModalAssets),
  slat_sml_pvc_modal: () => fromCoatingModal(slatSmlPvcProductModal, slatSmlPvcModalAssets),
  slat_sml_hpl_modal: () => fromCoatingModal(slatSmlHplProductModal, slatSmlHplModalAssets),
  ceiling_sml_acryl_modal: () => generic(ceilingSmlAcrylProductModal, ceilingSmlAcrylModalAssets),
  ceiling_sml_pvc_modal: () => generic(ceilingSmlPvcProductModal, ceilingSmlPvcModalAssets),
  ceiling_gkl_acryl_modal: () => generic(ceilingGklAcrylProductModal, ceilingGklAcrylModalAssets),
  ceiling_gkl_pvc_modal: () => generic(ceilingGklPvcProductModal, ceilingGklPvcModalAssets),
  cloud_w_modal: () => generic(cloudWProductModal, cloudWModalAssets),
  cloud_c_modal: () => generic(cloudCProductModal, cloudCModalAssets),
  cloud_b_modal: () => generic(cloudBProductModal, cloudBModalAssets),
  cloud_i_modal: () => generic(cloudIProductModal, cloudIModalAssets),
  soundcore_14_modal: () => generic(soundcore14ProductModal, soundcore14ModalAssets),
  soundcore_25_modal: () => generic(soundcore25ProductModal, soundcore25ModalAssets),
  urban_w_modal: () => generic(urbanWProductModal, urbanWModalAssets),
  urban_c_modal: () => generic(urbanCProductModal, urbanCModalAssets),
  wallpro_modal: () => generic(wallProProductModal, wallProModalAssets),
  winisol_modal: () => generic(winisolProductModal, winisolModalAssets),
  invisible_basic_modal: () => generic(invisibleBasicProductModal, invisibleBasicModalAssets),
  invisible_basic_reverse_modal: () => generic(invisibleBasicReverseProductModal, invisibleBasicReverseModalAssets),
  invisible_clean_modal: () => generic(invisibleCleanProductModal, invisibleCleanModalAssets),
  strong_base_wnl_modal: () => generic(strongBaseWnlProductModal, strongBaseWnlModalAssets),
  crystal_base_wnl_modal: () => generic(crystalBaseWnlProductModal, crystalBaseWnlModalAssets),
  hidden_aluminum_baseboard_modal: () => generic(hiddenAluminumBaseboardProductModal, hiddenAluminumBaseboardModalAssets),
  mini_base_modal: () => generic(miniBaseProductModal, miniBaseModalAssets),
  radiator_screen_sill_modal: () => generic(radiatorScreenSillProductModal, radiatorScreenSillModalAssets),
  radiator_screen_box_modal: () => generic(radiatorScreenBoxProductModal, radiatorScreenBoxModalAssets),
  radiator_screen_overlay_modal: () => generic(radiatorScreenOverlayProductModal, radiatorScreenOverlayModalAssets),
  radius_solutions_modal: () => generic(radiusSolutionsProductModal, radiusSolutionsModalAssets),
  minwin_modal: minwinContent,
  rythmwall_modal: rythmWallContent,
  ufr_print_modal: ufrContent,
  wisound_modal: wisoundContent,
};

/* ---------- registry ---------- */

/** Page address of a catalogue family or standalone product (catalogue id → slug). */
const SLUG_BY_CATALOG_ID: Record<string, string> = {
  "family-slat-wall-panels": "slat",
  "family-ceiling-gypsum": "ceiling-gkl",
  "family-wisound": "wisound",
  "rhythm-wall": "rythmwall",
};
const slugOf = (catalogId: string) => SLUG_BY_CATALOG_ID[catalogId] ?? catalogId.replace(/^family-/, "");

/** Home section of a family or standalone product (it can be listed in several). */
const PRIMARY_SECTION: Record<string, DealerCatalogTabId> = {
  "family-wisound": "acoustic",
  "family-cloud-system": "acoustic",
  wallpro: "system",
  "winal-isol": "system",
  ufr: "system",
};

const SKIP = new Set(["family-profiles"]); // has its own pages under /catalog/profiles

function collect() {
  const seen = new Map<string, { product: DealerCatalogProduct; section: DealerCatalogTabId }>();
  const childIds = new Set<string>();
  for (const [section, list] of Object.entries(dealerCatalogProductsByTab) as [DealerCatalogTabId, DealerCatalogProduct[]][]) {
    for (const product of list) {
      if (SKIP.has(product.id)) continue;
      for (const child of product.children ?? []) childIds.add(child.id);
      const prev = seen.get(product.id);
      if (!prev) seen.set(product.id, { product, section: PRIMARY_SECTION[product.id] ?? section });
    }
  }
  return { entries: [...seen.values()], childIds };
}

function makeProduct(
  item: DealerCatalogProduct | DealerCatalogChild,
  sectionId: DealerCatalogTabId,
  shortTitle: string,
  familyId?: string,
): ProductPageData | null {
  const action = item.action;
  const build = action ? CONTENT[action] : undefined;
  if (!action || !build) return null;
  return {
    ...build(),
    id: familyId ? item.id : slugOf(item.id),
    catalogId: item.id,
    shortTitle,
    cardDescription: item.description,
    cover: catalogCoverImage(item.id, item.image),
    action,
    familyId,
    sectionId,
  };
}

const { entries: catalogEntries, childIds } = collect();

export const productFamilies: readonly ProductFamily[] = catalogEntries
  .filter(({ product }) => product.children?.length)
  .map(({ product, section }) => {
    const id = slugOf(product.id);
    return {
      id,
      catalogId: product.id,
      title: product.title,
      description: product.description,
      contextTitle: product.contextTitle,
      contextSubtitle: product.contextSubtitle,
      cover: catalogCoverImage(product.id, product.image),
      sectionId: section,
      products: product.children!.flatMap((child) => makeProduct(child, section, child.listTitle.replace(/^WINAL™\s*/, ""), id) ?? []),
    };
  });

/** Products without a family, at /catalog/<product>. Family members listed alone are skipped. */
export const standaloneProducts: readonly ProductPageData[] = catalogEntries
  .filter(({ product }) => !product.children?.length && !childIds.has(product.id))
  .flatMap(({ product, section }) => makeProduct(product, section, product.title.replace(/^WINAL™\s*/, "")) ?? []);

export const allProductPages: readonly ProductPageData[] = [...productFamilies.flatMap((f) => f.products), ...standaloneProducts];

export function productHref(product: Pick<ProductPageData, "id" | "familyId">) {
  return product.familyId ? `/catalog/${product.familyId}/${product.id}` : `/catalog/${product.id}`;
}

export const familyHref = (family: Pick<ProductFamily, "id">) => `/catalog/${family.id}`;
export const sectionHref = (sectionId: DealerCatalogTabId) => `/catalog/${sectionId}`;

export function findFamily(id: string) {
  return productFamilies.find((family) => family.id === id);
}

export function findProductPage(familyId: string, productId: string) {
  const family = findFamily(familyId);
  const product = family?.products.find((item) => item.id === productId);
  return family && product ? { family, product } : undefined;
}

export function findStandalone(id: string) {
  return standaloneProducts.find((product) => product.id === id);
}

/** Catalogue action → page address, for the modal bridge. */
export const PRODUCT_PAGE_HREF_BY_ACTION: Record<string, string> = Object.fromEntries(
  allProductPages.map((product) => [product.action, productHref(product)]),
);

/** Catalogue id (family, product or standalone) → page address. */
export const PAGE_HREF_BY_CATALOG_ID: Record<string, string> = {
  ...Object.fromEntries(productFamilies.map((family) => [family.catalogId, familyHref(family)])),
  ...Object.fromEntries(allProductPages.map((product) => [product.catalogId, productHref(product)])),
  "family-profiles": "/catalog/profiles",
};
