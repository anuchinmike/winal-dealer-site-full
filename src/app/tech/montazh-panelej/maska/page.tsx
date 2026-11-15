import type { Metadata } from "next";
import { ScreenShell } from "../screen-shell";
import { MaskaScreen } from "./maska-screen";

export const metadata: Metadata = {
  title: "Монтаж панелей WINAL — вариант «Маска»",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return (
    <ScreenShell variant="maska">
      <MaskaScreen />
    </ScreenShell>
  );
}
