import { asset } from "@/lib/asset";
export type WallGklAcrylFeature = {
  icon: string;
  title: string;
  description: string;
};

export type WallGklAcrylCoatingSwatch = {
  id: string;
  image: string;
  label: string;
};

export type WallGklAcrylCoatingGroup = {
  chip: string;
  swatches: WallGklAcrylCoatingSwatch[];
};

export type WallGklAcrylSpecRow = {
  label: string;
  value: string;
};

export type WallGklAcrylGalleryImage = {
  src: string;
  caption: string;
};

const SML_BASE = asset("/images/product-modal/wall-sml-acryl");
const COATINGS = `${SML_BASE}/coatings`;
const GALLERY = asset("/images/product-modal/wall-gkl-acryl/gallery");

export const WALL_GKL_ACRYL_PRODUCT_MODAL_ID = "wall-gkl-acryl-product-modal";

export const wallGklAcrylModalAssets = {
  gallery: [
    { src: `${SML_BASE}/hero-diagram.webp`, caption: "" },
    { src: `${GALLERY}/dekorativnie-sten-paneli-gipsokarton-okrashenni-2.webp`, caption: "Декоративные стеновые и потолочные панели окрашенный гипсокартон. Отделка стен и потолков медицинскими панелями в больнице РЖД" },
    { src: `${GALLERY}/sten-potolok-paneli-hpl-sml-pvh-okras.webp`, caption: "Панели для стен окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL" },
    { src: `${GALLERY}/sten-potolok-paneli-hpl-sml-pvh-okras-3.webp`, caption: "Панели для стен окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL" },
    { src: `${GALLERY}/sten-potolok-paneli-hpl-sml-pvh-okras-2.webp`, caption: "Панели для стен окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL" },
    { src: `${GALLERY}/sten-paneli-winal-gkl-sml-6-1.webp`, caption: "Панели WINAL ГипсоАкрил (окрашенный гипсокартон ГКЛ с акриловым покрытием) отлично подходят для отделки стен медицинских учреждений, физкультурно-оздоровительных объектов, офиса, торговых и производственных помещений, детских садов, школ и других общественных и коммерческих помещений" },
    { src: `${GALLERY}/sten-panel-pvh-gipsokarton-omega-profil.webp`, caption: "Декоративные панели на стену под дерево гипсокартон ламинированный ПВХ Ель омега профиль" },
    { src: `${GALLERY}/sten-paneli-gipsokarton-gkl-pvh.webp`, caption: "Декоративные стеновые панели гипсокартон ламинированный ПВХ пленкой, монтаж алюминиевым омега профилем окрашенным  в цвет панелей" },
    { src: `${GALLERY}/sten-paneli-gipsokarton-gkl-pvh-bolnitsa.webp`, caption: "Декоративные стеновые и потолочные панели гипсокартон ламинированный ПВХ пленкой, монтаж алюминиевым омега профилем окрашенным  в цвет панелей. Отделка стен и потолков медицинскими панелями в больнице РЖД" },
    { src: `${GALLERY}/sten-paneli-gipsokarton-gkl-pvh-bolnitsa-2.webp`, caption: "Декоративные стеновые и потолочные панели гипсокартон ламинированный ПВХ пленкой, монтаж алюминиевым омега профилем окрашенным  в цвет панелей. Отделка стен и потолков медицинскими панелями в больнице РЖД" },
    { src: `${GALLERY}/otdelka-sten-ofisa-paneli-sml-list-gipsokarton-7.webp`, caption: "Отделка стен офиса Норникель декоративными панелями гипсокартон окрашенный, омега профиль" },
    { src: `${GALLERY}/otdelka-sten-ofisa-paneli-sml-list-gipsokarton.webp`, caption: "Отделка стен офиса Норникель декоративными панелями гипсокартон окрашенный под дерево, омега профиль" },
    { src: `${GALLERY}/sten-paneli-sml-list-premium-laminirovannie-pvh-18.webp`, caption: "Отделка стен панелями СМЛ лист ламинированные ПВХ пленкой глянцевыми и под бетон рал покрытиями спортивного комплекса Ледовая арена" },
    { src: `${GALLERY}/otdelka-sten-ofisa-paneli-sml-list-gipsokarton-5.webp`, caption: "Отделка стен офиса Норникель декоративными панелями гипсокартон окрашенный, омега профиль" },
    { src: `${GALLERY}/otdelka-sten-ofisa-paneli-sml-list-gipsokarton-1.webp`, caption: "Отделка стен офиса Норникель декоративными панелями гипсокартон окрашенный" },
  ] as const,
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

export const wallGklAcrylProductModal = {
  categoryLabel: "СТЕНОВЫЕ ПАНЕЛИ",
  title: "WINAL™ ГКЛ Акрил",
  description:
    "Доступные стеновые панели на слабогорючей ГКЛ-основе КМ-1 с акриловой окраской. Готовая к монтажу поверхность экономит бюджет проекта и исключает долгие мокрые отделочные работы.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  heroFeatures: [
    {
      icon: asset("/images/product-modal/icons/winal-flame.svg"),
      title: "Слабогорючая основа КМ-1",
      description:
        "Базовый гипсокартонный лист соответствует требованиям пожарной безопасности для общественных зон.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-palette.svg"),
      title: "Готовая окраска акрилом",
      description:
        "Многослойное УФ-покрытие устойчиво к выцветанию и не требует специального ухода в процессе эксплуатации.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-coins.svg"),
      title: "Рациональный бюджет ремонта",
      description:
        "Отсутствие черновой подготовки стен и штукатурки существенно снижает общую стоимость коммерческой отделки.",
    },
    {
      icon: wallGklAcrylModalAssets.icons.color,
      title: "Точный цвет под интерьер",
      description:
        "Широкий выбор оттенков по каталогу RAL и текстур дерева для поддержки фирменного стиля проекта.",
    },
  ] satisfies WallGklAcrylFeature[],
  coatingTitle: "Покрытия",
  coatingGroups: [
    {
      chip: "Акрил 3D",
      swatches: [
        { id: "akril-stelo-1", image: `${COATINGS}/3d/akril-stelo-1.webp`, label: "Кристалл гласс 3D" },
        { id: "akril-stelo-2", image: `${COATINGS}/3d/akril-stelo-2.webp`, label: "Кристалл гласс 3D" },
        { id: "akril-stelo-3", image: `${COATINGS}/3d/akril-stelo-3.webp`, label: "Кристалл гласс 3D" },
        { id: "akril-stelo-4", image: `${COATINGS}/3d/akril-stelo-4.webp`, label: "Кристалл гласс 3D" },
        { id: "akril-koja-brown-3d", image: `${COATINGS}/3d/akril-koja-brown-3d.webp`, label: "Экзотик скин 3D" },
        { id: "akril-koja-bej-3d", image: `${COATINGS}/3d/akril-koja-bej-3d.webp`, label: "Экзотик скин 3D" },
        { id: "akril-koja-zel-3d", image: `${COATINGS}/3d/akril-koja-zel-3d.webp`, label: "Экзотик скин 3D" },
        { id: "akril-koja-light-grey-3d", image: `${COATINGS}/3d/akril-koja-light-grey-3d.webp`, label: "Экзотик скин 3D" },
        { id: "akril-koja-grey-3d", image: `${COATINGS}/3d/akril-koja-grey-3d.webp`, label: "Экзотик скин 3D" },
        { id: "akril-koja-black-3d", image: `${COATINGS}/3d/akril-koja-black-3d.webp`, label: "Экзотик скин 3D" },
        { id: "akril-carbon-blue-3d", image: `${COATINGS}/3d/akril-carbon-blue-3d.webp`, label: "Карбон 3D" },
        { id: "akril-carbon-dark-3d", image: `${COATINGS}/3d/akril-carbon-dark-3d.webp`, label: "Карбон 3D" },
        { id: "akril-beton-1", image: `${COATINGS}/3d/akril-beton-1.webp`, label: "Бетон 3D" },
        { id: "akril-tkan-1", image: `${COATINGS}/3d/akril-tkan-1.webp`, label: "Ткань 3D" },
      ],
    },
    {
      chip: "Акрил дерево",
      swatches: [
        { id: "akril-polimer-soft-tach-dub-kompinteri", image: `${COATINGS}/wood/akril-polimer-soft-tach-dub-kompinteri.webp`, label: "Дуб Компинтери" },
        { id: "akril-uf-oreh-temni", image: `${COATINGS}/wood/akril-uf-oreh-temni.webp`, label: "Орех Темный" },
        { id: "buk_natural-1", image: `${COATINGS}/wood/buk_natural-1.webp`, label: "Бук натуральный" },
        { id: "dub_capuccino-1", image: `${COATINGS}/wood/dub_capuccino-1.webp`, label: "Дуб капуччино" },
        { id: "dub_franzuzski-1", image: `${COATINGS}/wood/dub_franzuzski-1.webp`, label: "Дуб французский" },
        { id: "dub_pesochni_grafit-1", image: `${COATINGS}/wood/dub_pesochni_grafit-1.webp`, label: "Дуб песочный графит" },
        { id: "dub_pesochni-1", image: `${COATINGS}/wood/dub_pesochni-1.webp`, label: "Дуб песочный" },
        { id: "dub_slonovaia_kost-1", image: `${COATINGS}/wood/dub_slonovaia_kost-1.webp`, label: "Дуб слоновая кость" },
        { id: "dub_trufel-1", image: `${COATINGS}/wood/dub_trufel-1.webp`, label: "Дуб трюфель" },
        { id: "dub-molochnyj-2-1", image: `${COATINGS}/wood/dub-molochnyj-2-1.webp`, label: "Дуб молочный" },
        { id: "klen_tanzai-1", image: `${COATINGS}/wood/klen_tanzai-1.webp`, label: "Клен танзай" },
        { id: "new-listvennitsa-krem-gkl-akril-1", image: `${COATINGS}/wood/new-listvennitsa-krem-gkl-akril-1.webp`, label: "Лиственница крем" },
        { id: "new-listvennitsa-sahalinskaya-gkl-akril-1", image: `${COATINGS}/wood/new-listvennitsa-sahalinskaya-gkl-akril-1.webp`, label: "Лиственница сахалинская" },
        { id: "new-sandal-seriy-gkl-akril-1", image: `${COATINGS}/wood/new-sandal-seriy-gkl-akril-1.webp`, label: "Сандал серый" },
        { id: "olha-2-1", image: `${COATINGS}/wood/olha-2-1.webp`, label: "Ольха" },
        { id: "sosna-2-1", image: `${COATINGS}/wood/sosna-2-1.webp`, label: "Сосна" },
      ],
    },
    {
      chip: "Акрил бетон",
      swatches: [
        { id: "beton-beli-1", image: `${COATINGS}/concrete/beton-beli-1.webp`, label: "Бетон белый" },
        { id: "beton_7038-1", image: `${COATINGS}/concrete/beton_7038-1.webp`, label: "Бетон 7038" },
        { id: "akril-beton-7047", image: `${COATINGS}/concrete/akril-beton-7047.webp`, label: "Бетон 7047" },
        { id: "beton_7037-1", image: `${COATINGS}/concrete/beton_7037-1.webp`, label: "Бетон 7037" },
      ],
    },
  ] satisfies WallGklAcrylCoatingGroup[],
  specs: {
    title: "Характеристики",
    productName: "WINAL™ ГКЛ Акрил",
    rows: [
      { label: "Основа", value: "гипсокартонный лист (ГКЛ)" },
      { label: "Размеры", value: "2500×1200–3600×1200 мм" },
      { label: "Толщина", value: "6,5 / 9,5 / 12,5 мм" },
      { label: "Класс пожарной опасности", value: "КМ-1 (у основы)" },
      { label: "Покрытие", value: "многослойная акриловая окраска" },
    ] satisfies WallGklAcrylSpecRow[],
  },
  ralNote: "Панели могут быть окрашены в любой оттенок по RAL",
  extraFeatures: [
    {
      icon: wallGklAcrylModalAssets.icons.sound,
      title: "Дополнительная звукоизоляция",
      description:
        "Обшивка готовыми панелями способствует лучшей звуко- и теплоизоляции в коммерческих пространствах.",
    },
    {
      icon: wallGklAcrylModalAssets.icons.surface,
      title: "Маскировка неровностей стен",
      description:
        "Крупноформатные панели надежно скрывают дефекты черновой плоскости и прячут инженерные коммуникации.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-ruler.svg"),
      title: "Длинные форматы до 3600 мм",
      description:
        "Увеличенные габариты листов помогают перекрывать высокие стены с минимальным числом горизонтальных стыков.",
    },
    {
      icon: wallGklAcrylModalAssets.icons.mount,
      title: "Всесезонный сухой монтаж",
      description:
        "Быстрая каркасная установка возможна даже в неотапливаемых зонах (панели выдерживают от -50 до +80 °С).",
    },
  ] satisfies WallGklAcrylFeature[],
} as const;
