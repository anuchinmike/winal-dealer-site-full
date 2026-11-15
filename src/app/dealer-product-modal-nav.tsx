"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import type { DealerCatalogAction } from "@/data/dealer-catalog-products";
import type { CatalogModalSequenceItem } from "@/data/dealer-catalog-modal-sequence";

export type ProductModalSlideMotion = {
  /** 1 = next (old left, new from right); -1 = prev. */
  dir: 1 | -1;
  /** Track X of the leaving card. Entering is always x + dir * width. */
  x: number;
  width: number;
  animating: boolean;
};

export type DealerProductModalNavValue = {
  currentAction: DealerCatalogAction | null;
  leavingDialogId: string | null;
  slideMotion: ProductModalSlideMotion | null;
  sequence: CatalogModalSequenceItem[];
  go: (delta: number, options?: { slide?: boolean; fromX?: number; width?: number }) => void;
};

export const PRODUCT_MODAL_SLIDE_MS = 300;
export const PRODUCT_MODAL_SLIDE_CLEAR_MS = 380;
export const PRODUCT_MODAL_SLIDE_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

const DealerProductModalNavContext = createContext<DealerProductModalNavValue | null>(null);

/** Figma 1519:1673 / 1514:1625 Glass arrows, visual bounds. */
export const PRODUCT_NAV_TRIANGLE_WIDTH = 28;
export const PRODUCT_NAV_TRIANGLE_HEIGHT = 64;
const PRODUCT_NAV_SCREEN_INSET_COMPACT = 4;
const PRODUCT_NAV_SCREEN_INSET_DESKTOP = 8;
/** Figma 1513:1576: visual box sits 8px outside the product-page edge. */
const PRODUCT_NAV_MODAL_OUTSIDE = 8;
const PRODUCT_NAV_COMPACT_SCALE = 0.8;
const PRODUCT_NAV_MIN_HIT = 44;

const GLASS_ARROW_SRC = {
  prev: "/images/catalog/glass-arrow-left.svg",
  next: "/images/catalog/glass-arrow-right.svg",
} as const;

let pendingEnterX = 0;
let pendingExit: { fromX: number; toX: number } | null = null;

export function queueProductModalEnterX(x: number) {
  pendingEnterX = x;
}

export function peekProductModalEnterX() {
  return pendingEnterX;
}

export function takeProductModalEnterX() {
  const x = pendingEnterX;
  pendingEnterX = 0;
  return x;
}

export function queueProductModalExit(fromX: number, toX: number) {
  pendingExit = { fromX, toX };
}

export function peekProductModalExit() {
  return pendingExit;
}

export function takeProductModalExit() {
  const value = pendingExit;
  pendingExit = null;
  return value;
}

export function DealerProductModalNavProvider({
  value,
  children,
}: {
  value: DealerProductModalNavValue;
  children: ReactNode;
}) {
  return <DealerProductModalNavContext.Provider value={value}>{children}</DealerProductModalNavContext.Provider>;
}

export function useDealerProductModalNav() {
  return useContext(DealerProductModalNavContext);
}

function GlassArrow({ direction, compact }: { direction: "prev" | "next"; compact: boolean }) {
  const scale = compact ? PRODUCT_NAV_COMPACT_SCALE : 1;
  const width = PRODUCT_NAV_TRIANGLE_WIDTH * scale;
  const height = PRODUCT_NAV_TRIANGLE_HEIGHT * scale;

  return (
    <span className="dealer-product-modal-nav-glyph relative block overflow-visible" style={{ width, height }}>
      <img
        src={GLASS_ARROW_SRC[direction]}
        alt=""
        width={PRODUCT_NAV_TRIANGLE_WIDTH}
        height={PRODUCT_NAV_TRIANGLE_HEIGHT}
        className="pointer-events-none block max-w-none"
        style={{ width, height }}
      />
    </span>
  );
}

export function ProductModalNavButton({
  direction,
  label,
  compact,
  dialogRef,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  compact: boolean;
  dialogRef: RefObject<HTMLDivElement | null>;
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  const scale = compact ? PRODUCT_NAV_COMPACT_SCALE : 1;
  const visualHeight = PRODUCT_NAV_TRIANGLE_HEIGHT * scale;
  const [edge, setEdge] = useState<CSSProperties>(
    compact
      ? isPrev
        ? { left: PRODUCT_NAV_SCREEN_INSET_COMPACT }
        : { right: PRODUCT_NAV_SCREEN_INSET_COMPACT }
      : isPrev
        ? { left: PRODUCT_NAV_SCREEN_INSET_DESKTOP }
        : { right: PRODUCT_NAV_SCREEN_INSET_DESKTOP },
  );

  useLayoutEffect(() => {
    const place = () => {
      if (compact) {
        setEdge(
          isPrev
            ? { left: PRODUCT_NAV_SCREEN_INSET_COMPACT, right: "auto" }
            : { left: "auto", right: PRODUCT_NAV_SCREEN_INSET_COMPACT },
        );
        return;
      }

      const screenInset = PRODUCT_NAV_SCREEN_INSET_DESKTOP;
      const viewport = window.innerWidth;
      const rect = dialogRef.current?.getBoundingClientRect();

      if (!rect) {
        setEdge(isPrev ? { left: screenInset, right: "auto" } : { left: "auto", right: screenInset });
        return;
      }

      if (isPrev) {
        setEdge({
          left: Math.max(screenInset, rect.left - PRODUCT_NAV_MODAL_OUTSIDE),
          right: "auto",
        });
        return;
      }

      setEdge({
        left: "auto",
        right: Math.max(screenInset, viewport - rect.right - PRODUCT_NAV_MODAL_OUTSIDE),
      });
    };

    place();
    window.addEventListener("resize", place);
    const node = dialogRef.current;
    const observer = node ? new ResizeObserver(place) : null;
    if (node) {
      observer?.observe(node);
    }
    return () => {
      window.removeEventListener("resize", place);
      observer?.disconnect();
    };
  }, [compact, dialogRef, isPrev]);

  return (
    <button
      type="button"
      data-product-modal-nav={direction}
      aria-label={label}
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`dealer-product-modal-nav-btn pointer-events-auto fixed top-1/2 z-20 flex w-11 shrink-0 -translate-y-1/2 items-center overflow-visible text-dealer-brand-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dealer-brand-primary ${
        isPrev ? "justify-start" : "justify-end"
      }`}
      style={{ ...edge, height: Math.max(PRODUCT_NAV_MIN_HIT, visualHeight) }}
    >
      <GlassArrow direction={direction} compact={compact} />
    </button>
  );
}
