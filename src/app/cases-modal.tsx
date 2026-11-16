"use client";
import Link from "next/link";
import { asset } from "@/lib/asset";

import { useEffect, useMemo, type Dispatch, type RefObject, type SetStateAction } from "react";
import { Fancybox } from "@fancyapps/ui";
import {
  type DealerCase,
  type DealerCaseImageCrop,
  type DealerCaseProductTile,
} from "@/data/dealer-cases";
import { openCasePhotoGallery } from "@/app/case-fancybox";
import { openDealerProductModal } from "@/app/dealer-product-modal-bridge";
import { resolveCaseProductTile } from "@/data/dealer-case-product-map";
import { DealerProductModalShell } from "@/app/dealer-product-modal-shell";
import { HeroGlassNavButton } from "@/app/hero-glass-nav-button";
import { ModalNeighborNav } from "@/app/dealer-modal-neighbor-nav";

const UI = asset("/images/home/cases/ui");
const CLOSE_ICON = asset("/images/product-modal/rythmwall/icon-close.webp");
const CASES_DIALOG_ID = "dealer-cases-modal";

const uiAssets = {
  arrowWhiteLeft: `${UI}/arrow-white-left.svg`,
  iconExternalLink: `${UI}/icon-external-link.svg`,
} as const;

function cropStyle(crop?: DealerCaseImageCrop) {
  if (!crop) {
    return undefined;
  }
  const { width, height, top, left } = crop;
  return { width, height, top, left };
}

function isFancyboxOpen() {
  return Fancybox.getInstance() != null;
}

function CaseProductTileMedia({ image }: { image: string }) {
  return (
    <div
      className="flex h-[124px] w-full items-center justify-center overflow-hidden rounded bg-dealer-brand-white backdrop-blur-[21.875px]"
      style={{ boxShadow: "0 4px 32px rgba(1, 88, 171, 0.1)" }}
    >
      <div className="relative h-full w-full overflow-hidden rounded">
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover object-bottom"
        />
      </div>
    </div>
  );
}

function CaseProductTiles({ products }: { products: DealerCaseProductTile[] }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="dealer-cases-product-tiles flex w-full gap-4">
      {products.map((product, index) => {
        const isFourth = index === 3;
        const resolved = resolveCaseProductTile(product.productLabel);
        const image = resolved?.image ?? product.image;
        const tileClassName = "flex min-w-0 max-w-[calc(50%-8px)] flex-1 flex-col justify-start";
        const labels = (
          <div className="flex flex-col gap-1 py-2 text-xs font-semibold leading-normal items-start">
            <p className="text-dealer-text-secondary">{product.categoryLabel}</p>
            <p className={`text-dealer-text-primary ${isFourth ? "whitespace-nowrap" : ""}`}>
              {product.productLabel}
            </p>
          </div>
        );

        if (resolved?.canOpenModal) {
          return (
            <button
              key={`${product.productLabel}-${image}`}
              type="button"
              className={`${tileClassName} cursor-pointer text-left transition-opacity hover:opacity-80`}
              aria-haspopup="dialog"
              aria-label={`${product.productLabel}: подробнее`}
              onClick={(event) => openDealerProductModal(resolved.action, event.currentTarget)}
            >
              <CaseProductTileMedia image={image} />
              {labels}
            </button>
          );
        }

        return (
          <div key={`${product.productLabel}-${image}`} className={tileClassName}>
            <CaseProductTileMedia image={image} />
            {labels}
          </div>
        );
      })}
    </div>
  );
}

export function CaseDetailBody({
  activeCase,
  heroImages,
  safeHeroIndex,
  heroCrop,
  onHeroIndex,
  openGallery,
}: {
  activeCase: DealerCase;
  heroImages: string[];
  safeHeroIndex: number;
  heroCrop?: DealerCaseImageCrop;
  onHeroIndex: Dispatch<SetStateAction<number>>;
  openGallery: () => void;
}) {
  return (
    <div className="dealer-cases-detail-row flex h-[452px] w-full items-stretch gap-4">
      <div className="dealer-cases-hero relative flex h-[452px] w-[678px] shrink-0 items-center justify-between overflow-hidden rounded-lg px-4">
        <button
          type="button"
          aria-label="Открыть фото на весь экран"
          onClick={openGallery}
          className="absolute inset-0 z-[1] cursor-zoom-in overflow-hidden rounded-lg"
        >
          <img
            src={heroImages[safeHeroIndex]}
            alt=""
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute inset-0 left-0 size-full max-w-none object-cover"
            style={cropStyle(heroCrop)}
          />
        </button>
        <HeroGlassNavButton
          direction="left"
          ariaLabel="Предыдущее фото"
          onClick={() => onHeroIndex((index) => (index - 1 + heroImages.length) % heroImages.length)}
        />
        <HeroGlassNavButton
          direction="right"
          ariaLabel="Следующее фото"
          onClick={() => onHeroIndex((index) => (index + 1) % heroImages.length)}
        />
      </div>

      <div
        className="dealer-cases-detail flex min-h-[452px] min-w-0 flex-1 flex-col gap-4 self-stretch rounded-lg bg-dealer-brand-white p-7 backdrop-blur-[10px]"
        style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)" }}
      >
        <div className="flex w-full flex-col gap-4">
          <p className="dealer-text-trim text-base font-medium leading-normal text-dealer-brand-primary">
            {activeCase.categoryEyebrow}
          </p>
          <h3 className="text-[32px] font-semibold leading-none text-dealer-text-primary">{activeCase.title}</h3>
          <p className="text-base font-medium leading-normal text-dealer-text-secondary">{activeCase.description}</p>
        </div>

        <CaseProductTiles products={activeCase.products} />

        <div className="dealer-cases-actions flex gap-6">
          <button
            type="button"
            onClick={openGallery}
            className="inline-flex h-10 min-w-[160px] items-center justify-center gap-2 rounded bg-dealer-brand-primary px-12 py-3"
          >
            <img src={uiAssets.arrowWhiteLeft} alt="" width={12} height={10} className="h-[10px] w-3 shrink-0" />
            <span className="text-xs font-semibold leading-normal text-dealer-brand-white">Открыть галерею</span>
          </button>
          <Link
            href={`/projects/${activeCase.slug}`}
            className="inline-flex h-10 min-w-[160px] items-center justify-center gap-2 rounded border border-dealer-brand-primary px-12 py-3"
          >
            <span className="whitespace-nowrap text-xs font-semibold leading-normal text-dealer-brand-primary">Страница проекта</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CasesModal({
  open,
  onClose,
  returnFocusRef,
  cases,
  activeCase,
  onSelectCase,
  heroIndex,
  onHeroIndex,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  cases: DealerCase[];
  activeCase: DealerCase;
  onSelectCase: (caseItem: DealerCase) => void;
  heroIndex: number;
  onHeroIndex: Dispatch<SetStateAction<number>>;
}) {
  const heroImages = activeCase.heroImages.length > 0 ? activeCase.heroImages : [activeCase.heroImage];
  const safeHeroIndex = heroImages.length > 0 ? heroIndex % heroImages.length : 0;
  const heroCrop = activeCase.heroCrop ?? { height: "118.23%", top: "-9.11%" };

  const neighbors = useMemo(() => {
    if (cases.length < 2) {
      return null;
    }
    const index = Math.max(0, cases.findIndex((item) => item.id === activeCase.id));
    return {
      prev: cases[(index - 1 + cases.length) % cases.length],
      next: cases[(index + 1) % cases.length],
    };
  }, [activeCase.id, cases]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>("#dealer-cases-modal .dealer-modal-compact-scroll")?.scrollTo({ top: 0 });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeCase.id, open]);

  useEffect(() => {
    if (!open || !neighbors) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }
      if (isFancyboxOpen()) {
        return;
      }
      event.preventDefault();
      onSelectCase(event.key === "ArrowLeft" ? neighbors.prev : neighbors.next);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [neighbors, onSelectCase, open]);

  const openGallery = () => {
    openCasePhotoGallery(heroImages, safeHeroIndex);
  };

  return (
    <DealerProductModalShell
      open={open}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      dialogId={CASES_DIALOG_ID}
      title={activeCase.title}
      closeIcon={CLOSE_ICON}
      compact
      enableProductNav={false}
      footer={
        neighbors ? (
          <ModalNeighborNav
            label="Листание кейсов"
            compact
            prev={{ title: neighbors.prev.galleryTitle, image: neighbors.prev.galleryThumb }}
            next={{ title: neighbors.next.galleryTitle, image: neighbors.next.galleryThumb }}
            prevEyebrow="Предыдущий кейс"
            nextEyebrow="Следующий кейс"
            onPrev={() => onSelectCase(neighbors.prev)}
            onNext={() => onSelectCase(neighbors.next)}
          />
        ) : null
      }
    >
      <div className="dealer-cases-modal-stack flex flex-col gap-4">
        <CaseDetailBody
          activeCase={activeCase}
          heroImages={heroImages}
          safeHeroIndex={safeHeroIndex}
          heroCrop={heroCrop}
          onHeroIndex={onHeroIndex}
          openGallery={openGallery}
        />
      </div>
    </DealerProductModalShell>
  );
}
