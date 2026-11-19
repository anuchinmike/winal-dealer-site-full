import type { Metadata } from "next";
import Link from "next/link";
import { BTN_PRIMARY, CHIP_LINK, GLASS_SHADOW, PANEL, PANEL_SHADOW } from "@/app/catalog/catalog-cards";
import { InnerPage } from "@/app/site-chrome";
import { documentGroups, type DealerDocument } from "@/data/documents";

const TITLE = "Документы";
const LEAD = "Сертификаты, презентации по типам объектов, каталоги продуктов и регламенты WINAL. Для проектировщиков, снабжения и заказчиков.";

export const metadata: Metadata = { title: `${TITLE} WINAL`, description: LEAD };

function DocumentCard({ item }: { item: DealerDocument }) {
  return (
    <li className="flex h-full flex-col overflow-hidden rounded-lg bg-dealer-brand-white" style={GLASS_SHADOW}>
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="group flex flex-1 flex-col">
        <span className="block aspect-[3/4] w-full overflow-hidden border-b border-dealer-brand-decoration bg-dealer-brand-decoration">
          <img src={item.cover} alt="" loading="lazy" className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
        </span>
        <span className="flex flex-1 flex-col gap-2 p-4">
          <span className="text-base font-semibold leading-5 text-dealer-text-primary group-hover:text-dealer-brand-primary">{item.title}</span>
          <span className="text-xs font-medium leading-4 text-dealer-text-description">{item.meta}</span>
          <span className="mt-auto pt-2 text-xs font-semibold text-dealer-brand-primary">PDF, {item.size} ↗</span>
        </span>
      </a>
      {item.productHref ? (
        <Link href={item.productHref} className="border-t border-dealer-brand-decoration px-4 py-3 text-xs font-semibold text-dealer-text-secondary hover:text-dealer-brand-primary">
          Продукт в каталоге →
        </Link>
      ) : null}
    </li>
  );
}

export default function DocumentsPage() {
  return (
    <InnerPage crumbs={[{ label: "Главная", href: "/" }, { label: TITLE }]}>
      <header className="flex flex-col gap-4 pt-4">
        <h1 className="dealer-section-title">{TITLE}</h1>
        <p className="dealer-section-lead max-w-[720px]">{LEAD}</p>
      </header>

      <nav aria-label="Разделы документов">
        <ul className="flex flex-wrap gap-2">
          {documentGroups.map((group) => (
            <li key={group.id}>
              <a href={`#${group.id}`} className={`${CHIP_LINK} gap-2`}>
                {group.title}
                <span className="text-dealer-text-description">{group.items.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-12 md:gap-16">
        {documentGroups.map((group) => (
          <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="flex scroll-mt-8 flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 id={`${group.id}-title`} className="dealer-type-h2 text-dealer-text-primary">
                {group.title}
              </h2>
              <p className="max-w-[720px] text-base font-medium leading-6 text-dealer-text-description">{group.lead}</p>
            </div>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 xl:grid-cols-5">
              {group.items.map((item) => (
                <DocumentCard key={item.id} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section aria-labelledby="documents-request" className={`${PANEL} flex flex-col gap-5 md:flex-row md:items-center md:justify-between`} style={PANEL_SHADOW}>
        <div className="flex max-w-[720px] flex-col gap-2">
          <h2 id="documents-request" className="dealer-type-h2 text-dealer-text-primary">
            Нужен документ, которого нет в списке?
          </h2>
          <p className="text-base font-medium leading-6 text-dealer-text-description">
            Протоколы пожарных и акустических испытаний, технические карты, паспорта качества на партию и узлы для проекта. Напишите, что нужно, и мы
            пришлём.
          </p>
        </div>
        <a href="#project-form" className={`${BTN_PRIMARY} shrink-0`}>
          <span className="dealer-type-mini-semibold">Запросить документы</span>
        </a>
      </section>
    </InnerPage>
  );
}
