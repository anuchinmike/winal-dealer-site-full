import type { Metadata } from "next";
import { InnerPage } from "@/app/site-chrome";
import { CatalogModalsHost, CatalogVariantSwitcher } from "@/app/catalog/catalog-kit";
import { CATALOG_CRUMBS } from "@/app/catalog/catalog-shared";
import { CatalogIndex } from "@/app/catalog/c/catalog-index";
import { CATALOG_PAGE_LEAD, CATALOG_PAGE_TITLE } from "@/data/dealer-catalog-page";

export const metadata: Metadata = { title: `${CATALOG_PAGE_TITLE} — вариант C` };

// Variant C: section filter and search in a glass side panel, every product visible in one grid.

export default function CatalogVariantC() {
  return (
    <InnerPage crumbs={CATALOG_CRUMBS}>
      <header className="flex flex-col gap-4 pt-4">
        <h1 className="dealer-section-title">{CATALOG_PAGE_TITLE}</h1>
        <p className="dealer-section-lead max-w-[720px]">{CATALOG_PAGE_LEAD}</p>
      </header>
      <CatalogIndex />
      <CatalogModalsHost />
      <CatalogVariantSwitcher current="c" />
    </InnerPage>
  );
}
