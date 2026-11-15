import { wallPolymerCoatingGroups } from "@/data/wall-acryl-coatings";

export type WallGklPolymerFeature = {
  icon: string;
  title: string;
  description: string;
};

export type WallGklPolymerSpecRow = {
  label: string;
  value: string;
};

export type WallGklPolymerGalleryImage = {
  src: string;
  caption: string;
};

const SML_ACRYL = "/images/product-modal/wall-sml-acryl";
const PVC_ICONS = "/images/product-modal/wall-pvc-shared/icons";
const GALLERY = "/images/product-modal/wall-polymer-shared/gallery";
const GKL_GALLERY_CAPTION = "Стеновые панели WINAL™ с полимерным покрытием";

export const WALL_GKL_POLYMER_PRODUCT_MODAL_ID = "wall-gkl-polymer-product-modal";

export const wallGklPolymerModalAssets = {
  gallery: [
    {
      src: `${GALLERY}/sten-panel-sml-winal-high-glow-premium-1.webp`,
      caption: GKL_GALLERY_CAPTION,
    },
    {
      src: `${GALLERY}/sten-paneli-winal-sml-polytech-1.webp`,
      caption: GKL_GALLERY_CAPTION,
    },
    {
      src: `${GALLERY}/sten-panel-sml-winal-silk-1.webp`,
      caption: GKL_GALLERY_CAPTION,
    },
    {
      src: `${GALLERY}/sten-panel-sml-winal-soft-premium-1.webp`,
      caption: GKL_GALLERY_CAPTION,
    },
    {
      src: `${GALLERY}/sml-sten-paneli-winal-premium-1-1.webp`,
      caption: GKL_GALLERY_CAPTION,
    },
  ] as const satisfies readonly WallGklPolymerGalleryImage[],
  ralChart: `${SML_ACRYL}/ral-chart.webp`,
  closeIcon: "/images/product-modal/rythmwall/icon-close.webp",
  arrows: {
    white: "/images/product-modal/rythmwall/arrow-white.svg",
    blue: "/images/product-modal/rythmwall/arrow-blue.svg",
  },
  icons: {
    fire: "/images/product-modal/icons/winal-flame.svg",
    uv: `${SML_ACRYL}/icon-hero-uv.svg`,
    moisture: `${SML_ACRYL}/icon-hero-moisture.svg`,
    color: `${SML_ACRYL}/icon-hero-color.svg`,
    sound: `${SML_ACRYL}/icon-extra-sound.svg`,
    surface: `${SML_ACRYL}/icon-extra-surface.svg`,
    extraStrength: `${SML_ACRYL}/icon-extra-strength.svg`,
    mount: `${SML_ACRYL}/icon-extra-mount.svg`,
    height: `${PVC_ICONS}/icon-height.svg`,
    wrench: `${PVC_ICONS}/icon-wrench.svg`,
    strength: `${PVC_ICONS}/icon-strength.svg`,
  },
} as const;

export const wallGklPolymerProductModal = {
  categoryLabel: "СТЕНОВЫЕ ПАНЕЛИ",
  title: "WINAL™ ГКЛ Полимер",
  description:
    "Декоративные панели на слабогорючей ГКЛ-основе КМ-1 с премиальной полимерной поверхностью. Доступный способ оформить статусный интерьер благодаря глубокому глянцу или матовому эффекту.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  heroFeatures: [
    {
      icon: wallGklPolymerModalAssets.icons.color,
      title: "Премиальный эффект отделки",
      description: "Полимерный слой создаёт эстетику дорогих интерьеров на базе доступного гипсокартона.",
    },
    {
      icon: "/images/product-modal/icons/winal-flame.svg",
      title: "Слабогорючая основа КМ-1",
      description: "Проверенный базовый лист обеспечивает необходимую пожарную безопасность класса КМ-1.",
    },
    {
      icon: wallGklPolymerModalAssets.icons.surface,
      title: "Глубокий гладкий глянец",
      description:
        "Покрытие High Glow формирует выразительный зеркальный блеск на стенах офисных и торговых площадей.",
    },
    {
      icon: "/images/product-modal/icons/figma-fingerprint.svg",
      title: "Сатин и Soft Touch",
      description:
        "Специальные матовые фактуры деликатно рассеивают свет и обеспечивают приятные тактильные ощущения.",
    },
  ] satisfies WallGklPolymerFeature[],
  coatingTitle: "Покрытия",
  coatingGroups: wallPolymerCoatingGroups,
  specs: {
    title: "Характеристики",
    productName: "WINAL™ ГКЛ Полимер",
    rows: [
      { label: "Основа", value: "гипсокартонный лист (ГКЛ)" },
      { label: "Размеры", value: "2500×1200–3600×1200 мм" },
      { label: "Толщина", value: "6,5 / 9,5 / 12,5 мм" },
      { label: "Класс пожарной опасности", value: "КМ-1 (у основы)" },
      { label: "Покрытие", value: "полимерное покрытие" },
    ] satisfies WallGklPolymerSpecRow[],
  },
  ralNote: "Панели могут быть окрашены в любой оттенок по RAL",
  extraFeatures: [
    {
      icon: "/images/product-modal/icons/phosphor-thumbs-up.svg",
      title: "Готовая чистовая поверхность",
      description: "Панели готовы к установке без последующего грунтования или окраски на объекте.",
    },
    {
      icon: wallGklPolymerModalAssets.icons.height,
      title: "Длина панелей до 3600 мм",
      description:
        "Крупные листы позволяют реализовать масштабные архитектурные замыслы и минимизировать швы.",
    },
    {
      icon: wallGklPolymerModalAssets.icons.wrench,
      title: "Чистый сухой монтаж",
      description:
        "Установка на систему алюминиевых профилей избавляет от самых грязных строительных этапов.",
    },
    {
      icon: wallGklPolymerModalAssets.icons.strength,
      title: "Аккуратная геометрия стен",
      description:
        "Каркасная облицовка скрывает неровности черновой поверхности, создавая ровную деловую плоскость.",
    },
  ] satisfies WallGklPolymerFeature[],
} as const;
