"use client";

import { useLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { dealerMotionOpacity, dealerMotionOpacityTransform, dealerMotionTransform } from "@/app/dealer-motion";
import {
  PRODUCT_MODAL_SLIDE_EASING,
  PRODUCT_MODAL_SLIDE_MS,
  useDealerProductModalNav,
} from "@/app/dealer-product-modal-nav";
import { ModalNeighborNav } from "@/app/dealer-modal-neighbor-nav";

type DealerProductModalShellProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
  dialogId: string;
  title: string;
  closeIcon: string;
  children: ReactNode;
  /**
   * Opt-in only: true when CatalogSection (variant=lab) has already chosen
   * compact/stack composition for the current viewport. Portals render to
   * document.body, so this can't be inferred from [data-catalog-lab]
   * ancestry — it must arrive as a prop. Desktop/page callers omit it.
   */
  compact?: boolean;
  /** Product-to-product arrows. Off for the cases overlay. */
  enableProductNav?: boolean;
  /** Renders under the scroll area so it can pin to the dialog bottom. */
  footer?: ReactNode;
};

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function lockBodyScroll() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : "";
}

function unlockBodyScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

function isFancyboxOpen() {
  return Boolean(document.querySelector(".fancybox__container"));
}

const PRODUCT_SWIPE_LOCK_PX = 12;
const PRODUCT_SWIPE_COMMIT_RATIO = 0.28;
const PRODUCT_SWIPE_VELOCITY = 0.45;

type ProductDrag = {
  pointerId: number;
  startX: number;
  startY: number;
  startT: number;
  lastX: number;
  lastT: number;
  locked: "h" | "v" | null;
};

function setDialogX(el: HTMLElement | null, x: number, ms: number) {
  if (!el) {
    return;
  }

  const nextTransition = ms > 0 ? `transform ${ms}ms ${PRODUCT_MODAL_SLIDE_EASING}` : "none";
  if (el.style.transition !== nextTransition) {
    el.style.transition = nextTransition;
  }
  el.style.transform = `translate3d(${x}px, 0, 0)`;
}

function clearDialogSwipe(el: HTMLElement | null) {
  if (!el) {
    return;
  }

  el.style.transition = "";
  el.style.transform = "";
  el.style.willChange = "";
}

function isHorizontalRailTarget(target: EventTarget | null, root: HTMLElement | null) {
  if (!(target instanceof Element) || !root) {
    return false;
  }

  let node: HTMLElement | null = target instanceof HTMLElement ? target : target.parentElement;
  while (node && node !== root) {
    const overflowX = window.getComputedStyle(node).overflowX;
    if ((overflowX === "auto" || overflowX === "scroll") && node.scrollWidth > node.clientWidth + 1) {
      return true;
    }
    node = node.parentElement;
  }

  return false;
}

function shouldIgnoreProductSwipe(target: EventTarget | null, root: HTMLElement | null) {
  if (!(target instanceof Element)) {
    return true;
  }

  if (target.closest(".fancybox__container, [data-fancybox]")) {
    return true;
  }

  if (target.closest('[aria-label="Закрыть окно продукта"]')) {
    return true;
  }

  return isHorizontalRailTarget(target, root);
}

export function DealerProductModalShell({
  open,
  onClose,
  returnFocusRef,
  dialogId,
  title,
  closeIcon,
  children,
  compact = false,
  enableProductNav = true,
  footer,
}: DealerProductModalShellProps) {
  const titleId = useId();
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dragRef = useRef<ProductDrag | null>(null);
  const slidingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const nav = useDealerProductModalNav();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const bindDialogNode = useCallback((node: HTMLDivElement | null) => {
    dialogRef.current = node;
  }, []);

  const sequence = nav?.sequence ?? [];
  const currentIndex = nav?.currentAction
    ? sequence.findIndex((item) => item.action === nav.currentAction)
    : -1;
  const isLeaving = Boolean(compact && nav?.leavingDialogId && nav.leavingDialogId === dialogId);
  const isEnteringOverLeave = Boolean(compact && open && nav?.leavingDialogId && !isLeaving);
  const slideMotion = nav?.slideMotion ?? null;
  const slideX = !compact || !slideMotion
    ? 0
    : isLeaving
      ? slideMotion.x
      : isEnteringOverLeave
        ? slideMotion.x + slideMotion.dir * slideMotion.width
        : 0;
  const slideAnimating = Boolean(slideMotion?.animating);
  const showProductSwitcher = enableProductNav && !isLeaving && sequence.length >= 2 && currentIndex >= 0;
  const prevItem = showProductSwitcher && currentIndex > 0 ? sequence[currentIndex - 1] : null;
  const nextItem = showProductSwitcher && currentIndex < sequence.length - 1 ? sequence[currentIndex + 1] : null;
  const canGoPrev = Boolean(prevItem);
  const canGoNext = Boolean(nextItem);
  const hasNeighborDock = compact && (Boolean(footer) || (enableProductNav && sequence.length >= 2));

  useEffect(() => {
    if (!open || isLeaving) return;

    lockBodyScroll();
    lenis?.stop();
    return () => {
      if (document.querySelector('[role="dialog"][data-compact-modal="true"]')) {
        return;
      }
      unlockBodyScroll();
      lenis?.start();
    };
  }, [isLeaving, lenis, open]);

  useEffect(() => {
    if (!open || isLeaving || slideMotion) return;

    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [isLeaving, open, slideMotion]);

  useEffect(() => {
    if (!open || isLeaving) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (
        showProductSwitcher &&
        nav &&
        (event.key === "ArrowLeft" || event.key === "ArrowRight") &&
        !isFancyboxOpen()
      ) {
        event.preventDefault();
        nav.go(event.key === "ArrowLeft" ? -1 : 1);
        return;
      }

      if (event.key !== "Tab" || !backdropRef.current) return;

      const focusable = Array.from(backdropRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (element) => !element.hasAttribute("disabled"),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLeaving, nav, onClose, open, showProductSwitcher]);

  useEffect(() => {
    if (open || !returnFocusRef.current) return;

    const frame = window.requestAnimationFrame(() => returnFocusRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open, returnFocusRef]);

  const handleBackdropClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose],
  );

  const handleDialogKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    if ((event.key === " " || event.key === "Enter") && (event.target as HTMLElement | null)?.getAttribute("aria-pressed") !== null) {
      event.stopPropagation();
    }
  }, []);

  const commitSlide = useCallback(
    (delta: number, fromX = 0) => {
      if (!nav || slidingRef.current) {
        return;
      }

      const canGo = delta < 0 ? canGoPrev : canGoNext;
      if (!canGo) {
        const el = dialogRef.current;
        if (fromX !== 0 && el && !prefersReducedMotion) {
          setDialogX(el, 0, PRODUCT_MODAL_SLIDE_MS);
          window.setTimeout(() => {
            if (!dragRef.current) {
              clearDialogSwipe(dialogRef.current);
            }
          }, PRODUCT_MODAL_SLIDE_MS);
        } else {
          clearDialogSwipe(el);
        }
        return;
      }

      slidingRef.current = true;
      const el = dialogRef.current;
      const width = el?.getBoundingClientRect().width || window.innerWidth;

      if (compact && !prefersReducedMotion) {
        nav.go(delta, { slide: true, fromX, width });
      } else {
        nav.go(delta);
      }

      window.setTimeout(() => {
        slidingRef.current = false;
      }, PRODUCT_MODAL_SLIDE_MS);
    },
    [canGoNext, canGoPrev, compact, nav, prefersReducedMotion],
  );

  const productNeighborNav = showProductSwitcher ? (
    <ModalNeighborNav
      label="Листание продуктов"
      compact={compact}
      prev={prevItem ? { title: prevItem.title, image: prevItem.image } : null}
      next={nextItem ? { title: nextItem.title, image: nextItem.image } : null}
      prevEyebrow="Предыдущий продукт"
      nextEyebrow="Следующий продукт"
      thumbFit="contain"
      onPrev={() => {
        if (compact) {
          void commitSlide(-1);
          return;
        }
        nav?.go(-1);
      }}
      onNext={() => {
        if (compact) {
          void commitSlide(1);
          return;
        }
        nav?.go(1);
      }}
    />
  ) : null;

  useEffect(() => {
    if (!open || !compact || !showProductSwitcher || isLeaving || slideMotion) {
      return;
    }

    const dialog = dialogRef.current;
    const backdrop = backdropRef.current;
    if (!dialog || !backdrop) {
      return;
    }

    let raf = 0;
    let pendingX = 0;

    const clampSwipeDx = (dx: number) => {
      if (dx > 0 && !canGoPrev) {
        return 0;
      }
      if (dx < 0 && !canGoNext) {
        return 0;
      }
      return dx;
    };

    const flushDragX = () => {
      raf = 0;
      if (prefersReducedMotion) {
        return;
      }
      setDialogX(dialog, pendingX, 0);
    };

    const releaseSwipeChrome = () => {
      if (raf) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      }
      backdrop.removeAttribute("data-product-swipe-x");
      dialog.removeAttribute("data-product-swipe-x");
    };

    const lockHorizontal = (pointerId: number) => {
      backdrop.setAttribute("data-product-swipe-x", "");
      dialog.setAttribute("data-product-swipe-x", "");
      dialog.style.willChange = "transform";
      try {
        backdrop.setPointerCapture(pointerId);
      } catch {
        /* dispatched pointers have no capture target */
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (slidingRef.current || isFancyboxOpen()) {
        return;
      }
      if (event.pointerType !== "touch" && event.pointerType !== "pen") {
        return;
      }
      if (event.button !== 0) {
        return;
      }
      if (shouldIgnoreProductSwipe(event.target, dialog)) {
        return;
      }

      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startT: event.timeStamp,
        lastX: event.clientX,
        lastT: event.timeStamp,
        locked: null,
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId || slidingRef.current) {
        return;
      }

      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      drag.lastX = event.clientX;
      drag.lastT = event.timeStamp;

      if (!drag.locked) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) < PRODUCT_SWIPE_LOCK_PX) {
          return;
        }
        drag.locked = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
        if (drag.locked === "h") {
          lockHorizontal(event.pointerId);
        }
      }

      if (drag.locked !== "h" || prefersReducedMotion) {
        return;
      }

      pendingX = clampSwipeDx(dx);
      if (!raf) {
        raf = window.requestAnimationFrame(flushDragX);
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      const drag = dragRef.current;
      if (!drag || slidingRef.current) {
        return;
      }

      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      const dx = touch.clientX - drag.startX;
      const dy = touch.clientY - drag.startY;
      const horizontalIntent = drag.locked === "h" || (drag.locked === null && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 6);
      if (horizontalIntent) {
        event.preventDefault();
      }
    };

    const onPointerEnd = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) {
        return;
      }
      dragRef.current = null;

      if (backdrop.hasPointerCapture(event.pointerId)) {
        try {
          backdrop.releasePointerCapture(event.pointerId);
        } catch {
          /* already released */
        }
      }

      if (drag.locked !== "h") {
        releaseSwipeChrome();
        return;
      }

      suppressClickRef.current = true;
      releaseSwipeChrome();

      if (slidingRef.current) {
        return;
      }

      const dx = clampSwipeDx(event.clientX - drag.startX);
      const dt = event.timeStamp - drag.startT;
      const velocity = dt >= 40 ? dx / dt : 0;
      const width = dialog.getBoundingClientRect().width || window.innerWidth;
      const commit = Math.abs(dx) > width * PRODUCT_SWIPE_COMMIT_RATIO || Math.abs(velocity) > PRODUCT_SWIPE_VELOCITY;
      const reduce = Boolean(prefersReducedMotion);

      if (!commit) {
        if (reduce) {
          clearDialogSwipe(dialog);
          return;
        }
        setDialogX(dialog, 0, PRODUCT_MODAL_SLIDE_MS);
        window.setTimeout(() => {
          if (!dragRef.current) {
            clearDialogSwipe(dialog);
          }
        }, PRODUCT_MODAL_SLIDE_MS);
        return;
      }

      void commitSlide(dx < 0 ? 1 : -1, reduce ? 0 : dx);
    };

    const pointerOptions: AddEventListenerOptions = { passive: true };
    const touchMoveOptions: AddEventListenerOptions = { passive: false };
    backdrop.addEventListener("pointerdown", onPointerDown, pointerOptions);
    backdrop.addEventListener("pointermove", onPointerMove, pointerOptions);
    backdrop.addEventListener("pointerup", onPointerEnd, pointerOptions);
    backdrop.addEventListener("pointercancel", onPointerEnd, pointerOptions);
    backdrop.addEventListener("touchmove", onTouchMove, touchMoveOptions);

    return () => {
      releaseSwipeChrome();
      backdrop.removeEventListener("pointerdown", onPointerDown, pointerOptions);
      backdrop.removeEventListener("pointermove", onPointerMove, pointerOptions);
      backdrop.removeEventListener("pointerup", onPointerEnd, pointerOptions);
      backdrop.removeEventListener("pointercancel", onPointerEnd, pointerOptions);
      backdrop.removeEventListener("touchmove", onTouchMove, touchMoveOptions);
    };
  }, [canGoNext, canGoPrev, commitSlide, compact, isLeaving, open, prefersReducedMotion, showProductSwitcher, slideMotion]);

  const handleProductSwipeClickCapture = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  }, []);

  if (!mounted || !open) return null;

  return createPortal(
    <>
      {compact && (isLeaving || !nav?.leavingDialogId) ? (
        <div className="pointer-events-none fixed inset-0 z-[399] backdrop-blur-[10px]" aria-hidden />
      ) : null}
      <div
      ref={backdropRef}
      className={
        compact
          ? `dealer-modal-backdrop fixed inset-0 flex h-dvh items-center justify-center overflow-hidden bg-transparent ${
              isLeaving
                ? "z-[402] pointer-events-none"
                : isEnteringOverLeave
                  ? "z-[400] pointer-events-none"
                  : "z-[401]"
            }`
          : "dealer-modal-backdrop fixed inset-0 z-[400] flex items-center justify-center bg-transparent p-6 backdrop-blur-[10px]"
      }
      onMouseDown={handleBackdropClick}
      onClickCapture={handleProductSwipeClickCapture}
      data-lenis-prevent
      {...(compact ? { "data-compact-modal": "true" } : {})}
      {...(hasNeighborDock ? { "data-neighbor-dock": "" } : {})}
      {...(isLeaving ? { "aria-hidden": true, "data-product-leaving": "" } : {})}
      {...(isEnteringOverLeave ? { "data-product-entering": "" } : {})}
    >
      <div
        ref={bindDialogNode}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        id={dialogId}
        className={
          compact
            ? `relative flex max-h-full w-full max-w-[640px] flex-col overflow-hidden rounded-lg backdrop-blur-[10px] touch-pan-y motion-reduce:transition-none ${
                isEnteringOverLeave ? "pointer-events-none" : "pointer-events-auto"
              } ${prefersReducedMotion ? "" : dealerMotionOpacity}`
            : `relative flex max-h-[calc(100vh-48px)] w-[1472px] max-w-[calc(100vw-48px)] flex-col overflow-hidden rounded-lg p-12 backdrop-blur-[10px] motion-reduce:transition-none ${
                prefersReducedMotion ? "" : dealerMotionOpacityTransform
              }`
        }
        style={
          {
            background: "rgba(255, 255, 255, 0.75)",
            boxShadow: "var(--dealer-shadow-glass)",
            ...(compact
              ? {
                  transform: `translate3d(${slideX}px, 0, 0)`,
                  transition:
                    slideAnimating && !prefersReducedMotion
                      ? `transform ${PRODUCT_MODAL_SLIDE_MS}ms ${PRODUCT_MODAL_SLIDE_EASING}`
                      : "none",
                }
              : {}),
          } as CSSProperties
        }
        data-slide-x={compact ? String(slideX) : undefined}
        data-slide-from={compact && slideMotion ? String(isLeaving ? slideMotion.x : slideMotion.x + slideMotion.dir * slideMotion.width) : undefined}
        data-slide-animating={slideAnimating ? "" : undefined}
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
        {...(compact ? { "data-compact-modal": "true" } : {})}
      >
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Закрыть окно продукта"
          onClick={onClose}
          className={
            compact
              ? "group absolute top-1 right-1 z-10 flex size-11 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dealer-brand-primary"
              : "group absolute top-2 right-2 z-10 flex size-8 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dealer-brand-primary"
          }
        >
          <img
            src={closeIcon}
            alt=""
            width={32}
            height={32}
            className={`${compact ? "size-6" : "size-8"} ${prefersReducedMotion ? "" : `${dealerMotionTransform} group-hover:rotate-180`}`}
          />
        </button>
        <h2 id={titleId} className="sr-only">{title}</h2>
        {compact ? (
          <>
            <div className="dealer-modal-compact-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y p-4 pt-14">
              {children}
            </div>
            {footer || productNeighborNav ? (
              <div className="dealer-modal-compact-footer shrink-0">{footer ?? productNeighborNav}</div>
            ) : null}
          </>
        ) : (
          <>
            <div className="dealer-modal-desktop-scroll min-h-0 flex-1 overflow-x-clip overflow-y-auto">
              {children}
            </div>
            {productNeighborNav ? (
              <div className="dealer-modal-desktop-footer shrink-0 pt-4">{productNeighborNav}</div>
            ) : null}
          </>
        )}
      </div>
    </div>
    </>,
    document.body,
  );
}
