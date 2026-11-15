"use client";

import { useEffect, useState, type RefObject } from "react";
import { heroCaptions, type HeroCaptionCue } from "@/data/hero-captions";

function findCue(cues: HeroCaptionCue[], time: number) {
  for (const cue of cues) {
    if (time >= cue.start && time < cue.end) return cue;
  }
  return null;
}

/**
 * Титры поверх видео первого экрана в стиле прежнего ролика: слева внизу, белый текст,
 * заголовок капсом, мягкое затемнение снизу. Следит за currentTime элемента <video>.
 */
export function HeroCaptions({
  videoRef,
  cues = heroCaptions,
  compact = false,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  cues?: HeroCaptionCue[];
  compact?: boolean;
}) {
  const [cue, setCue] = useState<HeroCaptionCue | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || cues.length === 0) return;
    const update = () => {
      const next = findCue(cues, video.currentTime);
      setCue((prev) => (prev === next ? prev : next));
    };
    update();
    video.addEventListener("timeupdate", update);
    video.addEventListener("seeked", update);
    video.addEventListener("ended", update);
    return () => {
      video.removeEventListener("timeupdate", update);
      video.removeEventListener("seeked", update);
      video.removeEventListener("ended", update);
    };
  }, [videoRef, cues]);

  if (cues.length === 0) return null;

  return (
    <div
      className={`dealer-hero-captions${compact ? " dealer-hero-captions--compact" : ""}${cue ? " is-active" : ""}`}
      aria-live="polite"
    >
      {cue ? (
        <div key={cue.start} className="dealer-hero-captions-cue">
          {cue.title ? <p className="dealer-hero-captions-title">{cue.title}</p> : null}
          {cue.text ? <p className="dealer-hero-captions-text">{cue.text}</p> : null}
          {cue.list ? (
            <ul className="dealer-hero-captions-list">
              {cue.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
