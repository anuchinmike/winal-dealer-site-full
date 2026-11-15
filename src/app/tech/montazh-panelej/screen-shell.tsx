import type { ReactNode } from "react";
import type { MontazhVariantSlug } from "@/data/montazh-panelej";
import { kartaCards, kartaMarkers, kartaSolutionCount } from "@/data/montazh-karta";
import styles from "./montazh.module.css";
import fit from "./montazh-viewport.module.css";

type Props = {
  variant: MontazhVariantSlug;
  children: ReactNode;
  embedded?: boolean;
};

/** Общая рамка экрана: стеклянная панель дилерского сайта, заголовок и вводный абзац. Переключатель вариантов убран 27.10 по просьбе Михаила. */
export function ScreenShell({ variant, children, embedded = false }: Props) {
  const karta = variant === "priblizhenie" || variant === "panorama" || variant === "maska";
  const solutions = kartaCards.reduce((n, c) => n + kartaSolutionCount(c), 0);
  const mask = variant === "maska";
  const Wrapper = embedded ? "div" : "main";
  const Heading = embedded ? "h2" : "h1";
  return (
    <Wrapper className={`${styles.page} ${embedded ? styles.embedded : ""} ${mask && embedded ? fit.viewport : ""}`}>
      <section id="montazh" className={`dealer-section-glass ${styles.panel} ${fit.panel}`} aria-labelledby="montazh-title">
        <div className={`${styles.inner} ${fit.inner}`}>
          <header className={styles.top}>
            <div className={`${styles.headText} ${fit.header}`}>
              {!mask && <p className={styles.eyebrow}>Технологии монтажа</p>}
              <Heading id="montazh-title" className={`dealer-section-title ${styles.h1} ${fit.heading}`}>
                {mask ? "Как устроен монтаж панелей WINAL" : "Монтаж панелей WINAL"}
              </Heading>
              <p className={`dealer-section-lead ${styles.lead}`}>
                {mask ? (
                  <>Рассмотрите крепление панелей, стыки, углы и примыкания в одной комнате.
                  Сравните открытые и скрытые решения для вашего проекта.</>
                ) : karta ? (
                  <>
                    Одна комната, {kartaMarkers.length} точек и {solutions}{" "}
                    решений: крепление и стыки панелей, углы, пол, потолок,
                    световой профиль и дверь. Всё собрано на профилях WINAL по
                    АТР, насухо, без клея.
                  </>
                ) : (
                  <>
                    Одна комната, десять узлов. Стены открытого и скрытого
                    крепления, колонна, дверь Invisible, акустика Wisound,
                    потолок и перегородка WallPro: всё собрано на профилях WINAL
                    по АТР, насухо, без клея.
                  </>
                )}
              </p>
            </div>
          </header>

          {mask && embedded ? <div className={fit.body}>{children}</div> : children}
          {mask && (
            <div className={`${styles.projectAction} ${fit.action}`}>
              <p>Подберём крепление и узлы примыканий для вашего объекта.</p>
              <a href={embedded ? "#project-form" : "/#project-form"} className={styles.cta}>
                Обсудить монтаж
              </a>
            </div>
          )}
        </div>
      </section>
    </Wrapper>
  );
}
