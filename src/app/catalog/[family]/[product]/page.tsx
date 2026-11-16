import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productLinks, sectionCrumbs } from "@/app/catalog/catalog-pages";
import { ProductPageContent } from "@/app/catalog/product-page";
import { InnerPage } from "@/app/site-chrome";
import { familyHref, findProductPage, productFamilies } from "@/data/product-pages";

type Params = Promise<{ family: string; product: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return productFamilies.flatMap((family) => family.products.map((product) => ({ family: family.id, product: product.id })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { family, product } = await params;
  const found = findProductPage(family, product);
  if (!found) return {};
  return { title: `${found.product.title} — ${found.family.title}`, description: found.product.description };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { family: familyId, product: productId } = await params;
  const found = findProductPage(familyId, productId);
  if (!found) notFound();
  const { family, product } = found;
  return (
    <InnerPage crumbs={sectionCrumbs(family.sectionId, { label: family.title, href: familyHref(family) }, { label: product.shortTitle })}>
      <ProductPageContent product={product} links={productLinks(product, family)} />
    </InnerPage>
  );
}
