"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { MontazhNode } from "@/data/montazh-panelej";
import { LumenStage, type StagePoint } from "../lumen-stage";
import { NodeImage, NodeNav, NodeProfiles, NodeTitleGlass } from "../node-card";
import styles from "../montazh.module.css";

/**
 * Вариант «Лента»: комната сверху, под ней лента карточек узлов.
 * Точка и карточка связаны в обе стороны; выбранный узел подсвечивается в кадре
 * «лучом фонаря», а подробности раскрываются в панели под лентой.
 */
export function LentaScreen({ nodes }: { nodes: MontazhNode[] }) {
  const [active, setActive] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const node = nodes.find((n) => n.n === active) ?? null;
  const index = node ? nodes.indexOf(node) : -1;
  const points: StagePoint[] = nodes.map((n) => ({
    id: String(n.n),
    num: n.n,
    label: n.title,
    x: n.x,
    y: n.y,
    depth: n.depth,
  }));

  const select = useCallback((n: number | null) => setActive(n), []);
  const prev = () =>
    setActive(nodes[(index - 1 + nodes.length) % nodes.length].n);
  const next = () => setActive(nodes[(index + 1) % nodes.length].n);

  useEffect(() => {
    if (!node || !railRef.current) return;
    const card = railRef.current.querySelector<HTMLElement>(
      `[data-n="${node.n}"]`,
    );
    card?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [node]);

  const veilStyle = {
    "--vx": node?.x ?? 50,
    "--vy": node?.y ?? 50,
  } as CSSProperties;

  return (
    <div className={styles.lentaWrap}>
      <LumenStage
        points={points}
        active={active === null ? null : String(active)}
        onSelect={(id) => select(id === null ? null : Number(id))}
      >
        <div
          className={`${styles.veil} ${node ? styles.veilOn : ""}`}
          style={veilStyle}
          aria-hidden="true"
        />
      </LumenStage>

      <p className={styles.caption} aria-live="polite">
        {node ? (
          <>
            <b>{node.n}</b>
            {node.title}
          </>
        ) : (
          <span>Нажмите на точку или карточку в ленте</span>
        )}
      </p>

      <div ref={railRef} className={styles.rail} aria-label="Узлы монтажа">
        {nodes.map((n) => {
          const on = n.n === active;
          return (
            <button
              key={n.n}
              type="button"
              data-n={n.n}
              className={`${styles.card} ${on ? styles.cardOn : ""}`}
              aria-pressed={on}
              onClick={() => setActive(on ? null : n.n)}
            >
              <span className={styles.cardMedia}>
                <NodeImage node={n} className={styles.cardImg} sizes="232px" />
                <span className={styles.cardNum}>{n.n}</span>
              </span>
              <span className={styles.cardBody}>
                <span className={styles.cardZone}>{n.zone}</span>
                <span className={styles.cardTitle}>{n.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.detail} aria-live="polite">
        <div
          className={styles.detailEmpty}
          style={{ opacity: node ? 0 : 1 }}
          aria-hidden={Boolean(node)}
        >
          <b>Выберите узел</b>
          <span className={styles.hint}>
            Точка в комнате и карточка в ленте связаны: нажмите на любую.
          </span>
        </div>
        {nodes.map((n) => {
          const on = n.n === active;
          return (
            <article
              key={n.n}
              className={`${styles.detailPane} ${on ? styles.detailOn : ""}`}
              aria-hidden={!on}
            >
              <div className={styles.detailMedia}>
                <NodeImage node={n} sizes="(max-width: 720px) 100vw, 40vw" />
                <div className={styles.detailTitle}>
                  <NodeTitleGlass node={n} />
                </div>
              </div>
              <div className={styles.detailBody}>
                <NodeNav
                  onPrev={prev}
                  onNext={next}
                  onClose={() => setActive(null)}
                  position={n.n}
                  total={nodes.length}
                />
                <p className={styles.text}>{n.text}</p>
                <NodeProfiles node={n} />
                <p className={styles.hint}>
                  Монтаж сухой: панели держатся в профиле, к стене не
                  приклеиваются.
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
