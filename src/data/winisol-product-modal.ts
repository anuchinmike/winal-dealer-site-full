import { asset } from "@/lib/asset";
export type WinisolFeature = {
  icon: string;
  title: string;
  description: string;
};

export type WinisolSpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/winisol");

export const WINISOL_PRODUCT_MODAL_ID = "winisol-product-modal";

export const winisolModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`, `${BASE}/gallery-03.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

export const winisolProductModal = {
  categoryLabel: "ЗВУКОИЗОЛЯЦИОННЫЙ НАПОЛНИТЕЛЬ",
  title: "WINAL™ Isol",
  description:
    "Звукоизоляционный наполнитель WINAL™ Isol из минерального волокна на основе кварцевого песка для каркасных перегородок и систем WINAL™ WallPro. Негорючий, без фенолформальдегидных смол, с функцией теплоизоляции.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: asset("/images/product-modal/icons/phosphor-stack.svg"),
      title: "Минеральное волокно",
      description: "Наполнитель на основе кварцевого песка работает внутри каркасных перегородочных конструкций.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-leaf.svg"),
      title: "Без фенолформальдегида",
      description: "Состав заявлен без фенолформальдегидных связующих.",
    },
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Негорючий состав",
      description: "Минеральный состав поддерживает требования к безопасным системам.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-path.svg"),
      title: "Эластичность и удобство",
      description: "Эластичный материал не пылит и не колется, плотнее заполняя полости каркаса.",
    },
  ] satisfies WinisolFeature[],
  role: {
    title: "Роль в системе",
    caption: "Структура волокна обеспечивает звукопоглощение в теле перегородки и дополнительную теплоизоляцию контура.",
    items: ["Каркасные перегородки", "WINAL™ WallPro", "Дополнительная теплоизоляция", "Упругий акустический слой"],
  },
  characteristics: {
    title: "Свойства и ограничения",
    caption: "Эластичный материал монтируется в каркас WINAL™ WallPro; Rw всей стены наполнителю не приписывается.",
    rows: [
      { name: "Основа", value: "минеральное волокно" },
      { name: "Размер", value: "1300 × 610 мм, толщина 50, 75 и 100 мм" },
      { name: "Сырье", value: "кварцевый песок" },
      { name: "Связующие", value: "без фенолформальдегидных смол" },
      { name: "Поведение", value: "эластичный, не колется, не пылит" },
      { name: "Роль", value: "звуко- и теплоизоляционный слой" },
    ] satisfies WinisolSpecItem[],
  },
} as const;
