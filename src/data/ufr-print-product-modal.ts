import { asset } from "@/lib/asset";
export const UFR_PRINT_PRODUCT_MODAL_ID = "ufr-print-product-modal";

export const ufrPrintModalAssets = {
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrow: asset("/images/product-modal/rythmwall/arrow-white.svg"),
} as const;

export const ufrPrintProjects = [
  {
    id: "moskino",
    href: "https://winal.ru/gallery/istoricheskiy-manezh-moskino-proekt-winal/",
    title: "Кафе в кинопарке «Москино»",
    description: "Паттерн со стилизованными лошадьми на СМЛ с акриловым покрытием.",
    photos: [
      {
        src: asset("/images/product-modal/ufr-print/winal-ufr-20261104-p12.webp"),
        caption: "Кафе в кинопарке «Москино» — печатный паттерн на панелях СМЛ с акриловым покрытием",
      },
      {
        src: asset("/images/product-modal/ufr-print/winal-ufr-20261104-p13.webp"),
        caption: "Кафе в кинопарке «Москино» — крупный план рисунка и стыка панелей",
      },
      {
        src: asset("/images/product-modal/ufr-print/winal-ufr-20261105-p14.webp"),
        caption: "Кафе в кинопарке «Москино» — паттерн со стилизованными лошадьми в интерьере",
      },
    ],
  },
  {
    id: "padel",
    href: "https://winal.ru/gallery/padel-centr/",
    title: "Академия падела Ходынка",
    description: "Полноцветная иллюстрация и контурная графика на СМЛ HPL.",
    photos: [
      {
        src: asset("/images/product-modal/ufr-print/winal-ufr-20261104-p01.webp"),
        caption: "Академия падела Ходынка — полноцветная иллюстрация на панелях СМЛ HPL",
      },
      {
        src: asset("/images/product-modal/ufr-print/winal-ufr-20261104-p02.webp"),
        caption: "Академия падела Ходынка — контурный рисунок на панелях СМЛ HPL",
      },
      {
        src: asset("/images/product-modal/ufr-print/winal-ufr-20261105-p03.webp"),
        caption: "Академия падела Ходынка — деталь полноцветной иллюстрации на СМЛ HPL",
      },
    ],
  },
  {
    id: "zori",
    href: "https://winal.ru/gallery/sportivnaya-baza-podmoskovnye-zori-otdelka-panelyami-winal-sml-polimer-polikeram-soft-tach-premium/",
    title: "Спортивная база «Подмосковные Зори»",
    description: "Силуэты спортсменов на панелях СМЛ Полимер.",
    photos: [
      {
        src: asset("/images/product-modal/ufr-print/winal-ufr-20261104-p16.webp"),
        caption: "Спортивная база «Подмосковные Зори» — силуэты на панелях СМЛ Полимер",
      },
      {
        src: asset("/images/product-modal/ufr-print/winal-ufr-20261105-p15.webp"),
        caption: "Спортивная база «Подмосковные Зори» — силуэт спортсмена крупным планом, СМЛ Полимер",
      },
      {
        src: asset("/images/product-modal/ufr-print/winal-ufr-20261105-p17.webp"),
        caption: "Спортивная база «Подмосковные Зори» — печатная графика в интерьере, СМЛ Полимер",
      },
    ],
  },
] as const;

export type UfrPrintType = {
  id: string;
  label: string;
  caption: string;
  photos: readonly { src: string; caption: string }[];
};

export const ufrPrintTypes: readonly UfrPrintType[] = [
  {
    id: "pattern",
    label: "Паттерн",
    caption: "Паттерн · Кафе в кинопарке «Москино» · СМЛ с акриловым покрытием",
    photos: ufrPrintProjects[0].photos,
  },
  {
    id: "graphics",
    label: "Графика",
    caption: "Контурные рисунки и силуэты · Академия падела Ходынка и «Подмосковные Зори»",
    photos: [ufrPrintProjects[1].photos[1], ...ufrPrintProjects[2].photos],
  },
  {
    id: "fullcolor",
    label: "Полноцвет",
    caption: "Полноцветная иллюстрация · Академия падела Ходынка · СМЛ HPL",
    photos: [ufrPrintProjects[1].photos[0], ufrPrintProjects[1].photos[2]],
  },
  {
    id: "lettering",
    label: "Надписи",
    caption: "Надписи и навигация · Пример оформления указателей",
    photos: [],
  },
];

export const ufrPrintProductModal = {
  categoryLabel: "ИНДИВИДУАЛЬНАЯ ПЕЧАТЬ",
  title: "UFR-печать WINAL™",
  description:
    "Печатаем рисунки, надписи и полноцветные изображения на стеновых панелях. На видимой части профилей открытого крепления можно повторить декор панелей и включить профиль в общий рисунок стены.",
  primaryCta: "Обсудить печать",
  features: [
    {
      icon: asset("/images/product-modal/icons/phosphor-squares-four.svg"),
      title: "Паттерны и декоры",
      description: "Орнамент по рисунку проекта. В Москино мотив с лошадьми переходит с панели на панель.",
    },
    {
      icon: asset("/images/product-modal/icons/figma-copy.svg"),
      title: "Надписи и навигация",
      description: "Названия зон, номера помещений и указатели на панелях.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-square.svg"),
      title: "Графика и силуэты",
      description: "Контурные рисунки, силуэты и фирменные знаки для отдельных зон.",
    },
    {
      icon: asset("/images/product-modal/icons/phosphor-sun.svg"),
      title: "Полноцветные изображения",
      description: "Иллюстрации, фотографии и панно на нескольких панелях.",
    },
  ],
  profiles: {
    title: "Печать на профилях открытого крепления",
    text: "Древесный декор или орнамент панели можно повторить на лицевой части видимого профиля. Это помогает включить стык в общий рисунок стены.",
    note: "Возможность печати уточняем для выбранного профиля.",
  },
  surfaces: {
    title: "Подтверждённые покрытия панелей",
    rows: [
      { name: "СМЛ с акриловым покрытием", value: "Кафе «Москино»" },
      { name: "СМЛ HPL", value: "Академия падела Ходынка" },
      { name: "СМЛ Полимер", value: "«Подмосковные Зори»" },
    ],
  },
  examples: {
    title: "Примеры печати на объектах",
    caption: "Как печать стала частью интерьера. Откройте кейс, чтобы посмотреть весь проект.",
  },
} as const;
