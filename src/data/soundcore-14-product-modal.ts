import { asset } from "@/lib/asset";
export type Soundcore14Feature = {
  icon: string;
  title: string;
  description: string;
};

export type Soundcore14SpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/soundcore-14");

export const SOUNDCORE_14_PRODUCT_MODAL_ID = "soundcore-14-product-modal";

export const soundcore14ModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

export const soundcore14ProductModal = {
  categoryLabel: "АКУСТИЧЕСКИЕ ПОТОЛОЧНЫЕ ПАНЕЛИ",
  title: "WINAL™ Soundcore 14",
  description:
    "Потолочные акустические панели WINAL™ Soundcore 14 толщиной 14 мм из древесного волокна и цемента. Звукопоглощение NRC 0,45–0,55 без воздушного относа, класс КМ-1 (Г1), установка в стандартный T-профиль.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: asset("/images/product-modal/icons/phosphor-speaker-high.svg"),
      title: "Акустика NRC 0,45–0,55",
      description:
        "Звукопоглощение NRC 0,45–0,55 без воздушного относа обеспечивает базовый акустический комфорт потолочных систем.",
    },
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Состав и класс КМ-1 (Г1)",
      description: "Композит из древесного волокна и цемента соответствует классу пожарной безопасности КМ-1 (Г1).",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-palette.svg"),
      title: "Выбор кромок и фактур",
      description: "Фактуры S, M, L и 4 типа кромки (ПК, VK, АПК, ЕПК) для разнообразных визуальных решений потолка.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-arrows-down-up.svg"),
      title: "Монтаж в T-профиль",
      description: "Размеры 594×594 и 1194×594 мм предназначены для быстрой установки в подвесной T-профиль.",
    },
  ] satisfies Soundcore14Feature[],
  execution: {
    title: "Фактуры, форматы, кромки",
    caption:
      "Древесное волокно на цементном связующем с фактурами S/M/L и кромками ПК/VK/АПК/ЕПК для выразительного потолочного рельефа.",
    textures: {
      label: "Фактуры",
      chips: ["S", "M", "L"],
    },
    formats: {
      label: "Форматы",
      chips: ["594×594 мм", "1194×594 мм"],
    },
    edges: {
      label: "Кромки",
      chips: ["ПК", "VK", "АПК", "ЕПК"],
    },
    mounting: {
      label: "Монтаж",
      chips: ["T-профиль"],
    },
  },
  characteristics: {
    title: "Акустика и монтаж",
    caption:
      "Модульные форматы 594×594 и 1194×594 мм монтируются в подвесной T-профиль, обеспечивая пожаробезопасность КМ-1 (Г1).",
    rows: [
      { name: "Толщина", value: "14 мм" },
      { name: "Состав", value: "древесное волокно и цемент" },
      { name: "NRC", value: "0,45–0,55 без воздушного относа" },
      { name: "Класс", value: "КМ-1 / Г1" },
      { name: "Сфера", value: "классы, офисы, общественные зоны" },
    ] satisfies Soundcore14SpecItem[],
  },
} as const;
