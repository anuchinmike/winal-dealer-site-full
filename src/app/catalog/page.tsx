import type { Metadata } from "next";
import { CatalogSection } from "@/app/catalog-section";

export const metadata: Metadata = {
  title: "Каталог WINAL — поверхность адаптации",
  // Оценочная DEV-поверхность: из индекса исключаем и на уровне маршрута, а не только на хосте.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

/**
 * /catalog — изолированный маршрут с тем же блоком каталога, что и на главной.
 * Данные, модалки и motion берутся из существующих источников; отличается только
 * композиция на планшетах и телефонах (см. `[data-catalog-lab]` в globals.css).
 */
export default function CatalogLabPage() {
  return (
    <main data-catalog-lab className="catalog-lab-page">
      <h1 className="sr-only">Каталог WINAL</h1>
      <CatalogSection variant="lab" />
    </main>
  );
}
