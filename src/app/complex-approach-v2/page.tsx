import type { Metadata } from "next";
import { ComplexApproachPreview } from "./preview";

export const metadata: Metadata = {
  title: "Комплексный подход — варианты карточек WINAL",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ComplexApproachPreview />;
}
