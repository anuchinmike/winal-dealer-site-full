/** Shared smooth-scroll feel for Lenis (page) and catalog rail. */
export const DEALER_SCROLL_LERP = 0.08;
export const DEALER_WHEEL_MULTIPLIER = 0.95;

/**
 * macOS trackpads (and Magic Mouse) emit many small pixel deltas, so the ~3200px hero
 * scroll-scene took about ten swipes in Safari, against two flicks of a Windows wheel.
 * Inside the hero scene only, wheel deltas on a Mac are boosted by this factor.
 */
export const MAC_HERO_WHEEL_BOOST = 3;
export const HERO_SCENE_SELECTOR = "[data-hero-scroll-scene]";

let isMacCache: boolean | null = null;

function isMacDesktop() {
  if (isMacCache === null) {
    const platform =
      (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform ??
      navigator.platform ??
      "";
    isMacCache = /mac/i.test(platform) && navigator.maxTouchPoints === 0;
  }
  return isMacCache;
}

/** Returns the wheel delta to use for this event (unchanged outside the hero scene or off macOS). */
export function boostMacHeroWheelDelta(deltaY: number, event: Event) {
  if (deltaY === 0 || !event.type.includes("wheel") || !isMacDesktop()) return deltaY;
  const scene = document.querySelector(HERO_SCENE_SELECTOR);
  if (!scene) return deltaY;
  const rect = scene.getBoundingClientRect();
  const viewport = window.innerHeight;
  // Scene is "running" while its bottom is still below the viewport bottom.
  const remainingDown = rect.bottom - viewport;
  if (rect.top >= viewport || remainingDown < -2) return deltaY;
  const boosted = deltaY * MAC_HERO_WHEEL_BOOST;
  if (deltaY > 0) {
    // Do not fling past the end of the scene faster than a normal swipe would.
    return Math.max(deltaY, Math.min(boosted, remainingDown));
  }
  return boosted;
}
