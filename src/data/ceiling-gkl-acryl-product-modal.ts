export type CeilingGklAcrylFeature = {
  icon: string;
  title: string;
  description: string;
};

export type CeilingGklAcrylSpecItem = {
  name: string;
  value: string;
};

const BASE = "/images/product-modal/ceiling-gkl-acryl";

export const CEILING_GKL_ACRYL_PRODUCT_MODAL_ID = "ceiling-gkl-acryl-product-modal";

export const ceilingGklAcrylModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`] as const,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
} as const;

export const ceilingGklAcrylProductModal = {
  categoryLabel: "ПОТОЛОЧНЫЕ ПАНЕЛИ НА ГКЛ",
  title: "Потолочные панели WINAL™ ГКЛ Акрил",
  description:
    "Экономичные потолочные панели на базе ГКЛ с фабричным акриловым окрашиванием (КМ-1). Рациональный выбор для отделки потолков в сухих коммерческих и офисных интерьерах.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: "/images/product-modal/icons/winal-flame.svg",
      title: "Пожарная безопасность КМ-1",
      description: "Сертифицированное решение на гипсокартонной основе для стандартных требований пожарной безопасности.",
    },
    {
      icon: "/images/product-modal/icons/tabler-spray.svg",
      title: "Заводская покраска акрилом",
      description: "Готовая однотонная поверхность без покраски на объекте.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-coins.svg",
      title: "Рациональный бюджет",
      description: "ГКЛ-основа не переносит на себя влагостойкость СМЛ и другие чужие свойства.",
    },
    {
      icon: "/images/product-modal/icons/figma-dry-mount.svg",
      title: "Системы монтажа T-24 и 60×27",
      description: "Быстрая укладка в ячейки T-24 либо крепление на скрытый каркас 60×27 мм.",
    },
  ] satisfies CeilingGklAcrylFeature[],
  execution: {
    title: "Основа и покрытие",
    caption: "ГКЛ Акрил отличается от СМЛ Акрил другой основой — без переноса влагостойкости с СМЛ-линейки.",
    base: { label: "Основа", value: "ГКЛ" },
    coating: { label: "Покрытие", value: "акриловая окраска" },
    formats: { label: "Форматы", chips: ["594×594 мм", "1194×594 мм"] },
    mounting: { label: "Монтаж", chips: ["T24", "скрытое 60×27 мм"] },
  },
  characteristics: {
    title: "Характеристики",
    caption: "Параметры ограничены основой, покрытием, классом и форматами — звукоизоляция и влагостойкость для ГКЛ Акрил не заявляются.",
    rows: [
      { name: "Основа", value: "ГКЛ" },
      { name: "Покрытие", value: "акрил" },
      { name: "Класс", value: "КМ-1" },
      { name: "Форматы", value: "594×594 / 1194×594 мм" },
      { name: "Сфера", value: "коммерческие потолки" },
    ] satisfies CeilingGklAcrylSpecItem[],
  },
} as const;
