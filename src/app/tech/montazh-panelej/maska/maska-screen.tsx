"use client";

import { useCallback, useRef, useState } from "react";
import { kartaMarkers, kartaRoom, type KartaMarker } from "@/data/montazh-karta";
import { LumenStage, type StageZoom } from "../lumen-stage";
import { Pano, type PanoState } from "../pano";
import {
  FlyFrame,
  ZoomOverlay,
  useKartaSel,
} from "../karta-ui";
import { toPoint, useMobile } from "../priblizhenie/zoom-screen";
import { CloseUp } from "./closeup";
import { TechProfileModals } from "../profile-modals-host";
import styles from "../montazh.module.css";

/**
 * Вариант «Маска» (26.10, по правке Михаила): в покое комната без маски.
 * Наведение на точку: только подпись на стекле (карточки-превью убраны 27.10).
 * Клик: камера подлетает к точке, сцена сменяется квадратным крупным кадром слева с дугой маски
 * (maska/closeup.tsx), справа выезжает стеклянная площадка с вариантами.
 * На телефоне — панорама и шторка.
 */

const visibleMarkers = kartaMarkers.filter((m) => m.id !== "i-door");

export function MaskaScreen({ embedded = false }: { embedded?: boolean }) {
  const k = useKartaSel();
  const { marker, sel } = k;
  const [kin, setKin] = useState<string | null>(null);
  const mobile = useMobile();
  const pano = useRef<PanoState>({ x: 0, w: 0, tw: 0 });
  const [panoAt, setPanoAt] = useState<PanoState>({ x: 0, w: 0, tw: 0 });
  const select = useCallback((id: string | null) => { setPanoAt(pano.current); k.openMarker(id); }, [k]);

  const zoomFor = (m: KartaMarker | null): StageZoom | null => {
    if (!m) return null;
    if (mobile) {
      const { x, w, tw } = panoAt;
      return { x: m.x, y: m.y, k: 2.2, tx: tw ? (w / 2 - x) / tw : 0.5, ty: 0.3 };
    }
    // Точка приезжает в левую часть кадра, правую закрывает маска
    return { x: m.x, y: m.y, k: 2.4, tx: 0.24, ty: 0.5 };
  };
  const zoom = zoomFor(marker);
  const guide = (
    <div className={styles.roomGuide}>
      {/* «← Вся комната» — на кадре слева снизу (Михаил 14.11); пока узел открыт, подсказку не показываем */}
      <p id="montazh-help">{marker ? "" : "Выберите точку в комнате, чтобы рассмотреть узел и варианты его исполнения."}</p>
      <label className={styles.nodePicker}>
        <span>Узел</span>
        <select aria-label="Выбрать узел монтажа" value={marker?.id ?? ""} onChange={(e) => select(e.target.value || null)}>
          <option value="">Вся комната</option>
          {visibleMarkers.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
      </label>
    </div>
  );

  if (mobile) {
    return (
      <div className={styles.lentaWrap}>
        {guide}
        <Pano onPan={(s) => { pano.current = s; }} locked={Boolean(sel)} startAt={0.45}>
          <LumenStage
            points={visibleMarkers.map(toPoint)}
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
        {/* Телефон (Михаил 29.10): тот же крупный кадр, что на десктопе, вместо старой шторки */}
        <CloseUp k={k} mobile />
        {!embedded && <TechProfileModals />}
      </div>
    );
  }

  return (
    <div className={styles.lentaWrap}>
      {guide}
      <LumenStage
        points={visibleMarkers.map(toPoint)}
        active={marker?.id ?? null}
        onSelect={select}
        kin={kin}
        onKin={setKin}
        zoom={zoom}
        hidePoints={Boolean(marker)}
        image={kartaRoom}
        className={`${styles.zoomStage} ${styles.maskStage}`}
      >
        <ZoomOverlay zoom={zoom} onClose={k.close} back={false}>
          <FlyFrame marker={marker} zoom={zoom} />
        </ZoomOverlay>
        <CloseUp k={k} />
      </LumenStage>
      {!embedded && <TechProfileModals />}
    </div>
  );
}
