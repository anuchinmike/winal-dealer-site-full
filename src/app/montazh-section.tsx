import { ScreenShell } from "./tech/montazh-panelej/screen-shell";
import { MontazhRoom } from "./montazh-room";

export function MontazhSection() {
  return (
    <ScreenShell variant="maska" embedded>
      <MontazhRoom />
    </ScreenShell>
  );
}
