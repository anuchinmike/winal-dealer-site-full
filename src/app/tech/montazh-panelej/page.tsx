import type { Metadata } from "next";
import Link from "next/link";
import { montazhVariants } from "@/data/montazh-panelej";
import styles from "./montazh.module.css";

export const metadata: Metadata = {
  title: "Монтаж панелей WINAL — три варианта экрана",
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return (
    <main className={styles.page}>
      <section className={styles.panel}>
        <div className={styles.inner}>
          <header className={styles.headText}>
            <p className={styles.eyebrow}>Техстраница</p>
            <h1 className={styles.h1}>
              Монтаж панелей WINAL: три варианта экрана
            </h1>
            <p className={styles.lead}>
              Одна комната и десять узлов, три механики показа. Каждый вариант
              на отдельной странице, чтобы оценить его целиком: десктоп, планшет
              и телефон.
            </p>
          </header>
          <div
            className={styles.facts}
            style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
          >
            {montazhVariants.map((v, i) => (
              <Link
                key={v.slug}
                href={`/tech/montazh-panelej/${v.slug}`}
                className={styles.fact}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <b>
                  {i + 1}. {v.name}
                </b>
                <span>{v.mechanic}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
