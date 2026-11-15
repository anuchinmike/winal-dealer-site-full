import { asset } from "@/lib/asset";
export type MiniBaseFeature = {
  icon: string;
  title: string;
  description: string;
};

export type MiniBaseSpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/mini-base");
const FEATURE_ICON = asset("/images/product-modal/rythmwall/icon-install.svg");

export const MINI_BASE_PRODUCT_MODAL_ID = "mini-base-product-modal";

export const miniBaseModalAssets = {
  gallery: [`${BASE}/gallery-node.webp`, `${BASE}/gallery-studio.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

// Тексты — только факты из реестра 3D и заводского чертежа QBTU9 / QBTU19 (29.10.2026).
export const miniBaseProductModal = {
  categoryLabel: "АЛЮМИНИЕВЫЙ ПЛИНТУС",
  title: "Плинтус WINAL™ Mini Base",
  description:
    "Алюминиевый плинтус WINAL™ Mini Base для примыкания стеновых панелей 10 мм к полу. Профиль с ножкой: панель встаёт на верхнюю полку плинтуса за кант.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: FEATURE_ICON,
      title: "Примыкание к полу",
      description: "Панель встаёт на верхнюю полку плинтуса за кант.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-ruler.svg"),
      title: "Типоразмеры QBTU",
      description: "QBTU 10/10 и QBTU 20/10: расстояние от пола до полки 10 или 20 мм.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-bounding-box.svg"),
      title: "Под панель 10 мм",
      description: "Совместим с панелями WINAL™ СМЛ 10 мм.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-link.svg"),
      title: "Монтаж",
      description: "Плинтус клеится к стене тыльной полосой, пазы на полосе держат клей.",
    },
  ] satisfies MiniBaseFeature[],
  sizing: {
    title: "Типоразмеры",
    caption: "Два типоразмера под панель толщиной 10 мм.",
    items: ["QBTU 10/10", "QBTU 20/10"],
  },
  application: {
    title: "Характеристики",
    caption: "Профиль с ножкой, глубина 13 мм.",
    rows: [
      { name: "Материал", value: "алюминий" },
      { name: "Панель", value: "10 мм" },
      { name: "От пола до полки", value: "10 / 20 мм" },
      { name: "Глубина", value: "13 мм" },
    ] satisfies MiniBaseSpecItem[],
  },
} as const;
