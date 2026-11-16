"use client";
import { asset } from "@/lib/asset";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { useLenis } from "lenis/react";
import {
  dealerMotionColors,
  dealerMotionTab,
} from "./dealer-motion";
import { CatalogProductRail } from "./catalog-product-rail";
import { useCatalogLayout } from "./catalog-layout-context";
import { useCatalogCompactLayout } from "./use-catalog-compact-layout";
import { useCatalogRailScrollEnabled } from "./use-viewport-aligned-visibility";
import { dealerCatalogProductsByTab, type DealerCatalogTabId } from "../data/dealer-catalog-products";
import {
  getCatalogSidebarContent,
  type CatalogSidebarContent,
  type CatalogSidebarFeature,
} from "../data/dealer-catalog-sidebar";

const CATALOG_IMAGES = asset("/images/catalog");

const catalogAssets = {
  bullet: `${CATALOG_IMAGES}/bullet.svg`,
  divider: `${CATALOG_IMAGES}/divider.svg`,
  tabWall: `${CATALOG_IMAGES}/tab-wall.svg`,
  tabAcoustic: `${CATALOG_IMAGES}/tab-acoustic.svg`,
  tabCeiling: `${CATALOG_IMAGES}/tab-ceiling.svg`,
  tabSystem: `${CATALOG_IMAGES}/tab-system.svg`,
  arrowWhite: `${CATALOG_IMAGES}/arrow-white.svg`,
  paginationActive: `${CATALOG_IMAGES}/pagination-active.svg`,
  paginationInactive: `${CATALOG_IMAGES}/pagination-inactive.svg`,
} as const;

type CatalogTab = {
  id: DealerCatalogTabId;
  label: string;
  icon: string;
};

const catalogTabs: CatalogTab[] = [
  { id: "wall", label: "Стеновые решения", icon: catalogAssets.tabWall },
  { id: "acoustic", label: "Акустические решения", icon: catalogAssets.tabAcoustic },
  { id: "ceiling", label: "Потолочные решения", icon: catalogAssets.tabCeiling },
  { id: "system", label: "Системные решения", icon: catalogAssets.tabSystem },
];

const DEFAULT_CATALOG_TAB_ID: DealerCatalogTabId = "wall";
const CATALOG_TAB_INACTIVE_OFFSET_CLASS = "translate-y-2";
const CATALOG_FACTS_GAP_PX = 8;
const CATALOG_FACTS_EXPAND_CONTROL_PX = 32;
const CATALOG_FACTS_SECTION_GAP_PX = 16;
/** Compact: высота блока не ограничена, поэтому усечение по budget заменено фиксированным. */
const CATALOG_FACTS_COMPACT_COLLAPSED = 3;

const catalogExpandControlClass =
  "inline-flex items-center gap-2 pl-5 text-xs font-semibold leading-normal text-dealer-brand-primary transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dealer-brand-primary/40";

const CATALOG_HEADING_TITLE = "Каталог продуктов";

/** Шапка каталога: стеклянная плитка со знаком WINAL и постоянное название.
    Заменяет SVG-логотип вкладки (текст в SVG внутри <img> не получал веб-шрифт). */
function CatalogHeading() {
  return (
    <div className="catalog-heading">
      <div className="catalog-heading-tile" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="block size-6 text-dealer-brand-primary" fill="currentColor">
          <rect x="2" y="2" width="9" height="9" rx="2" />
          <rect x="13" y="2" width="9" height="9" rx="2" />
          <rect x="2" y="13" width="9" height="9" rx="2" />
          <rect x="13" y="13" width="9" height="9" rx="2" />
        </svg>
      </div>
      <p className="catalog-heading-title">{CATALOG_HEADING_TITLE}</p>
    </div>
  );
}

function CatalogTabs({
  activeTabId,
  hoveredTabId,
  onTabSelect,
  onTabHover,
  onTabHoverEnd,
}: {
  activeTabId: DealerCatalogTabId;
  hoveredTabId: string | null;
  onTabSelect: (tabId: DealerCatalogTabId) => void;
  onTabHover: (tabId: DealerCatalogTabId) => void;
  onTabHoverEnd: () => void;
}) {

  return (
    <div className="catalog-tabs-reserve flex w-full items-end">
      <div className="catalog-tabs-row flex w-full min-w-0 items-end">
        <div className="catalog-logo-block flex shrink-0 items-center border-b border-dealer-brand-decoration">
          <CatalogHeading />
        </div>

        <div
          role="tablist"
          aria-label="Категории каталога"
          className="catalog-tablist flex min-w-0 flex-1 items-end justify-end gap-1 border-b border-dealer-brand-decoration"
        >
          {catalogTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            const isHighlighted = isActive || tab.id === hoveredTabId;

            return (
              <button
                key={tab.id}
                id={"catalog-" + tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabSelect(tab.id)}
                onMouseEnter={() => onTabHover(tab.id)}
                onMouseLeave={onTabHoverEnd}
                onFocus={() => onTabHover(tab.id)}
                onBlur={onTabHoverEnd}
                className={`catalog-tab-button flex shrink-0 origin-bottom items-center rounded-t-lg border border-dealer-brand-decoration ${dealerMotionTab} ${
                  isHighlighted
                    ? "translate-y-0 text-dealer-text-secondary"
                    : `${CATALOG_TAB_INACTIVE_OFFSET_CLASS} bg-[rgba(241,241,241,0.5)] text-dealer-text-description`
                }`}
              >
                <div className="flex size-8 items-center justify-center shrink-0">
                  <span
                    aria-hidden="true"
                    className={`block size-6 ${dealerMotionColors} ${
                      isHighlighted ? "bg-dealer-brand-primary" : "bg-current"
                    }`}
                    style={{
                      WebkitMaskImage: `url(${tab.icon})`,
                      maskImage: `url(${tab.icon})`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                    }}
                  />
                </div>
                <p
                  className={`dealer-text-trim whitespace-nowrap text-base leading-normal ${
                    isHighlighted ? "font-semibold" : "font-normal"
                  }`}
                >
                  {tab.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function splitCatalogFact(fact: string): { lead: string; body: string } {
  const dotIndex = fact.indexOf(".");

  if (dotIndex === -1) {
    return { lead: fact, body: "" };
  }

  return {
    lead: fact.slice(0, dotIndex + 1),
    body: fact.slice(dotIndex + 1).trimStart(),
  };
}

function CatalogFactRow({ fact }: { fact: string }) {
  const { lead, body } = splitCatalogFact(fact);

  return (
    <div data-fact-row className="relative flex items-center gap-2">
      <img src={catalogAssets.bullet} alt="" width={12} height={11} className="shrink-0 object-contain" />
      <p className="text-xs font-normal leading-normal text-dealer-text-primary">
        <span className="font-medium">{lead}</span>
        {body ? ` ${body}` : null}
      </p>
    </div>
  );
}

/** Одна строка преимущества — общая для десктопного списка и compact-сетки. */
function CatalogFeatureRow({ feature }: { feature: CatalogSidebarFeature }) {
  return (
    <div className="catalog-feature-row flex items-center gap-[10px]">
      <div className="flex size-8 items-center justify-center shrink-0">
        <img src={feature.icon} alt="" className="block max-h-6 max-w-6 object-contain" />
      </div>
      <p className="dealer-text-trim flex-1 text-base font-medium leading-normal text-dealer-text-secondary">
        {feature.label}
      </p>
    </div>
  );
}

function CatalogFeaturesList({
  features,
  compact = false,
}: {
  features: CatalogSidebarFeature[];
  compact?: boolean;
}) {
  if (compact) {
    // Compact: те же строки, но сеткой — разделители десктопного списка
    // в одну/две колонки не переносятся.
    return (
      <div className="catalog-features-grid">
        {features.map((feature) => (
          <CatalogFeatureRow key={feature.label} feature={feature} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {features.map((feature, index) => (
        <div key={feature.label}>
          {index > 0 ? (
            <div className="h-px w-full">
              <img src={catalogAssets.divider} alt="" className="block h-px w-full" />
            </div>
          ) : null}
          <CatalogFeatureRow feature={feature} />
        </div>
      ))}
      <div className="h-px w-full">
        <img src={catalogAssets.divider} alt="" className="block h-px w-full" />
      </div>
    </div>
  );
}

function useCatalogFactsVisibleCount({
  middleRef,
  featuresRef,
  measureRef,
  sidebarRef,
  factsExpanded,
  factsCount,
}: {
  middleRef: RefObject<HTMLDivElement | null>;
  featuresRef: RefObject<HTMLDivElement | null>;
  measureRef: RefObject<HTMLDivElement | null>;
  sidebarRef: RefObject<HTMLElement | null>;
  factsExpanded: boolean;
  factsCount: number;
}) {
  const [visibleCount, setVisibleCount] = useState(factsCount);

  const recompute = useCallback(() => {
    if (factsExpanded) {
      setVisibleCount(factsCount);
      return;
    }

    const middle = middleRef.current;
    const features = featuresRef.current;
    const measure = measureRef.current;

    if (!middle || !measure) {
      return;
    }

    const factsBudget =
      middle.clientHeight - (features?.offsetHeight ?? 0) - CATALOG_FACTS_SECTION_GAP_PX;

    if (factsBudget <= 0) {
      setVisibleCount(0);
      return;
    }

    const rows = measure.querySelectorAll("[data-fact-row]");
    let accumulated = 0;
    let count = 0;

    for (let index = 0; index < rows.length; index += 1) {
      const row = rows[index] as HTMLElement;
      const gapBefore = count > 0 ? CATALOG_FACTS_GAP_PX : 0;
      const reserveExpand = index < rows.length - 1 ? CATALOG_FACTS_EXPAND_CONTROL_PX : 0;
      const nextHeight = gapBefore + row.offsetHeight;

      if (accumulated + nextHeight + reserveExpand > factsBudget) {
        break;
      }

      accumulated += nextHeight;
      count += 1;
    }

    setVisibleCount(count >= rows.length ? factsCount : count);
  }, [factsCount, factsExpanded, featuresRef, measureRef, middleRef]);

  useLayoutEffect(() => {
    recompute();
  }, [recompute]);

  useEffect(() => {
    const middle = middleRef.current;
    const features = featuresRef.current;
    const sidebar = sidebarRef.current;

    if (!middle || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => recompute());
    observer.observe(middle);

    if (features) {
      observer.observe(features);
    }

    if (sidebar) {
      observer.observe(sidebar);
    }

    const onWindowResize = () => recompute();
    window.addEventListener("resize", onWindowResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onWindowResize);
    };
  }, [featuresRef, middleRef, recompute, sidebarRef]);

  return visibleCount;
}

function CatalogFactsSection({
  sidebarRef,
  content,
  compact = false,
}: {
  sidebarRef: RefObject<HTMLElement | null>;
  content: CatalogSidebarContent;
  compact?: boolean;
}) {
  const middleRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [factsExpanded, setFactsExpanded] = useState(false);
  const [foldedHiddenCount, setFoldedHiddenCount] = useState(0);
  const { features, facts } = content;
  const measuredCount = useCatalogFactsVisibleCount({
    middleRef,
    featuresRef,
    measureRef,
    sidebarRef,
    // Compact не меряет budget: высота блока определяется содержимым.
    factsExpanded: factsExpanded || compact,
    factsCount: facts.length,
  });

  const visibleCount = compact
    ? Math.min(CATALOG_FACTS_COMPACT_COLLAPSED, facts.length)
    : measuredCount;
  const collapsedHiddenCount = Math.max(facts.length - visibleCount, 0);

  useEffect(() => {
    if (!factsExpanded) {
      setFoldedHiddenCount(collapsedHiddenCount);
    }
  }, [collapsedHiddenCount, factsExpanded]);

  const showFacts = factsExpanded ? facts : facts.slice(0, visibleCount);
  const canFoldFacts = foldedHiddenCount > 0;

  // Compact раскрывает факты в потоке и переиспользует свёрнутую ветку ниже:
  // overlay поверх иконок нужен только десктопной колонке фиксированной высоты.
  const useOverlayFacts = factsExpanded && !compact;

  return (
    <div
      ref={middleRef}
      className={
        compact
          ? "catalog-sidebar-middle flex flex-col gap-4"
          : "catalog-sidebar-middle relative flex flex-1 flex-col gap-4 min-h-0"
      }
    >
      <div
        ref={featuresRef}
        className={useOverlayFacts ? "pointer-events-none opacity-0" : "shrink-0"}
      >
        <CatalogFeaturesList features={features} compact={compact} />
      </div>

      {compact ? null : (
        <div
          ref={measureRef}
          className="pointer-events-none absolute left-0 top-0 -z-10 w-full opacity-0"
          aria-hidden="true"
        >
          <div className="catalog-sidebar-facts flex flex-col gap-2 pr-2">
            {facts.map((fact) => <CatalogFactRow key={fact} fact={fact} />)}
          </div>
        </div>
      )}

      {useOverlayFacts ? (
        <div
          className="catalog-sidebar-facts-overlay absolute inset-0 z-10 flex min-h-0 flex-col gap-4"
        >
          <div className="catalog-sidebar-facts flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-2">
            {facts.map((fact) => <CatalogFactRow key={fact} fact={fact} />)}
          </div>

          {canFoldFacts ? (
            <button
              type="button"
              className={catalogExpandControlClass}
              aria-expanded={true}
              onClick={() => setFactsExpanded(false)}
            >
              Свернуть
              <img
                src={catalogAssets.arrowWhite}
                alt=""
                width={12}
                height={10}
                className="h-[10px] w-3 -rotate-90 invert"
              />
            </button>
          ) : null}
        </div>
      ) : (
        <div className="flex min-h-0 flex-col gap-4">
          <div className={`catalog-sidebar-facts flex flex-col gap-2 ${compact ? "" : "pr-2"}`}>
            {showFacts.map((fact) => <CatalogFactRow key={fact} fact={fact} />)}
          </div>

          {canFoldFacts ? (
            <button
              type="button"
              className={compact ? `catalog-facts-toggle ${catalogExpandControlClass}` : catalogExpandControlClass}
              aria-expanded={factsExpanded}
              onClick={() => setFactsExpanded((expanded) => !expanded)}
            >
              {factsExpanded ? "Свернуть" : `Развернуть (${foldedHiddenCount})`}
              <img
                src={catalogAssets.arrowWhite}
                alt=""
                width={12}
                height={10}
                className={`h-[10px] w-3 invert ${factsExpanded ? "-rotate-90" : "rotate-90"}`}
              />
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

function CatalogSidebarHeading({ content }: { content: CatalogSidebarContent }) {
  return (
    <div className="catalog-sidebar-header shrink-0 flex flex-col">
      <h2 className="dealer-text-trim text-[32px] font-semibold leading-none text-dealer-text-primary">
        {content.title}
      </h2>
      <p className="text-base font-medium leading-normal text-dealer-text-secondary">
        {content.intro}
      </p>
    </div>
  );
}

function scrollToProjectForm(lenis: ReturnType<typeof useLenis>) {
  const el = document.getElementById("project-form");
  if (!el) {
    return;
  }
  if (lenis) {
    lenis.scrollTo(el, { offset: -12 });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CatalogSidebarCta() {
  const lenis = useLenis();

  return (
    <div className="catalog-sidebar-cta mt-auto shrink-0 flex justify-start">
      <button
        type="button"
        className="catalog-sidebar-cta-btn inline-flex min-w-40 items-center justify-center gap-2 rounded px-12 py-3"
        style={{ background: "var(--dealer-color-brand-primary)" }}
        onClick={() => scrollToProjectForm(lenis)}
      >
        <span className="text-xs font-semibold leading-normal text-dealer-brand-white whitespace-nowrap">
          Обсудить проект
        </span>
        <img src={catalogAssets.arrowWhite} alt="" width={12} height={10} className="h-[10px] w-3" />
      </button>
    </div>
  );
}

function CatalogSidebar({ activeTabId }: { activeTabId: DealerCatalogTabId }) {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const content = getCatalogSidebarContent(activeTabId);

  return (
    <aside ref={sidebarRef} className="catalog-sidebar flex shrink-0 flex-col min-h-0 self-stretch">
      <CatalogSidebarHeading content={content} />
      <CatalogFactsSection key={activeTabId} sidebarRef={sidebarRef} content={content} />
      <CatalogSidebarCta />
    </aside>
  );
}

/**
 * `variant="page"` — блок каталога главной: композиция и поведение не меняются.
 * `variant="lab"` — изолированный маршрут /catalog: на планшетах, телефонах и
 * узких окнах включается compact-композиция со stack-лентой.
 */
export function CatalogSection({ variant = "page" }: { variant?: "page" | "lab" } = {}) {
  const [activeTabId, setActiveTabId] = useState<DealerCatalogTabId>(DEFAULT_CATALOG_TAB_ID);
  const [hoveredTabId, setHoveredTabId] = useState<DealerCatalogTabId | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const isCatalogRailScrollEnabled = useCatalogRailScrollEnabled(sectionRef);
  const catalogLayout = useCatalogLayout();
  const isCompact = useCatalogCompactLayout(variant === "lab");
  const compactSidebarRef = useRef<HTMLElement | null>(null);
  const sidebarContent = getCatalogSidebarContent(activeTabId);
  const lenis = useLenis();

  useEffect(() => {
    const activateLinkedCategory = () => {
      const tab = catalogTabs.find((item) => window.location.hash === "#catalog-" + item.id);
      if (!tab || !sectionRef.current) return;
      setActiveTabId(tab.id);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (lenis) {
        lenis.scrollTo(sectionRef.current, { offset: -96, immediate: reduceMotion });
      } else {
        sectionRef.current.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    };
    activateLinkedCategory();
    window.addEventListener("hashchange", activateLinkedCategory);
    return () => window.removeEventListener("hashchange", activateLinkedCategory);
  }, [lenis]);


  const railColumn = (
    <div className="catalog-rail-column flex min-w-0 flex-1 shrink-0 flex-col catalog-rail-pagination-gap">
      <CatalogProductRail
        key={activeTabId}
        products={dealerCatalogProductsByTab[activeTabId]}
        mode={isCompact ? "stack" : "overlay"}
        wheelEnabled={!isCompact && isCatalogRailScrollEnabled}
        paginationAssets={{
          active: catalogAssets.paginationActive,
          inactive: catalogAssets.paginationInactive,
        }}
        actionIcon={catalogAssets.arrowWhite}
        tabId={activeTabId}
      />
    </div>
  );

  return (
    <section
      ref={sectionRef}
      data-catalog-section
      {...(variant === "lab"
        ? // Зеркалит JS-состояние compact для QA: должно совпадать с медиазапросом в globals.css.
          { "data-catalog-variant": variant, "data-catalog-compact": isCompact ? "true" : "false" }
        : {})}
      data-header-density-trigger
      data-header-compact={catalogLayout?.headerCompact ? "true" : "false"}
      className="catalog-section-shell dealer-section-glass flex flex-col items-center rounded-lg"
    >
      <div className="catalog-section-inner flex w-full flex-col">
        <CatalogTabs
          activeTabId={activeTabId}
          hoveredTabId={hoveredTabId}
          onTabSelect={setActiveTabId}
          onTabHover={setHoveredTabId}
          onTabHoverEnd={() => setHoveredTabId(null)}
        />

        <div className="catalog-content-row flex w-full items-stretch" role="tabpanel">
          {isCompact ? (
            // Compact: заголовок → лид → карточки → факты → CTA.
            // Порядок задаётся разметкой, а не CSS `order`, поэтому чтение,
            // таб-порядок и визуальная последовательность совпадают.
            <>
              <CatalogSidebarHeading content={sidebarContent} />
              {railColumn}
              <CatalogFactsSection
                key={activeTabId}
                sidebarRef={compactSidebarRef}
                content={sidebarContent}
                compact
              />
              <CatalogSidebarCta />
            </>
          ) : (
            <>
              <CatalogSidebar activeTabId={activeTabId} />
              {railColumn}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
