"use client";

import "lenis/dist/lenis.css";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { boostMacHeroWheelDelta, DEALER_SCROLL_LERP, DEALER_WHEEL_MULTIPLIER } from "@/app/dealer-scroll-motion";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        // Небольшая инерция для всего документа, без слишком "резинового" эффекта.
        lerp: DEALER_SCROLL_LERP,
        smoothWheel: true,
        touchMultiplier: 1,
        wheelMultiplier: DEALER_WHEEL_MULTIPLIER,
        stopInertiaOnNavigate: true,
        // Mac trackpad: fewer swipes to get through the hero scene (see dealer-scroll-motion.ts).
        virtualScroll: (data) => {
          data.deltaY = boostMacHeroWheelDelta(data.deltaY, data.event);
          return true;
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}
