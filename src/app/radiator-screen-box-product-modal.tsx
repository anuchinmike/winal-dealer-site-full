"use client";

import { useState, type RefObject } from "react";
import { openCasePhotoGallery } from "@/app/case-fancybox";
import { DealerProductModalShell } from "@/app/dealer-product-modal-shell";
import { HeroGlassNavButton } from "@/app/hero-glass-nav-button";
import {
  RADIATOR_SCREEN_BOX_PRODUCT_MODAL_ID,
  radiatorScreenBoxModalAssets,
  radiatorScreenBoxProductModal,
  type RadiatorScreenBoxFeature,
  type RadiatorScreenBoxSpecItem,
} from "@/data/radiator-screen-box-product-modal";

type RadiatorScreenBoxProductModalProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  compact?: boolean;
};

function RadiatorScreenBoxFeatureRow({ feature }: { feature: RadiatorScreenBoxFeature }) {
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

function RadiatorScreenBoxValueChip({ children }: { children: string }) {
  return (
    <div className="flex w-fit shrink-0 items-center overflow-hidden rounded border border-dealer-brand-decoration px-4 py-1">
      <span className="dealer-type-mini-regular whitespace-nowrap text-dealer-text-primary">{children}</span>
    </div>
  );
}

function RadiatorScreenBoxSpecRow({ row }: { row: RadiatorScreenBoxSpecItem }) {
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

function RadiatorScreenBoxModalContent() {
  const [firstFeature, secondFeature, thirdFeature, fourthFeature] = radiatorScreenBoxProductModal.features;
  const galleryImages = [...radiatorScreenBoxModalAssets.gallery];
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
              {radiatorScreenBoxProductModal.categoryLabel}
            </p>
            <p className="dealer-modal-compact-h1 dealer-type-h1 whitespace-nowrap text-dealer-text-primary">
              {radiatorScreenBoxProductModal.title}
            </p>
            <p className="dealer-type-base-medium text-dealer-text-secondary">{radiatorScreenBoxProductModal.description}</p>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="dealer-modal-compact-stack flex gap-4">
              <RadiatorScreenBoxFeatureRow feature={firstFeature} />
              <RadiatorScreenBoxFeatureRow feature={secondFeature} />
            </div>
            <div className="dealer-modal-compact-stack flex gap-4">
              <RadiatorScreenBoxFeatureRow feature={thirdFeature} />
              <RadiatorScreenBoxFeatureRow feature={fourthFeature} />
            </div>
          </div>

          <div className="dealer-modal-compact-cta flex gap-6">
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded bg-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-white">
                {radiatorScreenBoxProductModal.primaryCta}
              </span>
              <img src={radiatorScreenBoxModalAssets.arrows.white} alt="" width={16} height={16} className="size-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded border border-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-primary">
                {radiatorScreenBoxProductModal.secondaryCta}
              </span>
              <img src={radiatorScreenBoxModalAssets.arrows.blue} alt="" width={16} height={16} className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="dealer-modal-row flex min-h-0 flex-1 items-start gap-4">
        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col gap-5 overflow-hidden rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-glass)" }}
        >
          <div className="flex min-w-0 flex-col gap-3">
            <p className="dealer-type-h3 text-dealer-text-primary">{radiatorScreenBoxProductModal.construction.title}</p>
            <p className="dealer-type-mini-regular text-dealer-text-secondary">
              {radiatorScreenBoxProductModal.construction.caption}
            </p>
            <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
              {radiatorScreenBoxProductModal.construction.items.map((item) => (
                <RadiatorScreenBoxValueChip key={item}>{item}</RadiatorScreenBoxValueChip>
              ))}
            </div>
          </div>
        </div>

        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col gap-5 overflow-hidden rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-video)" }}
        >
          <div className="flex min-w-0 flex-col gap-3">
            <p className="dealer-type-h3 text-dealer-text-primary">{radiatorScreenBoxProductModal.characteristics.title}</p>
            <p className="dealer-type-mini-regular text-dealer-text-secondary">
              {radiatorScreenBoxProductModal.characteristics.caption}
            </p>
            <div className="flex min-w-0 flex-col gap-1.5">
              {radiatorScreenBoxProductModal.characteristics.rows.map((row) => (
                <RadiatorScreenBoxSpecRow key={row.name} row={row} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RadiatorScreenBoxProductModal({
  open,
  onClose,
  returnFocusRef,
  compact = false,
}: RadiatorScreenBoxProductModalProps) {
  return (
    <DealerProductModalShell
      open={open}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      dialogId={RADIATOR_SCREEN_BOX_PRODUCT_MODAL_ID}
      title={radiatorScreenBoxProductModal.title}
      closeIcon={radiatorScreenBoxModalAssets.closeIcon}
      compact={compact}
    >
      <RadiatorScreenBoxModalContent />
    </DealerProductModalShell>
  );
}
