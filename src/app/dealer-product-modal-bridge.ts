"use client";

import type { CatalogModalSequenceItem } from "@/data/dealer-catalog-modal-sequence";
import type { DealerCatalogAction } from "@/data/dealer-catalog-products";

export type DealerProductModalOpener = (
  action: DealerCatalogAction,
  trigger: HTMLElement,
  sequence?: CatalogModalSequenceItem[],
) => void;

let opener: DealerProductModalOpener | null = null;

export function registerDealerProductModalOpener(next: DealerProductModalOpener | null) {
  opener = next;
}

/** `sequence` overrides the default standalone sequence (used by the profiles hub filter). */
export function openDealerProductModal(
  action: DealerCatalogAction,
  trigger: HTMLElement,
  sequence?: CatalogModalSequenceItem[],
) {
  opener?.(action, trigger, sequence);
}
