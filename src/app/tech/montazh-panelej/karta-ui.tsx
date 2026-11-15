"use client";

import { useCallback, useState, type ReactNode } from "react";
import {
  flySrc,
  kartaCard,
  kartaCards,
  kartaMarkers,
  kartaSolutionCount,
  type KartaBranch,
  type KartaCard,
  type KartaMarker,
  type KartaSolution,
} from "@/data/montazh-karta";
import type { StageZoom } from "./lumen-stage";
import styles from "./montazh.module.css";

/**
 * Общее для вариантов на карте сопряжений («Приближение», «Панорама», «Маска»):
 * выбор маркер → ветка → решение, карточка справа, шторка на телефоне, оглавление.
 */

export type Sel = { marker: string; branch: string; solution: string };

function firstSolution(branch: KartaBranch, prefer?: string) {
  const s =
    (prefer && branch.solutions.find((x) => x.id === prefer)) ||
    branch.solutions.find((x) => !x.planned) ||
    branch.solutions[0];
  return s.id;
}

export function useKartaSel() {
  const [sel, setSel] = useState<Sel | null>(null);
  const [tall, setTall] = useState(false);

  const marker = sel ? (kartaMarkers.find((m) => m.id === sel.marker) ?? null) : null;
  const card: KartaCard | null = marker ? kartaCard(marker.card) : null;
  const branch: KartaBranch | null =
    card && sel ? (card.branches.find((b) => b.id === sel.branch) ?? card.branches[0]) : null;
  const solution: KartaSolution | null =
    branch && sel ? (branch.solutions.find((s) => s.id === sel.solution) ?? branch.solutions[0]) : null;

  const close = useCallback(() => {
    setSel(null);
    setTall(false);
  }, []);

  const openMarker = useCallback(
    (id: string | null) => {
      if (id === null) return close();
      const m = kartaMarkers.find((x) => x.id === id);
      if (!m) return;
      const c = kartaCard(m.card);
      const b = c.branches.find((x) => x.id === m.branch) ?? c.branches[0];
      setSel({ marker: m.id, branch: b.id, solution: firstSolution(b, m.solution) });
    },
    [close],
  );

  const openCard = useCallback(
    (key: string) => {
      const m = kartaMarkers.find((x) => x.card === key);
      if (m) openMarker(m.id);
    },
    [openMarker],
  );

  const setBranch = (id: string) => {
    if (!card || !sel) return;
    const b = card.branches.find((x) => x.id === id);
    if (b) setSel({ ...sel, branch: id, solution: firstSolution(b) });
  };
  const setSolution = (id: string) => sel && setSel({ ...sel, solution: id });

  const ready = branch ? branch.solutions.filter((s) => !s.planned) : [];
  const solIndex = solution ? ready.indexOf(solution) : -1;
  const prevSol = () => ready.length && setSolution(ready[(solIndex - 1 + ready.length) % ready.length].id);
  const nextSol = () => ready.length && setSolution(ready[(solIndex + 1) % ready.length].id);

  return {
    sel, marker, card, branch, solution, tall, setTall,
    openMarker, openCard, close, setBranch, setSolution,
    ready, solIndex, prevSol, nextSol,
  };
}

export type KartaState = ReturnType<typeof useKartaSel>;

export const solImg = (
  s: KartaSolution,
  i = 0,
  sizes = "(max-width: 720px) 100vw, (max-width: 1279px) 46vw, 38vw",
) => {
  const im = s.images[i];
  if (!im) return null;
  const base = im.src.replace(/\.webp$/, "");
  return (
    <img
      src={im.src}
      srcSet={`${base}-640.webp 640w, ${im.src} 1200w`}
      sizes={sizes}
      alt={im.alt}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
};

export function Thumbs({ branch, solution, onPick }: { branch: KartaBranch; solution: KartaSolution | null; onPick: (id: string) => void }) {
  if (branch.solutions.length < 2) return null;
  const groups = branch.groups ?? [undefined];
  return (
    <div className={styles.solGrid} role="list" aria-label="Решения">
      {groups.map((g) => {
        const items = branch.solutions.filter((s) => (g ? s.group === g : true));
        if (!items.length) return null;
        return (
          <div key={g ?? "all"} className={styles.solGroup}>
            {g ? <p className={styles.solGroupName}>{g}</p> : null}
            <div className={styles.solThumbs}>
              {items.map((s) => {
                const on = solution?.id === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="listitem"
                    className={`${styles.solThumb} ${on ? styles.solThumbOn : ""} ${s.planned ? styles.solThumbPlanned : ""}`}
                    aria-pressed={on}
                    onClick={() => onPick(s.id)}
                  >
                    <span className={styles.solThumbPic}>
                      {s.images[0] ? solImg(s, 0, "160px") : <i>рендер готовится</i>}
                    </span>
                    <span className={styles.solThumbName}>{s.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BranchTabs({ card, branch, onPick }: { card: KartaCard; branch: KartaBranch; onPick: (id: string) => void }) {
  if (card.branches.length < 2) return null;
  return (
    <div className={styles.solTabs} role="tablist" aria-label="Ветки сопряжения">
      {card.branches.map((b) => (
        <button
          key={b.id}
          type="button"
          role="tab"
          aria-selected={b.id === branch.id}
          className={`${styles.solTab} ${b.id === branch.id ? styles.solTabOn : ""}`}
          onClick={() => onPick(b.id)}
        >
          {b.name}
        </button>
      ))}
    </div>
  );
}

function Nav({ k, close }: { k: KartaState; close?: boolean }) {
  return (
    <div className={styles.nodeNav}>
      <button type="button" className={styles.navBtn} onClick={k.prevSol} aria-label="Предыдущее решение" disabled={k.ready.length < 2}>←</button>
      <span className={styles.navCount}>{k.solIndex + 1} / {k.ready.length}</span>
      <button type="button" className={styles.navBtn} onClick={k.nextSol} aria-label="Следующее решение" disabled={k.ready.length < 2}>→</button>
      {close ? (
        <button type="button" className={`${styles.navBtn} ${styles.navClose}`} onClick={k.close} aria-label="Закрыть карточку">✕</button>
      ) : null}
    </div>
  );
}

const Planned = ({ s }: { s: KartaSolution }) => (
  <div className={styles.kPlanned}>
    <b>Рендер готовится</b>
    <span>{s.name}</span>
  </div>
);

const plannedHint = "Решение в структуре есть, рендер и разрез готовятся: как готовое к выбору не предлагаем.";

/** Карточка справа от комнаты (десктоп) или под кадром (телефон, блоки). */
export function KartaAside({ k, className }: { k: KartaState; className?: string }) {
  const { card, branch, solution, sel } = k;
  return (
    <aside
      className={`${styles.zoomCard} ${styles.kCard} ${sel ? styles.zoomCardOn : styles.zoomCardOff} ${className ?? ""}`}
      aria-hidden={!sel}
      aria-label={card ? card.title : undefined}
    >
      {card && branch && solution ? (
        <>
          <div className={`${styles.zoomMedia} ${styles.kMedia}`}>
            {solution.images[0] ? solImg(solution) : <Planned s={solution} />}
            <div className={styles.zoomTitle}>
              <div className={`${styles.glassTitle} ${styles.glassTitleCompact}`}>
                <span className={styles.glassKicker}>
                  {card.key} · {card.branches.length > 1 ? branch.name : card.title}
                </span>
                <strong className={styles.glassName}>
                  {card.branches.length > 1 ? solution.name : `${card.title}: ${solution.name}`}
                </strong>
              </div>
            </div>
          </div>
          <div className={`${styles.zoomBody} ${styles.kBody}`}>
            <Nav k={k} close />
            <p className={styles.kIntro}>{card.intro}</p>
            <BranchTabs card={card} branch={branch} onPick={k.setBranch} />
            {branch.note ? <p className={styles.hint}>{branch.note}</p> : null}
            <Thumbs branch={branch} solution={solution} onPick={k.setSolution} />
            <p className={styles.text}>{solution.text}</p>
            <ul className={styles.chips} aria-label="Профили WINAL в узле">
              {solution.profiles.map((p) => (<li key={p} className={styles.chip}>{p}</li>))}
            </ul>
            {solution.images.length > 1 ? <div className={styles.zoomExtra}>{solImg(solution, 1)}</div> : null}
            {solution.planned ? <p className={styles.hint}>{plannedHint}</p> : null}
          </div>
        </>
      ) : null}
    </aside>
  );
}

/** Точка-рассказ (без карточек профилей): сравнение подходов и пункты — те же, что на крупном кадре. */
function InfoBlocks({ s }: { s: KartaSolution }) {
  return (
    <>
      {s.compare
        ? s.compare.rows.map((r) => (
            <p key={r.t} className={styles.text}>
              <b>{r.t}.</b> {s.compare!.cols[0]}: {r.a}. {s.compare!.cols[1]}: {r.b}.
            </p>
          ))
        : null}
      {s.points?.map((p) => (
        <p key={p.t} className={styles.text}>
          <b>{p.t}.</b> {p.s}
        </p>
      ))}
    </>
  );
}

/** Шторка снизу (телефон, панорама): сначала текст, потом картинка. */
export function KartaSheet({ k }: { k: KartaState }) {
  const { card, branch, solution, sel, tall, setTall } = k;
  return (
    <div className={`${styles.dockHost} ${sel ? styles.dockHostOn : ""}`}>
      <button type="button" className={styles.dockScrim} aria-label="Закрыть карточку" onClick={k.close} />
      <aside
        className={`${styles.sheet} ${sel ? styles.sheetOpen : ""} ${tall ? styles.sheetTall : ""}`}
        aria-hidden={!sel}
        aria-label={card ? card.title : undefined}
      >
        <button type="button" className={styles.sheetGrab} aria-label={tall ? "Свернуть карточку" : "Развернуть карточку"} onClick={() => setTall(!tall)}>
          <span />
        </button>
        {card && branch && solution ? (
          <div className={styles.sheetScroll}>
            <div className={styles.sheetHead}>
              <span className={styles.sheetKicker}>
                {card.key} · {branch.heading ? card.title : card.branches.length > 1 ? `${card.title}: ${branch.name}` : card.title}
              </span>
              <strong className={styles.sheetTitle}>{branch.info ? branch.heading ?? solution.name : solution.title ?? solution.name}</strong>
              <button type="button" className={`${styles.navBtn} ${styles.sheetClose}`} onClick={k.close} aria-label="Закрыть карточку">✕</button>
            </div>
            <p className={styles.text}>{solution.text}</p>
            <InfoBlocks s={solution} />
            <div className={styles.sheetMedia}>
              {solution.images[0] ? solImg(solution, 0, "100vw") : <Planned s={solution} />}
            </div>
            <Nav k={k} />
            <BranchTabs card={card} branch={branch} onPick={k.setBranch} />
            <Thumbs branch={branch} solution={solution} onPick={k.setSolution} />
            <ul className={styles.chips} aria-label="Профили WINAL в узле">
              {solution.profiles.map((p) => (<li key={p} className={styles.chip}>{p}</li>))}
            </ul>
            {solution.images.length > 1 ? <div className={styles.zoomExtra}>{solImg(solution, 1, "100vw")}</div> : null}
            <p className={styles.kIntro}>{card.intro}</p>
            {solution.planned ? <p className={styles.hint}>{plannedHint}</p> : null}
          </div>
        ) : null}
      </aside>
    </div>
  );
}

/** Затемнение, метка цели и кнопка «Вся комната» поверх сцены при наезде. */
export function ZoomOverlay({ zoom, onClose, children, back = true }: { zoom: StageZoom | null; onClose: () => void; children?: ReactNode; back?: boolean }) {
  return (
    <>
      <div className={`${styles.zoomDim} ${zoom ? styles.zoomDimOn : ""}`} aria-hidden="true" />
      {children}
      <span
        className={`${styles.zoomMarker} ${zoom ? styles.zoomMarkerOn : ""}`}
        style={zoom ? { left: `${zoom.tx * 100}%`, top: `${zoom.ty * 100}%` } : undefined}
        aria-hidden="true"
      />
      {back ? (
        <button type="button" className={`${styles.zoomBack} ${zoom ? styles.zoomBackOn : ""}`} onClick={onClose} tabIndex={zoom ? 0 : -1}>
          ← Вся комната
        </button>
      ) : null}
    </>
  );
}

/**
 * Подлёт камеры: после наезда поверх увеличенной комнаты проявляется крупный кадр,
 * снятый с камеры, сдвинутой к узлу. Файла нет (404) — слой не показывается.
 * Задержка проявления задана в CSS (transition-delay), без таймеров.
 */
export function FlyFrame({ marker, zoom }: { marker: KartaMarker | null; zoom: StageZoom | null }) {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const want = marker ? flySrc(marker) : null;
  if (!want || loaded[want] === false) return null;
  const on = Boolean(zoom && loaded[want]);
  return (
    <img
      key={want}
      className={`${styles.fly} ${on ? styles.flyOn : ""}`}
      src={want}
      alt=""
      aria-hidden="true"
      draggable={false}
      onLoad={() => setLoaded((l) => ({ ...l, [want]: true }))}
      onError={() => setLoaded((l) => ({ ...l, [want]: false }))}
    />
  );
}

export function KartaCaption({ k }: { k: KartaState }) {
  const { card, marker } = k;
  return (
    <p className={styles.caption} aria-live="polite">
      {card && marker ? (<><b>{card.key}</b>{marker.label}</>) : (<span>Нажмите на маркер: камера подъедет к месту</span>)}
    </p>
  );
}

export function KartaToc({ k, onKin }: { k: KartaState; onKin?: (key: string | null) => void }) {
  return (
    <div className={`${styles.zoomList} ${styles.kToc}`} aria-label="Карточки сопряжений">
      {kartaCards.map((c) => {
        const markers = kartaMarkers.filter((m) => m.card === c.key).length;
        if (!markers) return null;
        const on = k.card?.key === c.key;
        return (
          <button
            key={c.key}
            type="button"
            className={`${styles.zoomItem} ${on ? styles.zoomItemOn : ""}`}
            aria-pressed={on}
            onClick={() => (on ? k.close() : k.openCard(c.key))}
            onPointerEnter={() => onKin?.(c.key)}
            onPointerLeave={() => onKin?.(null)}
          >
            <b>{c.key}</b>
            {c.title}
            <i className={styles.zoomItemCount}>
              {kartaSolutionCount(c)}{markers > 1 ? ` · ${markers} места` : ""}
            </i>
          </button>
        );
      })}
    </div>
  );
}
