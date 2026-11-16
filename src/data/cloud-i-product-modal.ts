import { asset } from "@/lib/asset";
export type CloudIFeature = {
  icon: string;
  title: string;
  description: string;
};

export type CloudISpecItem = {
  name: string;
  value: string;
};

const BASE = asset("/images/product-modal/cloud-i");

export const CLOUD_I_PRODUCT_MODAL_ID = "cloud-i-product-modal";

export const cloudIModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`] as const,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
} as const;

export const cloudIProductModal = {
  categoryLabel: "АКУСТИЧЕСКИЕ ОСТРОВА",
  title: "WINAL™ Cloud System I",
  description:
    "Подвесные акустические острова WINAL™ Cloud System I из минерального волокна в стеклохолсте. Двустороннее звукопоглощение, пожаробезопасность КМ1, окраска RAL/NCS и свободное размещение на тросовых подвесах.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: asset("/images/product-modal/icons/phosphor-speaker-high.svg"),
      title: "Двустороннее поглощение",
      description: "Панель работает обеими поверхностями, точечно корректируя акустику непосредственно над рабочими зонами.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-ruler.svg"),
      title: "Геометрия и размеры",
      description: "Квадратные, прямоугольные и круглые элементы: 600×600, 1200×600, 1200×1200, 2400×1200, Ø800 и Ø1200 мм.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-arrows-down-up.svg"),
      title: "Тросовый монтаж",
      description: "Крепление на регулируемых тросовых подвесах позволяет зонировать пространство без сплошного потолка.",
    },
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Надежность КМ1 и RAL/NCS",
      description: "Класс пожарной опасности КМ1 и точный подбор цвета по каталогам RAL и NCS под дизайн проекта.",
    },
  ] satisfies CloudIFeature[],
  shapes: {
    title: "Формы и размеры",
    caption: "Двустороннее звукопоглощение и разнообразие форм (круг, квадрат, прямоугольник) для акцентного зонирования открытых пространств.",
    square: {
      label: "Квадрат",
      chips: ["600×600 мм", "1200×1200 мм"],
    },
    rectangle: {
      label: "Прямоугольник",
      chips: ["1200×600 мм", "2400×1200 мм"],
    },
    circle: {
      label: "Круг",
      chips: ["d.800 мм", "d.1200 мм"],
    },
    mounting: {
      label: "Монтаж",
      description: "тросовые подвесы",
    },
  },
  characteristics: {
    title: "Характеристики",
    rows: [
      { name: "Конструкция", value: "минеральное волокно в стеклохолсте" },
      { name: "NRC", value: "до 0,95" },
      { name: "Класс", value: "КМ1" },
      { name: "Окрашивание", value: "RAL и NCS" },
      { name: "Влажность", value: "до 95%" },
      { name: "Монтаж", value: "подвесы" },
    ] satisfies CloudISpecItem[],
  },
  useCases: {
    title: "Применение",
    description: "Монтаж на тросовых подвесах с регулировкой высоты в размерах от 600×600 до 2400×1200 мм и диаметрах 800/1200 мм.",
  },
} as const;
