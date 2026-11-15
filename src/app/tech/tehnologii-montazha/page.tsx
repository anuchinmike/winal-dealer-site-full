import type { Metadata } from "next";
import { montazhPoints } from "@/data/tech-tehnologii-montazha";
import { DepthScene } from "./depth-scene";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Технологии монтажа — анимация точек Lumen",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.head}>
          <p className={styles.eyebrow}>
            Техстраница · экран «Технологии монтажа»
          </p>
          <h1 className={styles.title}>Анимация точек Lumen</h1>
          <p className={styles.lead}>
            Точки светятся тёплым светом, как Lumen Line в комнате. Кадр слегка
            наклоняется за курсором, ближние узлы смещаются сильнее дальних.
            Наведите или нажмите на точку, чтобы увидеть узел.
          </p>
        </header>
        <DepthScene points={montazhPoints} />
      </div>
    </main>
  );
}
