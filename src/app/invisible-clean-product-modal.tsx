"use client";

import { useState, type RefObject } from "react";
import { openCasePhotoGallery } from "@/app/case-fancybox";
import { DealerProductModalShell } from "@/app/dealer-product-modal-shell";
import { HeroGlassNavButton } from "@/app/hero-glass-nav-button";
import {
  INVISIBLE_CLEAN_PRODUCT_MODAL_ID,
  invisibleCleanModalAssets,
  invisibleCleanProductModal,
  type InvisibleCleanFeature,
  type InvisibleCleanSpecItem,
} from "@/data/invisible-clean-product-modal";

type InvisibleCleanProductModalProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  compact?: boolean;
};

const CHIP_GRADIENT =
  "linear-gradient(124deg, rgba(1, 88, 171, 0.05) 14.835%, rgba(255, 255, 255, 0.013) 125.3%)";

function InvisibleCleanFeatureRow({ feature }: { feature: InvisibleCleanFeature }) {
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

function InvisibleCleanSpecChip({ children }: { children: string }) {
  return (
    <div className="flex w-[140px] shrink-0 items-center overflow-hidden rounded px-4 py-1" style={{ backgroundImage: CHIP_GRADIENT }}>
      <span className="dealer-type-mini-regular whitespace-nowrap text-dealer-brand-primary">{children}</span>
    </div>
  );
}

function InvisibleCleanValueChip({ children }: { children: string }) {
  return (
    <div className="flex w-fit shrink-0 items-center overflow-hidden rounded border border-dealer-brand-decoration px-4 py-1">
      <span className="dealer-type-mini-regular whitespace-nowrap text-dealer-text-primary">{children}</span>
    </div>
  );
}

function InvisibleCleanChipRow({ label, chips }: { label: string; chips: readonly string[] }) {
  return (
    <div className="dealer-modal-compact-stack flex w-full items-center gap-4 overflow-hidden">
      <InvisibleCleanSpecChip>{label}</InvisibleCleanSpecChip>
      <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
        {chips.map((chip) => (
          <InvisibleCleanValueChip key={chip}>{chip}</InvisibleCleanValueChip>
        ))}
      </div>
    </div>
  );
}

function InvisibleCleanSpecRow({ row }: { row: InvisibleCleanSpecItem }) {
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

function InvisibleCleanModalContent() {
  const [firstFeature, secondFeature, thirdFeature, fourthFeature] = invisibleCleanProductModal.features;
  const galleryImages = [...invisibleCleanModalAssets.gallery];
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
            <p className="dealer-text-trim dealer-type-base-medium text-dealer-brand-primary">{invisibleCleanProductModal.categoryLabel}</p>
            <p className="dealer-modal-compact-h1 dealer-type-h1 whitespace-nowrap text-dealer-text-primary">{invisibleCleanProductModal.title}</p>
            <p className="dealer-type-base-medium text-dealer-text-secondary">{invisibleCleanProductModal.description}</p>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="dealer-modal-compact-stack flex gap-4">
              <InvisibleCleanFeatureRow feature={firstFeature} />
              <InvisibleCleanFeatureRow feature={secondFeature} />
            </div>
            <div className="dealer-modal-compact-stack flex gap-4">
              <InvisibleCleanFeatureRow feature={thirdFeature} />
              <InvisibleCleanFeatureRow feature={fourthFeature} />
            </div>
          </div>

          <div className="dealer-modal-compact-cta flex gap-6">
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded bg-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-white">
                {invisibleCleanProductModal.primaryCta}
              </span>
              <img src={invisibleCleanModalAssets.arrows.white} alt="" width={16} height={16} className="size-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded border border-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-primary">
                {invisibleCleanProductModal.secondaryCta}
              </span>
              <img src={invisibleCleanModalAssets.arrows.blue} alt="" width={16} height={16} className="size-4" />
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
            <p className="dealer-type-h3 text-dealer-text-primary">{invisibleCleanProductModal.opening.title}</p>
            <p className="dealer-type-mini-regular text-dealer-text-secondary">{invisibleCleanProductModal.opening.caption}</p>
          </div>
          <InvisibleCleanChipRow
            label={invisibleCleanProductModal.opening.coatings.label}
            chips={invisibleCleanProductModal.opening.coatings.chips}
          />
          <InvisibleCleanChipRow
            label={invisibleCleanProductModal.opening.openingDirection.label}
            chips={invisibleCleanProductModal.opening.openingDirection.chips}
          />
          <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
            {invisibleCleanProductModal.opening.attributes.map((attribute) => (
              <InvisibleCleanValueChip key={attribute}>{attribute}</InvisibleCleanValueChip>
            ))}
          </div>
        </div>

        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col gap-5 overflow-hidden rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-video)" }}
        >
          <div className="flex min-w-0 flex-col gap-3">
            <p className="dealer-type-h3 text-dealer-text-primary">{invisibleCleanProductModal.sizes.title}</p>
            <p className="dealer-type-mini-regular text-dealer-text-secondary">{invisibleCleanProductModal.sizes.caption}</p>
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            {invisibleCleanProductModal.sizes.rows.map((row) => (
              <InvisibleCleanSpecRow key={row.name} row={row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function InvisibleCleanProductModal({ open, onClose, returnFocusRef, compact = false }: InvisibleCleanProductModalProps) {
  return (
    <DealerProductModalShell
      open={open}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      dialogId={INVISIBLE_CLEAN_PRODUCT_MODAL_ID}
      title={invisibleCleanProductModal.title}
      closeIcon={invisibleCleanModalAssets.closeIcon}
      compact={compact}
    >
      <InvisibleCleanModalContent />
    </DealerProductModalShell>
  );
}
