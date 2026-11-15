"use client";

import type { RefObject } from "react";
import { DealerProductModalShell } from "@/app/dealer-product-modal-shell";
import {
  MINWIN_PRODUCT_MODAL_ID,
  minwinModalAssets,
  minwinProductModal,
  type MinWinComparisonRow,
  type MinWinCoating,
  type MinWinFeature,
} from "@/data/minwin-product-modal";

type MinWinProductModalProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  compact?: boolean;
};

const CHIP_GRADIENT =
  "linear-gradient(124deg, rgba(1, 88, 171, 0.05) 14.835%, rgba(255, 255, 255, 0.013) 125.3%)";

const MINWIN_HIGHLIGHT_CLASS =
  "rounded-sm bg-gradient-to-r from-dealer-brand-secondary/20 to-white/20 px-2 py-0.5";

function MinWinFeatureRow({ feature }: { feature: MinWinFeature }) {
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

function MinWinSpecChip({ children }: { children: string }) {
  return (
    <div className="flex w-[140px] shrink-0 items-center overflow-hidden rounded px-4 py-1" style={{ backgroundImage: CHIP_GRADIENT }}>
      <span className="dealer-type-mini-regular whitespace-nowrap text-dealer-brand-primary">{children}</span>
    </div>
  );
}

function MinWinComparisonCell({
  value,
  highlighted,
}: {
  value: string;
  highlighted?: boolean;
}) {
  return (
    <div className={`flex w-[115px] shrink-0 items-start ${highlighted ? MINWIN_HIGHLIGHT_CLASS : ""}`}>
      <p className="dealer-type-mini-regular min-w-0 flex-1 text-dealer-text-primary">{value}</p>
    </div>
  );
}

function MinWinComparisonTable({
  title,
  rows,
}: {
  title: string;
  rows: MinWinComparisonRow[];
}) {
  const columns = minwinProductModal.comparison.columns;

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-8 overflow-hidden">
      <p className="dealer-type-h3 text-dealer-text-primary">{title}</p>
      <div className="dealer-modal-compact-table-scroll flex min-w-0 flex-col gap-1">
        <div className="grid grid-cols-[164px_repeat(4,115px)] gap-x-4">
          <div className="h-[15px] shrink-0" aria-hidden="true" />
          {columns.map((column) => (
            <div key={column.id} className="flex w-[115px] shrink-0 items-center gap-2.5">
              <p className="dealer-type-mini-semibold text-dealer-text-primary">{column.label}</p>
              {"highlighted" in column && column.highlighted ? (
                <img src={minwinModalAssets.checkIcon} alt="" width={16} height={16} className="size-4 shrink-0" />
              ) : null}
            </div>
          ))}
        </div>
        <div className="h-px bg-dealer-brand-decoration" aria-hidden="true" />
        {rows.map((row) => (
          <div key={row.label}>
            <div className="grid grid-cols-[164px_repeat(4,115px)] gap-x-4 py-1">
              <div className="flex w-[164px] shrink-0 items-start">
                <p className="dealer-type-mini-semibold text-dealer-text-primary">{row.label}</p>
              </div>
              {columns.map((column) => (
                <MinWinComparisonCell
                  key={`${row.label}-${column.id}`}
                  value={row.values[column.id]}
                  highlighted={"highlighted" in column && column.highlighted}
                />
              ))}
            </div>
            <div className="h-px bg-dealer-brand-decoration" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MinWinCoatingThumb({ coating }: { coating: MinWinCoating }) {
  return (
    <div className="relative flex h-[60px] min-w-0 flex-1 flex-col items-end justify-end overflow-hidden rounded p-1">
      <img src={coating.image} alt="" width={60} height={60} className="absolute inset-0 size-full rounded object-cover" />
      <div
        className="relative shrink-0 rounded-sm p-1 backdrop-blur-[10px]"
        style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-glass)" }}
      >
        <p className="dealer-type-mini-regular whitespace-nowrap text-dealer-text-primary">{coating.label}</p>
      </div>
    </div>
  );
}

function MinWinModalContent() {
  const [firstFeature, secondFeature, thirdFeature, fourthFeature] = minwinProductModal.features;

  return (
    <div className="dealer-modal-canvas flex h-[926px] w-[1376px] flex-col gap-4">
      <div className="dealer-modal-row flex min-h-0 flex-1 items-start gap-4">
        <div className="dealer-modal-hero-media relative flex h-[455px] w-[590px] shrink-0 items-center justify-center overflow-hidden rounded-lg py-2">
          <img
            src={minwinModalAssets.hero}
            alt=""
            width={610}
            height={422}
            className="absolute max-w-none object-cover"
            style={{ width: "103.19%", height: "103.37%", left: "-0.73%", top: "-3.37%" }}
          />
        </div>

        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col justify-between rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-video)" }}
        >
          <div className="flex w-full flex-col gap-4">
            <p className="dealer-text-trim dealer-type-base-medium text-dealer-brand-primary">{minwinProductModal.categoryLabel}</p>
            <p className="dealer-modal-compact-h1 dealer-type-h1 whitespace-nowrap text-dealer-text-primary">{minwinProductModal.title}</p>
            <p className="dealer-type-mini-regular text-dealer-text-secondary">{minwinProductModal.description}</p>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="dealer-modal-compact-stack flex gap-4">
              <MinWinFeatureRow feature={firstFeature} />
              <MinWinFeatureRow feature={secondFeature} />
            </div>
            <div className="dealer-modal-compact-stack flex gap-4">
              <MinWinFeatureRow feature={thirdFeature} />
              <MinWinFeatureRow feature={fourthFeature} />
            </div>
          </div>

          <div className="dealer-modal-compact-cta flex gap-6">
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded bg-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-white">
                {minwinProductModal.primaryCta}
              </span>
              <img src={minwinModalAssets.arrows.white} alt="" width={16} height={16} className="size-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded border border-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-primary">
                {minwinProductModal.secondaryCta}
              </span>
              <img src={minwinModalAssets.arrows.blue} alt="" width={16} height={16} className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="dealer-modal-row flex min-h-0 flex-1 items-start gap-4">
        <div
          className="dealer-modal-panel flex h-full w-[744px] shrink-0 flex-col gap-8 overflow-hidden rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-glass)" }}
        >
          <div className="min-h-0 flex-1 overflow-hidden">
            <MinWinComparisonTable title={minwinProductModal.comparison.title} rows={minwinProductModal.comparison.rows} />
          </div>
          <div className="flex shrink-0 flex-col gap-2.5">
            <p className="dealer-type-h3 text-dealer-text-primary">{minwinProductModal.useCases.title}</p>
            <p className="dealer-type-mini-regular text-dealer-text-secondary">{minwinProductModal.useCases.description}</p>
          </div>
        </div>

        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col gap-8 rounded-lg p-7 backdrop-blur-[10px]"
          style={{ background: "var(--dealer-surface-white)", boxShadow: "var(--dealer-shadow-video)" }}
        >
          <div className="flex flex-col gap-4">
            <div className="dealer-modal-compact-stack flex items-start gap-4">
              <MinWinSpecChip>{minwinProductModal.coatings.label}</MinWinSpecChip>
              <p className="dealer-type-mini-regular min-w-0 flex-1 text-dealer-text-primary">
                {minwinProductModal.coatings.description}
              </p>
            </div>
            <div className="flex gap-4">
              {minwinProductModal.coatings.items.map((coating) => (
                <MinWinCoatingThumb key={coating.label} coating={coating} />
              ))}
            </div>
          </div>

          <div className="dealer-modal-compact-stack relative flex min-h-0 flex-1 items-start gap-4 overflow-hidden">
            <div className="dealer-modal-compact-fluid aspect-[421/632] h-full shrink-0 overflow-hidden rounded-lg">
              <img
                src={minwinModalAssets.marketingImage}
                alt=""
                width={421}
                height={632}
                className="size-full object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
              <p className="dealer-type-base-regular p-4 text-dealer-text-secondary">{minwinProductModal.marketing.quote}</p>
              <p className="dealer-modal-compact-h2 dealer-type-h2 p-4 text-dealer-text-muted">{minwinProductModal.marketing.title}</p>
            </div>
            <img
              src={minwinModalAssets.glassLogo}
              alt=""
              width={91}
              height={91}
              className="pointer-events-none absolute right-0 bottom-0 size-[91px] object-cover"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MinWinProductModal({ open, onClose, returnFocusRef, compact = false }: MinWinProductModalProps) {
  return (
    <DealerProductModalShell
      open={open}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      dialogId={MINWIN_PRODUCT_MODAL_ID}
      title={minwinProductModal.title}
      closeIcon={minwinModalAssets.closeIcon}
      compact={compact}
    >
      <MinWinModalContent />
    </DealerProductModalShell>
  );
}
