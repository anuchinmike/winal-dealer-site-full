import { asset } from "@/lib/asset";
/* Generated from the profile modal prototype (variant A). Text fields may contain inline <b> / <span class="nb"> markup. */

export const PROFILE_IDS = ["open", "pi", "t", "h", "uth", "l", "f", "el", "nev", "mic", "lh", "inn", "ut", "r5", "str", "sml", "qby", "r10", "pro", "thr", "lumen", "slat"] as const;

export type ProfileId = (typeof PROFILE_IDS)[number];
export type ProfileModalAction = `profile_${ProfileId}_modal`;
export type ProfileNodeId = "seam" | "edge" | "inner" | "outer" | "assembled" | "light";

export type ProfileSection = { src: string; alt: string };
export type ProfileSlide =
  | { name: string; kind: "scene"; src: string }
  | { name: string; kind: "img"; src: string }
  | { name: string; kind: "svg"; svgs: ProfileSection[] };

export type ProfileData = {
  id: ProfileId;
  node: ProfileNodeId;
  fastening: string;
  tab: string;
  name: string;
  card: string;
  cardImage: string;
  thumb: string;
  kicker: string;
  title: string;
  lead: string;
  feats: { icon: string; title: string; text: string }[];
  slides: ProfileSlide[];
  specs: { name: string; value: string }[];
  draw: ProfileSection[];
  drawCap: string;
  mountTitle: string;
  mount: string[];
  prepTitle: string;
  prep: string[];
  rel: { title: string; text: string; items: { id: ProfileId; title: string; text: string; thumb: string }[] };
  fins: { image: string; title: string; text: string }[];
};

export const PROFILES_HUB_ACTION = "profiles_hub_modal" as const;
export const PROFILES_HUB_DIALOG_ID = "profiles-hub-modal";

export function profileModalAction(id: ProfileId): ProfileModalAction {
  return `profile_${id}_modal`;
}

export function profileDialogId(id: ProfileId): string {
  return `profile-${id}-product-modal`;
}

export const PROFILE_NODES: readonly { id: ProfileNodeId; label: string }[] = [
  { id: "seam", label: "Стык панелей" },
  { id: "edge", label: "Торцы и примыкания" },
  { id: "inner", label: "Внутренний угол" },
  { id: "outer", label: "Наружный угол" },
  { id: "assembled", label: "Сборные углы" },
  { id: "light", label: "Свет и рейка" },
];

export const profilesHub = {
  categoryLabel: "ПРОФИЛИ ДЛЯ СТЕНОВЫХ СИСТЕМ",
  title: "Профили WINAL™",
  description:
    "Монтажные, угловые и световые профили для стеновых панелей WINAL™. Выберите узел, чтобы увидеть подходящие профили, способ крепления и исполнения.",
  closeIcon: asset("/images/product-modal/rythmwall/icon-close.webp"),
  arrowWhite: asset("/images/product-modal/rythmwall/arrow-white.svg"),
  sampleIcon: asset("/images/product-modal/icons/phosphor-cube.svg"),
} as const;

export const profiles: readonly ProfileData[] = [
  {
    "id": "open",
    "node": "seam",
    "fastening": "Открытое крепление",
    "tab": "Омега-профиль",
    "name": "Омега-профиль",
    "card": "Омега без заглушки, паз и крепёж на виду",
    "thumb": asset("/images/product-modal/profiles/img/th-open.webp"),
    "kicker": "Монтажный профиль · открытое крепление",
    "title": "Омега‑профиль WINAL™",
    "lead": "Прижимной профиль на стыке стеновых панелей. Монтируется на подготовленную стену или на каркас и подходит для любых панелей WINAL™. Полки омеги прижимают кромки соседних панелей, саморез проходит через дно профиля в основание.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/figma-dry-mount.svg"),
        "title": "Сухой монтаж",
        "text": "Панели ставятся без клея, стык держит прижим омеги."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "На стену или каркас",
        "text": "Крепёж подбирают по основанию: дюбель / саморез."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-squares-four.svg"),
        "title": "Любые панели WINAL™",
        "text": "Один профиль для всех панелей WINAL™."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-split-horizontal.svg"),
        "title": "Паз под заглушку",
        "text": "В паз защёлкивается Пи-профиль или Т-крышка."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/open.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-omega.webp")
      },
      {
        "name": "Сечение",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/omega.svg"),
            "alt": "Сечение омега-профиля: ширина 30 мм, полки 8,5 мм, паз 13 мм, стенка 0,5–1 мм"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "стык панелей"
      },
      {
        "name": "Крепление",
        "value": "открытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена или каркас"
      },
      {
        "name": "Панели",
        "value": "любые панели WINAL™"
      },
      {
        "name": "Материал",
        "value": "алюминий или оцинкованная сталь"
      },
      {
        "name": "Ширина",
        "value": "30 мм: полки 8,5 + паз 13 + 8,5"
      },
      {
        "name": "Стенка",
        "value": "0,5–1 мм"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/omega.svg"),
        "alt": "Сечение омега-профиля: ширина 30 мм, полки 8,5 мм, паз 13 мм, стенка 0,5–1 мм"
      }
    ],
    "drawCap": "Сечение профиля, мм",
    "mountTitle": "Крепление: открытое",
    "mount": [
      "<b>Основание:</b> подготовленная стена или каркас",
      "<b>Панели</b> ставятся без клея",
      "<b>Омега</b> полками прижимает кромки панелей",
      "<b>Саморез</b> проходит через дно омеги в основание"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Варианты узла",
      "text": "Омега работает как открытый стык или как база под заглушку.",
      "items": [
        {
          "id": "open",
          "title": "Открытый стык",
          "text": "Омега без заглушки, паз и крепёж на виду",
          "thumb": asset("/images/product-modal/profiles/img/th-open.webp")
        },
        {
          "id": "pi",
          "title": "Омега + Пи-профиль",
          "text": "Узкая заглушка закрывает саморезы",
          "thumb": asset("/images/product-modal/profiles/img/th-pi.webp")
        },
        {
          "id": "t",
          "title": "Омега + Т-крышка",
          "text": "Широкая крышка, прямая или закруглённая",
          "thumb": asset("/images/product-modal/profiles/img/th-t.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      },
      {
        "image": asset("/images/product-modal/profiles/img/f-lam.webp"),
        "title": "Ламинация",
        "text": "Декоративная плёнка: древесные и фактурные декоры."
      },
      {
        "image": asset("/images/product-modal/profiles/img/f-ufr.webp"),
        "title": "UFR-печать",
        "text": "Печать по рисунку проекта, в том числе в связке с Пи-профилем."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/open.webp")
  },
  {
    "id": "pi",
    "node": "seam",
    "fastening": "Открытое крепление",
    "tab": "Омега + Пи",
    "name": "Омега + Пи-профиль",
    "card": "Узкая заглушка закрывает саморезы",
    "thumb": asset("/images/product-modal/profiles/img/th-pi.webp"),
    "kicker": "Узел открытого крепления · стык с заглушкой",
    "title": "Омега + Пи‑профиль WINAL™",
    "lead": "Узел из двух профилей. Омега прижимает кромки панелей и крепится саморезом через дно, Пи-профиль защёлкивается в паз омеги и закрывает саморезы. Монтаж на подготовленную стену или на каркас, подходит для любых панелей WINAL™.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-eye-slash.svg"),
        "title": "Крепёж скрыт",
        "text": "Пи-профиль закрывает саморезы в пазу омеги."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "Узкий шов",
        "text": "Лицо Пи-профиля — <span class=\"nb\">10,8 мм</span>."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "На стену или каркас",
        "text": "Крепёж подбирают по основанию: дюбель / саморез."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-squares-four.svg"),
        "title": "Любые панели WINAL™",
        "text": "Узел работает со всеми панелями WINAL™."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/pi.html")
      },
      {
        "name": "Вид Пи-профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-pi.webp")
      },
      {
        "name": "Вид омеги",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-omega.webp")
      },
      {
        "name": "Сечения",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/omega.svg"),
            "alt": "Сечение омега-профиля: ширина 30 мм, полки 8,5 мм, паз 13 мм, стенка 0,5–1 мм"
          },
          {
            "src": asset("/images/product-modal/profiles/sec/pi.svg"),
            "alt": "Сечение Пи-профиля: ширина 10,8 мм, высота 6 мм, внутренний размер 9 мм"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "стык панелей с заглушкой"
      },
      {
        "name": "Крепление",
        "value": "открытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена или каркас"
      },
      {
        "name": "Панели",
        "value": "любые панели WINAL™"
      },
      {
        "name": "Омега",
        "value": "30 мм, алюминий или оцинкованная сталь"
      },
      {
        "name": "Пи-профиль",
        "value": "10,8 × 6 мм, алюминий или оцинкованная сталь"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/pi.svg"),
        "alt": "Сечение Пи-профиля: ширина 10,8 мм, высота 6 мм, внутренний размер 9 мм"
      }
    ],
    "drawCap": "Сечение Пи-профиля, мм",
    "mountTitle": "Крепление: открытое",
    "mount": [
      "<b>Основание:</b> подготовленная стена или каркас",
      "<b>Панели</b> ставятся без клея",
      "<b>Омега</b> полками прижимает кромки панелей, <b>саморез</b> проходит через дно в основание",
      "<b>Пи-профиль</b> защёлкивается в омегу и закрывает саморезы"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Варианты узла",
      "text": "Омега работает как открытый стык или как база под заглушку.",
      "items": [
        {
          "id": "open",
          "title": "Открытый стык",
          "text": "Омега без заглушки, паз и крепёж на виду",
          "thumb": asset("/images/product-modal/profiles/img/th-open.webp")
        },
        {
          "id": "pi",
          "title": "Омега + Пи-профиль",
          "text": "Узкая заглушка закрывает саморезы",
          "thumb": asset("/images/product-modal/profiles/img/th-pi.webp")
        },
        {
          "id": "t",
          "title": "Омега + Т-крышка",
          "text": "Широкая крышка, прямая или закруглённая",
          "thumb": asset("/images/product-modal/profiles/img/th-t.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      },
      {
        "image": asset("/images/product-modal/profiles/img/f-lam.webp"),
        "title": "Ламинация",
        "text": "Декоративная плёнка: древесные и фактурные декоры."
      },
      {
        "image": asset("/images/product-modal/profiles/img/f-ufr.webp"),
        "title": "UFR-печать",
        "text": "Печать на связке омеги и Пи-профиля, если позволяет рисунок."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/pi.webp")
  },
  {
    "id": "t",
    "node": "seam",
    "fastening": "Открытое крепление",
    "tab": "Омега + Т",
    "name": "Омега + Т-крышка",
    "card": "Широкая крышка, прямая или закруглённая",
    "thumb": asset("/images/product-modal/profiles/img/th-t.webp"),
    "kicker": "Узел открытого крепления · стык с крышкой",
    "title": "Омега + Т‑крышка WINAL™",
    "lead": "Широкая Т-крышка защёлкивается в паз омеги и закрывает стык панелей вместе с крепежом. Два исполнения крышки: прямая <span class=\"nb\">30 мм</span> и закруглённая <span class=\"nb\">32 мм</span>. Монтаж на подготовленную стену или на каркас, подходит для любых панелей WINAL™.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-rows.svg"),
        "title": "Широкий шов",
        "text": "Крышка закрывает стык и крепёж целиком."
      },
      {
        "icon": asset("/images/product-modal/icons/figma-radius.svg"),
        "title": "Прямая или закруглённая",
        "text": "Лицо крышки <span class=\"nb\">30 мм</span> или <span class=\"nb\">32 мм</span>."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "На стену или каркас",
        "text": "Крепёж подбирают по основанию: дюбель / саморез."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-squares-four.svg"),
        "title": "Любые панели WINAL™",
        "text": "Узел работает со всеми панелями WINAL™."
      }
    ],
    "slides": [
      {
        "name": "Прямая",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/t2.html")
      },
      {
        "name": "Закруглённая",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/t3.html")
      },
      {
        "name": "Вид прямой",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-t2.webp")
      },
      {
        "name": "Вид закругл.",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-t3.webp")
      },
      {
        "name": "Сечения",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/t2.svg"),
            "alt": "Сечение прямой Т-крышки: ширина 30 мм"
          },
          {
            "src": asset("/images/product-modal/profiles/sec/t3.svg"),
            "alt": "Сечение закруглённой Т-крышки: ширина 32 мм"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "стык панелей с крышкой"
      },
      {
        "name": "Крепление",
        "value": "открытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена или каркас"
      },
      {
        "name": "Панели",
        "value": "любые панели WINAL™"
      },
      {
        "name": "Т-крышка прямая",
        "value": "30 мм"
      },
      {
        "name": "Т-крышка закруглённая",
        "value": "32 мм"
      },
      {
        "name": "Омега",
        "value": "30 мм, алюминий или оцинкованная сталь"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/t2.svg"),
        "alt": "Сечение прямой Т-крышки: ширина 30 мм"
      },
      {
        "src": asset("/images/product-modal/profiles/sec/t3.svg"),
        "alt": "Сечение закруглённой Т-крышки: ширина 32 мм"
      }
    ],
    "drawCap": "Сечения крышек, мм",
    "mountTitle": "Крепление: открытое",
    "mount": [
      "<b>Основание:</b> подготовленная стена или каркас",
      "<b>Панели</b> ставятся без клея",
      "<b>Омега</b> крепится к основанию дюбелями / саморезами",
      "<b>Т-крышка</b> защёлкивается в паз омеги"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Варианты узла",
      "text": "Омега работает как открытый стык или как база под заглушку.",
      "items": [
        {
          "id": "open",
          "title": "Открытый стык",
          "text": "Омега без заглушки, паз и крепёж на виду",
          "thumb": asset("/images/product-modal/profiles/img/th-open.webp")
        },
        {
          "id": "pi",
          "title": "Омега + Пи-профиль",
          "text": "Узкая заглушка закрывает саморезы",
          "thumb": asset("/images/product-modal/profiles/img/th-pi.webp")
        },
        {
          "id": "t",
          "title": "Омега + Т-крышка",
          "text": "Широкая крышка, прямая или закруглённая",
          "thumb": asset("/images/product-modal/profiles/img/th-t.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      },
      {
        "image": asset("/images/product-modal/profiles/img/f-lam.webp"),
        "title": "Ламинация",
        "text": "Декоративная плёнка: древесные и фактурные декоры."
      },
      {
        "image": asset("/images/product-modal/profiles/img/f-ufr.webp"),
        "title": "UFR-печать",
        "text": "Печать на лице крышки по рисунку проекта."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/t.webp")
  },
  {
    "id": "h",
    "node": "seam",
    "fastening": "Открытое крепление",
    "tab": "H",
    "name": "H-профиль",
    "card": "Широкая лицевая полка, шов без крышки",
    "thumb": asset("/images/product-modal/profiles/img/th-h.webp"),
    "kicker": "Соединительный профиль · открытое крепление",
    "title": "H‑профиль WINAL™",
    "lead": "Профиль для открытого стыка стеновых панелей с широкой лицевой полкой: шов готов сразу, отдельная крышка не нужна. Крепится к основанию через полку, монтаж на подготовленную стену или на каркас.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-rows.svg"),
        "title": "Шов без крышки",
        "text": "Лицевая полка сразу закрывает края панелей."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "Под толщину панели",
        "text": "WINAL™ ГКЛ <span class=\"nb\">12,5 мм</span> и СМЛ 8, 10, <span class=\"nb\">12 мм</span>."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "На стену или каркас",
        "text": "Крепится через полку: дюбель / саморез."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-palette.svg"),
        "title": "Цвет и печать",
        "text": "Окраска по RAL и UFR-печать по проекту."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/xh.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-h.webp")
      },
      {
        "name": "Сечение",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/xh.svg"),
            "alt": "Сечение H-профиля"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "стык панелей"
      },
      {
        "name": "Крепление",
        "value": "открытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена или каркас"
      },
      {
        "name": "Панели",
        "value": "WINAL™ ГКЛ 12,5 мм, СМЛ 8 · 10 · 12 мм"
      },
      {
        "name": "Материал",
        "value": "алюминий"
      },
      {
        "name": "Ширина",
        "value": "34 мм"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/xh.svg"),
        "alt": "Сечение H-профиля"
      }
    ],
    "drawCap": "Сечение профиля, мм",
    "mountTitle": "Крепление: открытое",
    "mount": [
      "<b>Основание:</b> подготовленная стена или каркас",
      "<b>Профиль</b> крепится к основанию дюбелями / саморезами через полку",
      "<b>Панели</b> ставятся без клея"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Другие решения шва",
      "text": "Для шва панелей есть и другие профили открытого крепления.",
      "items": [
        {
          "id": "uth",
          "title": "Ультратонкий H-профиль",
          "text": "Тонкий шов, QBG9 и QBG11",
          "thumb": asset("/images/product-modal/profiles/img/th-uth1.webp")
        },
        {
          "id": "open",
          "title": "Омега-профиль",
          "text": "Открытый стык или база под заглушку",
          "thumb": asset("/images/product-modal/profiles/img/th-open.webp")
        },
        {
          "id": "el",
          "title": "Т-профиль «Ёлочка»",
          "text": "Вставляется прямо в шов",
          "thumb": asset("/images/product-modal/profiles/img/th-el.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      },
      {
        "image": asset("/images/product-modal/profiles/img/f-ufr.webp"),
        "title": "UFR-печать",
        "text": "Печать на лицевой полке по рисунку проекта."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/h.webp")
  },
  {
    "id": "uth",
    "node": "seam",
    "fastening": "Открытое крепление",
    "tab": "Ультратонкий H",
    "name": "Ультратонкий H-профиль",
    "card": "Тонкий шов, QBG9 и QBG11",
    "thumb": asset("/images/product-modal/profiles/img/th-uth1.webp"),
    "kicker": "Соединительный профиль · открытое крепление",
    "title": "Ультратонкий H‑профиль WINAL™",
    "lead": "Узкий соединительный профиль для тонкой линии шва между панелями WINAL™ СМЛ 8 и <span class=\"nb\">10 мм</span>. Два исполнения сечения, коды QBG9 и QBG11 по толщине панели. Крепится через полку, монтаж на подготовленную стену или на каркас.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "Тонкий шов",
        "text": "Узкая лицевая часть, линия шва почти без зазора."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-stack.svg"),
        "title": "Код по толщине",
        "text": "QBG9 для СМЛ <span class=\"nb\">8 мм</span>, QBG11 для СМЛ <span class=\"nb\">10 мм</span>."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-split-horizontal.svg"),
        "title": "Два сечения",
        "text": "Варианты 1 и 2 под одни и те же панели."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "На стену или каркас",
        "text": "Крепится через полку: дюбель / саморез."
      }
    ],
    "slides": [
      {
        "name": "Вариант 1",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/xuth1.html")
      },
      {
        "name": "Вариант 2",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/xuth2.html")
      },
      {
        "name": "Вид: вариант 1",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-uth1.webp")
      },
      {
        "name": "Вид: вариант 2",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-uth2.webp")
      },
      {
        "name": "Сечения",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/xuth1.svg"),
            "alt": "Сечение ультратонкого H-профиля, вариант 1"
          },
          {
            "src": asset("/images/product-modal/profiles/sec/xuth2.svg"),
            "alt": "Сечение ультратонкого H-профиля, вариант 2"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "стык панелей"
      },
      {
        "name": "Крепление",
        "value": "открытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена или каркас"
      },
      {
        "name": "Панели",
        "value": "WINAL™ СМЛ 8 и 10 мм"
      },
      {
        "name": "Коды",
        "value": "QBG9 (8 мм), QBG11 (10 мм)"
      },
      {
        "name": "Материал",
        "value": "алюминий"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/xuth1.svg"),
        "alt": "Сечение ультратонкого H-профиля, вариант 1"
      },
      {
        "src": asset("/images/product-modal/profiles/sec/xuth2.svg"),
        "alt": "Сечение ультратонкого H-профиля, вариант 2"
      }
    ],
    "drawCap": "Сечения вариантов 1 и 2, мм",
    "mountTitle": "Крепление: открытое",
    "mount": [
      "<b>Основание:</b> подготовленная стена или каркас",
      "<b>Профиль</b> крепится к основанию дюбелями / саморезами через полку",
      "<b>Панели</b> ставятся без клея"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Другие решения шва",
      "text": "Для шва панелей есть и другие профили открытого крепления.",
      "items": [
        {
          "id": "h",
          "title": "H-профиль",
          "text": "Широкая лицевая полка, шов без крышки",
          "thumb": asset("/images/product-modal/profiles/img/th-h.webp")
        },
        {
          "id": "open",
          "title": "Омега-профиль",
          "text": "Открытый стык или база под заглушку",
          "thumb": asset("/images/product-modal/profiles/img/th-open.webp")
        },
        {
          "id": "el",
          "title": "Т-профиль «Ёлочка»",
          "text": "Вставляется прямо в шов",
          "thumb": asset("/images/product-modal/profiles/img/th-el.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/uth.webp")
  },
  {
    "id": "l",
    "node": "edge",
    "fastening": "Открытое крепление",
    "tab": "L",
    "name": "L-профиль",
    "card": "Торец, старт облицовки, внутренний угол",
    "thumb": asset("/images/product-modal/profiles/img/th-l.webp"),
    "kicker": "Торцевой профиль · открытое крепление",
    "title": "L‑профиль WINAL™",
    "lead": "Открытый L-профиль закрывает торец панели на конце стены, служит стартовым профилем, внутренним углом и примыканием к потолку или полу. Крепится через широкую полку, монтаж на подготовленную стену или на каркас.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-rows.svg"),
        "title": "Торец закрыт",
        "text": "Кромка панели на конце стены не остаётся открытой."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-squares-four.svg"),
        "title": "Старт, угол, примыкание",
        "text": "Стартовый профиль, внутренний угол, примыкание к потолку и полу."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "Под толщину панели",
        "text": "WINAL™ ГКЛ <span class=\"nb\">12,5 мм</span> и СМЛ 6, 8, 10, <span class=\"nb\">12 мм</span>."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "На стену или каркас",
        "text": "Крепится через широкую полку: дюбель / саморез."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/xl.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-l.webp")
      },
      {
        "name": "Сечение",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/xl.svg"),
            "alt": "Сечение L-профиля"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "торец, внутренний угол, примыкание"
      },
      {
        "name": "Крепление",
        "value": "открытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена или каркас"
      },
      {
        "name": "Панели",
        "value": "WINAL™ ГКЛ 12,5 мм, СМЛ 6 · 8 · 10 · 12 мм"
      },
      {
        "name": "Материал",
        "value": "алюминий или оцинкованная сталь"
      },
      {
        "name": "Полка",
        "value": "26 мм"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/xl.svg"),
        "alt": "Сечение L-профиля"
      }
    ],
    "drawCap": "Сечение профиля, мм",
    "mountTitle": "Крепление: открытое",
    "mount": [
      "<b>Основание:</b> подготовленная стена или каркас",
      "<b>L-профиль</b> крепится к основанию дюбелями / саморезами через широкую полку",
      "<b>Панели</b> ставятся без клея"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Другие профили",
      "text": "Профили открытого крепления для торцов, углов и шва.",
      "items": [
        {
          "id": "f",
          "title": "F-профиль",
          "text": "Наружный угол на клею или на уголке",
          "thumb": asset("/images/product-modal/profiles/img/th-f1.webp")
        },
        {
          "id": "h",
          "title": "H-профиль",
          "text": "Шов панелей без крышки",
          "thumb": asset("/images/product-modal/profiles/img/th-h.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      },
      {
        "image": asset("/images/product-modal/profiles/img/f-lam.webp"),
        "title": "Ламинация",
        "text": "Декоративная плёнка: древесные и фактурные декоры."
      },
      {
        "image": asset("/images/product-modal/profiles/img/f-ufr.webp"),
        "title": "UFR-печать",
        "text": "Печать на лицевой полке по рисунку проекта."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/l.webp")
  },
  {
    "id": "f",
    "node": "outer",
    "fastening": "Открытое крепление",
    "tab": "F",
    "name": "F-профиль",
    "card": "Наружный угол на клею или на уголке",
    "thumb": asset("/images/product-modal/profiles/img/th-f1.webp"),
    "kicker": "Угловой профиль · открытое крепление",
    "title": "F‑профиль WINAL™",
    "lead": "Профиль для наружного угла облицовки. Два исполнения: разнополочный и равнополочный. Профиль приклеивают или ставят на металлический уголок; коды QBF9, QBF11 и QBF13 по толщине панели.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-squares-four.svg"),
        "title": "Наружный угол",
        "text": "Закрывает торцы панелей на внешнем углу."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "Клей или уголок",
        "text": "Профиль на специализированном клею или на металлическом уголке."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "Под толщину панели",
        "text": "WINAL™ ГКЛ <span class=\"nb\">12,5 мм</span> и СМЛ 6–<span class=\"nb\">12 мм</span>."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-palette.svg"),
        "title": "Ламинация и печать",
        "text": "Окраска RAL, ламинация, UFR-печать."
      }
    ],
    "slides": [
      {
        "name": "На клею",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/xf1.html")
      },
      {
        "name": "На уголке",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/xf2.html")
      },
      {
        "name": "Вид: вариант 1",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-f1.webp")
      },
      {
        "name": "Вид: вариант 2",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-f2.webp")
      },
      {
        "name": "Сечения",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/xf1.svg"),
            "alt": "Сечение F-профиля, вариант 1"
          },
          {
            "src": asset("/images/product-modal/profiles/sec/xf2.svg"),
            "alt": "Сечение F-профиля, вариант 2"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "наружный угол"
      },
      {
        "name": "Крепление",
        "value": "открытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена или каркас"
      },
      {
        "name": "Панели, вариант 1",
        "value": "ГКЛ 12,5 мм, СМЛ 6 · 8 · 10 · 12 мм"
      },
      {
        "name": "Панели, вариант 2",
        "value": "ГКЛ 12,5 мм, СМЛ 10 · 12 мм"
      },
      {
        "name": "Коды",
        "value": "QBF9 · QBF11 · QBF13"
      },
      {
        "name": "Материал",
        "value": "алюминий или оцинкованная сталь"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/xf1.svg"),
        "alt": "Сечение F-профиля, вариант 1"
      },
      {
        "src": asset("/images/product-modal/profiles/sec/xf2.svg"),
        "alt": "Сечение F-профиля, вариант 2"
      }
    ],
    "drawCap": "Сечения вариантов 1 и 2, мм",
    "mountTitle": "Крепление: открытое",
    "mount": [
      "<b>Основание:</b> подготовленная стена или каркас",
      "<b>На клею:</b> F-профиль приклеивается к стене специализированным клеем",
      "<b>На уголке:</b> металлический уголок крепится дюбелями / саморезами; если у края угла мало места — жидкие гвозди",
      "<b>Панели</b> ставятся без клея"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Другие профили",
      "text": "Профили открытого крепления для торцов, углов и шва.",
      "items": [
        {
          "id": "l",
          "title": "L-профиль",
          "text": "Торец, старт облицовки, внутренний угол",
          "thumb": asset("/images/product-modal/profiles/img/th-l.webp")
        },
        {
          "id": "h",
          "title": "H-профиль",
          "text": "Шов панелей без крышки",
          "thumb": asset("/images/product-modal/profiles/img/th-h.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      },
      {
        "image": asset("/images/product-modal/profiles/img/f-lam.webp"),
        "title": "Ламинация",
        "text": "Декоративная плёнка: древесные и фактурные декоры."
      },
      {
        "image": asset("/images/product-modal/profiles/img/f-ufr.webp"),
        "title": "UFR-печать",
        "text": "Печать на лицевой полке по рисунку проекта."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/f.webp")
  },
  {
    "id": "el",
    "node": "seam",
    "fastening": "Открытое крепление",
    "tab": "«Ёлочка»",
    "name": "Т-профиль «Ёлочка»",
    "card": "Вставляется прямо в шов",
    "thumb": asset("/images/product-modal/profiles/img/th-el.webp"),
    "kicker": "Декоративный профиль · открытый шов",
    "title": "Т‑профиль «Ёлочка» WINAL™",
    "lead": "Декоративный профиль вставляется прямо в шов между панелями, профиль под швом не нужен. Шов делают чуть уже ножки «Ёлочки» или равным ей. Подходит для панелей WINAL™ СМЛ и ГСП 8, 10 и <span class=\"nb\">12 мм</span>.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-split-horizontal.svg"),
        "title": "Без профиля под швом",
        "text": "«Ёлочку» ставят прямо в шов готовой облицовки."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "Под толщину панели",
        "text": "WINAL™ СМЛ и ГСП 8, 10, <span class=\"nb\">12 мм</span>."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "Стена или каркас",
        "text": "Панели монтируют на подготовленную стену или каркас."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-palette.svg"),
        "title": "Окраска по RAL",
        "text": "Цвет по каталогу RAL под отделку стен."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/xel.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-el.webp")
      },
      {
        "name": "Сечение",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/xel.svg"),
            "alt": "Сечение Т-профиля «Ёлочка»"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "шов панелей"
      },
      {
        "name": "Крепление",
        "value": "открытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена или каркас"
      },
      {
        "name": "Панели",
        "value": "WINAL™ СМЛ 8 · 10 · 12 мм, ГСП 8 · 10 · 12 мм"
      },
      {
        "name": "Сечение",
        "value": "5,2 · 3 · 1 мм"
      },
      {
        "name": "Материал",
        "value": "алюминий"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/xel.svg"),
        "alt": "Сечение Т-профиля «Ёлочка»"
      }
    ],
    "drawCap": "Сечение профиля, мм",
    "mountTitle": "Крепление: открытое",
    "mount": [
      "<b>Основание:</b> панели монтируют на подготовленную стену или каркас",
      "<b>«Ёлочка»</b> вставляется прямо в шов, профиль под швом не нужен",
      "<b>Шов</b> чуть уже ножки «Ёлочки» или равен ей"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Другие решения шва",
      "text": "Для шва панелей есть и другие профили открытого крепления.",
      "items": [
        {
          "id": "h",
          "title": "H-профиль",
          "text": "Широкая лицевая полка, шов без крышки",
          "thumb": asset("/images/product-modal/profiles/img/th-h.webp")
        },
        {
          "id": "uth",
          "title": "Ультратонкий H-профиль",
          "text": "Тонкий шов, QBG9 и QBG11",
          "thumb": asset("/images/product-modal/profiles/img/th-uth1.webp")
        },
        {
          "id": "open",
          "title": "Омега-профиль",
          "text": "Открытый стык или база под заглушку",
          "thumb": asset("/images/product-modal/profiles/img/th-open.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/el.webp")
  },
  {
    "id": "nev",
    "node": "seam",
    "fastening": "Скрытое крепление",
    "tab": "H-профиль",
    "name": "H-профиль скрытого крепления",
    "card": "Скрытый шов, торцы панелей в кромке",
    "thumb": asset("/images/product-modal/profiles/img/th-nev.webp"),
    "kicker": "Скрытое крепление · шов панелей",
    "title": "H-профиль скрытого крепления WINAL™",
    "lead": "Профиль скрытого крепления для шва стеновых панелей: сам профиль и крепёж остаются под панелями, на лице видна только аккуратная линия стыка. Монтируется на подготовленную стену или на стойки ПС. Торцы панелей у стыка оклеены кромкой.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-eye-slash.svg"),
        "title": "Крепёж не виден",
        "text": "Профиль и саморезы остаются под панелями."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "Стена или каркас",
        "text": "На стену дюбелями / саморезами, на каркас саморезами к полке ПС."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-squares-four.svg"),
        "title": "СМЛ и ГКЛ",
        "text": "WINAL™ СМЛ 6, 8, 10, <span class=\"nb\">12 мм</span> и ГКЛ <span class=\"nb\">12,5 мм</span>."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-stack.svg"),
        "title": "Под толщину панели",
        "text": "Размеры профиля подбирают по толщине панели."
      }
    ],
    "slides": [
      {
        "name": "На стене",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/gnevs.html")
      },
      {
        "name": "На стойках ПС",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/gnevp.html")
      },
      {
        "name": "Вариант 3",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/gnev3.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-nev.webp")
      },
      {
        "name": "Вид: вариант 3",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-nev3.webp")
      },
      {
        "name": "Сечения",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/hc2.svg"),
            "alt": "Сечение H-профиля скрытого крепления, вариант 2"
          },
          {
            "src": asset("/images/product-modal/profiles/sec/hc3.svg"),
            "alt": "Сечение H-профиля скрытого крепления, вариант 3"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "шов панелей"
      },
      {
        "name": "Крепление",
        "value": "скрытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена или стойки ПС"
      },
      {
        "name": "Панели",
        "value": "WINAL™ СМЛ 6 · 8 · 10 · 12 мм, ГКЛ 12,5 мм"
      },
      {
        "name": "Торцы панелей",
        "value": "оклеены кромкой у стыка"
      },
      {
        "name": "Материал",
        "value": "алюминий"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/hc2.svg"),
        "alt": "Сечение H-профиля скрытого крепления, вариант 2"
      }
    ],
    "drawCap": "Сечение профиля, мм",
    "mountTitle": "Крепление: скрытое",
    "mount": [
      "<b>На стене:</b> H-профиль крепится дюбелями / саморезами через полку основания",
      "<b>На каркасе:</b> H-профиль крепится саморезами к полке стойки ПС",
      "<b>Торцы панелей</b> у стыка оклеены кромкой, поэтому стык ровный и аккуратный"
    ],
    "prepTitle": "Подготовка основания",
    "prep": [
      "<b>Стена:</b> ровная или выровненная штукатуркой, отклонение не более <span class=\"nb\">2 мм</span> на метр",
      "<b>Каркас:</b> стойки ПС в одной плоскости, каждый стык панелей приходится на стойку"
    ],
    "rel": {
      "title": "Скрытое крепление",
      "text": "Другие профили скрытого крепления для шва, примыканий и углов.",
      "items": [
        {
          "id": "mic",
          "title": "«Микрошов»",
          "text": "Шип закрывает стык, кромка не нужна",
          "thumb": asset("/images/product-modal/profiles/img/th-mic.webp")
        },
        {
          "id": "lh",
          "title": "L-профиль скрытого крепления",
          "text": "Пол, потолок и внутренний угол",
          "thumb": asset("/images/product-modal/profiles/img/th-lh.webp")
        },
        {
          "id": "inn",
          "title": "Внутренний угол",
          "text": "QB-W09 под СМЛ 8 и 10 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-inn.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/nev.webp")
  },
  {
    "id": "mic",
    "node": "seam",
    "fastening": "Скрытое крепление",
    "tab": "«Микрошов»",
    "name": "Профиль «Микрошов»",
    "card": "Шип закрывает стык, кромка не нужна",
    "thumb": asset("/images/product-modal/profiles/img/th-mic.webp"),
    "kicker": "Скрытое крепление · шов панелей",
    "title": "Профиль «Микрошов» WINAL™",
    "lead": "Вариант H-профиля скрытого крепления с шипом, код QBKCG10, для панелей WINAL™ СМЛ <span class=\"nb\">10 мм</span>. Шип профиля закрывает стык панелей, поэтому торцы кромковать не нужно: панель дешевле и быстрее в производстве. Профиль крепится к стойкам ПС.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-rows.svg"),
        "title": "Шов закрыт шипом",
        "text": "Шип «микрошва» закрывает стык панелей."
      },
      {
        "icon": asset("/images/product-modal/icons/figma-dry-mount.svg"),
        "title": "Торцы без кромки",
        "text": "Панель проще и быстрее в производстве."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-eye-slash.svg"),
        "title": "Крепёж не виден",
        "text": "Саморезы остаются под панелями."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "Под СМЛ 10 мм",
        "text": "Код QBKCG10, шип <span class=\"nb\">5 мм</span>."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/gmic.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-mic.webp")
      },
      {
        "name": "Сечение",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/hc1.svg"),
            "alt": "Сечение профиля «Микрошов» QBKCG10"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "шов панелей"
      },
      {
        "name": "Крепление",
        "value": "скрытое"
      },
      {
        "name": "Основание",
        "value": "каркас из стоек ПС"
      },
      {
        "name": "Панели",
        "value": "WINAL™ СМЛ 10 мм"
      },
      {
        "name": "Код",
        "value": "QBKCG10"
      },
      {
        "name": "Сечение",
        "value": "12 · 5 · 1 мм"
      },
      {
        "name": "Материал",
        "value": "алюминий"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/hc1.svg"),
        "alt": "Сечение профиля «Микрошов» QBKCG10"
      }
    ],
    "drawCap": "Сечение профиля, мм",
    "mountTitle": "Крепление: скрытое",
    "mount": [
      "<b>Основание:</b> каркас из стоек ПС",
      "<b>Профиль</b> крепится саморезами к полке ПС",
      "<b>Шип «микрошва»</b> закрывает стык панелей, торцы кромковать не нужно"
    ],
    "prepTitle": "Подготовка каркаса",
    "prep": [
      "Стойки ПС выставлены в одну плоскость",
      "Каждый стык панелей приходится на стойку ПС"
    ],
    "rel": {
      "title": "Скрытое крепление",
      "text": "Другие профили скрытого крепления для шва, примыканий и углов.",
      "items": [
        {
          "id": "nev",
          "title": "H-профиль",
          "text": "Скрытый шов, торцы панелей в кромке",
          "thumb": asset("/images/product-modal/profiles/img/th-nev.webp")
        },
        {
          "id": "lh",
          "title": "L-профиль скрытого крепления",
          "text": "Пол, потолок и внутренний угол",
          "thumb": asset("/images/product-modal/profiles/img/th-lh.webp")
        },
        {
          "id": "inn",
          "title": "Внутренний угол",
          "text": "QB-W09 под СМЛ 8 и 10 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-inn.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/mic.webp")
  },
  {
    "id": "lh",
    "node": "edge",
    "fastening": "Скрытое крепление",
    "tab": "L скрытый",
    "name": "L-профиль скрытого крепления",
    "card": "Пол, потолок и внутренний угол",
    "thumb": asset("/images/product-modal/profiles/img/th-lh.webp"),
    "kicker": "Торцевой профиль · скрытое крепление",
    "title": "L‑профиль скрытого крепления WINAL™",
    "lead": "Профиль для примыкания облицовки к полу и потолку и для внутреннего угла. Язык профиля входит в паз кромки панели, поэтому крепёж остаётся скрытым. К полу и потолку профиль крепится саморезами к направляющей ПН каркаса, во внутреннем углу — дюбелями к стене.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-eye-slash.svg"),
        "title": "Крепёж не виден",
        "text": "Язык профиля входит в паз кромки панели."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-squares-four.svg"),
        "title": "Пол, потолок, угол",
        "text": "Примыкание к полу, к потолку и внутренний угол."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "Каркас или стена",
        "text": "К направляющей ПН саморезами, к стене дюбелями."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "Под СМЛ 10 мм",
        "text": "Узлы показаны для WINAL™ СМЛ <span class=\"nb\">10 мм</span>."
      }
    ],
    "slides": [
      {
        "name": "Пол",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/glhp.html")
      },
      {
        "name": "Потолок",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/glht.html")
      },
      {
        "name": "Внутренний угол",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/glhu.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-lh.webp")
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "примыкание к полу и потолку, внутренний угол"
      },
      {
        "name": "Крепление",
        "value": "скрытое"
      },
      {
        "name": "Основание",
        "value": "каркас ПН и ПС или подготовленная стена"
      },
      {
        "name": "Панели",
        "value": "WINAL™ СМЛ 10 мм, кромка с пазом"
      }
    ],
    "draw": [],
    "drawCap": "",
    "mountTitle": "Крепление: скрытое",
    "mount": [
      "<b>Пол и потолок:</b> L-профиль крепится саморезами к направляющей ПН",
      "<b>Внутренний угол:</b> профиль крепится к стене дюбелями",
      "<b>Панель</b> встаёт кромкой на полку, язык профиля входит в паз кромки"
    ],
    "prepTitle": "Подготовка основания",
    "prep": [
      "<b>Каркас:</b> направляющая ПН закреплена к полу или потолку дюбелями, стойки ПС в одной плоскости",
      "<b>Стена:</b> ровная или выровненная штукатуркой, отклонение не более <span class=\"nb\">2 мм</span> на метр"
    ],
    "rel": {
      "title": "Скрытое крепление",
      "text": "Другие профили скрытого крепления для шва, примыканий и углов.",
      "items": [
        {
          "id": "nev",
          "title": "H-профиль",
          "text": "Скрытый шов, торцы панелей в кромке",
          "thumb": asset("/images/product-modal/profiles/img/th-nev.webp")
        },
        {
          "id": "mic",
          "title": "«Микрошов»",
          "text": "Шип закрывает стык, кромка не нужна",
          "thumb": asset("/images/product-modal/profiles/img/th-mic.webp")
        },
        {
          "id": "inn",
          "title": "Внутренний угол",
          "text": "QB-W09 под СМЛ 8 и 10 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-inn.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/lh.webp")
  },
  {
    "id": "inn",
    "node": "inner",
    "fastening": "Скрытое крепление",
    "tab": "Внутр. угол",
    "name": "Внутренний угол",
    "card": "QB-W09 под СМЛ 8 и 10 мм",
    "thumb": asset("/images/product-modal/profiles/img/th-inn.webp"),
    "kicker": "Угловой профиль · скрытое крепление",
    "title": "Внутренний угол WINAL™",
    "lead": "Профиль для внутреннего угла облицовки из панелей WINAL™ СМЛ 8 и <span class=\"nb\">10 мм</span>. Два кода по толщине панели: QB‑W09‑420 и QB‑W09‑480. Профиль крепится к стене дюбелями / саморезами до монтажа панелей.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/figma-radius.svg"),
        "title": "Скругление в углу",
        "text": "Профиль закрывает внутренний угол со скруглением."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-stack.svg"),
        "title": "Код по толщине",
        "text": "QB‑W09‑420 для СМЛ <span class=\"nb\">8 мм</span>, QB‑W09‑480 для СМЛ <span class=\"nb\">10 мм</span>."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "Монтаж до панелей",
        "text": "Профиль крепят к стене дюбелями / саморезами."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-palette.svg"),
        "title": "Окраска по RAL",
        "text": "Цвет по каталогу RAL под отделку стен."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/ginn.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-inn.webp")
      },
      {
        "name": "Сечение",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/inn.svg"),
            "alt": "Сечение внутреннего угла"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "внутренний угол"
      },
      {
        "name": "Крепление",
        "value": "скрытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена"
      },
      {
        "name": "Панели",
        "value": "WINAL™ СМЛ 8 и 10 мм"
      },
      {
        "name": "Коды",
        "value": "QB‑W09‑420 (8 мм), QB‑W09‑480 (10 мм)"
      },
      {
        "name": "Материал",
        "value": "алюминий"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/inn.svg"),
        "alt": "Сечение внутреннего угла"
      }
    ],
    "drawCap": "Сечение профиля, мм",
    "mountTitle": "Крепление: скрытое",
    "mount": [
      "<b>Основание:</b> подготовленная стена",
      "<b>Профиль</b> крепится к стене дюбелями / саморезами до монтажа панелей"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Скрытое крепление",
      "text": "Другие профили скрытого крепления для шва, примыканий и углов.",
      "items": [
        {
          "id": "nev",
          "title": "H-профиль",
          "text": "Скрытый шов, торцы панелей в кромке",
          "thumb": asset("/images/product-modal/profiles/img/th-nev.webp")
        },
        {
          "id": "mic",
          "title": "«Микрошов»",
          "text": "Шип закрывает стык, кромка не нужна",
          "thumb": asset("/images/product-modal/profiles/img/th-mic.webp")
        },
        {
          "id": "lh",
          "title": "L-профиль скрытого крепления",
          "text": "Пол, потолок и внутренний угол",
          "thumb": asset("/images/product-modal/profiles/img/th-lh.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/inn.webp")
  },
  {
    "id": "ut",
    "node": "assembled",
    "fastening": "Скрытое крепление",
    "tab": "Ультратонкий",
    "name": "Сборный внешний угол Ультратонкий",
    "card": "QBXY под СМЛ 8, 10, 12 мм",
    "thumb": asset("/images/product-modal/profiles/img/th-ut.webp"),
    "kicker": "Сборный угол · скрытое крепление",
    "title": "Сборный внешний угол Ультратонкий WINAL™",
    "lead": "Наружный угол облицовки, который собирают на производстве: на объект он приезжает готовым. Кромки панелей под профиль подфрезеровывают, поэтому профиль стоит заподлицо с панелью. Коды QBXY9.3, QBXY11.3 и QBXY13.3 по толщине панели.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-cube.svg"),
        "title": "Готов с производства",
        "text": "Угол собран на заводе, на объекте его только монтируют."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "Заподлицо с панелью",
        "text": "Профиль не выступает над плоскостью облицовки."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-stack.svg"),
        "title": "Код по толщине",
        "text": "QBXY9.3, 11.3, 13.3 для СМЛ 8, 10, <span class=\"nb\">12 мм</span>."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-eye-slash.svg"),
        "title": "Скрытое крепление",
        "text": "Профиль крепится через полку под панелью."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/gut.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-ut.webp")
      },
      {
        "name": "Сечение",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/ho1.svg"),
            "alt": "Сечение сборного угла Ультратонкий"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "наружный угол"
      },
      {
        "name": "Крепление",
        "value": "скрытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена"
      },
      {
        "name": "Панели",
        "value": "WINAL™ СМЛ 8 · 10 · 12 мм, ГКЛ 12,5 мм"
      },
      {
        "name": "Коды",
        "value": "QBXY9.3 · QBXY11.3 · QBXY13.3"
      },
      {
        "name": "Поставка",
        "value": "угол собран на производстве"
      },
      {
        "name": "Материал",
        "value": "алюминий"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/ho1.svg"),
        "alt": "Сечение сборного угла Ультратонкий"
      }
    ],
    "drawCap": "Сечение профиля, мм",
    "mountTitle": "Крепление: скрытое",
    "mount": [
      "<b>Угол</b> приходит с производства собранным",
      "<b>Профиль</b> крепится к стене дюбелями / саморезами через полку",
      "<b>У края угла</b> при малом отступе до дюбеля профиль сажают на жидкие гвозди"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Сборные углы",
      "text": "Углы, которые собирают на производстве и привозят готовыми.",
      "items": [
        {
          "id": "r5",
          "title": "Сборный угол R5",
          "text": "Скругление R5 под СМЛ 6 и 8 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-r5.webp")
        },
        {
          "id": "str",
          "title": "Сборный угол «Стрела»",
          "text": "QBYJ10 для НГ-панелей",
          "thumb": asset("/images/product-modal/profiles/img/th-str.webp")
        },
        {
          "id": "sml",
          "title": "Сборный угол из СМЛ",
          "text": "Склеен на производстве, стоит на H-профилях",
          "thumb": asset("/images/product-modal/profiles/img/th-sml.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/ut.webp")
  },
  {
    "id": "r5",
    "node": "assembled",
    "fastening": "Скрытое крепление",
    "tab": "R5",
    "name": "Сборный внешний угол R5",
    "card": "Скругление R5 под СМЛ 6 и 8 мм",
    "thumb": asset("/images/product-modal/profiles/img/th-r5.webp"),
    "kicker": "Сборный угол · скрытое крепление",
    "title": "Сборный внешний угол R5 WINAL™",
    "lead": "Наружный угол со скруглением R5 для панелей WINAL™ СМЛ 6 и <span class=\"nb\">8 мм</span>. Угол собирают на производстве, на объект он приезжает готовым. Кромки панелей под профиль подфрезеровывают, профиль стоит заподлицо с панелью.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-cube.svg"),
        "title": "Готов с производства",
        "text": "Угол собран на заводе, на объекте его только монтируют."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "Заподлицо с панелью",
        "text": "Профиль не выступает над плоскостью облицовки."
      },
      {
        "icon": asset("/images/product-modal/icons/figma-radius.svg"),
        "title": "Скругление R5",
        "text": "Мягкое ребро наружного угла."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-squares-four.svg"),
        "title": "Под СМЛ 6 и 8 мм",
        "text": "Для тонких панелей WINAL™ СМЛ."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/gr5.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-r5.webp")
      },
      {
        "name": "Сечение",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/ho2.svg"),
            "alt": "Сечение сборного угла R5"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "наружный угол"
      },
      {
        "name": "Крепление",
        "value": "скрытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена"
      },
      {
        "name": "Панели",
        "value": "WINAL™ СМЛ 6 и 8 мм"
      },
      {
        "name": "Радиус",
        "value": "R5"
      },
      {
        "name": "Поставка",
        "value": "угол собран на производстве"
      },
      {
        "name": "Материал",
        "value": "алюминий"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/ho2.svg"),
        "alt": "Сечение сборного угла R5"
      }
    ],
    "drawCap": "Сечение профиля, мм",
    "mountTitle": "Крепление: скрытое",
    "mount": [
      "<b>Угол</b> приходит с производства собранным",
      "<b>Профиль</b> крепится к стене дюбелями / саморезами через полку",
      "<b>У края угла</b> при малом отступе до дюбеля профиль сажают на жидкие гвозди"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Сборные углы",
      "text": "Углы, которые собирают на производстве и привозят готовыми.",
      "items": [
        {
          "id": "ut",
          "title": "Сборный угол Ультратонкий",
          "text": "QBXY под СМЛ 8, 10, 12 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-ut.webp")
        },
        {
          "id": "str",
          "title": "Сборный угол «Стрела»",
          "text": "QBYJ10 для НГ-панелей",
          "thumb": asset("/images/product-modal/profiles/img/th-str.webp")
        },
        {
          "id": "sml",
          "title": "Сборный угол из СМЛ",
          "text": "Склеен на производстве, стоит на H-профилях",
          "thumb": asset("/images/product-modal/profiles/img/th-sml.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/r5.webp")
  },
  {
    "id": "str",
    "node": "assembled",
    "fastening": "",
    "tab": "«Стрела»",
    "name": "Сборный внешний угол «Стрела»",
    "card": "QBYJ10 для НГ-панелей",
    "thumb": asset("/images/product-modal/profiles/img/th-str.webp"),
    "kicker": "Сборный угол · НГ-панели",
    "title": "Сборный внешний угол «Стрела» WINAL™",
    "lead": "Наружный угол для НГ-панелей, код QBYJ10. Угол собирают на производстве, на объект он приезжает готовым. Кромки панелей под профиль подфрезеровывают, профиль стоит заподлицо с панелью.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-cube.svg"),
        "title": "Готов с производства",
        "text": "Угол собран на заводе, на объекте его только монтируют."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "Заподлицо с панелью",
        "text": "Профиль не выступает над плоскостью облицовки."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-split-horizontal.svg"),
        "title": "Грань 45°",
        "text": "Профиль <span class=\"nb\">20 мм</span> с гранью под 45°."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-squares-four.svg"),
        "title": "Для НГ-панелей",
        "text": "Профиль предназначен только для НГ-панелей."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/gstr.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-str.webp")
      },
      {
        "name": "Сечение",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/str.svg"),
            "alt": "Сечение угла «Стрела»"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "наружный угол"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена"
      },
      {
        "name": "Панели",
        "value": "НГ-панели"
      },
      {
        "name": "Код",
        "value": "QBYJ10"
      },
      {
        "name": "Размеры",
        "value": "20 мм, 45°, стенка 0,7 мм"
      },
      {
        "name": "Поставка",
        "value": "угол собран на производстве"
      },
      {
        "name": "Материал",
        "value": "алюминий"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/str.svg"),
        "alt": "Сечение угла «Стрела»"
      }
    ],
    "drawCap": "Сечение профиля, мм",
    "mountTitle": "Монтаж",
    "mount": [
      "<b>Основание:</b> подготовленная стена",
      "<b>Угол</b> приходит с производства собранным"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Сборные углы",
      "text": "Углы, которые собирают на производстве и привозят готовыми.",
      "items": [
        {
          "id": "ut",
          "title": "Сборный угол Ультратонкий",
          "text": "QBXY под СМЛ 8, 10, 12 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-ut.webp")
        },
        {
          "id": "r5",
          "title": "Сборный угол R5",
          "text": "Скругление R5 под СМЛ 6 и 8 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-r5.webp")
        },
        {
          "id": "sml",
          "title": "Сборный угол из СМЛ",
          "text": "Склеен на производстве, стоит на H-профилях",
          "thumb": asset("/images/product-modal/profiles/img/th-sml.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/str.webp")
  },
  {
    "id": "sml",
    "node": "assembled",
    "fastening": "Скрытое крепление",
    "tab": "Угол из СМЛ",
    "name": "Сборный угол из СМЛ",
    "card": "Склеен на производстве, стоит на H-профилях",
    "thumb": asset("/images/product-modal/profiles/img/th-sml.webp"),
    "kicker": "Сборный угол · скрытое крепление",
    "title": "Сборный угол из СМЛ WINAL™",
    "lead": "Наружный угол из панелей WINAL™ СМЛ, склеенный на производстве специализированным клеем: на объект он приезжает готовым. Стыки угла с соседними панелями держат H-профили скрытого крепления, поэтому крепёж не виден. Есть прямое и радиусное исполнение.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-cube.svg"),
        "title": "Склеен на производстве",
        "text": "Угол приезжает на объект готовым."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-eye-slash.svg"),
        "title": "Крепёж не виден",
        "text": "Стыки держат H-профили скрытого крепления под панелями."
      },
      {
        "icon": asset("/images/product-modal/icons/figma-radius.svg"),
        "title": "Прямой или радиусный",
        "text": "Два исполнения угла из СМЛ."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-squares-four.svg"),
        "title": "СМЛ 6–12 мм",
        "text": "WINAL™ СМЛ 6, 8, 10, <span class=\"nb\">12 мм</span>."
      }
    ],
    "slides": [
      {
        "name": "Прямой угол",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/gsml.html")
      },
      {
        "name": "Радиусный угол",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/gsmlr.html")
      },
      {
        "name": "Вид: прямой",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/r-sml.webp")
      },
      {
        "name": "Вид: радиусный",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/r-smlr.webp")
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "наружный угол"
      },
      {
        "name": "Крепление",
        "value": "скрытое, на H-профилях скрытого крепления"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена"
      },
      {
        "name": "Панели",
        "value": "WINAL™ СМЛ 6 · 8 · 10 · 12 мм"
      },
      {
        "name": "Поставка",
        "value": "угол склеен на производстве"
      },
      {
        "name": "Исполнения",
        "value": "прямой, радиусный"
      }
    ],
    "draw": [],
    "drawCap": "",
    "mountTitle": "Крепление: скрытое",
    "mount": [
      "<b>Угол из СМЛ</b> приходит собранным",
      "<b>H-профили скрытого крепления</b> крепятся к стене дюбелями / саморезами под панелями и держат стыки угла",
      "<b>Радиусный угол:</b> стальной уголок крепится к углу стены дюбелями, на нём держатся H-профили"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Сборные углы",
      "text": "Углы, которые собирают на производстве и привозят готовыми.",
      "items": [
        {
          "id": "ut",
          "title": "Сборный угол Ультратонкий",
          "text": "QBXY под СМЛ 8, 10, 12 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-ut.webp")
        },
        {
          "id": "r5",
          "title": "Сборный угол R5",
          "text": "Скругление R5 под СМЛ 6 и 8 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-r5.webp")
        },
        {
          "id": "str",
          "title": "Сборный угол «Стрела»",
          "text": "QBYJ10 для НГ-панелей",
          "thumb": asset("/images/product-modal/profiles/img/th-str.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/th-sml.webp"),
        "title": "Отделка панели",
        "text": "Угол из тех же панелей WINAL™ СМЛ, что и облицовка."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/sml.webp")
  },
  {
    "id": "qby",
    "node": "outer",
    "fastening": "Скрытое крепление",
    "tab": "QBY",
    "name": "Радиусный внешний угол",
    "card": "QBY9.3 и QBY11.3",
    "thumb": asset("/images/product-modal/profiles/img/th-qby.webp"),
    "kicker": "Угловой профиль · скрытое крепление",
    "title": "Радиусный внешний угол WINAL™",
    "lead": "Профиль наружного угла со скруглением для панелей WINAL™ СМЛ 8 и <span class=\"nb\">10 мм</span>, коды QBY9.3 и QBY11.3. Профиль крепится саморезами через полку в стену и через ногу в соседнюю стену, панели заходят кромками в карманы профиля без клея.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/figma-radius.svg"),
        "title": "Скруглённый угол",
        "text": "Профиль формирует радиусное ребро угла."
      },
      {
        "icon": asset("/images/product-modal/icons/figma-dry-mount.svg"),
        "title": "Панели без клея",
        "text": "Кромки панелей заходят в карманы профиля."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "Крепление на две стены",
        "text": "Саморезы через полку и через ногу."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-stack.svg"),
        "title": "Код по толщине",
        "text": "QBY9.3 для СМЛ <span class=\"nb\">8 мм</span>, QBY11.3 для СМЛ <span class=\"nb\">10 мм</span>."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/gqby.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-qby.webp")
      },
      {
        "name": "Сечение",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/ho3.svg"),
            "alt": "Сечение радиусного угла QBY"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "наружный угол"
      },
      {
        "name": "Крепление",
        "value": "скрытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена"
      },
      {
        "name": "Панели",
        "value": "WINAL™ СМЛ 8 и 10 мм"
      },
      {
        "name": "Коды",
        "value": "QBY9.3 (8 мм), QBY11.3 (10 мм)"
      },
      {
        "name": "Материал",
        "value": "алюминий"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/ho3.svg"),
        "alt": "Сечение радиусного угла QBY"
      }
    ],
    "drawCap": "Сечение профиля, мм",
    "mountTitle": "Крепление: скрытое",
    "mount": [
      "<b>Основание:</b> подготовленная стена",
      "<b>Профиль</b> крепится саморезами: через полку в стену и через ногу в соседнюю стену",
      "<b>Панели</b> заходят кромками в карманы профиля, без клея"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Другие наружные углы",
      "text": "Профили и уголки для наружного угла облицовки.",
      "items": [
        {
          "id": "r10",
          "title": "Угловой профиль R10",
          "text": "Дуга R10 под СМЛ 8 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-r10.webp")
        },
        {
          "id": "pro",
          "title": "Защитный уголок",
          "text": "15 мм, на готовый угол",
          "thumb": asset("/images/product-modal/profiles/img/th-pro.webp")
        },
        {
          "id": "thr",
          "title": "Угловой профиль с порожком",
          "text": "QBDD8.3 под СМЛ 8 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-thr.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/qby.webp")
  },
  {
    "id": "r10",
    "node": "outer",
    "fastening": "Скрытое крепление",
    "tab": "R10",
    "name": "Угловой профиль R10",
    "card": "Дуга R10 под СМЛ 8 мм",
    "thumb": asset("/images/product-modal/profiles/img/th-r10.webp"),
    "kicker": "Угловой профиль · скрытое крепление",
    "title": "Угловой профиль R10 WINAL™",
    "lead": "Декоративный профиль наружного угла с дугой R10 под панели WINAL™ СМЛ <span class=\"nb\">8 мм</span>. Профиль крепится к стене саморезами через ногу, панели заходят торцами в карманы без клея, а дуга закрывает торцы на углу.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/figma-radius.svg"),
        "title": "Дуга R10",
        "text": "Дуга закрывает торцы панелей на углу."
      },
      {
        "icon": asset("/images/product-modal/icons/figma-dry-mount.svg"),
        "title": "Панели без клея",
        "text": "Торцы заходят в карманы профиля."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "Крепление через ногу",
        "text": "Саморезы в стену, крепёж под панелями."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "Под СМЛ 8 мм",
        "text": "Нога <span class=\"nb\">7 мм</span>, уступ <span class=\"nb\">3 мм</span>."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/gr10.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-r10.webp")
      },
      {
        "name": "Сечение",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/ho4.svg"),
            "alt": "Сечение углового профиля R10"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "наружный угол"
      },
      {
        "name": "Крепление",
        "value": "скрытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена"
      },
      {
        "name": "Панели",
        "value": "WINAL™ СМЛ 8 мм"
      },
      {
        "name": "Размеры",
        "value": "R10, нога 7 мм, уступ 3 мм"
      },
      {
        "name": "Материал",
        "value": "алюминий"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/ho4.svg"),
        "alt": "Сечение углового профиля R10"
      }
    ],
    "drawCap": "Сечение профиля, мм",
    "mountTitle": "Крепление: скрытое",
    "mount": [
      "<b>Основание:</b> подготовленная стена",
      "<b>Угол</b> крепится к стене саморезами через ногу",
      "<b>Панели</b> заходят торцами в карманы профиля, без клея"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Другие наружные углы",
      "text": "Профили и уголки для наружного угла облицовки.",
      "items": [
        {
          "id": "qby",
          "title": "Радиусный угол QBY",
          "text": "QBY9.3 и QBY11.3",
          "thumb": asset("/images/product-modal/profiles/img/th-qby.webp")
        },
        {
          "id": "pro",
          "title": "Защитный уголок",
          "text": "15 мм, на готовый угол",
          "thumb": asset("/images/product-modal/profiles/img/th-pro.webp")
        },
        {
          "id": "thr",
          "title": "Угловой профиль с порожком",
          "text": "QBDD8.3 под СМЛ 8 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-thr.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/r10.webp")
  },
  {
    "id": "pro",
    "node": "outer",
    "fastening": "",
    "tab": "Защитный",
    "name": "Защитный алюминиевый уголок",
    "card": "15 мм, на готовый угол",
    "thumb": asset("/images/product-modal/profiles/img/th-pro.webp"),
    "kicker": "Уголок · наружный угол",
    "title": "Защитный алюминиевый уголок WINAL™",
    "lead": "Алюминиевый уголок <span class=\"nb\">15 × 15 мм</span> для наружного угла облицовки. Его ставят на готовый угол после монтажа панелей: уголок закрывает ребро угла.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-squares-four.svg"),
        "title": "Наружный угол",
        "text": "Закрывает ребро готового угла облицовки."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "15 × 15 мм",
        "text": "Стенка <span class=\"nb\">0,8 мм</span>, длина <span class=\"nb\">3 м</span>."
      },
      {
        "icon": asset("/images/product-modal/icons/figma-dry-mount.svg"),
        "title": "После монтажа",
        "text": "Ставится, когда панели уже смонтированы."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-cube.svg"),
        "title": "Алюминий",
        "text": "Металлический уголок под любые панели угла."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/gpro.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-pro.webp")
      },
      {
        "name": "Сечение",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/pro.svg"),
            "alt": "Сечение защитного уголка"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "наружный угол"
      },
      {
        "name": "Основание",
        "value": "готовый угол облицовки"
      },
      {
        "name": "Размеры",
        "value": "15 × 15 мм, стенка 0,8 мм"
      },
      {
        "name": "Материал",
        "value": "алюминий"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/pro.svg"),
        "alt": "Сечение защитного уголка"
      }
    ],
    "drawCap": "Сечение уголка, мм",
    "mountTitle": "Монтаж",
    "mount": [
      "<b>Основание:</b> готовый угол облицовки",
      "<b>Уголок</b> приклеивается на угол после монтажа панелей"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Другие наружные углы",
      "text": "Профили и уголки для наружного угла облицовки.",
      "items": [
        {
          "id": "qby",
          "title": "Радиусный угол QBY",
          "text": "QBY9.3 и QBY11.3",
          "thumb": asset("/images/product-modal/profiles/img/th-qby.webp")
        },
        {
          "id": "r10",
          "title": "Угловой профиль R10",
          "text": "Дуга R10 под СМЛ 8 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-r10.webp")
        },
        {
          "id": "thr",
          "title": "Угловой профиль с порожком",
          "text": "QBDD8.3 под СМЛ 8 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-thr.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/pro.webp")
  },
  {
    "id": "thr",
    "node": "outer",
    "fastening": "Скрытое крепление",
    "tab": "С порожком",
    "name": "Угловой профиль с порожком",
    "card": "QBDD8.3 под СМЛ 8 мм",
    "thumb": asset("/images/product-modal/profiles/img/th-thr.webp"),
    "kicker": "Угловой профиль · переход",
    "title": "Угловой профиль с порожком WINAL™",
    "lead": "Угловой профиль для перехода облицовки с порожком, код QBDD8.3, под панели WINAL™ СМЛ <span class=\"nb\">8 мм</span>. Нижняя панель заходит торцом в карман профиля, панель стены ложится тылом на широкую полку кромкой к порожку.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-split-horizontal.svg"),
        "title": "Переход с порожком",
        "text": "Порожек отделяет кромку панели стены."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-ruler.svg"),
        "title": "Под СМЛ 8 мм",
        "text": "Широкая полка <span class=\"nb\">36 мм</span> под панель стены."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-wrench.svg"),
        "title": "Скрытое крепление",
        "text": "Саморезами в одну сторону или в обе."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-stack.svg"),
        "title": "Код QBDD8.3",
        "text": "Длина профиля <span class=\"nb\">3 м</span>."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/gthr.html")
      },
      {
        "name": "Вид профиля",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-thr.webp")
      },
      {
        "name": "Сечение",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/thr.svg"),
            "alt": "Сечение углового профиля с порожком"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "переход с порожком"
      },
      {
        "name": "Крепление",
        "value": "скрытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена"
      },
      {
        "name": "Панели",
        "value": "WINAL™ СМЛ 8 мм"
      },
      {
        "name": "Код",
        "value": "QBDD8.3"
      },
      {
        "name": "Размеры",
        "value": "18 · 5 · 36 · 6 · 4 · 8 мм"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/thr.svg"),
        "alt": "Сечение углового профиля с порожком"
      }
    ],
    "drawCap": "Сечение профиля, мм",
    "mountTitle": "Крепление: скрытое",
    "mount": [
      "<b>Профиль</b> крепится саморезами в одну сторону или в обе",
      "<b>Нижняя панель</b> заходит торцом в карман профиля",
      "<b>Панель стены</b> ложится тылом на широкую полку, кромкой к порожку"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Другие наружные углы",
      "text": "Профили и уголки для наружного угла облицовки.",
      "items": [
        {
          "id": "qby",
          "title": "Радиусный угол QBY",
          "text": "QBY9.3 и QBY11.3",
          "thumb": asset("/images/product-modal/profiles/img/th-qby.webp")
        },
        {
          "id": "r10",
          "title": "Угловой профиль R10",
          "text": "Дуга R10 под СМЛ 8 мм",
          "thumb": asset("/images/product-modal/profiles/img/th-r10.webp")
        },
        {
          "id": "pro",
          "title": "Защитный уголок",
          "text": "15 мм, на готовый угол",
          "thumb": asset("/images/product-modal/profiles/img/th-pro.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/thr.webp")
  },
  {
    "id": "lumen",
    "node": "light",
    "fastening": "Открытое крепление",
    "tab": "Lumen Line",
    "name": "WINAL™ LUMEN LINE",
    "card": "Световой профиль для шва и углов",
    "thumb": asset("/images/product-modal/profiles/img/th-lm2.webp"),
    "kicker": "Световой профиль · открытое крепление",
    "title": "WINAL™ LUMEN LINE",
    "lead": "Световой профиль для стыков и углов стеновых панелей. В линейке три профиля: H для шва между панелями, L для торца панели у стены и профиль наружного угла. Внутри профиля светодиодная лента под рассеивателем: подсветка выделяет геометрию стены.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-rows.svg"),
        "title": "Свет в шве и на углу",
        "text": "Подсветка стыков и углов панелей."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-squares-four.svg"),
        "title": "Три профиля",
        "text": "H, L и наружный угол в одной системе."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-stack.svg"),
        "title": "QBGD13",
        "text": "H с рассеивателем под панель <span class=\"nb\">12 мм</span>."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-palette.svg"),
        "title": "Окраска по RAL",
        "text": "Цвет корпуса по каталогу RAL."
      }
    ],
    "slides": [
      {
        "name": "H: шов",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/plmh.html")
      },
      {
        "name": "L: торец",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/plml.html")
      },
      {
        "name": "Наружный угол",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/plmu.html")
      },
      {
        "name": "H в сборе",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-lm2.webp")
      },
      {
        "name": "L в сборе",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-lm1.webp")
      },
      {
        "name": "Угол в сборе",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-lm3.webp")
      },
      {
        "name": "Сечения",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/lm2.svg"),
            "alt": "Сечение Lumen Line H"
          },
          {
            "src": asset("/images/product-modal/profiles/sec/lm1.svg"),
            "alt": "Сечение Lumen Line L"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узлы",
        "value": "шов, торец у стены, наружный угол"
      },
      {
        "name": "Крепление",
        "value": "открытое"
      },
      {
        "name": "Профили",
        "value": "H, L, наружный угол"
      },
      {
        "name": "Код",
        "value": "QBGD13: H с рассеивателем, панель 12 мм"
      },
      {
        "name": "Подсветка",
        "value": "светодиодная лента под рассеивателем"
      },
      {
        "name": "Материал",
        "value": "алюминий"
      },
      {
        "name": "Длина",
        "value": "3 м"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/lm2.svg"),
        "alt": "Сечение Lumen Line H"
      }
    ],
    "drawCap": "Сечение профиля H, мм",
    "mountTitle": "Крепление: открытое",
    "mount": [
      "<b>H:</b> профиль крепится к стене дюбелями / саморезами через полки",
      "<b>L:</b> профиль крепится к стене до монтажа панели",
      "<b>Наружный угол:</b> профиль крепится к стене до монтажа панелей"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Свет и рейка",
      "text": "Профили для световых линий и реечных стен.",
      "items": [
        {
          "id": "slat",
          "title": "Профили для реечных панелей",
          "text": "Скрытое крепление, рейка без стыков",
          "thumb": asset("/images/product-modal/profiles/img/th-rslj.webp")
        },
        {
          "id": "el",
          "title": "Т-профиль «Ёлочка»",
          "text": "Декоративный профиль в шов",
          "thumb": asset("/images/product-modal/profiles/img/th-el.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/lumen.webp")
  },
  {
    "id": "slat",
    "node": "light",
    "fastening": "Скрытое крепление",
    "tab": "Реечные панели",
    "name": "Профили для реечных панелей",
    "card": "Скрытое крепление, рейка без стыков",
    "thumb": asset("/images/product-modal/profiles/img/th-rslj.webp"),
    "kicker": "Реечные панели · скрытое крепление",
    "title": "Профили для реечных панелей WINAL™",
    "lead": "Система из трёх отдельных изделий для реечных стен: соединительный профиль, Пи‑профиль для реечных панелей и экран. Профиль крепится к стене саморезами по техпазу, панели заходят пропилом в торце на его полку без клея. Пи‑профиль вклеивается в паз между панелями, поэтому у рейки нет видимых стыков.",
    "feats": [
      {
        "icon": asset("/images/product-modal/icons/phosphor-eye-slash.svg"),
        "title": "Крепёж не виден",
        "text": "Саморезы идут по техпазу в полке профиля."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-rows.svg"),
        "title": "Рейка без стыков",
        "text": "Пи‑профиль вклеивается в паз между панелями."
      },
      {
        "icon": asset("/images/product-modal/icons/figma-dry-mount.svg"),
        "title": "Панели без клея",
        "text": "Панель заходит пропилом в торце на полку профиля."
      },
      {
        "icon": asset("/images/product-modal/icons/phosphor-palette.svg"),
        "title": "Экран для подсветки",
        "text": "Защёлкивается в Пи‑профиль там, где нужен свет."
      }
    ],
    "slides": [
      {
        "name": "Узел монтажа",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/pslj.html")
      },
      {
        "name": "С экраном",
        "kind": "scene",
        "src": asset("/images/product-modal/profiles/scenes/psls.html")
      },
      {
        "name": "Профиль",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-sl1.webp")
      },
      {
        "name": "Пи‑профиль",
        "kind": "img",
        "src": asset("/images/product-modal/profiles/img/s-sl2.webp")
      },
      {
        "name": "Сечения",
        "kind": "svg",
        "svgs": [
          {
            "src": asset("/images/product-modal/profiles/sec/sl1.svg"),
            "alt": "Сечение реечного профиля"
          },
          {
            "src": asset("/images/product-modal/profiles/sec/sl2.svg"),
            "alt": "Сечение «П-шки» QBU8.2"
          }
        ]
      }
    ],
    "specs": [
      {
        "name": "Узел",
        "value": "стык реечных панелей"
      },
      {
        "name": "Крепление",
        "value": "скрытое"
      },
      {
        "name": "Основание",
        "value": "подготовленная стена"
      },
      {
        "name": "Панели",
        "value": "WINAL™ СМЛ 12 мм с пропилом в торце"
      },
      {
        "name": "Изделия",
        "value": "соединительный профиль, Пи‑профиль, экран"
      },
      {
        "name": "Экран",
        "value": "8,2 × 3,6 мм, светопропускающий пластик без отделки"
      },
      {
        "name": "Продажа",
        "value": "каждое изделие отдельно"
      }
    ],
    "draw": [
      {
        "src": asset("/images/product-modal/profiles/sec/sl1.svg"),
        "alt": "Сечение реечного профиля"
      }
    ],
    "drawCap": "Сечение соединительного профиля, мм",
    "mountTitle": "Крепление: скрытое",
    "mount": [
      "<b>Профиль</b> крепится к стене саморезами по техпазу в полке",
      "<b>Панели</b> заходят пропилом в торце на полку профиля, без клея",
      "<b>Пи‑профиль для реечных панелей</b> вклеивается в паз между панелями",
      "<b>Экран</b> защёлкивается в Пи‑профиль там, где нужна подсветка"
    ],
    "prepTitle": "Подготовка стены",
    "prep": [
      "Ровное основание или выровненное штукатуркой, шпаклёвкой",
      "Не более двух неровностей до <span class=\"nb\">4 мм</span> под правилом <span class=\"nb\">2 м</span>",
      "Отклонение от вертикали не более <span class=\"nb\">2 мм</span> на метр, до <span class=\"nb\">5 мм</span> на всю высоту помещения"
    ],
    "rel": {
      "title": "Свет и рейка",
      "text": "Профили для световых линий и реечных стен.",
      "items": [
        {
          "id": "lumen",
          "title": "WINAL™ LUMEN LINE",
          "text": "Световой профиль для шва и углов",
          "thumb": asset("/images/product-modal/profiles/img/th-lm2.webp")
        },
        {
          "id": "el",
          "title": "Т-профиль «Ёлочка»",
          "text": "Декоративный профиль в шов",
          "thumb": asset("/images/product-modal/profiles/img/th-el.webp")
        }
      ]
    },
    "fins": [
      {
        "image": asset("/images/product-modal/profiles/img/f-ral.webp"),
        "title": "Окраска по RAL",
        "text": "Любой цвет по каталогу RAL под отделку стен."
      },
      {
        "image": asset("/images/product-modal/profiles/img/th-sl3.webp"),
        "title": "Экран без отделки",
        "text": "Светопропускающий пластик для подсветки."
      }
    ],
    "cardImage": asset("/images/product-modal/profiles/card/slat.webp")
  }
];

export const profilesById = Object.fromEntries(profiles.map((profile) => [profile.id, profile])) as Record<ProfileId, ProfileData>;
