import { wallHplCoatingGroups } from "@/data/wall-hpl-coatings";

export type SlatSmlHplFeature = {
  icon: string;
  title: string;
  description: string;
};

export type SlatSmlHplSpecRow = {
  label: string;
  value: string;
};

export type SlatSmlHplGalleryImage = {
  src: string;
  caption: string;
};

const SML_ACRYL_ICONS = "/images/product-modal/wall-sml-acryl";
const HPL_ICONS = "/images/product-modal/wall-hpl-shared/icons";
const DEALER_ICONS = "/images/product-modal/wall-pvc-shared/icons";
const GALLERY = "/images/product-modal/slat-sml-hpl/gallery";

export const SLAT_SML_HPL_PRODUCT_MODAL_ID = "slat-sml-hpl-product-modal";

export const slatSmlHplModalAssets = {
  gallery: [
    { src: `${GALLERY}/paneli-reechnie-hpl-sml-alumini-lm1003.webp`, caption: "Реечные панели WINAL™ СМЛ HPL Металлик LM-1003" },
    { src: `${GALLERY}/paneli-reechnie-hpl-sml-alumini-lm1003-sk.webp`, caption: "Реечные панели WINAL™ СМЛ HPL Металлик LM-1003, скрытое крепление" },
  ] as const satisfies readonly SlatSmlHplGalleryImage[],
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
  icons: {
    fire: "/images/product-modal/icons/winal-flame.svg",
    uv: `${SML_ACRYL_ICONS}/icon-hero-uv.svg`,
    moisture: `${SML_ACRYL_ICONS}/icon-hero-moisture.svg`,
    color: `${SML_ACRYL_ICONS}/icon-hero-color.svg`,
    sound: `${SML_ACRYL_ICONS}/icon-extra-sound.svg`,
    surface: `${SML_ACRYL_ICONS}/icon-extra-surface.svg`,
    strength: `${SML_ACRYL_ICONS}/icon-extra-strength.svg`,
    mount: `${SML_ACRYL_ICONS}/icon-extra-mount.svg`,
    shieldCheck: `${HPL_ICONS}/icon-shield-check.svg`,
    flask: `${HPL_ICONS}/icon-flask.svg`,
    leaf: `${DEALER_ICONS}/icon-leaf.svg`,
    wrench: `${DEALER_ICONS}/icon-wrench.svg`,
  },
} as const;

export const slatSmlHplProductModal = {
  categoryLabel: "РЕЕЧНЫЕ ПАНЕЛИ",
  title: "WINAL™ СМЛ HPL",
  description:
    "Слабогорючие реечные панели КМ-1 на негорючей СМЛ-основе КМ-0 с антивандальным HPL-покрытием. Модуль 2440×600 / 3000×600 мм; крепление скрытое.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  heroFeatures: [
    {
      icon: slatSmlHplModalAssets.icons.strength,
      title: "Антивандальный HPL",
      description:
        "Пластик высокого давления защищает рейку от ударов, истирания и ежедневных нагрузок общественных зон.",
    },
    {
      icon: slatSmlHplModalAssets.icons.moisture,
      title: "Влагостойкость и простой уход",
      description:
        "HPL закрывает поверхность от влаги: панели моются без потери внешнего вида.",
    },
    {
      icon: slatSmlHplModalAssets.icons.fire,
      title: "Негорючая основа КМ-0",
      description:
        "СМЛ-основа класса КМ-0 закрывает пожарные требования; сама панель — слабогорючая КМ-1.",
    },
    {
      icon: slatSmlHplModalAssets.icons.mount,
      title: "Скрытое крепление",
      description:
        "Рейки собираются на каркасе алюминиевых профилей со скрытым креплением.",
    },
  ] satisfies SlatSmlHplFeature[],
  coatingTitle: "Покрытия",
  coatingGroups: wallHplCoatingGroups,
  specs: {
    title: "Характеристики",
    productName: "WINAL™ СМЛ HPL",
    rows: [
      { label: "Основа", value: "стекломагниевый лист (СМЛ)" },
      { label: "Размеры модуля", value: "2440×600 мм; 3000×600 мм" },
      { label: "Толщина", value: "12 мм" },
      { label: "Класс пожарной\nопасности", value: "КМ-0 (основа) /\nКМ-1 (панель)" },
      { label: "Покрытие", value: "HPL-пластик высокого давления" },
      { label: "Крепление", value: "скрытое" },
    ] satisfies SlatSmlHplSpecRow[],
  },
  extraFeatures: [
    {
      icon: slatSmlHplModalAssets.icons.color,
      title: "Декоры под дерево, металл и камень",
      description:
        "Каталог HPL даёт фактуры дерева, металла, камня и спокойные однотонные пластики.",
    },
    {
      icon: slatSmlHplModalAssets.icons.uv,
      title: "Долговечность покрытия",
      description:
        "HPL сохраняет вид при интенсивной эксплуатации в офисах, МОП и общественных интерьерах.",
    },
    {
      icon: slatSmlHplModalAssets.icons.leaf,
      title: "Экологичность компонентов",
      description:
        "Панели не содержат вредных химических добавок и не выделяют токсичных соединений.",
    },
    {
      icon: slatSmlHplModalAssets.icons.wrench,
      title: "Скорость монтажа",
      description:
        "Готовая каркасная система ускоряет установку без мокрой отделки стены.",
    },
  ] satisfies SlatSmlHplFeature[],
} as const;
