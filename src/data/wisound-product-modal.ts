import { asset } from "@/lib/asset";
export type WisoundPerforationPattern = {
  name: string;
  panel: string;
  macro: string;
  black: string;
};

export type WisoundFeature = {
  icon: string;
  title: string;
  description: string;
};

export type WisoundVariant = {
  productName: string;
  productAccent: string;
  kmClass: "КМ-0" | "КМ-1";
  image: string;
  baseLabel: "СМЛ" | "ГКЛ";
  baseDescription: string;
  mutedAccent?: boolean;
};

const BASE = asset("/images/product-modal/wisound");

export const WISOUND_PRODUCT_MODAL_ID = "wisound-product-modal";

export const wisoundModalAssets = {
  gallery: [`${BASE}/diagram-exploded.webp`, `${BASE}/wisound-space.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
  coatings: [
    `${BASE}/coating-01.webp`,
    `${BASE}/coating-02.webp`,
    `${BASE}/coating-03.webp`,
    `${BASE}/coating-04.webp`,
    `${BASE}/coating-05.webp`,
  ],
} as const;

export const wisoundProductModal = {
  categoryLabel: "СТЕНОВЫЕ И ПОТОЛОЧНЫЕ ПАНЕЛИ",
  title: "WINAL™ Wisound",
  description:
    "Система перфорированных декоративно-акустических панелей для стен и потолков. Она помогает снизить реверберацию, сделать речь более разборчивой и создать комфортную звуковую среду, сохраняя цельный архитектурный облик интерьера.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: `${BASE}/icon-acoustic.svg`,
      title: "Акустический комфорт",
      description: "Перфорация помогает уменьшить отражение звука и выраженность гула, повышая разборчивость речи.",
    },
    {
      icon: `${BASE}/icon-surface.svg`,
      title: "Цельная архитектурная поверхность",
      description: "Панели формируют единое декоративное решение для стен и потолков, интегрируя акустическую функцию в интерьер.",
    },
    {
      icon: `${BASE}/icon-compliance.svg`,
      title: "Соответствие требованиям объекта",
      description: "Исполнения на основе СМЛ и ГКЛ с классами КМ-0 и КМ-1 позволяют учитывать требования пожарной безопасности.",
    },
    {
      icon: `${BASE}/icon-design.svg`,
      title: "Свобода дизайна",
      description: "Рисунки перфорации, декоративные покрытия и разные форматы позволяют адаптировать панели к архитектурной концепции.",
    },
  ] satisfies WisoundFeature[],
  perforation: {
    label: "Типы перфорации",
    macroCaption: "крупный план",
    blackCaption: "Black Edition, чёрный СМЛ",
    description: "Шесть вариантов перфорации — от равномерной сетки до декоративных прорезей. Диаметр отверстий 5–20 мм, шаг 18–30 мм.",
    patterns: [
      { name: "RH", panel: `${BASE}/perforation/wisound-rh-panel.webp`, macro: `${BASE}/perforation/wisound-rh-macro.webp`, black: `${BASE}/perforation/wisound-rh-black.webp` },
      { name: "RX", panel: `${BASE}/perforation/wisound-rx-panel.webp`, macro: `${BASE}/perforation/wisound-rx-macro.webp`, black: `${BASE}/perforation/wisound-rx-black.webp` },
      { name: "Cube", panel: `${BASE}/perforation/wisound-cube-panel.webp`, macro: `${BASE}/perforation/wisound-cube-macro.webp`, black: `${BASE}/perforation/wisound-cube-black.webp` },
      { name: "Space", panel: `${BASE}/perforation/wisound-space-panel.webp`, macro: `${BASE}/perforation/wisound-space-macro.webp`, black: `${BASE}/perforation/wisound-space-black.webp` },
      { name: "Slots", panel: `${BASE}/perforation/wisound-slots-panel.webp`, macro: `${BASE}/perforation/wisound-slots-macro.webp`, black: `${BASE}/perforation/wisound-slots-black.webp` },
      { name: "Lines", panel: `${BASE}/perforation/wisound-lines-panel.webp`, macro: `${BASE}/perforation/wisound-lines-macro.webp`, black: `${BASE}/perforation/wisound-lines-black.webp` },
    ] satisfies WisoundPerforationPattern[],
  },
  coatings: {
    label: "Виды покрытий",
    description: "Пять вариантов декоративных покрытий — акрил, ПВХ, HPL, натуральный шпон, Polimerprint.",
  },
  formats: {
    label: "Разные форматы",
    description: "Стандартные модули и крупноформатные панели для стеновых и потолочных решений.",
    modules: ["600×600, 600×1200, 1200×1200 мм", "595×595, 595×1195 мм"],
    largeFormat: {
      sml: "2440×1220, 3000×1220 мм",
      gkl: "2400×1200, 2500×1200, 2700×1200, 3000×1200, 3300×1200, 3600×1200 мм",
    },
  },
  variants: [
    {
      productName: "WINAL™ Wisound",
      productAccent: "Wisound",
      kmClass: "КМ-0",
      image: `${BASE}/variant-wisound-layers.webp`,
      baseLabel: "СМЛ",
      baseDescription: "негорючая основа",
    },
    {
      productName: "WINAL™ Wisound Lite",
      productAccent: "Wisound Lite",
      kmClass: "КМ-1",
      image: `${BASE}/variant-wisound-lite-layers.webp`,
      baseLabel: "ГКЛ",
      baseDescription: "малогорючая основа",
      mutedAccent: true,
    },
  ] satisfies WisoundVariant[],
  useCases: {
    title: "Сферы применения",
    description:
      "Офисы и переговорные, образовательные и медицинские учреждения, рестораны и отели, концертные и конференц-залы — пространства, где одновременно важны акустический комфорт, пожарная безопасность и выразительная архитектура.",
  },
} as const;
