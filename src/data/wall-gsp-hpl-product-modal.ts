import { asset } from "@/lib/asset";
import { wallHplCoatingGroups } from "@/data/wall-hpl-coatings";

export type WallGspHplFeature = {
  icon: string;
  title: string;
  description: string;
};

export type WallGspHplSpecRow = {
  label: string;
  value: string;
};

export type WallGspHplGalleryImage = {
  src: string;
  caption: string;
};

const SML_ACRYL_ICONS = asset("/images/product-modal/wall-sml-acryl");
const HPL_ICONS = asset("/images/product-modal/wall-hpl-shared/icons");
const DEALER_ICONS = asset("/images/product-modal/wall-pvc-shared/icons");
const GALLERY = asset("/images/product-modal/wall-gsp-hpl/gallery");

export const WALL_GSP_HPL_PRODUCT_MODAL_ID = "wall-gsp-hpl-product-modal";

export const wallGspHplModalAssets = {
  gallery: [
    { src: `${GALLERY}/sten-panel-winal-hpl-gsp.webp`, caption: "Стеновые панели WINAL™ HPL ГСП" },
    { src: `${GALLERY}/sten-panel-winal-hpl-1-1.webp`, caption: "Стеновые панели ГСП HPL пластик" },
  ] as const satisfies readonly WallGspHplGalleryImage[],
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
  icons: {
    fire: asset("/images/product-modal/icons/winal-flame.svg"),
    uv: `${SML_ACRYL_ICONS}/icon-hero-uv.svg`,
    moisture: `${SML_ACRYL_ICONS}/icon-hero-moisture.svg`,
    color: `${SML_ACRYL_ICONS}/icon-hero-color.svg`,
    sound: `${SML_ACRYL_ICONS}/icon-extra-sound.svg`,
    surface: `${SML_ACRYL_ICONS}/icon-extra-surface.svg`,
    strength: `${DEALER_ICONS}/icon-strength.svg`,
    mount: `${SML_ACRYL_ICONS}/icon-extra-mount.svg`,
    shieldCheck: `${HPL_ICONS}/icon-shield-check.svg`,
    flask: `${HPL_ICONS}/icon-flask.svg`,
    hammer: `${DEALER_ICONS}/icon-hammer.svg`,
    wrench: `${DEALER_ICONS}/icon-wrench.svg`,
  },
} as const;

export const wallGspHplProductModal = {
  categoryLabel: "СТЕНОВЫЕ ПАНЕЛИ",
  title: "WINAL™ ГСП HPL",
  description:
    "Износостойкие стеновые панели на массивной основе ГСП КМ-1 с надежной HPL-защитой. Обеспечивают долговечность стен в условиях интенсивного трафика и высоких механических нагрузок.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  heroFeatures: [
    {
      icon: wallGspHplModalAssets.icons.strength,
      title: "Прочная ГСП-основа",
      description: "Плотная гипсостружечная плита усиливает облицовку для зон с высокой механической нагрузкой.",
    },
    {
      icon: wallGspHplModalAssets.icons.hammer,
      title: "Вандалостойкий HPL-пластик",
      description:
        "Поверхность высокого давления обладает большой сопротивляемостью к истиранию и глубоким царапинам.",
    },
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Слабогорючая основа КМ-1",
      description: "Надёжная базовая плита имеет подтверждённый сертификат пожарной безопасности КМ-1.",
    },
    {
      icon: wallGspHplModalAssets.icons.flask,
      title: "Стойкость к бытовой химии",
      description: "HPL выдерживает воздействие бытовой химии и подходит для лабораторий и помещений с агрессивной средой.",
    },
  ] satisfies WallGspHplFeature[],
  coatingTitle: "Покрытия",
  coatingGroups: wallHplCoatingGroups,
  specs: {
    title: "Характеристики",
    productName: "WINAL™ ГСП HPL",
    rows: [
      { label: "Основа", value: "гипсостружечная плита (ГСП)" },
      { label: "Размеры", value: "3000×1250 мм; 2500×1250 мм" },
      { label: "Толщина", value: "10 / 12 мм" },
      { label: "Класс пожарной опасности", value: "КМ-1 (у основы)" },
      { label: "Покрытие", value: "HPL-пластик высокого давления" },
    ] satisfies WallGspHplSpecRow[],
  },
  extraFeatures: [
    {
      icon: wallGspHplModalAssets.icons.uv,
      title: "Защита от загрязнений и УФ",
      description: "Антивандальный пластик устойчив к загрязнениям и не выцветает под воздействием солнечных лучей.",
    },
    {
      icon: wallGspHplModalAssets.icons.moisture,
      title: "Влагостойкость и защита",
      description:
        "Стеновые панели устойчивы к влаге, выдерживают контакт с водой и не подвержены образованию плесени.",
    },
    {
      icon: wallGspHplModalAssets.icons.wrench,
      title: "Быстрый профильный монтаж",
      description: "Крупные панели удобны для масштабной сухой установки на прочную алюминиевую систему без мокрых работ.",
    },
    {
      icon: asset("/images/product-modal/icons/figma-fingerprint.svg"),
      title: "Разнообразие фактур",
      description: "Широкий выбор декоров, имитирующих натуральное дерево, камень, металл, а также однотонные покрытия.",
    },
  ] satisfies WallGspHplFeature[],
} as const;
