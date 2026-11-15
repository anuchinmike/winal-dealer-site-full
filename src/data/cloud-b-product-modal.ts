export type CloudBFeature = {
  icon: string;
  title: string;
  description: string;
};

export type CloudBSpecItem = {
  name: string;
  value: string;
};

const BASE = "/images/product-modal/cloud-b";

export const CLOUD_B_PRODUCT_MODAL_ID = "cloud-b-product-modal";

export const cloudBModalAssets = {
  gallery: [`${BASE}/gallery-01.webp`, `${BASE}/gallery-02.webp`] as const,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
} as const;

export const cloudBProductModal = {
  categoryLabel: "АКУСТИЧЕСКИЕ БАФФЛЫ",
  title: "WINAL™ Cloud System B",
  description:
    "Вертикальные акустические баффлы из минерального волокна в окрашенном стеклохолсте. Подвешиваются на тросах в открытом потолочном пространстве, поглощают звук с двух сторон и помогают снизить реверберацию в высоких объёмах.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: "/images/product-modal/icons/phosphor-speaker-high.svg",
      title: "Двустороннее звукопоглощение",
      description:
        "Звук поглощается с обеих сторон баффла; на высоких потолках это эффективнее плоской панели той же площади.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-rows.svg",
      title: "Ритм потолка",
      description: "Вертикальные элементы задают геометрию и глубину, не закрывая перекрытие сплошным полем.",
    },
    {
      icon: "/images/product-modal/icons/winal-flame.svg",
      title: "КМ1 и малый вес",
      description: "Класс пожарной безопасности КМ1; масса около 3–4 кг/м², нагрузка на конструкции низкая.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-arrows-down-up.svg",
      title: "Регулируемый подвес",
      description:
        "Тросовые подвесы позволяют задать высоту и ритм; потолок остаётся проницаемым для света и вентиляции.",
    },
  ] satisfies CloudBFeature[],
  execution: {
    title: "Исполнения и монтаж",
    formats: {
      label: "Форматы",
      description: "Три стандартных модуля по ширине. Длина 1190 мм. Индивидуальные размеры — под заказ.",
      chips: ["1190×190 мм", "1190×290 мм", "1190×590 мм"],
    },
    thicknesses: {
      label: "Толщина",
      chips: ["20 мм", "30 мм", "40 мм", "50 мм"],
    },
    colors: {
      label: "Окрашивание",
      chips: ["RAL", "NCS"],
    },
    mounting: {
      label: "Монтаж",
      description:
        "Баффлы крепятся на регулируемые тросовые подвесы. Высоту и шаг можно настроить под объём помещения и инженерные системы.",
    },
  },
  characteristics: {
    title: "Характеристики",
    rows: [
      { name: "Конструкция", value: "минеральное волокно в стеклохолсте" },
      { name: "Средний коэффициент звукопоглощения", value: "до 0,95" },
      { name: "Рабочий диапазон", value: "500–4000 Гц" },
      { name: "Класс пожарной безопасности", value: "КМ1" },
      { name: "Масса", value: "~3–4 кг/м²" },
      { name: "Влажность эксплуатации", value: "до 95%" },
    ] satisfies CloudBSpecItem[],
  },
  useCases: {
    title: "Сферы применения",
    description:
      "Атриумы и холлы, open space, производственные и складские объёмы, спортивные залы, концертные и выставочные пространства — там, где нужен акустический комфорт при высоком потолке и открытой инженерии.",
  },
} as const;
