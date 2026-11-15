export type UrbanCFeature = {
  icon: string;
  title: string;
  description: string;
};

export type UrbanCSpecItem = {
  name: string;
  value: string;
};

const BASE = "/images/product-modal/urban-c";

export const URBAN_C_PRODUCT_MODAL_ID = "urban-c-product-modal";

export const urbanCModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`] as const,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
} as const;

export const urbanCProductModal = {
  categoryLabel: "ПОТОЛОЧНЫЕ АКУСТИЧЕСКИЕ ПАНЕЛИ",
  title: "WINAL™ Urban C",
  description:
    "Потолочные металлические акустические панели WINAL™ Urban C из оцинкованной ПВС-сетки, минваты и стеклохолста. Скрытая система образует монолитный вид, класс НГ/КМ1 и NRC до 0,95 для контроля реверберации.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: "/images/product-modal/icons/phosphor-speaker-high.svg",
      title: "Акустика NRC до 0,95",
      description:
        "Высокий показатель звукопоглощения NRC до 0,95 обеспечивает эффективный контроль реверберации в больших объемах.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-arrows-down-up.svg",
      title: "Скрытая подвесная система",
      description: "Скрытый монтаж создает цельное монолитное потолочное поле без видимых элементов крепежа.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-cube.svg",
      title: "Стальная ПВС-конструкция",
      description: "Оцинкованная стальная просечно-вытяжная сетка с минватой и стеклохолстом устойчива к нагрузкам.",
    },
    {
      icon: "/images/product-modal/icons/winal-flame.svg",
      title: "Пожаробезопасность НГ/КМ1",
      description:
        "Соответствие классам НГ/КМ1 позволяет применять систему в помещениях с высокими требованиями к безопасности.",
    },
  ] satisfies UrbanCFeature[],
  execution: {
    title: "Система потолка",
    caption:
      "Скрытая подвесная система формирует монолитную плоскость потолка без видимого крепежа в индустриальном стиле.",
    system: {
      label: "Подвес",
      chips: ["Скрытая подвесная система"],
    },
    construction: {
      label: "Конструкция",
      chips: ["ПВС-сетка из оцинкованной стали", "Минеральное волокно", "Стеклохолст"],
    },
  },
  characteristics: {
    title: "Характеристики и сферы",
    caption:
      "Металлическая конструкция с минватой и стеклохолстом соответствует классу НГ/КМ1 и помогает контролировать реверберацию (NRC до 0,95).",
    rows: [
      { name: "NRC", value: "до 0,95" },
      { name: "aw", value: "0,8–0,95 в зависимости от схемы" },
      { name: "Класс", value: "КМ1 / НГ" },
      { name: "Влажность", value: "до 95%" },
      { name: "Сфера", value: "холлы, спорт, выставочные зоны" },
    ] satisfies UrbanCSpecItem[],
  },
} as const;
