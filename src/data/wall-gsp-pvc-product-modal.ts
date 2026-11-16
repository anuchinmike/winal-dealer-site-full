import { asset } from "@/lib/asset";
import { wallPvcCoatingGroups } from "@/data/wall-pvc-coatings";

export type WallGspPvcFeature = {
  icon: string;
  title: string;
  description: string;
};

export type WallGspPvcSpecRow = {
  label: string;
  value: string;
};

export type WallGspPvcGalleryImage = {
  src: string;
  caption: string;
};

const SML_ACRYL_ICONS = asset("/images/product-modal/wall-sml-acryl");
const PVC_ICONS = asset("/images/product-modal/wall-pvc-shared/icons");
const GALLERY = asset("/images/product-modal/wall-gsp-pvc/gallery");

export const WALL_GSP_PVC_PRODUCT_MODAL_ID = "wall-gsp-pvc-product-modal";

export const wallGspPvcModalAssets = {
  gallery: [
    {
      src: `${GALLERY}/panel-akril-gkl-gvlv-5.webp`,
      caption: "Панели для стен ламинированные ПВХ пленкой ГСП",
    },
  ] as const satisfies readonly WallGspPvcGalleryImage[],
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
    surface: `${SML_ACRYL_ICONS}/icon-extra-surface.svg`,
    strength: `${SML_ACRYL_ICONS}/icon-extra-strength.svg`,
    mount: `${SML_ACRYL_ICONS}/icon-extra-mount.svg`,
    hammer: `${PVC_ICONS}/icon-hammer.svg`,
    leaf: `${PVC_ICONS}/icon-leaf.svg`,
    scales: `${PVC_ICONS}/icon-scales.svg`,
    wrench: `${PVC_ICONS}/icon-wrench.svg`,
  },
} as const;

export const wallGspPvcProductModal = {
  categoryLabel: "СТЕНОВЫЕ ПАНЕЛИ",
  title: "WINAL™ ГСП ПВХ",
  description:
    "Усиленные стеновые панели на основе ГСП КМ-1 с практичной ПВХ-ламинацией. Разработаны для помещений, где требуется сочетание высокой механической прочности стен и выразительных текстурных декоров.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  heroFeatures: [
    {
      icon: wallGspPvcModalAssets.icons.hammer,
      title: "Ударопрочность ГСП-основы",
      description: "Антивандальная гипсостружечная плита отлично справляется с механическими нагрузками проходных зон.",
    },
    {
      icon: wallGspPvcModalAssets.icons.surface,
      title: "Готовое чистовое решение",
      description: "Установка не требует базовой подготовки черновой стены, оштукатуривания или дальнейшей окраски.",
    },
    {
      icon: wallGspPvcModalAssets.icons.scales,
      title: "Прочность по доступной цене",
      description: "ГСП с ПВХ сочетает антивандальные свойства с привлекательной стоимостью готовой отделки.",
    },
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Слабогорючая основа КМ-1",
      description: "Надежная базовая плита имеет сертификат соответствия классу пожарной опасности КМ-1.",
    },
  ] satisfies WallGspPvcFeature[],
  coatingTitle: "Покрытия",
  coatingGroups: wallPvcCoatingGroups,
  specs: {
    title: "Характеристики",
    productName: "WINAL™ ГСП ПВХ",
    rows: [
      { label: "Основа", value: "гипсостружечная плита (ГСП)" },
      { label: "Размеры", value: "3000×1250 мм" },
      { label: "Толщина", value: "10 / 12 / 14 мм" },
      { label: "Класс пожарной опасности", value: "КМ-1 (у основы)" },
      { label: "Покрытие", value: "ПВХ-ламинация" },
    ] satisfies WallGspPvcSpecRow[],
  },
  extraFeatures: [
    {
      icon: wallGspPvcModalAssets.icons.leaf,
      title: "Экологичные компоненты",
      description: "Панели на 99% состоят из природных материалов и не выделяют в атмосферу токсичных соединений.",
    },
    {
      icon: wallGspPvcModalAssets.icons.moisture,
      title: "Защита от влаги и плесени",
      description: "Стеновые панели устойчивы к прямому контакту с водой и не подвержены образованию грибковых поражений.",
    },
    {
      icon: wallGspPvcModalAssets.icons.color,
      title: "Более 300 вариантов декоров",
      description: "Сверхпрочная пленка предлагает огромный выбор фактурных и однотонных решений для дизайна интерьеров.",
    },
    {
      icon: wallGspPvcModalAssets.icons.wrench,
      title: "Чистый профильный монтаж",
      description:
        "Установка на каркасную систему без строительных смесей значительно ускоряет сдачу коммерческого объекта.",
    },
  ] satisfies WallGspPvcFeature[],
} as const;
