"use client";

import { useCallback, useEffect, useState } from "react";
import type { MontazhNode } from "@/data/montazh-panelej";
import { LumenStage, type StagePoint } from "../lumen-stage";
import { NodeImage, NodeNav, NodeProfiles, NodeTitleGlass } from "../node-card";
import styles from "../montazh.module.css";

/**
 * Вариант «Док» (первая генерация): по нажатию на точку карточка узла выезжает справа
 * и перекрывает часть комнаты; кадр сдвигается влево, чтобы выбранная точка осталась на виду.
 * На телефоне карточка становится нижней шторкой.
 */
export function DokScreen({ nodes }: { nodes: MontazhNode[] }) {
  const [active, setActive] = useState<number | null>(null);
  // Последний показанный узел: содержимое остаётся в панели, пока она уезжает.
  const [last, setLast] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);

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

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const select = useCallback((n: number | null) => {
    setActive(n);
    if (n !== null) setLast(n);
  }, []);
  const prev = () => select(nodes[(index - 1 + nodes.length) % nodes.length].n);
  const next = () => select(nodes[(index + 1) % nodes.length].n);
  const open = Boolean(node);
  const card = nodes.find((n) => n.n === last) ?? null;

  const dock = (
    <aside
      className={`${styles.dock} ${open ? styles.dockOpen : ""}`}
      aria-label={card ? `Узел ${card.n}: ${card.title}` : "Карточка узла"}
      aria-hidden={!open}
    >
      <span className={styles.dockGrab} aria-hidden="true" />
      <div className={styles.dockMedia}>
        {card ? (
          <NodeImage
            key={card.n}
            node={card}
            sizes="(max-width: 720px) 100vw, 36vw"
          />
        ) : null}
        {card ? (
          <div className={styles.dockTitle}>
            <NodeTitleGlass node={card} compact />
          </div>
        ) : null}
      </div>
      <div className={styles.dockBody}>
        {card ? (
          <>
            <NodeNav
              onPrev={prev}
              onNext={next}
              onClose={() => setActive(null)}
              position={card.n}
              total={nodes.length}
            />
            <p className={styles.text}>{card.text}</p>
            <NodeProfiles node={card} />
            {card.images.length > 1 ? (
              <div
                className={`${styles.dockMedia} ${styles.dockExtra}`}
                style={{ borderRadius: "var(--dealer-radius-sm)" }}
              >
                <NodeImage
                  node={card}
                  index={1}
                  sizes="(max-width: 720px) 100vw, 36vw"
                />
              </div>
            ) : null}
            <p className={styles.hint}>
              Монтаж сухой: панели держатся в профиле, к стене не приклеиваются.
            </p>
          </>
        ) : null}
      </div>
    </aside>
  );

  return (
    <div>
      <LumenStage
        points={points}
        active={active === null ? null : String(active)}
        onSelect={(id) => select(id === null ? null : Number(id))}
        shiftX={open && !mobile ? -9 : 0}
        labelOnHoverOnly
      >
        {!mobile ? dock : null}
      </LumenStage>
      {mobile ? (
        <div className={`${styles.dockHost} ${open ? styles.dockHostOn : ""}`}>
          <button
            type="button"
            className={styles.dockScrim}
            aria-label="Закрыть узел"
            onClick={() => setActive(null)}
          />
          {dock}
        </div>
      ) : null}
      <p
        className={styles.caption}
        aria-live="polite"
        style={{ marginTop: 12 }}
      >
        {node ? (
          <>
            <b>{node.n}</b>
            {node.title}
          </>
        ) : (
          <span>Нажмите на точку: карточка узла откроется снизу</span>
        )}
      </p>
    </div>
  );
}
