import { Fancybox, type FancyboxOptions } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const caseGalleryOptions: Partial<FancyboxOptions> = {
  Carousel: {
    Arrows: true,
    Toolbar: {
      display: {
        right: ["close"],
      },
    },
  },
  closeButton: false,
  zoomEffect: true,
  hideScrollbar: true,
};

export type FancyboxGalleryImage = string | { src: string; caption?: string };

/** Swatch files are cropped; lightbox uses the sibling `/full/` master. */
export function coatingLightboxSrc(swatchSrc: string) {
  const [path, query] = swatchSrc.split("?");
  const slash = path.lastIndexOf("/");
  if (slash < 0) {
    return swatchSrc;
  }

  const fullPath = `${path.slice(0, slash)}/full${path.slice(slash)}`;
  return query ? `${fullPath}?${query}` : fullPath;
}

export function openCasePhotoGallery(images: FancyboxGalleryImage[], startIndex = 0, triggerEl?: HTMLElement) {
  if (images.length === 0) {
    return;
  }

  const safeStart = Math.max(0, Math.min(startIndex, images.length - 1));

  Fancybox.show(
    images.map((item) =>
      typeof item === "string"
        ? { src: item, type: "image" as const }
        : { src: item.src, type: "image" as const, caption: item.caption },
    ),
    {
      ...caseGalleryOptions,
      startIndex: safeStart,
      triggerEl,
    },
  );
}
