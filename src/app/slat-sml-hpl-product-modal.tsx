"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { useReducedMotion } from "framer-motion";
import {
  DEALER_MOTION_EASING_CLASS,
  DEALER_MOTION_FAST_DURATION_CLASS,
  DEALER_MOTION_REDUCE_CLASS,
} from "@/app/dealer-motion";
import { useDealerHorizontalRail } from "@/app/dealer-horizontal-scroll";
import { coatingLightboxSrc, openCasePhotoGallery } from "@/app/case-fancybox";
import { DealerProductModalShell } from "@/app/dealer-product-modal-shell";
import { HeroGlassNavButton } from "@/app/hero-glass-nav-button";
import type { WallHplCoatingGroup, WallHplCoatingSwatch } from "@/data/wall-hpl-coatings";
import {
  SLAT_SML_HPL_PRODUCT_MODAL_ID,
  slatSmlHplModalAssets,
  slatSmlHplProductModal,
  type SlatSmlHplFeature,
} from "@/data/slat-sml-hpl-product-modal";

type SlatSmlHplProductModalProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  compact?: boolean;
};

const CHIP_GRADIENT =
  "linear-gradient(143.68deg, rgba(1, 88, 171, 0.05) 14.835%, rgba(255, 255, 255, 0.013) 125.3%)";

const ICON_BOX_SHADOW = "0 4px 32px rgba(1, 88, 171, 0.1)";

const SWATCH_HOVER_TRANSITION = `transition-[height] ${DEALER_MOTION_FAST_DURATION_CLASS} ${DEALER_MOTION_EASING_CLASS} ${DEALER_MOTION_REDUCE_CLASS}`;

const COATING_CARD_WIDTH = 138;
const COATING_GAP = 16;
const COATING_TRACK_STEP = COATING_CARD_WIDTH + COATING_GAP;
const COATING_SWATCH_REST_HEIGHT = 60;
const COATING_SWATCH_HOVER_HEIGHT = 194;
const COATING_RAIL_CLIP_TOP = COATING_SWATCH_HOVER_HEIGHT - COATING_SWATCH_REST_HEIGHT;

function FeatureRow({
  feature,
  className,
}: {
  feature: SlatSmlHplFeature;
  className?: string;
}) {
  return (
    <div className={`flex min-w-0 items-center gap-[16px] ${className ?? ""}`}>
      <div
        className="flex size-[70px] shrink-0 items-center justify-center rounded-[8px] p-[18px] backdrop-blur-[22px]"
        style={{ background: "var(--dealer-surface-white)", boxShadow: ICON_BOX_SHADOW }}
      >
        <img src={feature.icon} alt="" width={34} height={34} className="size-full object-contain" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-[4px] text-dealer-text-primary">
        <p className="dealer-type-mini-semibold">{feature.title}</p>
        <p className="dealer-type-mini-regular">{feature.description}</p>
      </div>
    </div>
  );
}

function CoatingSwatch({
  swatch,
  onPress,
  compact = false,
}: {
  swatch: WallHplCoatingSwatch;
  onPress: (swatch: WallHplCoatingSwatch) => void;
  compact?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="relative flex w-[138px] shrink-0 flex-col overflow-visible rounded-[4px] backdrop-blur-[10px] select-none"
      style={{
        background: "var(--dealer-surface-white)",
        boxShadow: "var(--dealer-shadow-glass)",
        zIndex: expanded ? 20 : 0,
      }}
      onPointerEnter={compact ? undefined : () => setExpanded(true)}
      onPointerLeave={compact ? undefined : () => setExpanded(false)}
      {...(compact
        ? { onClick: () => onPress(swatch) }
        : {
            onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => {
              if (event.button !== 0) {
                return;
              }

              onPress(swatch);
            },
          })}
    >
      <div className="relative h-[60px] w-full overflow-visible rounded-tl-[4px] rounded-tr-[4px]">
        <img
          src={swatch.image}
          alt=""
          draggable={false}
          onDragStart={(event) => event.preventDefault()}
          className={`absolute bottom-0 left-0 z-10 w-full rounded-tl-[4px] rounded-tr-[4px] object-cover object-top select-none [-webkit-user-drag:none] ${SWATCH_HOVER_TRANSITION}`}
          style={{ height: expanded ? COATING_SWATCH_HOVER_HEIGHT : COATING_SWATCH_REST_HEIGHT }}
        />
      </div>
      <div className="relative z-0 flex w-full items-center justify-center overflow-hidden py-[6px]">
        <p className="dealer-type-mini-regular w-full text-center text-black">{swatch.label}</p>
      </div>
    </div>
  );
}

function CoatingSwatchRail({
  swatches,
  compact = false,
}: {
  swatches: WallHplCoatingSwatch[];
  compact?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const pendingSwatchRef = useRef<WallHplCoatingSwatch | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  const loopWidth = swatches.length * COATING_TRACK_STEP;
  const canLoop =
    !compact && loopWidth > viewportWidth + COATING_TRACK_STEP && viewportWidth > 0 && swatches.length > 0;
  const scrollEnabled = canLoop;

  const trackSwatches = useMemo(
    () => (canLoop ? [...swatches, ...swatches] : swatches),
    [canLoop, swatches],
  );

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
  }, [swatches.length, updateViewportWidth]);

  const { scrollZoneRef, renderOffset, isDragging, consumeDragClick } = useDealerHorizontalRail({
    loopWidth,
    loop: canLoop,
    autoScroll: scrollEnabled,
    isHovered,
    prefersReducedMotion,
    enableWheel: scrollEnabled,
    enableDrag: canLoop,
  });

  const handleOpenPendingSwatch = () => {
    const swatch = pendingSwatchRef.current;
    pendingSwatchRef.current = null;

    if (!swatch || consumeDragClick()) {
      return;
    }

    const startIndex = swatches.findIndex((item) => item.id === swatch.id);

    openCasePhotoGallery(
      swatches.map((item) => ({ src: coatingLightboxSrc(item.image), caption: item.label })),
      startIndex < 0 ? 0 : startIndex,
    );
  };

  if (compact) {
    return (
      <div className="dealer-modal-compact-rail min-w-0 flex-1">
        {swatches.map((swatch) => (
          <CoatingSwatch
            key={swatch.id}
            swatch={swatch}
            compact
            onPress={(item) => {
              const startIndex = swatches.findIndex((entry) => entry.id === item.id);
              openCasePhotoGallery(
                swatches.map((entry) => ({ src: entry.image, caption: entry.label })),
                startIndex < 0 ? 0 : startIndex,
              );
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={viewportRef}
      className={`min-w-0 flex-1 overflow-visible ${isHovered ? "relative z-20" : "relative z-0"}`}
      style={{ clipPath: `inset(-${COATING_RAIL_CLIP_TOP}px 0 0 0)` }}
    >
      <div
        ref={scrollZoneRef}
        {...(scrollEnabled ? { "data-lenis-prevent": true } : {})}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onPointerDownCapture={() => {
          pendingSwatchRef.current = null;
        }}
        onPointerUp={(event) => {
          if (event.button !== 0) {
            return;
          }

          handleOpenPendingSwatch();
        }}
        className={`w-full touch-pan-y overflow-visible ${
          canLoop ? (isDragging ? "cursor-grabbing" : "cursor-ew-resize") : ""
        }`}
      >
        <div
          className="flex gap-[16px]"
          style={{
            width: "max-content",
            transform: `translate3d(${-renderOffset}px, 0, 0)`,
            willChange: canLoop ? "transform" : undefined,
          }}
        >
          {trackSwatches.map((swatch, index) => (
            <CoatingSwatch
              key={`${swatch.id}-${index}`}
              swatch={swatch}
              onPress={(item) => {
                pendingSwatchRef.current = item;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CoatingRow({ group, compact = false }: { group: WallHplCoatingGroup; compact?: boolean }) {
  return (
    <div className="dealer-modal-compact-stack flex w-full min-w-0 items-start gap-[16px]">
      <div
        className="flex h-[24px] w-[162px] shrink-0 items-center overflow-hidden rounded-[4px] px-[16px] py-[4px]"
        style={{ backgroundImage: CHIP_GRADIENT }}
      >
        <p className="dealer-type-mini-regular whitespace-nowrap text-dealer-brand-primary">{group.chip}</p>
      </div>
      <CoatingSwatchRail swatches={group.swatches} compact={compact} />
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  const stacked = label.includes("\n") || value.includes("\n");

  return (
    <div className="flex w-full flex-col gap-[10px]">
      <div className="h-px w-full bg-[rgba(0,9,18,0.08)]" aria-hidden="true" />
      <div className={`dealer-modal-compact-row flex w-full items-start justify-between gap-[16px] ${stacked ? "" : "whitespace-nowrap"}`}>
        <p
          className={`dealer-type-base-medium text-dealer-text-primary ${
            stacked ? "whitespace-pre-line" : "dealer-text-trim"
          }`}
        >
          {label}
        </p>
        <p
          className={`dealer-type-mini-regular text-right text-dealer-text-secondary ${
            stacked ? "whitespace-pre-line" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function SlatSmlHplModalContent({ compact = false }: { compact?: boolean }) {
  const [heroA, heroB, heroC, heroD] = slatSmlHplProductModal.heroFeatures;
  const galleryImages = [...slatSmlHplModalAssets.gallery];
  const [galleryIndex, setGalleryIndex] = useState(0);
  const safeGalleryIndex = galleryIndex % galleryImages.length;

  const openGallery = () => {
    openCasePhotoGallery(galleryImages, safeGalleryIndex);
  };

  return (
    <div className="dealer-modal-canvas flex min-h-[926px] w-[1376px] flex-col gap-[16px]">
      <div className="dealer-modal-row relative z-0 flex h-[455px] gap-[16px]">
        <div className="dealer-modal-hero-media relative z-0 flex h-full w-[548px] shrink-0 items-center justify-between overflow-hidden rounded-[8px] px-4">
          <button
            type="button"
            aria-label="Открыть фото на весь экран"
            onClick={openGallery}
            className="absolute inset-0 z-[1] cursor-zoom-in overflow-hidden rounded-[8px]"
          >
            <img
              src={galleryImages[safeGalleryIndex].src}
              alt=""
              className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            />
          </button>
          <HeroGlassNavButton
            direction="left"
            ariaLabel="Предыдущее фото"
            onClick={() => setGalleryIndex((index) => (index - 1 + galleryImages.length) % galleryImages.length)}
          />
          <HeroGlassNavButton
            direction="right"
            ariaLabel="Следующее фото"
            onClick={() => setGalleryIndex((index) => (index + 1) % galleryImages.length)}
          />
        </div>

        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col justify-between rounded-[8px] p-[28px] backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-video)" }}
        >
          <div className="flex w-full flex-col gap-[16px]">
            <p className="dealer-text-trim dealer-type-base-medium text-dealer-brand-primary">
              {slatSmlHplProductModal.categoryLabel}
            </p>
            <p className="dealer-modal-compact-h1 dealer-type-h1 whitespace-nowrap text-dealer-text-primary">
              {slatSmlHplProductModal.title}
            </p>
            <p className="dealer-type-base-medium text-dealer-text-secondary">
              {slatSmlHplProductModal.description}
            </p>
          </div>

          <div className="flex w-full flex-col gap-[16px]">
            <div className="dealer-modal-compact-stack flex gap-[16px]">
              <FeatureRow feature={heroA} className="min-w-0 flex-1" />
              <FeatureRow feature={heroB} className="min-w-0 flex-1" />
            </div>
            <div className="dealer-modal-compact-stack flex gap-[16px]">
              <FeatureRow feature={heroC} className="min-w-0 flex-1" />
              <FeatureRow feature={heroD} className="min-w-0 flex-1" />
            </div>
          </div>

          <div className="dealer-modal-compact-cta flex gap-6">
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded bg-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-white">
                {slatSmlHplProductModal.primaryCta}
              </span>
              <img src={slatSmlHplModalAssets.arrows.white} alt="" width={16} height={16} className="size-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded border border-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-primary">
                {slatSmlHplProductModal.secondaryCta}
              </span>
              <img src={slatSmlHplModalAssets.arrows.blue} alt="" width={16} height={16} className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="dealer-modal-row relative z-10 flex min-h-[455px] shrink-0 gap-[16px]">
        <div
          className="dealer-modal-panel flex min-w-0 flex-1 flex-col gap-[20px] overflow-visible rounded-[8px] p-[28px] backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-glass)" }}
        >
          <p className="dealer-modal-compact-h2 dealer-type-h2 shrink-0 text-black">{slatSmlHplProductModal.coatingTitle}</p>
          <div className="flex min-h-0 w-full flex-col gap-[16px]">
            {slatSmlHplProductModal.coatingGroups.map((group) => (
              <CoatingRow key={group.chip} group={group} compact={compact} />
            ))}
          </div>
        </div>

        <div
          className="dealer-modal-panel flex min-w-0 flex-1 rounded-[8px] p-[28px] backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-video)" }}
        >
          <div className="dealer-modal-compact-stack flex h-full min-w-0 w-full gap-[16px]">
            <div className="flex min-w-0 flex-1 flex-col gap-[32px] pb-[13px]">
              <div className="flex flex-col gap-[10px]">
                <p className="dealer-modal-compact-h2 dealer-type-h2 text-dealer-text-primary">{slatSmlHplProductModal.specs.title}</p>
                <p className="dealer-type-h3 text-dealer-text-secondary">
                  {slatSmlHplProductModal.specs.productName}
                </p>
              </div>

              <div className="flex w-full flex-col gap-[10px]">
                {slatSmlHplProductModal.specs.rows.map((row) => (
                  <SpecRow key={row.label} label={row.label} value={row.value} />
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center gap-[16px]">
              {slatSmlHplProductModal.extraFeatures.map((feature) => (
                <FeatureRow key={feature.title} feature={feature} className="w-full shrink-0" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SlatSmlHplProductModal({
  open,
  onClose,
  returnFocusRef,
  compact = false,
}: SlatSmlHplProductModalProps) {
  return (
    <DealerProductModalShell
      open={open}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      dialogId={SLAT_SML_HPL_PRODUCT_MODAL_ID}
      title={slatSmlHplProductModal.title}
      closeIcon={slatSmlHplModalAssets.closeIcon}
      compact={compact}
    >
      <SlatSmlHplModalContent compact={compact} />
    </DealerProductModalShell>
  );
}
