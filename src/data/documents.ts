import { asset } from "@/lib/asset";

/**
 * Documents page. Files are served from winal.ru/docs (the manufacturer keeps them current); the cover is the first page of each PDF.
 * Certificates as checked on 26.10.2026 (winal-legal-compliance/docs/certificate-review.md). Left out: the fire-resistant partition
 * certificate (printed term ended 10.06.2026) and the ГСП/ГСПВ fire certificate (it covers the gypsum base by another manufacturer, not the WINAL panel).
 */

export type DealerDocument = {
  id: string;
  title: string;
  /** Number and term printed on the document, or a short note. */
  meta: string;
  href: string;
  cover: string;
  size: string;
  /** Catalogue page of the product the document covers. */
  productHref?: string;
};

export type DocumentGroup = { id: string; title: string; lead: string; items: DealerDocument[] };

const UP = "https://winal.ru/wp-content/uploads";
const cover = (file: string) => asset(`/images/documents/${file}.webp`);

const doc = (id: string, title: string, meta: string, path: string, size: string, productHref?: string): DealerDocument => ({
  id,
  title,
  meta,
  href: `${UP}/${path}`,
  cover: cover(path.split("/").pop()!.replace(/\.pdf$/, "")),
  size,
  productHref,
});

export const documentGroups: DocumentGroup[] = [
  {
    id: "certificates",
    title: "Сертификаты соответствия",
    lead: "Копии сертификатов на панели WINAL. Номер и срок указаны по документу. Оригиналы, приложения и актуальный статус в реестре подтверждаем по запросу.",
    items: [
      doc("sml-pvc", "Панели WINAL на СМЛ с ПВХ-покрытием", "RU C-RU.ЭО30.В.00444/22 · до 17.04.2027", "2024/05/sertifikat-sml-pvh.pdf", "3,6 МБ", "/catalog/wall-sml"),
      doc("sml-decor", "Панели WINAL на СМЛ, декоративные покрытия", "RU C-RU.НВ88.В.00037/25 · до 26.08.2030", "2023/07/sertifikat-sml-dekor.pdf", "0,8 МБ", "/catalog/wall-sml"),
      doc("gkl-acryl", "Панели WINAL на ГКЛ с акриловым покрытием", "RU C-RU.АД67.В.00532/23 · до 22.10.2028", "2024/05/sertifikat-gkl-akril-winal.pdf", "3,6 МБ", "/catalog/wall-gkl"),
      doc("gkl-pvc", "Панели WINAL на ГКЛ с ПВХ-покрытием", "RU C-RU.АД67.В.00488/23 · до 26.03.2028", "2024/05/gkl-pvh-sertifikat.pdf", "3,9 МБ", "/catalog/wall-gkl"),
      doc("gvlv-pvc", "Панели WINAL на ГВЛВ с ПВХ-покрытием", "RU C-RU.АД67.В.00487/23 · до 26.03.2028", "2024/05/sertifikat-gvlv-pvh.pdf", "3,9 МБ"),
      doc("gsp-pvc", "Панели WINAL на ГСП с ПВХ-покрытием", "RU C-RU.АД67.В.00495/23 · до 21.05.2028", "2024/05/sertifikat-gsp-pvh.pdf", "3,9 МБ", "/catalog/wall-gsp"),
      doc("acoustic", "Акустические панели WINAL", "RU C-RU.ЭО30.В.00518/22 · до 27.12.2027", "2024/05/akustika-sertifikat-v00158-22.pdf", "3,5 МБ", "/catalog/acoustic"),
    ],
  },
  {
    id: "presentations",
    title: "Презентации по типам объектов",
    lead: "Решения WINAL для конкретных объектов: требования, подходящие панели и примеры. Удобно приложить к письму заказчику или в проект.",
    items: [
      doc("med", "Медицинские учреждения", "Стеновые и потолочные решения · 30 страниц", "2025/01/med_panel_present.pdf", "10,5 МБ"),
      doc("edu", "Детские и образовательные учреждения", "Стеновые и потолочные панели · 28 страниц", "2025/01/obrazovanie_panel_present.pdf", "10 МБ"),
      doc("office", "Офисы и бизнес-центры", "Стеновые и потолочные решения · 28 страниц", "2025/01/office_panel_present.pdf", "10 МБ"),
      doc("sport", "Спортивные объекты", "Стеновые и потолочные решения · 28 страниц", "2025/01/sport_panel_present.pdf", "10,1 МБ"),
      doc("renovation", "Отели, жилые комплексы и реновация", "Стеновые и потолочные решения · 32 страницы", "2025/01/renovazia_panel_present.pdf", "11,3 МБ"),
    ],
  },
  {
    id: "products",
    title: "Каталоги продуктов",
    lead: "Отдельные брошюры по продуктам с характеристиками и вариантами исполнения.",
    items: [
      doc("minwin", "Минеральные панели MINWIN", "Брошюра · 10 страниц", "2026/08/minwin_web.pdf", "3,5 МБ", "/catalog/minwin"),
      doc("rhythm", "WINAL Rhythm Wall", "Брошюра · 4 страницы", "2026/08/rhythm_wall_web.pdf", "1,5 МБ", "/catalog/rythmwall"),
      doc("invisible", "Скрытые двери WINAL Invisible", "Брошюра · 12 страниц", "2026/08/dveri_winal_invisible_web.pdf", "3,2 МБ", "/catalog/invisible"),
    ],
  },
  {
    id: "regulations",
    title: "Регламенты",
    lead: "Правила, которые нужно соблюдать на объекте, чтобы сохранить гарантию.",
    items: [
      doc("transport", "Транспортировка, погрузка, разгрузка и хранение панелей", "Технический регламент · 1 страница", "2024/01/reglament-transportirovki.pdf", "0,6 МБ"),
    ],
  },
];
