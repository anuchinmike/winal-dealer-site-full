import { asset } from "@/lib/asset";
export type CeilingSmlAcrylFeature = {
  icon: string;
  title: string;
  description: string;
};

export type CeilingSmlAcrylSpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/ceiling-sml-acryl");

export const CEILING_SML_ACRYL_PRODUCT_MODAL_ID = "ceiling-sml-acryl-product-modal";

export const ceilingSmlAcrylModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

export const ceilingSmlAcrylProductModal = {
  categoryLabel: "ПОТОЛОЧНЫЕ ПАНЕЛИ НА СМЛ",
  title: "Потолочные панели WINAL™ СМЛ Акрил",
  description:
    "Готовые потолочные панели на негорючей основе СМЛ с заводским акриловым покрытием. Предназначены для общественных зон, где важны ровная декоративная поверхность и свойства минеральной основы.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Негорючая основа СМЛ",
      description: "Плита из стекломагниевого листа обеспечивает огнестойкость уровня КМ-0 на уровне основы.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-palette.svg"),
      title: "Заводская окраска акрилом",
      description: "Ровное покрытие не требует финишной отделки на объекте.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-ruler.svg"),
      title: "Стандартные потолочные модули",
      description: "Выпуск в форматах 594×594 и 1194×594 мм для типовых потолочных конструкций.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-wrench.svg"),
      title: "Универсальный монтаж",
      description: "Установка в видимую подвесную систему T-24 или скрытый монтаж на профиль 60×27 мм.",
    },
  ] satisfies CeilingSmlAcrylFeature[],
  execution: {
    title: "Покрытие и монтаж",
    caption: "Связка основы, покрытия и потолочной системы показана без переноса стеновых решений.",
    base: { label: "Основа", value: "СМЛ" },
    coating: { label: "Покрытие", value: "акриловая окраска" },
    formats: { label: "Форматы", chips: ["594×594 мм", "1194×594 мм"] },
    mounting: { label: "Монтаж", chips: ["T24", "скрытое 60×27 мм"] },
  },
  characteristics: {
    title: "Характеристики и ограничения",
    caption: "КМ-0 и влагостойкость указаны как свойства СМЛ-основы, подтверждённые для этой связки.",
    rows: [
      { name: "Основа", value: "СМЛ" },
      { name: "КМ-0", value: "свойство основы СМЛ" },
      { name: "Влагостойкость", value: "свойство СМЛ" },
      { name: "Покрытие", value: "акрил" },
      { name: "Сфера", value: "общественные и коммерческие потолки" },
    ] satisfies CeilingSmlAcrylSpecItem[],
  },
} as const;
