import { wallHplCoatingGroups } from "@/data/wall-hpl-coatings";

export type WallSmlHplFeature = {
  icon: string;
  title: string;
  description: string;
};

export type WallSmlHplSpecRow = {
  label: string;
  value: string;
};

export type WallSmlHplGalleryImage = {
  src: string;
  caption: string;
};

const SML_ACRYL_ICONS = "/images/product-modal/wall-sml-acryl";
const HPL_ICONS = "/images/product-modal/wall-hpl-shared/icons";
const DEALER_ICONS = "/images/product-modal/wall-pvc-shared/icons";
const GALLERY = "/images/product-modal/wall-sml-hpl/gallery";

export const WALL_SML_HPL_PRODUCT_MODAL_ID = "wall-sml-hpl-product-modal";

export const wallSmlHplModalAssets = {
  gallery: [
    {
      src: `${GALLERY}/sten-panel-sml-hpl-sk.webp`,
      caption: "Стеновые панели HPL пластик СМЛ лист",
    },
    {
      src: `${GALLERY}/panel-sml-list-hpl-sk-open.webp`,
      caption: "Стеновые панели HPL пластик СМЛ лист",
    },
    {
      src: `${GALLERY}/panel-hpl-sml-2.webp`,
      caption: "Стеновые панели HPL пластик СМЛ лист",
    },
    {
      src: `${GALLERY}/sten-panel-sml-hpl-open.webp`,
      caption: "Стеновые панели HPL пластик СМЛ лист",
    },
    {
      src: `${GALLERY}/sten-panel-winal-hpl-sml-1.webp`,
      caption: "Стеновые панели WINAL™ HPL СМЛ",
    },
    {
      src: `${GALLERY}/sten-paneli-winal-hpl-sml-2.webp`,
      caption: "Стеновые панели WINAL™ с HPL покрытием на основе стекломагниевого листа СМЛ Титавин",
    },
    {
      src: `${GALLERY}/meditsinskie-paneli-hpl-dlya-sten-antibakterial-sml.webp`,
      caption: "Медицинские панели HPL СМЛ для стен кабинетов, приемных, фойе медицинских учреждений",
    },
    {
      src: `${GALLERY}/meditsinskie-sten-paneli-hpl-sml-1.webp`,
      caption: "Медицинские панели HPL СМЛ для внутренней отделки стен кабинетов негорючие",
    },
    {
      src: `${GALLERY}/sten-paneli-meditsinskie-hpl-sml.webp`,
      caption: "Отбойная доска для медицинских учреждений в коридорах",
    },
    {
      src: `${GALLERY}/meditsinskie-sten-paneli-hpl-sml-3.webp`,
      caption: "Медицинские панели HPL для отделки стен в кабинете, коридоре, палате, фойе больницы СМЛ",
    },
    {
      src: `${GALLERY}/med-sten-paneli-sml-h-profil-2.webp`,
      caption: "Стеновые панели для медицинских учреждений СМЛ атнибактериальные негорючие",
    },
    {
      src: `${GALLERY}/meditsinskie-paneli-dlya-sten-antibakterial-sml.webp`,
      caption: "Медицинские панели для стен в кабинете и палате антибактериальные негорючие СМЛ",
    },
  ] as const satisfies readonly WallSmlHplGalleryImage[],
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

export const wallSmlHplProductModal = {
  categoryLabel: "СТЕНОВЫЕ ПАНЕЛИ",
  title: "WINAL™ СМЛ HPL",
  description:
    "Антивандальные стеновые панели КМ-1 на негорючей СМЛ-основе КМ-0 с особо прочным HPL-покрытием. Износостойкий продукт для интенсивной эксплуатации в больницах, школах, МОП и спортивных объектах.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  heroFeatures: [
    {
      icon: "/images/product-modal/icons/phosphor-hammer.svg",
      title: "Защита от сильного истирания",
      description:
        "Твёрдый HPL-пластик является антивандальным: он надёжно защищает стену от ударов и ежедневных нагрузок.",
    },
    {
      icon: wallSmlHplModalAssets.icons.flask,
      title: "Стойкость к бытовой химии",
      description: "HPL устойчив к бытовой химии и подходит для лабораторий и других помещений с агрессивной средой.",
    },
    {
      icon: wallSmlHplModalAssets.icons.fire,
      title: "Негорючая основа КМ-0",
      description:
        "СМЛ-основа класса КМ-0 не выделяет токсичных веществ при нагреве и решает требования пожарной безопасности.",
    },
    {
      icon: wallSmlHplModalAssets.icons.moisture,
      title: "Влагостойкость и долговечность",
      description:
        "Материал не разбухает при прямом контакте с водой, не выцветает под УФ-лучами и препятствует образованию плесени.",
    },
  ] satisfies WallSmlHplFeature[],
  coatingTitle: "Покрытия",
  coatingGroups: wallHplCoatingGroups,
  specs: {
    title: "Характеристики",
    productName: "WINAL™ СМЛ HPL",
    rows: [
      { label: "Основа", value: "стекломагниевый лист (СМЛ)" },
      { label: "Размеры", value: "2440×1220 мм; 3000×1220 мм" },
      { label: "Толщина", value: "6 / 8 / 10 / 12 мм" },
      { label: "Класс пожарной\nопасности", value: "КМ-0 (основа) /\nКМ-1 (панель)" },
      { label: "Покрытие", value: "HPL-пластик высокого давления" },
    ] satisfies WallSmlHplSpecRow[],
  },
  extraFeatures: [
    {
      icon: wallSmlHplModalAssets.icons.wrench,
      title: "Быстрый монтаж профилями",
      description:
        "Установка на каркас избавляет от грязных малярных работ и существенно ускоряет ввод помещения в эксплуатацию.",
    },
    {
      icon: wallSmlHplModalAssets.icons.color,
      title: "Выразительные HPL-декоры",
      description:
        "Декоративный слой предлагает натуральные фактуры дерева, камня, металла и строгие монохромные оттенки RAL.",
    },
    {
      icon: "/images/product-modal/icons/phosphor-wrench.svg",
      title: "Удобная система крепления",
      description:
        "Различные типы алюминиевых профилей (открытые и скрытые) позволяют аккуратно оформить узлы примыканий.",
    },
    {
      icon: wallSmlHplModalAssets.icons.leaf,
      title: "Безопасность компонентов",
      description:
        "Панели состоят из природных материалов без использования асбеста и вредных химических добавок.",
    },
  ] satisfies WallSmlHplFeature[],
} as const;
