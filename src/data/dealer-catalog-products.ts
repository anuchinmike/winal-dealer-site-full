import { asset } from "@/lib/asset";
import type { ProfileModalAction } from "@/data/profiles-product-modal";

export type DealerCatalogAction =
  | "family_expand"
  | "rythmwall_modal"
  | "wisound_modal"
  | "minwin_modal"
  | "wall_sml_acryl_modal"
  | "wall_gkl_acryl_modal"
  | "wall_sml_hpl_modal"
  | "wall_gsp_hpl_modal"
  | "wall_sml_pvc_modal"
  | "wall_gkl_pvc_modal"
  | "wall_gsp_pvc_modal"
  | "wall_sml_polymer_modal"
  | "wall_gkl_polymer_modal"
  | "slat_sml_acryl_modal"
  | "slat_sml_pvc_modal"
  | "slat_sml_hpl_modal"
  | "cloud_w_modal"
  | "cloud_c_modal"
  | "cloud_b_modal"
  | "cloud_i_modal"
  | "soundcore_14_modal"
  | "soundcore_25_modal"
  | "urban_w_modal"
  | "urban_c_modal"
  | "wallpro_modal"
  | "winisol_modal"
  | "invisible_basic_modal"
  | "invisible_basic_reverse_modal"
  | "invisible_clean_modal"
  | "lumen_line_modal"
  | "mounting_profiles_modal"
  | "profiles_hub_modal"
  | ProfileModalAction
  | "strong_base_wnl_modal"
  | "crystal_base_wnl_modal"
  | "hidden_aluminum_baseboard_modal"
  | "mini_base_modal"
  | "radiator_screen_sill_modal"
  | "radiator_screen_box_modal"
  | "radiator_screen_overlay_modal"
  | "ceiling_sml_acryl_modal"
  | "ceiling_sml_pvc_modal"
  | "ceiling_gkl_acryl_modal"
  | "ceiling_gkl_pvc_modal"
  | "radius_solutions_modal"
  | "ufr_print_modal"
  | "disabled";
export type DealerCatalogTabId = "wall" | "acoustic" | "ceiling" | "system";

export type DealerCatalogChild = {
  id: string;
  title: string;
  /** Short label for the family-card product list (hover overlay). */
  listTitle: string;
  description: string;
  image: string;
  objectPosition?: string;
  action?: DealerCatalogAction;
};

export type DealerCatalogProduct = {
  id: string;
  /** Compact purpose label displayed in the card's upper block. */
  contextTitle: string;
  /** Supporting line for the compact purpose label. */
  contextSubtitle: string;
  title: string;
  description: string;
  image: string;
  objectPosition?: string;
  action: DealerCatalogAction;
  children?: DealerCatalogChild[];
};

const CATALOG_IMAGES = asset("/images/catalog");
const image = (name: string) => `${CATALOG_IMAGES}/${name}.webp`;

/** Figma-selected acoustic card covers — keep separate from winal.ru proxy assets. */
export const dealerCatalogImageAssets = {
  cardWisound: image("card-wisound"),
  cardSoundcore: image("card-soundcore"),
  cardCloud: image("card-cloud"),
  cardCloudSystemI: image("card-cloud-system-i"),
  cardCloudSystemB: image("card-cloud-system-b"),
  cardCloudSystemW: image("card-cloud-system-w"),
  cardCloudSystemC: image("card-cloud-system-c"),
  cardUrban: image("card-urban"),
  cardWallPro: image("card-wallpro"),
  cardInvisible: image("card-invisible"),
  cardProfiles: image("card-profiles"),
  cardPlinths: image("card-plinths"),
} as const;

/** Local product assets sourced from winal.ru or supplied by WINAL. */
const catalogImages = {
  rhythm: image("rythmwall"),
  slat: image("slat-wall-panels"),
  wisoundLite: image("wisound-lite"),
  soundcore14: image("soundcore-14"),
  soundcore25: image("soundcore-25"),
  urbanW: image("urban-w"),
  urbanC: image("urban-c"),
  winisol: image("winisol"),
  wallSmlAcryl: image("wall-sml-acryl"),
  wallSmlPvc: image("wall-sml-pvc"),
  wallSmlPolymer: image("wall-sml-polymer"),
  wallGklAcryl: image("wall-gkl-acryl"),
  wallGklPvc: image("wall-gkl-pvc"),
  wallGklPolymer: image("wall-gkl-polymer"),
  wallGspPvc: image("wall-gsp-pvc"),
  wallGspHpl: image("wall-gsp-hpl"),
  ceilingSmlFamily: image("ceiling-sml-family"),
  ceilingGklFamily: image("ceiling-gkl-family"),
  ceilingSmlAcryl: image("ceiling-sml-acryl"),
  ceilingSmlPvc: image("ceiling-sml-pvc"),
  ceilingGklAcryl: image("ceiling-gkl-acryl"),
  ceilingGklPvc: image("ceiling-gkl-pvc"),
  invisibleBasic: image("invisible-basic"),
  invisibleReverse: image("invisible-reverse"),
  invisibleClean: image("invisible-clean"),
  lumenLine: image("lumen-line"),
  mountingProfiles: image("mounting-profiles"),
  plinthStrongBase: image("plinth-strong-base"),
  plinthCrystalBase: image("plinth-crystal-base"),
  plinthHidden: image("plinth-hidden"),
  plinthMiniBase: image("plinth-mini-base"),
  radiatorWindowSill: image("radiator-screen-window-sill"),
  radiatorBox: image("radiator-screen-box"),
  radiatorOverlay: image("radiator-screen-overlay"),
  radius: image("radius-solutions"),
  ufr: image("ufr-print"),
  minwin: image("minwin-proxy"),
} as const;

type CatalogContext = Pick<DealerCatalogProduct, "contextTitle" | "contextSubtitle">;

function child(
  id: string,
  title: string,
  description: string,
  imagePath: string,
  listTitle: string,
  objectPosition?: string,
  action?: DealerCatalogAction,
): DealerCatalogChild {
  return { id, title, listTitle, description, image: imagePath, objectPosition, action };
}

function family(
  id: string,
  title: string,
  description: string,
  imagePath: string,
  children: DealerCatalogChild[],
  context: CatalogContext,
): DealerCatalogProduct {
  return { id, title, description, image: imagePath, action: "family_expand", children, ...context };
}

const products: Record<string, DealerCatalogProduct> = {
  "family-wisound": {
    id: "family-wisound",
    title: "WINAL™ WISOUND",
    description: "Перфорированные панели для точной настройки акустики и дизайна интерьера.",
    image: dealerCatalogImageAssets.cardWisound,
    action: "wisound_modal",
    contextTitle: "Стеновые акустические панели",
    contextSubtitle: "Перфорированные решения для стен и потолков.",
  },
  "family-cloud-system": family(
    "family-cloud-system",
    "WINAL™ CLOUD SYSTEM",
    "Акустические панели, баффлы и острова для стен и потолков.",
    dealerCatalogImageAssets.cardCloud,
    [
      child("cloud-w", "WINAL™ Cloud System W", "Стеновые акустические панели на минеральном волокне и стеклохолсте.", dealerCatalogImageAssets.cardCloudSystemW, "Cloud System W", undefined, "cloud_w_modal"),
      child("cloud-c", "WINAL™ Cloud System C", "Потолочные акустические панели с высоким звукопоглощением.", dealerCatalogImageAssets.cardCloudSystemC, "Cloud System C", undefined, "cloud_c_modal"),
      child("cloud-b", "WINAL™ Cloud System B", "Вертикальные акустические баффлы для открытого потолочного пространства.", dealerCatalogImageAssets.cardCloudSystemB, "Cloud System B", undefined, "cloud_b_modal"),
      child("cloud-i", "WINAL™ Cloud System I", "Горизонтальные акустические острова для открытых потолочных зон.", dealerCatalogImageAssets.cardCloudSystemI, "Cloud System I", undefined, "cloud_i_modal"),
    ],
    { contextTitle: "Акустические системы", contextSubtitle: "Панели, баффлы и острова для стен и потолков." },
  ),
  "family-soundcore": family(
    "family-soundcore",
    "WINAL™ SOUNDCORE",
    "Фактурные акустические панели из древесного волокна и цемента.",
    dealerCatalogImageAssets.cardSoundcore,
    [
      child("soundcore-14", "WINAL™ Soundcore 14", "Акустические панели для потолочных решений.", catalogImages.soundcore14, "Soundcore 14", undefined, "soundcore_14_modal"),
      child("soundcore-25", "WINAL™ Soundcore 25", "Акустические панели из древесного волокна для стен общественных пространств.", catalogImages.soundcore25, "Soundcore 25", "right center", "soundcore_25_modal"),
    ],
    { contextTitle: "Акустические панели", contextSubtitle: "Древесное волокно и цемент для прочных поверхностей." },
  ),
  "family-urban": family(
    "family-urban",
    "WINAL™ URBAN",
    "Металлические акустические панели для прочных стеновых и потолочных решений.",
    dealerCatalogImageAssets.cardUrban,
    [
      child("urban-w", "WINAL™ Urban W", "Металлические стеновые панели с минеральным звукопоглощающим наполнителем.", dealerCatalogImageAssets.cardUrban, "Urban W", undefined, "urban_w_modal"),
      child("urban-c", "WINAL™ Urban C", "Металлические потолочные панели с минеральным звукопоглощающим наполнителем.", catalogImages.urbanC, "Urban C", undefined, "urban_c_modal"),
    ],
    { contextTitle: "Акустические панели", contextSubtitle: "Металлические решения для стен и потолков." },
  ),
  "family-wall-sml": family(
    "family-wall-sml",
    "Стеновые панели на основе СМЛ",
    "Панели на негорючей стекломагниевой основе для стабильной отделки стен.",
    catalogImages.wallSmlPvc,
    [
      child("wall-sml-acryl", "Стеновые панели WINAL™ СМЛ Акрил", "Панели с окраской акрилом для ровной стеновой поверхности.", catalogImages.wallSmlAcryl, "WINAL™ СМЛ Акрил", undefined, "wall_sml_acryl_modal"),
      child("wall-sml-pvc", "Стеновые панели WINAL™ СМЛ ПВХ", "Панели с ПВХ-ламинацией и выбором декоративных покрытий.", asset("/images/catalog/cards/wall-sml-pvc.webp"), "WINAL™ СМЛ ПВХ", undefined, "wall_sml_pvc_modal"),
      child("wall-sml-hpl", "Стеновые панели WINAL™ СМЛ HPL", "Износостойкие стеновые панели с HPL-покрытием.", asset("/images/catalog/cards/wall-sml-hpl.webp"), "WINAL™ СМЛ HPL", undefined, "wall_sml_hpl_modal"),
      child("wall-sml-polymer", "Стеновые панели WINAL™ СМЛ Полимер", "Панели с практичным полимерным покрытием для интенсивной эксплуатации.", asset("/images/catalog/cards/wall-polymer-shared.webp"), "WINAL™ СМЛ Полимер", undefined, "wall_sml_polymer_modal"),
    ],
    { contextTitle: "Стеновые панели", contextSubtitle: "Негорючая СМЛ-основа для стабильной стеновой отделки." },
  ),
  "family-wall-gkl": family(
    "family-wall-gkl",
    "Стеновые панели на основе ГКЛ",
    "Панели на ГКЛ-основе — доступное решение для практичной интерьерной отделки с разными покрытиями.",
    catalogImages.wallGklPvc,
    [
      child("wall-gkl-acryl", "Стеновые панели WINAL™ ГКЛ Акрил", "Окрашенные акрилом панели на ГКЛ-основе.", catalogImages.wallGklAcryl, "WINAL™ ГКЛ Акрил", undefined, "wall_gkl_acryl_modal"),
      child("wall-gkl-pvc", "Стеновые панели WINAL™ ГКЛ ПВХ", "Ламинированные ПВХ панели на ГКЛ-основе.", asset("/images/catalog/cards/wall-gkl-pvc.webp"), "WINAL™ ГКЛ ПВХ", undefined, "wall_gkl_pvc_modal"),
      child("wall-gkl-polymer", "Стеновые панели WINAL™ ГКЛ Полимер", "Панели на ГКЛ-основе с полимерным покрытием.", asset("/images/catalog/cards/wall-polymer-shared.webp"), "WINAL™ ГКЛ Полимер", undefined, "wall_gkl_polymer_modal"),
    ],
    { contextTitle: "Стеновые панели", contextSubtitle: "Доступная ГКЛ-основа для чистовой отделки." },
  ),
  "family-wall-gsp": family(
    "family-wall-gsp",
    "Стеновые панели на основе ГСП",
    "Панели на прочной ГСП-основе для нагруженных интерьеров с ПВХ- и HPL-покрытием.",
    catalogImages.wallGspHpl,
    [
      child("wall-gsp-pvc", "Стеновые панели WINAL™ ГСП ПВХ", "Доступные панели на ГСП-основе с ПВХ-ламинацией.", asset("/images/catalog/cards/wall-gsp-pvc.webp"), "WINAL™ ГСП ПВХ", undefined, "wall_gsp_pvc_modal"),
      child("wall-gsp-hpl", "Стеновые панели WINAL™ ГСП HPL", "Доступные стеновые панели на ГСП-основе с HPL-покрытием.", catalogImages.wallGspHpl, "WINAL™ ГСП HPL", undefined, "wall_gsp_hpl_modal"),
    ],
    { contextTitle: "Стеновые панели", contextSubtitle: "Прочная ГСП-основа для нагруженных интерьеров." },
  ),
  "family-slat-wall-panels": family(
    "family-slat-wall-panels",
    "Реечные стеновые панели",
    "Декоративные рейки для выразительных стеновых акцентов и архитектурного ритма.",
    asset("/images/catalog/cards/slat-sml-acryl.webp"),
    [
      child(
        "slat-sml-acryl",
        "Реечные панели WINAL™ СМЛ Акрил",
        "Реечные панели на СМЛ-основе с окраской акрилом.",
        asset("/images/catalog/cards/slat-sml-acryl.webp"),
        "СМЛ Акрил",
        undefined,
        "slat_sml_acryl_modal",
      ),
      child(
        "slat-sml-pvc",
        "Реечные панели WINAL™ СМЛ ПВХ",
        "Реечные панели на СМЛ-основе с ПВХ-ламинацией.",
        asset("/images/catalog/cards/slat-sml-pvc.webp"),
        "СМЛ ПВХ",
        undefined,
        "slat_sml_pvc_modal",
      ),
      child(
        "slat-sml-hpl",
        "Реечные панели WINAL™ СМЛ HPL",
        "Реечные панели на СМЛ-основе с HPL-покрытием.",
        asset("/images/catalog/cards/slat-sml-hpl.webp"),
        "СМЛ HPL",
        undefined,
        "slat_sml_hpl_modal",
      ),
    ],
    { contextTitle: "Стеновые панели", contextSubtitle: "Реечные решения для выразительных стеновых акцентов." },
  ),
  "family-ceiling-sml": family(
    "family-ceiling-sml",
    "Потолочные панели на основе СМЛ",
    "Панели на СМЛ-основе для стабильной отделки общественных интерьеров.",
    catalogImages.ceilingSmlFamily,
    [
      child("ceiling-sml-acryl", "Потолочные панели WINAL™ СМЛ Акрил", "Потолочные панели на СМЛ-основе с окраской акрилом.", catalogImages.ceilingSmlAcryl, "WINAL™ СМЛ Акрил", undefined, "ceiling_sml_acryl_modal"),
      child("ceiling-sml-pvc", "Потолочные панели WINAL™ СМЛ ПВХ", "Потолочные панели на СМЛ-основе с ПВХ-покрытием.", catalogImages.ceilingSmlPvc, "WINAL™ СМЛ ПВХ", undefined, "ceiling_sml_pvc_modal"),
    ],
    { contextTitle: "Потолочные панели", contextSubtitle: "СМЛ-основа для стабильной отделки общественных интерьеров." },
  ),
  "family-ceiling-gypsum": family(
    "family-ceiling-gypsum",
    "Потолочные панели на основе ГКЛ",
    "Панели на ГКЛ-основе для аккуратной чистовой отделки.",
    catalogImages.ceilingGklFamily,
    [
      child("ceiling-gkl-acryl", "Потолочные панели WINAL™ ГКЛ Акрил", "Потолочные панели на ГКЛ-основе с окраской акрилом.", catalogImages.ceilingGklAcryl, "WINAL™ ГКЛ Акрил", undefined, "ceiling_gkl_acryl_modal"),
      child("ceiling-gkl-pvc", "Потолочные панели WINAL™ ГКЛ ПВХ", "Потолочные панели на ГКЛ-основе с ПВХ-покрытием.", catalogImages.ceilingGklPvc, "WINAL™ ГКЛ ПВХ", undefined, "ceiling_gkl_pvc_modal"),
    ],
    { contextTitle: "Потолочные панели", contextSubtitle: "ГКЛ-основа для аккуратной чистовой отделки." },
  ),
  "family-invisible": family(
    "family-invisible",
    "Двери WINAL™ INVISIBLE",
    "Скрытые интерьерные двери для цельной стеновой плоскости и точной интеграции в отделку.",
    dealerCatalogImageAssets.cardInvisible,
    [
      child("invisible-basic", "Двери WINAL™ Invisible Basic", "Скрытая интерьерная дверь для интеграции в панельную отделку.", catalogImages.invisibleBasic, "Двери Basic", "left center", "invisible_basic_modal"),
      child("invisible-reverse", "Двери WINAL™ Invisible Basic Reverse", "Скрытая дверь обратного открывания для цельного интерьерного контура.", catalogImages.invisibleReverse, "Двери Basic Reverse", undefined, "invisible_basic_reverse_modal"),
      child("invisible-clean", "Двери WINAL™ Invisible Clean", "Скрытая дверь для помещений с требованиями к чистоте отделки.", catalogImages.invisibleClean, "Двери Clean", "65% center", "invisible_clean_modal"),
    ],
    { contextTitle: "Скрытые двери", contextSubtitle: "Интеграция дверного полотна в цельную стеновую плоскость." },
  ),
  "family-profiles": {
    id: "family-profiles",
    title: "Профили WINAL™",
    description: "Монтажные, угловые и световые профили для стыков, торцов и углов стеновых систем.",
    image: dealerCatalogImageAssets.cardProfiles,
    action: "profiles_hub_modal",
    contextTitle: "Профильные системы",
    contextSubtitle: "22 профиля с подбором по узлу: стык, торец, угол, свет.",
  },
  "family-plinths": family(
    "family-plinths",
    "Плинтусы WINAL™",
    "Плинтусы для чистого завершения стеновых поверхностей и инженерных примыканий.",
    dealerCatalogImageAssets.cardPlinths,
    [
      child("plinth-strong-base", "Плинтус WINAL™ Strong Base", "Плинтус для стеновых панелей и завершения примыкания к полу.", catalogImages.plinthStrongBase, "Strong Base", undefined, "strong_base_wnl_modal"),
      child("plinth-crystal-base", "Плинтус WINAL™ Crystal Base WNL", "Декоративный плинтус для завершения стеновых панелей.", catalogImages.plinthCrystalBase, "Crystal Base WNL", undefined, "crystal_base_wnl_modal"),
      child("plinth-hidden", "Алюминиевый скрытый плинтус WINAL™", "Скрытый плинтус для теневого примыкания стены и пола.", catalogImages.plinthHidden, "Скрытый плинтус", "center 56%", "hidden_aluminum_baseboard_modal"),
      child("plinth-mini-base", "Плинтус WINAL™ Mini Base", "Алюминиевый плинтус с ножкой для панелей 10 мм, типоразмеры QBTU 10/10 и QBTU 20/10.", catalogImages.plinthMiniBase, "Mini Base", undefined, "mini_base_modal"),
    ],
    { contextTitle: "Плинтусы", contextSubtitle: "Чистое завершение стеновых поверхностей и примыканий." },
  ),
  "family-radiator-screens": family(
    "family-radiator-screens",
    "Экраны радиаторов WINAL™",
    "Решения для оформления инженерных зон в едином стиле с интерьером.",
    catalogImages.radiatorWindowSill,
    [
      child("radiator-screen-window-sill", "Экран радиатора WINAL™ СМЛ с подоконником", "Экран с подоконником для аккуратного оформления инженерной зоны.", catalogImages.radiatorWindowSill, "С подоконником", undefined, "radiator_screen_sill_modal"),
      child("radiator-screen-box", "Экран радиатора WINAL™ СМЛ тип короб", "Короб для закрытия радиатора и ровной стеновой линии.", catalogImages.radiatorBox, "Тип короб", undefined, "radiator_screen_box_modal"),
      child("radiator-screen-overlay", "Экран радиатора WINAL™ СМЛ накладной", "Накладной экран для цельного оформления радиатора.", catalogImages.radiatorOverlay, "Накладной", undefined, "radiator_screen_overlay_modal"),
    ],
    { contextTitle: "Экраны радиаторов", contextSubtitle: "Оформление инженерных зон в едином стиле с интерьером." },
  ),
  "rhythm-wall": { id: "rhythm-wall", title: "WINAL™ RythmWall", description: "Алюминиевые рельефные панели, формирующие архитектурный ритм, объём и игру света.", image: catalogImages.rhythm, action: "rythmwall_modal", contextTitle: "Стеновые панели", contextSubtitle: "Алюминиевая рельефная поверхность для архитектурного ритма." },
  minwin: {
    id: "minwin",
    title: "WINAL™ MinWin",
    description: "Минеральные панели нового поколения для стабильных и влагостойких интерьерных поверхностей.",
    image: catalogImages.minwin,
    action: "minwin_modal",
    contextTitle: "Стеновые и потолочные панели",
    contextSubtitle: "Минеральная основа с высокой пожаростойкостью и влагостойкостью.",
  },
  "radius-solutions": { id: "radius-solutions", title: "Радиусные решения WINAL™", description: "Изогнутые и нестандартные стеновые поверхности на совместимых панелях и декорах.", image: catalogImages.radius, action: "radius_solutions_modal", contextTitle: "Индивидуальные решения", contextSubtitle: "Радиусные поверхности для нестандартной архитектуры." },
  "cloud-w": { id: "cloud-w", title: "WINAL™ Cloud System W", description: "Стеновые акустические панели на минеральном волокне и стеклохолсте.", image: dealerCatalogImageAssets.cardCloudSystemW, action: "cloud_w_modal", contextTitle: "Акустические панели", contextSubtitle: "Стеновые решения на минеральном волокне и стеклохолсте." },
  "soundcore-14": { id: "soundcore-14", title: "WINAL™ Soundcore 14", description: "Акустические панели из древесного волокна и цемента для потолочных решений.", image: catalogImages.soundcore14, action: "soundcore_14_modal", contextTitle: "Акустические панели", contextSubtitle: "Потолочные решения из древесного волокна и цемента." },
  "soundcore-25": { id: "soundcore-25", title: "WINAL™ Soundcore 25", description: "Акустические панели из древесного волокна для стен общественных пространств.", image: catalogImages.soundcore25, action: "soundcore_25_modal", objectPosition: "right center", contextTitle: "Акустические панели", contextSubtitle: "Стеновые акустические панели из древесного волокна." },
  "urban-w": { id: "urban-w", title: "WINAL™ Urban W", description: "Металлические стеновые панели с минеральным звукопоглощающим наполнителем.", image: dealerCatalogImageAssets.cardUrban, action: "urban_w_modal", contextTitle: "Акустические панели", contextSubtitle: "Металлические стеновые решения с минеральным наполнителем." },
  "urban-c": { id: "urban-c", title: "WINAL™ Urban C", description: "Металлические потолочные панели с минеральным звукопоглощающим наполнителем.", image: catalogImages.urbanC, action: "urban_c_modal", contextTitle: "Акустические панели", contextSubtitle: "Металлические потолочные решения с минеральным наполнителем." },
  wallpro: { id: "wallpro", title: "WINAL™ WallPro", description: "Готовые каркасные перегородки на СМЛ и ГКЛ для звукоизоляции помещений: Rw 58–64 дБ, сухая сборка, декоры поверхности.", image: dealerCatalogImageAssets.cardWallPro, action: "wallpro_modal", contextTitle: "Каркасные перегородки", contextSubtitle: "Звукоизоляция помещений и сухая сборка." },
  "winal-isol": { id: "winal-isol", title: "WINAL™ Isol", description: "Звукоизоляционный наполнитель из минерального волокна для каркасных перегородок и облицовок.", image: catalogImages.winisol, action: "winisol_modal", contextTitle: "Звукоизоляционный наполнитель", contextSubtitle: "Минеральное волокно, плиты 50, 75 и 100 мм." },
  ufr: { id: "ufr", title: "UFR-печать на панелях и профилях", description: "Индивидуальная графика, навигация и декор на панелях и профилях открытого крепления.", image: catalogImages.ufr, action: "ufr_print_modal", contextTitle: "UFR печать", contextSubtitle: "Графика, навигация и декор на совместимых поверхностях." },
};

/** Per-tab context labels for products that appear in multiple catalog sections. */
const catalogContextByTab: Record<string, Partial<Record<DealerCatalogTabId, CatalogContext>>> = {
  "family-wisound": {
    acoustic: {
      contextTitle: "Акустические панели",
      contextSubtitle: "Перфорированные решения для стен и потолков.",
    },
    ceiling: {
      contextTitle: "Потолочные акустические панели",
      contextSubtitle: "Перфорированные решения для потолков.",
    },
  },
  "family-cloud-system": {
    ceiling: {
      contextTitle: "Потолочные акустические системы",
      contextSubtitle: "Панели, баффлы и острова для потолков.",
    },
  },
  "soundcore-14": {
    ceiling: {
      contextTitle: "Потолочные акустические панели",
      contextSubtitle: "Из древесного волокна и цемента.",
    },
  },
  "urban-c": {
    ceiling: {
      contextTitle: "Потолочные акустические панели",
      contextSubtitle: "Металлические решения с минеральным наполнителем.",
    },
  },
};

function projectForTab(tabId: DealerCatalogTabId, ...ids: string[]): DealerCatalogProduct[] {
  return ids.map((id) => {
    const product = products[id];
    const context = catalogContextByTab[id]?.[tabId];
    return context ? { ...product, ...context } : product;
  });
}

export const dealerCatalogProductsByTab: Record<DealerCatalogTabId, DealerCatalogProduct[]> = {
  acoustic: projectForTab("acoustic", "family-wisound", "family-cloud-system", "family-soundcore", "family-urban", "ufr"),
  wall: projectForTab("wall", "family-wall-sml", "family-wall-gkl", "family-wall-gsp", "minwin", "radius-solutions", "rhythm-wall", "family-slat-wall-panels", "family-wisound", "cloud-w", "soundcore-25", "urban-w", "ufr"),
  ceiling: projectForTab("ceiling", "family-ceiling-sml", "family-ceiling-gypsum", "family-wisound", "family-cloud-system", "soundcore-14", "urban-c"),
  system: projectForTab("system", "wallpro", "winal-isol", "family-invisible", "family-profiles", "family-plinths", "family-radiator-screens", "radius-solutions"),
};

export function isDealerCatalogModalAction(action: DealerCatalogAction | undefined): boolean {
  return typeof action === "string" && action.endsWith("_modal");
}

export type DealerCatalogEntry = {
  id: string;
  title: string;
  image: string;
  action: DealerCatalogAction;
};

export function getCatalogEntryById(id: string): DealerCatalogEntry | null {
  const product = products[id];
  if (product) {
    return { id: product.id, title: product.title, image: product.image, action: product.action };
  }

  for (const item of Object.values(products)) {
    const child = item.children?.find((entry) => entry.id === id);
    if (child) {
      return {
        id: child.id,
        title: child.title,
        image: child.image,
        action: child.action ?? "disabled",
      };
    }
  }

  return null;
}
