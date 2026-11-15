import type { Metadata } from "next";
import Link from "next/link";
import { ComplexApproachInterior } from "./interior-section";
import styles from "./interior.module.css";

export const metadata: Metadata = {
  title: "Комплексный подход — вариант A, интерьер с точками",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className={styles.page}>
      <nav className={styles.toolbar} aria-label="Сравнение вариантов">
        <Link href="/#complex-approach" className={styles.back}>На главной</Link>
        <span className={styles.toolbarNote}>Вариант A — интерьер с точками</span>
      </nav>
      <ComplexApproachInterior catalogBase="/" />
    </main>
  );
}
