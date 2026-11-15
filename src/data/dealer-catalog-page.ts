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
        image: child.image,
        objectPosition: child.objectPosition,
        action: child.action!,
        sequence: familySequence,
      }));
    const first = children[0];
    return {
      id: product.id,
      title: product.title,
      shortTitle: product.title,
      description: product.description,
      image: product.image,
      objectPosition: product.objectPosition,
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

export const CATALOG_VARIANTS = [
  {
    id: "a",
    href: "/catalog/a",
    name: "Вариант A",
    title: "Разделы и семейства",
    description: "Описание раздела слева, справа светлые карточки семейств со списком продуктов.",
  },
  {
    id: "b",
    href: "/catalog/b",
    name: "Вариант B",
    title: "В стиле winal.ru",
    description: "Большие фото семейств, стеклянные плашки с продуктами и описанием, как на основном сайте.",
  },
  {
    id: "c",
    href: "/catalog/c",
    name: "Вариант C",
    title: "Все продукты с поиском",
    description: "Боковое меню по разделам, поиск по названию и все продукты сразу в одной сетке.",
  },
] as const;

export type CatalogVariantId = (typeof CATALOG_VARIANTS)[number]["id"];
