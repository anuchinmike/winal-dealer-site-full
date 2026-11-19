"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CatalogProductModals } from "@/app/catalog-product-modals";
import { PAGE_HREF_BY_CATALOG_ID } from "@/data/product-pages";
import { openDealerProductModal, pageHrefForAction, registerDealerProductModalOpener } from "@/app/dealer-product-modal-bridge";
import { DealerProductModalNavProvider, type DealerProductModalNavValue } from "@/app/dealer-product-modal-nav";
import { useCatalogCompactLayout } from "@/app/use-catalog-compact-layout";
import type { CatalogModalSequenceItem } from "@/data/dealer-catalog-modal-sequence";
import type { DealerCatalogAction } from "@/data/dealer-catalog-products";

/**
 * Product modals on the catalogue pages. Products that already have their own page
 * (profiles) navigate there through the bridge; the rest open the same modal as on home
 * until their pages exist.
 */
export function CatalogModalsHost() {
  const [action, setAction] = useState<DealerCatalogAction | null>(null);
  const [sequence, setSequence] = useState<CatalogModalSequenceItem[]>([]);
  const [session, setSession] = useState(0);
  const triggerRef = useRef<HTMLElement | null>(null);
  const compact = useCatalogCompactLayout(true);

  useEffect(() => {
    registerDealerProductModalOpener((next, trigger, seq) => {
      triggerRef.current = trigger;
      setSequence(seq?.length ? seq : [{ id: next, action: next, title: "" }]);
      setSession((s) => s + 1);
      setAction(next);
    });
    return () => registerDealerProductModalOpener(null);
  }, []);

  const close = useCallback(() => setAction(null), []);
  const go = useCallback(
    (delta: number) => {
      setAction((cur) => {
        const i = sequence.findIndex((x) => x.action === cur);
        const n = i < 0 ? undefined : sequence[i + delta];
        return n ? n.action : cur;
      });
    },
    [sequence],
  );

  const nav = useMemo<DealerProductModalNavValue>(
    () => ({ currentAction: action, leavingDialogId: null, slideMotion: null, sequence, go }),
    [action, sequence, go],
  );

  return (
    <DealerProductModalNavProvider value={nav}>
      <CatalogProductModals
        modalSession={session}
        compact={compact}
        returnFocusRef={triggerRef}
        isProductModalOpen={(a) => a === action}
        onClose={close}
      />
    </DealerProductModalNavProvider>
  );
}

type OpenProductProps = {
  action: DealerCatalogAction;
  sequence?: CatalogModalSequenceItem[];
  /** Catalogue id of a family or product; its page wins over the action's page. */
  catalogId?: string;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

/** A link when the product has its own page, otherwise a button that opens its modal. */
export function OpenProduct({ action, sequence, catalogId, className, children, ...rest }: OpenProductProps) {
  const href = (catalogId && PAGE_HREF_BY_CATALOG_ID[catalogId]) || pageHrefForAction(action);
  if (href) {
    return (
      <Link href={href} className={className} aria-label={rest["aria-label"]}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={className}
      aria-label={rest["aria-label"]}
      aria-haspopup="dialog"
      onClick={(event) => openDealerProductModal(action, event.currentTarget, sequence)}
    >
      {children}
    </button>
  );
}
