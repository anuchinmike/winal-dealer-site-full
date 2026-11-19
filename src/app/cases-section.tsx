"use client";
import { asset } from "@/lib/asset";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  dealerCaseCategoryChips,
  dealerCases,
  type DealerCase,
  type DealerCaseCategoryId,
} from "@/data/dealer-cases";
import { CaseDetailBody, CasesModal } from "@/app/cases-modal";
import { CaseGalleryCard, CasesGalleryRail } from "@/app/cases-gallery-rail";
import { openCasePhotoGallery } from "@/app/case-fancybox";
import { useViewportAlignedVisibility } from "@/app/use-viewport-aligned-visibility";

const COMPACT_VIEWPORT_MEDIA = "(max-width: 1279px)";
const PAGE_SIZE = 6;

function subscribeToCompactViewport(onChange: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }

  const mql = window.matchMedia(COMPACT_VIEWPORT_MEDIA);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getIsCompactViewport() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia(COMPACT_VIEWPORT_MEDIA).matches;
}

function useIsCompactViewport() {
  return useSyncExternalStore(subscribeToCompactViewport, getIsCompactViewport, () => false);
}

type GalleryFilterId = DealerCaseCategoryId | "all";

const UI = asset("/images/home/cases/ui");

const galleryFilterChips: { id: GalleryFilterId; label: string; icon: string }[] = [
  { id: "all", label: "Все", icon: `${UI}/icon-all.svg` },
  ...dealerCaseCategoryChips,
];

export function CasesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const isCasesViewportAligned = useViewportAlignedVisibility(sectionRef);
  const isCompactViewport = useIsCompactViewport();

  const defaultCase = dealerCases.find((item) => item.slug === "padel-centr") ?? dealerCases[0];
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilterId>("all");
  const [activeCaseId, setActiveCaseId] = useState(defaultCase.id);
  const [heroIndex, setHeroIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredGalleryCases = useMemo(() => {
    if (galleryFilter === "all") {
      return dealerCases;
    }

    return dealerCases.filter((item) => item.categoryId === galleryFilter);
  }, [galleryFilter]);

  const visibleCases = useMemo(
    () => (isCompactViewport ? filteredGalleryCases.slice(0, visibleCount) : filteredGalleryCases),
    [filteredGalleryCases, isCompactViewport, visibleCount],
  );

  const activeCase = useMemo(() => {
    return (
      filteredGalleryCases.find((item) => item.id === activeCaseId) ??
      filteredGalleryCases[0] ??
      defaultCase
    );
  }, [activeCaseId, defaultCase, filteredGalleryCases]);

  const heroImages = activeCase.heroImages.length > 0 ? activeCase.heroImages : [activeCase.heroImage];
  const safeHeroIndex = heroImages.length > 0 ? heroIndex % heroImages.length : 0;
  const heroCrop = activeCase.heroCrop ?? { height: "118.23%", top: "-9.11%" };

  useEffect(() => {
    if (!isCompactViewport) {
      setModalOpen(false);
    }
  }, [isCompactViewport]);

  const handleFilterChange = (id: GalleryFilterId) => {
    setGalleryFilter(id);
    setVisibleCount(PAGE_SIZE);
    setModalOpen(false);
  };

  const handleDesktopSelect = (caseItem: DealerCase) => {
    setActiveCaseId(caseItem.id);
    setHeroIndex(0);
  };

  const handleCompactSelect = (caseItem: DealerCase, trigger: HTMLButtonElement) => {
    returnFocusRef.current = trigger;
    setActiveCaseId(caseItem.id);
    setHeroIndex(0);
    setModalOpen(true);
  };

  const handleSelectCaseInModal = (caseItem: DealerCase) => {
    setActiveCaseId(caseItem.id);
    setHeroIndex(0);
  };

  const openGallery = () => {
    openCasePhotoGallery(heroImages, safeHeroIndex);
  };

  return (
    <section
      ref={sectionRef}
      id="cases"
      data-header-density-trigger
      className="dealer-cases-section dealer-section-glass flex h-[942px] w-full max-w-[1472px] flex-col items-center rounded-lg p-12"
      aria-labelledby="dealer-cases-title"
    >
      <div className="dealer-cases-inner flex h-[846px] w-full max-w-[1376px] flex-col gap-4">
        <header className="dealer-cases-header flex h-[103px] w-full flex-col gap-7">
          <p className="dealer-text-trim text-base font-semibold uppercase leading-normal text-dealer-brand-primary">
            ПРИМЕРЫ РЕШЕНИЙ
          </p>
          <h2 id="dealer-cases-title" className="dealer-cases-h2 dealer-text-trim text-[64px] font-semibold leading-none text-dealer-text-primary">
            Выполненные проекты WINAL
          </h2>
        </header>

        <div role="tablist" aria-label="Фильтр проектов" className="dealer-cases-filters flex h-10 w-full gap-4">
          {galleryFilterChips.map((chip) => {
            const isActive = chip.id === galleryFilter;
            return (
              <button
                key={chip.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilterChange(chip.id)}
                className="dealer-cases-filter-chip flex h-10 shrink-0 items-center justify-center gap-2 rounded-[4px] px-4 py-2 text-dealer-text-secondary backdrop-blur-[21.875px]"
                style={{ boxShadow: "0 4px 32px rgba(1, 88, 171, 0.1)", background: "var(--dealer-surface-white)" }}
              >
                <img src={chip.icon} alt="" width={24} height={24} className="size-6 shrink-0" />
                <span className="dealer-cases-filter-chip-label dealer-text-trim text-base font-medium leading-normal">
                  {chip.label}
                </span>
              </button>
            );
          })}
        </div>

        {isCompactViewport ? (
          <>
            <div className="dealer-cases-grid">
              {visibleCases.map((caseItem) => (
                <CaseGalleryCard
                  key={caseItem.id}
                  caseItem={caseItem}
                  variant="grid"
                  onSelect={handleCompactSelect}
                />
              ))}
            </div>
            {visibleCount < filteredGalleryCases.length ? (
              <button
                type="button"
                className="dealer-cases-more"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              >
                Показать ещё
              </button>
            ) : null}
            <CasesModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              returnFocusRef={returnFocusRef}
              cases={filteredGalleryCases}
              activeCase={activeCase}
              onSelectCase={handleSelectCaseInModal}
              heroIndex={heroIndex}
              onHeroIndex={setHeroIndex}
            />
          </>
        ) : (
          <>
            <CasesGalleryRail
              cases={filteredGalleryCases}
              onSelect={handleDesktopSelect}
              wheelEnabled={isCasesViewportAligned}
              nativeScroll={false}
            />
            <CaseDetailBody
              activeCase={activeCase}
              heroImages={heroImages}
              safeHeroIndex={safeHeroIndex}
              heroCrop={heroCrop}
              onHeroIndex={setHeroIndex}
              openGallery={openGallery}
            />
          </>
        )}
      </div>
    </section>
  );
}
