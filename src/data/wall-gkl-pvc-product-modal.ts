import { asset } from "@/lib/asset";
import { wallPvcCoatingGroups } from "@/data/wall-pvc-coatings";

export type WallGklPvcFeature = {
  icon: string;
  title: string;
  description: string;
};

export type WallGklPvcSpecRow = {
  label: string;
  value: string;
};

export type WallGklPvcGalleryImage = {
  src: string;
  caption: string;
};

const SML_ACRYL_ICONS = asset("/images/product-modal/wall-sml-acryl");
const PVC_ICONS = asset("/images/product-modal/wall-pvc-shared/icons");
const GALLERY = asset("/images/product-modal/wall-gkl-pvc/gallery");

export const WALL_GKL_PVC_PRODUCT_MODAL_ID = "wall-gkl-pvc-product-modal";

export const wallGklPvcModalAssets = {
  gallery: [
    {
      src: `${GALLERY}/panel-gkl-pvh.webp`,
      caption: "Стеновые панели на основе гипсокартона ГКЛ ламинированные ПВХ пленкой под дерево",
    },
    {
      src: `${GALLERY}/sten-potolok-paneli-hpl-sml-pvh-okras.webp`,
      caption: "Панели для стен окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL",
    },
    {
      src: `${GALLERY}/sten-potolok-paneli-hpl-sml-pvh-okras-3.webp`,
      caption: "Панели для стен окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL",
    },
    {
      src: `${GALLERY}/sten-potolok-paneli-hpl-sml-pvh-okras-2.webp`,
      caption: "Панели для стен окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL",
    },
    {
      src: `${GALLERY}/panel-akril-gkl-loft-sten.webp`,
      caption: "Стеновые панели гипсокартон ГКЛ ламинированные пленкой ПВХ",
    },
  ] as const satisfies readonly WallGklPvcGalleryImage[],
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
    scales: `${PVC_ICONS}/icon-scales.svg`,
    hammer: `${PVC_ICONS}/icon-hammer.svg`,
    height: `${PVC_ICONS}/icon-height.svg`,
    wrench: `${PVC_ICONS}/icon-wrench.svg`,
  },
} as const;

export const wallGklPvcProductModal = {
  categoryLabel: "СТЕНОВЫЕ ПАНЕЛИ",
  title: "WINAL™ ГКЛ ПВХ",
  description:
    "Стеновые панели на основе гипсокартона КМ-1 с декоративной ПВХ-ламинацией. Рациональное решение, сочетающее готовые фактуры дерева или бетона с демократичной стоимостью и высокой износостойкостью отделки.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  heroFeatures: [
    {
      icon: wallGklPvcModalAssets.icons.scales,
      title: "Оптимальное соотношение цены",
      description: "Доступный ГКЛ ПВХ обходится дешевле коммерческих обоев, значительно превосходя их по прочности.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-shield-check.svg"),
      title: "Прочная ПВХ-ламинация",
      description: "Надежная пленка точно передает фактуры бетона, дерева и камня, не требуя дополнительной защиты.",
    },
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Слабогорючая основа КМ-1",
      description: "Гипсокартонный лист имеет подтверждённый класс пожарной опасности КМ-1 для коммерческих зданий.",
    },
    {
      icon: wallGklPvcModalAssets.icons.hammer,
      title: "Высокая износоустойчивость",
      description:
        "Покрытие служит более 7 лет, выдерживает воздействие слабых кислот и щелочей, рассчитано на многократное мытьё.",
    },
  ] satisfies WallGklPvcFeature[],
  coatingTitle: "Покрытия",
  coatingGroups: wallPvcCoatingGroups,
  specs: {
    title: "Характеристики",
    productName: "WINAL™ ГКЛ ПВХ",
    rows: [
      { label: "Основа", value: "гипсокартонный лист (ГКЛ)" },
      { label: "Размеры", value: "2500×1200–3600×1200 мм" },
      { label: "Толщина", value: "6,5 / 9,5 / 12,5 мм" },
      { label: "Класс пожарной опасности", value: "КМ-1 (у основы)" },
      { label: "Покрытие", value: "ПВХ-ламинация" },
    ] satisfies WallGklPvcSpecRow[],
  },
  extraFeatures: [
    {
      icon: wallGklPvcModalAssets.icons.moisture,
      title: "Влагостойкость и гигиена",
      description: "Панели выдерживают перепады температур, не боятся влаги и надежно защищены от образования плесени.",
    },
    {
      icon: wallGklPvcModalAssets.icons.height,
      title: "Высота листов до 3600 мм",
      description: "Увеличенные габариты помогают перекрывать высокие стены от пола до потолка с минимумом стыков.",
    },
    {
      icon: wallGklPvcModalAssets.icons.wrench,
      title: "Ускоренный сухой монтаж",
      description: "Каркасная сборка позволяет отказаться от длительных «мокрых» процессов штукатурки и шпаклевки.",
    },
    {
      icon: asset("/images/product-modal/icons/figma-dry-mount.svg"),
      title: "Без подготовки черновой стены",
      description:
        "Готовое решение скрывает базовые неровности и позволяет незаметно проложить коммуникации за профилем.",
    },
  ] satisfies WallGklPvcFeature[],
} as const;
