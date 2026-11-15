import { useCallback, useEffect, useRef, useState } from "react";
import { DEALER_SCROLL_LERP, DEALER_WHEEL_MULTIPLIER } from "@/app/dealer-scroll-motion";

export const DEALER_RAIL_AUTO_SCROLL_PX_PER_SEC = 12;

/** @deprecated Use DEALER_RAIL_AUTO_SCROLL_PX_PER_SEC */
export const DEALER_CASES_AUTO_SCROLL_PX_PER_SEC = DEALER_RAIL_AUTO_SCROLL_PX_PER_SEC;

const EDGE_RELEASE_DELTA = 520;
const DRAG_CLICK_THRESHOLD_PX = 4;

function isInteractivePointerTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest("button, a, input, textarea, select, [role='button']"));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function normalizeWheelDelta(event: WheelEvent) {
  const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;

  if (dominantDelta === 0) {
    return 0;
  }

  if (event.deltaMode === 1) {
    return dominantDelta * 48;
  }

  if (event.deltaMode === 2) {
    return dominantDelta * window.innerHeight;
  }

  return dominantDelta;
}

/** Keeps offset in [0, loopWidth) without modulo jumps that lerp backward. */
export function wrapSeamlessLoopOffset(offset: number, loopWidth: number) {
  if (loopWidth <= 0) {
    return 0;
  }

  let next = offset;

  while (next >= loopWidth) {
    next -= loopWidth;
  }

  while (next < 0) {
    next += loopWidth;
  }

  return next;
}

export function normalizeLoopOffset(offset: number, loopWidth: number) {
  return wrapSeamlessLoopOffset(offset, loopWidth);
}

type UseDealerHorizontalRailOptions = {
  loopWidth: number;
  maxOffset?: number;
  loop?: boolean;
  autoScroll?: boolean;
  isHovered?: boolean;
  prefersReducedMotion?: boolean;
  leftOnly?: boolean;
  enableDrag?: boolean;
  enableWheel?: boolean;
  onRenderOffsetChange?: (offset: number) => void;
};

export function useDealerHorizontalRail({
  loopWidth,
  maxOffset = 0,
  loop = false,
  autoScroll = false,
  isHovered = false,
  prefersReducedMotion = false,
  leftOnly = false,
  enableDrag = false,
  enableWheel = true,
  onRenderOffsetChange,
}: UseDealerHorizontalRailOptions) {
  const scrollZoneRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetOffsetRef = useRef(0);
  const renderOffsetRef = useRef(0);
  const edgeResistanceRef = useRef(0);
  const lastFrameTimeRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const didDragRef = useRef(false);
  const maxOffsetRef = useRef(maxOffset);
  const loopWidthRef = useRef(loopWidth);
  const loopRef = useRef(loop);
  const autoScrollRef = useRef(autoScroll);
  const isHoveredRef = useRef(isHovered);
  const prefersReducedMotionRef = useRef(prefersReducedMotion);
  const leftOnlyRef = useRef(leftOnly);
  const enableDragRef = useRef(enableDrag);
  const enableWheelRef = useRef(enableWheel);
  const onRenderOffsetChangeRef = useRef(onRenderOffsetChange);
  const [renderOffset, setRenderOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  maxOffsetRef.current = maxOffset;
  loopWidthRef.current = loopWidth;
  loopRef.current = loop;
  autoScrollRef.current = autoScroll;
  isHoveredRef.current = isHovered;
  prefersReducedMotionRef.current = prefersReducedMotion;
  leftOnlyRef.current = leftOnly;
  enableDragRef.current = enableDrag;
  enableWheelRef.current = enableWheel;
  onRenderOffsetChangeRef.current = onRenderOffsetChange;

  const publishOffset = useCallback((offset: number) => {
    setRenderOffset(offset);
    onRenderOffsetChangeRef.current?.(offset);
  }, []);

  const isInteracting = () => isHoveredRef.current || isDraggingRef.current;

  const commitLoopOffset = useCallback((nextOffset: number) => {
    const wrapped = wrapSeamlessLoopOffset(nextOffset, loopWidthRef.current);
    renderOffsetRef.current = wrapped;
    targetOffsetRef.current = wrapped;
    publishOffset(wrapped);
    return wrapped;
  }, [publishOffset]);

  const runSeamlessLoopFrame = useCallback(() => {
    const step = (timestamp: number) => {
      const lastTime = lastFrameTimeRef.current ?? timestamp;
      const deltaSeconds = (timestamp - lastTime) / 1000;
      lastFrameTimeRef.current = timestamp;

      if (
        autoScrollRef.current &&
        !isInteracting() &&
        !prefersReducedMotionRef.current &&
        loopWidthRef.current > 0
      ) {
        commitLoopOffset(renderOffsetRef.current + DEALER_RAIL_AUTO_SCROLL_PX_PER_SEC * deltaSeconds);
      }

      frameRef.current = window.requestAnimationFrame(step);
    };

    if (frameRef.current === null) {
      lastFrameTimeRef.current = null;
      frameRef.current = window.requestAnimationFrame(step);
    }
  }, [commitLoopOffset]);

  const runBoundedFrame = useCallback(() => {
    const step = () => {
      const currentOffset = renderOffsetRef.current;
      const targetOffset = targetOffsetRef.current;
      const delta = targetOffset - currentOffset;

      if (Math.abs(delta) < 0.5) {
        renderOffsetRef.current = targetOffset;
        publishOffset(targetOffset);
        frameRef.current = null;
        return;
      }

      const nextOffset = currentOffset + delta * DEALER_SCROLL_LERP;
      renderOffsetRef.current = nextOffset;
      publishOffset(nextOffset);
      frameRef.current = window.requestAnimationFrame(step);
    };

    if (frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(step);
    }
  }, [publishOffset]);

  const ensureAnimationFrame = useCallback(() => {
    if (loopRef.current) {
      return;
    }

    runBoundedFrame();
  }, [runBoundedFrame]);

  const consumeDragClick = useCallback(() => {
    if (!didDragRef.current) {
      return false;
    }

    didDragRef.current = false;
    return true;
  }, []);

  /** Moves the rail to an item without changing its wheel, drag, or loop contracts. */
  const scrollToOffset = useCallback(
    (offset: number) => {
      if (loopRef.current) {
        commitLoopOffset(offset);
        return;
      }

      const nextOffset = clamp(offset, 0, maxOffsetRef.current);
      targetOffsetRef.current = nextOffset;

      if (prefersReducedMotionRef.current) {
        renderOffsetRef.current = nextOffset;
        publishOffset(nextOffset);
        return;
      }

      ensureAnimationFrame();
    },
    [commitLoopOffset, ensureAnimationFrame, publishOffset],
  );

  useEffect(() => {
    if (loop) {
      commitLoopOffset(renderOffsetRef.current);
      return;
    }

    const clamped = clamp(renderOffsetRef.current, 0, maxOffset);
    renderOffsetRef.current = clamped;
    targetOffsetRef.current = clamped;
    publishOffset(clamped);
  }, [commitLoopOffset, loop, loopWidth, maxOffset, publishOffset]);

  useEffect(() => {
    if (!loop || !autoScroll || prefersReducedMotion) {
      return;
    }

    runSeamlessLoopFrame();

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      lastFrameTimeRef.current = null;
    };
  }, [autoScroll, loop, prefersReducedMotion, runSeamlessLoopFrame]);

  useEffect(() => {
    const scrollZone = scrollZoneRef.current;

    if (!scrollZone) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (!enableWheelRef.current) {
        return;
      }

      const normalizedDelta = normalizeWheelDelta(event);

      if (normalizedDelta === 0) {
        return;
      }

      const wheelDelta = normalizedDelta * DEALER_WHEEL_MULTIPLIER;

      if (loopRef.current && loopWidthRef.current > 0) {
        edgeResistanceRef.current = 0;
        const appliedDelta = leftOnlyRef.current ? Math.max(0, wheelDelta) : wheelDelta;

        if (appliedDelta === 0) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        commitLoopOffset(renderOffsetRef.current + appliedDelta);
        return;
      }

      if (maxOffsetRef.current <= 0) {
        return;
      }

      const nextOffset = clamp(targetOffsetRef.current + wheelDelta, 0, maxOffsetRef.current);

      if (nextOffset !== targetOffsetRef.current) {
        event.preventDefault();
        event.stopPropagation();
        edgeResistanceRef.current = 0;
        targetOffsetRef.current = nextOffset;

        if (prefersReducedMotionRef.current) {
          renderOffsetRef.current = nextOffset;
          publishOffset(nextOffset);
        } else {
          ensureAnimationFrame();
        }

        return;
      }

      const atStart = targetOffsetRef.current <= 0.5;
      const atEnd = targetOffsetRef.current >= maxOffsetRef.current - 0.5;
      const scrollingForward = normalizedDelta > 0;
      const blockedAtEnd = atEnd && scrollingForward;
      const blockedAtStart = atStart && !scrollingForward;

      if (!blockedAtEnd && !blockedAtStart) {
        edgeResistanceRef.current = 0;
        return;
      }

      edgeResistanceRef.current += Math.abs(normalizedDelta);

      if (edgeResistanceRef.current < EDGE_RELEASE_DELTA) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        edgeResistanceRef.current = 0;
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!enableDragRef.current || !loopRef.current || event.button !== 0) {
        return;
      }

      if (isInteractivePointerTarget(event.target)) {
        return;
      }

      event.preventDefault();
      isDraggingRef.current = true;
      didDragRef.current = false;
      dragStartXRef.current = event.clientX;
      dragStartOffsetRef.current = renderOffsetRef.current;
      setIsDragging(true);
      scrollZone.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current || !loopRef.current) {
        return;
      }

      const delta = dragStartXRef.current - event.clientX;

      if (Math.abs(delta) > DRAG_CLICK_THRESHOLD_PX) {
        didDragRef.current = true;
      }

      commitLoopOffset(dragStartOffsetRef.current + delta);
    };

    const endDrag = (event: PointerEvent) => {
      if (!isDraggingRef.current) {
        return;
      }

      isDraggingRef.current = false;
      setIsDragging(false);

      if (scrollZone.hasPointerCapture(event.pointerId)) {
        scrollZone.releasePointerCapture(event.pointerId);
      }
    };

    const wheelOptions: AddEventListenerOptions = { passive: false, capture: true };

    scrollZone.addEventListener("wheel", handleWheel, wheelOptions);
    scrollZone.addEventListener("pointerdown", handlePointerDown);
    scrollZone.addEventListener("pointermove", handlePointerMove);
    scrollZone.addEventListener("pointerup", endDrag);
    scrollZone.addEventListener("pointercancel", endDrag);

    return () => {
      scrollZone.removeEventListener("wheel", handleWheel, wheelOptions);
      scrollZone.removeEventListener("pointerdown", handlePointerDown);
      scrollZone.removeEventListener("pointermove", handlePointerMove);
      scrollZone.removeEventListener("pointerup", endDrag);
      scrollZone.removeEventListener("pointercancel", endDrag);
    };
  }, [commitLoopOffset, ensureAnimationFrame, publishOffset]);

  return {
    scrollZoneRef,
    renderOffset,
    renderOffsetRef,
    isDragging,
    consumeDragClick,
    scrollToOffset,
  };
}
