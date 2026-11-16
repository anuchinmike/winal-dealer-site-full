"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode, type RefObject } from "react";
import {
  CatalogLayoutProvider,
} from "./catalog-layout-context";
import { isViewportAlignedVisible } from "./use-viewport-aligned-visibility";
import { HeroCaptions } from "./hero-captions";

type HeroAssets = {
  headerLogo: string;
  headerLogoGlass: string;
  heroVideoSrc: string;
  heroVideoPoster: string;
  heroVideoStill: string;
  heroLiquidIcon: string;
  heroCornerMark: string;
  pageBackgroundGlass: string;
};

type ViewportMetrics = {
  fullWidth: number;
  fullHeight: number;
  headerOffset: number;
  stageTop: number;
};

// Фазы scroll-сцены:
// 1) text card уходит вверх
// 2) video расширяется до viewport
// 3) video уходит вверх, а снизу входит следующий блок
const PHASE_TEXT_END = 0.4;
const SURFACE_ENTER_AT_EXIT = 0.3;
const TEXT_CARD_START_OFFSET = 340;
const TEXT_CARD_CANON_HEIGHT = 453;
const TEXT_CARD_EXIT_DISTANCE = 1340;
const VIDEO_TRIGGER_TOP = -80;
const VIDEO_TRIGGER_DISTANCE = 320;
const FOOTER_GLASS_FADE_DISTANCE = 240;
const SCROLL_CURSOR_SIZE = { width: 100, height: 128 } as const;
const SCROLL_CURSOR_HOTSPOT = { x: 50, y: 54 } as const;
const SCROLL_CURSOR_HIDE_EXIT_PROGRESS = 0.98;
const DESKTOP_CURSOR_MEDIA = "(pointer: fine) and (min-width: 1024px)";
// Single sitewide threshold shared with the catalog's desktop-pointer contract:
// below it, hero drops the 420vh scroll-scene and the header stays permanently
// compact (mobile menu trigger) instead of collapsing only post-hero.
const COMPACT_VIEWPORT_MEDIA = "(max-width: 1279px)";

function subscribeToMediaQuery(query: string) {
  return (onChange: () => void) => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return () => {};
    }

    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

function getMediaQueryMatches(query: string) {
  return () => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false;
    }

    return window.matchMedia(query).matches;
  };
}

const subscribeToCompactViewport = subscribeToMediaQuery(COMPACT_VIEWPORT_MEDIA);
const getIsCompactViewport = getMediaQueryMatches(COMPACT_VIEWPORT_MEDIA);

/** Server/first snapshot assumes desktop so hydration matches the fixed-canon markup. */
function useIsCompactViewport() {
  return useSyncExternalStore(subscribeToCompactViewport, getIsCompactViewport, () => false);
}

const DEFAULT_METRICS: ViewportMetrics = {
  fullWidth: 1472,
  fullHeight: 780,
  headerOffset: 120,
  stageTop: 360,
};

const HEADER_TOP_OFFSET_PX = 24;
const CATALOG_BOTTOM_SAFETY_PX = 24;
const SECTION_STACK_GAP_PX = 240;
const SURFACE_SECTION_HEIGHT_PX = 234 * 4;
// Когда 420vh-сцена заканчивается, sticky снимается: Surface bottom ≈ 1067px от верха viewport.
const HERO_STICKY_TOP_AT_SCENE_END_PX = 131;
const POST_SCENE_STACK_MARGIN_TOP = `calc(${SECTION_STACK_GAP_PX}px + ${HERO_STICKY_TOP_AT_SCENE_END_PX + SURFACE_SECTION_HEIGHT_PX}px - 100vh)`;

function getHeaderZonePx() {
  const rootStyle = getComputedStyle(document.documentElement);
  const headerH = Number.parseFloat(rootStyle.getPropertyValue("--dealer-header-h")) || 96;
  const topOffset = Number.parseFloat(rootStyle.getPropertyValue("--dealer-header-top")) || HEADER_TOP_OFFSET_PX;
  return headerH + topOffset;
}

function isSectionInViewport(rect: DOMRect, viewportHeight: number) {
  return rect.bottom > 0 && rect.top < viewportHeight;
}

function sectionNeedsCompactHeader(
  sectionHeight: number,
  viewportHeight: number,
  headerZone: number,
  safetyGap: number,
) {
  return sectionHeight + headerZone + safetyGap > viewportHeight;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

// Нормализует общий scroll-progress в локальный progress отдельной фазы.
function phaseProgress(progress: number, start: number, end: number) {
  if (end <= start) return 0;
  return clamp((progress - start) / (end - start), 0, 1);
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`w-344 max-w-full ${className}`}>{children}</div>;
}

function scrollToSection(id: string, lenis: ReturnType<typeof useLenis>) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -12 });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function PrimaryButton({ label, width, targetId }: { label: string; width?: number; targetId?: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      className="dealer-btn-primary inline-flex min-w-40 items-center justify-center rounded px-12 py-3"
      style={{
        width: width ? `${width}px` : undefined,
        background: "var(--dealer-color-brand-primary)",
      }}
      onClick={targetId ? () => scrollToSection(targetId, lenis) : undefined}
    >
      <span className="text-xs font-semibold leading-normal text-dealer-brand-white whitespace-nowrap">{label}</span>
    </button>
  );
}

function OutlineButton({ label, width, targetId }: { label: string; width?: number; targetId?: string }) {
  const lenis = useLenis();
  return (
    <button
      type="button"
      className="dealer-btn-outline inline-flex min-w-40 items-center justify-center rounded border border-dealer-brand-primary px-12 py-3"
      style={{ width: width ? `${width}px` : undefined }}
      onClick={targetId ? () => scrollToSection(targetId, lenis) : undefined}
    >
      <span className="text-xs font-semibold leading-normal text-dealer-brand-primary whitespace-nowrap">{label}</span>
    </button>
  );
}

// Геометрия из visual/review/prototypes/Vector.svg — без stroke.
const CORNER_MARK_PATH =
  "M68.6316 59.7523L75.5389 0.00325181H72.2406C23.0526 -0.216318 13.7093 10.5938 7.2983 59.7523H68.6316ZM80.6667 0.00325203L73.7594 59.7523H134.652C136.782 42.0538 142 0.00325203 142 0.00325203H80.6667ZM73.1078 64.9148L66.2306 124H70.1855C119.674 124 127.018 117.321 134 64.9148H73.1078ZM68.2106 64.9148H6.6567C4.3008 82.838 0 124 0 124H61.3333L68.2106 64.9148Z";

const HERO_LOGO_MARK = {
  width: 142,
  height: 124,
  right: 23,
  bottom: 23,
} as const;

const LOGO_WINDOW_CLIP = {
  clipPath: `path("${CORNER_MARK_PATH}")`,
  WebkitClipPath: `path("${CORNER_MARK_PATH}")`,
} as const;

const LOGO_WINDOW_SHADOW =
  "0px 2px 8px rgba(0, 0, 0, 0.10), inset 0px 0px 8px rgba(170, 170, 170, 0.50), inset 0px 0px 0.5px rgba(255, 255, 255, 0.50)";

function getHeroCardGlassCutoutMask(): Pick<
  CSSProperties,
  | "maskImage"
  | "WebkitMaskImage"
  | "maskSize"
  | "WebkitMaskSize"
  | "maskPosition"
  | "WebkitMaskPosition"
  | "maskRepeat"
  | "WebkitMaskRepeat"
  | "maskComposite"
  | "WebkitMaskComposite"
> {
  const logoMaskSvg = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${HERO_LOGO_MARK.width} ${HERO_LOGO_MARK.height}"><path d="${CORNER_MARK_PATH}" fill="white"/></svg>`,
  )}")`;

  return {
    WebkitMaskImage: `linear-gradient(#fff, #fff), ${logoMaskSvg}`,
    maskImage: `linear-gradient(#fff, #fff), ${logoMaskSvg}`,
    WebkitMaskSize: `100% 100%, ${HERO_LOGO_MARK.width}px ${HERO_LOGO_MARK.height}px`,
    maskSize: `100% 100%, ${HERO_LOGO_MARK.width}px ${HERO_LOGO_MARK.height}px`,
    WebkitMaskPosition: `0 0, right ${HERO_LOGO_MARK.right}px bottom ${HERO_LOGO_MARK.bottom}px`,
    maskPosition: `0 0, right ${HERO_LOGO_MARK.right}px bottom ${HERO_LOGO_MARK.bottom}px`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskComposite: "destination-out",
    maskComposite: "exclude",
  };
}

function HeroGlassCardLayers() {
  return (
    <>
      <div
        aria-hidden
        className="dealer-hero-glass-fill pointer-events-none absolute inset-0 backdrop-blur-[10px]"
        style={{
          background: "var(--dealer-surface-glass-linear)",
          ...getHeroCardGlassCutoutMask(),
        }}
      />
      <LiquidGlassCornerMark className="bottom-[23px] right-[23px] z-[1]" />
    </>
  );
}

function HeroVideoMedia({ assets, autoPlay = true }: { assets: HeroAssets; autoPlay?: boolean }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  return (
    <>
      <video
        ref={videoRef}
        src={assets.heroVideoSrc}
        poster={assets.heroVideoPoster}
        autoPlay={autoPlay}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 size-full object-cover"
      />
      <HeroCaptions videoRef={videoRef} />
    </>
  );
}

const COMPACT_HERO_VIDEO_START = 4;

function CompactHeroVideo({ assets }: { assets: HeroAssets }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [frameReady, setFrameReady] = useState(false);

  const onToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      return;
    }
    video.pause();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;

    const shouldAutoplay = () =>
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let primed = false;

    const afterSeek = () => {
      if (cancelled) return;
      if (video.currentTime < COMPACT_HERO_VIDEO_START - 0.05) {
        video.currentTime = COMPACT_HERO_VIDEO_START;
        return;
      }
      if (primed) return;
      primed = true;
      setFrameReady(true);
      if (!shouldAutoplay()) {
        video.pause();
        setPlaying(false);
        return;
      }
      void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };

    const seekToStart = () => {
      if (cancelled) return;
      if (Math.abs(video.currentTime - COMPACT_HERO_VIDEO_START) < 0.05) {
        afterSeek();
        return;
      }
      video.currentTime = COMPACT_HERO_VIDEO_START;
    };

    const onPlaying = () => {
      if (cancelled) return;
      if (video.currentTime < COMPACT_HERO_VIDEO_START - 0.05) {
        video.currentTime = COMPACT_HERO_VIDEO_START;
      }
    };

    video.addEventListener("loadedmetadata", seekToStart);
    video.addEventListener("seeked", afterSeek);
    video.addEventListener("playing", onPlaying);
    if (video.readyState >= 1) seekToStart();

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", seekToStart);
      video.removeEventListener("seeked", afterSeek);
      video.removeEventListener("playing", onPlaying);
    };
  }, []);

  return (
    <div
      className="dealer-hero-video-frame relative w-full rounded-lg border border-[rgba(255,255,255,0.1)]"
      style={{ aspectRatio: "3560 / 2002" }}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={playing ? "Пауза" : "Смотреть ролик"}
    >
      <video
        ref={videoRef}
        src={`${assets.heroVideoSrc}#t=${COMPACT_HERO_VIDEO_START}`}
        muted
        playsInline
        preload="auto"
        width={1920}
        height={1080}
        className="pointer-events-none absolute inset-0 size-full rounded-lg object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          const video = videoRef.current;
          if (!video) return;
          video.currentTime = COMPACT_HERO_VIDEO_START;
          void video.play();
        }}
      />
      {frameReady ? null : (
        <img
          src={assets.heroVideoStill}
          alt=""
          width={1920}
          height={1080}
          decoding="async"
          className="dealer-hero-poster-img pointer-events-none absolute inset-0 size-full rounded-lg object-cover"
        />
      )}
      {playing ? null : <span className="dealer-hero-play-mark" aria-hidden />}
      {playing ? <HeroCaptions videoRef={videoRef} compact /> : null}
    </div>
  );
}

function getHeroTextProgress(progress: number) {
  return phaseProgress(progress, 0, PHASE_TEXT_END);
}

function getTextCardStartOffset(metrics: ViewportMetrics) {
  const stageHeight = Math.max(0, metrics.fullHeight - 120);
  const cardBudget = Math.min(TEXT_CARD_CANON_HEIGHT, Math.max(300, stageHeight - 48));
  const maxTop = stageHeight - cardBudget - 16;
  return Math.min(TEXT_CARD_START_OFFSET, Math.max(16, maxTop));
}

function getHeroTextTop(progress: number, metrics: ViewportMetrics) {
  return (
    metrics.headerOffset +
    getTextCardStartOffset(metrics) -
    metrics.stageTop -
    getHeroTextProgress(progress) * TEXT_CARD_EXIT_DISTANCE
  );
}

function getHeroVideoExpand(progress: number, metrics: ViewportMetrics) {
  return phaseProgress(VIDEO_TRIGGER_TOP - getHeroTextTop(progress, metrics), 0, VIDEO_TRIGGER_DISTANCE);
}

function getHeroVideoExit(progress: number, metrics: ViewportMetrics) {
  if (getHeroTextProgress(progress) < 1 || getHeroVideoExpand(progress, metrics) < 1) return 0;
  return phaseProgress(progress, PHASE_TEXT_END, 1);
}

function isHeroVideoScrollCursorActive(progress: number, metrics: ViewportMetrics) {
  return getHeroVideoExit(progress, metrics) < SCROLL_CURSOR_HIDE_EXIT_PROGRESS;
}

function useHeroVideoScrollCursor(scrollYProgress: MotionValue<number>, metrics: ViewportMetrics) {
  const [active, setActive] = useState(() => isHeroVideoScrollCursorActive(scrollYProgress.get(), metrics));

  useLayoutEffect(() => {
    setActive(isHeroVideoScrollCursorActive(scrollYProgress.get(), metrics));
  }, [metrics, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActive(isHeroVideoScrollCursorActive(progress, metrics));
  });

  return active;
}

function HeroScrollCursorGraphic({ animated }: { animated: boolean }) {
  const wheelTransition = animated
    ? { duration: 1.1, repeat: Infinity, ease: "easeInOut" as const }
    : { duration: 0 };
  const arrowTransition = animated
    ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" as const }
    : { duration: 0 };

  return (
    <svg
      width={SCROLL_CURSOR_SIZE.width}
      height={SCROLL_CURSOR_SIZE.height}
      viewBox="0 0 101 129"
      fill="none"
      aria-hidden
      className="block"
    >
      <defs>
        <filter
          id="hero-scroll-cursor-shadow"
          x="0"
          y="0"
          width="101"
          height="128.207"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="20" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
      <g filter="url(#hero-scroll-cursor-shadow)">
        <path
          d="M50.5001 36.5C45.6185 36.5 40.5003 41.6184 40.5001 46.5C40.5 48.5 40.5 57.5 40.5 60C40.5002 64.8502 45.5001 69.5 50.5001 69.5C55.5001 69.5 60.5 65.0391 60.5 60C60.5 58 60.5 49 60.5 46.5C60.5001 41.6184 55.3817 36.5 50.5001 36.5Z"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          shapeRendering="crispEdges"
        />
        <motion.path
          d="M50.5001 43.5L50.5 48"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          animate={animated ? { opacity: [1, 0.45, 1], y: [0, 1.5, 0] } : { opacity: 1, y: 0 }}
          transition={wheelTransition}
        />
        <motion.g
          animate={animated ? { y: [0, 4, 0], opacity: [1, 0.55, 1] } : { y: 0, opacity: 1 }}
          transition={arrowTransition}
        >
          <path d="M45.5001 72L50.5001 77L55.5001 72" stroke="white" strokeWidth={2} strokeLinecap="round" />
          <path d="M45.5001 78.5L50.5001 83.5L55.5001 78.5" stroke="white" strokeWidth={2} strokeLinecap="round" />
        </motion.g>
      </g>
    </svg>
  );
}

function HeroVideoScrollCursorOverlay({
  active,
  containerRef,
}: {
  active: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const media = window.matchMedia(DESKTOP_CURSOR_MEDIA);
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node || !active || !isDesktop) {
      setVisible(false);
      return;
    }

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    node.addEventListener("mouseenter", onEnter);
    node.addEventListener("mouseleave", onLeave);
    node.addEventListener("mousemove", onMove);

    return () => {
      node.removeEventListener("mouseenter", onEnter);
      node.removeEventListener("mouseleave", onLeave);
      node.removeEventListener("mousemove", onMove);
    };
  }, [active, containerRef, isDesktop]);

  if (!active || !isDesktop) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[300]"
      style={{
        transform: `translate3d(${position.x - SCROLL_CURSOR_HOTSPOT.x}px, ${position.y - SCROLL_CURSOR_HOTSPOT.y}px, 0)`,
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <HeroScrollCursorGraphic animated={!prefersReducedMotion} />
    </div>
  );
}

function LiquidGlassCornerMark({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`dealer-hero-corner-mark pointer-events-none absolute h-31 w-[142px] ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          ...LOGO_WINDOW_CLIP,
          background: "rgba(7, 172, 106, 0.15)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          boxShadow: LOGO_WINDOW_SHADOW,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          ...LOGO_WINDOW_CLIP,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage:
            "linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 44%, rgba(0, 0, 0, 0.45) 72%, rgba(0, 0, 0, 0.85) 100%)",
          WebkitMaskImage:
            "linear-gradient(135deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 44%, rgba(0, 0, 0, 0.45) 72%, rgba(0, 0, 0, 0.85) 100%)",
        }}
      />
    </div>
  );
}

const HERO_TEXT_CARD_SHELL_CLASS =
  "dealer-hero-text-card relative flex w-[1026px] max-w-[calc(100%+50px)] flex-col items-start justify-start gap-12 overflow-hidden rounded border py-12 pl-12 pr-24";

const HERO_TEXT_CARD_BORDER_STYLE = {
  borderColor: "var(--dealer-border-glass)",
  boxShadow: "var(--dealer-shadow-glass)",
} as const;

// Same four labels as the desktop inline "A | B | C | D" reading — rendered as a
// list so the compact mobile panel can stack them, while desktop CSS re-joins
// them with a generated "  |  " separator to keep the current visual unchanged.
const HEADER_NAV_ITEMS = [
  { label: "О бренде", href: "#complex-approach" },
  { label: "Каталог", href: "/catalog" },
  { label: "Реализованные проекты", href: "/projects" },
  { label: "Контакты", href: "#project-form" },
];

function HeroTextCardContent({ children }: { children: ReactNode }) {
  return <div className="dealer-hero-text-inner relative z-[2] flex w-full flex-col items-start justify-start gap-12">{children}</div>;
}

function StickyHeader({
  assets,
  compact,
  expanded,
  onLogoClick,
  glassLogoButtonRef,
}: {
  assets: HeroAssets;
  compact: boolean;
  expanded: boolean;
  onLogoClick: () => void;
  glassLogoButtonRef?: RefObject<HTMLButtonElement | null>;
}) {
  const showMain = !compact || expanded;

  return (
    <header
      data-dealer-header
      className="dealer-sticky-header max-w-full"
      data-compact={compact ? "true" : "false"}
      data-expanded={expanded ? "true" : "false"}
    >
      <div className="dealer-header-shell">
        <div className="dealer-header-logo-cell dealer-header-main">
          {showMain ? (
            <img
              src={assets.headerLogo}
              alt="WINAL"
              width={214}
              height={48}
              className="dealer-header-logo"
            />
          ) : null}
        </div>
        <nav className="dealer-header-nav-cell dealer-header-main" aria-label="Основная навигация">
          {showMain ? (
            <ul className="dealer-header-nav-list">
              {HEADER_NAV_ITEMS.map((item) => (
                <li key={item.label} className="dealer-header-nav-item">
                  {item.href.startsWith("#") ? (
                    <a href={item.href} className="transition-colors hover:text-dealer-brand-primary">
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="transition-colors hover:text-dealer-brand-primary">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </nav>
        <div className="dealer-header-glass-cell">
          <button
            ref={glassLogoButtonRef}
            type="button"
            className="dealer-header-glass-btn"
            aria-label={expanded ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={expanded}
            aria-haspopup="true"
            onClick={onLogoClick}
          >
            <img
              src={assets.headerLogoGlass}
              alt=""
              width={64}
              height={64}
              className="dealer-header-glass-img"
            />
            {compact && !expanded ? <span className="dealer-header-menu-label">Меню</span> : null}
          </button>
        </div>
      </div>
    </header>
  );
}

function StaticHero({ assets }: { assets: HeroAssets }) {
  return (
    <section className="dealer-hero-static relative h-[775px] w-344 max-w-full">
      <div
        className="dealer-hero-static-video-wrap absolute left-[690px] top-[-102.5px] flex w-174 flex-col items-start rounded-lg p-4"
        style={{
          background: "var(--dealer-surface-white)",
          boxShadow: "var(--dealer-shadow-video)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
        }}
      >
        <CompactHeroVideo assets={assets} />
      </div>
      <div
        className={`dealer-hero-static-text absolute bottom-[50px] left-[-50px] ${HERO_TEXT_CARD_SHELL_CLASS}`}
        style={HERO_TEXT_CARD_BORDER_STYLE}
      >
        <HeroGlassCardLayers />
        <HeroTextCardContent>
          <h1 className="dealer-hero-static-h1 dealer-text-trim w-full text-[64px] font-semibold leading-none text-dealer-text-primary">
            WINAL — панели, которые формируют пространство
          </h1>
          <div className="dealer-hero-static-cta flex items-start gap-8">
            <PrimaryButton label="Обсудить проект" targetId="project-form" />
            <OutlineButton label="Выполненные проекты" targetId="cases" />
          </div>
        </HeroTextCardContent>
      </div>
    </section>
  );
}

// Canon (Figma, >=1386px available width): video wrap starts at left 690,
// width 696. Below that width the wrap no longer fits — shrink its start
// width so `left + width` never exceeds the real available width, and derive
// the start height from that width via the same aspect/padding contract as
// `StaticHero` instead of assuming the canon 696px box.
const HERO_VIDEO_CANON_LEFT = 690;
const HERO_VIDEO_CANON_WIDTH = 696;
const HERO_VIDEO_WRAP_PADDING = 16; // p-4
const HERO_VIDEO_INNER_ASPECT = 2002 / 3560; // height / width

function getHeroVideoStartWidth(metrics: ViewportMetrics) {
  return Math.min(HERO_VIDEO_CANON_WIDTH, Math.max(0, metrics.fullWidth - HERO_VIDEO_CANON_LEFT));
}

function getHeroVideoStartHeight(startWidth: number) {
  const innerWidth = startWidth - HERO_VIDEO_WRAP_PADDING * 2;
  return HERO_VIDEO_WRAP_PADDING * 2 + innerWidth * HERO_VIDEO_INNER_ASPECT;
}

// Expanded left edge: the scene container is canon 1376px wide, but below
// that the container itself shrinks to the real viewport (`max-w-full`), so
// there is no centering gap left to offset into — full-bleed starts at x=0.
// Above 1376 the container stays centered inside the wider viewport and the
// video expands past it by the same offset as before.
function getHeroVideoExpandedX(metrics: ViewportMetrics) {
  return (Math.min(1376, metrics.fullWidth) - metrics.fullWidth) / 2;
}

// Все motion-значения собраны в одном месте, чтобы геометрию hero можно было
// настраивать без поиска transform-логики по всему JSX.
function useHeroMotion(scrollYProgress: MotionValue<number>, metrics: ViewportMetrics) {
  const getTextProgress = (progress: number) => getHeroTextProgress(progress);
  const getTextTop = (progress: number) => getHeroTextTop(progress, metrics);
  const getVideoExpand = (progress: number) => getHeroVideoExpand(progress, metrics);
  const getVideoExit = (progress: number) => getHeroVideoExit(progress, metrics);

  const textY = useTransform(scrollYProgress, (p) => {
    return -getTextProgress(p) * TEXT_CARD_EXIT_DISTANCE;
  });

  const videoX = useTransform(scrollYProgress, (p) => {
    const expand = getVideoExpand(p);
    return lerp(HERO_VIDEO_CANON_LEFT, getHeroVideoExpandedX(metrics), expand);
  });

  const videoY = useTransform(scrollYProgress, (p) => {
    const expand = getVideoExpand(p);
    const exit = getVideoExit(p);
    const expandedY = lerp(-102.5, -metrics.stageTop, expand);
    const exitY = -exit * metrics.fullHeight * 1.05;
    return expandedY + exitY;
  });

  const videoWidth = useTransform(scrollYProgress, (p) => {
    const expand = getVideoExpand(p);
    return lerp(getHeroVideoStartWidth(metrics), metrics.fullWidth, expand);
  });

  const videoHeight = useTransform(scrollYProgress, (p) => {
    const expand = getVideoExpand(p);
    const startHeight = getHeroVideoStartHeight(getHeroVideoStartWidth(metrics));
    return lerp(startHeight, metrics.fullHeight, expand);
  });

  const videoPadding = useTransform(scrollYProgress, (p) => {
    const expand = getVideoExpand(p);
    return `${lerp(16, 0, expand)}px`;
  });

  const videoRadius = useTransform(scrollYProgress, (p) => {
    const expand = getVideoExpand(p);
    return lerp(8, 0, expand);
  });

  const textOpacity = useTransform(scrollYProgress, () => 1);

  const surfaceY = useTransform(scrollYProgress, (p) => {
    const exit = getVideoExit(p);
    if (exit < SURFACE_ENTER_AT_EXIT) return metrics.fullHeight + 120;
    const enter = phaseProgress(exit, SURFACE_ENTER_AT_EXIT, 1);
    return lerp(metrics.fullHeight + 120, 0, enter);
  });

  const glassOpacity = useTransform(scrollYProgress, (p) => {
    const exit = getVideoExit(p);
    if (exit < SURFACE_ENTER_AT_EXIT) return 0;
    const enter = phaseProgress(exit, SURFACE_ENTER_AT_EXIT, 1);
    return lerp(0, 0.25, enter);
  });

  return {
    textY,
    textOpacity,
    videoX,
    videoY,
    videoWidth,
    videoHeight,
    videoPadding,
    videoRadius,
    surfaceY,
    glassOpacity,
  };
}

function useFooterFadeProgress() {
  const footerFadeProgress = useMotionValue(0);

  useLayoutEffect(() => {
    let frameId = 0;

    const update = () => {
      // Стекло живёт после hero, но должно исчезнуть ровно к входу футера в viewport.
      const footer = document.querySelector("main footer");

      if (!(footer instanceof HTMLElement)) {
        footerFadeProgress.set(0);
        return;
      }

      const rect = footer.getBoundingClientRect();
      const progress = clamp(
        (window.innerHeight + FOOTER_GLASS_FADE_DISTANCE - rect.top) / FOOTER_GLASS_FADE_DISTANCE,
        0,
        1,
      );

      footerFadeProgress.set(progress);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [footerFadeProgress]);

  return footerFadeProgress;
}

function useCompactHeaderState() {
  const lenis = useLenis();
  const isCompactViewport = useIsCompactViewport();
  const compactLatchRef = useRef(false);
  const [headerCompact, setHeaderCompact] = useState(false);
  const [headerExpanded, setHeaderExpanded] = useState(false);
  const [catalogActive, setCatalogActive] = useState(false);

  const update = useCallback(() => {
    if (isCompactViewport) {
      // Mobile/tablet: header is permanently the compact glass trigger from the
      // top of the page (it doubles as the hamburger button), independent of the
      // desktop post-hero density logic below. Catalog wheel-rail is irrelevant
      // here — compact catalog uses native touch scrolling regardless.
      compactLatchRef.current = false;
      setHeaderCompact(true);
      setCatalogActive(false);
      return;
    }

    const triggers = document.querySelectorAll("[data-header-density-trigger]");
    const viewportHeight = window.innerHeight;
    const headerZone = getHeaderZonePx();

    let shouldCompactNow = false;
    let catalogAligned = false;
    let earliestTriggerDocTop = Infinity;

    triggers.forEach((element) => {
      if (!(element instanceof HTMLElement)) {
        return;
      }

      const rect = element.getBoundingClientRect();
      earliestTriggerDocTop = Math.min(earliestTriggerDocTop, rect.top + window.scrollY);

      if (!isSectionInViewport(rect, viewportHeight)) {
        return;
      }

      if (sectionNeedsCompactHeader(rect.height, viewportHeight, headerZone, CATALOG_BOTTOM_SAFETY_PX)) {
        shouldCompactNow = true;
      }

      if (element.hasAttribute("data-catalog-section")) {
        catalogAligned = isViewportAlignedVisible(element);
      }
    });

    const pastPostHero =
      triggers.length > 0 &&
      earliestTriggerDocTop < Infinity &&
      window.scrollY >= earliestTriggerDocTop - viewportHeight * 0.2;

    if (shouldCompactNow) {
      compactLatchRef.current = true;
    }

    if (!pastPostHero) {
      compactLatchRef.current = false;
    }

    const effectiveCompact = pastPostHero && compactLatchRef.current;

    setHeaderCompact(effectiveCompact);
    setCatalogActive(catalogAligned);

    if (!pastPostHero) {
      setHeaderExpanded(false);
    }
  }, [isCompactViewport]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => update());
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });

    if (lenis) {
      lenis.on("scroll", update);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);

      if (lenis) {
        lenis.off("scroll", update);
      }
    };
  }, [lenis, update]);

  return { headerCompact, headerExpanded, catalogActive, setHeaderExpanded };
}

type HomeScrollExperienceProps = {
  assets: HeroAssets;
  surface: ReactNode;
  children: ReactNode;
};

export function HomeScrollExperience({ assets, surface, children }: HomeScrollExperienceProps) {
  const prefersReducedMotion = useReducedMotion();
  const isCompactViewport = useIsCompactViewport();
  const lenis = useLenis();
  const sceneRef = useRef<HTMLDivElement>(null);
  const heroVideoHoverRef = useRef<HTMLDivElement>(null);
  const glassLogoButtonRef = useRef<HTMLButtonElement>(null);
  const expandScrollIntentRef = useRef(false);
  const [metrics, setMetrics] = useState<ViewportMetrics>(DEFAULT_METRICS);
  const { headerCompact, headerExpanded, catalogActive, setHeaderExpanded } = useCompactHeaderState();

  const handleLogoClick = useCallback(() => {
    if (!headerCompact) {
      return;
    }

    setHeaderExpanded((expanded) => {
      const next = !expanded;

      if (next) {
        expandScrollIntentRef.current = false;
      }

      return next;
    });
  }, [headerCompact, setHeaderExpanded]);

  useEffect(() => {
    if (!headerExpanded) {
      return;
    }

    const collapseOnScroll = () => {
      if (!expandScrollIntentRef.current) {
        return;
      }

      setHeaderExpanded(false);
    };

    const markScrollIntent = () => {
      expandScrollIntentRef.current = true;
    };

    const markKeyboardScrollIntent = (event: KeyboardEvent) => {
      if ([" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(event.key)) {
        expandScrollIntentRef.current = true;
      }
    };

    window.addEventListener("scroll", collapseOnScroll, { passive: true });
    window.addEventListener("wheel", markScrollIntent, { passive: true });
    window.addEventListener("touchmove", markScrollIntent, { passive: true });
    window.addEventListener("keydown", markKeyboardScrollIntent);

    if (lenis) {
      lenis.on("scroll", collapseOnScroll);
    }

    return () => {
      window.removeEventListener("scroll", collapseOnScroll);
      window.removeEventListener("wheel", markScrollIntent);
      window.removeEventListener("touchmove", markScrollIntent);
      window.removeEventListener("keydown", markKeyboardScrollIntent);

      if (lenis) {
        lenis.off("scroll", collapseOnScroll);
      }
    };
  }, [headerExpanded, lenis, setHeaderExpanded]);

  useEffect(() => {
    if (!headerCompact || !headerExpanded) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setHeaderExpanded(false);
        glassLogoButtonRef.current?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const header = document.querySelector("[data-dealer-header]");

      if (header && !header.contains(event.target as Node)) {
        setHeaderExpanded(false);
        glassLogoButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [headerCompact, headerExpanded, setHeaderExpanded]);

  useEffect(() => {
    // Mobile menu panel: lock background scroll while the nav list is open.
    if (!isCompactViewport || !headerExpanded) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [headerExpanded, isCompactViewport]);

  const catalogLayoutValue = {
    headerCompact,
    headerExpanded,
    catalogActive,
    setHeaderExpanded,
  };

  const headerProps = {
    assets,
    compact: headerCompact,
    expanded: headerExpanded,
    onLogoClick: handleLogoClick,
    glassLogoButtonRef,
  };

  useLayoutEffect(() => {
    // Метрики нужны для привязки Figma-геометрии к реальному viewport.
    const update = () => {
      const headerOffset = 120;
      const stageTop = 360;
      setMetrics({
        // documentElement.clientWidth excludes the vertical scrollbar gutter;
        // window.innerWidth does not, and the gap between them was enough to
        // push the hero video's expanded edge past the real layout width.
        fullWidth: document.documentElement.clientWidth,
        fullHeight: Math.max(window.innerHeight, 640),
        headerOffset,
        stageTop,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start 360px", "end end"],
  });

  const motionValues = useHeroMotion(scrollYProgress, metrics);
  const heroVideoScrollCursor = useHeroVideoScrollCursor(scrollYProgress, metrics);
  const footerFadeProgress = useFooterFadeProgress();
  const glassOpacity = useTransform([motionValues.glassOpacity, footerFadeProgress], (values) => {
    const [baseOpacity = 0, footerFade = 0] = values as number[];
    return baseOpacity * (1 - footerFade);
  });

  if (prefersReducedMotion || isCompactViewport) {
    // Compact viewport (and prefers-reduced-motion at any width) skip the 420vh
    // scroll-scene and custom cursor entirely: natural-flow hero, video stays
    // responsive, header/menu behave the same as the rest of the page.
    return (
      <CatalogLayoutProvider value={catalogLayoutValue}>
        <div className="dealer-home-stack relative z-10 flex w-368 max-w-full flex-col gap-60 py-6">
          <div className="dealer-header-slot">
            <StickyHeader {...headerProps} />
          </div>
          <StaticHero assets={assets} />
          {surface}
          {children}
        </div>
      </CatalogLayoutProvider>
    );
  }

  return (
    <CatalogLayoutProvider value={catalogLayoutValue}>
      <>
        <HeroVideoScrollCursorOverlay active={heroVideoScrollCursor} containerRef={heroVideoHoverRef} />

      {/* Фоновое glass-изображение проявляется только на входе следующей секции. */}
      <motion.div
        aria-hidden
        className="dealer-scroll-glass pointer-events-none fixed left-1/2 z-[1] w-[90vw] max-w-640 -translate-x-1/2"
        style={{
          top: metrics.headerOffset,
          height: metrics.fullHeight,
          opacity: glassOpacity,
        }}
      >
        <img src={assets.pageBackgroundGlass} alt="" className="size-full object-contain" />
      </motion.div>

      <div className="relative z-10 flex w-368 max-w-full flex-col py-6">
        <div className="dealer-header-slot">
          <StickyHeader {...headerProps} />
        </div>

        {/* Внешняя scroll-сцена: её высота задаёт общую длину анимации. */}
        <div ref={sceneRef} data-hero-scroll-scene className="relative mx-auto mt-60 h-[420vh] w-344 max-w-full">
          {/* Sticky-stage удерживает hero на экране, пока scrollProgress проходит все фазы. */}
          <div className="sticky top-90 h-[calc(100vh-120px)] w-full overflow-visible">
            <div className="relative mx-auto h-full w-344 max-w-full">
              {/* Glass text card: стартует в позиции из Figma и уходит вверх первой. */}
              <motion.div
                className={`absolute left-[-50px] z-20 ${HERO_TEXT_CARD_SHELL_CLASS}`}
                style={{
                  top: metrics.headerOffset + getTextCardStartOffset(metrics) - metrics.stageTop,
                  y: motionValues.textY,
                  opacity: motionValues.textOpacity,
                  ...HERO_TEXT_CARD_BORDER_STYLE,
                }}
              >
                <HeroGlassCardLayers />
                <HeroTextCardContent>
                  <div className="flex w-234 items-center justify-center">
                    <h1 className="dealer-text-trim w-full text-[64px] font-semibold leading-none text-dealer-text-primary">
                      WINAL — панели, которые формируют пространство
                    </h1>
                  </div>
                  <div className="flex w-full flex-col items-center justify-center gap-4 text-xl font-medium leading-normal text-dealer-text-secondary">
                    <p className="w-full">
                      Стеновые, потолочные, акустические и системные решения WINAL для внутренней отделки коммерческих,
                      общественных и представительских объектов.
                    </p>
                    <p className="w-full">
                      Подбор, расчёт и сопровождение проекта в <span className="font-semibold">Сочи</span>.
                    </p>
                  </div>
                  <div className="flex items-start gap-8">
                    <PrimaryButton label="Обсудить проект" width={212} targetId="project-form" />
                    <OutlineButton label="Выполненные проекты" width={212} targetId="cases" />
                  </div>
                </HeroTextCardContent>
              </motion.div>

              {/* Video card: сначала стоит справа по Figma, затем расширяется и уходит вверх. */}
              <motion.div
                data-hero-video-wrap
                className="absolute top-0 z-10 flex flex-col items-start overflow-hidden backdrop-blur-[10px]"
                style={{
                  left: motionValues.videoX,
                  y: motionValues.videoY,
                  width: motionValues.videoWidth,
                  height: motionValues.videoHeight,
                  padding: motionValues.videoPadding,
                  borderRadius: motionValues.videoRadius,
                  background: "var(--dealer-surface-white)",
                  boxShadow: "var(--dealer-shadow-video)",
                }}
              >
                <div className="relative size-full backdrop-blur-[10px]" style={{ boxShadow: "var(--dealer-shadow-video)" }}>
                  <div
                    ref={heroVideoHoverRef}
                    className={`relative size-full overflow-hidden rounded-lg border border-[rgba(255,255,255,0.1)] backdrop-blur-[10px] ${
                      heroVideoScrollCursor ? "hero-video-scroll-cursor" : ""
                    }`}
                    style={{ boxShadow: "var(--dealer-shadow-glass)" }}
                  >
                    <HeroVideoMedia assets={assets} />
                  </div>
                </div>
              </motion.div>

              {/* Следующая секция поднимается снизу в финальной фазе выхода video. */}
              <motion.div
                className="dealer-hero-surface-wrap absolute -left-12 top-0 z-10 w-368 max-w-none"
                style={{ y: motionValues.surfaceY }}
              >
                {surface}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Обычный поток страницы после завершения hero-сцены. */}
        <div
          className="relative z-10 flex flex-col gap-60"
          style={{ marginTop: POST_SCENE_STACK_MARGIN_TOP }}
        >
          {children}
        </div>
      </div>
      </>
    </CatalogLayoutProvider>
  );
}


