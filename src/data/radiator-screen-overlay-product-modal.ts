export type RadiatorScreenOverlayFeature = {
  icon: string;
  title: string;
  description: string;
};

export type RadiatorScreenOverlaySpecItem = {
  name: string;
  value: string;
};

const BASE = "/images/product-modal/radiator-screen-overlay";

export const RADIATOR_SCREEN_OVERLAY_PRODUCT_MODAL_ID = "radiator-screen-overlay-product-modal";

export const radiatorScreenOverlayModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`, `${BASE}/gallery-04.webp`, `${BASE}/gallery-05.webp`] as const,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
} as const;

export const radiatorScreenOverlayProductModal = {
  categoryLabel: "НАКЛАДНОЙ ЭКРАН РАДИАТОРА",
  title: "Экран радиатора WINAL™ СМЛ накладной",
  description:
    "Накладной перфорированный экран на СМЛ-основе для быстрого закрытия радиаторов при реконструкции. Маскирует отопительные приборы, сохраняя конвекцию и общий стиль отделки стен WINAL™.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: "/images/product-modal/icons/phosphor-rectangle.svg",
      title: "Быстрое перекрытие ниш",
      description: "Оптимален для реконструкций: монтируется поверх существующего радиатора без объемного короба.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-arrows-clockwise.svg",
      title: "Тепловая конвекция",
      description: "Перфорация сохраняет проход воздуха без обещаний роста теплоотдачи.",
    },
    {
      icon: "/images/product-modal/icons/winal-flame.svg",
      title: "Пожаростойкая база",
      description: "КМ-0 относится к СМЛ-основе, не к универсальному готовому изделию.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-palette.svg",
      title: "Сочетаемость декоров",
      description: "Поверхность подбирается в связке со стеновыми панелями проекта.",
    },
  ] satisfies RadiatorScreenOverlayFeature[],
  construction: {
    title: "Сценарий применения",
    caption: "Отличие продукта — быстрый накладной сценарий, а не полноценный короб.",
    items: ["Накладной экран", "Существующий радиатор", "Реконструкция", "Декоративная перфорация"],
  },
  characteristics: {
    title: "Характеристики и ограничения",
    caption: "Технический блок: основа, тип экрана и перфорация — без обещаний роста теплоэффективности.",
    rows: [
      { name: "Основа", value: "СМЛ" },
      { name: "Тип", value: "накладной" },
      { name: "Монтаж", value: "по месту" },
      { name: "КМ готового изделия", value: "не заявляется без отдельного подтверждения" },
      { name: "Теплоэффективность", value: "не заявляется" },
    ] satisfies RadiatorScreenOverlaySpecItem[],
  },
} as const;
