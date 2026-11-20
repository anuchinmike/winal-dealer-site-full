import Link from "next/link";
import type { Crumb } from "@/app/site-chrome";
import {
  BTN_PRIMARY,
  CardGrid,
  CHIP_LINK,
  GLASS_SHADOW,
  PANEL,
  PANEL_SHADOW,
  SectionHeading,
  type PageCardData,
} from "@/app/catalog/catalog-cards";
import type { ProductPageLinks } from "@/app/catalog/product-page";
import { projectCard, projectsWithProduct } from "@/data/project-pages";
import { catalogPageSections, type CatalogPageSection } from "@/data/dealer-catalog-page";
import type { DealerCatalogTabId } from "@/data/dealer-catalog-products";
import {
  familyHref,
  PAGE_HREF_BY_CATALOG_ID,
  productHref,
  sectionHref,
  type ProductFamily,
  type ProductPageData,
} from "@/data/product-pages";

// Section and family pages of the catalogue, plus the crumbs and links every catalogue page shares.

export const SECTION_IDS = catalogPageSections.map((section) => section.id);

export function findSection(id: string): CatalogPageSection | undefined {
  return catalogPageSections.find((section) => section.id === id);
}

function sectionOf(id: DealerCatalogTabId) {
  return catalogPageSections.find((section) => section.id === id)!;
}

const CATALOG_CRUMBS: Crumb[] = [
  { label: "Главная", href: "/" },
  { label: "Каталог", href: "/catalog" },
];

export function sectionCrumbs(sectionId: DealerCatalogTabId, ...rest: Crumb[]): Crumb[] {
  const section = sectionOf(sectionId);
  return [...CATALOG_CRUMBS, { label: section.label, href: rest.length ? sectionHref(sectionId) : undefined }, ...rest];
}

/** Cards of a catalogue section: families and standalone products, each linking to its page. */
export function sectionCards(section: CatalogPageSection, exceptId?: string): PageCardData[] {
  return section.entries
    .filter((entry) => entry.id !== exceptId && PAGE_HREF_BY_CATALOG_ID[entry.id])
    .map((entry) => ({
      href: PAGE_HREF_BY_CATALOG_ID[entry.id],
      image: entry.image,
      kicker: entry.contextTitle,
      title: entry.title,
      description: entry.description,
      chips: entry.children.map((child) => child.shortTitle.replace(/^WINAL™\s*/, "")),
    }));
}

function productCard(product: ProductPageData): PageCardData {
  return {
    href: productHref(product),
    image: product.cover,
    kicker: product.categoryLabel.charAt(0) + product.categoryLabel.slice(1).toLowerCase(),
    title: product.title,
    description: product.cardDescription,
  };
}

export function productLinks(product: ProductPageData, family?: ProductFamily): ProductPageLinks {
  const section = sectionOf(product.sectionId);
  return {
    siblings: family
      ? {
          title: family.title,
          href: familyHref(family),
          items: family.products.map((item) => ({ id: item.id, title: item.title, shortTitle: item.shortTitle, href: productHref(item) })),
        }
      : undefined,
    projects: projectsWithProduct(product.catalogId).map(projectCard),
    related: {
      title: `Ещё в разделе «${section.label}»`,
      cards: sectionCards(section, family?.catalogId ?? product.catalogId).slice(0, 8),
    },
  };
}

/* ---------- section page ---------- */

export function SectionPageContent({ section }: { section: CatalogPageSection }) {
  return (
    <div className="flex flex-col gap-10 md:gap-16">
      <header className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-end lg:gap-10">
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-3 text-sm font-semibold text-dealer-brand-primary">
            <img src={section.icon} alt="" width={32} height={32} className="size-8" />
            {section.label} · {section.productCount}
          </span>
          <h1 className="dealer-section-title">{section.title}</h1>
          <p className="dealer-section-lead max-w-[720px]">{section.intro}</p>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {section.features.map((feature) => (
            <li key={feature.label} className="flex items-center gap-2 rounded-lg bg-dealer-brand-white p-3 text-xs font-semibold leading-4 text-dealer-text-secondary" style={PANEL_SHADOW}>
              <img src={feature.icon} alt="" width={24} height={24} className="size-6 shrink-0" />
              {feature.label}
            </li>
          ))}
        </ul>
      </header>

      <CardGrid cards={sectionCards(section)} columns={3} />

      <nav aria-label="Другие разделы каталога" className="flex flex-col gap-5">
        <SectionHeading title="Другие разделы" />
        <ul className="flex flex-wrap gap-2">
          {catalogPageSections
            .filter((item) => item.id !== section.id)
            .map((item) => (
              <li key={item.id}>
                <Link href={sectionHref(item.id)} className={`${CHIP_LINK} gap-2`}>
                  <img src={item.icon} alt="" width={20} height={20} className="size-5" />
                  {item.label}
                  <span className="text-dealer-text-description">{item.productCount}</span>
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}

/* ---------- family page ---------- */

/** Spec rows of every product side by side, when the products share at least two rows. */
function comparison(family: ProductFamily) {
  const specs = family.products.map((product) => {
    const block = product.blocks.find((b) => b.kind === "info" && b.rows?.length);
    return new Map((block?.kind === "info" ? block.rows ?? [] : []).map((row) => [row.label, row.value]));
  });
  const labels: string[] = [];
  for (const map of specs) for (const label of map.keys()) if (!labels.includes(label)) labels.push(label);
  const shared = labels.filter((label) => specs.filter((map) => map.has(label)).length >= 2);
  if (family.products.length < 2 || shared.length < 2) return null;
  return { labels: shared, specs };
}

export function FamilyPageContent({ family }: { family: ProductFamily }) {
  const section = sectionOf(family.sectionId);
  const table = comparison(family);
  return (
    <div className="flex flex-col gap-10 md:gap-16">
      <section aria-labelledby="family-title" className="grid gap-4 lg:grid-cols-[minmax(0,548px)_minmax(0,1fr)]">
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-dealer-brand-decoration">
          <img src={family.cover} alt="" className="size-full object-cover" />
        </div>
        <div className={`${PANEL} flex min-w-0 flex-col justify-between gap-8`} style={PANEL_SHADOW}>
          <div className="flex flex-col gap-4">
            <p className="dealer-type-base-medium text-dealer-brand-primary">{family.contextTitle}</p>
            <h1 id="family-title" className="dealer-type-h1 text-dealer-text-primary [text-wrap:balance] max-md:!text-[36px] max-md:!leading-[1.1]">
              {family.title}
            </h1>
            <p className="dealer-type-base-medium text-dealer-text-secondary">{family.description}</p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-dealer-text-description">Продукты серии · {family.products.length}</span>
            <ul className="flex flex-wrap gap-2">
              {family.products.map((product) => (
                <li key={product.id}>
                  <Link href={productHref(product)} className={CHIP_LINK}>
                    {product.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <a href="#project-form" className={BTN_PRIMARY}>
              <span className="dealer-type-mini-semibold">Обсудить проект</span>
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="family-products" className="flex flex-col gap-5">
        <SectionHeading id="family-products" title="Продукты серии" aside={`${family.products.length}`} />
        <CardGrid cards={family.products.map(productCard)} columns={family.products.length === 4 ? 4 : 3} />
      </section>

      {table ? (
        <section aria-labelledby="family-compare" className={`${PANEL} flex flex-col gap-6`} style={GLASS_SHADOW}>
          <SectionHeading id="family-compare" title="Сравнение характеристик" />
          <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr>
                  <th scope="col" className="w-[22%] border-b border-dealer-brand-decoration py-3" />
                  {family.products.map((product) => (
                    <th key={product.id} scope="col" className="dealer-type-mini-semibold border-b border-dealer-brand-decoration px-3 py-3 text-dealer-brand-primary">
                      <Link href={productHref(product)} className="hover:opacity-80">
                        {product.shortTitle}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.labels.map((label) => (
                  <tr key={label}>
                    <th scope="row" className="dealer-type-mini-regular whitespace-pre-line border-b border-dealer-brand-decoration py-3 pr-3 align-top text-dealer-text-description">
                      {label}
                    </th>
                    {table.specs.map((map, i) => (
                      <td key={i} className="dealer-type-mini-semibold whitespace-pre-line border-b border-dealer-brand-decoration px-3 py-3 align-top text-dealer-text-primary">
                        {map.get(label) ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="family-related" className="flex flex-col gap-5">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="family-related" className="dealer-type-h2 text-dealer-text-primary">
            Ещё в разделе «{section.label}»
          </h2>
          <Link href={sectionHref(section.id)} className="text-sm font-semibold text-dealer-brand-primary hover:opacity-80">
            Весь раздел →
          </Link>
        </div>
        <CardGrid cards={sectionCards(section, family.catalogId).slice(0, 8)} columns={4} compact />
      </section>
    </div>
  );
}

