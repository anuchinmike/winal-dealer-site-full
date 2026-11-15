"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import styles from "./montazh.module.css";

/** Точка на сцене: любой узел с координатами в % кадра и глубиной. */
export type StagePoint = {
  id: string;
  label: string;
  /** Номер в кружке; без него точка без цифры. */
  num?: number;
  /** Ключ группы: точки одной карточки подсвечиваются вместе. */
  kin?: string;
  x: number;
  y: number;
  depth: number;
};

const NEAR = 8900;
const FAR = 12900;
const ZOOM_MS = 2000;

/** 0 — самая дальняя точка, 1 — самая ближняя. */
export const nearness = (depth: number) =>
  Math.min(1, Math.max(0, (FAR - depth) / (FAR - NEAR)));

export type StageZoom = {
  /** Точка кадра, % */
  x: number;
  y: number;
  /** Куда в кадре её привести, доли 0..1 */
  tx: number;
  ty: number;
  k: number;
};

type Props = {
  points: StagePoint[];
  active: string | null;
  onSelect: (id: string | null) => void;
  /** Группа, которую подсветить целиком (наведение на одну из точек). */
  kin?: string | null;
  onKin?: (kin: string | null) => void;
  /** Наведение на конкретную точку (мышь/фокус): для превью узла. */
  onHover?: (id: string | null) => void;
  /** Наезд камеры: сцена масштабируется вокруг точки, наклон отключается. */
  zoom?: StageZoom | null;
  /** Сдвиг кадра, % ширины: освобождает место под панель справа. */
  shiftX?: number;
  /** Точки гаснут (режим приближения). */
  hidePoints?: boolean;
  /** Подпись у точки показывается только по наведению, не по выбору. */
  labelOnHoverOnly?: boolean;
  /** Другой кадр вместо комнаты 16:9 (вертикальные блоки на телефоне). */
  image?: StageImage;
  children?: ReactNode;
  className?: string;
};

export type StageImage = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
};

function reduceMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Комната v8p с точками Lumen. Наклон за курсором и параллакс точек пишутся
 * прямо в transform каждого элемента (правило animate), без CSS-переменных на родителе.
 */
export function LumenStage({
  points,
  active,
  onSelect,
  kin = null,
  onKin,
  onHover,
  zoom = null,
  shiftX = 0,
  hidePoints = false,
  labelOnHoverOnly = false,
  image,
  children,
  className,
}: Props) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const target = useRef({ x: 0, y: 0 });
  const now = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const zoomRef = useRef<StageZoom | null>(zoom);
  const settleTimer = useRef(0);
  const frozen = useRef(false);

  const order = [...points].sort((a, b) => a.x - b.x).map((p) => p.id);

  const sceneTransform = (x: number, y: number) => {
    const z = zoomRef.current;
    if (z) {
      const tx = (z.tx - 0.5) * 100 - (z.x / 100 - 0.5) * z.k * 100;
      const ty = (z.ty - 0.5) * 100 - (z.y / 100 - 0.5) * z.k * 100;
      return `translate(${tx.toFixed(3)}%, ${ty.toFixed(3)}%) scale(${z.k})`;
    }
    return `rotateY(${(x * 3).toFixed(3)}deg) rotateX(${(-y * 2.2).toFixed(3)}deg)`;
  };

  const apply = () => {
    const { x, y } = now.current;
    const el = sceneRef.current;
    if (el) el.style.transform = sceneTransform(x, y);
    dotRefs.current.forEach((d, i) => {
      if (!d) return;
      const k = nearness(points[i].depth);
      d.style.transform = `translate(${(x * (6 + k * 34)).toFixed(2)}px, ${(y * (4 + k * 24)).toFixed(2)}px)`;
    });
  };

  const step = () => {
    const t = target.current;
    const c = now.current;
    c.x += (t.x - c.x) * 0.08;
    c.y += (t.y - c.y) * 0.08;
    apply();
    const settled =
      Math.abs(t.x - c.x) < 0.0005 && Math.abs(t.y - c.y) < 0.0005;
    raf.current = settled ? 0 : requestAnimationFrame(step);
  };

  const kick = () => {
    if (frozen.current) return;
    if (!raf.current) raf.current = requestAnimationFrame(step);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduceMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    target.current = {
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    };
    kick();
  };

  /* Наезд камеры: одна transition на сцене, наклон на время наезда заморожен. */
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    zoomRef.current = zoom;
    cancelAnimationFrame(raf.current);
    raf.current = 0;
    window.clearTimeout(settleTimer.current);
    frozen.current = true;
    now.current = { x: 0, y: 0 };
    target.current = { x: 0, y: 0 };
    const ms = reduceMotion() ? 0 : ZOOM_MS;
    el.style.transition = ms
      ? `transform ${ms}ms var(--dealer-motion-easing)`
      : "none";
    apply();
    settleTimer.current = window.setTimeout(() => {
      el.style.transition = "";
      frozen.current = Boolean(zoomRef.current);
    }, ms + 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom?.x, zoom?.y, zoom?.k, zoom?.tx, zoom?.ty]);

  useEffect(
    () => () => {
      cancelAnimationFrame(raf.current);
      window.clearTimeout(settleTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (active === null) return;
    // Escape закрывает точку, только если поверх не открыта модалка (карточка профиля): та закрывается сама
    const close = (e: KeyboardEvent) =>
      e.key === "Escape" && !document.querySelector('[role="dialog"][aria-modal="true"]') && onSelect(null);
    // capture: срабатывает раньше обработчика модалки, пока её окно ещё в DOM
    window.addEventListener("keydown", close, true);
    return () => window.removeEventListener("keydown", close, true);
  }, [active, onSelect]);

  return (
    <div
      className={`${styles.stage} ${className ?? ""}`}
      data-montazh-stage=""
      style={
        image ? { aspectRatio: `${image.width} / ${image.height}` } : undefined
      }
      onPointerMove={onMove}
      onPointerLeave={() => {
        target.current = { x: 0, y: 0 };
        kick();
      }}
    >
      <div
        className={styles.shift}
        style={{ transform: shiftX ? `translateX(${shiftX}%)` : undefined }}
      >
        <div ref={sceneRef} className={styles.scene}>
          {image ? (
            <img
              className={styles.room}
              src={image.src}
              srcSet={image.srcSet}
              sizes="100vw"
              width={image.width}
              height={image.height}
              alt={image.alt}
              draggable={false}
            />
          ) : (
            <picture>
              <source
                media="(max-width: 720px)"
                srcSet="/tech/montazh/room-v8p-1280.webp"
              />
              <img
                className={styles.room}
                src="/tech/montazh/room-v8p-2560.webp"
                width={2560}
                height={1440}
                alt="Комната в разрезе: стены, колонна, перегородка WallPro и потолок на профилях WINAL"
                draggable={false}
              />
            </picture>
          )}
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Снять выбор узла"
            tabIndex={-1}
            onClick={() => onSelect(null)}
          />
          {points.map((p, i) => {
            const style = {
              "--x": p.x,
              "--y": p.y,
              "--k": nearness(p.depth).toFixed(3),
              "--o": order.indexOf(p.id),
            } as CSSProperties;
            const isOn = active === p.id;
            const isKin = Boolean(kin && p.kin === kin && !isOn);
            return (
              <button
                key={p.id}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                type="button"
                className={[
                  styles.hs,
                  isOn ? styles.on : "",
                  isKin ? styles.kin : "",
                  hidePoints ? styles.hsHidden : "",
                  labelOnHoverOnly ? styles.hsQuiet : "",
                ].join(" ")}
                style={style}
                aria-label={p.num ? `${p.num}. ${p.label}` : p.label}
                aria-pressed={isOn}
                onClick={() => onSelect(isOn ? null : p.id)}
                onPointerEnter={(e) => { onKin?.(p.kin ?? null); if (e.pointerType === "mouse") onHover?.(p.id); }}
                onPointerLeave={() => { onKin?.(null); onHover?.(null); }}
                onFocus={() => { onKin?.(p.kin ?? null); onHover?.(p.id); }}
                onBlur={() => { onKin?.(null); onHover?.(null); }}
              >
                <span className={styles.in} aria-hidden="true">
                  <span className={styles.glow} />
                  <span className={styles.ray} />
                  <span className={styles.led} />
                </span>
                <span className={styles.label} aria-hidden="true">
                  {p.num ? <b>{p.num}</b> : null}
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
}
