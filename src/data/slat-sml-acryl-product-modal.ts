import { asset } from "@/lib/asset";
import { wallAcrylCoatingGroups } from "@/data/wall-acryl-coatings";

export type SlatSmlAcrylFeature = {
  icon: string;
  title: string;
  description: string;
};

export type SlatSmlAcrylSpecRow = {
  label: string;
  value: string;
};

export type SlatSmlAcrylGalleryImage = {
  src: string;
  caption: string;
};

const SML_BASE = asset("/images/product-modal/wall-sml-acryl");
const GALLERY = asset("/images/product-modal/slat-sml-acryl/gallery");

export const SLAT_SML_ACRYL_PRODUCT_MODAL_ID = "slat-sml-acryl-product-modal";

export const slatSmlAcrylModalAssets = {
  gallery: [
    { src: `${GALLERY}/paneli-reechnie-negoruchie-derevo-winal-1.webp`, caption: "Реечные панели WINAL™ под дерево" },
    { src: `${GALLERY}/paneli-reechnie-sml-gsp-pvh-hpl-10.webp`, caption: "Реечные стеновые панели в зоне ресепшн" },
    { src: `${GALLERY}/paneli-reechnie-akril-sml-derevo-2.webp`, caption: "Реечные панели WINAL™ СМЛ Акрил под дерево" },
    { src: `${GALLERY}/paneli-reechnie-akril-sml-derevo-3.webp`, caption: "Реечные панели WINAL™ СМЛ Акрил под дерево" },
    { src: `${GALLERY}/sten-paneli-reechnie-derevo-winal-2.webp`, caption: "Реечные панели WINAL™ под дерево" },
    { src: `${GALLERY}/paneli-reechnie-potolochnie-sml-pvh-hpl-sk.webp`, caption: "Реечные потолочные панели в офисе" },
    { src: `${GALLERY}/paneli-reechnie-stenovie-sml-pvh-hpl-sk-2.webp`, caption: "Реечные стеновые панели в офисе" },
    { src: `${GALLERY}/reechnie-stenovye-paneli-sml-hpl-pvh.webp`, caption: "Реечные стеновые панели в офисе" },
    { src: `${GALLERY}/paneli-reechnie-akril-sml-sosna.webp`, caption: "Реечные панели WINAL™ СМЛ Акрил Сосна" },
    { src: `${GALLERY}/paneli-reechnie-akril-sml-sosna-sk.webp`, caption: "Реечные панели WINAL™ СМЛ Акрил Сосна, скрытое крепление" },
    { src: `${GALLERY}/paneli-reechnie-sml-gsp-pvh-hpl-8.webp`, caption: "Реечные стеновые панели в офисе" },
    { src: `${GALLERY}/reechnie-stenovye-paneli-sml-hpl-pvh-6.webp`, caption: "Реечные стеновые панели в офисе" },
    { src: `${GALLERY}/paneli-reechnie-sml-gsp-pvh-hpl.webp`, caption: "Реечные стеновые панели в офисе" },
  ] as const satisfies readonly SlatSmlAcrylGalleryImage[],
  ralChart: `${SML_BASE}/ral-chart.webp`,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
  icons: {
    fire: asset("/images/product-modal/icons/winal-flame.svg"),
    uv: `${SML_BASE}/icon-hero-uv.svg`,
    moisture: `${SML_BASE}/icon-hero-moisture.svg`,
    color: `${SML_BASE}/icon-hero-color.svg`,
    sound: `${SML_BASE}/icon-extra-sound.svg`,
    surface: `${SML_BASE}/icon-extra-surface.svg`,
    strength: `${SML_BASE}/icon-extra-strength.svg`,
    mount: `${SML_BASE}/icon-extra-mount.svg`,
  },
} as const;

export const slatSmlAcrylProductModal = {
  categoryLabel: "РЕЕЧНЫЕ ПАНЕЛИ",
  title: "WINAL™ СМЛ Акрил",
  description:
    "Негорючие реечные панели КМ-0 на СМЛ-основе с окраской акрилом. Модуль 2440×600 / 3000×600 мм задаёт ритм стены и визуальную высоту; крепление открытое или скрытое.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  heroFeatures: [
    {
      icon: slatSmlAcrylModalAssets.icons.fire,
      title: "Негорючие панели КМ-0",
      description:
        "Реечные панели на СМЛ-основе соответствуют классу КМ-0 по горючести, воспламеняемости, токсичности и дымообразованию.",
    },
    {
      icon: slatSmlAcrylModalAssets.icons.moisture,
      title: "Влагостойкая поверхность",
      description:
        "Акриловая окраска защищает рейку от влаги: панели можно мыть без потери внешнего вида, в том числе в зонах с высокой проходимостью.",
    },
    {
      icon: slatSmlAcrylModalAssets.icons.mount,
      title: "Простой сухой монтаж",
      description:
        "Готовая каркасная система алюминиевых профилей ускоряет установку и не требует предварительной подготовки стены.",
    },
    {
      icon: slatSmlAcrylModalAssets.icons.color,
      title: "Декоры под дерево, бетон и однотон",
      description:
        "В каталоге акриловых покрытий — фактуры дерева, бетона и однотонные окраски под цвет проекта.",
    },
  ] satisfies SlatSmlAcrylFeature[],
  coatingTitle: "Покрытия",
  coatingGroups: wallAcrylCoatingGroups,
  specs: {
    title: "Характеристики",
    productName: "WINAL™ СМЛ Акрил",
    rows: [
      { label: "Основа", value: "стекломагниевый лист (СМЛ)" },
      { label: "Размеры модуля", value: "2440×600 мм; 3000×600 мм" },
      { label: "Толщина", value: "12 мм" },
      { label: "Класс пожарной опасности", value: "КМ-0" },
      { label: "Покрытие", value: "окраска акрилом" },
      { label: "Крепление", value: "открытое / скрытое" },
    ] satisfies SlatSmlAcrylSpecRow[],
  },
  ralNote: "Панели могут быть окрашены в любой оттенок по RAL, NCS или Tikkurila",
  extraFeatures: [
    {
      icon: slatSmlAcrylModalAssets.icons.strength,
      title: "Ударопрочность",
      description: "Реечные панели на СМЛ держат повседневные нагрузки общественных интерьеров.",
    },
    {
      icon: slatSmlAcrylModalAssets.icons.surface,
      title: "Лёгкий уход",
      description: "Достаточно протирать поверхность влажной тканью.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-leaf.svg"),
      title: "Экологичность компонентов",
      description:
        "СМЛ с окраской акрилом не содержит вредных химических добавок и не выделяет токсичных соединений.",
    },
    {
      icon: slatSmlAcrylModalAssets.icons.uv,
      title: "Долговечность покрытия",
      description: "Акриловая окраска сохраняет вид рейки при регулярной эксплуатации.",
    },
  ] satisfies SlatSmlAcrylFeature[],
} as const;
