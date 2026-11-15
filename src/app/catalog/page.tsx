import type { Metadata } from "next";
import Link from "next/link";
import { InnerPage } from "@/app/site-chrome";
import { CATALOG_VARIANTS } from "@/data/dealer-catalog-page";
import { asset } from "@/lib/asset";

export const metadata: Metadata = { title: "Каталог — варианты страницы" };

const PREVIEW: Record<string, string> = {
  a: asset("/images/catalog/wall-gkl-acryl.webp"),
  b: asset("/images/catalog/card-cloud.webp"),
  c: asset("/images/catalog/card-profiles.webp"),
};

// Review hub: three variants of the catalogue page side by side. One of them will become /catalog.

export default function CatalogVariantsPage() {
  return (
    <InnerPage crumbs={[{ label: "Главная", href: "/" }, { label: "Каталог" }]}>
      <header className="flex flex-col gap-4 pt-4">
        <h1 className="dealer-section-title">Страница каталога: три варианта</h1>
        <p className="dealer-section-lead max-w-[720px]">
          Все три собраны из одних данных: те же разделы, семейства и продукты, что в каталоге главной. Карточки открывают продукт; профили ведут на свои страницы.
        </p>
      </header>
      <ul className="grid gap-6 md:grid-cols-3">
        {CATALOG_VARIANTS.map((variant) => (
          <li key={variant.id}>
            <Link
              href={variant.href}
              className="group flex h-full flex-col overflow-hidden rounded-lg bg-dealer-brand-white transition-shadow hover:shadow-[0_8px_40px_rgba(1,88,171,0.14)]"
              style={{ boxShadow: "var(--dealer-shadow-glass)" }}
            >
              <span className="block aspect-[16/10] overflow-hidden bg-dealer-brand-decoration">
                <img src={PREVIEW[variant.id]} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </span>
              <span className="flex flex-1 flex-col gap-2 p-5">
                <span className="text-xs font-semibold text-dealer-brand-primary">{variant.name}</span>
                <span className="text-xl font-semibold leading-6 text-dealer-text-primary">{variant.title}</span>
                <span className="text-sm font-medium leading-5 text-dealer-text-description">{variant.description}</span>
                <span className="mt-auto pt-3 text-sm font-semibold text-dealer-brand-primary">Открыть →</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </InnerPage>
  );
}
