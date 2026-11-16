import { asset } from "@/lib/asset";
import { wallPolymerCoatingGroups } from "@/data/wall-acryl-coatings";

export type WallSmlPolymerFeature = {
  icon: string;
  title: string;
  description: string;
};

export type WallSmlPolymerSpecRow = {
  label: string;
  value: string;
};

export type WallSmlPolymerGalleryImage = {
  src: string;
  caption: string;
};

const SML_ACRYL = asset("/images/product-modal/wall-sml-acryl");
const PVC_ICONS = asset("/images/product-modal/wall-pvc-shared/icons");
const GALLERY = asset("/images/product-modal/wall-polymer-shared/gallery");

export const WALL_SML_POLYMER_PRODUCT_MODAL_ID = "wall-sml-polymer-product-modal";

export const wallSmlPolymerModalAssets = {
  gallery: [
    {
      src: `${GALLERY}/sml-polymer-karbon-sinij.webp`,
      caption: "WINAL™ СМЛ Полимер: синий карбон",
    },
    {
      src: `${GALLERY}/sten-panel-sml-winal-high-glow-premium-1.webp`,
      caption: "Стеновые панели СМЛ Премиум высокий глянец",
    },
    {
      src: `${GALLERY}/sten-paneli-winal-sml-polytech-1.webp`,
      caption: "Стеновые панели СМЛ Премиум Polytech глянец гладкий",
    },
    {
      src: `${GALLERY}/sten-panel-sml-winal-silk-1.webp`,
      caption: "Стеновые панели СМЛ Премиум Silk Satin",
    },
    {
      src: `${GALLERY}/sten-panel-sml-winal-soft-premium-1.webp`,
      caption: "Стеновые панели СМЛ Премиум Поликерам Софт Тач",
    },
    {
      src: `${GALLERY}/sml-sten-paneli-winal-premium-1-1.webp`,
      caption: "СМЛ панели для стен Премиум окрашенный стекломагний",
    },
  ] as const satisfies readonly WallSmlPolymerGalleryImage[],
  ralChart: `${SML_ACRYL}/ral-chart.webp`,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
  icons: {
    fire: asset("/images/product-modal/icons/winal-flame.svg"),
    uv: `${SML_ACRYL}/icon-hero-uv.svg`,
    moisture: `${SML_ACRYL}/icon-hero-moisture.svg`,
    color: `${SML_ACRYL}/icon-hero-color.svg`,
    sound: `${SML_ACRYL}/icon-extra-sound.svg`,
    surface: `${SML_ACRYL}/icon-extra-surface.svg`,
    strength: `${SML_ACRYL}/icon-extra-strength.svg`,
    mount: `${SML_ACRYL}/icon-extra-mount.svg`,
    hammer: `${PVC_ICONS}/icon-hammer.svg`,
    leaf: `${PVC_ICONS}/icon-leaf.svg`,
    wrench: `${PVC_ICONS}/icon-wrench.svg`,
  },
} as const;

export const wallSmlPolymerProductModal = {
  categoryLabel: "СТЕНОВЫЕ ПАНЕЛИ",
  title: "WINAL™ СМЛ Полимер",
  description:
    "Негорючие стеновые панели СМЛ КМ-0 с защитным полимерным покрытием. Выразительный дизайн для статусных коммерческих интерьеров в сочетании с высокой стойкостью к влаге, повреждениям и огню.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  heroFeatures: [
    {
      icon: wallSmlPolymerModalAssets.icons.fire,
      title: "Негорючие панели КМ-0",
      description:
        "Панели соответствуют классу КМ-0: обладают огнеупорностью более 3 часов и не поддерживают горение при 1200 °C.",
    },
    {
      icon: wallSmlPolymerModalAssets.icons.surface,
      title: "Глубокий гладкий глянец",
      description:
        "Покрытие High Glow обеспечивает зеркальный блеск и премиальную визуальную глубину отделки стен.",
    },
    {
      icon: wallSmlPolymerModalAssets.icons.moisture,
      title: "Высокая влагоустойчивость",
      description:
        "Водопроницаемость менее 5%. Панели не разбухают при прямом контакте с водой и защищены от плесени.",
    },
    {
      icon: wallSmlPolymerModalAssets.icons.sound,
      title: "Дополнительная звукоизоляция",
      description:
        "Входящий в состав СМЛ-основы перлит обеспечивает дополнительный уровень звукоизоляции помещений.",
    },
  ] satisfies WallSmlPolymerFeature[],
  coatingTitle: "Покрытия",
  coatingGroups: wallPolymerCoatingGroups,
  specs: {
    title: "Характеристики",
    productName: "WINAL™ СМЛ Полимер",
    rows: [
      { label: "Основа", value: "стекломагниевый лист (СМЛ)" },
      { label: "Размеры", value: "2440×1220 мм; 3000×1220 мм" },
      { label: "Толщина", value: "6 / 8 / 10 / 12 мм" },
      { label: "Класс пожарной опасности", value: "КМ-0" },
      { label: "Покрытие", value: "полимерное" },
    ] satisfies WallSmlPolymerSpecRow[],
  },
  ralNote: "Панели могут быть окрашены в любой оттенок по RAL",
  extraFeatures: [
    {
      icon: asset("/images/product-modal/icons/figma-fingerprint.svg"),
      title: "Тактильный Soft Touch и Сатин",
      description:
        "Матовые покрытия Silk и Поликерам деликатно рассеивают свет, предлагая современную эстетику.",
    },
    {
      icon: wallSmlPolymerModalAssets.icons.hammer,
      title: "Прочность к повреждениям",
      description:
        "Стекломагниевый лист высокой плотности наделяет панели высокой устойчивостью к механическим нагрузкам.",
    },
    {
      icon: wallSmlPolymerModalAssets.icons.leaf,
      title: "Экологичные компоненты",
      description:
        "Продукт на 99% состоит из природных компонентов без вредных химических добавок и токсичных выделений.",
    },
    {
      icon: wallSmlPolymerModalAssets.icons.wrench,
      title: "Скоростной сухой монтаж",
      description:
        "Монтаж на декоративный алюминиевый профиль не требует подготовки, штукатурки и окраски стен.",
    },
  ] satisfies WallSmlPolymerFeature[],
} as const;
