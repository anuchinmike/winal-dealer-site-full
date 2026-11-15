"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type RefObject } from "react";
import { openCasePhotoGallery } from "@/app/case-fancybox";
import {
  dealerMotionBackground,
  dealerMotionColors,
  dealerMotionTransform,
} from "@/app/dealer-motion";
import { DealerProductModalShell } from "@/app/dealer-product-modal-shell";
import {
  RYTHMWALL_DEFAULT_MODEL,
  RYTHMWALL_PRODUCT_MODAL_ID,
  getRythmWallModel,
  getRythmWallModelsBySeries,
  rythmWallExtraFeatures,
  rythmWallHeroFeatures,
  rythmWallModalAssets,
  rythmWallProductModal,
  type RythmWallFeature,
  type RythmWallModel,
  type RythmWallModelCode,
} from "@/data/rythmwall-product-modal";

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  compact?: boolean;
};

const THUMBNAIL_GRADIENT_NEUTRAL =
  "linear-gradient(131deg, rgb(241, 241, 241) 0%, rgba(241, 241, 241, 0.05) 30%, rgba(241, 241, 241, 0.05) 70%, rgb(241, 241, 241) 100%)";

const THUMBNAIL_GRADIENT_ACTIVE =
  "linear-gradient(131deg, rgba(1, 88, 171, 0.05) 0%, rgba(1, 88, 171, 0.02) 30%, rgba(1, 88, 171, 0.02) 70%, rgba(1, 88, 171, 0.05) 100%)";

const SERIES_CHIP_GRADIENT =
  "linear-gradient(124deg, rgba(1, 88, 171, 0.05) 14.835%, rgba(255, 255, 255, 0.013) 125.3%)";

function FeatureGroup({ feature }: { feature: RythmWallFeature }) {
  return (
    <div className="dealer-modal-compact-fluid flex w-[304px] items-center gap-4">
      <div
        className="flex size-[70px] shrink-0 items-center justify-center overflow-hidden rounded-lg p-[18px] backdrop-blur-[22px]"
        style={{
          background: "var(--dealer-surface-white)",
          boxShadow: "0 4px 32px rgba(1, 88, 171, 0.1)",
        }}
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

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="h-px w-full bg-[rgba(0,9,18,0.08)]" aria-hidden="true" />
      <div className="dealer-modal-compact-row flex items-start justify-between gap-4 whitespace-nowrap">
        <p className="dealer-text-trim dealer-type-base-medium text-dealer-text-primary">{label}</p>
        <p className="dealer-type-mini-regular text-right text-dealer-text-secondary">{value}</p>
      </div>
    </div>
  );
}

// Figma Component 4 Hover: transparent PNG grows to 280×158; card box stays 196×100.
const THUMBNAIL_CARD_WIDTH = 196;
const THUMBNAIL_CARD_HEIGHT = 100;
const THUMBNAIL_IMAGE_WIDTH = 196;
const THUMBNAIL_IMAGE_HEIGHT = 110;
const THUMBNAIL_HOVER_SCALE = 280 / THUMBNAIL_IMAGE_WIDTH;

function ModelThumbnailButton({
  model,
  isActive,
  onSelect,
}: {
  model: RythmWallModel;
  isActive: boolean;
  onSelect: (code: RythmWallModelCode) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const bgTransitionClass = prefersReducedMotion
    ? "transition-none"
    : dealerMotionBackground;
  const imageTransitionClass = prefersReducedMotion
    ? "transition-none"
    : dealerMotionTransform;

  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={`Модель ${model.code}`}
      aria-controls="rythmwall-model-interior"
      onClick={() => onSelect(model.code)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex shrink-0 items-center justify-center overflow-visible rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dealer-brand-primary ${
        isHovered ? "z-20" : "z-0"
      }`}
      style={{ width: THUMBNAIL_CARD_WIDTH, height: THUMBNAIL_CARD_HEIGHT }}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden rounded-lg ${bgTransitionClass}`}
        style={{
          backgroundImage: isHovered ? THUMBNAIL_GRADIENT_ACTIVE : THUMBNAIL_GRADIENT_NEUTRAL,
        }}
      />
      <div className="pointer-events-none absolute inset-0 overflow-visible">
        <img
          src={model.image}
          alt=""
          width={THUMBNAIL_IMAGE_WIDTH}
          height={THUMBNAIL_IMAGE_HEIGHT}
          className={`absolute left-1/2 top-1/2 max-w-none object-contain ${imageTransitionClass}`}
          style={{
            width: THUMBNAIL_IMAGE_WIDTH,
            height: THUMBNAIL_IMAGE_HEIGHT,
            transform: `translate(-50%, -50%) scale(${isHovered ? THUMBNAIL_HOVER_SCALE : 1})`,
          }}
        />
      </div>
      <span
        className={`dealer-text-trim dealer-type-base-regular absolute top-2 left-2 z-30 ${bgTransitionClass} ${
          isHovered ? "text-dealer-text-primary" : "text-dealer-text-secondary"
        }`}
      >
        {model.code}
      </span>
    </button>
  );
}

function SeriesBlock({
  label,
  description,
  models,
  activeModelCode,
  onSelect,
}: {
  label: string;
  description: string;
  models: RythmWallModel[];
  activeModelCode: RythmWallModelCode;
  onSelect: (code: RythmWallModelCode) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-4 py-2">
        <div
          className="inline-flex items-center justify-center rounded px-4 py-1"
          style={{ backgroundImage: SERIES_CHIP_GRADIENT }}
        >
          <span className="dealer-type-mini-regular text-dealer-brand-primary">{label}</span>
        </div>
        <p className="dealer-type-mini-regular min-w-0 flex-1 text-black">{description}</p>
      </div>
      <div className="dealer-modal-compact-rail relative z-10 flex h-[100px] items-start gap-4 overflow-visible">
        {models.map((model) => (
          <ModelThumbnailButton
            key={model.code}
            model={model}
            isActive={activeModelCode === model.code}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function RythmWallModalContent({
  activeModelCode,
  onSelectModel,
}: {
  activeModelCode: RythmWallModelCode;
  onSelectModel: (code: RythmWallModelCode) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const activeModel = getRythmWallModel(activeModelCode);
  const seriesCModels = getRythmWallModelsBySeries("C");
  const seriesBModels = getRythmWallModelsBySeries("B");
  const specsMotion = prefersReducedMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 }, exit: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 4 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
      };

  return (
    <div className="dealer-modal-canvas flex h-[846px] w-[1376px] flex-col gap-4">
      <div className="dealer-modal-row flex h-[415px] gap-4">
        <div className="dealer-modal-hero-media relative h-full w-[680px] shrink-0 overflow-hidden rounded-lg">
          <button
            id="rythmwall-model-interior"
            type="button"
            aria-label={`Открыть фото на весь экран — RythmWall ${activeModel.code}`}
            onClick={() => openCasePhotoGallery([activeModel.interiorImage])}
            className="absolute inset-0 z-[1] cursor-zoom-in overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-dealer-brand-primary"
          >
            <img
              src={activeModel.interiorImage}
              alt={`Интерьер с панелями WINAL™ RythmWall ${activeModel.code}`}
              width={1200}
              height={896}
              decoding="async"
              className="pointer-events-none absolute inset-0 size-full object-cover"
            />
          </button>
        </div>

        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col justify-between rounded-lg p-7 backdrop-blur-[10px]"
          style={{
            background: "var(--dealer-surface-white)",
            boxShadow: "var(--dealer-shadow-video)",
          }}
        >
          <div className="flex w-full flex-col gap-4">
            <p className="dealer-text-trim dealer-type-base-medium text-dealer-brand-primary">
              {rythmWallProductModal.categoryLabel}
            </p>
            <p className="dealer-modal-compact-h1 dealer-type-h1 whitespace-nowrap text-dealer-text-primary">
              {rythmWallProductModal.title}
            </p>
            <p className="dealer-type-base-medium text-dealer-text-secondary">
              {rythmWallProductModal.description}
            </p>
          </div>

          <div className="dealer-modal-compact-stack flex w-full gap-4">
            {rythmWallHeroFeatures.map((feature) => (
              <FeatureGroup key={feature.title} feature={feature} />
            ))}
          </div>

          <div className="dealer-modal-compact-cta flex gap-6">
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded bg-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-white">
                {rythmWallProductModal.primaryCta}
              </span>
              <img src={rythmWallModalAssets.arrows.white} alt="" width={16} height={16} className="size-4" />
            </button>
            <button
              type="button"
              tabIndex={-1}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded border border-dealer-brand-primary px-12 py-3"
            >
              <span className="dealer-type-mini-semibold text-dealer-brand-primary">
                {rythmWallProductModal.secondaryCta}
              </span>
              <img src={rythmWallModalAssets.arrows.blue} alt="" width={16} height={16} className="size-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="dealer-modal-row flex h-[415px] gap-4">
        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col gap-4 overflow-visible rounded-lg p-7 backdrop-blur-[10px]"
          style={{
            background: "var(--dealer-surface-white)",
            boxShadow: "var(--dealer-shadow-glass)",
          }}
        >
          <SeriesBlock
            label={rythmWallProductModal.seriesC.label}
            description={rythmWallProductModal.seriesC.description}
            models={seriesCModels}
            activeModelCode={activeModelCode}
            onSelect={onSelectModel}
          />
          <SeriesBlock
            label={rythmWallProductModal.seriesB.label}
            description={rythmWallProductModal.seriesB.description}
            models={seriesBModels}
            activeModelCode={activeModelCode}
            onSelect={onSelectModel}
          />
          <p className="dealer-type-mini-regular text-dealer-text-description">
            {rythmWallProductModal.thumbnailHint}
          </p>
        </div>

        <div
          className="dealer-modal-panel flex h-full min-w-0 flex-1 flex-col rounded-lg p-7 backdrop-blur-[10px]"
          style={{
            background: "var(--dealer-surface-white)",
            boxShadow: "var(--dealer-shadow-video)",
          }}
        >
          <div className="dealer-modal-compact-stack flex h-full gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeModel.code}
                  className="flex flex-col gap-8"
                  initial={specsMotion.initial}
                  animate={specsMotion.animate}
                  exit={specsMotion.exit}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: "easeOut" }}
                >
                  <div className="flex flex-col gap-2.5">
                    <p className="dealer-modal-compact-h2 dealer-type-h2 text-dealer-text-primary">{rythmWallProductModal.specsTitle}</p>
                    <p className="dealer-type-h3 text-dealer-text-secondary">
                      {`${rythmWallProductModal.title} ${activeModel.code}`}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <SpecRow label="Материал" value={activeModel.material} />
                    <SpecRow label="Размеры 1 панели" value={activeModel.dimensions} />
                    <SpecRow label="Толщина материала" value={activeModel.thickness} />
                    <SpecRow label="Вес" value={activeModel.weight} />
                    <SpecRow label="Отделка" value={activeModel.finish} />
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex size-[78px] shrink-0 items-center justify-center">
                <img
                  src={rythmWallModalAssets.ralChart}
                  alt="Палитра RAL"
                  width={64}
                  height={64}
                  className="max-h-[64px] max-w-[64px] object-contain"
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
              {rythmWallExtraFeatures.map((feature) => (
                <FeatureGroup key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductModal({ open, onClose, returnFocusRef, compact = false }: ProductModalProps) {
  const [activeModelCode, setActiveModelCode] = useState<RythmWallModelCode>(RYTHMWALL_DEFAULT_MODEL);

  return (
    <DealerProductModalShell
      open={open}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      dialogId={RYTHMWALL_PRODUCT_MODAL_ID}
      title={rythmWallProductModal.title}
      closeIcon={rythmWallModalAssets.closeIcon}
      compact={compact}
    >
      <RythmWallModalContent activeModelCode={activeModelCode} onSelectModel={setActiveModelCode} />
    </DealerProductModalShell>
  );
}
