import { asset } from "@/lib/asset";
export type WallPvcCoatingSwatch = {
  id: string;
  image: string;
  label: string;
};

export type WallPvcCoatingGroup = {
  chip: string;
  swatches: WallPvcCoatingSwatch[];
};

const BASE = asset("/images/product-modal/wall-pvc-shared/coatings");

export const wallPvcCoatingGroups = [
  {
    chip: "ПВХ фактурные",
    swatches: [
      { id: "m1", image: `${BASE}/textured/m1.webp`, label: "Мрамор" },
      { id: "m3", image: `${BASE}/textured/m3.webp`, label: "Мрамор" },
      { id: "m2", image: `${BASE}/textured/m2.webp`, label: "Мрамор" },
      { id: "silver-titan", image: `${BASE}/textured/silver-titan.webp`, label: "Silver Titan" },
      { id: "bronze-titan", image: `${BASE}/textured/bronze-titan.webp`, label: "Bronze Titan" },
      { id: "len-seri", image: `${BASE}/textured/len-seri.webp`, label: "Лен серый" },
      { id: "len-molochni", image: `${BASE}/textured/len-molochni.webp`, label: "Лен Молочный" },
      { id: "len-bejevi", image: `${BASE}/textured/len-bejevi.webp`, label: "Лен бежевый" },
      { id: "bronze-sand", image: `${BASE}/textured/bronze-sand.webp`, label: "Bronze Sand" },
      { id: "silver-sand", image: `${BASE}/textured/silver-sand.webp`, label: "Silver Sand" },
      { id: "photo1677325126-1", image: `${BASE}/textured/photo1677325126-1.webp`, label: "Дуб Скандинавский" },
      { id: "47a8d4e195965cc559d86284cbb51498-scaled-1-e1706223575205", image: `${BASE}/textured/47a8d4e195965cc559d86284cbb51498-scaled-1-e1706223575205.webp`, label: "Карамельный Латте" },
      { id: "bari_bejevi-1", image: `${BASE}/textured/bari_bejevi-1.webp`, label: "Бари бежевый" },
      { id: "beton_chicago_bej-1", image: `${BASE}/textured/beton_chicago_bej-1.webp`, label: "Бетон Чикаго" },
      { id: "beton-7037-1", image: `${BASE}/textured/beton-7037-1.webp`, label: "Бетон 7037" },
      { id: "pvh-beton-7038", image: `${BASE}/textured/pvh-beton-7038.webp`, label: "Бетон 7038" },
      { id: "pvh-beton-beli", image: `${BASE}/textured/pvh-beton-beli.webp`, label: "Бетон белый" },
      { id: "dub_bomond_loft-1", image: `${BASE}/textured/dub_bomond_loft-1.webp`, label: "Дуб бомонд лофт" },
      { id: "dub_filadelfia_grey-1", image: `${BASE}/textured/dub_filadelfia_grey-1.webp`, label: "Дуб Филадельфия грей" },
      { id: "dub_filadelfia_koniak-1", image: `${BASE}/textured/dub_filadelfia_koniak-1.webp`, label: "Дуб Филадельфия коньяк" },
      { id: "dub_natural-1", image: `${BASE}/textured/dub_natural-1.webp`, label: "Дуб натуральный" },
      { id: "dub_seriy_914-1", image: `${BASE}/textured/dub_seriy_914-1.webp`, label: "Дуб серый 914" },
      { id: "dub_tangent_natur-1", image: `${BASE}/textured/dub_tangent_natur-1.webp`, label: "Дуб Тангент натур" },
      { id: "dub-zolotoy-pvh", image: `${BASE}/textured/dub-zolotoy-pvh.webp`, label: "Дуб Золотой" },
      { id: "img_8123", image: `${BASE}/textured/img_8123.webp`, label: "Сандал белый" },
      { id: "larche_capuchino-1", image: `${BASE}/textured/larche_capuchino-1.webp`, label: "Ларче Капучино" },
      { id: "listvenniza_seraya_903-1", image: `${BASE}/textured/listvenniza_seraya_903-1.webp`, label: "Лиственница серая 903" },
      { id: "llistvenniza_capuccino_902-1", image: `${BASE}/textured/llistvenniza_capuccino_902-1.webp`, label: "Лиственница капучино 902" },
      { id: "llistvenniza_krem_901-1", image: `${BASE}/textured/llistvenniza_krem_901-1.webp`, label: "Лиственница крем 901" },
      { id: "loft-belyy-pvh", image: `${BASE}/textured/loft-belyy-pvh.webp`, label: "Лофт белый" },
      { id: "loft_capuccino-1", image: `${BASE}/textured/loft_capuccino-1.webp`, label: "Лофт капучино" },
      { id: "loft_cherni-1", image: `${BASE}/textured/loft_cherni-1.webp`, label: "Лофт черный" },
      { id: "loft_grafit-1", image: `${BASE}/textured/loft_grafit-1.webp`, label: "Лофт графит" },
      { id: "loft_grey-1", image: `${BASE}/textured/loft_grey-1.webp`, label: "Лофт грей" },
      { id: "loft_vanil-1", image: `${BASE}/textured/loft_vanil-1.webp`, label: "Лофт ваниль" },
      { id: "orex_132-1", image: `${BASE}/textured/orex_132-1.webp`, label: "Орех 132" },
      { id: "orex_american_classic-1", image: `${BASE}/textured/orex_american_classic-1.webp`, label: "Орех Американ классик" },
      { id: "orex_american_mocco-1", image: `${BASE}/textured/orex_american_mocco-1.webp`, label: "Орех Американ мокко" },
      { id: "orex_amerikan_dimchati-1", image: `${BASE}/textured/orex_amerikan_dimchati-1.webp`, label: "Орех Американ дымчатый" },
      { id: "orex_kantri_904-1", image: `${BASE}/textured/orex_kantri_904-1.webp`, label: "Орех кантри 904" },
      { id: "padena-1-1", image: `${BASE}/textured/padena-1-1.webp`, label: "Падена" },
      { id: "photo1677325669-1", image: `${BASE}/textured/photo1677325669-1.webp`, label: "Bianco Латте" },
      { id: "photo16773251262-1", image: `${BASE}/textured/photo16773251262-1.webp`, label: "Орех Пекан" },
      { id: "photo16773251265", image: `${BASE}/textured/photo16773251265.webp`, label: "Ель жемчужно-серая" },
      { id: "yasen_riviera_ais-1", image: `${BASE}/textured/yasen_riviera_ais-1.webp`, label: "Ясень Ривьера айс" },
      { id: "yasen_riviera_grey-1", image: `${BASE}/textured/yasen_riviera_grey-1.webp`, label: "Ясень ривьера грей" },
      { id: "yasen_riviera_krem-1", image: `${BASE}/textured/yasen_riviera_krem-1.webp`, label: "Ясень ривьера крем" },
      { id: "yasen_riviera_mokko-1", image: `${BASE}/textured/yasen_riviera_mokko-1.webp`, label: "Ясень ривьера мокко" },
      { id: "yasen_svetli-1", image: `${BASE}/textured/yasen_svetli-1.webp`, label: "Ясень светлый" },
      { id: "yasen-zolotoy-pvh-1", image: `${BASE}/textured/yasen-zolotoy-pvh-1.webp`, label: "Ясень золотой" },
      { id: "img_8216-scaled-e1742574118353", image: `${BASE}/textured/img_8216-scaled-e1742574118353.webp`, label: "Дуб Английский WNL-623" },
    ],
  },
  {
    chip: "ПВХ однотонные",
    swatches: [
      { id: "ral-1013-6-1", image: `${BASE}/solids/ral-1013-6-1.webp`, label: "RAL-1013" },
      { id: "ral-1015-6-1", image: `${BASE}/solids/ral-1015-6-1.webp`, label: "RAL-1015" },
      { id: "ral-1021-1", image: `${BASE}/solids/ral-1021-1.webp`, label: "RAL-1021" },
      { id: "pvh-ral-5010", image: `${BASE}/solids/pvh-ral-5010.webp`, label: "RAL-5010" },
      { id: "ral-5024-1", image: `${BASE}/solids/ral-5024-1.webp`, label: "RAL-5024" },
      { id: "ral-6019-6-1", image: `${BASE}/solids/ral-6019-6-1.webp`, label: "RAL-6019" },
      { id: "ral-7005-4-e1652659080491-1", image: `${BASE}/solids/ral-7005-4-e1652659080491-1.webp`, label: "RAL-7005" },
      { id: "ral-7037-4-e1652659250425-1", image: `${BASE}/solids/ral-7037-4-e1652659250425-1.webp`, label: "RAL-7037" },
      { id: "ral-7038-4-e1652659328222-1", image: `${BASE}/solids/ral-7038-4-e1652659328222-1.webp`, label: "RAL-7038" },
      { id: "ral-7047-8-2", image: `${BASE}/solids/ral-7047-8-2.webp`, label: "RAL-7047" },
      { id: "ral-9010-3-e1652659445967-1", image: `${BASE}/solids/ral-9010-3-e1652659445967-1.webp`, label: "RAL-9016" },
      { id: "ral-9010-4-1", image: `${BASE}/solids/ral-9010-4-1.webp`, label: "RAL-9010" },
    ],
  },
] satisfies WallPvcCoatingGroup[];

