'use client'

import {
  DEALER_MOTION_FAST_DURATION_CLASS,
  DEALER_MOTION_EASING_CLASS,
  DEALER_MOTION_REDUCE_CLASS,
  dealerMotionOpacityTransform,
  dealerMotionTransform,
} from "@/app/dealer-motion";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { clamp, useDealerHorizontalRail } from "@/app/dealer-horizontal-scroll";
import { CatalogProductModals } from "@/app/catalog-product-modals";
import { DealerProductModalNavProvider, PRODUCT_MODAL_SLIDE_CLEAR_MS, type ProductModalSlideMotion } from "@/app/dealer-product-modal-nav";
import { openDealerProductModal, pageHrefForAction, registerDealerProductModalOpener } from "@/app/dealer-product-modal-bridge";
import {
  getFamilyModalSequence,
  getStandaloneModalSequence,
  getStandaloneModalSequenceForAction,
  type CatalogModalSequenceItem,
} from "@/data/dealer-catalog-modal-sequence";
import {
  isDealerCatalogModalAction,
  type DealerCatalogAction,
  type DealerCatalogChild,
  type DealerCatalogProduct,
  type DealerCatalogTabId,
} from "@/data/dealer-catalog-products";
import { CATALOG_MODAL_DIALOG_ID } from "@/data/dealer-catalog-modal-registry";

const CATALOG_CARD_GRADIENT_START = "10%";
const catalogCardGradient = (transparentColor: string) =>
  `linear-gradient(180deg, ${transparentColor} ${CATALOG_CARD_GRADIENT_START}, var(--dealer-color-text-primary) 100%)`;

type CatalogPaginationAssets = {
  active: string;
  inactive: string;
};

type CatalogStandaloneCard = DealerCatalogProduct & {
  kind: "product";
};

type CatalogParentCard = DealerCatalogProduct & {
  kind: "parent";
  children: DealerCatalogChild[];
};

type CatalogParentChildLink = {
  id: string;
  label: string;
};

function getParentChildLinks(card: CatalogParentCard): CatalogParentChildLink[] {
  if (card.children.length === 0) {
    return [];
  }

  return card.children.map((child) => ({
    id: child.id,
    label: child.listTitle,
  }));
}

type CatalogVisibleCard = CatalogStandaloneCard | CatalogParentCard;

const CARD_WIDTH = 216;
const HOVER_CARD_WIDTH = 312;
const CARD_GAP = 16;
const TRACK_STEP = CARD_WIDTH + CARD_GAP;
const HOVER_X_OFFSET = (HOVER_CARD_WIDTH - CARD_WIDTH) / 2;
const CLOSE_DELAY_MS = 80;

function findTrackIndexForProduct(
  productId: string,
  visibleProducts: CatalogVisibleCard[],
  canLoop: boolean,
  preferredIndex: number | null,
) {
  const baseIndex = visibleProducts.findIndex((product) => product.id === productId);

  if (baseIndex < 0) {
    return preferredIndex;
  }

  if (!canLoop) {
    return baseIndex;
  }

  const candidates = [baseIndex, baseIndex + visibleProducts.length];

  if (preferredIndex === null) {
    return baseIndex;
  }

  return candidates.reduce((best, candidate) =>
    Math.abs(candidate - preferredIndex) < Math.abs(best - preferredIndex) ? candidate : best,
  );
}

function formatCounter(value: number) {
  return String(value).padStart(2, "0");
}

function CatalogTopBlock({ card }: { card: CatalogVisibleCard }) {
  return (
    <div className="relative z-[1] flex w-full flex-col gap-2 text-dealer-brand-decoration">
      <p className="dealer-text-trim text-base font-medium uppercase leading-[18px]">{card.contextTitle}</p>
      <p className="dealer-text-trim text-xs font-normal leading-[0.85]">{card.contextSubtitle}</p>
    </div>
  );
}

function CatalogPrimaryButton({
  onClick,
  dialogId,
  action,
}: {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  dialogId?: string;
  action: DealerCatalogAction;
}) {
  const isModalAction = isDealerCatalogModalAction(action);
  const isFamilyExpand = action === "family_expand";
  const isDisabled = !isModalAction && !isFamilyExpand;
  const opensDialog = Boolean(dialogId) && (isModalAction || isFamilyExpand);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-haspopup={opensDialog ? "dialog" : undefined}
      aria-controls={opensDialog ? dialogId : undefined}
      className="catalog-card-primary-btn inline-flex items-center justify-center self-start rounded border border-dealer-brand-decoration px-6 py-3 text-xs font-medium leading-normal text-dealer-brand-decoration transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
    >
      Подробнее
    </button>
  );
}

function CatalogInlineAction({
  label,
  icon,
  align = "start",
  onClick,
}: {
  label: string;
  icon: string;
  align?: "start" | "end";
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isAnimating = !prefersReducedMotion && (isHovered || isFocused);
  const isLeftAlignedIcon = align === "end";
  const pulseAnimation = isAnimating ? { scale: [1, 1.05, 1.02] } : { scale: 1 };
  const pulseTransition = isAnimating
    ? { duration: 0.8, ease: "easeInOut" as const, repeat: Infinity }
    : { duration: 0.15, ease: "easeOut" as const };

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick(event);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`catalog-card-inline-action inline-flex items-center gap-4 rounded-[4px] text-xs font-medium leading-normal text-dealer-brand-decoration transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 ${
        align === "end" ? "w-full justify-end" : "justify-start"
      }`}
      aria-label={label}
    >
      {isLeftAlignedIcon ? (
        <motion.span animate={pulseAnimation} transition={pulseTransition} className="inline-flex">
          <img src={icon} alt="" width={12} height={10} className="h-[10px] w-3 rotate-180" />
        </motion.span>
      ) : null}

      <motion.span animate={pulseAnimation} transition={pulseTransition} className="dealer-text-trim inline-flex">
        {label}
      </motion.span>

      {!isLeftAlignedIcon ? (
        <motion.span animate={pulseAnimation} transition={pulseTransition} className="inline-flex">
          <img src={icon} alt="" width={12} height={10} className="h-[10px] w-3" />
        </motion.span>
      ) : null}
    </button>
  );
}

function CatalogParentChildrenSummary({
  card,
  actionIcon,
  isHovered,
  onOpenFamilyModal,
}: {
  card: CatalogParentCard;
  actionIcon: string;
  isHovered: boolean;
  onOpenFamilyModal: (parentId: string, trigger: HTMLElement, childId?: string) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const childLinks = getParentChildLinks(card);
  const revealTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: "easeOut" as const };
  const itemTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.16, ease: "easeOut" as const };

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <AnimatePresence initial={false}>
        {isHovered ? (
          <motion.div
            key={`${card.id}-children`}
            initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={revealTransition}
            className="flex w-full flex-col items-start gap-2 overflow-hidden"
          >
            {childLinks.map((child, index) => (
              <motion.div
                key={child.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...itemTransition,
                  delay: prefersReducedMotion ? 0 : index * 0.04,
                }}
                className="flex w-full flex-col items-start gap-2"
              >
                <button
                  type="button"
                  className="catalog-child-link self-start text-left text-xl font-medium leading-none text-dealer-brand-decoration transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                  onClick={(event) => {
                    event.stopPropagation();
                    onOpenFamilyModal(card.id, event.currentTarget, child.id);
                  }}
                >
                  {child.label}
                </button>
                {index < childLinks.length - 1 ? (
                  <div className="h-px w-full bg-[rgba(241,241,241,0.45)]" aria-hidden="true" />
                ) : null}
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <CatalogInlineAction
        label="Подробнее о продуктах"
        icon={actionIcon}
        onClick={(event) => onOpenFamilyModal(card.id, event.currentTarget)}
      />
    </div>
  );
}

function CatalogCardBody({
  card,
  actionIcon,
  isHovered,
  onOpenFamilyModal,
  onPrimaryAction,
  primaryDialogId,
}: {
  card: CatalogVisibleCard;
  actionIcon: string;
  isHovered: boolean;
  onOpenFamilyModal: (parentId: string, trigger: HTMLElement, childId?: string) => void;
  onPrimaryAction?: (event: MouseEvent<HTMLButtonElement>) => void;
  primaryDialogId?: string;
}) {
  const productTitle = card.title;
  const productDescription = card.description;

  return (
    <>
      <CatalogTopBlock card={card} />

      <div className="relative z-[1] flex w-full flex-col catalog-card-content-stack">
        {card.kind === "parent" ? (
          <CatalogParentChildrenSummary
            card={card}
            actionIcon={actionIcon}
            isHovered={isHovered}
            onOpenFamilyModal={onOpenFamilyModal}
          />
        ) : null}

        <div className="flex w-full flex-col catalog-card-content-stack">
          <div className="flex flex-col gap-4">
            <p className="catalog-card-title dealer-text-trim text-[32px] font-semibold leading-none text-dealer-brand-decoration">
              {productTitle}
            </p>
            <p className="text-base font-medium leading-normal text-dealer-brand-decoration">{productDescription}</p>
          </div>

          <CatalogPrimaryButton
            onClick={
              card.kind === "parent"
                ? (event) => {
                    event.stopPropagation();
                    onOpenFamilyModal(card.id, event.currentTarget);
                  }
                : onPrimaryAction
            }
            dialogId={primaryDialogId}
            action={card.action}
          />
        </div>
      </div>
    </>
  );
}

function CatalogBaseCard({
  card,
  actionIcon,
  isDimmed,
  isHovered,
  eager,
  onOpenFamilyModal,
  onPrimaryAction,
  primaryDialogId,
}: {
  card: CatalogVisibleCard;
  actionIcon: string;
  isDimmed: boolean;
  isHovered: boolean;
  eager?: boolean;
  onOpenFamilyModal: (parentId: string, trigger: HTMLElement, childId?: string) => void;
  onPrimaryAction?: (event: MouseEvent<HTMLButtonElement>) => void;
  primaryDialogId?: string;
}) {
  return (
    <article
      tabIndex={0}
      data-catalog-card-id={card.id}
      className="catalog-base-card relative w-[216px] shrink-0 overflow-visible outline-none"
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-lg transition-opacity duration-[100ms] ease-out motion-reduce:transition-none ${
          isDimmed ? "opacity-0" : "opacity-100"
        }`}
        style={{ boxShadow: "var(--dealer-shadow-video)" }}
      >
        {/* Crop + objectPosition are baked into the WebP. Do not re-apply card.objectPosition. */}
        <img
          src={card.image}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div
          className="catalog-card-inner relative flex h-full flex-col justify-between px-6"
          style={{
            background: catalogCardGradient("rgba(0, 9, 18, 0)"),
          }}
        >
          <CatalogCardBody
            card={card}
            actionIcon={actionIcon}
            isHovered={isHovered}
            onOpenFamilyModal={onOpenFamilyModal}
            onPrimaryAction={onPrimaryAction}
            primaryDialogId={primaryDialogId}
          />
        </div>
      </div>
    </article>
  );
}

function CatalogHoverCard({
  card,
  actionIcon,
  isActive,
  isHovered,
  left,
  onOpenFamilyModal,
  onPrimaryAction,
  primaryDialogId,
}: {
  card: CatalogVisibleCard;
  actionIcon: string;
  isActive: boolean;
  isHovered: boolean;
  left: number;
  onOpenFamilyModal: (parentId: string, trigger: HTMLElement, childId?: string) => void;
  onPrimaryAction?: (event: MouseEvent<HTMLButtonElement>) => void;
  primaryDialogId?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [isExpanded, setIsExpanded] = useState(() => Boolean(prefersReducedMotion));

  useLayoutEffect(() => {
    if (prefersReducedMotion) {
      setIsExpanded(true);
      return;
    }

    setIsExpanded(false);
    const frame = window.requestAnimationFrame(() => {
      setIsExpanded(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  const showExpanded = isActive && isExpanded;

  return (
    <article
      className={`catalog-hover-card absolute top-0 w-[312px] overflow-visible ${dealerMotionTransform} ${
        showExpanded ? "pointer-events-auto z-30" : "pointer-events-none z-10"
      }`}
      style={{
        left,
        transform: showExpanded ? "translateY(0)" : "translateY(8px)",
      }}
    >
      <div
        className={`absolute inset-0 origin-center rounded-lg backdrop-blur-[10px] ${dealerMotionOpacityTransform} motion-reduce:transform-none ${
          showExpanded ? "opacity-100 [transform:scaleX(1)_scaleY(1)]" : "opacity-0 [transform:scaleX(0.692)_scaleY(0.921)]"
        }`}
        style={{
          background: "var(--dealer-surface-glass-panel)",
          boxShadow: "var(--dealer-shadow-glass)",
        }}
      />

      <div
        className={`relative flex h-full w-full items-center justify-center p-2 transition-opacity duration-[300ms] ease-out motion-reduce:transition-none ${
          showExpanded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`catalog-card-inner relative flex h-full w-[296px] origin-center flex-col justify-between overflow-hidden rounded-lg px-4 ${dealerMotionTransform} motion-reduce:transform-none ${
            showExpanded ? "[transform:scaleX(1)_scaleY(1)]" : "[transform:scaleX(0.771)_scaleY(0.959)]"
          }`}
        >
          <img
            src={card.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background: catalogCardGradient("rgba(255, 255, 255, 0)"),
            }}
          />
          <CatalogCardBody
            card={card}
            actionIcon={actionIcon}
            isHovered={isHovered}
            onOpenFamilyModal={onOpenFamilyModal}
            onPrimaryAction={onPrimaryAction}
            primaryDialogId={primaryDialogId}
          />
        </div>
      </div>
    </article>
  );
}

const SCROLL_HINT_GREEN = "rgba(7, 172, 106, 0.95)";

function CatalogMouseHint({ isPlaying, visible }: { isPlaying: boolean; visible: boolean }) {
  return (
    <div className="flex h-6 w-10 items-center rounded-full border border-[rgba(7,172,106,0.7)] p-1">
      <motion.div
        className="h-[3px] w-2.5 rounded-full bg-[rgba(7,172,106,0.95)]"
        animate={isPlaying ? { x: [0, 16, 0], opacity: [0.95, 0.35, 0.95] } : { x: 0, opacity: visible ? 0.95 : 0.35 }}
        transition={isPlaying ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
      />
    </div>
  );
}

function CatalogFingerHint({ isPlaying }: { isPlaying: boolean }) {
  return (
    <motion.svg
      width={32}
      height={32}
      viewBox="0 0 24 24"
      fill="none"
      className="overflow-visible"
      animate={isPlaying ? { x: [-7, 7, -7] } : { x: 0 }}
      transition={isPlaying ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
    >
      <path
        d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"
        stroke={SCROLL_HINT_GREEN}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"
        stroke={SCROLL_HINT_GREEN}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"
        stroke={SCROLL_HINT_GREEN}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L8 15"
        stroke={SCROLL_HINT_GREEN}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function CatalogScrollHint({
  visible,
  className,
  animated = true,
  variant = "mouse",
}: {
  visible: boolean;
  className?: string;
  /** `false` при prefers-reduced-motion: подсказка остаётся видимой, но без цикла. */
  animated?: boolean;
  variant?: "mouse" | "finger";
}) {
  const isPlaying = visible && animated;

  return (
    <div
      className={`catalog-scroll-hint flex items-center justify-center transition-opacity ${DEALER_MOTION_FAST_DURATION_CLASS} ${DEALER_MOTION_EASING_CLASS} ${DEALER_MOTION_REDUCE_CLASS} ${
        visible ? "opacity-100" : "opacity-0"
      } ${className ?? ""}`}
      data-scroll-hint={variant}
      aria-hidden={!visible}
    >
      {variant === "finger" ? (
        <CatalogFingerHint isPlaying={isPlaying} />
      ) : (
        <CatalogMouseHint isPlaying={isPlaying} visible={visible} />
      )}
    </div>
  );
}

function CatalogPagination({
  activeIndex,
  total,
  assets,
  showHint,
  hintAnimated = true,
  hintVariant = "mouse",
}: {
  activeIndex: number;
  total: number;
  assets: CatalogPaginationAssets;
  showHint: boolean;
  hintAnimated?: boolean;
  hintVariant?: "mouse" | "finger";
}) {
  return (
    <div className="catalog-pagination-shell mt-auto shrink-0 flex w-full items-end justify-between gap-8 overflow-visible">
      <div className="catalog-pagination-counter-row inline-grid auto-cols-max grid-flow-col gap-x-8 items-end">
        <p className="catalog-pagination-counter dealer-text-trim shrink-0 text-xl font-medium leading-none text-dealer-text-description">
          <span className="text-dealer-brand-secondary">{formatCounter(activeIndex + 1)}</span>
          <span>{` - ${formatCounter(total)}`}</span>
        </p>
        <div className="catalog-pagination-dots flex min-w-0 items-center gap-8 self-center overflow-hidden">
          {Array.from({ length: total }).map((_, index) => (
            <img
              key={index}
              src={index === activeIndex ? assets.active : assets.inactive}
              alt=""
              width={50}
              height={8}
              className="h-2 w-[50px] shrink-0"
            />
          ))}
        </div>
      </div>
      <CatalogScrollHint visible={showHint} animated={hintAnimated} variant={hintVariant} className="self-center" />
    </div>
  );
}

export function CatalogProductRail({
  products,
  paginationAssets,
  actionIcon,
  wheelEnabled = true,
  mode = "overlay",
  tabId: _tabId = "wall",
}: {
  products: DealerCatalogProduct[];
  paginationAssets: CatalogPaginationAssets;
  actionIcon: string;
  wheelEnabled?: boolean;
  /**
   * `overlay` — принятая desktop-механика: transform-track, wheel/autoscroll,
   * hover-карточка поверх ленты. Используется главной страницей.
   * `stack` — touch/compact: нативная горизонтальная прокрутка со snap,
   * без hover-слоя и без перехвата колеса.
   */
  mode?: "overlay" | "stack";
  tabId?: DealerCatalogTabId;
}) {
  const isStack = mode === "stack";
  // Opt-in signal for every product modal: only /catalog's compact/stack
  // composition switches modals to the compact shell; desktop overlay mode
  // never sets this, so the homepage (variant=page) is untouched.
  const compact = isStack;
  const prefersReducedMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null);
  const [isRailInteractive, setIsRailInteractive] = useState(false);
  const [activeModalAction, setActiveModalAction] = useState<DealerCatalogAction | null>(null);
  const [leavingModalAction, setLeavingModalAction] = useState<DealerCatalogAction | null>(null);
  const [slideMotion, setSlideMotion] = useState<ProductModalSlideMotion | null>(null);
  const [modalSession, setModalSession] = useState(0);
  const [modalSequence, setModalSequence] = useState<CatalogModalSequenceItem[]>([]);
  const modalTriggerRef = useRef<HTMLElement | null>(null);
  const pointerClientXRef = useRef<number | null>(null);
  const isPointerOverRailRef = useRef(false);
  const activeTrackIndexRef = useRef<number | null>(null);
  const syncHoverToPointerRef = useRef<() => void>(() => {});
  const suppressPointerSyncRef = useRef(false);

  const visibleProducts = useMemo(() => {
    return products.map<CatalogVisibleCard>((product) => {
      if (product.children?.length) {
        return {
          ...product,
          kind: "parent",
          children: product.children,
        };
      }

      return { ...product, kind: "product" };
    });
  }, [products]);

  // В stack-режиме лентой управляет нативный скроллер, поэтому transform-движок выключен.
  const loopWidth = isStack ? 0 : visibleProducts.length * TRACK_STEP;
  const maxOffset = isStack ? 0 : Math.max(loopWidth - viewportWidth, 0);
  const canLoop = !isStack && loopWidth > viewportWidth && viewportWidth > 0;

  const trackProducts = useMemo(
    () => (canLoop ? [...visibleProducts, ...visibleProducts] : visibleProducts),
    [canLoop, visibleProducts],
  );

  const { scrollZoneRef, renderOffset, renderOffsetRef } = useDealerHorizontalRail({
    loopWidth,
    maxOffset,
    loop: canLoop,
    autoScroll: canLoop && wheelEnabled,
    isHovered: isRailInteractive,
    prefersReducedMotion: Boolean(prefersReducedMotion),
    enableWheel: wheelEnabled && !isStack,
    onRenderOffsetChange: () => syncHoverToPointerRef.current(),
  });

  const [stackScrollProgress, setStackScrollProgress] = useState(0);
  const [isStackScrollable, setIsStackScrollable] = useState(false);

  const updateViewportWidth = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    setViewportWidth(viewport.clientWidth);
  }, []);

  useEffect(() => {
    updateViewportWidth();

    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      updateViewportWidth();
    });

    observer.observe(viewport);
    observer.observe(track);

    return () => {
      observer.disconnect();
    };
  }, [updateViewportWidth]);

  useEffect(() => {
    updateViewportWidth();
  }, [updateViewportWidth, visibleProducts.length]);

  /**
   * Stack: пагинация и подсказка берут прогресс из нативного scrollLeft.
   * В overlay-режиме эти состояния не читаются, поэтому сбрасывать их не нужно.
   */
  useEffect(() => {
    const viewport = viewportRef.current;

    if (!isStack || !viewport) {
      return;
    }

    const update = () => {
      const scrollableWidth = viewport.scrollWidth - viewport.clientWidth;
      setIsStackScrollable(scrollableWidth > 1);
      setStackScrollProgress(scrollableWidth > 1 ? clamp(viewport.scrollLeft / scrollableWidth, 0, 1) : 0);
    };

    update();
    viewport.addEventListener("scroll", update, { passive: true });

    if (typeof ResizeObserver === "undefined") {
      return () => viewport.removeEventListener("scroll", update);
    }

    const observer = new ResizeObserver(update);
    observer.observe(viewport);

    return () => {
      viewport.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [isStack, visibleProducts.length]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const getIndexFromPointer = useCallback(
    (clientX: number) => {
      const rail = railRef.current;

      if (!rail || visibleProducts.length === 0) {
        return null;
      }

      const railRect = rail.getBoundingClientRect();
      const offset = renderOffsetRef.current;
      const maxIndex = canLoop ? visibleProducts.length * 2 : visibleProducts.length;

      let best: number | null = null;
      let bestDistance = Infinity;

      for (let index = 0; index < maxIndex; index += 1) {
        const screenLeft = railRect.left + index * TRACK_STEP - offset;

        if (clientX < screenLeft || clientX > screenLeft + CARD_WIDTH) {
          continue;
        }

        const distance = Math.abs(clientX - (screenLeft + CARD_WIDTH / 2));

        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      }

      return best;
    },
    [canLoop, visibleProducts.length],
  );

  const activateCard = useCallback(
    (trackIndex: number | null) => {
      clearCloseTimer();
      activeTrackIndexRef.current = trackIndex;
      setActiveTrackIndex(trackIndex);
      setActiveProductId(
        trackIndex === null ? null : (visibleProducts[trackIndex % visibleProducts.length]?.id ?? null),
      );
      setIsRailInteractive(true);
    },
    [clearCloseTimer, visibleProducts],
  );

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      activeTrackIndexRef.current = null;
      setActiveTrackIndex(null);
      setActiveProductId(null);
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const syncHoverToPointer = useCallback(() => {
    if (isStack) {
      return;
    }

    if (suppressPointerSyncRef.current || !isPointerOverRailRef.current || pointerClientXRef.current === null) {
      return;
    }

    const nextIndex = getIndexFromPointer(pointerClientXRef.current);

    if (nextIndex !== activeTrackIndexRef.current) {
      activateCard(nextIndex);
    }
  }, [activateCard, getIndexFromPointer, isStack]);

  syncHoverToPointerRef.current = syncHoverToPointer;

  useLayoutEffect(() => {
    if (isStack) {
      return;
    }

    const productId = activeProductId;

    if (!productId) {
      return;
    }

    const currentIndex = activeTrackIndexRef.current;
    const currentProductId =
      currentIndex === null ? null : visibleProducts[currentIndex % visibleProducts.length]?.id;

    if (currentProductId === productId) {
      return;
    }

    const nextIndex = findTrackIndexForProduct(productId, visibleProducts, canLoop, currentIndex);

    if (nextIndex === null || nextIndex < 0) {
      return;
    }

    suppressPointerSyncRef.current = true;
    activateCard(nextIndex);

    window.requestAnimationFrame(() => {
      suppressPointerSyncRef.current = false;
    });
  }, [activateCard, activeProductId, canLoop, isStack, visibleProducts]);

  useLayoutEffect(() => {
    syncHoverToPointer();
  }, [renderOffset, syncHoverToPointer]);

  const openProductModal = useCallback(
    (action: DealerCatalogAction, trigger: HTMLElement, sequence: CatalogModalSequenceItem[]) => {
      // Products that already have a page open it instead of the modal.
      if (pageHrefForAction(action)) {
        openDealerProductModal(action, trigger, sequence);
        return;
      }
      if (!CATALOG_MODAL_DIALOG_ID[action] || sequence.length === 0) {
        return;
      }

      modalTriggerRef.current = trigger;
      setModalSequence(sequence);
      setModalSession((session) => session + 1);
      setActiveModalAction(action);
    },
    [],
  );

  const closeProductModal = useCallback(() => {
    setLeavingModalAction(null);
    setSlideMotion(null);
    setActiveModalAction(null);
  }, []);

  const goProductModal = useCallback(
    (delta: number, options?: { slide?: boolean; fromX?: number; width?: number }) => {
      if (!activeModalAction) {
        return;
      }

      const index = modalSequence.findIndex((item) => item.action === activeModalAction);
      const nextIndex = index + delta;
      if (index < 0 || nextIndex < 0 || nextIndex >= modalSequence.length) {
        return;
      }

      const next = modalSequence[nextIndex];
      if (options?.slide) {
        const width = options.width || window.innerWidth;
        const fromX = options.fromX ?? 0;
        setSlideMotion({
          dir: delta < 0 ? -1 : 1,
          x: fromX,
          width,
          animating: false,
        });
        setLeavingModalAction(activeModalAction);
      } else {
        setSlideMotion(null);
        setLeavingModalAction(null);
      }
      setActiveModalAction(next.action);
    },
    [activeModalAction, modalSequence],
  );

  useEffect(() => {
    if (!slideMotion || slideMotion.animating) {
      return;
    }

    let frame2 = 0;
    const frame1 = window.requestAnimationFrame(() => {
      frame2 = window.requestAnimationFrame(() => {
        setSlideMotion((current) => {
          if (!current || current.animating) {
            return current;
          }
          return { ...current, x: -current.dir * current.width, animating: true };
        });
      });
    });
    return () => {
      window.cancelAnimationFrame(frame1);
      window.cancelAnimationFrame(frame2);
    };
  }, [slideMotion]);

  useEffect(() => {
    if (!leavingModalAction) {
      return;
    }

    const timer = window.setTimeout(() => {
      setLeavingModalAction((current) => (current === leavingModalAction ? null : current));
      setSlideMotion(null);
    }, PRODUCT_MODAL_SLIDE_CLEAR_MS);
    return () => window.clearTimeout(timer);
  }, [activeModalAction, leavingModalAction]);

  const isProductModalOpen = useCallback(
    (action: DealerCatalogAction) => activeModalAction === action || leavingModalAction === action,
    [activeModalAction, leavingModalAction],
  );

  const modalNavValue = useMemo(
    () => ({
      currentAction: activeModalAction,
      leavingDialogId: leavingModalAction ? CATALOG_MODAL_DIALOG_ID[leavingModalAction] ?? null : null,
      slideMotion,
      sequence: modalSequence,
      go: goProductModal,
    }),
    [activeModalAction, goProductModal, leavingModalAction, modalSequence, slideMotion],
  );

  const getPrimaryActionProps = useCallback(
    (action: DealerCatalogAction, sequence: CatalogModalSequenceItem[]) => {
      const dialogId = CATALOG_MODAL_DIALOG_ID[action];
      if (!dialogId) {
        return {
          onPrimaryAction: undefined,
          primaryDialogId: undefined,
        };
      }

      return {
        onPrimaryAction: (event: MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          openProductModal(action, event.currentTarget, sequence);
        },
        primaryDialogId: dialogId,
      };
    },
    [openProductModal],
  );

  const openFamilyModal = useCallback(
    (parentId: string, trigger: HTMLElement, childId?: string) => {
      const parent = products.find((product) => product.id === parentId);
      if (!parent) {
        return;
      }

      const sequence = getFamilyModalSequence(parent);
      if (sequence.length === 0) {
        return;
      }

      const start = childId ? sequence.find((item) => item.id === childId) ?? sequence[0] : sequence[0];
      openProductModal(start.action, trigger, sequence);
    },
    [openProductModal, products],
  );

  const getVisibleCardActionProps = useCallback(
    (card: CatalogVisibleCard) => {
      if (card.kind === "parent") {
        const sequence = getFamilyModalSequence(card);
        const first = sequence[0];
        return {
          onPrimaryAction: undefined,
          primaryDialogId: first ? CATALOG_MODAL_DIALOG_ID[first.action] : undefined,
        };
      }

      return getPrimaryActionProps(card.action, getStandaloneModalSequence(card));
    },
    [getPrimaryActionProps],
  );

  useEffect(() => {
    registerDealerProductModalOpener((action, trigger, sequence) => {
      openProductModal(action, trigger, sequence ?? getStandaloneModalSequenceForAction(action, products));
    });

    return () => registerDealerProductModalOpener(null);
  }, [openProductModal, products]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  const activePaginationIndex = useMemo(() => {
    if (visibleProducts.length <= 1) {
      return 0;
    }

    if (isStack) {
      return clamp(
        Math.round(stackScrollProgress * (visibleProducts.length - 1)),
        0,
        visibleProducts.length - 1,
      );
    }

    if (canLoop && loopWidth > 0) {
      const virtualOffset = renderOffset % loopWidth;
      const progress = virtualOffset / loopWidth;
      return clamp(Math.round(progress * (visibleProducts.length - 1)), 0, visibleProducts.length - 1);
    }

    if (maxOffset <= 0) {
      return 0;
    }

    const progress = renderOffset / maxOffset;
    return clamp(Math.round(progress * (visibleProducts.length - 1)), 0, visibleProducts.length - 1);
  }, [canLoop, isStack, loopWidth, maxOffset, renderOffset, stackScrollProgress, visibleProducts.length]);

  const activeHoverCard =
    activeTrackIndex !== null && trackProducts[activeTrackIndex] ? trackProducts[activeTrackIndex] : null;
  const activeHoverActionProps = activeHoverCard ? getVisibleCardActionProps(activeHoverCard) : null;

  return (
    <DealerProductModalNavProvider value={modalNavValue}>
    <div
      ref={scrollZoneRef}
      {...(wheelEnabled && !isStack ? { "data-lenis-prevent": true } : {})}
      onPointerEnter={isStack ? undefined : () => setIsRailInteractive(true)}
      onPointerLeave={
        isStack
          ? undefined
          : () => {
              setIsRailInteractive(false);
              scheduleClose();
            }
      }
      className="catalog-rail-pagination-gap flex min-h-0 w-full flex-1 flex-col overflow-visible"
    >
      <div
        ref={railRef}
        onPointerEnter={
          isStack
            ? undefined
            : (event) => {
                isPointerOverRailRef.current = true;
                pointerClientXRef.current = event.clientX;
                activateCard(getIndexFromPointer(event.clientX));
              }
        }
        onPointerMove={
          isStack
            ? undefined
            : (event) => {
                isPointerOverRailRef.current = true;
                pointerClientXRef.current = event.clientX;
                activateCard(getIndexFromPointer(event.clientX));
              }
        }
        onPointerLeave={
          isStack
            ? undefined
            : () => {
                isPointerOverRailRef.current = false;
                pointerClientXRef.current = null;
                scheduleClose();
              }
        }
        onFocusCapture={() => setIsRailInteractive(true)}
        onBlurCapture={(event) => {
          if (!scrollZoneRef.current?.contains(event.relatedTarget as Node | null)) {
            setIsRailInteractive(false);

            if (!isStack) {
              scheduleClose();
            }
          }
        }}
        className={`catalog-rail-shell relative w-full overflow-visible ${isStack ? "" : "touch-pan-y"}`}
      >
        <div
          ref={viewportRef}
          {...(isStack ? { role: "group", "aria-label": "Карточки каталога" } : {})}
          className={
            isStack
              ? "catalog-rail-viewport"
              : "catalog-rail-viewport absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden"
          }
        >
          <div className="flex h-full items-center">
            <div
              ref={trackRef}
              data-catalog-track
              className="flex w-max items-center gap-4"
              style={
                isStack
                  ? undefined
                  : {
                      transform: `translate3d(${-renderOffset}px, 0, 0)`,
                      willChange: (canLoop ? loopWidth : maxOffset) > 0 ? "transform" : undefined,
                    }
              }
            >
              {trackProducts.map((product, index) => {
                const primaryActionProps = getVisibleCardActionProps(product);

                return (
                  <CatalogBaseCard
                    key={`${product.id}-${index}`}
                    card={product}
                    actionIcon={actionIcon}
                    isDimmed={!isStack && activeTrackIndex === index}
                    isHovered={!isStack && activeTrackIndex === index}
                    eager={index < 3}
                    onOpenFamilyModal={openFamilyModal}
                    onPrimaryAction={primaryActionProps.onPrimaryAction}
                    primaryDialogId={primaryActionProps.primaryDialogId}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {isStack ? null : (
          <div className="pointer-events-none absolute inset-0 overflow-visible">
            {activeHoverCard && activeTrackIndex !== null && activeHoverActionProps ? (
              <CatalogHoverCard
                key="catalog-hover-overlay"
                card={activeHoverCard}
                actionIcon={actionIcon}
                isActive
                isHovered
                left={activeTrackIndex * TRACK_STEP - renderOffset - HOVER_X_OFFSET}
                onOpenFamilyModal={openFamilyModal}
                onPrimaryAction={activeHoverActionProps.onPrimaryAction}
                primaryDialogId={activeHoverActionProps.primaryDialogId}
              />
            ) : null}
          </div>
        )}
      </div>

      <CatalogPagination
        activeIndex={activePaginationIndex}
        total={visibleProducts.length}
        assets={paginationAssets}
        showHint={
          isStack ? isStackScrollable : isRailInteractive && (canLoop ? loopWidth > 0 : maxOffset > 0)
        }
        hintAnimated={isStack ? !prefersReducedMotion : true}
        hintVariant={isStack ? "finger" : "mouse"}
      />

      {/* Mounts + dialog ids live outside this file so slide edits cannot drop them. */}
      <CatalogProductModals
        modalSession={modalSession}
        compact={compact}
        returnFocusRef={modalTriggerRef}
        isProductModalOpen={isProductModalOpen}
        onClose={closeProductModal}
      />
    </div>
    </DealerProductModalNavProvider>
  );
}
