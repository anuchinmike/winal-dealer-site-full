import {
  dealerCatalogProductsByTab,
  isDealerCatalogModalAction,
  type DealerCatalogAction,
  type DealerCatalogChild,
  type DealerCatalogProduct,
  type DealerCatalogTabId,
} from "@/data/dealer-catalog-products";
import { getModalNeighborPreview } from "@/data/dealer-modal-neighbor-preview";

export type CatalogModalSequenceItem = {
  id: string;
  action: DealerCatalogAction;
  title: string;
  image?: string;
};

export const CATALOG_TAB_ORDER: readonly DealerCatalogTabId[] = ["wall", "acoustic", "ceiling", "system"];

function sequenceItem(id: string, action: DealerCatalogAction, title: string): CatalogModalSequenceItem {
  const image = getModalNeighborPreview(action);
  return image ? { id, action, title, image } : { id, action, title };
}

export function modalItemsFromChildren(
  children: readonly DealerCatalogChild[] | undefined,
): CatalogModalSequenceItem[] {
  if (!children?.length) {
    return [];
  }

  const items: CatalogModalSequenceItem[] = [];

  for (const child of children) {
    if (isDealerCatalogModalAction(child.action) && child.action) {
      items.push(sequenceItem(child.id, child.action, child.title));
    }
  }

  return items;
}

export function getFamilyModalSequence(product: DealerCatalogProduct): CatalogModalSequenceItem[] {
  return modalItemsFromChildren(product.children);
}

export function getStandaloneModalSequence(
  product: Pick<DealerCatalogProduct, "id" | "action" | "title" | "image">,
): CatalogModalSequenceItem[] {
  if (!isDealerCatalogModalAction(product.action)) {
    return [];
  }

  return [sequenceItem(product.id, product.action, product.title)];
}

/**
 * Sequence for a click that is not a family-card open.
 * Never expands a family just because the same `*_modal` exists as a child
 * on another card of the tab (`cloud_w_modal` is both Cloud child and wall standalone).
 */
export function getStandaloneModalSequenceForAction(
  action: DealerCatalogAction,
  tabProducts: readonly DealerCatalogProduct[],
): CatalogModalSequenceItem[] {
  if (!isDealerCatalogModalAction(action)) {
    return [];
  }

  const topLevel = tabProducts.find((product) => !product.children?.length && product.action === action);
  if (topLevel) {
    return getStandaloneModalSequence(topLevel);
  }

  for (const product of tabProducts) {
    const child = product.children?.find((entry) => entry.action === action);
    if (child && isDealerCatalogModalAction(child.action) && child.action) {
      return [sequenceItem(child.id, child.action, child.title)];
    }
  }

  return [sequenceItem(action, action, action)];
}

/** Whole-tab walk. Do not use for prev/next — sequence is fixed at modal open. */
export function getCatalogModalSequence(tabId: DealerCatalogTabId): CatalogModalSequenceItem[] {
  const items: CatalogModalSequenceItem[] = [];

  for (const product of dealerCatalogProductsByTab[tabId]) {
    if (product.children?.length) {
      items.push(...getFamilyModalSequence(product));
      continue;
    }

    items.push(...getStandaloneModalSequence(product));
  }

  return items;
}

export function resolveCatalogTabForModalAction(
  action: DealerCatalogAction,
  preferredTabId: DealerCatalogTabId,
): DealerCatalogTabId {
  if (getCatalogModalSequence(preferredTabId).some((item) => item.action === action)) {
    return preferredTabId;
  }

  for (const tabId of CATALOG_TAB_ORDER) {
    if (getCatalogModalSequence(tabId).some((item) => item.action === action)) {
      return tabId;
    }
  }

  return preferredTabId;
}
