import { ScreenShell } from "./tech/montazh-panelej/screen-shell";
import { MontazhRoom } from "./montazh-room";

export function MontazhSection() {
  // id="montazh": target of the «Монтаж» link in the site header.
  return (
    <div id="montazh" className="w-full scroll-mt-32">
      <ScreenShell variant="maska" embedded>
        <MontazhRoom />
      </ScreenShell>
    </div>
  );
}
