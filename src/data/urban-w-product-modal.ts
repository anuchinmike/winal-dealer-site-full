import { asset } from "@/lib/asset";
export type UrbanWFeature = {
  icon: string;
  title: string;
  description: string;
};

export type UrbanWSpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/urban-w");

export const URBAN_W_PRODUCT_MODAL_ID = "urban-w-product-modal";

export const urbanWModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

export const urbanWProductModal = {
  categoryLabel: "МЕТАЛЛИЧЕСКИЕ АКУСТИЧЕСКИЕ ПАНЕЛИ",
  title: "WINAL™ Urban W",
  description:
    "Стеновые металлические акустические панели WINAL™ Urban W в индустриальном стиле. Конструкция из ПВС-сетки, минваты и стеклохолста: класс НГ/КМ1, NRC до 0,95 (aw 0,8–0,95 по схеме) и влагостойкость до 95%.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: asset("/images/product-modal/icons/phosphor-speaker-high.svg"),
      title: "Акустика NRC до 0,95",
      description: "Звукопоглощение NRC до 0,95 (aw 0,8–0,95 в зависимости от схемы) эффективно гасит эхо и реверберацию.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-cube.svg"),
      title: "Стальная ПВС-конструкция",
      description:
        "Просечно-вытяжная сетка из оцинкованной стали в сочетании с минватой и стеклохолстом дает защиту и прочность.",
    },
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Пожаробезопасность НГ/КМ1",
      description:
        "Негорючая основа и класс пожарной опасности НГ/КМ1 обеспечивают безопасность на объектах с высокими требованиями.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-wrench.svg"),
      title: "Варианты монтажа",
      description: "Установка напрямую на стену или на каркасную систему при относительной влажности воздуха до 95%.",
    },
  ] satisfies UrbanWFeature[],
  execution: {
    title: "Конструкция и монтаж",
    caption:
      "Индустриальная эстетика оцинкованной ПВС-сетки в комбинации с минватой и стеклохолстом обеспечивает класс НГ/КМ1.",
    construction: {
      label: "Конструкция",
      chips: ["ПВС-сетка из оцинкованной стали", "Минеральное волокно", "Стеклохолст"],
    },
    mounting: {
      label: "Монтаж",
      description: "напрямую или на каркас",
    },
  },
  characteristics: {
    title: "Характеристики и зоны",
    caption:
      "Монтаж напрямую или на каркас обеспечивает акустическую эффективность (NRC до 0,95 / aw 0,8–0,95) и стойкость к влаге до 95%.",
    rows: [
      { name: "NRC", value: "до 0,95" },
      { name: "aw", value: "0,8–0,95 в зависимости от схемы" },
      { name: "Класс", value: "КМ1 / НГ" },
      { name: "Влажность", value: "до 95%" },
      { name: "Сфера", value: "холлы, спорт, офисы, общественные зоны" },
    ] satisfies UrbanWSpecItem[],
  },
} as const;
