import { asset } from "@/lib/asset";
export type WallSmlAcrylFeature = {
  icon: string;
  title: string;
  description: string;
};

export type WallSmlAcrylCoatingSwatch = {
  id: string;
  image: string;
  label: string;
};

export type WallSmlAcrylCoatingGroup = {
  chip: string;
  swatches: WallSmlAcrylCoatingSwatch[];
};

export type WallSmlAcrylSpecRow = {
  label: string;
  value: string;
};

export type WallSmlAcrylGalleryImage = {
  src: string;
  caption: string;
};

const BASE = asset("/images/product-modal/wall-sml-acryl");
const COATINGS = `${BASE}/coatings`;
const GALLERY = `${BASE}/gallery`;

export const WALL_SML_ACRYL_PRODUCT_MODAL_ID = "wall-sml-acryl-product-modal";

export const wallSmlAcrylModalAssets = {
  gallery: [
    { src: `${BASE}/hero-diagram.webp`, caption: "" },
    { src: `${GALLERY}/panel-akril-sml-sten-10.webp`, caption: "Стеновые панели стекломагний СМЛ с акриловым покрытием негорючие КМ-0" },
    { src: `${GALLERY}/rzhd-slot-06.webp`, caption: "Декоративные стеновые и потолочные панели окрашенный гипсокартон. Отделка стен и потолков медицинскими панелями в больнице РЖД" },
    { src: `${GALLERY}/sten-paneli-hpl-sml-list-gkl-winal-2.webp`, caption: "Окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL панели для стен и потолков под дерево  РАЛ" },
    { src: `${GALLERY}/sten-potolok-paneli-hpl-sml-pvh-okras-2.webp`, caption: "Панели для стен окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL" },
    { src: `${GALLERY}/stenovie-paneli-winal-gkl-sml-office-1.webp`, caption: "Окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL панели для стен и потолков под дерево  РАЛ для офиса" },
    { src: `${GALLERY}/panel-akril-sml-sten-22.webp`, caption: "Стеновые панели стекломагний СМЛ с акриловым покрытием УФ лаком негорючие КМ-0" },
    { src: `${GALLERY}/sten-panel-winal-akril-uf-1.webp`, caption: "Панель СМЛ лист Премиум, окрашенный акрил УФ лак" },
    { src: `${GALLERY}/sml-akril-YASEN-sk.webp`, caption: "Стеновые панели СМЛ скрытое крепление негорючие окраска по каталогу ламинированных ПВХ Яень крем" },
    { src: `${GALLERY}/sten-potolok-paneli-hpl-sml-pvh-okras.webp`, caption: "Панели для стен окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL" },
    { src: `${GALLERY}/sten-potolok-paneli-hpl-sml-pvh-okras-3.webp`, caption: "Панели для стен окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL" },
    { src: `${GALLERY}/sten-paneli-hpl-winal-2.webp`, caption: "Стеновые панели с акриловыми покрытиями на основе ГКЛ и СМЛ для офисов и бизнес-центров" },
    { src: `${GALLERY}/sten-paneli-hpl-sml-list-gkl-winal-4.webp`, caption: "Окрашенный СМЛ лист Премиум, гипсокартон ламинированный ПВХ, HPL панели для стен и потолков под дерево  РАЛ" },
    { src: `${GALLERY}/panel-sml-beton-beli-uf.webp`, caption: "Стеновые панели Стекломагний СМЛ Акрил Бетон Белый УФ лак" },
    { src: `${GALLERY}/sten-panel-smal-beton-polikristall.webp`, caption: "Стеновые панели WINAL СМЛ Акрил Бетон поликристалл" },
    { src: `${GALLERY}/sml-akril-ral-9003-2.webp`, caption: "Стеновые панели СМЛ негорючие окраска рал RAL 9003" },
    { src: `${GALLERY}/med-sten-paneli-sml-profil.webp`, caption: "Медицинские панели для стен СМЛ противопожарные антибактериальные белые РАЛ RAL 9003 в коридор, кабинет, палату. Монтаж открытый алюминиевым профилем" },
    { src: `${GALLERY}/pegas-slot-18.webp`, caption: "Панели для стен окрашенный СМЛ лист премиум по каталогу акрил рал омега профиль" },
    { src: `${GALLERY}/paneli-sml-list0okrashenni-ral-9003.webp`, caption: "Медицинские панели для стен окрашенный СМЛ лист премиум открытый монтаж профилем омега. Онкологическая больница поликлиника Тула" },
    { src: `${GALLERY}/paneli-sml-list0okrashenni-ral-9003-1.webp`, caption: "Медицинские панели для стен окрашенный СМЛ лист премиум открытый монтаж профилем омега. Онкологическая больница поликлиника Тула" },
    { src: `${GALLERY}/paneli-sml-list0okrashenni-ral-9003-2.webp`, caption: "Медицинские панели для стен окрашенный СМЛ лист премиум открытый монтаж профилем омега. Онкологическая поликлиника Тула" },
    { src: `${GALLERY}/rzhd-slot-01.webp`, caption: "Декоративные стеновые и потолочные панели окрашенный СМЛ лист премиум. Отделка стен и потолков медицинскими панелями в больнице РЖД" },
    { src: `${GALLERY}/sml-akril-ral-7037-1.webp`, caption: "Стеновые панели СМЛ негорючие окраска рал RAL 7037" },
    { src: `${GALLERY}/sten-paneli-sml-okrasheni-ral-7037.webp`, caption: "СМЛ лист Премиум негорючий окрашенный по каталогу рал 7037, открытый монтаж алюминиевым профилем омега" },
    { src: `${GALLERY}/sten-paneli-sml-okrasheni-ral-7037-3.webp`, caption: "СМЛ лист Премиум негорючий окрашенный по каталогу рал 7037, открытый монтаж алюминиевым профилем омега" },
    { src: `${GALLERY}/sten-paneli-sml-okrasheni-ral-7037-2.webp`, caption: "СМЛ лист Премиум негорючий окрашенный по каталогу рал 7037, открытый монтаж алюминиевым профилем омега" },
    { src: `${GALLERY}/sten-paneli-sml-okrasheni-ral-7037-1.webp`, caption: "СМЛ лист Премиум негорючий окрашенный по каталогу рал 7037, открытый монтаж алюминиевым профилем омега" },
    { src: `${GALLERY}/sten-panel-sml-ral-9001.webp`, caption: "Стеновые панели негорючие СМЛ лист окрашенные рал RAL 9001" },
    { src: `${GALLERY}/paneli-sten-sml-list-okras-ral-4.webp`, caption: "Панели для стен школьного спортзала окрашенный СМЛ лист премиум по каталогу акрил рал со скрытым креплением негорючие огнестойкие" },
    { src: `${GALLERY}/paneli-sten-sml-list-okras-ral-shkola-6.webp`, caption: "Отделка стен в школьном спортзале, классах, кабинетах и коридорах цветными панелями смл лист премиум панели окрашенный рал, монтаж омега профиль алюминиевый, потолочные панели" },
    { src: `${GALLERY}/paneli-sten-sml-list-okras-ral-shkola-5.webp`, caption: "Отделка стен в школе, классах, кабинетах и коридорах цветными панелями смл лист премиум панели окрашенный рал, монтаж омега профиль алюминиевый, потолочные панели" },
    { src: `${GALLERY}/paneli-sten-sml-list-okras-ral-shkola-19.webp`, caption: "Отделка стен в школьных классах и кабинетах панелями смл лист окрашенный премиум рал, монтаж омега профиль алюминиевый" },
    { src: `${GALLERY}/paneli-sten-sml-list-okras-ral-shkola-18.webp`, caption: "Отделка стен в школьных классах и кабинетах панелями смл лист окрашенный премиум рал, монтаж омега профиль алюминиевый" },
    { src: `${GALLERY}/sten-panel-sml-ral-1003.webp`, caption: "Стеновые панели негорючие СМЛ лист окрашенные рал RAL 1003" },
    { src: `${GALLERY}/sten-paneli-sml-list-okras-ral-1003-5.webp`, caption: "Панели для стен окрашенные рал СМЛ лист премиум алюминиевый профиль омега" },
    { src: `${GALLERY}/sten-paneli-sml-list-okras-ral-1003.webp`, caption: "Панели для стен окрашенные рал СМЛ лист премиум алюминиевый профиль омега" },
    { src: `${GALLERY}/sten-paneli-sml-list-okras-ral-1003-3.webp`, caption: "Панели для стен окрашенные рал СМЛ лист премиум алюминиевый профиль омега, акустические перфорированные панели для звука" },
    { src: `${GALLERY}/sten-paneli-sml-list-okras-ral-1003-2.webp`, caption: "Панели для стен окрашенные рал СМЛ лист премиум алюминиевый профиль омега" },
    { src: `${GALLERY}/sten-panel-sml-ral-6018.webp`, caption: "Стеновые панели негорючие СМЛ лист окрашенные рал RAL 6018" },
    { src: `${GALLERY}/sten-paneli-sml-list-okras-ral-6018-1.webp`, caption: "Панели для стен окрашенные рал СМЛ лист премиум алюминиевый профиль омега" },
    { src: `${GALLERY}/sten-paneli-sml-list-okras-ral-6018-2.webp`, caption: "Панели для стен окрашенные рал СМЛ лист премиум алюминиевый профиль омега, акустические панели звукоотражающие" },
    { src: `${GALLERY}/sten-paneli-sml-list-okras-ral-6018-3.webp`, caption: "Панели для стен окрашенные рал СМЛ лист премиум алюминиевый профиль омега, печать картинок на панелях стене" },
    { src: `${GALLERY}/panel-RAL-9016-sml-sk.webp`, caption: "Панель СМЛ лист Премиум, окрашенный акрил УФ лак RAL 9016" },
    { src: `${GALLERY}/sml-akril-lak-9016-2.webp`, caption: "Панель СМЛ лист Премиум, окрашенный акрил УФ лак RAL 9016" },
    { src: `${GALLERY}/panel-ral-9016-sml-sk-3-1.webp`, caption: "Панель СМЛ лист Премиум, окрашенный акрил УФ лак RAL 9016" },
    { src: `${GALLERY}/sten-paneli-sml-okrasheni-akril-1.webp`, caption: "Отделка стен негорючими окрашенными СМЛ лист панелями в фойе и коридорах комплекса" },
    { src: `${GALLERY}/sten-potolochnie-paneli-sml-okrasheni-akril-5.webp`, caption: "Отделка стен и потолков негорючими окрашенными RAL 9016 СМЛ лист панелями на входной зоне, в фойе и коридорах комплекса" },
    { src: `${GALLERY}/med-paneli-sml-list-okrashenni-ral-9003-sk-6.webp`, caption: "Медицинские панели для стен окрашенный СМЛ лист премиум, отбойная доска ламинированная ПВХ или HPL. Онкологическая больница поликлиника Тула" },
    { src: `${GALLERY}/med-paneli-sml-list-okrashenni-ral-9003-sk-2.webp`, caption: "Медицинские панели для стен окрашенный СМЛ лист премиум, отбойная доска ламинированная ПВХ или HPL. Онкологическая больница поликлиника Тула" },
    { src: `${GALLERY}/paneli-sml-list0okrashenni-ral-9003-sk.webp`, caption: "Медицинские панели для стен негорючий окрашенный СМЛ лист премиум окрашенный РАЛ. Онкологическая поликлиника Тула" },
    { src: `${GALLERY}/sten-potolochnie-paneli-sml-okrasheni-akril-14.webp`, caption: "Отделка стен и потолков негорючими окрашенными RAL 9016 СМЛ лист панелями на входной зоне, в фойе и коридорах комплекса" },
    { src: `${GALLERY}/sten-potolochnie-paneli-sml-okrasheni-akril-11.webp`, caption: "Отделка стен и потолков негорючими окрашенными рал 9016 СМЛ лист панелями в офисе" },
    { src: `${GALLERY}/sten-potolochnie-paneli-sml-okrasheni-akril-10.webp`, caption: "Отделка стен и потолков негорючими окрашенными рал 9016 СМЛ лист панелями в офисе" },
    { src: `${GALLERY}/ofis-sten-paneli-sml-okrasheni-akril-11.webp`, caption: "Отделка стен негорючими окрашенными СМЛ лист панелями в офисе" },
    { src: `${GALLERY}/sml-ral-7024-3.webp`, caption: "Стеновые панели окрашенный СМЛ лист цвет РАЛ 2004" },
    { src: `${GALLERY}/sten-paneli-sml-h-profil-ral-7024.webp`, caption: "Стеновые панели декоративные СМЛ ламинированные ПВХ рал RAL 7024 внешнее крепление алюминиевым монтажным профилем" },
    { src: `${GALLERY}/dekorativnie-sten-paneli-sml-list-ofis.webp`, caption: "Декоративные стеновые панели для офиса деловой цвет рал 7024 смл лист премиум" },
    { src: `${GALLERY}/dekorativnie-sten-paneli-sml-list-ofis-2.webp`, caption: "Панели для офиса стен и перегородок декоративные деловой цвет рал 7024 смл лист премиум" },
    { src: `${GALLERY}/sml-ral-2004-3-1.webp`, caption: "Стеновые панели для детского сада и школы СМЛ лист окрашенный РАЛ 2004" },
    { src: `${GALLERY}/paneli-sten-sml-list-okras-ral-shkola-14.webp`, caption: "Отделка стен в школьной столовой, классах, кабинетах и коридорах цветными панелями смл лист премиум окрашенный премиум рал, монтаж омега профиль алюминиевый" },
    { src: `${GALLERY}/paneli-sten-sml-list-okras-ral-shkola-21.webp`, caption: "Отделка стен в школе цветными панелями смл лист окрашенный премиум рал, монтаж омега профиль алюминиевый" },
    { src: `${GALLERY}/paneli-sten-sml-list-okras-ral-shkola-22.webp`, caption: "Отделка стен в школе цветными панелями смл лист окрашенный премиум рал, монтаж омега профиль алюминиевый" },
    { src: `${GALLERY}/paneli-sten-sml-list-okras-ral-shkola-17.webp`, caption: "Отделка стен в школьных классах, кабинетах и коридорах панелями смл лист премиум окрашенный премиум рал, монтаж омега профиль алюминиевый" },
    { src: `${GALLERY}/paneli-sten-sml-list-okras-ral-shkola-4.webp`, caption: "Отделка стен в школе, классах, кабинетах и коридорах цветными панелями смл лист премиум панели окрашенный рал, монтаж омега профиль алюминиевый, потолочные панели" },
    { src: `${GALLERY}/med-paneli-dlya-sten-antibakterial-sml.webp`, caption: "Медицинские панели СМЛ для стен медицинских учреждений негорючие" },
    { src: `${GALLERY}/med-sten-paneli-sml-h-profil.webp`, caption: "Стеновые панели для медицинских учреждений СМЛ негорючие" },
    { src: `${GALLERY}/med-sten-paneli-sml-h-profil-2.webp`, caption: "Стеновые панели для медицинских учреждений СМЛ атнибактериальные негорючие" },
    { src: `${GALLERY}/meditsinskie-paneli-dlya-sten-antibakterial-sml.webp`, caption: "Медицинские панели для стен в кабинете и палате антибактериальные негорючие СМЛ" },
    { src: `${GALLERY}/med-paneli-sml-list-okrashenni-ral-9003-2.webp`, caption: "Медицинские панели для стен окрашенный СМЛ лист премиум, отбойная доска ламинированная ПВХ или HPL. Онкологическая больница поликлиника Тула" },
  ] as const,
  ralChart: `${BASE}/ral-chart.webp`,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
  icons: {
    fire: asset("/images/product-modal/icons/winal-flame.svg"),
    uv: `${BASE}/icon-hero-uv.svg`,
    moisture: `${BASE}/icon-hero-moisture.svg`,
    color: `${BASE}/icon-hero-color.svg`,
    sound: `${BASE}/icon-extra-sound.svg`,
    surface: `${BASE}/icon-extra-surface.svg`,
    strength: `${BASE}/icon-extra-strength.svg`,
    mount: `${BASE}/icon-extra-mount.svg`,
  },
} as const;

export const wallSmlAcrylProductModal = {
  categoryLabel: "СТЕНОВЫЕ ПАНЕЛИ",
  title: "WINAL™ СМЛ Акрил",
  description:
    "Негорючие стеновые панели на СМЛ-основе КМ-0 с окраской акрилом. Готовая чистовая поверхность сочетает влагостойкость, прочность и точную геометрию с быстрым монтажом без штукатурки и покраски стены.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  heroFeatures: [
    {
      icon: wallSmlAcrylModalAssets.icons.fire,
      title: "Негорючая основа КМ-0",
      description:
        "СМЛ-основа класса КМ-0 помогает выполнить требования к пожарной безопасности внутренней отделки.",
    },
    {
      icon: wallSmlAcrylModalAssets.icons.uv,
      title: "Стойкость к выцветанию и УФ",
      description:
        "Многослойное акриловое покрытие с защитным слоем лака не подвержено выцветанию и не требует специального ухода.",
    },
    {
      icon: wallSmlAcrylModalAssets.icons.moisture,
      title: "Влагостойкость и экологичность",
      description:
        "Продукт на 99% состоит из природных материалов. Водопроницаемость менее 5%, панели защищены от плесени.",
    },
    {
      icon: wallSmlAcrylModalAssets.icons.color,
      title: "Цвет под проект",
      description:
        "Возможность выбора декоративного слоя по каталогам однотонных покрытий RAL и натуральных древесных текстур.",
    },
  ] satisfies WallSmlAcrylFeature[],
  coatingTitle: "Покрытия",
  coatingGroups: [
    {
      chip: "Акриловые 3D",
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
      chip: "Акриловые древесные",
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
      chip: "Акриловые бетон",
      swatches: [
        { id: "beton-beli-1", image: `${COATINGS}/concrete/beton-beli-1.webp`, label: "Бетон белый" },
        { id: "beton_7038-1", image: `${COATINGS}/concrete/beton_7038-1.webp`, label: "Бетон 7038" },
        { id: "akril-beton-7047", image: `${COATINGS}/concrete/akril-beton-7047.webp`, label: "Бетон 7047" },
        { id: "beton_7037-1", image: `${COATINGS}/concrete/beton_7037-1.webp`, label: "Бетон 7037" },
      ],
    },
  ] satisfies WallSmlAcrylCoatingGroup[],
  specs: {
    title: "Характеристики",
    productName: "WINAL™ СМЛ Акрил",
    rows: [
      { label: "Основа", value: "стекломагниевый лист (СМЛ)" },
      { label: "Размеры", value: "2440×1220 мм; 3000×1220 мм" },
      { label: "Толщина", value: "6 / 8 / 10 / 12 мм" },
      { label: "Класс пожарной опасности", value: "КМ-0" },
      { label: "Покрытие", value: "окраска акрилом" },
    ] satisfies WallSmlAcrylSpecRow[],
  },
  ralNote: "Панели могут быть окрашены в любой оттенок по RAL",
  extraFeatures: [
    {
      icon: wallSmlAcrylModalAssets.icons.sound,
      title: "Дополнительная звукоизоляция",
      description:
        "Входящий в состав материала перлит обеспечивает панелям дополнительный уровень звукоизоляции",
    },
    {
      icon: wallSmlAcrylModalAssets.icons.surface,
      title: "Готовая чистовая поверхность",
      description:
        "Панели поставляются с окраской акрилом — штукатурить и красить стену на объекте не требуется.",
    },
    {
      icon: wallSmlAcrylModalAssets.icons.strength,
      title: "Прочность и геометрия стен",
      description:
        "Плотный стекломагниевый лист устойчив к нагрузкам и формирует ровную плоскость готовой стены.",
    },
    {
      icon: wallSmlAcrylModalAssets.icons.mount,
      title: "Два варианта крепления",
      description:
        "Открытый или скрытый монтаж позволяет выбрать требуемый вид стыков с помощью алюминиевых профилей.",
    },
  ] satisfies WallSmlAcrylFeature[],
} as const;
