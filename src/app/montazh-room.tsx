"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { kartaRoom } from "@/data/montazh-karta";
import styles from "./tech/montazh-panelej/montazh.module.css";

function RoomPreview() {
  return (
    <div className={styles.roomPreview} aria-busy="true" aria-label="Загрузка интерактивной комнаты">
      <img src={kartaRoom.src} srcSet={kartaRoom.srcSet} sizes="(max-width: 720px) 100vw, 1376px"
        alt={kartaRoom.alt} width={kartaRoom.width} height={kartaRoom.height} loading="lazy" decoding="async" />
      <p role="status">Загружаем интерактивную комнату…</p>
    </div>
  );
}

const Room = dynamic(() => import("./tech/montazh-panelej/maska/maska-screen").then((m) => m.MaskaScreen), {
  loading: RoomPreview,
});

export function MontazhRoom() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!host.current) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "600px" });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={host}>{ready ? <Room embedded /> : <RoomPreview />}</div>;
}
