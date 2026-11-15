import { asset } from "@/lib/asset";
export type StrongBaseWnlFeature = {
  icon: string;
  title: string;
  description: string;
};

export type StrongBaseWnlSpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/strong-base-wnl");

export const STRONG_BASE_WNL_PRODUCT_MODAL_ID = "strong-base-wnl-product-modal";

export const strongBaseWnlModalAssets = {
  gallery: [`${BASE}/gallery-node.webp`, `${BASE}/gallery-studio.webp`, `${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

export const strongBaseWnlProductModal = {
  categoryLabel: "УСИЛЕННЫЙ ПЛИНТУС",
  title: "Плинтус WINAL™ Strong Base",
  description:
    "Усиленный плинтус WINAL™ Strong Base для защиты нижнего примыкания стеновой системы к полу. Прочная конструкция для зон с повышенной эксплуатационной нагрузкой.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: asset("/images/product-modal/icons/figma-shield-check.svg"),
      title: "Защита нижнего узла",
      description: "Усиленное сечение предохраняет кромку стеновых панелей WINAL™ от механических воздействий.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-ruler.svg"),
      title: "Типоразмеры BS",
      description: "Доступен в базовых типоразмерах BS 40/13, 60/13 и 100/13 для различных высот примыкания.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-palette.svg"),
      title: "Проектная окраска",
      description: "Окраска и отделка подбираются по проекту, без универсальных заявлений о пожарности или влагостойкости.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-toolbox.svg"),
      title: "Монтаж в систему",
      description: "Штатная интеграция с панельными конструкциями WINAL™ по проектной схеме установки.",
    },
  ] satisfies StrongBaseWnlFeature[],
  sizing: {
    title: "Типоразмеры и подбор",
    caption: "Сечения BS 40/13, 60/13 и 100/13 для надежного закрытия технологического зазора и защиты панелей.",
    items: ["BS 40/13", "BS 60/13", "BS 100/13"],
    rows: [
      { name: "Узел", value: "нижнее примыкание" },
      { name: "Окраска/отделка", value: "по проекту" },
    ] satisfies StrongBaseWnlSpecItem[],
  },
  application: {
    title: "Применение и монтаж",
    caption: "Плинтус WINAL™ Strong Base не смешивается с Crystal и скрытым алюминиевым плинтусом.",
    items: ["Защита стены у пола", "Закрытие стыка"],
    rows: [
      { name: "Совместимость", value: "панели WINAL™" },
      { name: "Монтаж", value: "проектная схема" },
      { name: "Влагостойкость/пожарность", value: "не заявляется без связки материалов" },
    ] satisfies StrongBaseWnlSpecItem[],
  },
} as const;
