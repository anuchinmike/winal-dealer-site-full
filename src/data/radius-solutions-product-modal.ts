export type RadiusSolutionsFeature = {
  icon: string;
  title: string;
  description: string;
};

export type RadiusSolutionsSpecItem = {
  name: string;
  value: string;
};

const BASE = "/images/product-modal/radius-solutions";

export const RADIUS_SOLUTIONS_PRODUCT_MODAL_ID = "radius-solutions-product-modal";

export const radiusSolutionsModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`] as const,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
} as const;

export const radiusSolutionsProductModal = {
  categoryLabel: "РАДИУСНЫЕ И НЕСТАНДАРТНЫЕ ПОВЕРХНОСТИ",
  title: "Радиусные решения WINAL™",
  description:
    "Проектные решения для облицовки колонн, пилонов, арок и криволинейных стен. Выполняются на базе совместимых плит и покрытий WINAL™ под заданную геометрию объекта.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: "/images/product-modal/icons/figma-radius.svg",
      title: "Криволинейные поверхности",
      description: "Индивидуальный расчет узлов для отделки круглых колонн, криволинейных стен и перегородок.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-swatches.svg",
      title: "Совместимость с гаммой WINAL™",
      description: "Единый визуальный стиль с прямыми стеновыми панелями: совпадение декоров и оттенков.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-link.svg",
      title: "Проектная связка материалов",
      description: "Подбор типа основы, покрытия и декора под геометрию и технические условия объекта.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-path.svg",
      title: "Без таблицы радиусов",
      description: "Радиусы, пожарность и конструкция зависят от выбранной связки.",
    },
  ] satisfies RadiusSolutionsFeature[],
  combinations: {
    title: "Совместимые связки",
    caption:
      "Виртуальная проектная позиция: геометрические параметры и способы фиксации рассчитываются под конкретную архитектурную задачу.",
    items: ["Основа: по проекту", "Покрытие: по проекту", "Декор: по проекту", "Геометрия: радиусная/нестандартная"],
  },
  limits: {
    title: "Ограничения",
    caption: "Пожарный класс готового радиусного элемента определяется выбранной связкой основы и декоративного покрытия.",
    rows: [
      { name: "Радиус", value: "расчетный" },
      { name: "Пожарный класс", value: "зависит от связки" },
      { name: "Точное фото", value: "GSH_1247-1" },
      { name: "Сфера", value: "акцентные стены, общественные зоны" },
    ] satisfies RadiusSolutionsSpecItem[],
    notes: ["Нужен проектный узел"],
  },
} as const;
