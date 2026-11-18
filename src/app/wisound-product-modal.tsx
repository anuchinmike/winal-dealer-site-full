"use client";

import { useState, type ReactNode, type RefObject } from "react";
import { openCasePhotoGallery } from "@/app/case-fancybox";
import { DealerProductModalShell } from "@/app/dealer-product-modal-shell";
import { HeroGlassNavButton } from "@/app/hero-glass-nav-button";
import {
  WISOUND_PRODUCT_MODAL_ID,
  wisoundModalAssets,
  wisoundProductModal,
  type WisoundFeature,
  type WisoundPerforationPattern,
  type WisoundVariant,
} from "@/data/wisound-product-modal";

type WisoundProductModalProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  compact?: boolean;
};

const CHIP_GRADIENT =
  "linear-gradient(124deg, rgba(1, 88, 171, 0.05) 14.835%, rgba(255, 255, 255, 0.013) 125.3%)";

function WisoundFeatureRow({ feature }: { feature: WisoundFeature }) {
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

function WisoundSpecChip({ children }: { children: string }) {
  return (
    <div className="flex w-[140px] shrink-0 items-center overflow-hidden rounded px-4 py-1" style={{ backgroundImage: CHIP_GRADIENT }}>
      <span className="dealer-type-mini-regular whitespace-nowrap text-dealer-brand-primary">{children}</span>
    </div>
  );
}

function WisoundSpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="dealer-modal-compact-stack flex w-full items-start gap-4 overflow-hidden">
      <WisoundSpecChip>{label}</WisoundSpecChip>
      <div className="flex min-w-0 flex-1 flex-col gap-2">{children}</div>
    </div>
  );
}

function WisoundPerforationTile({ pattern }: { pattern: WisoundPerforationPattern }) {
  const [pinned, setPinned] = useState(false);

  return (
    <figure className="wisound-perforation-tile m-0 flex min-w-0 flex-col gap-2">
      <button
        type="button"
        data-perforation={pattern.name}
        aria-label={`${pattern.name}. Показать крупный план`}
        aria-pressed={pinned}
        onClick={() => setPinned((value) => !value)}
        className="group relative block aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-lg border border-dealer-brand-decoration focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dealer-brand-primary"
        style={{ background: "linear-gradient(180deg, #f1f5f9 0%, #dfe8f1 100%)" }}
      >
        <img
          src={pattern.panel}
          alt=""
          width={960}
          height={960}
          loading="lazy"
          className="absolute inset-0 size-full scale-[1.12] object-cover"
        />
        <img
          src={pattern.macro}
          alt=""
          width={960}
          height={960}
          loading="lazy"
          className={`absolute inset-0 size-full object-cover transition-opacity duration-200 ease-out motion-reduce:transition-none [@media(hover:hover)]:group-hover:opacity-100 ${pinned ? "opacity-100" : "opacity-0"}`}
        />
      </button>
      <figcaption className="dealer-type-mini-semibold text-center text-dealer-text-primary">{pattern.name}</figcaption>
    </figure>
  );
}

function WisoundVariantCard({ variant }: { variant: WisoundVariant }) {
  const [brand, product] = variant.productName.split("™ ");

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-dealer-brand-decoration">
      <div className="flex items-center justify-between gap-2 p-3">
        <p className="dealer-type-h3 min-w-0 whitespace-nowrap text-dealer-text-primary">
          {brand}™ <span className={variant.mutedAccent ? "text-dealer-brand-primary/75" : "text-dealer-brand-primary"}>{product}</span>
        </p>
        <span className={`dealer-type-h3 shrink-0 rounded px-2 py-1 text-dealer-brand-white ${variant.mutedAccent ? "bg-dealer-brand-primary/75" : "bg-dealer-brand-primary"}`}>
          {variant.kmClass}
        </span>
      </div>
      <div className="h-px bg-dealer-brand-decoration" aria-hidden="true" />
      <div className="aspect-[283/172] w-full overflow-hidden">
        <img src={variant.image} alt="" width={283} height={172} className="size-full object-cover object-bottom" />
      </div>
      <div className="flex items-center gap-2 px-3 py-2">
        <p className="dealer-type-h3 text-dealer-brand-primary">{variant.baseLabel}</p>
        <p className="dealer-type-base-regular text-dealer-text-primary">{variant.baseDescription}</p>
      </div>
    </div>
  );
}

function WisoundModalContent() {
  const [firstFeature, secondFeature, thirdFeature, fourthFeature] = wisoundProductModal.features;
  const galleryImages = [...wisoundModalAssets.gallery];
  const [galleryIndex, setGalleryIndex] = useState(0);
  const safeGalleryIndex = galleryIndex % galleryImages.length;

  const openGallery = () => {
    openCasePhotoGallery(galleryImages, safeGalleryIndex);
  };

  return (
    <div className="dealer-modal-canvas flex min-h-[926px] w-[1376px] flex-col gap-4">
      <div className="dealer-modal-row flex h-[455px] shrink-0 items-start gap-4">
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
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col justify-between rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-video)" }}
        >
          <div className="flex w-full flex-col gap-4">
            <p className="dealer-text-trim dealer-type-base-medium text-dealer-brand-primary">{wisoundProductModal.categoryLabel}</p>
            <p className="dealer-modal-compact-h1 dealer-type-h1 whitespace-nowrap text-dealer-text-primary">{wisoundProductModal.title}</p>
            <p className="dealer-type-base-medium text-dealer-text-secondary">{wisoundProductModal.description}</p>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="dealer-modal-compact-stack flex gap-4">
              <WisoundFeatureRow feature={firstFeature} />
              <WisoundFeatureRow feature={secondFeature} />
            </div>
            <div className="dealer-modal-compact-stack flex gap-4">
              <WisoundFeatureRow feature={thirdFeature} />
              <WisoundFeatureRow feature={fourthFeature} />
            </div>
          </div>

          <div className="dealer-modal-compact-cta flex gap-6">
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded bg-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-white">
                {wisoundProductModal.primaryCta}
              </span>
              <img src={wisoundModalAssets.arrows.white} alt="" width={16} height={16} className="size-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded border border-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-primary">
                {wisoundProductModal.secondaryCta}
              </span>
              <img src={wisoundModalAssets.arrows.blue} alt="" width={16} height={16} className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="dealer-modal-row flex min-h-[455px] shrink-0 gap-4">
        <div
          className="dealer-modal-panel flex min-w-0 flex-1 flex-col gap-5 overflow-hidden rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-glass)" }}
        >
          <div className="flex w-full flex-col gap-3">
            <WisoundSpecRow label={wisoundProductModal.perforation.label}>
              <p className="dealer-type-mini-regular text-dealer-text-primary">{wisoundProductModal.perforation.description}</p>
            </WisoundSpecRow>
            <div className="wisound-perforation-grid grid grid-cols-6 gap-3">
              {wisoundProductModal.perforation.patterns.map((pattern) => (
                <WisoundPerforationTile key={pattern.name} pattern={pattern} />
              ))}
            </div>
          </div>

          <WisoundSpecRow label={wisoundProductModal.coatings.label}>
            <p className="dealer-type-mini-regular text-dealer-text-primary">{wisoundProductModal.coatings.description}</p>
            <div className="dealer-modal-compact-rail flex gap-4">
              {wisoundModalAssets.coatings.map((image) => (
                <div key={image} className="size-[60px] shrink-0 overflow-hidden rounded">
                  <img src={image} alt="" width={60} height={60} className="size-full object-cover" />
                </div>
              ))}
            </div>
          </WisoundSpecRow>

          <WisoundSpecRow label={wisoundProductModal.formats.label}>
            <p className="dealer-type-mini-regular text-dealer-text-primary">{wisoundProductModal.formats.description}</p>
            <div className="dealer-modal-compact-stack flex gap-4">
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <p className="dealer-text-trim dealer-type-base-medium whitespace-nowrap text-dealer-text-primary">Модули:</p>
                <div className="flex flex-col gap-2">
                  {wisoundProductModal.formats.modules.map((size) => (
                    <p key={size} className="dealer-type-mini-regular whitespace-nowrap text-dealer-text-secondary">{size}</p>
                  ))}
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <p className="dealer-text-trim dealer-type-base-medium whitespace-nowrap text-dealer-text-primary">Крупный формат</p>
                <div className="flex flex-col gap-2">
                  <p className="dealer-type-mini-regular text-dealer-text-secondary"><strong>СМЛ</strong> — {wisoundProductModal.formats.largeFormat.sml}</p>
                  <p className="dealer-type-mini-regular text-dealer-text-secondary"><strong>ГКЛ</strong> — {wisoundProductModal.formats.largeFormat.gkl}</p>
                </div>
              </div>
            </div>
          </WisoundSpecRow>
        </div>

        <div
          className="dealer-modal-panel flex min-w-0 flex-1 flex-col justify-between rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-video)" }}
        >
          <div className="dealer-modal-compact-stack flex gap-4">
            {wisoundProductModal.variants.map((variant) => <WisoundVariantCard key={variant.kmClass} variant={variant} />)}
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="dealer-type-h3 text-dealer-text-primary">{wisoundProductModal.useCases.title}</p>
            <p className="dealer-type-mini-regular text-dealer-text-secondary">{wisoundProductModal.useCases.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WisoundProductModal({ open, onClose, returnFocusRef, compact = false }: WisoundProductModalProps) {
  return (
    <DealerProductModalShell
      open={open}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      dialogId={WISOUND_PRODUCT_MODAL_ID}
      title={wisoundProductModal.title}
      closeIcon={wisoundModalAssets.closeIcon}
      compact={compact}
    >
      <WisoundModalContent />
    </DealerProductModalShell>
  );
}
