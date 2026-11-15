"use client";

import { useSyncExternalStore } from "react";

/**
 * Desktop-композиция каталога (hover-overlay + wheel-rail) требует и ширины,
 * и настоящего указателя мыши. Всё остальное — планшеты, телефоны, узкие окна —
 * получает compact-композицию с нативной горизонтальной прокруткой карточек.
 */
const CATALOG_DESKTOP_POINTER_QUERY = "(min-width: 1280px) and (hover: hover) and (pointer: fine)";

function matchesDesktopPointer() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return true;
  }

  return window.matchMedia(CATALOG_DESKTOP_POINTER_QUERY).matches;
}

function subscribeToDesktopPointer(onStoreChange: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }

  const query = window.matchMedia(CATALOG_DESKTOP_POINTER_QUERY);
  query.addEventListener("change", onStoreChange);

  return () => {
    query.removeEventListener("change", onStoreChange);
  };
}

/**
 * `enabled` оставляет главную страницу нетронутой: там хук всегда возвращает false,
 * поэтому каталог продолжает рендериться в текущей desktop-композиции.
 * Серверный snapshot — desktop, чтобы разметка при гидратации совпадала.
 */
export function useCatalogCompactLayout(enabled: boolean) {
  const isDesktopPointer = useSyncExternalStore(
    subscribeToDesktopPointer,
    matchesDesktopPointer,
    () => true,
  );

  return enabled && !isDesktopPointer;
}
