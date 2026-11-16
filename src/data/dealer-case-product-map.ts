import { asset } from "@/lib/asset";
import {
  getCatalogEntryById,
  isDealerCatalogModalAction,
  type DealerCatalogAction,
} from "@/data/dealer-catalog-products";

const CASE_TILE_IMAGES = asset("/images/catalog/case-tiles");

/** Survives `sync-dealer-cases.py`. Keys match `DealerCaseProductTile.productLabel`. */
export const caseProductCatalogIdByLabel: Record<string, string> = {
  "WINAL™ СМЛ HPL": "wall-sml-hpl",
  "WINAL™ СМЛ ПВХ": "wall-sml-pvc",
  "WINAL™ Invisible Basic СМЛ РЕВЕРС": "invisible-reverse",
  "UFR печать": "ufr",
  "WINAL Cloud System I": "cloud-i",
  "WINAL Cloud System B": "cloud-b",
  "WINAL Wisound": "family-wisound",
  "WINAL Soundcore 25": "soundcore-25",
  "ПАНЕЛИ WINAL™ СМЛ Полимер": "wall-sml-polymer",
  "ПРОФИЛЬ WINAL™ ОЦИНКОВАННЫЙ": "mounting-profiles",
};

export type ResolvedCaseProductTile = {
  catalogId: string;
  action: DealerCatalogAction;
  image: string;
  canOpenModal: boolean;
};

export function resolveCaseProductTile(productLabel: string): ResolvedCaseProductTile | null {
  const catalogId = caseProductCatalogIdByLabel[productLabel];
  if (!catalogId) {
    return null;
  }

  const entry = getCatalogEntryById(catalogId);
  if (!entry) {
    return null;
  }

  return {
    catalogId,
    action: entry.action,
    image: `${CASE_TILE_IMAGES}/${catalogId}.webp`,
    canOpenModal: isDealerCatalogModalAction(entry.action),
  };
}
