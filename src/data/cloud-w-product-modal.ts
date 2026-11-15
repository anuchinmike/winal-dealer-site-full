export type CloudWFeature = {
  icon: string;
  title: string;
  description: string;
};

export type CloudWSpecItem = {
  name: string;
  value: string;
};

const BASE = "/images/product-modal/cloud-w";

export const CLOUD_W_PRODUCT_MODAL_ID = "cloud-w-product-modal";

export const cloudWModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`, `${BASE}/gallery-04.webp`] as const,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
} as const;

export const cloudWProductModal = {
  categoryLabel: "АКУСТИЧЕСКИЕ СТЕНОВЫЕ ПАНЕЛИ",
  title: "WINAL™ Cloud System W",
  description:
    "Стеновые панели WINAL™ Cloud System W из минерального волокна в окрашенном стеклохолсте. Обеспечивают поглощение звука с NRC до 0,95 (500–4000 Гц), класс пожарной безопасности КМ1 и влагостойкость до 95%.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: "/images/product-modal/icons/phosphor-speaker-high.svg",
      title: "Акустика NRC до 0,95",
      description: "Высокое звукопоглощение в диапазоне 500–4000 Гц снижает гулкость в рабочих и общественных зонах.",
    },
    {
      icon: "/images/product-modal/icons/winal-flame.svg",
      title: "Пожаробезопасность КМ1",
      description: "Панели соответствуют классу пожарной опасности КМ1 и подходят для помещений с повышенными требованиями.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-ruler.svg",
      title: "Легкость и форматы",
      description: "Вес ~3–4 кг/м² упрощает монтаж. Доступны типоразмеры 1200×600 и 600×600 мм с окраской RAL/NCS.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-wrench.svg",
      title: "Варианты монтажа",
      description: "Установка непосредственно на стену или на каркасную подсистему при влажности воздуха до 95%.",
    },
  ] satisfies CloudWFeature[],
  execution: {
    title: "Исполнения и монтаж",
    caption: "Окрашенный стеклохолст в цветах RAL/NCS и минеральная основа формируют аккуратный интерьер с влагостойкостью до 95%.",
    formats: {
      label: "Форматы",
      chips: ["1200×600 мм", "600×600 мм"],
    },
    coloring: {
      label: "Окрашивание",
      chips: ["RAL", "NCS"],
    },
    mounting: {
      label: "Монтаж",
      description: "каркас или напрямую",
    },
    thicknesses: {
      label: "Толщины",
      chips: ["20 мм", "30 мм", "40 мм", "50 мм"],
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
    ] satisfies CloudWSpecItem[],
  },
  useCases: {
    title: "Применение",
    description: "Монтаж на каркас или напрямую на основание в форматах 1200×600 и 600×600 мм обеспечивает быстрый ввод объекта в эксплуатацию.",
  },
} as const;
