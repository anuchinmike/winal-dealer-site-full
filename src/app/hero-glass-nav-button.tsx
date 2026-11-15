"use client";

import { dealerMotionTransform } from "@/app/dealer-motion";

const CHEVRON_RIGHT_GLASS = "/images/home/cases/ui/chevron-right-glass.svg";

export function HeroGlassNavButton({
  ariaLabel,
  onClick,
  direction = "right",
}: {
  ariaLabel: string;
  onClick: () => void;
  direction?: "left" | "right";
}) {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`relative z-10 flex size-12 shrink-0 origin-center items-center rounded-full px-[15px] py-2 group ${
        isLeft ? "justify-start" : "justify-end"
      }`}
      style={{ boxShadow: "var(--dealer-effect-main-liquid-glass-drop-shadow)" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full backdrop-blur-[6px]"
        style={{ background: "rgba(255, 255, 255, 0.25)" }}
      />
      <span className="relative h-7 w-[15px] shrink-0">
        <span
          className={`absolute inset-[-14.29%_-40%_-28.57%_-40%] origin-center ${dealerMotionTransform} motion-reduce:transform-none group-hover:scale-[1.08]`}
        >
          <img
            src={CHEVRON_RIGHT_GLASS}
            alt=""
            className={`block size-full max-w-none ${isLeft ? "-scale-x-100" : ""}`}
          />
        </span>
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          boxShadow:
            "var(--dealer-effect-main-liquid-glass-inner-shadow-light), var(--dealer-effect-main-liquid-glass-inner-shadow-dark)",
        }}
      />
    </button>
  );
}
