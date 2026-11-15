import type { Metadata } from "next";
import { montazhNodes } from "@/data/montazh-panelej";
import { ScreenShell } from "../screen-shell";
import { LentaScreen } from "./lenta-screen";

export const metadata: Metadata = {
  title: "Монтаж панелей WINAL — вариант «Лента»",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return (
    <ScreenShell variant="lenta">
      <LentaScreen nodes={montazhNodes} />
    </ScreenShell>
  );
}
