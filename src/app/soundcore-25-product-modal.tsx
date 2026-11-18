"use client";

import { useState, type ReactNode, type RefObject } from "react";
import { openCasePhotoGallery } from "@/app/case-fancybox";
import { DealerProductModalShell } from "@/app/dealer-product-modal-shell";
import { HeroGlassNavButton } from "@/app/hero-glass-nav-button";
import { SoundcoreTextureTiles } from "@/app/soundcore-texture-tiles";
import {
  SOUNDCORE_25_PRODUCT_MODAL_ID,
  soundcore25ModalAssets,
  soundcore25ProductModal,
  type Soundcore25Feature,
  type Soundcore25SpecItem,
} from "@/data/soundcore-25-product-modal";

type Soundcore25ProductModalProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  compact?: boolean;
};

const CHIP_GRADIENT =
  "linear-gradient(124deg, rgba(1, 88, 171, 0.05) 14.835%, rgba(255, 255, 255, 0.013) 125.3%)";

function Soundcore25FeatureRow({ feature }: { feature: Soundcore25Feature }) {
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

function Soundcore25SpecChip({ children }: { children: string }) {
  return (
    <div className="flex w-[140px] shrink-0 items-center overflow-hidden rounded px-4 py-1" style={{ backgroundImage: CHIP_GRADIENT }}>
      <span className="dealer-type-mini-regular whitespace-nowrap text-dealer-brand-primary">{children}</span>
    </div>
  );
}

function Soundcore25ValueChip({ children }: { children: string }) {
  return (
    <div className="flex w-fit shrink-0 items-center overflow-hidden rounded border border-dealer-brand-decoration px-4 py-1">
      <span className="dealer-type-mini-regular whitespace-nowrap text-dealer-text-primary">{children}</span>
    </div>
  );
}

function Soundcore25SpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="dealer-modal-compact-stack flex w-full items-start gap-4 overflow-hidden">
      <Soundcore25SpecChip>{label}</Soundcore25SpecChip>
      <div className="flex min-w-0 flex-1 flex-col gap-2">{children}</div>
    </div>
  );
}

function Soundcore25CharacteristicRow({ row }: { row: Soundcore25SpecItem }) {
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

function Soundcore25ModalContent() {
  const [firstFeature, secondFeature, thirdFeature, fourthFeature] = soundcore25ProductModal.features;
  const galleryImages = [...soundcore25ModalAssets.gallery];
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
            <p className="dealer-text-trim dealer-type-base-medium text-dealer-brand-primary">{soundcore25ProductModal.categoryLabel}</p>
            <p className="dealer-modal-compact-h1 dealer-type-h1 whitespace-nowrap text-dealer-text-primary">{soundcore25ProductModal.title}</p>
            <p className="dealer-type-base-medium text-dealer-text-secondary">{soundcore25ProductModal.description}</p>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="dealer-modal-compact-stack flex gap-4">
              <Soundcore25FeatureRow feature={firstFeature} />
              <Soundcore25FeatureRow feature={secondFeature} />
            </div>
            <div className="dealer-modal-compact-stack flex gap-4">
              <Soundcore25FeatureRow feature={thirdFeature} />
              <Soundcore25FeatureRow feature={fourthFeature} />
            </div>
          </div>

          <div className="dealer-modal-compact-cta flex gap-6">
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded bg-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-white">
                {soundcore25ProductModal.primaryCta}
              </span>
              <img src={soundcore25ModalAssets.arrows.white} alt="" width={16} height={16} className="size-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded border border-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-primary">
                {soundcore25ProductModal.secondaryCta}
              </span>
              <img src={soundcore25ModalAssets.arrows.blue} alt="" width={16} height={16} className="size-4" />
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
            <p className="dealer-type-h3 text-dealer-text-primary">{soundcore25ProductModal.execution.title}</p>
            <p className="dealer-type-mini-regular text-dealer-text-secondary">{soundcore25ProductModal.execution.caption}</p>
          </div>

          <Soundcore25SpecRow label={soundcore25ProductModal.execution.formats.label}>
            <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
              {soundcore25ProductModal.execution.formats.chips.map((size) => (
                <Soundcore25ValueChip key={size}>{size}</Soundcore25ValueChip>
              ))}
            </div>
          </Soundcore25SpecRow>

          <Soundcore25SpecRow label={soundcore25ProductModal.execution.textures.label}>
            <SoundcoreTextureTiles />
          </Soundcore25SpecRow>

          <Soundcore25SpecRow label={soundcore25ProductModal.execution.edges.label}>
            <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
              {soundcore25ProductModal.execution.edges.chips.map((edge) => (
                <Soundcore25ValueChip key={edge}>{edge}</Soundcore25ValueChip>
              ))}
            </div>
          </Soundcore25SpecRow>

          <Soundcore25SpecRow label={soundcore25ProductModal.execution.thickness.label}>
            <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
              {soundcore25ProductModal.execution.thickness.chips.map((item) => (
                <Soundcore25ValueChip key={item}>{item}</Soundcore25ValueChip>
              ))}
            </div>
          </Soundcore25SpecRow>
        </div>

        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col gap-3 overflow-hidden rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-video)" }}
        >
          <p className="dealer-type-h3 text-dealer-text-primary">{soundcore25ProductModal.characteristics.title}</p>
          <p className="dealer-type-mini-regular text-dealer-text-secondary">{soundcore25ProductModal.characteristics.caption}</p>
          <div className="flex flex-col gap-1.5">
            {soundcore25ProductModal.characteristics.rows.map((row) => (
              <Soundcore25CharacteristicRow key={row.name} row={row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Soundcore25ProductModal({ open, onClose, returnFocusRef, compact = false }: Soundcore25ProductModalProps) {
  return (
    <DealerProductModalShell
      open={open}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      dialogId={SOUNDCORE_25_PRODUCT_MODAL_ID}
      title={soundcore25ProductModal.title}
      closeIcon={soundcore25ModalAssets.closeIcon}
      compact={compact}
    >
      <Soundcore25ModalContent />
    </DealerProductModalShell>
  );
}
