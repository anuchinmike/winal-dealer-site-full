import { asset } from "@/lib/asset";
export type RadiatorScreenSillFeature = {
  icon: string;
  title: string;
  description: string;
};

export type RadiatorScreenSillSpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/radiator-screen-sill");
const FEATURE_ICON = asset("/images/catalog/icon-perforation.svg");

export const RADIATOR_SCREEN_SILL_PRODUCT_MODAL_ID = "radiator-screen-sill-product-modal";

export const radiatorScreenSillModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

export const radiatorScreenSillProductModal = {
  categoryLabel: "ЭКРАНЫ РАДИАТОРОВ",
  title: "Экран радиатора WINAL™ СМЛ с подоконником",
  description:
    "Интегрированное решение на основе СМЛ объединяет экран радиатора и подоконную доску в единый узел. Декоративная перфорация сохраняет конвекцию и формирует аккуратную линию оконного блока.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: FEATURE_ICON,
      title: "Единый оконный узел",
      description: "Конструкция связывает подоконник и экран радиатора без визуальных разрывов.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-arrows-clockwise.svg"),
      title: "Конвекция воздуха",
      description: "Декоративная перфорация лицевой панели сохраняет циркуляцию воздуха от отопительного прибора.",
    },
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Огнестойкая основа",
      description: "КМ-0 относится к СМЛ-основе, не к универсальному готовому изделию.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-swatches.svg"),
      title: "Единый стиль",
      description: "Решение согласуется с остальными стеновыми панелями проекта.",
    },
  ] satisfies RadiatorScreenSillFeature[],
  construction: {
    title: "Конструкция окна",
    caption: "Главное отличие продукта — связка экрана и подоконника.",
    items: ["Экран радиатора", "Интегрированный подоконник", "СМЛ-основа", "Перфорация"],
  },
  characteristics: {
    title: "Характеристики и ограничения",
    caption: "КМ-0 указывается только для подтверждённой основы и узла; рост эффективности отопления не заявляется.",
    rows: [
      { name: "Основа", value: "СМЛ" },
      { name: "Перфорация", value: "декоративная/воздухопроницаемая" },
      { name: "КМ-0", value: "только для подтверждённой основы" },
      { name: "Сфера", value: "оконные зоны офисов и общественных интерьеров" },
      { name: "Теплоотдача", value: "без обещаний роста" },
    ] satisfies RadiatorScreenSillSpecItem[],
  },
} as const;
