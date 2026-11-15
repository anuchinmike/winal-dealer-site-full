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

const BASE = "/images/product-modal/wisound";

export const WISOUND_PRODUCT_MODAL_ID = "wisound-product-modal";

export const wisoundModalAssets = {
  gallery: [`${BASE}/diagram-exploded.webp`, `${BASE}/wisound-space.webp`] as const,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
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
    description: "Шесть вариантов перфорации — от равномерной сетки до декоративных прорезей. Диаметр отверстий 5–20 мм, шаг 18–30 мм.",
    patterns: [
      { name: "Cube", image: `${BASE}/perforation-cube.svg` },
      { name: "RX", image: `${BASE}/perforation-rx.svg` },
      { name: "Slots", image: `${BASE}/perforation-slots.svg` },
      { name: "Space", image: `${BASE}/perforation-space.svg` },
      { name: "RH", image: `${BASE}/perforation-rh.svg` },
      { name: "Lines", image: `${BASE}/perforation-lines.svg` },
    ],
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
      image: `${BASE}/variant-wisound-cutaway.webp`,
      baseLabel: "СМЛ",
      baseDescription: "негорючая основа",
    },
    {
      productName: "WINAL™ Wisound Lite",
      productAccent: "Wisound Lite",
      kmClass: "КМ-1",
      image: `${BASE}/variant-wisound-lite-cutaway.webp`,
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
