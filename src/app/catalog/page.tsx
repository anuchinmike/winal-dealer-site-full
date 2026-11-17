import type { Metadata } from "next";
import { InnerPage } from "@/app/site-chrome";
import { CatalogView } from "@/app/catalog/catalog-view";
import { CATALOG_PAGE_LEAD, CATALOG_PAGE_TITLE } from "@/data/dealer-catalog-page";

export const metadata: Metadata = { title: CATALOG_PAGE_TITLE, description: CATALOG_PAGE_LEAD };

export default function CatalogPage() {
  return (
    <InnerPage crumbs={[{ label: "Главная", href: "/" }, { label: "Каталог" }]}>
      <header className="flex flex-col gap-4 pt-4">
        <h1 className="dealer-section-title">{CATALOG_PAGE_TITLE}</h1>
        <p className="dealer-section-lead max-w-[720px]">{CATALOG_PAGE_LEAD}</p>
      </header>
      <CatalogView />
    </InnerPage>
  );
}
