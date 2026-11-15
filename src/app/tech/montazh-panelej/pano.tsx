"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as RPointerEvent,
  type ReactNode,
} from "react";
import styles from "./montazh.module.css";

export type PanoState = { x: number; w: number; tw: number };

type Props = {
  children: ReactNode;
  /** Доля ширины сцены, которую поставить в центр окна при старте. */
  startAt?: number;
  /** Текущий сдвиг дорожки: нужен, чтобы наезд камеры целился в центр окна. */
  onPan?: (s: PanoState) => void;
  /** Пока карточка открыта, окно не двигается. */
  locked?: boolean;
  /** Пропорция окна (ширина / высота); дорожка 16:9 внутри всегда во всю высоту. */
  aspect?: number;
  className?: string;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const DRAG_MS = 600;

/**
 * Телефон: окно 3:4, внутри широкая комната 16:9, которую двигают пальцем по горизонтали.
 * Сдвиг пишется прямо в transform дорожки; вертикальная прокрутка страницы остаётся у браузера
 * (touch-action: pan-y). Инерция: одна transition с кривой движения дилерского сайта, без пружин.
 */
export function Pano({ children, startAt = 0.45, onPan, locked = false, aspect = 3 / 4, className }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const drag = useRef<{ id: number; x0: number; px: number; lastX: number; lastT: number; v: number; moved: boolean } | null>(null);
  const [hint, setHint] = useState(true);

  /* Комната занимает 13..86 % ширины кадра, пустые поля за край окна не выезжают */
  const EDGE_L = 0.12;
  const EDGE_R = 0.87;
  const bounds = () => {
    const w = wrap.current?.clientWidth ?? 0;
    const tw = track.current?.scrollWidth ?? 0;
    const max = -EDGE_L * tw;
    const min = Math.min(max, w - EDGE_R * tw);
    return { w, tw, min, max };
  };

  const apply = useCallback(
    (nx: number, ms = 0) => {
      const el = track.current;
      if (!el) return;
      const { w, tw, min, max } = bounds();
      x.current = clamp(nx, min, max);
      el.style.transition = ms ? `transform ${ms}ms var(--dealer-motion-easing)` : "none";
      el.style.transform = `translate3d(${x.current.toFixed(1)}px, 0, 0)`;
      onPan?.({ x: x.current, w, tw });
    },
    [onPan],
  );

  useEffect(() => {
    const { w, tw } = bounds();
    apply(w / 2 - startAt * tw);
    const ro = new ResizeObserver(() => apply(x.current));
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const down = (e: RPointerEvent<HTMLDivElement>) => {
    if (locked) return;
    drag.current = { id: e.pointerId, x0: x.current, px: e.clientX, lastX: e.clientX, lastT: e.timeStamp, v: 0, moved: false };
  };
  const move = (e: RPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.px;
    if (!d.moved && Math.abs(dx) < 6) return;
    if (!d.moved) {
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setHint(false);
    }
    const dt = Math.max(1, e.timeStamp - d.lastT);
    d.v = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    apply(d.x0 + dx);
  };
  const up = (e: RPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.moved) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    apply(x.current + (reduce ? 0 : d.v * 160), reduce ? 0 : DRAG_MS);
    // Тап по маркеру после перетаскивания не считаем нажатием
    const stop = (ev: Event) => {
      ev.stopPropagation();
      ev.preventDefault();
    };
    e.currentTarget.addEventListener("click", stop, { capture: true, once: true });
    window.setTimeout(() => e.currentTarget?.removeEventListener("click", stop, { capture: true }), 0);
  };

  return (
    <div
      ref={wrap}
      className={`${styles.pano} ${className ?? ""}`}
      style={{ aspectRatio: `${aspect}` }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    >
      <div ref={track} className={styles.panoTrack} style={{ width: `${((16 / 9 / aspect) * 100).toFixed(3)}%` }}>
        {children}
      </div>
      <span className={`${styles.panoHint} ${hint && !locked ? "" : styles.panoHintOff}`} aria-hidden="true">
        ← двигайте комнату →
      </span>
    </div>
  );
}
