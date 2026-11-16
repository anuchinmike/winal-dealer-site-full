import {
  CATALOG_TAB_ORDER,
  getFamilyModalSequence,
  getStandaloneModalSequence,
  type CatalogModalSequenceItem,
} from "@/data/dealer-catalog-modal-sequence";
import {
  dealerCatalogProductsByTab,
  type DealerCatalogAction,
  type DealerCatalogTabId,
} from "@/data/dealer-catalog-products";
import { getCatalogSidebarContent, type CatalogSidebarFeature } from "@/data/dealer-catalog-sidebar";
import { asset } from "@/lib/asset";

// Catalogue page data: the same tabs, families and products as the home-page catalogue,
// flattened into sections so every page variant renders from one source.

export type CatalogPageItem = {
  id: string;
  title: string;
  /** Short name for lists and chips. */
  shortTitle: string;
  description: string;
  image: string;
  objectPosition?: string;
  action: DealerCatalogAction;
  /** Prev/next order inside the product modal. */
  sequence: CatalogModalSequenceItem[];
};

export type CatalogPageEntry = CatalogPageItem & {
  /** Purpose label shown above the title. */
  contextTitle: string;
  contextSubtitle: string;
  /** Products inside a family; empty for a standalone product. */
  children: CatalogPageItem[];
};

export type CatalogPageSection = {
  id: DealerCatalogTabId;
  anchor: string;
  label: string;
  icon: string;
  title: string;
  intro: string;
  features: CatalogSidebarFeature[];
  entries: CatalogPageEntry[];
  /** Number of individual products in the section (family children counted one by one). */
  productCount: number;
};

const SECTION_META: Record<DealerCatalogTabId, { label: string; icon: string }> = {
  wall: { label: "Стеновые решения", icon: asset("/images/catalog/tab-wall.svg") },
  acoustic: { label: "Акустические решения", icon: asset("/images/catalog/tab-acoustic.svg") },
  ceiling: { label: "Потолочные решения", icon: asset("/images/catalog/tab-ceiling.svg") },
  system: { label: "Системные решения", icon: asset("/images/catalog/tab-system.svg") },
};

/**
 * Landscape 4:3 covers for the catalogue page (800×600, cropped from the product modal galleries).
 * The home-page catalogue keeps its tall card images; they do not crop well into wide cards.
 */
const PAGE_IMAGE_IDS = new Set([
  "wall-sml-acryl", "wall-sml-pvc", "wall-sml-hpl", "wall-sml-polymer",
  "wall-gkl-acryl", "wall-gkl-pvc", "wall-gkl-polymer", "wall-gsp-pvc", "wall-gsp-hpl",
  "slat-sml-acryl", "slat-sml-pvc", "slat-sml-hpl",
  "ceiling-sml-acryl", "ceiling-sml-pvc", "ceiling-gkl-acryl", "ceiling-gkl-pvc",
  "cloud-w", "cloud-c", "cloud-b", "cloud-i", "soundcore-14", "soundcore-25", "urban-w", "urban-c",
  "wallpro", "winisol", "invisible-basic", "invisible-reverse", "invisible-clean",
  "plinth-strong-base", "plinth-crystal-base", "plinth-hidden", "plinth-mini-base",
  "radiator-screen-window-sill", "radiator-screen-box", "radiator-screen-overlay",
  "rhythm-wall", "minwin", "radius-solutions", "ufr", "family-wisound", "family-profiles",
]);

/** Family cover = the cover of one of its products. */
const FAMILY_COVER: Record<string, string> = {
  "family-wall-sml": "wall-sml-acryl",
  "family-wall-gkl": "wall-gkl-acryl",
  "family-wall-gsp": "wall-gsp-hpl",
  "family-slat-wall-panels": "slat-sml-acryl",
  "family-ceiling-sml": "ceiling-sml-acryl",
  "family-ceiling-gypsum": "ceiling-gkl-pvc",
  "family-cloud-system": "cloud-b",
  "family-soundcore": "soundcore-25",
  "family-urban": "urban-w",
  "family-winal-mute": "wallpro",
  "family-invisible": "invisible-basic",
  "family-plinths": "plinth-crystal-base",
  "family-radiator-screens": "radiator-screen-window-sill",
};

function pageImage(id: string, fallback: string): string {
  const key = FAMILY_COVER[id] ?? id;
  return PAGE_IMAGE_IDS.has(key) ? asset(`/images/catalog/page/${key}.webp`) : fallback;
}

function buildSection(tabId: DealerCatalogTabId): CatalogPageSection {
  const sidebar = getCatalogSidebarContent(tabId);
  const entries: CatalogPageEntry[] = dealerCatalogProductsByTab[tabId].map((product) => {
    const familySequence = getFamilyModalSequence(product);
    const children: CatalogPageItem[] = (product.children ?? [])
      .filter((child) => child.action && child.action !== "disabled")
      .map((child) => ({
        id: child.id,
        title: child.title,
        shortTitle: child.listTitle,
        description: child.description,
        image: pageImage(child.id, child.image),
        action: child.action!,
        sequence: familySequence,
      }));
    const first = children[0];
    return {
      id: product.id,
      title: product.title,
      shortTitle: product.title,
      description: product.description,
      image: pageImage(product.id, product.image),
      // A family opens on its first product and pages through the rest.
      action: first ? first.action : product.action,
      sequence: first ? familySequence : getStandaloneModalSequence(product),
      contextTitle: product.contextTitle,
      contextSubtitle: product.contextSubtitle,
      children,
    };
  });

  return {
    id: tabId,
    anchor: `section-${tabId}`,
    label: SECTION_META[tabId].label,
    icon: SECTION_META[tabId].icon,
    title: sidebar.title,
    intro: sidebar.intro,
    features: sidebar.features,
    entries,
    productCount: entries.reduce((sum, entry) => sum + Math.max(entry.children.length, 1), 0),
  };
}

export const catalogPageSections: CatalogPageSection[] = CATALOG_TAB_ORDER.map(buildSection);

export const CATALOG_PAGE_TITLE = "Каталог продуктов WINAL";
export const CATALOG_PAGE_LEAD =
  "Стеновые, акустические, потолочные и системные решения для общественных и коммерческих интерьеров. Подберём продукт под задачу объекта и рассчитаем проект.";
