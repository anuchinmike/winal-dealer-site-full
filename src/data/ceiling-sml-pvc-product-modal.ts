import { asset } from "@/lib/asset";
export type CeilingSmlPvcFeature = {
  icon: string;
  title: string;
  description: string;
};

export type CeilingSmlPvcSpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/ceiling-sml-pvc");

export const CEILING_SML_PVC_PRODUCT_MODAL_ID = "ceiling-sml-pvc-product-modal";

export const ceilingSmlPvcModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

export const ceilingSmlPvcProductModal = {
  categoryLabel: "ПОТОЛОЧНЫЕ ПАНЕЛИ НА СМЛ",
  title: "Потолочные панели WINAL™ СМЛ ПВХ",
  description:
    "Потолочные панели на огнестойкой плите СМЛ с декоративной ПВХ-пленкой. Практичное решение для модульных потолков, где нужна готовая поверхность без покраски на объекте.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Негорючая основа КМ-0",
      description: "Базовая плита из СМЛ имеет класс КМ-0 на уровне основы. Пожарные показатели готовой панели зависят от выбранной плёнки.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-swatches.svg"),
      title: "Износостойкая ПВХ-пленка",
      description: "Ламинация дает готовый декоративный слой без покраски на объекте.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-square.svg"),
      title: "Потолочные форматы плит",
      description: "Изделия производятся в стандартных модулях 594×594 и 1194×594 мм.",
    },
    {
      icon: asset("/images/product-modal/icons/figma-dry-mount.svg"),
      title: "Монтаж в T-24 и 60×27",
      description: "Совместимость с открытыми каркасами T-24 и скрытыми узлами 60×27 мм.",
    },
  ] satisfies CeilingSmlPvcFeature[],
  execution: {
    title: "Покрытие и декоры",
    caption: "Основа, ПВХ-покрытие, форматы и монтаж относятся к подтверждённому исполнению; декоры уточняются отдельно.",
    base: { label: "Основа", value: "СМЛ" },
    coating: { label: "Покрытие", value: "ПВХ-ламинация" },
    formats: { label: "Форматы", chips: ["594×594 мм", "1194×594 мм"] },
    mounting: { label: "Монтаж", chips: ["T24", "скрытое 60×27 мм"] },
  },
  characteristics: {
    title: "Характеристики и ограничения",
    caption: "Пожарный класс относится к основе; для готовой ПВХ-панели он не заявляется без подтверждённой связки.",
    rows: [
      { name: "Основа", value: "СМЛ" },
      { name: "Покрытие", value: "ПВХ" },
      { name: "КМ-0", value: "не заявляется без подтверждённой связки" },
      { name: "Влагостойкость", value: "свойство СМЛ-основы" },
      { name: "Сфера", value: "потолки коммерческих интерьеров" },
    ] satisfies CeilingSmlPvcSpecItem[],
  },
} as const;
