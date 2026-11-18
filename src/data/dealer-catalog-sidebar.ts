import { asset } from "@/lib/asset";
const CATALOG_IMAGES = asset("/images/catalog");

export const catalogSidebarAssets = {
  iconNoise: `${CATALOG_IMAGES}/icon-noise.svg`,
  iconComfort: `${CATALOG_IMAGES}/icon-comfort.svg`,
  iconPerforation: `${CATALOG_IMAGES}/icon-perforation.svg`,
  iconBaffles: `${CATALOG_IMAGES}/icon-baffles.svg`,
  iconWallDesign: `${CATALOG_IMAGES}/icon-wall-design.svg`,
  iconWallRhythm: `${CATALOG_IMAGES}/icon-wall-rhythm.svg`,
  iconWallJoints: `${CATALOG_IMAGES}/icon-wall-joints.svg`,
  iconWallDry: `${CATALOG_IMAGES}/icon-wall-drill.svg`,
  iconWallFire: `${CATALOG_IMAGES}/icon-wall-fire.svg`,
  iconCeilingComposition: `${CATALOG_IMAGES}/icon-ceiling-composition.svg`,
  iconCeilingVolume: `${CATALOG_IMAGES}/icon-ceiling-volume.svg`,
  iconCeilingLight: `${CATALOG_IMAGES}/icon-ceiling-light.svg`,
  iconCeilingComfort: `${CATALOG_IMAGES}/icon-ceiling-comfort.svg`,
  iconSystemUnified: `${CATALOG_IMAGES}/icon-system-unified.svg`,
  iconSystemJoints: `${CATALOG_IMAGES}/icon-system-joints.svg`,
  iconSystemDryMount: `${CATALOG_IMAGES}/icon-system-dry-mount.svg`,
  iconSystemConfig: `${CATALOG_IMAGES}/icon-system-config.svg`,
} as const;

export type CatalogSidebarFeature = {
  icon: string;
  label: string;
};

export type CatalogSidebarContent = {
  title: string;
  intro: string;
  features: CatalogSidebarFeature[];
  facts: string[];
};

const acousticSidebarContent: CatalogSidebarContent = {
  title: "Акустические решения для комфортной среды",
  intro:
    "Звукопоглощающие панели, баффлы и острова помогают снижать реверберацию и фоновый шум, повышать разборчивость речи и сохранять архитектурный уровень пространства.",
  features: [
    { icon: catalogSidebarAssets.iconNoise, label: "Снижение шума" },
    { icon: catalogSidebarAssets.iconComfort, label: "Акустический комфорт" },
    { icon: catalogSidebarAssets.iconWallFire, label: "Трудногорючесть" },
    { icon: catalogSidebarAssets.iconWallDesign, label: "Свобода дизайна" },
  ],
  facts: [
    "Комфортная звуковая среда. Звукопоглощающие поверхности помогают сделать помещения спокойнее и комфортнее для общения и сосредоточенной работы.",
    "Акустика под задачу помещения. Формат, расположение и характеристики элементов подбираются с учётом назначения, объёма и акустических требований пространства.",
    "Свобода размещения. Стеновые, потолочные и подвесные решения позволяют работать с акустикой в разных архитектурных сценариях.",
    "Интеграция в интерьер. Цвет, фактура, перфорация и форма помогают включить акустические элементы в визуальную концепцию проекта.",
    "Работа со сложными объёмами. Баффлы и острова позволяют корректировать акустику высоких помещений и пространств с открытыми коммуникациями.",
    "Материалы под условия объекта. Конструкция, отделка, способ монтажа и требования пожарной безопасности уточняются для выбранного продукта и конфигурации.",
  ],
};

const wallSidebarContent: CatalogSidebarContent = {
  title: "Стеновые решения для современных интерьеров",
  intro:
    "Готовые стеновые поверхности объединяют выразительный дизайн, точную геометрию и практичность для коммерческих и общественных интерьеров.",
  features: [
    { icon: catalogSidebarAssets.iconWallDry, label: "Сухая отделка" },
    { icon: catalogSidebarAssets.iconWallFire, label: "Негорючесть" },
    { icon: catalogSidebarAssets.iconWallDesign, label: "Свобода дизайна" },
    { icon: catalogSidebarAssets.iconWallRhythm, label: "Архитектурный ритм" },
    { icon: catalogSidebarAssets.iconWallJoints, label: "Точные стыки" },
  ],
  facts: [
    "Готовая чистовая поверхность. Панельная отделка сокращает количество штукатурных, малярных и других мокрых операций на объекте.",
    "Пожарная и экологическая безопасность. Негорючие и трудногорючие панели подходят для общественных и коммерческих пространств. Все материалы имеют пожарный и гигиенический сертификат.",
    "Свобода визуального решения. Цвет, фактура, рельеф и рисунок поверхности подбираются под архитектурную концепцию.",
    "Выразительная геометрия. Плоские, реечные, объёмные и радиусные элементы помогают формировать ритм и пластику стен.",
    "Аккуратные стыки и примыкания. Готовые панели и монтажные элементы позволяют точнее реализовать узлы отделки.",
    "Стойкость под условия объекта. Основа и покрытие выбираются с учётом нагрузки, влажности и требований к эксплуатации.",
    "Материалы под задачу проекта. Разные сочетания основ и покрытий позволяют согласовать внешний вид поверхности с техническими требованиями.",
  ],
};

const ceilingSidebarContent: CatalogSidebarContent = {
  title: "Потолочные решения для визуального объема и акустики",
  intro:
    "Панели, острова, баффлы и потолочные модули для визуальной задачи, акустики, света и технических требований проекта.",
  features: [
    { icon: catalogSidebarAssets.iconCeilingComposition, label: "Свобода композиции" },
    { icon: catalogSidebarAssets.iconCeilingVolume, label: "Раскрытие объёма" },
    { icon: catalogSidebarAssets.iconCeilingLight, label: "Интеграция света" },
    { icon: catalogSidebarAssets.iconCeilingComfort, label: "Акустический комфорт" },
  ],
  facts: [
    "Сплошные плоскости, острова, баффлы и отдельные модули позволяют работать с масштабом и геометрией пространства.",
    "Работа с объёмом помещения. Подвесные элементы помогают организовать высокие потолки и интерьеры с открытыми коммуникациями.",
    "Акустический комфорт. Подходящие акустические конфигурации помогают снизить реверберацию и сделать среду комфортнее.",
    "Интеграция света и инженерии. Потолочная система позволяет связать отделку с освещением и техническими элементами проекта.",
    "Выразительный визуальный ритм. Формат, расположение, цвет и фактура модулей поддерживают архитектурную концепцию.",
    "Требования под конкретный объект. Конфигурация и материалы подбираются с учётом монтажа, пожарной безопасности и условий эксплуатации.",
  ],
};

const systemSidebarContent: CatalogSidebarContent = {
  title: "Системные решения для комплексной отделки объектов",
  intro:
    "Перегородки, двери, профили, плинтусы и экраны радиаторов помогают собрать отделку объекта как единую техническую и визуальную систему.",
  features: [
    { icon: catalogSidebarAssets.iconSystemUnified, label: "Единая система" },
    { icon: catalogSidebarAssets.iconSystemJoints, label: "Точные узлы" },
    { icon: catalogSidebarAssets.iconWallDry, label: "Сухой монтаж" },
    { icon: catalogSidebarAssets.iconSystemConfig, label: "Гибкая конфигурация" },
    { icon: catalogSidebarAssets.iconWallFire, label: "Огнестойкость" },
  ],
  facts: [
    "Единая логика отделки. Двери, профили и завершающие элементы формируют цельное интерьерное решение.",
    "Сертифицированное решение для возведения перегородок с подтвержденной степенью огнестойкости конструкций с готовой финишной отделкой.",
    "Точная проработка узлов. Системные элементы помогают аккуратно оформить стыки, углы, примыкания и переходы между поверхностями.",
    "Визуальная целостность. Технические детали интегрируются в интерьер, не разрушая его архитектурную концепцию.",
    "Сухой и чистый монтаж. Готовые элементы сокращают количество мокрых процессов и операций непосредственно на объекте.",
    "Характеристики под проект. Конструкции подбираются с учётом требований к звукоизоляции, огнестойкости и условиям эксплуатации.",
    "Функции внутри отделки. Свет, защита поверхностей и инженерные элементы становятся частью общего решения.",
    "Меньше разрозненных решений. Связанный набор элементов упрощает проектирование и согласование ключевых узлов.",
  ],
};

export const catalogSidebarByTab: Record<string, CatalogSidebarContent> = {
  acoustic: acousticSidebarContent,
  wall: wallSidebarContent,
  system: systemSidebarContent,
  ceiling: ceilingSidebarContent,
};

export function getCatalogSidebarContent(tabId: string): CatalogSidebarContent {
  return catalogSidebarByTab[tabId] ?? acousticSidebarContent;
}
