"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { DealerCase } from "@/data/dealer-cases";
import { dealerMotionTransform } from "@/app/dealer-motion";
import { useDealerHorizontalRail } from "@/app/dealer-horizontal-scroll";

export const GALLERY_CARD_WIDTH = 262.4;
export const GALLERY_GAP = 16;
export const GALLERY_TRACK_STEP = GALLERY_CARD_WIDTH + GALLERY_GAP;

export function CaseGalleryCard({
  caseItem,
  onSelect,
  variant = "rail",
}: {
  caseItem: DealerCase;
  onSelect: (caseItem: DealerCase, trigger: HTMLButtonElement) => void;
  variant?: "rail" | "grid";
}) {
  const isGrid = variant === "grid";

  return (
    <button
      type="button"
      data-cases-gallery-card
      onClick={(event) => onSelect(caseItem, event.currentTarget)}
      className={
        isGrid
          ? "dealer-cases-grid-card w-full overflow-hidden rounded-lg bg-dealer-brand-white text-left backdrop-blur-[10px]"
          : "h-[203px] w-[262.4px] shrink-0 overflow-hidden rounded-lg bg-dealer-brand-white text-left backdrop-blur-[10px]"
      }
      style={{ boxShadow: "0 4px 40px rgba(0, 0, 0, 0.06)" }}
    >
      <div
        className={`flex h-full w-full origin-center flex-col ${dealerMotionTransform} motion-reduce:transform-none hover:scale-[1.04]`}
      >
        <div
          className={
            isGrid
              ? "relative aspect-[16/10] w-full shrink-0 overflow-hidden p-2.5"
              : "relative h-[135px] w-full shrink-0 overflow-hidden p-2.5"
          }
        >
          <div className="relative h-full w-full overflow-hidden rounded">
            <img
              src={caseItem.galleryThumb}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover object-center"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2 p-4">
          <p className="dealer-text-trim text-base font-medium leading-normal text-dealer-text-primary">
            {caseItem.galleryTitle}
          </p>
          <p className="text-xs font-normal leading-normal text-dealer-text-description">
            {caseItem.galleryCategoryLabel}
          </p>
        </div>
      </div>
    </button>
  );
}

export function CasesGalleryRail({
  cases,
  onSelect,
  wheelEnabled = true,
  nativeScroll = false,
}: {
  cases: DealerCase[];
  onSelect: (caseItem: DealerCase) => void;
  wheelEnabled?: boolean;
  /**
   * Touch/compact: drop the transform+drag+wheel engine for plain native
   * horizontal scrolling — real touch swipe and keyboard focus-follow-scroll
   * without a bespoke drag-vs-scroll conflict. Desktop fine-pointer keeps the
   * existing autoscroll/drag/wheel rail untouched.
   */
  nativeScroll?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  const loopWidth = nativeScroll ? 0 : cases.length * GALLERY_TRACK_STEP;
  const canLoop = !nativeScroll && loopWidth > viewportWidth && viewportWidth > 0 && cases.length > 0;
  const scrollEnabled = canLoop && wheelEnabled;

  const trackCases = useMemo(() => (canLoop ? [...cases, ...cases] : cases), [canLoop, cases]);

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

    if (!viewport || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => {
      updateViewportWidth();
    });

    observer.observe(viewport);

    return () => {
      observer.disconnect();
    };
  }, [updateViewportWidth]);

  useEffect(() => {
    updateViewportWidth();
  }, [cases.length, updateViewportWidth]);

  const { scrollZoneRef, renderOffset, isDragging, consumeDragClick } = useDealerHorizontalRail({
    loopWidth,
    loop: canLoop,
    autoScroll: scrollEnabled,
    isHovered,
    prefersReducedMotion,
    enableWheel: scrollEnabled,
    enableDrag: canLoop,
  });

  const handleCaseSelect = (caseItem: DealerCase) => {
    if (consumeDragClick()) {
      return;
    }

    onSelect(caseItem);
  };

  return (
    <div
      ref={viewportRef}
      className={`h-[203px] w-full ${nativeScroll ? "cases-gallery-native overflow-x-auto overscroll-x-contain" : "overflow-hidden"}`}
    >
      <div
        ref={scrollZoneRef}
        {...(scrollEnabled ? { "data-lenis-prevent": true } : {})}
        onPointerEnter={nativeScroll ? undefined : () => setIsHovered(true)}
        onPointerLeave={nativeScroll ? undefined : () => setIsHovered(false)}
        className={
          nativeScroll
            ? "h-full w-max"
            : `h-full w-full touch-pan-x overflow-hidden ${
                canLoop ? (isDragging ? "cursor-grabbing" : "cursor-ew-resize") : ""
              }`
        }
      >
        <div
          className="flex h-full gap-[16px]"
          style={
            nativeScroll
              ? undefined
              : {
                  width: "max-content",
                  transform: `translate3d(${-renderOffset}px, 0, 0)`,
                  willChange: canLoop ? "transform" : undefined,
                }
          }
        >
          {trackCases.map((caseItem, index) => (
            <CaseGalleryCard
              key={`${caseItem.id}-${index}`}
              caseItem={caseItem}
              onSelect={handleCaseSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
