import { asset } from "@/lib/asset";
export type MinWinFeature = {
  icon: string;
  title: string;
  description: string;
};

export type MinWinComparisonColumn = "gkl" | "sml" | "dvp" | "minwin";

export type MinWinComparisonRow = {
  label: string;
  values: Record<MinWinComparisonColumn, string>;
};

export type MinWinCoating = {
  label: string;
  image: string;
};

const BASE = asset("/images/product-modal/minwin");

export const MINWIN_PRODUCT_MODAL_ID = "minwin-product-modal";

export const minwinModalAssets = {
  hero: `${BASE}/hero-board-corner.webp`,
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrows: {
    white: asset("/images/product-modal/rythmwall/arrow-white.svg"),
    blue: asset("/images/product-modal/rythmwall/arrow-blue.svg"),
  },
  icons: {
    fire: asset("/images/product-modal/icons/winal-flame.svg"),
    mold: `${BASE}/icon-mold.svg`,
    moisture: `${BASE}/icon-moisture.svg`,
    eco: `${BASE}/icon-eco.svg`,
  },
  checkIcon: `${BASE}/icon-check-secondary.svg`,
  marketingImage: `${BASE}/marketing-leaf.webp`,
  glassLogo: `${BASE}/logo-glass.webp`,
} as const;

export const minwinProductModal = {
  categoryLabel: "СТЕНОВЫЕ И ПОТОЛОЧНЫЕ ПАНЕЛИ",
  title: "WINAL™ MinWin",
  description:
    "Минеральная плита MINWIN — это инновационный экологичный материал нового поколения, сочетающий в себе высокий класс пожарной опасности ТГ (Г1) и крайне низкий коэффициент водопоглощения (менее 0,5%). MINWIN обладает выдающимися водоотталкивающими свойствами и полностью исключает такие проблемы, как деформация и набухание, возникающие под воздействием влаги.",
  primaryCta: "Обсудить проект",
  secondaryCta: "Получить образцы",
  features: [
    {
      icon: minwinModalAssets.icons.fire,
      title: "Пожаростойкость",
      description:
        "Класс пожарной опасности ТГ (Г1). Выдающееся сопротивление огню в ходе стандартизированных испытаний.",
    },
    {
      icon: minwinModalAssets.icons.mold,
      title: "Устойчивость к плесени",
      description:
        "Крайне низкая влагопроницаемость материала препятствует развитию плесени. Даже при затоплении материал не теряет своих свойств и не портится",
    },
    {
      icon: minwinModalAssets.icons.moisture,
      title: "Влагостойкость",
      description:
        "Коэффициент водопоглащения - менее 0,5% - практически нулевое поглощение влаги. Менее 3% составляет набухание по толщине",
    },
    {
      icon: minwinModalAssets.icons.eco,
      title: "Экологичность",
      description:
        "Минеральная основа продукта не создает среды для бактерий и вредителей, обеспечивая чистый и здоровый микроклимат в любом помещении",
    },
  ] satisfies MinWinFeature[],
  comparison: {
    title: "Сравнительные характеристики плитных материалов",
    columns: [
      { id: "gkl" as const, label: "ГКЛ" },
      { id: "sml" as const, label: "СМЛ" },
      { id: "dvp" as const, label: "ДВП" },
      { id: "minwin" as const, label: "MINWIN", highlighted: true },
    ],
    rows: [
      {
        label: "Экологичность",
        values: { gkl: "да", sml: "да", dvp: "VOC-выделение", minwin: "да" },
      },
      {
        label: "Нагрузка на конструкцию",
        values: {
          gkl: "легкий (1 т/м³)",
          sml: "средний (1,4 т/м³)",
          dvp: "легкий (<1 т/м³)",
          minwin: "легкий (1 т/м³)",
        },
      },
      {
        label: "Теплопроводность (Вт/м·К)",
        values: { gkl: "0,18", sml: "0,3", dvp: "0,14", minwin: "0,10" },
      },
      {
        label: "Пожаростойкость",
        values: { gkl: "средняя", sml: "высокая", dvp: "низкая", minwin: "очень высокая" },
      },
      {
        label: "Влагостойкость",
        values: {
          gkl: "нет",
          sml: "склонен к влагонакоплению",
          dvp: "нет",
          minwin: "да",
        },
      },
      {
        label: "Устойчивость к плесени",
        values: {
          gkl: "склонен к плесени",
          sml: "да",
          dvp: "нет",
          minwin: "да",
        },
      },
      {
        label: "Удержание крепежа",
        values: { gkl: "среднее", sml: "среднее", dvp: "среднее", minwin: "высокое" },
      },
    ] satisfies MinWinComparisonRow[],
  },
  useCases: {
    title: "Сферы применения WINAL™ MinWin",
    description:
      "Идеальный материал для помещений с высокими требованиями к безопасности: больницы, школы, аэропорты, вокзалы и других.",
  },
  coatings: {
    label: "Виды покрытий",
    description:
      "Богатство вариантов оформления MINWIN открывает безграничные возможности для реализации любых дизайнерских концепций. Минеральная плита служит идеальной основой для всех популярных видов финишной отделки",
    items: [
      { label: "Акрил", image: `${BASE}/coating-acryl.webp` },
      { label: "HPL", image: `${BASE}/coating-hpl.webp` },
      { label: "ПВХ", image: `${BASE}/coating-pvc.webp` },
      { label: "Полимер", image: `${BASE}/coating-polymer.webp` },
      { label: "Аллюминий", image: `${BASE}/coating-aluminum.webp` },
    ] satisfies MinWinCoating[],
  },
  marketing: {
    quote:
      "Уникальное сочетание технических и эксплуатационных характеристик, делают MINWIN лидером современных отделочных материалов",
    title: "WINAL™ MinWin",
  },
} as const;
