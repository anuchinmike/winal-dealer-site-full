import { asset } from "@/lib/asset";
export type WallAcrylCoatingSwatch = {
  id: string;
  image: string;
  label: string;
};

export type WallAcrylCoatingGroup = {
  chip: string;
  swatches: WallAcrylCoatingSwatch[];
};

const COATINGS = asset("/images/product-modal/wall-sml-acryl/coatings");

export const wallAcrylCoatingGroups = [
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
] satisfies WallAcrylCoatingGroup[];

export function withCoatingChips(
  groups: readonly WallAcrylCoatingGroup[],
  chips: readonly [string, string, string],
): WallAcrylCoatingGroup[] {
  return groups.map((group, index) => ({
    chip: chips[index],
    swatches: group.swatches,
  }));
}

export const wallPolymerCoatingGroups = withCoatingChips(wallAcrylCoatingGroups, [
  "Полимер 3D",
  "Полимер дерево",
  "Полимер бетон",
]);
