import type { Metadata, Viewport } from "next";
import "./globals.css";
import { dealerConfig } from "@/lib/dealer-config";
import { SmoothScroll } from "@/app/smooth-scroll";

export const metadata: Metadata = {
  title: `${dealerConfig.partnerName} — дилерский лендинг WINAL`,
  description:
    "MVP дилерского лендинга WINAL: панели, акустика, индивидуальные поверхности и объектная комплектация.",
};

// Phone browser chrome takes the colour of the page top (the white app bar).
export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
