export type CrystalBaseWnlFeature = {
  icon: string;
  title: string;
  description: string;
};

export type CrystalBaseWnlSpecItem = {
  name: string;
  value: string;
};

const BASE = "/images/product-modal/crystal-base-wnl";

export const CRYSTAL_BASE_WNL_PRODUCT_MODAL_ID = "crystal-base-wnl-product-modal";

export const crystalBaseWnlModalAssets = {
  gallery: [
    `${BASE}/gallery-render-node-20261105.webp`,
    `${BASE}/gallery-render-room-20261105.webp`,
    `${BASE}/gallery-01.webp`,
    `${BASE}/gallery-02.webp`,
  ] as const,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
} as const;

export const crystalBaseWnlProductModal = {
  categoryLabel: "ТОНКИЙ ПЛИНТУС ДЛЯ ПАНЕЛЕЙ",
  title: "Плинтус WINAL™ Crystal Base WNL",
  description:
    "Плинтус WINAL™ Crystal Base WNL с визуально тонкой линией примыкания. Аккуратная альтернатива массивному Strong с посадкой под толщину облицовки.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: "/images/product-modal/icons/phosphor-rectangle.svg",
      title: "Лаконичный контур",
      description: "Визуально лёгкий профиль для аккуратного оформления стыка стена-пол без массивных накладок.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-ruler.svg",
      title: "Линейка высот и толщин",
      description: "Типоразмеры WNL 100/12, 60/8, 60/10, 60/12 и 40/12 под панели различной толщины.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-bounding-box.svg",
      title: "Точный подбор под лист",
      description: "Выбор идет по высоте и толщине узла стеновой панели.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-split-horizontal.svg",
      title: "Отдельно от Slim",
      description: "WNL-размеры не смешиваются со скрытым алюминиевым Slim-профилем.",
    },
  ] satisfies CrystalBaseWnlFeature[],
  sizing: {
    title: "Типоразмеры WNL",
    caption: "Размерный ряд WNL: 100/12, 60/8, 60/10, 60/12 и 40/12 под толщину стеновых панелей.",
    items: ["WNL 100/12", "WNL 60/8", "WNL 60/10", "WNL 60/12", "WNL 40/12"],
  },
  selection: {
    title: "Подбор и монтаж",
    caption: "Чистая геометрия узла примыкания пола и панелей WINAL™ без смешения с Strong и Slim.",
    rows: [
      { name: "Роль", value: "нижнее примыкание" },
      { name: "Совместимость", value: "стеновые панели WINAL™" },
      { name: "Подбор", value: "по толщине листа" },
      { name: "Монтаж", value: "проектная схема" },
      { name: "Пожарность/влагостойкость", value: "не заявляется без связки материалов" },
    ] satisfies CrystalBaseWnlSpecItem[],
  },
} as const;
