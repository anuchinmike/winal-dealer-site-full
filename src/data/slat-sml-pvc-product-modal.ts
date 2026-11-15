import { wallPvcCoatingGroups } from "@/data/wall-pvc-coatings";

export type SlatSmlPvcFeature = {
  icon: string;
  title: string;
  description: string;
};

export type SlatSmlPvcSpecRow = {
  label: string;
  value: string;
};

export type SlatSmlPvcGalleryImage = {
  src: string;
  caption: string;
};

const SML_ACRYL_ICONS = "/images/product-modal/wall-sml-acryl";
const PVC_ICONS = "/images/product-modal/wall-pvc-shared/icons";
const GALLERY = "/images/product-modal/slat-sml-pvc/gallery";

export const SLAT_SML_PVC_PRODUCT_MODAL_ID = "slat-sml-pvc-product-modal";

export const slatSmlPvcModalAssets = {
  gallery: [
    { src: `${GALLERY}/paneli-reechnie-negoruchie-derevo-winal-2.webp`, caption: "Реечные панели WINAL™ СМЛ ПВХ под дерево" },
    { src: `${GALLERY}/sten-paneli-reika-derevo-winal-1.webp`, caption: "Реечные панели WINAL™ СМЛ ПВХ под дерево" },
    { src: `${GALLERY}/sten-paneli-reechnie-derevo-winal-2.webp`, caption: "Реечные панели WINAL™ под дерево" },
    { src: `${GALLERY}/paneli-reechnie-pvh-sml-oreh-pekan.webp`, caption: "Реечные панели WINAL™ СМЛ ПВХ Орех пекан" },
    { src: `${GALLERY}/paneli-reechnie-pvh-sml-oreh-pekan-sk.webp`, caption: "Реечные панели WINAL™ СМЛ ПВХ Орех пекан, скрытое крепление" },
    { src: `${GALLERY}/reechnie-stenovye-paneli-sml-hpl-pvh-7.webp`, caption: "Реечные стеновые панели в офисе" },
    { src: `${GALLERY}/paneli-reechnie-sml-gsp-pvh-hpl-5.webp`, caption: "Реечные стеновые панели в коридоре отеля" },
    { src: `${GALLERY}/reechnie-stenovye-paneli-sml-hpl-pvh-3.webp`, caption: "Реечные стеновые панели в ресторане" },
    { src: `${GALLERY}/paneli-reechnie-sml-gsp-pvh-hpl-11.webp`, caption: "Реечные стеновые панели в коридоре отеля" },
    { src: `${GALLERY}/paneli-reechnie-sml-gsp-pvh-hpl-10.webp`, caption: "Реечные стеновые панели в зоне ресепшн" },
    { src: `${GALLERY}/paneli-reechnie-pvh-sml-dub-skandinavski.webp`, caption: "Реечные панели WINAL™ СМЛ ПВХ Дуб скандинавский" },
    { src: `${GALLERY}/paneli-reechnie-pvh-sml-dub-skandinavski-sk.webp`, caption: "Реечные панели WINAL™ СМЛ ПВХ Дуб скандинавский, скрытое крепление" },
  ] as const satisfies readonly SlatSmlPvcGalleryImage[],
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
    surface: `${SML_ACRYL_ICONS}/icon-extra-surface.svg`,
    strength: `${SML_ACRYL_ICONS}/icon-extra-strength.svg`,
    mount: `${SML_ACRYL_ICONS}/icon-extra-mount.svg`,
    leaf: `${PVC_ICONS}/icon-leaf.svg`,
    wrench: `${PVC_ICONS}/icon-wrench.svg`,
  },
} as const;

export const slatSmlPvcProductModal = {
  categoryLabel: "РЕЕЧНЫЕ ПАНЕЛИ",
  title: "WINAL™ СМЛ ПВХ",
  description:
    "Негорючие реечные панели КМ-0 на СМЛ-основе с ПВХ-ламинацией. Готовая поверхность без окраски; модуль 2440×600 / 3000×600 мм; крепление скрытое.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  heroFeatures: [
    {
      icon: slatSmlPvcModalAssets.icons.fire,
      title: "Негорючие панели КМ-0",
      description:
        "Реечные панели на СМЛ-основе соответствуют классу КМ-0 и закрывают пожарные требования общественных зон.",
    },
    {
      icon: slatSmlPvcModalAssets.icons.surface,
      title: "Готовая поверхность без окраски",
      description:
        "ПВХ-ламинация снимает малярные работы и даёт готовый декор сразу после монтажа.",
    },
    {
      icon: slatSmlPvcModalAssets.icons.moisture,
      title: "Влагостойкость и простой уход",
      description:
        "СМЛ-основа не разбухает при контакте с водой, плёнка моется без потери внешнего вида.",
    },
    {
      icon: slatSmlPvcModalAssets.icons.mount,
      title: "Скрытое крепление",
      description:
        "Рейки собираются на каркасе алюминиевых профилей со скрытым креплением.",
    },
  ] satisfies SlatSmlPvcFeature[],
  coatingTitle: "Покрытия",
  coatingGroups: wallPvcCoatingGroups,
  specs: {
    title: "Характеристики",
    productName: "WINAL™ СМЛ ПВХ",
    rows: [
      { label: "Основа", value: "стекломагниевый лист (СМЛ)" },
      { label: "Размеры модуля", value: "2440×600 мм; 3000×600 мм" },
      { label: "Толщина", value: "12 мм" },
      { label: "Класс пожарной\nопасности", value: "КМ-0" },
      { label: "Покрытие", value: "ПВХ-ламинация" },
      { label: "Крепление", value: "скрытое" },
    ] satisfies SlatSmlPvcSpecRow[],
  },
  extraFeatures: [
    {
      icon: slatSmlPvcModalAssets.icons.uv,
      title: "Износостойкость",
      description:
        "Ламинированная поверхность держит повседневные нагрузки и сохраняет вид при регулярной эксплуатации.",
    },
    {
      icon: slatSmlPvcModalAssets.icons.color,
      title: "Декоры под дерево, бетон и однотон",
      description:
        "Коллекция фактурных и однотонных ПВХ-плёнок закрывает дерево, бетон и спокойные интерьерные оттенки.",
    },
    {
      icon: slatSmlPvcModalAssets.icons.leaf,
      title: "Экологичность компонентов",
      description:
        "Панели не содержат вредных химических добавок и не выделяют токсичных соединений.",
    },
    {
      icon: slatSmlPvcModalAssets.icons.wrench,
      title: "Скорость монтажа",
      description:
        "Готовая каркасная система ускоряет сдачу объекта без мокрой отделки стены.",
    },
  ] satisfies SlatSmlPvcFeature[],
} as const;
