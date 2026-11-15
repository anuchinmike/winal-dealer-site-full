import type { Metadata } from "next";
import { ModalsLabIndex } from "@/app/modals-lab-index";

export const metadata: Metadata = {
  title: "WINAL™ — lab-модалки",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

/**
 * /modals — изолированный маршрут для ревью lab-модалок текущей очереди.
 * Не встраивается в лендинг и каталог.
 */
export default function ModalsLabPage() {
  return <ModalsLabIndex />;
}
