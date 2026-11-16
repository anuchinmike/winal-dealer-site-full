import { asset } from "@/lib/asset";
import { wallPvcCoatingGroups } from "@/data/wall-pvc-coatings";

export type WallSmlPvcFeature = {
  icon: string;
  title: string;
  description: string;
};

export type WallSmlPvcSpecRow = {
  label: string;
  value: string;
};

export type WallSmlPvcGalleryImage = {
  src: string;
  caption: string;
};

const SML_ACRYL_ICONS = asset("/images/product-modal/wall-sml-acryl");
const PVC_ICONS = asset("/images/product-modal/wall-pvc-shared/icons");
const GALLERY = asset("/images/product-modal/wall-sml-pvc/gallery");

export const WALL_SML_PVC_PRODUCT_MODAL_ID = "wall-sml-pvc-product-modal";

export const wallSmlPvcModalAssets = {
  gallery: [
    {
      src: `${GALLERY}/sten-panel-winal-sml-pvh-2.webp`,
      caption: "Стеновые панели WINAL™ ПВХ",
    },
    {
      src: `${GALLERY}/panel-sml-pvh-akril-1.webp`,
      caption: "Стеновые панели СМЛ лист ламинированные ПВХ пленкой со скрытым креплением",
    },
    {
      src: `${GALLERY}/stenpaneli-winal-sml-hpl-office-2.webp`,
      caption:
        "Окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL панели для стен и потолков под дерево РАЛ для офиса",
    },
    {
      src: `${GALLERY}/sten-paneli-winal-hpl-sml.webp`,
      caption: "Панели под дерево для отделки стен и потолков в офис",
    },
    {
      src: `${GALLERY}/sten-paneli-hpl-sml-list-gkl-winal-2.webp`,
      caption:
        "Окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL панели для стен и потолков под дерево РАЛ",
    },
    {
      src: `${GALLERY}/sten-paneli-hpl-sml-list-gkl-winal-4.webp`,
      caption:
        "Окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL панели для стен и потолков под дерево РАЛ",
    },
    {
      src: `${GALLERY}/sten-paneli-hpl-sml-list-gkl-winal.webp`,
      caption:
        "Окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL панели для стен и потолков под дерево РАЛ",
    },
    {
      src: `${GALLERY}/stenovie-paneli-winal-gkl-sml-office-1.webp`,
      caption:
        "Окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL панели для стен и потолков под дерево РАЛ для офиса",
    },
    {
      src: `${GALLERY}/stenovie-paneli-laminirovannie-pvh-sml-list-1.webp`,
      caption: "Стеновые панели ламинированные ПВХ пленкой СМЛ лист премиум",
    },
    {
      src: `${GALLERY}/stenovie-paneli-laminirovannie-pvh-sml-list-4.webp`,
      caption: "Стеновые панели ламинированные ПВХ пленкой СМЛ лист премиум",
    },
    {
      src: `${GALLERY}/stenovie-paneli-laminirovannie-pvh-sml-list-2.webp`,
      caption: "Стеновые панели ламинированные ПВХ пленкой СМЛ лист премиум",
    },
    {
      src: `${GALLERY}/stenovie-paneli-laminirovannie-pvh-sml-list-3.webp`,
      caption: "Стеновые панели ламинированные ПВХ пленкой СМЛ лист премиум",
    },
    {
      src: `${GALLERY}/stenovie-paneli-laminirovannie-pvh-sml-list-6.webp`,
      caption: "Стеновые панели ламинированные ПВХ пленкой СМЛ лист премиум",
    },
  ] as const satisfies readonly WallSmlPvcGalleryImage[],
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
    leaf: `${PVC_ICONS}/icon-leaf.svg`,
    wrench: `${PVC_ICONS}/icon-wrench.svg`,
  },
} as const;

export const wallSmlPvcProductModal = {
  categoryLabel: "СТЕНОВЫЕ ПАНЕЛИ",
  title: "WINAL™ СМЛ ПВХ",
  description:
    "Слабогорючие стеновые панели КМ-1 на негорючей СМЛ-основе КМ-0 с прочной ПВХ-ламинацией. Декоративное покрытие делает ненужными малярные работы и позволяет реализовать практически любые текстуры — например дерево, камень, бетон и другие.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  heroFeatures: [
    {
      icon: wallSmlPvcModalAssets.icons.fire,
      title: "Негорючая основа КМ-0",
      description:
        "СМЛ-основа имеет сертификат КМ-0, что решает задачи пожарной безопасности для отделки путей эвакуации и общественных зон.",
    },
    {
      icon: wallSmlPvcModalAssets.icons.surface,
      title: "Готовая поверхность без окраски",
      description:
        "Покрытие ПВХ-плёнкой делает ненужными малярные работы, снижает стоимость и ускоряет сдачу объекта.",
    },
    {
      icon: wallSmlPvcModalAssets.icons.moisture,
      title: "Влагостойкость и гигиеничность",
      description:
        "СМЛ-основа не разбухает при прямом контакте с водой, а ПВХ-плёнка легко моется даже химическими средствами.",
    },
    {
      icon: wallSmlPvcModalAssets.icons.mount,
      title: "Быстрый сухой монтаж",
      description:
        "Панели легко кроятся под нужный размер и быстро устанавливаются на каркас с помощью системы алюминиевых профилей.",
    },
  ] satisfies WallSmlPvcFeature[],
  coatingTitle: "Покрытия",
  coatingGroups: wallPvcCoatingGroups,
  specs: {
    title: "Характеристики",
    productName: "WINAL™ СМЛ ПВХ",
    rows: [
      { label: "Основа", value: "стекломагниевый лист (СМЛ)" },
      { label: "Размеры", value: "2440×1220 мм; 3000×1220 мм" },
      { label: "Толщина", value: "6 / 8 / 10 / 12 мм" },
      { label: "Класс пожарной\nопасности", value: "КМ-0 (основа) /\nКМ-1 (панель)" },
      { label: "Покрытие", value: "ПВХ-ламинация" },
    ] satisfies WallSmlPvcSpecRow[],
  },
  extraFeatures: [
    {
      icon: wallSmlPvcModalAssets.icons.uv,
      title: "Стойкость к износу и УФ-лучам",
      description:
        "Ламинированная поверхность защищает стену от царапин, механических повреждений и не выцветает на солнце.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-wrench.svg"),
      title: "Два варианта крепления",
      description:
        "Используйте декоративные профили для открытого монтажа или скрытое крепление для эстетики монолитной стены.",
    },
    {
      icon: wallSmlPvcModalAssets.icons.leaf,
      title: "Безопасность компонентов",
      description:
        "Экологически чистые материалы без вредных химических добавок — панели не выделяют токсичных соединений.",
    },
    {
      icon: wallSmlPvcModalAssets.icons.color,
      title: "Широкий выбор текстур",
      description:
        "Обширная коллекция фактурных ПВХ-пленок под дерево, бетон и камень обеспечивает широкий выбор интерьерных решений.",
    },
  ] satisfies WallSmlPvcFeature[],
} as const;
