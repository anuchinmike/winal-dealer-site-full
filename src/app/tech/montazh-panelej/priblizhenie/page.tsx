import type { Metadata } from "next";
import { ScreenShell } from "../screen-shell";
import { ZoomScreen } from "./zoom-screen";

export const metadata: Metadata = {
  title: "Монтаж панелей WINAL — вариант «Приближение»",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return (
    <ScreenShell variant="priblizhenie">
      <ZoomScreen />
    </ScreenShell>
  );
}
