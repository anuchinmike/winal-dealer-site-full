import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FamilyPageContent, findSection, productLinks, SECTION_IDS, sectionCrumbs, SectionPageContent } from "@/app/catalog/catalog-pages";
import { ProductPageContent } from "@/app/catalog/product-page";
import { InnerPage } from "@/app/site-chrome";
import { findFamily, findStandalone, productFamilies, standaloneProducts } from "@/data/product-pages";

// One address level under /catalog: a section (/catalog/wall), a family (/catalog/wall-sml)
// or a product without a family (/catalog/rythmwall).

type Params = Promise<{ family: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return [...SECTION_IDS, ...productFamilies.map((family) => family.id), ...standaloneProducts.map((product) => product.id)].map((family) => ({ family }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { family: slug } = await params;
  const section = findSection(slug);
  if (section) return { title: `${section.label} — каталог WINAL`, description: section.intro };
  const family = findFamily(slug);
  if (family) return { title: `${family.title} — каталог WINAL`, description: family.description };
  const product = findStandalone(slug);
  if (product) return { title: `${product.title} — каталог WINAL`, description: product.description };
  return {};
}

export default async function CatalogSlugPage({ params }: { params: Params }) {
  const { family: slug } = await params;

  const section = findSection(slug);
  if (section) {
    return (
      <InnerPage crumbs={sectionCrumbs(section.id)}>
        <SectionPageContent section={section} />
      </InnerPage>
    );
  }

  const family = findFamily(slug);
  if (family) {
    return (
      <InnerPage crumbs={sectionCrumbs(family.sectionId, { label: family.title })}>
        <FamilyPageContent family={family} />
      </InnerPage>
    );
  }

  const product = findStandalone(slug);
  if (!product) notFound();
  return (
    <InnerPage crumbs={sectionCrumbs(product.sectionId, { label: product.shortTitle })}>
      <ProductPageContent product={product} links={productLinks(product)} />
    </InnerPage>
  );
}
