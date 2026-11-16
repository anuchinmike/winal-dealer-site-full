import type { DealerCatalogAction } from "@/data/dealer-catalog-products";
import { wallSmlAcrylModalAssets, wallSmlAcrylProductModal } from "@/data/wall-sml-acryl-product-modal";
import { wallSmlHplModalAssets, wallSmlHplProductModal } from "@/data/wall-sml-hpl-product-modal";
import { wallSmlPolymerModalAssets, wallSmlPolymerProductModal } from "@/data/wall-sml-polymer-product-modal";
import { wallSmlPvcModalAssets, wallSmlPvcProductModal } from "@/data/wall-sml-pvc-product-modal";

// Product pages of the multi-page site: one normalised shape over the product-modal data,
// so the modal and the page read the same texts and pictures.
// Address scheme: /catalog/<family>/<product>/ (plan, «Схема адресов»).

export type ProductFeature = { icon: string; title: string; description: string };
export type ProductSwatch = { id: string; image: string; label: string };
export type ProductCoatingGroup = { chip: string; swatches: readonly ProductSwatch[] };
export type ProductGalleryImage = { src: string; caption: string };

export type ProductPageData = {
  id: string;
  /** Short name for chips and neighbour links. */
  shortTitle: string;
  categoryLabel: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  heroFeatures: readonly ProductFeature[];
  coatingTitle: string;
  coatingGroups: readonly ProductCoatingGroup[];
  specs: { title: string; productName: string; rows: readonly { label: string; value: string }[] };
  ral?: { chart: string; note: string };
  extraFeatures: readonly ProductFeature[];
  gallery: readonly ProductGalleryImage[];
  /** Catalogue action that used to open this product's modal. */
  action: DealerCatalogAction;
};

export type ProductFamily = {
  id: string;
  /** Catalogue family id in dealer-catalog-products. */
  catalogId: string;
  title: string;
  /** Catalogue section the family belongs to (anchor on /catalog). */
  sectionAnchor: string;
  sectionLabel: string;
  products: readonly ProductPageData[];
};

type ModalData = {
  categoryLabel: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  heroFeatures: readonly ProductFeature[];
  coatingTitle: string;
  coatingGroups: readonly ProductCoatingGroup[];
  specs: ProductPageData["specs"];
  ralNote?: string;
  extraFeatures: readonly ProductFeature[];
};

function fromModal(
  id: string,
  shortTitle: string,
  action: DealerCatalogAction,
  modal: ModalData,
  assets: { gallery: readonly ProductGalleryImage[]; ralChart?: string },
): ProductPageData {
  return {
    id,
    shortTitle,
    action,
    categoryLabel: modal.categoryLabel,
    title: modal.title,
    description: modal.description,
    primaryCta: modal.primaryCta,
    secondaryCta: modal.secondaryCta,
    heroFeatures: modal.heroFeatures,
    coatingTitle: modal.coatingTitle,
    coatingGroups: modal.coatingGroups,
    specs: modal.specs,
    ral: modal.ralNote && assets.ralChart ? { chart: assets.ralChart, note: modal.ralNote } : undefined,
    extraFeatures: modal.extraFeatures,
    gallery: assets.gallery,
  };
}

export const productFamilies: readonly ProductFamily[] = [
  {
    id: "wall-sml",
    catalogId: "family-wall-sml",
    title: "Стеновые панели на основе СМЛ",
    sectionAnchor: "section-wall",
    sectionLabel: "Стеновые решения",
    products: [
      fromModal("wall-sml-acryl", "СМЛ Акрил", "wall_sml_acryl_modal", wallSmlAcrylProductModal, wallSmlAcrylModalAssets),
      fromModal("wall-sml-pvc", "СМЛ ПВХ", "wall_sml_pvc_modal", wallSmlPvcProductModal, wallSmlPvcModalAssets),
      fromModal("wall-sml-hpl", "СМЛ HPL", "wall_sml_hpl_modal", wallSmlHplProductModal, wallSmlHplModalAssets),
      fromModal("wall-sml-polymer", "СМЛ Полимер", "wall_sml_polymer_modal", wallSmlPolymerProductModal, wallSmlPolymerModalAssets),
    ],
  },
];

export function productHref(familyId: string, productId: string) {
  return `/catalog/${familyId}/${productId}`;
}

export function findProductPage(familyId: string, productId: string) {
  const family = productFamilies.find((item) => item.id === familyId);
  const product = family?.products.find((item) => item.id === productId);
  return family && product ? { family, product } : undefined;
}

/** Catalogue action → page address, for the modal bridge. */
export const PRODUCT_PAGE_HREF_BY_ACTION: Record<string, string> = Object.fromEntries(
  productFamilies.flatMap((family) => family.products.map((product) => [product.action, productHref(family.id, product.id)])),
);
