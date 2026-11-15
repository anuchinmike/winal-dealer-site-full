import type { Metadata } from "next";
import { InnerPage } from "@/app/site-chrome";
import { CatalogModalsHost, CatalogVariantSwitcher, OpenProduct } from "@/app/catalog/catalog-kit";
import { CATALOG_PAGE_LEAD, CATALOG_PAGE_TITLE, catalogPageSections, type CatalogPageEntry } from "@/data/dealer-catalog-page";
import { CATALOG_CRUMBS, SectionChips } from "@/app/catalog/catalog-shared";

export const metadata: Metadata = { title: `${CATALOG_PAGE_TITLE} — вариант A` };

// Variant A: section intro on the left (sticky), light family cards on the right.

export default function CatalogVariantA() {
  return (
    <InnerPage crumbs={CATALOG_CRUMBS}>
      <header className="flex flex-col gap-4 pt-4">
        <h1 className="dealer-section-title">{CATALOG_PAGE_TITLE}</h1>
        <p className="dealer-section-lead max-w-[720px]">{CATALOG_PAGE_LEAD}</p>
      </header>
      <SectionChips />

      {catalogPageSections.map((section) => (
        <section
          key={section.id}
          id={section.anchor}
          aria-labelledby={`${section.anchor}-title`}
          className="grid scroll-mt-24 gap-6 border-t border-dealer-brand-decoration pt-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-10"
        >
          <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-3">
              <img src={section.icon} alt="" width={32} height={32} className="h-8 w-8" />
              <span className="text-sm font-semibold text-dealer-brand-primary">
                {section.label} · {section.productCount}
              </span>
            </div>
            <h2 id={`${section.anchor}-title`} className="text-[28px] font-semibold leading-[1.15] text-dealer-text-primary md:text-[32px]">
              {section.title}
            </h2>
            <p className="text-base font-medium leading-6 text-dealer-text-description">{section.intro}</p>
            <ul className="grid grid-cols-2 gap-3">
              {section.features.map((feature) => (
                <li key={feature.label} className="flex items-center gap-2 rounded-lg bg-dealer-brand-white p-3 text-xs font-semibold leading-4 text-dealer-text-secondary" style={{ boxShadow: "var(--dealer-shadow-video)" }}>
                  <img src={feature.icon} alt="" width={24} height={24} className="h-6 w-6 shrink-0" />
                  {feature.label}
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2">
            {section.entries.map((entry) => (
              <li key={entry.id}>
                <FamilyCard entry={entry} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <CatalogModalsHost />
      <CatalogVariantSwitcher current="a" />
    </InnerPage>
  );
}

function FamilyCard({ entry }: { entry: CatalogPageEntry }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg bg-dealer-brand-white" style={{ boxShadow: "var(--dealer-shadow-glass)" }}>
      <OpenProduct action={entry.action} sequence={entry.sequence} className="group block aspect-[4/3] w-full overflow-hidden bg-dealer-brand-decoration" aria-label={`Открыть ${entry.title}`}>
        <img
          src={entry.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={entry.objectPosition ? { objectPosition: entry.objectPosition } : undefined}
        />
      </OpenProduct>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-xs font-semibold text-dealer-text-muted">{entry.contextTitle}</span>
        <h3 className="text-xl font-semibold leading-6 text-dealer-text-primary">{entry.title}</h3>
        <p className="text-sm font-medium leading-5 text-dealer-text-description">{entry.description}</p>
        {entry.children.length > 0 ? (
          <ul className="flex flex-wrap gap-2 pt-1">
            {entry.children.map((child) => (
              <li key={child.id}>
                <OpenProduct
                  action={child.action}
                  sequence={child.sequence}
                  className="inline-flex min-h-8 items-center rounded border border-[var(--dealer-border-brand-soft)] px-3 text-xs font-semibold text-dealer-brand-primary transition-colors hover:bg-dealer-brand-primary hover:text-dealer-brand-white"
                >
                  {child.shortTitle}
                </OpenProduct>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto pt-2">
          <OpenProduct
            action={entry.action}
            sequence={entry.sequence}
            className="inline-flex h-10 items-center rounded bg-dealer-brand-primary px-6 text-xs font-semibold text-dealer-brand-white transition-opacity hover:opacity-90"
          >
            {entry.children.length > 0 ? `Смотреть серию · ${entry.children.length}` : "Подробнее"}
          </OpenProduct>
        </div>
      </div>
    </article>
  );
}
