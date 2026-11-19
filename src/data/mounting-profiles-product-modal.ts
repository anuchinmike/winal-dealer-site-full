import { asset } from "@/lib/asset";
export type MountingProfilesFeature = {
  icon: string;
  title: string;
  description: string;
};

export type MountingProfilesSpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/mounting-profiles");
const FEATURE_ICON = asset("/images/product-modal/rythmwall/icon-install.svg");

export const MOUNTING_PROFILES_PRODUCT_MODAL_ID = "mounting-profiles-product-modal";

export const mountingProfilesModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`, `${BASE}/gallery-04.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

export const mountingProfilesProductModal = {
  categoryLabel: "ПРОФИЛИ ДЛЯ СТЕНОВЫХ СИСТЕМ",
  title: "Монтажные профили WINAL™",
  description:
    "Комплекс монтажных профилей WINAL™ для сборки стеновых панелей. Системные узлы обеспечивают надёжное сопряжение панелей в плоскостях, внешних и внутренних углах.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: asset("/images/product-modal/icons/phosphor-wrench.svg"),
      title: "Системные узлы сопряжения",
      description: "Профили типов Omega, H, L, T, F, Pi для стандартных узлов облицовки.",
    },
    {
      icon: FEATURE_ICON,
      title: "Открытый и скрытый монтаж",
      description: "Решения для открытого крепления и варианты со скрытой фиксацией панелей.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-palette.svg"),
      title: "Декоративные элементы",
      description: "Декоративные профили для финишного оформления стыков и торцов стеновой системы.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-package.svg"),
      title: "Комплектность поставки",
      description: "Подбор набора комплектующих WINAL™ под спецификацию и геометрию объекта.",
    },
  ] satisfies MountingProfilesFeature[],
  types: {
    title: "Типы профилей",
    caption: "Типовые конфигурации узлов: Omega, H, L, T, F, Pi для стыков, примыканий и угловых зон.",
    items: ["Omega", "H", "L", "T", "F", "Pi", "Декоративные профили", "Скрытое крепление"],
  },
  tasks: {
    title: "Задачи в системе",
    caption: "Монтажные элементы для открытой и скрытой фиксации стеновых панелей WINAL™.",
    items: ["Стыковка панелей", "Внешние и внутренние углы", "Открытое крепление", "Скрытое крепление"],
    rows: [{ name: "Совместимость", value: "по проекту" }] satisfies MountingProfilesSpecItem[],
  },
} as const;
