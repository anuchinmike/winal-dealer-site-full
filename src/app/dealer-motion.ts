/** Default slow UI motion rhythm — catalog cards, tabs, modal hovers. */
export const DEALER_MOTION_DURATION_MS = 2000;

export const DEALER_MOTION_DURATION_CLASS = "duration-[2000ms]";

export const DEALER_MOTION_EASING_CLASS = "ease-out";

export const DEALER_MOTION_REDUCE_CLASS = "motion-reduce:transition-none";

/** Fast micro-feedback (pagination, quick fades) — not the default hover rhythm. */
export const DEALER_MOTION_FAST_DURATION_CLASS = "duration-200";

const DEALER_MOTION_TIMING = `${DEALER_MOTION_DURATION_CLASS} ${DEALER_MOTION_EASING_CLASS} ${DEALER_MOTION_REDUCE_CLASS}`;

export const dealerMotionAll = `transition-all ${DEALER_MOTION_TIMING}`;

export const dealerMotionColors = `transition-colors ${DEALER_MOTION_TIMING}`;

export const dealerMotionBackground = `transition-[background-image,background-color,color] ${DEALER_MOTION_TIMING}`;

export const dealerMotionTransform = `transition-transform ${DEALER_MOTION_TIMING}`;

export const dealerMotionOpacity = `transition-opacity ${DEALER_MOTION_TIMING}`;

export const dealerMotionOpacityTransform = `transition-[opacity,transform] ${DEALER_MOTION_TIMING}`;

/** Catalog tabs: height is fixed; only transform + surface colors animate smoothly. */
export const dealerMotionTab = `transition-[transform,background-color,color] ${DEALER_MOTION_TIMING}`;
