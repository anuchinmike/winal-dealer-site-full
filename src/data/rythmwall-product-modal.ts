export type RythmWallModelCode = "C001" | "C021" | "C022" | "B005" | "B039" | "B054";

export type RythmWallSeries = "C" | "B";

export type RythmWallModel = {
  code: RythmWallModelCode;
  series: RythmWallSeries;
  image: string;
  interiorImage: string;
  material: string;
  dimensions: string;
  thickness: string;
  weight: string;
  finish: string;
};

export type RythmWallFeature = {
  icon: string;
  title: string;
  description: string;
};

const BASE = "/images/product-modal/rythmwall";

export const RYTHMWALL_PRODUCT_MODAL_ID = "rythmwall-product-modal";

export const RYTHMWALL_DEFAULT_MODEL: RythmWallModelCode = "C001";

export const rythmWallModalAssets = {
  heroInterior: `${BASE}/hero-interior.webp`,
  ralChart: `${BASE}/ral-chart.webp`,
  closeIcon: `${BASE}/icon-close.webp`,
  arrows: {
    white: `${BASE}/arrow-white.svg`,
    blue: `${BASE}/arrow-blue.svg`,
  },
} as const;

export const rythmWallHeroFeatures: RythmWallFeature[] = [
  {
    icon: `${BASE}/icon-rhythm.svg`,
    title: "Идеальный ритм",
    description: "Алюминиевые гофрированные панели могут быть выполнены в разных формах и декорах",
  },
  {
    icon: `${BASE}/icon-eco.svg`,
    title: "Экологичность",
    description: "Экологически чистые материалы безопасны для здоровья",
  },
];

export const rythmWallExtraFeatures: RythmWallFeature[] = [
  {
    icon: `${BASE}/icon-radius.svg`,
    title: "Радиусные решения",
    description: "Возможность создания изогнутых и нестандартных форм",
  },
  {
    icon: "/images/product-modal/icons/winal-flame.svg",
    title: "Пожарная безопасность",
    description: "Негорючие или трудногорючие панели, соответствующие всем нормам",
  },
  {
    icon: `${BASE}/icon-moisture.svg`,
    title: "Влагостойкость",
    description: "Устойчивы к воздействию влаги подходят для любых помещений",
  },
  {
    icon: `${BASE}/icon-install.svg`,
    title: "Простота монтажа",
    description: "Быстрая укладка без технологических зазоров, крепление на клей снижает затраты",
  },
];

// Specs source: products/product-rhythm-wall/product-rhythm-wall.md (Модели И Характеристики).
// B039 weight: canonical 1,230 кг/пм (site); PDF 0,230 ignored.
export const rythmWallModels: RythmWallModel[] = [
  {
    code: "C001",
    series: "C",
    image: `${BASE}/model-c001.webp`,
    interiorImage: `${BASE}/interior-c001-v16.webp`,
    material: "Алюминий",
    dimensions: "137 × 18,9 × 2800 мм",
    thickness: "0,9 мм",
    weight: "0,711 кг/пм",
    finish: "порошковая окраска RAL",
  },
  {
    code: "C021",
    series: "C",
    image: `${BASE}/model-c021.webp`,
    interiorImage: `${BASE}/interior-c021-v16.webp`,
    material: "Алюминий",
    dimensions: "127,5 × 11 × 2800 мм",
    thickness: "1,0 мм",
    weight: "0,59 кг/пм",
    finish: "порошковая окраска RAL",
  },
  {
    code: "C022",
    series: "C",
    image: `${BASE}/model-c022.webp`,
    interiorImage: `${BASE}/interior-c022-v16.webp`,
    material: "Алюминий",
    dimensions: "134 × 9,7 × 2800 мм",
    thickness: "1,0 мм",
    weight: "0,545 кг/пм",
    finish: "порошковая окраска RAL или ПВХ",
  },
  {
    code: "B005",
    series: "B",
    image: `${BASE}/model-b005.webp`,
    interiorImage: `${BASE}/interior-b005-v16.webp`,
    material: "Алюминий",
    dimensions: "151 × 10,9 × 2800 мм",
    thickness: "1,0 мм",
    weight: "0,534 кг/пм",
    finish: "порошковая окраска RAL",
  },
  {
    code: "B039",
    series: "B",
    image: `${BASE}/model-b039.webp`,
    interiorImage: `${BASE}/interior-b039-v16.webp`,
    material: "Алюминий",
    dimensions: "155,86 × 10,4 × 2800 мм",
    thickness: "1,2 мм",
    weight: "1,230 кг/пм",
    finish: "порошковая окраска RAL",
  },
  {
    code: "B054",
    series: "B",
    image: `${BASE}/model-b054.webp`,
    interiorImage: `${BASE}/interior-b054-v16.webp`,
    material: "Алюминий",
    dimensions: "198 × 33,9 × 2800 мм",
    thickness: "1,2 мм",
    weight: "1,129 кг/пм",
    finish: "порошковая окраска RAL",
  },
];

export const rythmWallProductModal = {
  categoryLabel: "СТЕНОВЫЕ ПАНЕЛИ",
  title: "WINAL™ RythmWall",
  description:
    "Алюминиевые рельефные панели, которые добавляют стене архитектурный ритм, объем и игру света. Серия C подходит для строгой графичной поверхности, серия B — для выразительной волны и сильного акцента.",
  seriesC: {
    label: "Серия С",
    description:
      "Элегантные решения прямоугольной формы для различных дизайнерских задач. Возможно исполнение в окраске или пленке ПВХ",
  },
  seriesB: {
    label: "Серия B",
    description: "Эксклюзивные окрашенные панели волнообразной формы",
  },
  thumbnailHint: "Нажмите на модель, чтобы увидеть её в интерьере и характеристики",
  specsTitle: "Характеристики",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
} as const;

export function getRythmWallModel(code: RythmWallModelCode): RythmWallModel {
  const model = rythmWallModels.find((item) => item.code === code);

  if (!model) {
    return rythmWallModels[0];
  }

  return model;
}

export function getRythmWallModelsBySeries(series: RythmWallSeries): RythmWallModel[] {
  return rythmWallModels.filter((model) => model.series === series);
}
