"use client";

import { openCasePhotoGallery } from "@/app/case-fancybox";
import { soundcoreTextureMacroCaption, soundcoreTextures } from "@/data/soundcore-textures";

/**
 * Плитки фактур S/M/L: общий вид панели, на hover крупный план,
 * по клику Fancybox со всеми кадрами (панель + макро для каждой фактуры).
 */
export function SoundcoreTextureTiles() {
  const openGallery = (index: number, trigger: HTMLElement) => {
    openCasePhotoGallery(
      soundcoreTextures.flatMap((texture) => [
        { src: texture.panel, caption: `${texture.name} · ${texture.caption}` },
        { src: texture.macro, caption: `${texture.name} · ${soundcoreTextureMacroCaption}` },
      ]),
      index * 2,
      trigger,
    );
  };

  return (
    <div className="dealer-modal-compact-rail flex gap-2">
      {soundcoreTextures.map((texture, index) => (
        <figure key={texture.name} className="m-0 flex w-[68px] shrink-0 flex-col gap-1.5">
          <button
            type="button"
            data-soundcore-texture={texture.name}
            aria-label={`Фактура ${texture.name}, ${texture.caption}. Открыть фото`}
            onClick={(event) => openGallery(index, event.currentTarget)}
            className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dealer-brand-primary"
          >
            <img src={texture.thumb} alt="" width={240} height={240} loading="lazy" className="absolute inset-0 size-full object-cover" />
            <img
              src={texture.macro}
              alt=""
              width={1040}
              height={1300}
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-200 ease-out motion-reduce:transition-none [@media(hover:hover)]:group-hover:opacity-100"
            />
          </button>
          <figcaption className="dealer-type-mini-regular text-center text-dealer-text-primary">{texture.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}
