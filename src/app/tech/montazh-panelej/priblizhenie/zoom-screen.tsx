"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  blockImage,
  blockMarkers,
  kartaBlocks,
  kartaMarkers,
  kartaRoom,
  type KartaMarker,
} from "@/data/montazh-karta";
import { LumenStage, type StagePoint, type StageZoom } from "../lumen-stage";
import { Pano, type PanoState } from "../pano";
import {
  FlyFrame,
  KartaAside,
  KartaCaption,
  KartaSheet,
  KartaToc,
  ZoomOverlay,
  useKartaSel,
} from "../karta-ui";
import styles from "../montazh.module.css";

/**
 * Вариант «Приближение», структура 21.10: карточка = сопряжение, маркеров столько,
 * в скольких местах комнаты оно видно. Маркер: наезд камеры и карточка справа, открытая
 * на своей ветке. Внутри ветки решения выбираются миниатюрами (внешний угол: 9 штук в трёх группах).
 * На телефоне комната разрезана на три вертикальных кадра; выбор в оглавлении прокручивает к нужному.
 */

export const toPoint = (m: KartaMarker): StagePoint => ({
  id: m.id,
  label: m.label,
  kin: m.card,
  x: m.x,
  y: m.y,
  depth: m.depth,
});

export function useMobile(query = "(max-width: 720px)") {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);
  return mobile;
}

export function ZoomScreen({ mobileMode = "blocks" }: { mobileMode?: "blocks" | "panorama" }) {
  const k = useKartaSel();
  const { marker, sel } = k;
  const [kin, setKin] = useState<string | null>(null);
  const mobile = useMobile();
  const blockRefs = useRef<Record<string, HTMLElement | null>>({});
  const pano = useRef<PanoState>({ x: 0, w: 0, tw: 0 });
  /* Сдвиг панорамы читается в момент выбора (обработчик), не при рендере */
  const [panoAt, setPanoAt] = useState<PanoState>({ x: 0, w: 0, tw: 0 });
  const select = useCallback((id: string | null) => { setPanoAt(pano.current); k.openMarker(id); }, [k]);
  const selectCard = useCallback((key: string) => { setPanoAt(pano.current); k.openCard(key); }, [k]);
  const ks = { ...k, openMarker: select, openCard: selectCard };
  const panorama = mobile && mobileMode === "panorama";

  /* Телефон: выбранный маркер прокручивает к своему кадру */
  useEffect(() => {
    if (!mobile || !marker) return;
    const block = kartaBlocks.find((b) => b.markers.includes(marker.id));
    const el = block ? blockRefs.current[block.id] : null;
    el?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, [mobile, marker]);

  const zoomFor = (m: KartaMarker | null): StageZoom | null => {
    if (!m) return null;
    if (panorama) {
      // Точка приезжает в центр видимого окна панорамы, выше шторки
      const { x, w, tw } = panoAt;
      const tx = tw ? (w / 2 - x) / tw : 0.5;
      return { x: m.x, y: m.y, k: 2.2, tx, ty: 0.3 };
    }
    return { x: m.x, y: m.y, k: mobile ? 1.9 : 2.4, tx: mobile ? 0.5 : 0.31, ty: mobile ? 0.4 : 0.5 };
  };

  if (panorama) {
    const zoom = zoomFor(marker);
    return (
      <div className={styles.lentaWrap}>
        <Pano onPan={(s) => { pano.current = s; }} locked={Boolean(sel)} startAt={0.45}>
          <LumenStage
            points={kartaMarkers.map(toPoint)}
            active={marker?.id ?? null}
            onSelect={select}
            zoom={zoom}
            hidePoints={Boolean(marker)}
            image={kartaRoom}
            className={styles.zoomStage}
          >
            <ZoomOverlay zoom={zoom} onClose={k.close}>
              <FlyFrame marker={marker} zoom={zoom} />
            </ZoomOverlay>
          </LumenStage>
        </Pano>
        <KartaCaption k={k} />
        <KartaToc k={ks} />
        <KartaSheet k={k} />
      </div>
    );
  }

  if (mobile) {
    return (
      <div className={styles.lentaWrap}>
        <KartaCaption k={k} />
        <div className={styles.blocks}>
          {kartaBlocks.map((block) => {
            const ms = blockMarkers(block);
            const here = marker && ms.find((m) => m.id === marker.id);
            const zoom = zoomFor(here ?? null);
            return (
              <section
                key={block.id}
                ref={(el) => { blockRefs.current[block.id] = el; }}
                className={styles.block}
                aria-label={block.title}
              >
                <p className={styles.blockHead}>
                  <span>{block.title}</span>
                  <small>{ms.map((m) => m.card).filter((v, i, a) => a.indexOf(v) === i).join(" · ")}</small>
                </p>
                <LumenStage
                  points={ms.map(toPoint)}
                  active={here ? marker!.id : null}
                  onSelect={select}
                  zoom={zoom}
                  hidePoints={Boolean(here)}
                  image={blockImage(block)}
                  className={styles.zoomStage}
                >
                  <ZoomOverlay zoom={zoom} onClose={k.close} />
                </LumenStage>
                {here ? <KartaAside k={k} /> : null}
              </section>
            );
          })}
        </div>
        <KartaToc k={ks} />
      </div>
    );
  }

  const zoom = zoomFor(marker);
  return (
    <div className={styles.lentaWrap}>
      <LumenStage
        points={kartaMarkers.map(toPoint)}
        active={marker?.id ?? null}
        onSelect={select}
        kin={kin}
        onKin={setKin}
        zoom={zoom}
        hidePoints={Boolean(marker)}
        image={kartaRoom}
        className={styles.zoomStage}
      >
        <ZoomOverlay zoom={zoom} onClose={k.close}>
          <FlyFrame marker={marker} zoom={zoom} />
        </ZoomOverlay>
        <KartaAside k={k} />
      </LumenStage>
      <KartaCaption k={k} />
      <KartaToc k={ks} onKin={setKin} />
    </div>
  );
}
