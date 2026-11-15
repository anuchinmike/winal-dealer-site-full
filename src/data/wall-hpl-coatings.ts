export type WallHplCoatingSwatch = {
  id: string;
  image: string;
  label: string;
};

export type WallHplCoatingGroup = {
  chip: string;
  swatches: WallHplCoatingSwatch[];
};

const BASE = "/images/product-modal/wall-hpl-shared/coatings";

export const wallHplCoatingGroups = [
  {
    chip: "HPL деревянные",
    swatches: [
      { id: "dub-arkona-lm-0684-1", image: `${BASE}/wood/dub-arkona-lm-0684-1.webp`, label: "Дуб аркона LM-0684" },
      { id: "dub-artizan-lm-0679-1", image: `${BASE}/wood/dub-artizan-lm-0679-1.webp`, label: "Дуб артизан LM-0679" },
      { id: "dub-chester-lm-0622-1", image: `${BASE}/wood/dub-chester-lm-0622-1.webp`, label: "Дуб честер LM-0622" },
      { id: "dub-dimchati-lm-0661-1", image: `${BASE}/wood/dub-dimchati-lm-0661-1.webp`, label: "Дуб дымчатый LM-0661" },
      { id: "dub-esperanza-lm-0666-1", image: `${BASE}/wood/dub-esperanza-lm-0666-1.webp`, label: "Дуб Эсперанза LM-0666" },
      { id: "dub-kasl-lm-0672-1", image: `${BASE}/wood/dub-kasl-lm-0672-1.webp`, label: "Дуб Касл LM-0672" },
      { id: "dub-lion-lm-0608-1", image: `${BASE}/wood/dub-lion-lm-0608-1.webp`, label: "Дуб Лион LM-0608" },
      { id: "dub-natural-lm-0637-1", image: `${BASE}/wood/dub-natural-lm-0637-1.webp`, label: "Дуб Натурал LM-0637" },
      { id: "dub-pallada-lm-0623-1", image: `${BASE}/wood/dub-pallada-lm-0623-1.webp`, label: "Дуб Паллада LM-0623" },
      { id: "dub-shamoni-lm-0627-1", image: `${BASE}/wood/dub-shamoni-lm-0627-1.webp`, label: "Дуб Шамони LM-0627" },
      { id: "dub-venge-lm-0603-1", image: `${BASE}/wood/dub-venge-lm-0603-1.webp`, label: "Дуб Венге LM-0603" },
      { id: "dub-vengerski-beli-lm-0675-1", image: `${BASE}/wood/dub-vengerski-beli-lm-0675-1.webp`, label: "Дуб венгерский белый LM-0675" },
      { id: "dub-votan-lm-0686-1", image: `${BASE}/wood/dub-votan-lm-0686-1.webp`, label: "Дуб Вотан LM-0686" },
      { id: "dub-zolotoi-lm-0673-1", image: `${BASE}/wood/dub-zolotoi-lm-0673-1.webp`, label: "Дуб Золотой LM-0673" },
      { id: "equador-lm-0664-1", image: `${BASE}/wood/equador-lm-0664-1.webp`, label: "Эквадор LM-0664" },
      { id: "indiiski-shisham-lm-0617-1", image: `${BASE}/wood/indiiski-shisham-lm-0617-1.webp`, label: "Индийский Шишам LM-0617" },
      { id: "italianski-oreh-lm-0656-1", image: `${BASE}/wood/italianski-oreh-lm-0656-1.webp`, label: "Итальянский Орех LM-0656" },
      { id: "klen-kanyon-krupnolistni-1", image: `${BASE}/wood/klen-kanyon-krupnolistni-1.webp`, label: "Клен Каньон крупнолистный" },
      { id: "klen-vankuver-lm-0602-1", image: `${BASE}/wood/klen-vankuver-lm-0602-1.webp`, label: "Клен Ванкувер LM-0602" },
      { id: "provans-lm-0641-1", image: `${BASE}/wood/provans-lm-0641-1.webp`, label: "Прованс LM-0641" },
      { id: "sanoma-lm-0665-1", image: `${BASE}/wood/sanoma-lm-0665-1.webp`, label: "Санома LM-0665" },
      { id: "seri-dub-lm-0674-1", image: `${BASE}/wood/seri-dub-lm-0674-1.webp`, label: "Серый Дуб LM-0674" },
      { id: "slavyanski-dub-lm-0633-1", image: `${BASE}/wood/slavyanski-dub-lm-0633-1.webp`, label: "Славянский дуб LM-0633" },
      { id: "sosna-zimnaa-lm-0676-1", image: `${BASE}/wood/sosna-zimnaa-lm-0676-1.webp`, label: "Сосна зимняя LM-0676" },
    ],
  },
  {
    chip: "HPL каменные",
    swatches: [
      { id: "bela-avrora-lm-0438-1", image: `${BASE}/stone/bela-avrora-lm-0438-1.webp`, label: "Бела Аврора LM-0438" },
      { id: "beli-mramor-lm-0453-1", image: `${BASE}/stone/beli-mramor-lm-0453-1.webp`, label: "Белый Мрамор LM-0453" },
      { id: "beli-parfir-lm-0429-1", image: `${BASE}/stone/beli-parfir-lm-0429-1.webp`, label: "Белый Парфир LM-0429" },
      { id: "boston-svetli-lm-0437-1", image: `${BASE}/stone/boston-svetli-lm-0437-1.webp`, label: "Бостон светлый LM-0437" },
      { id: "boston-temni-lm-0436-1", image: `${BASE}/stone/boston-temni-lm-0436-1.webp`, label: "Бостон темный LM-0436" },
      { id: "cherni-selen-lm-0432-1", image: `${BASE}/stone/cherni-selen-lm-0432-1.webp`, label: "Черный селен LM-0432" },
      { id: "evora-bej-lm-0403-1", image: `${BASE}/stone/evora-bej-lm-0403-1.webp`, label: "Эвора беж LM-0403" },
      { id: "evora-seraia-lm-0402-1", image: `${BASE}/stone/evora-seraia-lm-0402-1.webp`, label: "Эвора серая LM-0402" },
      { id: "granit-sardinski-lm-0401-1", image: `${BASE}/stone/granit-sardinski-lm-0401-1.webp`, label: "Гранит сардинский LM-0401" },
      { id: "imperial-seri-lm-0447-1", image: `${BASE}/stone/imperial-seri-lm-0447-1.webp`, label: "Империал серый LM-0447" },
      { id: "lm-0441-1", image: `${BASE}/stone/lm-0441-1.webp`, label: "LM-0441" },
      { id: "lm-0443-1", image: `${BASE}/stone/lm-0443-1.webp`, label: "LM-0443" },
      { id: "lm-0455-1", image: `${BASE}/stone/lm-0455-1.webp`, label: "LM-0455" },
      { id: "mramor-grey-temni-lm-0434-1", image: `${BASE}/stone/mramor-grey-temni-lm-0434-1.webp`, label: "Мрамор грей темный LM-0434" },
      { id: "nightstone-lm-0440-1", image: `${BASE}/stone/nightstone-lm-0440-1.webp`, label: "Найтстоун LM-0440" },
      { id: "rustika-lm-0409-1", image: `${BASE}/stone/rustika-lm-0409-1.webp`, label: "Рустика LM-0409" },
      { id: "sahara-lm-0411-1", image: `${BASE}/stone/sahara-lm-0411-1.webp`, label: "Сахара LM-0411" },
      { id: "seri-mramor-lm-0454-1", image: `${BASE}/stone/seri-mramor-lm-0454-1.webp`, label: "Серый мрамор LM-0454" },
      { id: "skorpio-lm-0439-1", image: `${BASE}/stone/skorpio-lm-0439-1.webp`, label: "Скорпио LM-0439" },
      { id: "stukko-bejevi-lm-0445-1", image: `${BASE}/stone/stukko-bejevi-lm-0445-1.webp`, label: "Стукко бежевый LM-0445" },
      { id: "stukko-beli-lm-0446-1", image: `${BASE}/stone/stukko-beli-lm-0446-1.webp`, label: "Стукко белый LM-0446" },
      { id: "travertin-capuccino-lm-0406-1", image: `${BASE}/stone/travertin-capuccino-lm-0406-1.webp`, label: "Травертин капучино LM-0406" },
      { id: "travertin-dimchati-lm-0407-1", image: `${BASE}/stone/travertin-dimchati-lm-0407-1.webp`, label: "Травертин дымчатый LM-0407" },
      { id: "urban-lm-0415-1", image: `${BASE}/stone/urban-lm-0415-1.webp`, label: "Урбан LM-0415" },
      { id: "urban-seri-lm-0416-1", image: `${BASE}/stone/urban-seri-lm-0416-1.webp`, label: "Урбан серый LM-0416" },
    ],
  },
  {
    chip: "HPL металл",
    swatches: [
      { id: "alumini-lm-1001-1", image: `${BASE}/metal/alumini-lm-1001-1.webp`, label: "Алюминий LM-1001" },
      { id: "titan-lm-1002-1", image: `${BASE}/metal/titan-lm-1002-1.webp`, label: "Титан LM-1002" },
      { id: "lm-1003-1", image: `${BASE}/metal/lm-1003-1.webp`, label: "LM-1003" },
    ],
  },
] satisfies WallHplCoatingGroup[];

