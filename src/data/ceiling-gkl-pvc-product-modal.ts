import { asset } from "@/lib/asset";
export type CeilingGklPvcFeature = {
  icon: string;
  title: string;
  description: string;
};

export type CeilingGklPvcSpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/ceiling-gkl-pvc");

export const CEILING_GKL_PVC_PRODUCT_MODAL_ID = "ceiling-gkl-pvc-product-modal";

export const ceilingGklPvcModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

export const ceilingGklPvcProductModal = {
  categoryLabel: "ПОТОЛОЧНЫЕ ПАНЕЛИ НА ГКЛ",
  title: "Потолочные панели WINAL™ ГКЛ ПВХ",
  description:
    "Потолочные панели на основе ГКЛ с финишной ламинацией ПВХ-пленкой (КМ-1). Готовое декоративное решение для офисных, торговых и административных помещений.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Пожарный класс КМ-1",
      description: "Параметр выводится только при подтверждённом сценарии готовой панели.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-palette.svg"),
      title: "Декоративная ПВХ-поверхность",
      description: "Прочная ламинация снижает объем финишных работ на объекте.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-ruler.svg"),
      title: "Размеры 594×594 и 1194×594",
      description: "Готовые форматы плит для модульных растровых потолков.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-arrows-down-up.svg"),
      title: "Варианты подвеса и крепежа",
      description: "Монтаж в распространенные подвесные системы T-24 или на скрытый каркас 60×27 мм.",
    },
  ] satisfies CeilingGklPvcFeature[],
  execution: {
    title: "Покрытия и монтаж",
    caption: "Основа, ПВХ-покрытие, форматы и монтаж относятся к подтверждённому исполнению; набор декоров уточняется отдельно.",
    base: { label: "Основа", value: "ГКЛ" },
    coating: { label: "Покрытие", value: "ПВХ" },
    formats: { label: "Форматы", chips: ["594×594 мм", "1194×594 мм"] },
    mounting: { label: "Монтаж", chips: ["T24", "скрытое 60×27 мм"] },
  },
  characteristics: {
    title: "Характеристики и запреты",
    caption: "Основа, покрытие, класс и форматы относятся к потолочному исполнению; влагостойкость для готовой панели не заявляется.",
    rows: [
      { name: "Основа", value: "ГКЛ" },
      { name: "Покрытие", value: "ПВХ" },
      { name: "Класс", value: "КМ-1" },
      { name: "Форматы", value: "594×594 / 1194×594 мм" },
      { name: "Влагостойкость", value: "не заявляется" },
    ] satisfies CeilingGklPvcSpecItem[],
  },
} as const;
