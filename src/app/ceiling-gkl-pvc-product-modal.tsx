"use client";

import { useState, type ReactNode, type RefObject } from "react";
import { openCasePhotoGallery } from "@/app/case-fancybox";
import { DealerProductModalShell } from "@/app/dealer-product-modal-shell";
import { HeroGlassNavButton } from "@/app/hero-glass-nav-button";
import {
  CEILING_GKL_PVC_PRODUCT_MODAL_ID,
  ceilingGklPvcModalAssets,
  ceilingGklPvcProductModal,
  type CeilingGklPvcFeature,
  type CeilingGklPvcSpecItem,
} from "@/data/ceiling-gkl-pvc-product-modal";

type CeilingGklPvcProductModalProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  compact?: boolean;
};

const CHIP_GRADIENT =
  "linear-gradient(124deg, rgba(1, 88, 171, 0.05) 14.835%, rgba(255, 255, 255, 0.013) 125.3%)";

function CeilingGklPvcFeatureRow({ feature }: { feature: CeilingGklPvcFeature }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-4">
      <div
        className="flex size-[70px] shrink-0 items-center justify-center overflow-hidden rounded-lg p-[18px] backdrop-blur-[22px]"
        style={{ background: "var(--dealer-surface-white)", boxShadow: "0 4px 32px rgba(1, 88, 171, 0.1)" }}
      >
        <img src={feature.icon} alt="" width={34} height={34} className="size-full object-contain" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 text-dealer-text-primary">
        <p className="dealer-type-mini-semibold">{feature.title}</p>
        <p className="dealer-type-mini-regular">{feature.description}</p>
      </div>
    </div>
  );
}

function CeilingGklPvcLabelChip({ children }: { children: string }) {
  return (
    <div className="flex w-[140px] shrink-0 items-center overflow-hidden rounded px-4 py-1" style={{ backgroundImage: CHIP_GRADIENT }}>
      <span className="dealer-type-mini-regular whitespace-nowrap text-dealer-brand-primary">{children}</span>
    </div>
  );
}

function CeilingGklPvcValueChip({ children }: { children: string }) {
  return (
    <div className="flex w-fit shrink-0 items-center overflow-hidden rounded border border-dealer-brand-decoration px-4 py-1">
      <span className="dealer-type-mini-regular whitespace-nowrap text-dealer-text-primary">{children}</span>
    </div>
  );
}

function CeilingGklPvcSpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="dealer-modal-compact-stack flex w-full items-start gap-4 overflow-hidden">
      <CeilingGklPvcLabelChip>{label}</CeilingGklPvcLabelChip>
      <div className="flex min-w-0 flex-1 flex-col gap-2">{children}</div>
    </div>
  );
}

function CeilingGklPvcCharacteristicRow({ row }: { row: CeilingGklPvcSpecItem }) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="h-px w-full bg-[rgba(0,9,18,0.08)]" aria-hidden="true" />
      <div className="flex w-full items-start justify-between gap-4">
        <p className="dealer-text-trim dealer-type-base-medium min-w-0 text-dealer-text-primary">{row.name}</p>
        <p className="dealer-type-mini-regular shrink-0 text-right text-dealer-text-secondary">{row.value}</p>
      </div>
    </div>
  );
}

function CeilingGklPvcModalContent() {
  const [firstFeature, secondFeature, thirdFeature, fourthFeature] = ceilingGklPvcProductModal.features;
  const galleryImages = [...ceilingGklPvcModalAssets.gallery];
  const [galleryIndex, setGalleryIndex] = useState(0);
  const safeGalleryIndex = galleryIndex % galleryImages.length;
  const hasGalleryNav = galleryImages.length > 1;

  const openGallery = () => {
    openCasePhotoGallery(galleryImages, safeGalleryIndex);
  };

  return (
    <div className="dealer-modal-canvas flex h-[926px] w-[1376px] flex-col gap-4">
      <div className="dealer-modal-row flex min-h-0 flex-1 items-start gap-4">
        <div className="dealer-modal-hero-media relative flex h-[455px] w-[548px] shrink-0 items-center justify-between overflow-hidden rounded-lg px-4">
          <button
            type="button"
            aria-label="Открыть фото на весь экран"
            onClick={openGallery}
            className="absolute inset-0 z-[1] cursor-zoom-in overflow-hidden rounded-lg"
          >
            <img
              src={galleryImages[safeGalleryIndex]}
              alt=""
              className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            />
          </button>
          {hasGalleryNav ? (
            <>
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
            </>
          ) : null}
        </div>

        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col justify-between rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-video)" }}
        >
          <div className="flex w-full flex-col gap-4">
            <p className="dealer-text-trim dealer-type-base-medium text-dealer-brand-primary">
              {ceilingGklPvcProductModal.categoryLabel}
            </p>
            <p className="dealer-modal-compact-h1 dealer-type-h1 whitespace-nowrap text-dealer-text-primary">
              {ceilingGklPvcProductModal.title}
            </p>
            <p className="dealer-type-base-medium text-dealer-text-secondary">{ceilingGklPvcProductModal.description}</p>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="dealer-modal-compact-stack flex gap-4">
              <CeilingGklPvcFeatureRow feature={firstFeature} />
              <CeilingGklPvcFeatureRow feature={secondFeature} />
            </div>
            <div className="dealer-modal-compact-stack flex gap-4">
              <CeilingGklPvcFeatureRow feature={thirdFeature} />
              <CeilingGklPvcFeatureRow feature={fourthFeature} />
            </div>
          </div>

          <div className="dealer-modal-compact-cta flex gap-6">
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded bg-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-white">
                {ceilingGklPvcProductModal.primaryCta}
              </span>
              <img src={ceilingGklPvcModalAssets.arrows.white} alt="" width={16} height={16} className="size-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded border border-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-primary">
                {ceilingGklPvcProductModal.secondaryCta}
              </span>
              <img src={ceilingGklPvcModalAssets.arrows.blue} alt="" width={16} height={16} className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="dealer-modal-row flex min-h-0 flex-1 items-start gap-4">
        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col gap-4 overflow-hidden rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-glass)" }}
        >
          <p className="dealer-type-h3 text-dealer-text-primary">{ceilingGklPvcProductModal.execution.title}</p>
          <p className="dealer-type-mini-regular text-dealer-text-secondary">{ceilingGklPvcProductModal.execution.caption}</p>

          <CeilingGklPvcSpecRow label={ceilingGklPvcProductModal.execution.base.label}>
            <p className="dealer-type-mini-regular text-dealer-text-primary">{ceilingGklPvcProductModal.execution.base.value}</p>
          </CeilingGklPvcSpecRow>

          <CeilingGklPvcSpecRow label={ceilingGklPvcProductModal.execution.coating.label}>
            <p className="dealer-type-mini-regular text-dealer-text-primary">{ceilingGklPvcProductModal.execution.coating.value}</p>
          </CeilingGklPvcSpecRow>

          <CeilingGklPvcSpecRow label={ceilingGklPvcProductModal.execution.formats.label}>
            <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
              {ceilingGklPvcProductModal.execution.formats.chips.map((size) => (
                <CeilingGklPvcValueChip key={size}>{size}</CeilingGklPvcValueChip>
              ))}
            </div>
          </CeilingGklPvcSpecRow>

          <CeilingGklPvcSpecRow label={ceilingGklPvcProductModal.execution.mounting.label}>
            <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
              {ceilingGklPvcProductModal.execution.mounting.chips.map((item) => (
                <CeilingGklPvcValueChip key={item}>{item}</CeilingGklPvcValueChip>
              ))}
            </div>
          </CeilingGklPvcSpecRow>
        </div>

        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col gap-3 overflow-hidden rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-video)" }}
        >
          <p className="dealer-type-h3 text-dealer-text-primary">{ceilingGklPvcProductModal.characteristics.title}</p>
          <p className="dealer-type-mini-regular text-dealer-text-secondary">
            {ceilingGklPvcProductModal.characteristics.caption}
          </p>
          <div className="flex min-w-0 flex-col gap-1.5">
            {ceilingGklPvcProductModal.characteristics.rows.map((row) => (
              <CeilingGklPvcCharacteristicRow key={row.name} row={row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CeilingGklPvcProductModal({ open, onClose, returnFocusRef, compact = false }: CeilingGklPvcProductModalProps) {
  return (
    <DealerProductModalShell
      open={open}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      dialogId={CEILING_GKL_PVC_PRODUCT_MODAL_ID}
      title={ceilingGklPvcProductModal.title}
      closeIcon={ceilingGklPvcModalAssets.closeIcon}
      compact={compact}
    >
      <CeilingGklPvcModalContent />
    </DealerProductModalShell>
  );
}
