import type { Metadata } from "next";
import { ScreenShell } from "../screen-shell";
import { ZoomScreen } from "../priblizhenie/zoom-screen";

export const metadata: Metadata = {
  title: "Монтаж панелей WINAL — вариант «Панорама»",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return (
    <ScreenShell variant="panorama">
      <ZoomScreen mobileMode="panorama" />
    </ScreenShell>
  );
}
