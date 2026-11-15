"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type RefObject } from "react";
import { DEALER_MOTION_DURATION_MS } from "@/app/dealer-motion";
import { DealerProductModalShell } from "@/app/dealer-product-modal-shell";
import { openDealerProductModal } from "@/app/dealer-product-modal-bridge";
import { useDealerProductModalNav } from "@/app/dealer-product-modal-nav";
import type { CatalogModalSequenceItem } from "@/data/dealer-catalog-modal-sequence";
import {
  PROFILE_IDS,
  PROFILE_NODES,
  PROFILES_HUB_ACTION,
  PROFILES_HUB_DIALOG_ID,
  profileDialogId,
  profileModalAction,
  profiles,
  profilesById,
  profilesHub,
  type ProfileData,
  type ProfileId,
  type ProfileNodeId,
  type ProfileSlide,
} from "@/data/profiles-product-modal";
import styles from "./profile-modals.module.css";

type ProfileModalBaseProps = {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
  compact?: boolean;
};

type HubFilter = "all" | ProfileNodeId;

/** Survives modal remounts so the hub reopens on the last chosen node. */
let lastHubFilter: HubFilter = "all";

function rememberHubFilter(next: HubFilter) {
  lastHubFilter = next;
}

/** Profile the user came back from; the hub scrolls to its tile once. */
let lastProfileId: ProfileId | null = null;

const HUB_SEQUENCE: CatalogModalSequenceItem[] = [
  { id: "profiles-hub", action: PROFILES_HUB_ACTION, title: profilesHub.title },
];

function html(value: string) {
  return { __html: value };
}

function profileSequence(ids: readonly ProfileId[]): CatalogModalSequenceItem[] {
  return ids.map((id) => ({
    id: `profile-${id}`,
    action: profileModalAction(id),
    title: profilesById[id].name,
    image: profilesById[id].cardImage,
  }));
}

function idsForFilter(filter: HubFilter): ProfileId[] {
  return profiles.filter((profile) => filter === "all" || profile.node === filter).map((profile) => profile.id);
}

function focusTarget(returnFocusRef: RefObject<HTMLElement | null>, fallback: HTMLElement) {
  const current = returnFocusRef.current;
  return current && current.isConnected ? current : fallback;
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}

/* ---------- animated node scene ---------- */

function replayScene(frame: HTMLIFrameElement | null) {
  try {
    const node = frame?.contentDocument?.querySelector(".node");
    if (!node) {
      return;
    }
    node.classList.remove("play", "hold");
    void (node as HTMLElement).offsetWidth;
    node.classList.add("play");
  } catch {
    // Scene is same-origin; ignore if the frame is not ready yet.
  }
}

/**
 * The modal opens with a 2 s opacity/transform transition, and the scene's
 * dimension labels animate at the same time. Chrome can keep stale tiles of
 * the iframe from that transition (labels half-drawn until hover), so force
 * one re-raster once the parent transition and the scene animations finish.
 */
function repaintScene(frame: HTMLIFrameElement | null) {
  try {
    const root = frame?.contentDocument?.documentElement;
    if (!root) {
      return;
    }
    root.style.transform = "translateZ(0)";
    frame.contentWindow?.requestAnimationFrame(() => {
      frame.contentWindow?.requestAnimationFrame(() => {
        root.style.transform = "";
      });
    });
  } catch {
    // Scene is same-origin; ignore if the frame is not ready yet.
  }
}

const SCENE_SETTLE_MS = DEALER_MOTION_DURATION_MS + 100;

/** First play waits for the modal open transition to end (labels stay hidden meanwhile). */
const SCENE_START_MS = DEALER_MOTION_DURATION_MS;

const HOLD_STYLE = ".node.hold, .node.hold * { animation-play-state: paused !important; }";

/** Freeze the scene on its first frame (labels hidden) until the modal has settled. */
function holdScene(frame: HTMLIFrameElement | null) {
  try {
    const doc = frame?.contentDocument;
    const node = doc?.querySelector(".node");
    if (!doc || !node) {
      return;
    }
    if (!doc.getElementById("winal-hold")) {
      const style = doc.createElement("style");
      style.id = "winal-hold";
      style.textContent = HOLD_STYLE;
      doc.head.appendChild(style);
    }
    node.classList.remove("play");
    void (node as HTMLElement).offsetWidth;
    node.classList.add("play", "hold");
  } catch {
    // Scene is same-origin; ignore if the frame is not ready yet.
  }
}

function ProfileScene({ src, active, replayToken, startDelay = SCENE_START_MS }: { src: string; active: boolean; replayToken: number; startDelay?: number }) {
  const slotRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLIFrameElement | null>(null);
  const [mounted, setMounted] = useState(active);
  const [side, setSide] = useState(0);
  const startedRef = useRef(false);
  const firstActivationRef = useRef(true);

  if (active && !mounted) {
    setMounted(true);
  }

  useEffect(() => {
    const slot = slotRef.current;
    if (!slot) {
      return;
    }
    // contentRect is the layout size; getBoundingClientRect would read the
    // modal mid open-transition (scaled down) and the observer never refires.
    const update = (entries: ResizeObserverEntry[]) => {
      const rect = entries[entries.length - 1].contentRect;
      setSide(Math.max(rect.width, rect.height));
    };
    const observer = new ResizeObserver(update);
    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (active && replayToken > 0) {
      replayScene(frameRef.current);
    }
  }, [active, replayToken]);

  useEffect(() => {
    if (!active) {
      return;
    }
    const delay = firstActivationRef.current ? startDelay : 80;
    firstActivationRef.current = false;
    const timer = window.setTimeout(() => {
      startedRef.current = true;
      replayScene(frameRef.current);
    }, delay);
    const settle = window.setTimeout(() => repaintScene(frameRef.current), SCENE_SETTLE_MS);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(settle);
    };
  }, [active, startDelay]);

  const handleLoad = () => {
    const frame = frameRef.current;
    if (startedRef.current) {
      replayScene(frame);
    } else {
      holdScene(frame);
    }
    const doc = frame?.contentDocument;
    if (!doc) {
      return;
    }
    let pending = 0;
    // Re-raster shortly after the last label animation of each play/replay ends.
    doc.addEventListener("animationend", () => {
      window.clearTimeout(pending);
      pending = window.setTimeout(() => repaintScene(frame), 120);
    });
  };

  return (
    <div ref={slotRef} className="absolute inset-0">
      {mounted && side > 0 ? (
        <iframe
          ref={frameRef}
          src={src}
          title="Анимированная сцена узла"
          className={styles.sceneFrame}
          style={{ width: side, height: side }}
          onLoad={handleLoad}
        />
      ) : null}
    </div>
  );
}

function ProfileMedia({ slides, startDelay }: { slides: readonly ProfileSlide[]; startDelay?: number }) {
  const [index, setIndex] = useState(0);
  const [replayToken, setReplayToken] = useState(0);
  const current = slides[index];
  const isScene = current.kind === "scene";
  const go = (next: number) => setIndex((next + slides.length) % slides.length);

  return (
    <div className={styles.media}>
      {!isScene ? <span className={styles.mediaLabel}>{current.name}</span> : null}
      {slides.map((slide, slideIndex) => {
        const on = slideIndex === index;
        const className = `${styles.slide} ${on ? styles.slideOn : ""} ${slide.kind === "svg" ? styles.slideWhite : ""}`;
        return (
          <div key={`${slide.name}-${slideIndex}`} className={className} aria-hidden={!on}>
            {slide.kind === "scene" ? <ProfileScene src={slide.src} active={on} replayToken={on ? replayToken : 0} startDelay={startDelay} /> : null}
            {slide.kind === "img" ? <img src={slide.src} alt={slide.name} loading="lazy" /> : null}
            {slide.kind === "svg" ? (
              <div className={`${styles.svgs} ${slide.svgs.length > 1 ? styles.svgs2 : ""}`}>
                {slide.svgs.map((svg) => (
                  <img key={svg.src} src={svg.src} alt={svg.alt} loading="lazy" />
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
      {slides.length > 1 ? (
        <>
          <button type="button" className={`${styles.glassArrow} ${styles.arrowLeft}`} aria-label="Предыдущий слайд" onClick={() => go(index - 1)}>
            <ChevronIcon direction="left" />
          </button>
          <button type="button" className={`${styles.glassArrow} ${styles.arrowRight}`} aria-label="Следующий слайд" onClick={() => go(index + 1)}>
            <ChevronIcon direction="right" />
          </button>
        </>
      ) : null}
      {isScene ? (
        <button type="button" className={styles.replay} onClick={() => setReplayToken((token) => token + 1)}>
          <ReplayIcon />
          Повторить
        </button>
      ) : null}
      <div className={styles.pager}>
        {slides.map((slide, slideIndex) => (
          <button key={`${slide.name}-${slideIndex}`} type="button" aria-pressed={slideIndex === index} onClick={() => go(slideIndex)}>
            {slide.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- profile modal ---------- */

export const PROFILES_HUB_HREF = "/catalog/profiles";

export function profileHref(id: ProfileId) {
  return `${PROFILES_HUB_HREF}/${id}`;
}

/** `page`: rendered as a standalone page — related profiles, back and CTAs become links, the title is the page h1. */
function ProfileContent({ profile, onOpenProfile, onOpenHub, page = false }: {
  profile: ProfileData;
  onOpenProfile?: (id: ProfileId, trigger: HTMLElement) => void;
  onOpenHub?: (trigger: HTMLElement) => void;
  page?: boolean;
}) {
  const TitleTag = page ? "h1" : "h2";
  const position = PROFILE_IDS.indexOf(profile.id);
  const prevId = PROFILE_IDS[(position - 1 + PROFILE_IDS.length) % PROFILE_IDS.length];
  const nextId = PROFILE_IDS[(position + 1) % PROFILE_IDS.length];
  const fullName = profile.title;
  const prep = profile.prep;

  return (
    <div className={styles.root}>
      <div className={styles.row1}>
        <ProfileMedia slides={profile.slides} startDelay={page ? 400 : undefined} />
        <div className={`${styles.panel} ${styles.info}`}>
          <p className={styles.kicker}>{profile.kicker}</p>
          <TitleTag className={`${styles.h1} ${fullName.length > 26 ? styles.h1Long : ""}`}>{fullName}</TitleTag>
          <p className={styles.lead} dangerouslySetInnerHTML={html(profile.lead)} />
          <div className={styles.feats}>
            {profile.feats.map((feat) => (
              <div key={feat.title} className={styles.feat}>
                <div className={styles.chip70}>
                  <img src={feat.icon} alt="" width={34} height={34} />
                </div>
                <div>
                  <b>{feat.title}</b>
                  <span dangerouslySetInnerHTML={html(feat.text)} />
                </div>
              </div>
            ))}
          </div>
          {page ? (
            <div className={styles.ctas}>
              <a href="#project-form" className={`${styles.btn} ${styles.btnPrimary}`}>
                Обсудить проект
                <img src={profilesHub.arrowWhite} alt="" width={16} height={16} />
              </a>
              <a href="#project-form" className={`${styles.btn} ${styles.btnSecondary}`}>
                Получить образцы
                <img src={profilesHub.sampleIcon} alt="" width={16} height={16} />
              </a>
            </div>
          ) : (
            <div className={styles.ctas}>
              <button type="button" tabIndex={-1} className={`${styles.btn} ${styles.btnPrimary}`}>
                Обсудить проект
                <img src={profilesHub.arrowWhite} alt="" width={16} height={16} />
              </button>
              <button type="button" tabIndex={-1} className={`${styles.btn} ${styles.btnSecondary}`}>
                Получить образцы
                <img src={profilesHub.sampleIcon} alt="" width={16} height={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.row2}>
        <div className={styles.panel}>
          <h3 className={styles.h2}>Характеристики</h3>
          <div className={`${styles.specWrap} ${profile.draw.length ? "" : styles.specWrapSolo}`}>
            <dl className={styles.specs}>
              {profile.specs.map((spec) => (
                <div key={spec.name} className={styles.spec}>
                  <dt>{spec.name}</dt>
                  <dd dangerouslySetInnerHTML={html(spec.value)} />
                </div>
              ))}
            </dl>
            {profile.draw.length ? (
              <div className={styles.miniDraw}>
                {profile.draw.map((draw) => (
                  <img key={draw.src} src={draw.src} alt={draw.alt} loading="lazy" />
                ))}
                <p>{profile.drawCap}</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.panel}>
          <h3 className={styles.h2}>{profile.rel.title}</h3>
          <p className={styles.sub}>{profile.rel.text}</p>
          <div className={styles.opts}>
            {profile.rel.items.map((item) =>
              item.id === profile.id ? (
                <div key={item.id} className={`${styles.opt} ${styles.optCurrent}`}>
                  <img src={item.thumb} alt="" />
                  <div>
                    <b>{item.title}</b>
                    <span>{item.text}</span>
                  </div>
                  <span className={styles.optTag}>Этот узел</span>
                </div>
              ) : page ? (
                <Link key={item.id} href={profileHref(item.id)} className={styles.opt}>
                  <img src={item.thumb} alt="" />
                  <div>
                    <b>{item.title}</b>
                    <span>{item.text}</span>
                  </div>
                  <span className={styles.optGo}>
                    <ChevronIcon direction="right" />
                  </span>
                </Link>
              ) : (
                <button key={item.id} type="button" className={styles.opt} onClick={(event) => onOpenProfile?.(item.id, event.currentTarget)}>
                  <img src={item.thumb} alt="" />
                  <div>
                    <b>{item.title}</b>
                    <span>{item.text}</span>
                  </div>
                  <span className={styles.optGo}>
                    <ChevronIcon direction="right" />
                  </span>
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      <div className={styles.row3}>
        <div className={styles.panel}>
          <h3 className={styles.h2}>Монтаж</h3>
          <div className={styles.mcols}>
            <div>
              <h4 className={styles.h4}>{profile.mountTitle}</h4>
              <ul className={styles.dots}>
                {profile.mount.map((line) => (
                  <li key={line} dangerouslySetInnerHTML={html(line)} />
                ))}
              </ul>
            </div>
            {prep.length ? (
              <div>
                <h4 className={styles.h4}>{profile.prepTitle}</h4>
                <ul className={styles.dots}>
                  {prep.map((line) => (
                    <li key={line} dangerouslySetInnerHTML={html(line)} />
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.panel}>
          <h3 className={styles.h2}>Исполнения</h3>
          <div className={styles.fins}>
            {profile.fins.map((fin) => (
              <div key={fin.title} className={styles.fin}>
                <img src={fin.image} alt="" />
                <div>
                  <b>{fin.title}</b>
                  <span dangerouslySetInnerHTML={html(fin.text)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {page ? (
        <div className={`${styles.row4} ${styles.pageNav}`}>
          <Link href={PROFILES_HUB_HREF} className={styles.backButton}>
            <ChevronIcon direction="left" />
            Все профили WINAL™
          </Link>
          <div className={styles.pageNavSiblings}>
            <Link href={profileHref(prevId)} className={styles.backButton}>
              <ChevronIcon direction="left" />
              {profilesById[prevId].name}
            </Link>
            <Link href={profileHref(nextId)} className={styles.backButton}>
              {profilesById[nextId].name}
              <ChevronIcon direction="right" />
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.row4}>
          <button type="button" className={styles.backButton} onClick={(event) => onOpenHub?.(event.currentTarget)}>
            <ChevronIcon direction="left" />
            Все профили WINAL™
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * `closeToHub` (по умолчанию да): закрытие возвращает в сетку хаба, как в каталоге.
 * Техстраница монтажа передаёт `false`: закрытие возвращает к крупному кадру узла (onClose).
 */
export function ProfileProductModal({ profileId, open, onClose, returnFocusRef, compact = false, closeToHub: toHub = true }: ProfileModalBaseProps & { profileId: ProfileId; closeToHub?: boolean }) {
  const profile = profilesById[profileId];
  const nav = useDealerProductModalNav();

  const openProfile = useCallback(
    (id: ProfileId, trigger: HTMLElement) => {
      const action = profileModalAction(id);
      const inSequence = nav?.sequence.some((item) => item.action === action);
      const sequence = inSequence && nav ? nav.sequence : profileSequence(PROFILE_IDS);
      openDealerProductModal(action, focusTarget(returnFocusRef, trigger), sequence);
    },
    [nav, returnFocusRef],
  );

  const openHub = useCallback(
    (trigger: HTMLElement) => {
      lastProfileId = profileId;
      openDealerProductModal(PROFILES_HUB_ACTION, focusTarget(returnFocusRef, trigger), HUB_SEQUENCE);
    },
    [profileId, returnFocusRef],
  );

  /** Close (X, Esc, backdrop) goes back to the hub grid, not out of the catalog. */
  const closeToHub = useCallback(() => {
    // A profile opened from the installation room returns to its selected node.
    if (returnFocusRef.current?.closest("#montazh")) {
      onClose();
      return;
    }
    openHub(document.body);
  }, [openHub, onClose, returnFocusRef]);

  return (
    <DealerProductModalShell
      open={open}
      onClose={toHub ? closeToHub : onClose}
      returnFocusRef={returnFocusRef}
      dialogId={profileDialogId(profileId)}
      title={profile.title}
      closeIcon={profilesHub.closeIcon}
      compact={compact}
    >
      <ProfileContent profile={profile} onOpenProfile={openProfile} onOpenHub={openHub} />
    </DealerProductModalShell>
  );
}

/* ---------- hub: grid + node filter ---------- */

const NODE_LABEL = Object.fromEntries(PROFILE_NODES.map((node) => [node.id, node.label])) as Record<ProfileNodeId, string>;

function ProfilesHubContent({ returnFocusRef }: { returnFocusRef: RefObject<HTMLElement | null> }) {
  const [filter, setFilter] = useState<HubFilter>(lastHubFilter);
  const visibleIds = idsForFilter(filter);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lastProfileId) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      const id = lastProfileId;
      lastProfileId = null;
      const card = gridRef.current?.querySelector<HTMLElement>(`[data-profile-id="${id}"]`);
      const scroller = card?.closest<HTMLElement>(".dealer-modal-desktop-scroll, .dealer-modal-compact-scroll");
      if (!card || !scroller) {
        return;
      }
      const offset = card.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
      scroller.scrollTop += offset - (scroller.clientHeight - card.offsetHeight) / 2;
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const choose = (next: HubFilter) => {
    rememberHubFilter(next);
    setFilter(next);
  };

  const openProfile = (id: ProfileId, event: MouseEvent<HTMLButtonElement>) => {
    openDealerProductModal(profileModalAction(id), focusTarget(returnFocusRef, event.currentTarget), profileSequence(visibleIds));
  };

  const filters: { id: HubFilter; label: string; count: number }[] = [
    { id: "all", label: "Все профили", count: profiles.length },
    ...PROFILE_NODES.map((node) => ({ id: node.id, label: node.label, count: idsForFilter(node.id).length })),
  ];

  return (
    <div className={styles.root}>
      <div className={`${styles.panel} ${styles.hubHead}`}>
        <div className={styles.hubIntro}>
          <p className={styles.kicker}>{profilesHub.categoryLabel}</p>
          <h2 className={styles.h1}>{profilesHub.title}</h2>
          <p className={styles.lead}>{profilesHub.description}</p>
        </div>
      </div>

      <div className={styles.filters} role="group" aria-label="Фильтр по узлу">
        {filters.map((item) => (
          <button key={item.id} type="button" className={styles.filter} aria-pressed={filter === item.id} onClick={() => choose(item.id)}>
            {item.label}
            <span className={styles.filterCount}>{item.count}</span>
          </button>
        ))}
      </div>

      <div ref={gridRef} className={styles.grid}>
        {visibleIds.map((id) => {
          const profile = profilesById[id];
          return (
            <button key={id} type="button" data-profile-id={id} className={styles.card} onClick={(event) => openProfile(id, event)}>
              <span className={styles.cardMedia}>
                <img src={profile.cardImage} alt="" loading="lazy" />
              </span>
              <span className={styles.cardBody}>
                <span className={styles.cardTags}>
                  <span className={`${styles.tag} ${styles.tagBrand}`}>{NODE_LABEL[profile.node]}</span>
                  {profile.fastening ? <span className={styles.tag}>{profile.fastening}</span> : null}
                </span>
                <span className={styles.cardTitle}>{profile.name}</span>
                <span className={styles.cardText}>{profile.card}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProfilesHubModal({ open, onClose, returnFocusRef, compact = false }: ProfileModalBaseProps) {
  return (
    <DealerProductModalShell
      open={open}
      onClose={onClose}
      returnFocusRef={returnFocusRef}
      dialogId={PROFILES_HUB_DIALOG_ID}
      title={profilesHub.title}
      closeIcon={profilesHub.closeIcon}
      compact={compact}
    >
      <ProfilesHubContent returnFocusRef={returnFocusRef} />
    </DealerProductModalShell>
  );
}

/* ---------- standalone pages ---------- */

/** Profile as a page: same content as the modal, links instead of modal hops. */
export function ProfilePageContent({ profileId }: { profileId: ProfileId }) {
  return <ProfileContent profile={profilesById[profileId]} page />;
}

function readNodeFromUrl(): HubFilter {
  const node = new URLSearchParams(window.location.search).get("node");
  return node && PROFILE_NODES.some((item) => item.id === node) ? (node as ProfileNodeId) : "all";
}

/** Profiles catalogue as a page: the hub grid with the node filter kept in `?node=`. */
export function ProfilesHubPageContent() {
  const [filter, setFilter] = useState<HubFilter>("all");
  const visibleIds = idsForFilter(filter);

  useEffect(() => {
    const sync = () => setFilter(readNodeFromUrl());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const choose = (next: HubFilter) => {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === "all") {
      url.searchParams.delete("node");
    } else {
      url.searchParams.set("node", next);
    }
    window.history.replaceState(window.history.state, "", url);
  };

  const filters: { id: HubFilter; label: string; count: number }[] = [
    { id: "all", label: "Все профили", count: profiles.length },
    ...PROFILE_NODES.map((node) => ({ id: node.id, label: node.label, count: idsForFilter(node.id).length })),
  ];

  return (
    <div className={styles.root}>
      <div className={`${styles.panel} ${styles.hubHead}`}>
        <div className={styles.hubIntro}>
          <p className={styles.kicker}>{profilesHub.categoryLabel}</p>
          <h1 className={styles.h1}>{profilesHub.title}</h1>
          <p className={styles.lead}>{profilesHub.description}</p>
        </div>
      </div>

      <div className={styles.filters} role="group" aria-label="Фильтр по узлу">
        {filters.map((item) => (
          <button key={item.id} type="button" className={styles.filter} aria-pressed={filter === item.id} onClick={() => choose(item.id)}>
            {item.label}
            <span className={styles.filterCount}>{item.count}</span>
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visibleIds.map((id) => {
          const profile = profilesById[id];
          return (
            <Link key={id} href={profileHref(id)} data-profile-id={id} className={styles.card}>
              <span className={styles.cardMedia}>
                <img src={profile.cardImage} alt="" loading="lazy" />
              </span>
              <span className={styles.cardBody}>
                <span className={styles.cardTags}>
                  <span className={`${styles.tag} ${styles.tagBrand}`}>{NODE_LABEL[profile.node]}</span>
                  {profile.fastening ? <span className={styles.tag}>{profile.fastening}</span> : null}
                </span>
                <span className={styles.cardTitle}>{profile.name}</span>
                <span className={styles.cardText}>{profile.card}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
