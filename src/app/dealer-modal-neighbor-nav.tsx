"use client";
import { asset } from "@/lib/asset";

const CHEVRON_SRC = asset("/images/home/cases/ui/chevron-right-glass.svg");

export type ModalNeighborItem = {
  title: string;
  image?: string;
};

function ModalNeighborButton({
  direction,
  item,
  eyebrow,
  onClick,
  thumbFit,
}: {
  direction: "prev" | "next";
  item: ModalNeighborItem;
  eyebrow: string;
  onClick: () => void;
  thumbFit: "contain" | "cover";
}) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      className={`dealer-modal-neighbor-btn ${isPrev ? "is-prev" : "is-next"}`}
      aria-label={`${eyebrow}: ${item.title}`}
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      <img
        src={CHEVRON_SRC}
        alt=""
        width={15}
        height={28}
        className={`h-7 w-[15px] shrink-0 ${isPrev ? "-scale-x-100" : ""}`}
      />
      {item.image ? (
        <span className="dealer-modal-neighbor-thumb">
          <img
            src={item.image}
            alt=""
            width={48}
            height={48}
            className={thumbFit === "contain" ? "size-full object-contain" : "size-full object-cover"}
          />
        </span>
      ) : null}
      <span className="dealer-modal-neighbor-copy min-w-0 flex-1">
        <span className="block text-[10px] font-semibold uppercase tracking-wide text-dealer-brand-primary">
          {eyebrow}
        </span>
        <span className="block truncate text-sm font-semibold leading-snug text-dealer-text-primary">
          {item.title}
        </span>
      </span>
    </button>
  );
}

export function ModalNeighborNav({
  label,
  prev,
  next,
  prevEyebrow,
  nextEyebrow,
  onPrev,
  onNext,
  compact = false,
  thumbFit = "cover",
}: {
  label: string;
  prev: ModalNeighborItem | null;
  next: ModalNeighborItem | null;
  prevEyebrow: string;
  nextEyebrow: string;
  onPrev: () => void;
  onNext: () => void;
  compact?: boolean;
  thumbFit?: "contain" | "cover";
}) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav
      className={`dealer-modal-neighbor-nav ${compact ? "is-compact" : "is-desktop"}`}
      aria-label={label}
    >
      {prev ? (
        <ModalNeighborButton
          direction="prev"
          item={prev}
          eyebrow={prevEyebrow}
          onClick={onPrev}
          thumbFit={thumbFit}
        />
      ) : compact ? null : (
        <span className="dealer-modal-neighbor-slot min-w-0 flex-1" aria-hidden />
      )}
      {next ? (
        <ModalNeighborButton
          direction="next"
          item={next}
          eyebrow={nextEyebrow}
          onClick={onNext}
          thumbFit={thumbFit}
        />
      ) : compact ? null : (
        <span className="dealer-modal-neighbor-slot min-w-0 flex-1" aria-hidden />
      )}
    </nav>
  );
}
