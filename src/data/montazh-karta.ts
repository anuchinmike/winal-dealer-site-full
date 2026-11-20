import type { DealerCatalogAction } from "@/data/dealer-catalog-products";
import type { ProfileId } from "@/data/profiles-product-modal";
/**
 * Экран «Монтаж панелей WINAL», структура от 27.10.2026 (список Михаила):
 * карточка = область (крепление, стыки, углы, пол, потолок, свет, дверь, торцы), ветка = точка на сцене.
 * Точки названы по виду крепления, не по месту в комнате; акустика отдельной точкой не идёт.
 * Правило производства 19.10: панели к стене не клеятся, монтаж сухой.
 */
export type KartaImage = { src: string; alt: string };

export type KartaSolution = {
  id: string;
  /** Кратко — подпись плитки переключателя. */
  name: string;
  /** Полное название по реестру профилей (src/data/profiles-product-modal.ts) — заголовок на крупном кадре. */
  title?: string;
  /** Карточка профиля в реестре: «Подробнее» открывает её модалку. */
  profile?: ProfileId;
  /** Модалка продукта каталога (плинтусы), если карточки профиля нет. */
  modal?: DealerCatalogAction;
  text: string;
  profiles: string[];
  images: KartaImage[];
  /** Подзаголовок внутри ветки (внешний угол: три группы). */
  group?: string;
  /** Рендера ещё нет: показываем как план, не как готовый выбор. */
  planned?: boolean;
  /** Квадратный крупный кадр из комнаты: sq/sq-<точка>-<sq>.webp. */
  sq?: string;
  /** HTML-сцена узла (как в модалке профиля): при открытии точки показывается слева вместо кадра комнаты (Михаил 13.11). */
  scene?: string;
  /** Важные свойства варианта: заголовок и пояснение. */
  props?: { t: string; s: string }[];
  /** Стеклянные плашки на крупном кадре, x/y в % кадра. */
  plaques?: { x: number; y: number; t: string; s: string; icon?: string }[];
  /** Сравнение двух подходов (точка без карточек профилей): колонки и строки. */
  compare?: { cols: [string, string]; rows: { t: string; a: string; b: string }[] };
  /** Пункты рассказа (точка без карточек профилей). */
  points?: { t: string; s: string }[];
};

export type KartaBranch = {
  id: string;
  name: string;
  /** Короткое пояснение ветки для карточки с несколькими ветками. */
  note?: string;
  /** Заголовок точки вместо названия карточки; тогда надзаголовок — название карточки (плинтусы, потолок). */
  heading?: string;
  /** Точка-рассказ без карточек профилей и плиток. */
  info?: boolean;
  groups?: string[];
  solutions: KartaSolution[];
};

export type KartaCard = {
  key: string;
  title: string;
  /** Одно предложение: что это за сопряжение. */
  intro: string;
  branches: KartaBranch[];
};

export type KartaMarker = {
  /** Номер точки в json рендера: есть крупный кадр «подлёта» fly-<n>. */
  fly?: number;
  id: string;
  card: string;
  branch: string;
  solution?: string;
  label: string;
  x: number;
  y: number;
  depth: number;
};

const img = (name: string, alt: string): KartaImage => ({
  src: `/tech/montazh/nodes/${name}`,
  alt,
});

export const kartaCards: KartaCard[] = [
  {
    key: "A",
    title: "Крепление панелей",
    intro: "Панель WINAL держится в профиле, профиль стоит либо на обрешётке из стоечного профиля ПС, либо прямо на стене. Монтаж сухой, клея под панелями нет.",
    branches: [
      {
        // Точка «Виды крепления панелей» (Михаил 29.10): обрешётка и стена в одной точке, без карточек профилей
        id: "vidy",
        name: "Виды крепления",
        heading: "Виды крепления панелей",
        info: true,
        solutions: [
          {
            id: "dva-podhoda",
            sq: "obreshetka-20261102",
            name: "Обрешётка или стена",
            text: "Все профили WINAL можно ставить и на обрешётку из стоечного профиля ПС, и прямо на стену. Выбор зависит от основания, коммуникаций и того, сколько глубины помещения можно отдать под отделку.",
            profiles: [],
            images: [img("uzel-01.webp", "Профиль на обрешётке из ПС, панели в профиле")],
            compare: {
              cols: ["На обрешётке из ПС", "Прямо на стену"],
              rows: [
                { t: "Основание", a: "Может быть неровным: плоскость выставляет обрешётка", b: "Только подготовленная ровная стена" },
                { t: "Обрешётка", a: "Стойки ПС с шагом 600 мм. Панель до 1220 мм держат профили по краям, средняя стойка поддерживает", b: "Не нужна: профили крепятся к основанию" },
                { t: "Заполнение", a: "Утеплитель или шумопоглощение по желанию заказчика", b: "Нет" },
                { t: "Коммуникации", a: "Проходят внутри обрешётки", b: "Провести нельзя или ограниченно" },
                { t: "Пространство", a: "Обрешётка забирает глубину помещения", b: "Потеря глубины минимальная" },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    key: "B",
    title: "Стыки панелей",
    intro: "Шов между соседними панелями. Открытое крепление оставляет профиль на лице, скрытое прячет его под панелями.",
    branches: [
      {
        id: "open",
        name: "Открытое крепление",
        note: "Профиль виден в шве и становится частью рисунка стены. Панели заводятся в профиль насухо.",
        solutions: [
          {
            id: "omega-t",
            scene: "/images/product-modal/profiles/scenes/t2.html",
            sq: "omega-t",
            profile: "t",
            title: "Омега + Т‑крышка WINAL™",
            name: "Омега + Т",
            text: "Панели стоят в омега-профиле, шов закрывает Т-крышка: прямая или закруглённая. На лице широкая полоса металла.",
            profiles: ["Омега-профиль", "Т-профиль"],
            images: [img("uzel-01.webp", "Стык панелей на омега-профиле с Т-накладкой")],
          },
          {
            id: "h",
            scene: "/images/product-modal/profiles/scenes/xh.html",
            sq: "h",
            profile: "h",
            title: "H‑профиль WINAL™",
            name: "H-профиль",
            text: "Панели заходят в полки H-профиля с двух сторон, на лице остаётся металлическая полоса без крышки.",
            profiles: ["H-профиль"],
            images: [img("uzel-01-b.webp", "Стык панелей на H-профиле")],
          },
          {
            id: "omega-pi",
            scene: "/images/product-modal/profiles/scenes/pi.html",
            sq: "omega-p",
            profile: "pi",
            title: "Омега + Пи‑профиль WINAL™",
            name: "Омега + П",
            text: "В паз омеги защёлкивается узкая П-заглушка заподлицо с полками и закрывает саморезы. На лице узкая полоса.",
            profiles: ["Омега-профиль", "П-заглушка"],
            images: [img("uzel-a-omega-pi.webp", "Стык панелей на омега-профиле с П-заглушкой")],
          },
          {
            id: "omega-t-dekor",
            scene: "/tech/montazh/scenes/t-dekor.html",
            sq: "omega-t-dekor",
            profile: "t",
            title: "Омега + Т‑крышка WINAL™ с декоративной полосой",
            name: "Т с декором",
            text: "В паз омеги защёлкнута Т-крышка, на её полке декоративная полоса СМЛ в декоре панелей. Шов читается рельефной полосой.",
            profiles: ["Омега-профиль", "Т-профиль", "Декоративная полоса СМЛ"],
            images: [img("uzel-a-omega-t-dekor.webp", "Стык панелей на омеге с Т-профилем и декоративной полосой")],
          },
          {
            id: "lumen",
            scene: "/images/product-modal/profiles/scenes/plmh.html",
            sq: "lumen",
            profile: "lumen",
            title: "WINAL™ LUMEN LINE",
            name: "Lumen Line",
            text: "Световой профиль в шве: панели заходят в его полки, вдоль шва идёт световая линия. Это тоже открытое крепление.",
            profiles: ["Lumen Line"],
            images: [img("uzel-h-lumen-shov.webp", "Световой профиль Lumen Line в шве панелей")],
          },
        ],
      },
      {
        id: "hidden",
        name: "Скрытое крепление",
        note: "Профиль под панелями, на лице остаётся только шов. Панели держатся в профиле, клей не используется.",
        solutions: [
          {
            id: "nevidimka",
            scene: "/images/product-modal/profiles/scenes/gnevs.html",
            sq: "nevidimka-soft-20261031",
            profile: "nev",
            title: "Соединительный профиль «Невидимка» WINAL™",
            name: "«Невидимка»",
            text: "Соединительный профиль скрытого крепления: торцы панелей входят в профиль, на лице остаётся шов без накладки. Исполнения профиля представлены в одной карточке продукта.",
            profiles: ["Профиль «невидимка»"],
            images: [img("uzel-b-nevidimka-v1.webp", "Стык панелей на профиле «Невидимка»")],
          },
          {
            id: "mikroshov",
            scene: "/images/product-modal/profiles/scenes/gmic.html",
            sq: "mikro-front-20261105",
            profile: "mic",
            title: "Профиль «Микрошов» WINAL™",
            name: "«Микрошов»",
            text: "Профиль с шипом QBKCG: шип закрывает стык, кромка не нужна. На лице остаётся микрошов. Лист АТР 5.3, вариант 1.",
            profiles: ["«Микрошов»"],
            images: [img("uzel-b-mikroshov.webp", "Стык панелей на профиле «Микрошов»")],
          },
        ],
      },
    ],
  },
  {
    key: "C",
    title: "Внутренний угол",
    intro: "Вогнутое сопряжение двух стен: открытым профилем, скрытым профилем или склеенным элементом из СМЛ.",
    branches: [
      {
        id: "open",
        name: "Открытое крепление",
        note: "Профиль виден в вершине угла, панели заходят в его полки.",
        solutions: [
          {
            id: "qbw",
            scene: "/images/product-modal/profiles/scenes/ginn.html",
            sq: "qbw-20261105",
            profile: "inn",
            title: "Внутренний угол WINAL™",
            name: "Профиль QB-W",
            text: "Профиль внутреннего угла QB-W09 под СМЛ 8 и 10 мм: вогнутое ребро, панели входят в полки с двух сторон. Лист АТР 5.6.",
            profiles: ["Внутренний угол"],
            images: [img("uzel-c-qbw.webp", "Внутренний угол на профиле QB-W")],
          },
          {
            id: "l",
            scene: "/images/product-modal/profiles/scenes/xl.html",
            sq: "l-20261105",
            profile: "l",
            title: "L‑профиль WINAL™",
            name: "L-профиль",
            text: "Кромка панели одной стены заходит в L-профиль, панель соседней стены примыкает к нему. Профиль виден узкой полосой в углу.",
            profiles: ["L-профиль"],
            images: [img("uzel-l-profil.webp", "L-профиль на кромке панели")],
          },
        ],
      },
      {
        // Точка на углу Wisound у выступа (правки 30.10): склеенный угол СМЛ и скрытый L-профиль
        id: "hidden",
        name: "Скрытое крепление",
        note: "Угол без металла на виду: склеенный на производстве элемент из СМЛ или скрытый L-профиль.",
        solutions: [
          {
            id: "skleennyj",
            sq: "skleennyj-20261101",
            profile: "sml",
            title: "Склеенный внутренний угол СМЛ WINAL™",
            name: "Склеенный угол СМЛ",
            text: "Внутренний угол из СМЛ, склеенный на производстве, как и внешний склеенный: полки от 60 до 300 мм, на объект приезжает готовым и встаёт на «невидимки» как обычная панель.",
            profiles: ["Профиль «невидимка»", "Уголок СМЛ"],
            images: [
              img("uzel-b-vnutr-skrytyj.webp", "Внутренний склеенный угол из СМЛ"),
              img("uzel-a-nevidimka-shov.webp", "Вершина склеенного угла крупно"),
            ],
            props: [
              { t: "Полки 60–300 мм", s: "Размер полки под проект" },
              { t: "С производства", s: "Угол склеен на заводе и приезжает готовым" },
              { t: "Любой декор", s: "Из того же СМЛ и декора, что и стена" },
              { t: "Профиля не видно", s: "По бокам угла только шов" },
            ],
          },
          {
            id: "l",
            scene: "/images/product-modal/profiles/scenes/glhu.html",
            profile: "lh",
            title: "L‑профиль скрытого крепления WINAL™",
            name: "L-профиль скрытого крепления",
            text: "Спинка L-профиля крепится к основанию, язык входит в паз кромки панели одной стены, стенка профиля прижата к лицу панели соседней стены. Лист 4.2, узел 4.",
            sq: "l-20261101",
            profiles: ["L-профиль скрытого крепления"],
            images: [img("uzel-4-2-l42-ugol.webp", "Внутренний угол на L-профиле скрытого крепления: спинка на стене, язык в пазу кромки панели")],
          },
        ],
      },
    ],
  },
  {
    key: "D",
    title: "Внешние углы",
    intro: "Выступающее ребро стены или колонны: самое уязвимое место отделки. Решаем его двумя способами: профиль на виду или угол без профиля.",
    branches: [
      {
        // Точка «Сборные углы» (Михаил 29.10): только сборные углы на профиле; F-профиль и накладки — в ветке open.
        // 20.11 (пожелание производства): из сборных углов оставляем только острый внешний угол «Стрела»;
        // 45° и R5 сняты с экрана монтажа (их карточки профилей остаются в хабе профилей).
        id: "sbornye",
        name: "Сборные углы",
        note: "Профиль виден и работает как часть отделки: металл берёт на себя удары, панели заходят в его полки насухо, без клея.",
        solutions: [
          {
            id: "strela",
            scene: "/images/product-modal/profiles/scenes/gstr.html",
            profile: "str",
            title: "Сборный внешний угол «Стрела» WINAL™",
            name: "«Стрела»",
            sq: "strela",
            text: "Панели срезаны под 45° и сходятся в тонкое ребро, профиль «Стрела» держит обе кромки изнутри. Снаружи остаётся узкая линия металла.",
            profiles: ["Профиль «Стрела»"],
            images: [img("uzel-03-strela.webp", "Внешний угол на профиле «Стрела»")],
            props: [
              { t: "Тонкое ребро", s: "Панели сходятся почти вплотную, металла на углу минимум" },
              { t: "Покраска по RAL", s: "Профиль в цвет панели или контрастом" },
              { t: "Печать и ламинация", s: "Полноцветная печать или плёнка в декор панелей" },
              { t: "Сухой монтаж", s: "Кромки держит профиль, без клея" },
            ],
            plaques: [
              { x: 16, y: 30, t: "Тонкое ребро", s: "Минимум металла на углу", icon: "plavnye-linii" },
              { x: 4, y: 66, t: "Цвет профиля", s: "Покраска RAL, печать или ламинация", icon: "ugol-v-cvet" },
            ],
          },
        ],
      },
      {
        // Точка «Внешние углы: открытое крепление» (Михаил 29.10): F-профиль, накладки, R10
        id: "open",
        name: "Открытое крепление",
        note: "Ребро закрывает металл: F-профиль на клею или на уголке, защитный уголок или профиль R10. Металл берёт на себя удары, панели держатся без клея.",
        solutions: [
          {
            id: "f1",
            scene: "/images/product-modal/profiles/scenes/xf1.html",
            profile: "f",
            sq: "f-klej",
            title: "F‑профиль WINAL™ на клею",
            name: "F на клею",
            text: "Панель заходит в полку F-профиля заподлицо, ребро угла закрыто металлом. Профиль на клею, лист АТР 5.1, вариант 1; SKU QBF9, QBF11 или QBF13 по толщине панели.",
            profiles: ["F-профиль"],
            images: [img("uzel-03-f-ugolok.webp", "Внешний угол на F-профиле, вариант 1")],
          },
          {
            id: "f2",
            scene: "/images/product-modal/profiles/scenes/xf2.html",
            profile: "f",
            sq: "f-ugolok",
            title: "F‑профиль WINAL™ на уголке",
            name: "F на уголке",
            text: "Тот же F-профиль, закреплённый на металлическом уголке: лист АТР 5.1, вариант 2. Ребро угла закрыто металлом, панели держатся без клея.",
            profiles: ["F-профиль"],
            images: [img("uzel-03-f2-ugolok.webp", "Внешний угол на F-профиле, вариант 2")],
          },
          {
            id: "zashchitnyj",
            scene: "/images/product-modal/profiles/scenes/gpro.html",
            profile: "pro",
            sq: "zashchitnyj",
            title: "Защитный алюминиевый уголок WINAL™",
            name: "Защитный уголок",
            text: "Защитный металлический уголок поверх панелей: берёт на себя удары тележек и ручной клади.",
            profiles: ["Защитный уголок"],
            images: [img("uzel-03-zashchitnyj.webp", "Внешний угол с защитным уголком")],
          },
          {
            id: "r10",
            scene: "/images/product-modal/profiles/scenes/gr10.html",
            profile: "r10",
            sq: "r10",
            title: "Угловой профиль R10 WINAL™",
            name: "Радиус R10",
            text: "Декоративный профиль наружного угла с дугой R10: дуга закрывает торцы панелей на углу, панели держатся без клея.",
            profiles: ["Угловой профиль R10"],
            images: [img("uzel-03-r10.webp", "Внешний угол на угловом профиле R10")],
          },
        ],
      },
      {
        // Точка на правой колонне «Внешние углы: скрытое крепление» (Михаил 29.10): только склеенные углы
        id: "hidden",
        name: "Скрытое крепление",
        note: "Профиля не видно. Угол склеен на производстве из СМЛ, на стене стоит на скрытом профиле как обычная панель, от крепления остаётся только шов.",
        solutions: [
          {
            id: "sbornyj-r",
            scene: "/images/product-modal/profiles/scenes/gsmlr.html",
            profile: "sml",
            title: "Склеенный угол СМЛ закруглённый WINAL™",
            name: "Закругленный угол",
            sq: "r",
            text: "Готовый скруглённый элемент из того же декора, что и панели, на профиле «невидимка». Стыки по бокам такие же, как на стене.",
            profiles: ["Профиль «невидимка»", "Радиусный элемент СМЛ"],
            images: [img("uzel-03-skleen-r.webp", "Склеенный закруглённый угол на профиле «невидимка»")],
            props: [
              { t: "Плавные линии углов", s: "Ребро скруглено в самой панели, без металла" },
              { t: "Любой декор", s: "Угол из того же СМЛ и декора, что и стена" },
              { t: "Профиля не видно", s: "По бокам угла только шов, как между панелями" },
              { t: "Полки по 60 мм", s: "По АТР, лист 1.18" },
            ],
            // Плашки и тексты из макета Михаила в Figma (1617:1983); x/y — левый верхний угол плашки в % кадра, под ровную камеру Cam_sq_rovno
            plaques: [
              { x: 14, y: 44, t: "Плавные линии углов", s: "Придают интерьеру мягкости", icon: "plavnye-linii" },
              { x: 4, y: 74, t: "Угол в цвет панелей", s: "Смотрится неотделимой частью конструкции", icon: "ugol-v-cvet" },
            ],
          },
          {
            id: "sbornyj-45",
            scene: "/images/product-modal/profiles/scenes/gsml.html",
            profile: "sml",
            title: "Склеенный угол СМЛ прямой WINAL™",
            name: "Прямой угол",
            sq: "pryamoj",
            text: "Две полки СМЛ склеены на производстве в острое ребро и стоят на профиле «невидимка». Угол читается как продолжение панели.",
            profiles: ["Профиль «невидимка»", "Сборный угловой элемент"],
            images: [img("uzel-03-skleen-pryamoj.webp", "Склеенный прямой угол на профиле «невидимка»")],
            props: [
              { t: "Строгая геометрия", s: "Чёткое прямое ребро без накладок" },
              { t: "Без посторонних элементов", s: "На углу нет алюминиевых профилей" },
              { t: "Любой декор", s: "Угол из того же СМЛ и декора, что и стена" },
              { t: "Полки по 60 мм", s: "По АТР, лист 1.18" },
            ],
            plaques: [
              { x: 14, y: 44, t: "Строгая геометрия", s: "Чёткое ребро без накладок", icon: "plavnye-linii" },
              { x: 4, y: 74, t: "Угол в цвет панелей", s: "Смотрится неотделимой частью конструкции", icon: "ugol-v-cvet" },
            ],
          },

        ],
      },
    ],
  },
  {
    key: "E",
    title: "Примыкание к полу",
    intro: "Нижняя кромка облицовки: плинтус WINAL, скрытый L-профиль или открытый L-профиль у пола.",
    branches: [
      {
        // Категория синим — «Примыкание к полу», заголовок — «Виды плинтусов WINAL» (Михаил 29.10); 4 утверждённых плинтуса
        id: "plintus",
        name: "Виды плинтусов",
        heading: "Виды плинтусов WINAL",
        note: "Четыре алюминиевых плинтуса WINAL под стеновые панели: три с ножкой, на которую встаёт панель, и Slim без ножки.",
        solutions: [
          {
            id: "crystal-base",
            sq: "crystal",
            scene: "/tech/montazh/scenes/plintus-crystal.html",
            modal: "crystal_base_wnl_modal",
            title: "Плинтус WINAL™ Crystal Base WNL",
            name: "Crystal Base",
            text: "Тонкая линия примыкания к полу. Плинтус с ножкой, типоразмеры WNL 100/12, 60/8, 60/10, 60/12 и 40/12 подбираются по высоте и толщине панели.",
            profiles: ["Плинтус Crystal Base"],
            images: [img("uzel-e-crystal-base.webp", "Плинтус Crystal Base у пола")],
          },
          {
            id: "strong-base",
            scene: "/tech/montazh/scenes/plintus-strong.html",
            sq: "strong",
            modal: "strong_base_wnl_modal",
            title: "Плинтус WINAL™ Strong Base",
            name: "Strong Base",
            text: "Усиленный плинтус с ножкой: сечение защищает нижнюю кромку панелей от ударов. Для зон с повышенной нагрузкой.",
            profiles: ["Плинтус Strong Base"],
            images: [img("uzel-e-strong-base.webp", "Плинтус Strong Base у пола")],
          },
          {
            id: "slim",
            scene: "/tech/montazh/scenes/plintus-slim.html",
            sq: "slim",
            title: "Плинтус WINAL™ Slim",
            name: "Slim",
            text: "Плинтус BG 70/13 без ножки: ровная теневая линия у пола.",
            profiles: ["Плинтус Slim"],
            images: [img("uzel-e-slim.webp", "Плинтус Slim у пола")],
          },
          {
            id: "mini-base",
            scene: "/tech/montazh/scenes/plintus-mini.html",
            sq: "mini",
            modal: "mini_base_modal",
            title: "Плинтус WINAL™ Mini Base",
            name: "Mini Base",
            text: "Плинтус с ножкой под панели 10 мм: панель встаёт на верхнюю полку плинтуса. Типоразмеры QBTU 10/10 и QBTU 20/10, от пола до полки 10 или 20 мм.",
            profiles: ["Плинтус Mini Base"],
            images: [img("uzel-e-mini-base.webp", "Плинтус Mini Base у пола")],
          },
        ],
      },
      {
        id: "floor",
        name: "Крепление у пола",
        solutions: [
          {
            id: "lh",
            scene: "/images/product-modal/profiles/scenes/glhp.html",
            sq: "hidden",
            profile: "lh",
            title: "L‑профиль скрытого крепления WINAL™",
            name: "Скрытый L",
            text: "Низ панели опирается на L-профиль скрытого крепления: он сидит в пазе панели и закрывает зазор к полу. Снаружи виден только тонкий тёмный шов. Лист 4.2, узел 3.",
            profiles: ["L-профиль скрытого крепления"],
            images: [img("uzel-4-2-l42-pol.webp", "Примыкание панели к полу на L-профиле скрытого крепления, лист 4.2 узел 3")],
          },
          {
            id: "l",
            scene: "/images/product-modal/profiles/scenes/xl.html",
            sq: "open",
            profile: "l",
            title: "L‑профиль WINAL™",
            name: "Открытый L",
            text: "Нижняя кромка панели заходит в полку L-профиля открытого крепления, у пола профиль виден узкой полосой.",
            profiles: ["L-профиль"],
            images: [img("uzel-l-profil.webp", "L-профиль на кромке панели")],
          },
        ],
      },
    ],
  },
  {
    key: "F",
    title: "Примыкание стеновых панелей к потолочным",
    intro: "Верхняя граница стеновой облицовки: как стена заканчивается у потолка и как к ней подходит потолочная система.",
    branches: [
      {
        id: "main",
        name: "Стена и потолок",
        solutions: [
          {
            id: "hidden",
            scene: "/images/product-modal/profiles/scenes/glht-potolok-chern.html",
            sq: "hidden-20261114",
            profile: "lh",
            title: "L‑профиль скрытого крепления WINAL™",
            name: "Скрытый L",
            text: "Край потолочных панелей опирается на L-профиль скрытого крепления у облицованной стены. Стыки стеновых и потолочных панелей скрытые, без накладок на лицевой стороне.",
            profiles: ["L-профиль скрытого крепления"],
            images: [img("uzel-4-2-l42-potolok-wisound-chern.webp", "Стеновые панели и потолок Wisound на L-профиле скрытого крепления")],
          },
          {
            id: "open",
            scene: "/images/product-modal/profiles/scenes/xl-potolok-chern.html",
            sq: "open-20261114",
            profile: "l",
            title: "L‑профиль WINAL™",
            name: "Открытый L",
            text: "Потолочные панели примыкают к облицованной стене через L-профиль открытого крепления. Видимая полка закрывает край потолка.",
            profiles: ["L-профиль"],
            images: [img("uzel-l-profil-potolok-wisound-chern.webp", "Потолок Wisound у облицованной стены на L-профиле")],
          },
          {
            id: "lumen-l",
            scene: "/images/product-modal/profiles/scenes/plml-potolok-chern.html",
            sq: "lumen-20261114",
            profile: "lumen",
            title: "WINAL™ LUMEN LINE, L-профиль",
            name: "Lumen L",
            text: "Непрерывная световая линия Lumen Line между стеновыми и потолочными панелями: стеновая панель верхним торцом заходит в карман профиля.",
            profiles: ["Lumen L"],
            images: [img("uzel-lumen-l-potolok-wisound-chern.webp", "Световой L-профиль Lumen Line между стеной и потолком Wisound")],
          },
        ],
      },
    ],
  },
  {
    key: "G",
    title: "Потолок",
    intro: "Потолочные панели WINAL собираются на подвесной системе или на потолочных профилях. Акустические и гладкие панели крепятся одинаково.",
    branches: [
      {
        // Без карточек профилей (Михаил 29.10): общий рассказ о способах крепления
        id: "kreplenie",
        name: "Крепление",
        heading: "Крепление потолочных панелей",
        info: true,
        solutions: [
          {
            id: "sposoby",
            sq: "kreplenie",
            name: "Способы крепления",
            text: "Потолочные панели держатся в профилях, а профили — на подвесной системе или на потолочных профилях. Способ выбирают по высоте помещения, перекрытию и тому, что нужно спрятать над потолком.",
            profiles: [],
            images: [],
            points: [
              { t: "На подвесах", s: "Несущие профили подвешены к перекрытию на регулируемых подвесах, ими выставляется плоскость потолка. Подходит и для открытого, и для скрытого потолка." },
              { t: "На профилях", s: "Панели заводятся в потолочные профили: открытого крепления (H-профиль, омега с Т-крышкой) или скрытого (несущий скрытый профиль и «невидимка»)." },
            ],
          },
        ],
      },
      {
        id: "open",
        name: "Открытое крепление",
        heading: "Виды открытого крепления потолочных панелей",
        note: "Профиль виден снизу и задаёт сетку швов потолка.",
        solutions: [
          {
            id: "h",
            scene: "/images/product-modal/profiles/scenes/xh-potolok-chern.html",
            sq: "h-20261114",
            profile: "h",
            title: "H‑профиль WINAL™",
            name: "H-профиль",
            text: "Стык потолочных панелей на H-профиле: панели вставляются в полки снизу, профиль задаёт ровную сетку швов.",
            profiles: ["H-профиль", "Подвес"],
            images: [img("uzel-08-wisound-chern.webp", "Стык потолочных панелей Wisound на H-профиле")],
          },
          {
            id: "omega-t",
            scene: "/images/product-modal/profiles/scenes/t2-potolok-chern.html",
            sq: "omega-t-20261114",
            profile: "t",
            title: "Омега + Т‑крышка WINAL™",
            name: "Омега + Т",
            text: "Омега держит панели, Т-крышка закрывает шов снизу.",
            profiles: ["Омега-профиль", "Т-профиль", "Подвес"],
            images: [
              img("uzel-08-b-wisound-chern.webp", "Стык потолочных панелей Wisound на омеге с Т-накладкой"),
              img("uzel-09-b.webp", "Перфорированная панель на омеге с Т-накладкой"),
            ],
          },
        ],
      },
      {
        id: "hidden",
        name: "Скрытое крепление",
        note: "Стыки собраны на «Невидимке», примыкание к стене — на скрытом L-профиле. Крепёж скрыт за панелями.",
        solutions: [
          {
            id: "styk",
            scene: "/images/product-modal/profiles/scenes/gnevs-potolok-chern.html",
            sq: "styk-20261114",
            profile: "nev",
            title: "Соединительный профиль «Невидимка» WINAL™",
            name: "Стык на «невидимке»",
            text: "Стык потолочных панелей на профиле «невидимка»: торцы панелей заходят в его кромки, снизу остаётся только шов. Лист АТР потолков 6.",
            profiles: ["Профиль «невидимка»"],
            images: [],
          },
          {
            id: "u-steny",
            scene: "/images/product-modal/profiles/scenes/glht-potolok-chern.html",
            sq: "u-steny-20261114",
            profile: "lh",
            title: "L‑профиль скрытого крепления WINAL™",
            name: "Примыкание к стене",
            text: "У облицованной стены край потолочной панели собран на L-профиле скрытого крепления. Стеновые и потолочные стыки скрытые, их оси совмещены. Лист АТР потолков 5, разрез А-А.",
            profiles: ["L-профиль скрытого крепления"],
            images: [img("uzel-4-2-l42-potolok-wisound-chern.webp", "Потолок Wisound у стены на L-профиле скрытого крепления")],
          },
        ],
      },
    ],
  },
  {
    key: "H",
    title: "Световой профиль Lumen Line",
    intro: "Где в облицовке стоит световая линия: в шве, в ребре угла, на торце у стены.",
    branches: [
      {
        id: "main",
        name: "Lumen Line",
        solutions: [
          {
            id: "shov",
            scene: "/images/product-modal/profiles/scenes/plmh.html",
            sq: "shov",
            profile: "lumen",
            title: "WINAL™ LUMEN LINE",
            name: "В шве панелей",
            text: "В шов встроен световой профиль Lumen Line: панели заходят в его полки, световая линия идёт по всей высоте шва.",
            profiles: ["Lumen Line"],
            images: [img("uzel-h-lumen-shov.webp", "Световой профиль Lumen Line в шве панелей")],
          },
          {
            id: "ugol",
            scene: "/images/product-modal/profiles/scenes/plmu.html",
            sq: "ugol-20261105",
            profile: "lumen",
            title: "WINAL™ LUMEN LINE, внешний угол",
            name: "В ребре угла",
            text: "Световая линия в ребре угла: профиль держит панели и несёт светильник, свет идёт по всей высоте угла.",
            profiles: ["Lumen Line", "Угловой профиль"],
            images: [img("uzel-03-lumen.webp", "Внешний угол со световой линией Lumen")],
          },
          {
            id: "torec",
            scene: "/images/product-modal/profiles/scenes/plml.html",
            sq: "torec-20261105",
            profile: "lumen",
            title: "WINAL™ LUMEN LINE, L-профиль",
            name: "На торце у стены",
            text: "Торец панели у примыкающей стены закрыт световым профилем Lumen L: между кромкой панели и стеной идёт светящийся рассеиватель.",
            profiles: ["Lumen L"],
            images: [img("uzel-d-lumen-l.webp", "Lumen L между торцом панели и примыкающей стеной")],
          },
        ],
      },
    ],
  },
  {
    key: "I",
    title: "Дверь",
    intro: "Граница панельной стены и короба двери WINAL Invisible. Конструкция двери по альбому двери и АТР.",
    branches: [
      {
        id: "main",
        name: "Дверь и панель",
        solutions: [
          {
            id: "invisible",
            name: "Короб Invisible",
            text: "Полотно выходит в одну плоскость с панелями, наличника нет. Панели примыкают к коробке по контуру проёма, шов такой же, как между панелями стены.",
            profiles: ["Короб Invisible"],
            images: [img("uzel-05.webp", "Дверь Invisible в стене из панелей")],
          },
          {
            id: "sides",
            name: "Боковые и верхнее примыкания",
            text: "Панели по бокам и над проёмом примыкают к коробу через тот же профиль, что и на стене. Разрезы готовятся.",
            profiles: ["Короб Invisible", "Профиль «невидимка»"],
            images: [],
            planned: true,
          },
        ],
      },
    ],
  },
  {
    key: "J",
    title: "Торцы панелей",
    intro: "Вертикальный край облицовки: свободный или у примыкающей стены.",
    branches: [
      {
        id: "main",
        name: "Торец",
        solutions: [
          {
            id: "l",
            scene: "/images/product-modal/profiles/scenes/xl.html",
            sq: "l-20261102",
            name: "L-профиль",
            text: "Открытый торец панели оформляет L-профиль: он держит кромку и закрывает срез СМЛ. Профиль крепится к каркасу, панель заводится в полку.",
            profiles: ["L-профиль"],
            images: [img("uzel-02-b.webp", "L-профиль на торце панели")],
          },
          {
            id: "lumen-l",
            scene: "/images/product-modal/profiles/scenes/plml.html",
            sq: "lumen-20261105",
            name: "Lumen L",
            text: "Торец у примыкающей стены закрыт световым профилем Lumen L: между кромкой панели и стеной светящийся рассеиватель.",
            profiles: ["Lumen L"],
            images: [img("uzel-d-lumen-l.webp", "Lumen L между торцом панели и примыкающей стеной")],
          },
        ],
      },
    ],
  },
];

/** Точки на сцене v15 (points_v15.json, 27.10): x, y в % кадра 2560×1440; depth — мм вдоль оси камеры; fly = номер кадра подлёта fly-<n>. */
export const kartaMarkers: KartaMarker[] = [
  { id: "a-obreshetka", card: "A", branch: "vidy", label: "Виды крепления панелей", x: 16.26, y: 45.71, depth: 10475, fly: 1 },
  { id: "b-open", card: "B", branch: "open", label: "Стыки панелей: открытое крепление", x: 27.46, y: 43.77, depth: 11553, fly: 3 },
  { id: "b-hidden", card: "B", branch: "hidden", label: "Стыки панелей: скрытое крепление", x: 59.31, y: 35.83, depth: 11554, fly: 4 },
  { id: "c-open", card: "C", branch: "open", label: "Внутренний угол: открытое крепление", x: 35.19, y: 38.62, depth: 12487, fly: 5 },
  // Внутренний угол скрытого крепления — угол Wisound у выступа (правки 30.10), на месте бывшей точки «сборный»
  { id: "c-hidden", card: "C", branch: "hidden", label: "Внутренний угол: скрытое крепление", x: 79.24, y: 42.96, depth: 9985, fly: 7 },
  { id: "d-open", card: "D", branch: "sbornye", solution: "strela", label: "Сборные углы", x: 41.9, y: 46.8, depth: 11726, fly: 8 },
  // Внешний угол на F-профиле и накладках: в кадре комнаты такого угла нет — точка на том же ребре колонны ниже, крупный кадр из рендеров узлов
  { id: "d-open-f", card: "D", branch: "open", label: "Внешние углы: открытое крепление", x: 41.9, y: 62, depth: 11726 },
  { id: "d-sbornyj", card: "D", branch: "hidden", label: "Внешние углы: скрытое крепление", x: 73.41, y: 59.61, depth: 8973, fly: 9 },
  { id: "e-plintus", card: "E", branch: "plintus", label: "Виды плинтусов WINAL", x: 21.75, y: 72.99, depth: 10955, fly: 10 },
  { id: "e-open", card: "E", branch: "floor", label: "Примыкание к полу", x: 37.97, y: 71.1, depth: 11000 },
  { id: "f-top", card: "F", branch: "main", label: "Примыкание стеновых панелей к потолочным", x: 29.53, y: 28.78, depth: 11785, fly: 12 },
  { id: "g-kreplenie", card: "G", branch: "kreplenie", label: "Крепление потолочных панелей", x: 20.86, y: 24.26, depth: 10264, fly: 13 },
  { id: "g-open", card: "G", branch: "open", label: "Виды открытого крепления потолочных панелей", x: 39.98, y: 24.3, depth: 9643, fly: 14 },
  { id: "g-hidden", card: "G", branch: "hidden", label: "Потолок: скрытое крепление", x: 65.22, y: 19.87, depth: 8152, fly: 15 },
  { id: "h-lumen", card: "H", branch: "main", label: "Световой профиль Lumen Line", x: 50.97, y: 42.02, depth: 12370, fly: 16 },
  { id: "i-door", card: "I", branch: "main", label: "Дверь и панель", x: 57.78, y: 52.7, depth: 11702, fly: 17 },
  { id: "j-torec", card: "J", branch: "main", label: "Торцы панелей", x: 18.38, y: 56.99, depth: 10548, fly: 18 },
];

/** Кадр комнаты v15 (масштаб 1:1): колонна, выступ со сборными углами 60 мм, внутренние углы на L скрытого крепления. */
export const kartaRoom = {
  src: "/tech/montazh/room-v15-2560.webp",
  srcSet: "/tech/montazh/room-v15-1280.webp 1280w, /tech/montazh/room-v15-2560.webp 2560w",
  width: 2560,
  height: 1440,
  alt: "Комната в разрезе: стены открытого и скрытого крепления, колонна, выступ со сборными углами и потолок на профилях WINAL",
};

/** Крупный кадр «подлёта» к точке: камера сдвинута к узлу. Нет файла — остаётся обычное приближение. */
/** Квадратный крупный кадр варианта; файла ещё нет — компонент берёт кадр подлёта. */
export const sqSrc = (m: KartaMarker, s: KartaSolution, w: 1400 | 700 = 1400) =>
  s.sq ? `/tech/montazh/sq/sq-${m.id}-${s.sq}${w === 700 ? "-700" : ""}.webp` : null;

export const flySrc = (m: KartaMarker) => (m.fly ? `/tech/montazh/fly/fly-${m.fly}-1280.webp` : null);

export const kartaCard = (key: string) =>
  kartaCards.find((c) => c.key === key)!;

export const kartaSolutionCount = (c: KartaCard) =>
  c.branches.reduce((n, b) => n + b.solutions.length, 0);

/** Телефон: три вертикальных кадра 3:4, вырезки из room-v8p-2560 (left в px исходника, ширина 1080). */
export type KartaBlock = { id: "a" | "b" | "c"; title: string; left: number; markers: string[] };

const SRC_W = 2560;
const BLOCK_W = 1080;

export const kartaBlocks: KartaBlock[] = [
  {
    id: "a",
    title: "Левая стена, колонна и открытый потолок",
    left: 150,
    markers: ["j-torec", "a-obreshetka", "g-kreplenie", "f-top", "g-open", "b-open", "c-open", "d-open", "d-open-f", "e-plintus", "e-open"],
  },
  {
    id: "b",
    title: "Задняя стена, дверь и выступ",
    left: 900,
    markers: ["h-lumen", "b-hidden", "i-door", "d-sbornyj"],
  },
  {
    id: "c",
    title: "Правая стена и скрытый потолок",
    left: 1330,
    markers: ["c-hidden", "g-hidden"],
  },
];

export function blockMarkers(block: KartaBlock): KartaMarker[] {
  return block.markers
    .map((id) => kartaMarkers.find((m) => m.id === id))
    .filter((m): m is KartaMarker => Boolean(m))
    .map((m) => ({ ...m, x: (((m.x / 100) * SRC_W - block.left) / BLOCK_W) * 100 }));
}

export const blockImage = (block: KartaBlock) => ({
  src: `/tech/montazh/room-v15-m${block.id}-1080.webp`,
  srcSet: `/tech/montazh/room-v15-m${block.id}-640.webp 640w, /tech/montazh/room-v15-m${block.id}-1080.webp 1080w`,
  width: BLOCK_W,
  height: 1440,
  alt: `Комната, кадр для телефона: ${block.title.toLowerCase()}`,
});
