export type InvisibleBasicReverseFeature = {
  icon: string;
  title: string;
  description: string;
};

export type InvisibleBasicReverseSpecItem = {
  name: string;
  value: string;
};

const BASE = "/images/product-modal/invisible-basic-reverse";

export const INVISIBLE_BASIC_REVERSE_PRODUCT_MODAL_ID = "invisible-basic-reverse-product-modal";

export const invisibleBasicReverseModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`, `${BASE}/gallery-04.webp`, `${BASE}/gallery-05.webp`] as const,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
} as const;

export const invisibleBasicReverseProductModal = {
  categoryLabel: "СКРЫТЫЕ ДВЕРИ ОБРАТНОГО ОТКРЫВАНИЯ",
  title: "Двери WINAL™ Invisible Basic Reverse",
  description:
    "Скрытая дверь WINAL™ Invisible Basic Reverse толщиной 57 мм с реверсивным открыванием от себя. Сохраняет единую плоскость со стеной при сложной геометрии проходов, огнестойкости EI30 и отделке в цвет панелей WINAL™.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: "/images/product-modal/icons/phosphor-door.svg",
      title: "Реверсивное открывание",
      description: "Обратное открывание от себя сохраняет компланарность полотна со стеной в сложной планировке.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-ruler.svg",
      title: "Толщина полотна 57 мм",
      description: "Усиленное полотно 57 мм на СМЛ-основе отличает Reverse от обычной версии Basic.",
    },
    {
      icon: "/images/product-modal/icons/winal-flame.svg",
      title: "Огнестойкость EI30",
      description: "Параметр подтвержден для Reverse и не переносится на Clean.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-palette.svg",
      title: "Габариты и декоры WINAL™",
      description: "Ширина 400–1200 мм, высота 1500–2780 мм, отделка акрилом, ПВХ, HPL или шпоном.",
    },
  ] satisfies InvisibleBasicReverseFeature[],
  opening: {
    title: "Открывание и покрытия",
    caption: "Увеличенная толщина 57 мм и скрытый короб нужны для сценария обратного открывания.",
    openingDirection: { label: "Открывание", chips: ["на себя", "от себя"] },
    coatings: { label: "Покрытия", chips: ["акрил", "ПВХ", "HPL", "шпон"] },
    attributes: ["Скрытый короб", "Без наличников"],
  },
  sizes: {
    title: "Размеры и ограничения",
    caption: "Единая отделка в тон стеновых панелей (акрил, ПВХ, HPL, шпон) при сохранении предела огнестойкости EI30.",
    rows: [
      { name: "Высота", value: "1500–2780 мм" },
      { name: "Ширина", value: "400–1200 мм" },
      { name: "Толщина", value: "57 мм" },
      { name: "Пожарность", value: "EI30" },
      { name: "Основа", value: "СМЛ" },
    ] satisfies InvisibleBasicReverseSpecItem[],
  },
} as const;
