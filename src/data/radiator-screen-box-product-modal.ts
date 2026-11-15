import { asset } from "@/lib/asset";
export type RadiatorScreenBoxFeature = {
  icon: string;
  title: string;
  description: string;
};

export type RadiatorScreenBoxSpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/radiator-screen-box");

export const RADIATOR_SCREEN_BOX_PRODUCT_MODAL_ID = "radiator-screen-box-product-modal";

export const radiatorScreenBoxModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`, `${BASE}/gallery-04.webp`, `${BASE}/gallery-05.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

export const radiatorScreenBoxProductModal = {
  categoryLabel: "КОРОБ ДЛЯ РАДИАТОРА",
  title: "Экран радиатора WINAL™ СМЛ тип короб",
  description:
    "Объёмный защитно-декоративный короб на базе СМЛ полностью закрывает радиатор и подводящие коммуникации. Перфорированная панель сохраняет циркуляцию воздуха и создает строгую геометрию пристенной инженерной зоны.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: asset("/images/product-modal/icons/phosphor-eye-slash.svg"),
      title: "Полное скрытие прибора",
      description: "Короб полностью закрывает радиатор и формирует законченный вид инженерной зоны.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-arrows-clockwise.svg"),
      title: "Свободная циркуляция",
      description: "Перфорация сохраняет проход воздуха, не обещая рост эффективности отопления.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-shield-check.svg"),
      title: "Стабильная СМЛ-база",
      description: "Основа подходит для декоративной отделки и перфорации.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-palette.svg"),
      title: "Единый стиль отделки",
      description: "Короб можно согласовать с панелями, цветом и общей геометрией стены.",
    },
  ] satisfies RadiatorScreenBoxFeature[],
  construction: {
    title: "Форма короба",
    caption: "Отличие короба от накладного экрана — радиатор закрывается объёмом, а не плоской панелью.",
    items: ["Объемный короб", "Передняя панель", "Боковые элементы", "Декоративная перфорация"],
  },
  characteristics: {
    title: "Свойства и применение",
    caption: "Параметры ограничены основой, перфорацией и проектным монтажом — без обещания дополнительных свойств.",
    rows: [
      { name: "Основа", value: "СМЛ" },
      { name: "Тип", value: "короб" },
      { name: "Перфорация", value: "декоративная/воздухопроницаемая" },
      { name: "Монтаж", value: "по месту" },
      { name: "КМ готового изделия", value: "не заявляется без отдельного подтверждения" },
    ] satisfies RadiatorScreenBoxSpecItem[],
  },
} as const;
