import { asset } from "@/lib/asset";
export type WallProFeature = {
  icon: string;
  title: string;
  description: string;
};

export type WallProSpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/wallpro");

export const WALLPRO_PRODUCT_MODAL_ID = "wallpro-product-modal";

export const wallProModalAssets = {
  gallery: [`${BASE}/render-office-overview.webp`, `${BASE}/render-office-detail.webp`, `${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

export const wallProProductModal = {
  categoryLabel: "ГОТОВАЯ СИСТЕМА ПЕРЕГОРОДОК",
  title: "WINAL™ WallPro",
  description:
    "Готовая каркасная система перегородок WINAL™ WallPro толщиной от 100 мм на основе каркаса, наполнителя WINAL™ Isol и панелей ГКЛ/СМЛ в декоре WINAL™. Обеспечивает звукоизоляцию Rw 58–64 дБ и сухой монтаж.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: asset("/images/product-modal/icons/phosphor-speaker-high.svg"),
      title: "Звукоизоляция Rw 58–64 дБ",
      description: "Показатель относится к конструкции перегородки с наполнителем WINAL™ Isol, а не к одному материалу.",
    },
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Огнестойкость до EI180",
      description: "Три конструкции: ГКЛ–ГКЛ EI60, ГКЛ–СМЛ EI90, СМЛ–СМЛ EI180.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-ruler.svg"),
      title: "Толщина системы от 100 мм",
      description: "Система начинается с компактной толщины и подбирается под задачу объекта.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-wrench.svg"),
      title: "Чистый сухой монтаж",
      description: "Каркас, наполнитель и панели собираются без мокрых процессов отделки.",
    },
  ] satisfies WallProFeature[],
  constructions: {
    title: "Три конструкции",
    caption:
      "Варианты огнестойкости: конструкции ГКЛ–ГКЛ (EI60), ГКЛ–СМЛ (EI90) и СМЛ–СМЛ (EI180) под требования пожарной безопасности проекта.",
    rows: [
      { label: "ГКЛ–ГКЛ", chips: ["EI60"] },
      { label: "ГКЛ–СМЛ", chips: ["EI90"] },
      { label: "СМЛ–СМЛ", chips: ["EI180"] },
      { label: "Звукоизоляция системы", chips: ["Rw 58–64 дБ"] },
    ],
  },
  assembly: {
    title: "Узлы и применение",
    caption:
      "Типовые узлы примыкания и сухой метод сборки ускоряют монтаж каркаса, наполнителя WINAL™ Isol и декоративных панелей WINAL™.",
    components: ["Каркас", "WINAL™ Isol", "ГКЛ или СМЛ", "Декоративные панели WINAL™"],
    specs: [
      { name: "Толщина", value: "от 100 мм" },
      { name: "Монтаж", value: "сухая сборка" },
    ] satisfies WallProSpecItem[],
  },
} as const;
