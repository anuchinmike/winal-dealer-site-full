"use client";

import type { CatalogModalSequenceItem } from "@/data/dealer-catalog-modal-sequence";
import type { DealerCatalogAction } from "@/data/dealer-catalog-products";
import { PROFILE_IDS, PROFILES_HUB_ACTION, profileModalAction } from "@/data/profiles-product-modal";
import { asset } from "@/lib/asset";

export type DealerProductModalOpener = (
  action: DealerCatalogAction,
  trigger: HTMLElement,
  sequence?: CatalogModalSequenceItem[],
) => void;

let opener: DealerProductModalOpener | null = null;
let navigate: ((href: string) => void) | null = null;

export function registerDealerProductModalOpener(next: DealerProductModalOpener | null) {
  opener = next;
}

/** Client router push, registered by <PageNavigatorBridge/> in the root layout. */
export function registerPageNavigator(next: ((href: string) => void) | null) {
  navigate = next;
}

/**
 * Actions that already have their own page in the multi-page version.
 * Opening one navigates to the page instead of showing the modal.
 */
const PAGE_HREF_BY_ACTION: Partial<Record<string, string>> = {
  [PROFILES_HUB_ACTION]: "/catalog/profiles",
  ...Object.fromEntries(PROFILE_IDS.map((id) => [profileModalAction(id), `/catalog/profiles/${id}`])),
};

export function pageHrefForAction(action: DealerCatalogAction): string | undefined {
  return PAGE_HREF_BY_ACTION[action];
}

/** `sequence` overrides the default standalone sequence (used by the profiles hub filter). */
export function openDealerProductModal(
  action: DealerCatalogAction,
  trigger: HTMLElement,
  sequence?: CatalogModalSequenceItem[],
) {
  const href = pageHrefForAction(action);
  if (href) {
    if (navigate) navigate(href);
    else window.location.assign(asset(href));
    return;
  }
  opener?.(action, trigger, sequence);
}
