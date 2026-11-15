export type HiddenAluminumBaseboardFeature = {
  icon: string;
  title: string;
  description: string;
};

export type HiddenAluminumBaseboardSpecItem = {
  name: string;
  value: string;
};

const BASE = "/images/product-modal/hidden-aluminum-baseboard";
const FEATURE_ICON = "/images/product-modal/rythmwall/icon-install.svg";

export const HIDDEN_ALUMINUM_BASEBOARD_PRODUCT_MODAL_ID = "hidden-aluminum-baseboard-product-modal";

export const hiddenAluminumBaseboardModalAssets = {
  gallery: [`${BASE}/gallery-node.webp`, `${BASE}/gallery-studio.webp`, `${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`] as const,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
} as const;

export const hiddenAluminumBaseboardProductModal = {
  categoryLabel: "СКРЫТЫЙ АЛЮМИНИЕВЫЙ ПРОФИЛЬ",
  title: "Алюминиевый скрытый плинтус WINAL™",
  description:
    "Скрытый алюминиевый плинтус WINAL™ для минималистичного примыкания панельной облицовки к уровню пола. Помогает убрать выступающий плинтус и сохранить ровную архитектурную плоскость.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: FEATURE_ICON,
      title: "Скрытое примыкание",
      description: "Формирует западающий цоколь и ровную теневую линию по периметру помещения.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-ruler.svg",
      title: "Типоразмеры WNL",
      description: "Профили WNL 40×15 и 100×13 для стандартных панелей, а также 101×74 для окрашенного ГКЛ.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-bounding-box.svg",
      title: "Специфика WNL 101×74",
      description: "Специализированный узел, применяемый исключительно для окрашенного ГКЛ.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-link.svg",
      title: "Интеграция в систему",
      description: "Подбор зависит от основания, отделки и примыкания пола; Slim 70×13 не смешивать.",
    },
  ] satisfies HiddenAluminumBaseboardFeature[],
  sizing: {
    title: "Размеры и ограничения",
    caption: "Профили WNL 40×15 и 100×13, а также модификация 101×74 под окрашенный ГКЛ.",
    items: ["WNL 40×15", "WNL 100×13", "WNL 101×74: только окрашенный ГКЛ", "Slim 70×13: не смешивать"],
  },
  application: {
    title: "Применение в интерьере",
    caption: "Скрытый монтажный узел WINAL™ для минималистичных примыканий; Slim 70×13 не включать как WNL.",
    rows: [
      { name: "Роль", value: "скрытое примыкание" },
      { name: "Материал", value: "алюминиевый профиль" },
      { name: "Сценарий", value: "минималистичные стены" },
      { name: "Совместимость", value: "по проекту" },
      { name: "Пожарность/влагостойкость", value: "не заявляется без связки материалов" },
    ] satisfies HiddenAluminumBaseboardSpecItem[],
  },
} as const;
