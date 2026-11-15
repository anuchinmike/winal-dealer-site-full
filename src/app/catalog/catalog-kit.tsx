"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { CatalogProductModals } from "@/app/catalog-product-modals";
import { openDealerProductModal, pageHrefForAction, registerDealerProductModalOpener } from "@/app/dealer-product-modal-bridge";
import { DealerProductModalNavProvider, type DealerProductModalNavValue } from "@/app/dealer-product-modal-nav";
import { useCatalogCompactLayout } from "@/app/use-catalog-compact-layout";
import type { CatalogModalSequenceItem } from "@/data/dealer-catalog-modal-sequence";
import type { DealerCatalogAction } from "@/data/dealer-catalog-products";
import { CATALOG_VARIANTS, type CatalogVariantId } from "@/data/dealer-catalog-page";

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
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

/** A link when the product has its own page, otherwise a button that opens its modal. */
export function OpenProduct({ action, sequence, className, children, ...rest }: OpenProductProps) {
  const href = pageHrefForAction(action);
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

/** Floating switcher between the catalogue page variants (review only). */
export function CatalogVariantSwitcher({ current }: { current: CatalogVariantId }) {
  return (
    <nav
      aria-label="Варианты страницы каталога"
      className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/40 bg-white/60 p-1 text-xs font-semibold backdrop-blur-[20px]"
      style={{ boxShadow: "var(--dealer-shadow-glass)" }}
    >
      <Link href="/catalog" className="rounded-full px-3 py-2 text-dealer-text-description transition-colors hover:text-dealer-brand-primary">
        Варианты
      </Link>
      {CATALOG_VARIANTS.map((variant) => {
        const active = variant.id === current;
        return (
          <Link
            key={variant.id}
            href={variant.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "rounded-full bg-dealer-brand-primary px-4 py-2 text-dealer-brand-white"
                : "rounded-full px-4 py-2 text-dealer-text-secondary transition-colors hover:text-dealer-brand-primary"
            }
          >
            {variant.id.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
