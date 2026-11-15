"use client";

import { useState } from "react";
import Link from "next/link";
import { ComplexApproachSection } from "@/app/complex-approach-section";
import styles from "./preview.module.css";

export function ComplexApproachPreview() {
  const [mode, setMode] = useState<"studio" | "cutout">("cutout");

  return (
    <main className={styles.page}>
      <nav className={styles.toolbar} aria-label="Сравнение карточек">
        <Link href="/#complex-approach" className={styles.back}>Текущий вариант</Link>
        <div className={styles.modes} role="group" aria-label="Фон предметных изображений">
          <button type="button" aria-pressed={mode === "studio"} onClick={() => setMode("studio")}>С фоном</button>
          <button type="button" aria-pressed={mode === "cutout"} onClick={() => setMode("cutout")}>Без фона</button>
        </div>
      </nav>
      <ComplexApproachSection cardsVariant={mode} catalogBase="/" />
    </main>
  );
}
