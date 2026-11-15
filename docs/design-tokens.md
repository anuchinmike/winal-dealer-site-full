# WINAL Dealer MVP Tokens

Источник: Figma node `541:781` + MVP-решения по dealer landing.

## Foundation

- Container: `1376px`
- Section gap: `clamp(5rem, 9vw, 10rem)`
- Brand blue: `#0158ab`
- Brand blue strong: `#01488c`
- Text primary: `#000912`
- Text secondary: `#30425a`
- Text muted: `#6d7b8c`
- Surface glass: `rgba(255, 255, 255, 0.74)`
- Surface strong: `rgba(255, 255, 255, 0.9)`
- Border soft: `rgba(255, 255, 255, 0.58)`
- Border brand tint: `rgba(1, 88, 171, 0.16)`
- Panel radius: `28px`
- Card radius: `22px`

## Semantic

- Hero / section surfaces use soft glass panels with blur and long shadow.
- Primary action uses solid brand blue.
- Secondary action uses white surface + blue border.
- Dealer-specific data is isolated in `src/lib/dealer-config.ts`.

## Engineering choices

- Figma uses `Gilroy`; MVP uses system sans stack (`Inter, Arial, Helvetica, sans-serif`) until licensed/local font files are provided.
- Motion is intentionally deferred; no runtime animation layer is used in the first pass.
- Only raster content from node `541:781` was converted to WebP; icons and simple vectors are recreated in code or kept textual.
