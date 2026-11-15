"use client";

import { useRef, useState, type ReactNode, type RefObject } from "react";
import { openCasePhotoGallery } from "@/app/case-fancybox";
import { DealerProductModalShell } from "@/app/dealer-product-modal-shell";
import { HeroGlassNavButton } from "@/app/hero-glass-nav-button";
import { useCatalogCompactLayout } from "@/app/use-catalog-compact-layout";
import {
  CLOUD_B_PRODUCT_MODAL_ID,
  cloudBModalAssets,
  cloudBProductModal,
  type CloudBFeature,
  type CloudBSpecItem,
} from "@/data/cloud-b-product-modal";

type CloudBProductModalProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  compact?: boolean;
};

const CHIP_GRADIENT =
  "linear-gradient(124deg, rgba(1, 88, 171, 0.05) 14.835%, rgba(255, 255, 255, 0.013) 125.3%)";

function CloudBFeatureRow({ feature }: { feature: CloudBFeature }) {
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

function CloudBSpecChip({ children }: { children: string }) {
  return (
    <div className="flex w-[140px] shrink-0 items-center overflow-hidden rounded px-4 py-1" style={{ backgroundImage: CHIP_GRADIENT }}>
      <span className="dealer-type-mini-regular whitespace-nowrap text-dealer-brand-primary">{children}</span>
    </div>
  );
}

function CloudBValueChip({ children }: { children: string }) {
  return (
    <div className="flex w-fit shrink-0 items-center overflow-hidden rounded border border-dealer-brand-decoration px-4 py-1">
      <span className="dealer-type-mini-regular whitespace-nowrap text-dealer-text-primary">{children}</span>
    </div>
  );
}

function CloudBSpecRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="dealer-modal-compact-stack flex w-full items-start gap-4 overflow-hidden">
      <CloudBSpecChip>{label}</CloudBSpecChip>
      <div className="flex min-w-0 flex-1 flex-col gap-2">{children}</div>
    </div>
  );
}

function CloudBCharacteristicRow({ row }: { row: CloudBSpecItem }) {
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

function CloudBModalContent() {
  const [firstFeature, secondFeature, thirdFeature, fourthFeature] = cloudBProductModal.features;
  const galleryImages = [...cloudBModalAssets.gallery];
  const [galleryIndex, setGalleryIndex] = useState(0);
  const safeGalleryIndex = galleryIndex % galleryImages.length;

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
            <p className="dealer-text-trim dealer-type-base-medium text-dealer-brand-primary">{cloudBProductModal.categoryLabel}</p>
            <p className="dealer-modal-compact-h1 dealer-type-h1 whitespace-nowrap text-dealer-text-primary">{cloudBProductModal.title}</p>
            <p className="dealer-type-base-medium text-dealer-text-secondary">{cloudBProductModal.description}</p>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="dealer-modal-compact-stack flex gap-4">
              <CloudBFeatureRow feature={firstFeature} />
              <CloudBFeatureRow feature={secondFeature} />
            </div>
            <div className="dealer-modal-compact-stack flex gap-4">
              <CloudBFeatureRow feature={thirdFeature} />
              <CloudBFeatureRow feature={fourthFeature} />
            </div>
          </div>

          <div className="dealer-modal-compact-cta flex gap-6">
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded bg-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-white">
                {cloudBProductModal.primaryCta}
              </span>
              <img src={cloudBModalAssets.arrows.white} alt="" width={16} height={16} className="size-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded border border-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-primary">
                {cloudBProductModal.secondaryCta}
              </span>
              <img src={cloudBModalAssets.arrows.blue} alt="" width={16} height={16} className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="dealer-modal-row flex min-h-0 flex-1 items-start gap-4">
        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col gap-4 overflow-hidden rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-glass)" }}
        >
          <p className="dealer-type-h3 text-dealer-text-primary">{cloudBProductModal.execution.title}</p>
          <CloudBSpecRow label={cloudBProductModal.execution.formats.label}>
            <p className="dealer-type-mini-regular text-dealer-text-primary">{cloudBProductModal.execution.formats.description}</p>
            <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
              {cloudBProductModal.execution.formats.chips.map((size) => (
                <CloudBValueChip key={size}>{size}</CloudBValueChip>
              ))}
            </div>
          </CloudBSpecRow>

          <CloudBSpecRow label={cloudBProductModal.execution.thicknesses.label}>
            <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
              {cloudBProductModal.execution.thicknesses.chips.map((thickness) => (
                <CloudBValueChip key={thickness}>{thickness}</CloudBValueChip>
              ))}
            </div>
          </CloudBSpecRow>

          <CloudBSpecRow label={cloudBProductModal.execution.colors.label}>
            <div className="dealer-modal-compact-chips flex flex-wrap gap-2">
              {cloudBProductModal.execution.colors.chips.map((color) => (
                <CloudBValueChip key={color}>{color}</CloudBValueChip>
              ))}
            </div>
          </CloudBSpecRow>

          <CloudBSpecRow label={cloudBProductModal.execution.mounting.label}>
            <p className="dealer-type-mini-regular text-dealer-text-primary">{cloudBProductModal.execution.mounting.description}</p>
          </CloudBSpecRow>
        </div>

        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col gap-5 overflow-hidden rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-video)" }}
        >
          <div className="flex min-w-0 flex-col gap-3">
            <p className="dealer-type-h3 text-dealer-text-primary">{cloudBProductModal.characteristics.title}</p>
            <div className="flex flex-col gap-1.5">
              {cloudBProductModal.characteristics.rows.map((row) => (
                <CloudBCharacteristicRow key={row.name} row={row} />
              ))}
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-2.5">
            <p className="dealer-type-h3 text-dealer-text-primary">{cloudBProductModal.useCases.title}</p>
            <p className="dealer-type-mini-regular text-dealer-text-secondary">{cloudBProductModal.useCases.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CloudBProductModal({ open, onClose, returnFocusRef, compact = false }: CloudBProductModalProps) {
  return (
    <DealerProductModalShell
      open={open}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      dialogId={CLOUD_B_PRODUCT_MODAL_ID}
      title={cloudBProductModal.title}
      closeIcon={cloudBModalAssets.closeIcon}
      compact={compact}
    >
      <CloudBModalContent />
    </DealerProductModalShell>
  );
}

export function CloudBModalLab() {
  const compact = useCatalogCompactLayout(true);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 py-16">
      <p className="dealer-type-base-medium text-dealer-brand-primary">LAB</p>
      <h1 className="dealer-type-h1 text-center text-dealer-text-primary">{cloudBProductModal.title}</h1>
      <p className="max-w-xl text-center dealer-type-base-medium text-dealer-text-secondary">
        Изолированная проверка модалки. Каталог и лендинг не подключены.
      </p>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center rounded-lg bg-dealer-brand-primary px-6 py-3 dealer-type-base-medium text-dealer-brand-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dealer-brand-primary"
      >
        Открыть модалку
      </button>
      <CloudBProductModal open={open} onClose={() => setOpen(false)} returnFocusRef={triggerRef} compact={compact} />
    </main>
  );
}
