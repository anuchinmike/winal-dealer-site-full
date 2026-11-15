"use client";

import { useLenis } from "lenis/react";
import { useEffect, useState, type RefObject } from "react";

/** Element is fully on-screen, or fills the viewport when taller than it. */
export function isViewportAlignedVisible(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const horizontallyContained = rect.left >= 0 && rect.right <= viewportWidth;

  if (!horizontallyContained) {
    return false;
  }

  if (rect.height <= viewportHeight) {
    return rect.top >= 0 && rect.bottom <= viewportHeight;
  }

  return rect.top <= 0 && rect.bottom >= viewportHeight;
}

export function useViewportAlignedVisibility<T extends HTMLElement>(targetRef: RefObject<T | null>) {
  const lenis = useLenis();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = targetRef.current;

    if (!element) {
      return;
    }

    const update = () => {
      setIsVisible(isViewportAlignedVisible(element));
    };

    update();
    window.addEventListener("resize", update, { passive: true });

    if (lenis) {
      lenis.on("scroll", update);
    } else {
      window.addEventListener("scroll", update, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", update);

      if (lenis) {
        lenis.off("scroll", update);
      } else {
        window.removeEventListener("scroll", update);
      }
    };
  }, [lenis, targetRef]);

  return isVisible;
}

export function useCatalogRailScrollEnabled<T extends HTMLElement>(targetRef: RefObject<T | null>) {
  const lenis = useLenis();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const element = targetRef.current;

    if (!element) {
      return;
    }

    const update = () => {
      setIsEnabled(isViewportAlignedVisible(element));
    };

    update();
    window.addEventListener("resize", update, { passive: true });

    if (lenis) {
      lenis.on("scroll", update);
    } else {
      window.addEventListener("scroll", update, { passive: true });
    }

    return () => {
      window.removeEventListener("resize", update);

      if (lenis) {
        lenis.off("scroll", update);
      } else {
        window.removeEventListener("scroll", update);
      }
    };
  }, [lenis, targetRef]);

  return isEnabled;
}
