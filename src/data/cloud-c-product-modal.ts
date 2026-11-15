export type CloudCFeature = {
  icon: string;
  title: string;
  description: string;
};

export type CloudCSpecItem = {
  name: string;
  value: string;
};

const BASE = "/images/product-modal/cloud-c";

export const CLOUD_C_PRODUCT_MODAL_ID = "cloud-c-product-modal";

export const cloudCModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`, `${BASE}/gallery-04.webp`] as const,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
} as const;

export const cloudCProductModal = {
  categoryLabel: "АКУСТИЧЕСКИЕ ПОТОЛОЧНЫЕ ПАНЕЛИ",
  title: "WINAL™ Cloud System C",
  description:
    "Потолочные акустические панели WINAL™ Cloud System C из минерального волокна в окрашенном стеклохолсте. Звукопоглощение NRC до 0,95 (500–4000 Гц), пожарная безопасность КМ1 и совместимость со стандартными потолками.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: "/images/product-modal/icons/phosphor-speaker-high.svg",
      title: "Акустика NRC до 0,95",
      description: "Поглощение звука в диапазоне 500–4000 Гц эффективно сокращает время реверберации в помещениях.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-ruler.svg",
      title: "Потолочные форматы",
      description: "Типоразмеры 594×594 и 1194×594 мм для установки в подвесные системы или прямого крепления к перекрытию.",
    },
    {
      icon: "/images/product-modal/icons/winal-flame.svg",
      title: "Пожаробезопасность КМ1",
      description: "Соответствие классу КМ1 и влагостойкость до 95% для общественных и коммерческих объектов.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-palette.svg",
      title: "Вес и палитра RAL/NCS",
      description: "Малая масса ~3–4 кг/м² снижает нагрузку на подвесы, а палитра RAL/NCS дает гибкость в дизайне потолка.",
    },
  ] satisfies CloudCFeature[],
  execution: {
    title: "Форматы и монтаж",
    caption: "Окрашенный стеклохолст в каталогах RAL/NCS обеспечивает аккуратную фактуру потолочного поля при стойкости к влаге до 95%.",
    formats: {
      label: "Форматы",
      chips: ["594×594 мм", "1194×594 мм"],
    },
    mounting: {
      label: "Монтаж",
      chips: ["подвесные системы", "крепление к перекрытию"],
    },
    coloring: {
      label: "Окрашивание",
      chips: ["RAL", "NCS"],
    },
  },
  characteristics: {
    title: "Характеристики",
    rows: [
      { name: "Конструкция", value: "минеральное волокно в стеклохолсте" },
      { name: "NRC", value: "до 0,95" },
      { name: "Рабочий диапазон", value: "500–4000 Гц" },
      { name: "Класс", value: "КМ1" },
      { name: "Масса", value: "~3–4 кг/м²" },
      { name: "Влажность", value: "до 95%" },
    ] satisfies CloudCSpecItem[],
  },
  useCases: {
    title: "Применение",
    description: "Установка в модульные подвесные системы или прямое крепление к перекрытию в размерах 594×594 и 1194×594 мм.",
  },
} as const;
