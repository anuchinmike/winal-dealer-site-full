export type InvisibleBasicFeature = {
  icon: string;
  title: string;
  description: string;
};

export type InvisibleBasicSpecItem = {
  name: string;
  value: string;
};

const BASE = "/images/product-modal/invisible-basic";

export const INVISIBLE_BASIC_PRODUCT_MODAL_ID = "invisible-basic-product-modal";

export const invisibleBasicModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`, `${BASE}/gallery-04.webp`, `${BASE}/gallery-05.webp`] as const,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
} as const;

export const invisibleBasicProductModal = {
  categoryLabel: "СКРЫТЫЕ ДВЕРИ",
  title: "Двери WINAL™ Invisible Basic",
  description:
    "Скрытая дверь WINAL™ Invisible Basic на СМЛ-основе со скрытым коробом и открыванием на себя. Интегрируется в плоскость перегородки с отделкой акрилом, ПВХ, HPL или шпоном; предел огнестойкости EI30.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: "/images/product-modal/icons/phosphor-door.svg",
      title: "Открывание на себя",
      description: "Классическое прямое открывание со скрытым коробом для монтажа в один уровень со стеной.",
    },
    {
      icon: "/images/product-modal/icons/winal-flame.svg",
      title: "Огнестойкость EI30",
      description: "Параметр подтвержден для Basic и не переносится на Clean.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-ruler.svg",
      title: "Толщина полотна 40–42 мм",
      description: "Полотно 40–42 мм при ширине 400–1200 мм и высоте 1500–2780 мм.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-palette.svg",
      title: "4 типа отделки",
      description: "Полотно декорируется акрилом, ПВХ, HPL или шпоном в связке со стеновыми панелями WINAL™.",
    },
  ] satisfies InvisibleBasicFeature[],
  opening: {
    title: "Покрытия и открывание",
    caption: "Скрытый короб и СМЛ-основа полотна толщиной 40–42 мм формируют ровную поверхность со стеновыми панелями.",
    coatings: { label: "Покрытия", chips: ["акрил", "ПВХ", "HPL", "шпон"] },
    openingDirection: { label: "Открывание", chips: ["на себя"] },
    attributes: ["Скрытый короб", "Без наличников"],
  },
  sizes: {
    title: "Размеры и интеграция",
    caption: "Доступные размеры: ширина от 400 до 1200 мм, высота от 1500 до 2780 мм с отделкой акрилом, ПВХ, HPL или шпоном.",
    rows: [
      { name: "Высота", value: "1500–2780 мм" },
      { name: "Ширина", value: "400–1200 мм" },
      { name: "Толщина", value: "40–42 мм" },
      { name: "Пожарность", value: "EI30" },
      { name: "Основа", value: "СМЛ" },
    ] satisfies InvisibleBasicSpecItem[],
  },
} as const;
