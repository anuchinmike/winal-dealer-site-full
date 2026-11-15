import type { Metadata } from "next";
import { montazhNodes } from "@/data/montazh-panelej";
import { ScreenShell } from "../screen-shell";
import { DokScreen } from "./dok-screen";

export const metadata: Metadata = {
  title: "Монтаж панелей WINAL — вариант «Док»",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return (
    <ScreenShell variant="dok">
      <DokScreen nodes={montazhNodes} />
    </ScreenShell>
  );
}
