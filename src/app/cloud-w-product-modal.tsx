"use client";

import { useState, type ReactNode, type RefObject } from "react";
import { openCasePhotoGallery } from "@/app/case-fancybox";
import { DealerProductModalShell } from "@/app/dealer-product-modal-shell";
import { HeroGlassNavButton } from "@/app/hero-glass-nav-button";
import {
  CLOUD_W_PRODUCT_MODAL_ID,
  cloudWModalAssets,
  cloudWProductModal,
  type CloudWFeature,
  type CloudWSpecItem,
} from "@/data/cloud-w-product-modal";

type CloudWProductModalProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  compact?: boolean;
};

const CHIP_GRADIENT =
  "linear-gradient(124deg, rgba(1, 88, 171, 0.05) 14.835%, rgba(255, 255, 255, 0.013) 125.3%)";

function CloudWFeatureRow({ feature }: { feature: CloudWFeature }) {
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

function CloudWSpecChip({ children }: { children: string }) {
  return (
    <div className="flex w-[140px] shrink-0 items-center overflow-hidden rounded px-4 py-1" style={{ backgroundImage: CHIP_GRADIENT }}>
      <span className="dealer-type-mini-regular whitespace-nowrap text-dealer-brand-primary">{children}</span>
    </div>
  );
}

function CloudWValueChip({ children }: { children: string }) {
  return (
    <div className="flex w-fit shrink-0 items-center overflow-hidden rounded border border-dealer-brand-decoration px-4 py-1">
      <span className="dealer-type-mini-regular whitespace-nowrap text-dealer-text-primary">{children}</span>
    </div>
  );
}

function CloudWSpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="dealer-modal-compact-stack flex w-full items-start gap-4 overflow-hidden">
      <CloudWSpecChip>{label}</CloudWSpecChip>
      <div className="flex min-w-0 flex-1 flex-col gap-2">{children}</div>
    </div>
  );
}

function CloudWCharacteristicRow({ row }: { row: CloudWSpecItem }) {
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

function CloudWModalContent() {
  const [firstFeature, secondFeature, thirdFeature, fourthFeature] = cloudWProductModal.features;
  const galleryImages = [...cloudWModalAssets.gallery];
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
            <p className="dealer-text-trim dealer-type-base-medium text-dealer-brand-primary">{cloudWProductModal.categoryLabel}</p>
            <p className="dealer-modal-compact-h1 dealer-type-h1 whitespace-nowrap text-dealer-text-primary">{cloudWProductModal.title}</p>
            <p className="dealer-type-base-medium text-dealer-text-secondary">{cloudWProductModal.description}</p>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="dealer-modal-compact-stack flex gap-4">
              <CloudWFeatureRow feature={firstFeature} />
              <CloudWFeatureRow feature={secondFeature} />
            </div>
            <div className="dealer-modal-compact-stack flex gap-4">
              <CloudWFeatureRow feature={thirdFeature} />
              <CloudWFeatureRow feature={fourthFeature} />
            </div>
          </div>

          <div className="dealer-modal-compact-cta flex gap-6">
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded bg-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-white">
                {cloudWProductModal.primaryCta}
              </span>
              <img src={cloudWModalAssets.arrows.white} alt="" width={16} height={16} className="size-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded border border-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-primary">
                {cloudWProductModal.secondaryCta}
              </span>
              <img src={cloudWModalAssets.arrows.blue} alt="" width={16} height={16} className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="dealer-modal-row flex min-h-0 flex-1 items-start gap-4">
        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col gap-4 overflow-hidden rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-glass)" }}
        >
          <div className="flex flex-col gap-2">
            <p className="dealer-type-h3 text-dealer-text-primary">{cloudWProductModal.execution.title}</p>
            <p className="dealer-type-mini-regular text-dealer-text-secondary">{cloudWProductModal.execution.caption}</p>
          </div>

          <CloudWSpecRow label={cloudWProductModal.execution.formats.label}>
            <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
              {cloudWProductModal.execution.formats.chips.map((size) => (
                <CloudWValueChip key={size}>{size}</CloudWValueChip>
              ))}
            </div>
          </CloudWSpecRow>

          <CloudWSpecRow label={cloudWProductModal.execution.coloring.label}>
            <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
              {cloudWProductModal.execution.coloring.chips.map((color) => (
                <CloudWValueChip key={color}>{color}</CloudWValueChip>
              ))}
            </div>
          </CloudWSpecRow>

          <CloudWSpecRow label={cloudWProductModal.execution.mounting.label}>
            <p className="dealer-type-mini-regular text-dealer-text-primary">{cloudWProductModal.execution.mounting.description}</p>
          </CloudWSpecRow>

          <CloudWSpecRow label={cloudWProductModal.execution.thicknesses.label}>
            <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
              {cloudWProductModal.execution.thicknesses.chips.map((thickness) => (
                <CloudWValueChip key={thickness}>{thickness}</CloudWValueChip>
              ))}
            </div>
          </CloudWSpecRow>
        </div>

        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col gap-5 overflow-hidden rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-video)" }}
        >
          <div className="flex min-w-0 flex-col gap-3">
            <p className="dealer-type-h3 text-dealer-text-primary">{cloudWProductModal.characteristics.title}</p>
            <div className="flex flex-col gap-1.5">
              {cloudWProductModal.characteristics.rows.map((row) => (
                <CloudWCharacteristicRow key={row.name} row={row} />
              ))}
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-2.5">
            <p className="dealer-type-h3 text-dealer-text-primary">{cloudWProductModal.useCases.title}</p>
            <p className="dealer-type-mini-regular text-dealer-text-secondary">{cloudWProductModal.useCases.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CloudWProductModal({ open, onClose, returnFocusRef, compact = false }: CloudWProductModalProps) {
  return (
    <DealerProductModalShell
      open={open}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      dialogId={CLOUD_W_PRODUCT_MODAL_ID}
      title={cloudWProductModal.title}
      closeIcon={cloudWModalAssets.closeIcon}
      compact={compact}
    >
      <CloudWModalContent />
    </DealerProductModalShell>
  );
}
