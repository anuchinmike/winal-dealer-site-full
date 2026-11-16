import { asset } from "@/lib/asset";
export type Soundcore25Feature = {
  icon: string;
  title: string;
  description: string;
};

export type Soundcore25SpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/soundcore-25");

export const SOUNDCORE_25_PRODUCT_MODAL_ID = "soundcore-25-product-modal";

export const soundcore25ModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

export const soundcore25ProductModal = {
  categoryLabel: "АКУСТИЧЕСКИЕ СТЕНОВЫЕ ПАНЕЛИ",
  title: "WINAL™ Soundcore 25",
  description:
    "Стеновые ударопрочные панели WINAL™ Soundcore 25 толщиной 25 мм из древесного волокна и цемента. NRC 0,85–0,95 при воздушном относе 50 мм, класс пожарной опасности КМ-1 (Г1) и морозостойкость −40…+60 °C.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: asset("/images/product-modal/icons/phosphor-speaker-high.svg"),
      title: "NRC 0,85–0,95 с относом",
      description: "Акустическая эффективность NRC 0,85–0,95 достигается при монтаже с воздушным относом 50 мм.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-hammer.svg"),
      title: "Ударопрочность и стойкость",
      description: "Прочная плита выдерживает механические нагрузки и перепады температур в диапазоне −40…+60 °C.",
    },
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Пожаробезопасность КМ-1",
      description: "Композит из древесного волокна и цемента сертифицирован по классу пожарной опасности КМ-1 (Г1).",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-palette.svg"),
      title: "Кромки, фактуры, форматы",
      description: "Фактуры S, M, L, кромки ПК, VK, АПК и стеновые форматы 600×600, 600×1200, 600×2400 мм.",
    },
  ] satisfies Soundcore25Feature[],
  execution: {
    title: "Фактуры и форматы",
    caption:
      "Натуральная фактура древесного волокна (S/M/L) с кромками ПК/VK/АПК сочетает ударопрочность и эстетику в общественных интерьерах.",
    formats: {
      label: "Форматы",
      chips: ["600×600 мм", "600×1200 мм", "600×2400 мм"],
    },
    textures: {
      label: "Фактуры",
      chips: ["S", "M", "L"],
    },
    edges: {
      label: "Кромки",
      chips: ["ПК", "VK", "АПК"],
    },
    thickness: {
      label: "Толщина",
      chips: ["25 мм"],
    },
  },
  characteristics: {
    title: "Характеристики и применение",
    caption:
      "Стеновые панели 600×600, 600×1200 и 600×2400 мм монтируются с относом 50 мм для достижения NRC 0,85–0,95 при стойкости −40…+60 °C.",
    rows: [
      { name: "NRC", value: "0,85–0,95 при относе 50 мм" },
      { name: "Состав", value: "древесное волокно и цемент" },
      { name: "Класс", value: "КМ-1 / Г1" },
      { name: "Температура", value: "−40…+60 °C" },
      { name: "Сфера", value: "спорт, школы, офисы, общественные зоны" },
    ] satisfies Soundcore25SpecItem[],
  },
} as const;
