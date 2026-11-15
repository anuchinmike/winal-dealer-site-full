export type LumenLineFeature = {
  icon: string;
  title: string;
  description: string;
};

export type LumenLineSpecItem = {
  name: string;
  value: string;
};

const BASE = "/images/product-modal/lumen-line";

export const LUMEN_LINE_PRODUCT_MODAL_ID = "lumen-line-product-modal";

export const lumenLineModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`, `${BASE}/gallery-04.webp`, `${BASE}/gallery-05.webp`] as const,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
} as const;

export const lumenLineProductModal = {
  categoryLabel: "СВЕТОВОЙ ПРОФИЛЬ",
  title: "WINAL™ LUMEN LINE",
  description:
    "Алюминиевый профиль WINAL™ LUMEN LINE для интеграции световых линий в узлы стеновых панелей. Обеспечивает аккуратное сопряжение облицовки и подсветки в единой плоскости интерьера.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: "/images/product-modal/icons/phosphor-wrench.svg",
      title: "Три типа узлов",
      description: "Соединительный профиль, внешний и внутренний углы для построения световых контуров.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-lightbulb.svg",
      title: "Световая интеграция",
      description: "Штатное посадочное место под подсветку в стыках и углах стеновых панелей WINAL™.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-palette.svg",
      title: "Окраска по RAL",
      description: "Профиль можно согласовать с палитрой проекта при подтверждении покрытия.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-link.svg",
      title: "Единая стеновая система",
      description: "Совместимость с панельной облицовкой WINAL™ без отдельного декоративного короба.",
    },
  ] satisfies LumenLineFeature[],
  types: {
    title: "Типы профиля",
    caption:
      "Конструктивные варианты профиля: прямое соединение панелей, оформление внешних и внутренних углов со встроенной подсветкой.",
    items: ["Соединительный профиль", "Внешний угол", "Внутренний угол", "Окраска RAL по запросу"],
  },
  application: {
    title: "Применение и ограничения",
    caption: "Числовые параметры пока не подтверждены, поэтому не добавляем высоты, мощности и IP.",
    items: ["Стыки стеновых панелей", "Углы стеновых панелей", "Архитектурная подсветка"],
    rows: [
      { name: "Совместимость", value: "проектная проверка" },
      { name: "Числовые параметры", value: "не подтверждены" },
    ] satisfies LumenLineSpecItem[],
  },
} as const;
