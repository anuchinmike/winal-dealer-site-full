export type SoundcoreTexture = {
  name: string;
  caption: string;
  thumb: string;
  panel: string;
  macro: string;
};

const BASE = "/images/product-modal/soundcore-textures";

export const soundcoreTextureMacroCaption = "крупный план";

export const soundcoreTextures = [
  { name: "S", caption: "волокно 1 мм", thumb: `${BASE}/soundcore-s-thumb.webp`, panel: `${BASE}/soundcore-s-panel.webp`, macro: `${BASE}/soundcore-s-macro.webp` },
  { name: "M", caption: "волокно 1,5 мм", thumb: `${BASE}/soundcore-m-thumb.webp`, panel: `${BASE}/soundcore-m-panel.webp`, macro: `${BASE}/soundcore-m-macro.webp` },
  { name: "L", caption: "волокно 2 мм", thumb: `${BASE}/soundcore-l-thumb.webp`, panel: `${BASE}/soundcore-l-panel.webp`, macro: `${BASE}/soundcore-l-macro.webp` },
] as const satisfies readonly SoundcoreTexture[];
