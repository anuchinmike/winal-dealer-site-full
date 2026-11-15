"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import type { MontazhPoint } from "@/data/tech-tehnologii-montazha";
import styles from "./page.module.css";

const NEAR = 8900;
const FAR = 12900;

/** 0 — самая дальняя точка, 1 — самая ближняя. */
const nearness = (depth: number) =>
  Math.min(1, Math.max(0, (FAR - depth) / (FAR - NEAR)));

type Props = { points: MontazhPoint[] };

/**
 * Вариант «Lumen» (Михаил, 19.10.2026): точки — тёплые светодиоды, как Lumen Line в сцене;
 * наведение или тап выпускает вниз световую линию с подписью узла.
 * Наклон сцены из варианта «Глубина»: сглаженное слежение за мышью, transform пишется прямо в каждый элемент.
 */
export function DepthScene({ points }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const target = useRef({ x: 0, y: 0 });
  const now = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const [active, setActive] = useState<number | null>(null);

  const order = [...points].sort((a, b) => a.x - b.x).map((p) => p.n);

  const apply = () => {
    const { x, y } = now.current;
    if (sceneRef.current)
      sceneRef.current.style.transform = `rotateY(${x * 3}deg) rotateX(${-y * 2.2}deg)`;
    dotRefs.current.forEach((el, i) => {
      if (!el) return;
      const k = nearness(points[i].depth);
      el.style.transform = `translate(${x * (6 + k * 34)}px, ${y * (4 + k * 24)}px)`;
    });
  };

  const step = () => {
    const t = target.current;
    const c = now.current;
    c.x += (t.x - c.x) * 0.08;
    c.y += (t.y - c.y) * 0.08;
    apply();
    raf.current =
      Math.abs(t.x - c.x) > 0.0005 || Math.abs(t.y - c.y) > 0.0005
        ? requestAnimationFrame(step)
        : 0;
  };

  const kick = () => {
    if (!raf.current) raf.current = requestAnimationFrame(step);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (
      e.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const r = e.currentTarget.getBoundingClientRect();
    target.current = {
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    };
    kick();
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  useEffect(() => {
    if (active === null) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [active]);

  const current = points.find((p) => p.n === active);

  return (
    <div className={styles.block}>
      <div
        ref={stageRef}
        className={styles.stage}
        onPointerMove={onMove}
        onPointerLeave={() => {
          target.current = { x: 0, y: 0 };
          kick();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget || e.target === sceneRef.current)
            setActive(null);
        }}
      >
        <div ref={sceneRef} className={styles.scene}>
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
          {points.map((p, i) => {
            const style = {
              "--x": p.x,
              "--y": p.y,
              "--k": nearness(p.depth).toFixed(3),
              "--o": order.indexOf(p.n),
            } as CSSProperties;
            const isOn = active === p.n;
            return (
              <button
                key={p.n}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                type="button"
                className={`${styles.hs} ${isOn ? styles.on : ""}`}
                style={style}
                aria-label={`${p.n}. ${p.title}`}
                aria-pressed={isOn}
                onClick={() => setActive(isOn ? null : p.n)}
              >
                <span className={styles.in} aria-hidden="true">
                  <span className={styles.glow} />
                  <span className={styles.ray} />
                  <span className={styles.led} />
                </span>
                <span className={styles.label} aria-hidden="true">
                  <b>{p.n}</b>
                  {p.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p className={styles.caption} aria-live="polite">
        {current ? (
          <>
            <b>{current.n}</b>
            {current.title}
          </>
        ) : (
          <span>Нажмите на точку, чтобы увидеть узел</span>
        )}
      </p>
    </div>
  );
}
