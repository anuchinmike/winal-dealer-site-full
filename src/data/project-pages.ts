import { caseProductCatalogIdByLabel } from "@/data/dealer-case-product-map";
import { dealerCaseCategoryChips, dealerCases, type DealerCase } from "@/data/dealer-cases";
import { allProductPages, PAGE_HREF_BY_CATALOG_ID } from "@/data/product-pages";

// Project (case) pages of the multi-page site: /projects and /projects/<slug>.

export type ProjectProduct = { label: string; categoryLabel: string; image: string; href?: string };

export const projectCategories = dealerCaseCategoryChips.filter((chip) => dealerCases.some((item) => item.categoryId === chip.id));

export const projectHref = (project: Pick<DealerCase, "slug">) => `/projects/${project.slug}`;

export function findProject(slug: string) {
  return dealerCases.find((item) => item.slug === slug);
}

const HREF_EXTRA: Record<string, string> = { "mounting-profiles": "/catalog/profiles" };

export function projectProducts(project: DealerCase): ProjectProduct[] {
  return project.products.map((tile) => {
    const catalogId = caseProductCatalogIdByLabel[tile.productLabel];
    const page = catalogId ? allProductPages.find((product) => product.catalogId === catalogId) : undefined;
    return {
      label: tile.productLabel.replace(/^ПАНЕЛИ\s+|^ПРОФИЛЬ\s+/, ""),
      categoryLabel: tile.categoryLabel,
      image: page?.cover ?? tile.image,
      href: catalogId ? (PAGE_HREF_BY_CATALOG_ID[catalogId] ?? HREF_EXTRA[catalogId]) : undefined,
    };
  });
}

/** Projects that used a catalogue product (by catalogue id). */
export function projectsWithProduct(catalogId: string) {
  return dealerCases.filter((item) => item.products.some((tile) => caseProductCatalogIdByLabel[tile.productLabel] === catalogId));
}

export function projectCard(project: DealerCase) {
  return {
    href: projectHref(project),
    image: project.galleryThumb,
    kicker: project.galleryCategoryLabel,
    title: project.title,
    description: project.description,
  };
}

export { dealerCases as projects };
