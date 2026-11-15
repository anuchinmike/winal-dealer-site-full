"use client";

import { createContext, useContext, type ReactNode } from "react";

export type CatalogLayoutState = {
  headerCompact: boolean;
  headerExpanded: boolean;
  catalogActive: boolean;
  setHeaderExpanded: (expanded: boolean) => void;
};

const CatalogLayoutContext = createContext<CatalogLayoutState | null>(null);

export function CatalogLayoutProvider({
  value,
  children,
}: {
  value: CatalogLayoutState;
  children: ReactNode;
}) {
  return <CatalogLayoutContext.Provider value={value}>{children}</CatalogLayoutContext.Provider>;
}

export function useCatalogLayout() {
  return useContext(CatalogLayoutContext);
}
