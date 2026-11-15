"use client";

import Image from "next/image";
import { type CSSProperties, type MouseEvent, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import styles from "./interior.module.css";

// Тексты и вкладки каталога — как в complex-approach-section.tsx.
const solutions = [
  { id: "wall", title: "Стеновые панели", text: "Декоративная отделка стен в цветах и фактурах вашего проекта.", tab: "wall", spot: [33, 35] },
  { id: "ceiling", title: "Потолочные решения", text: "Панели и подвесные акустические острова для отделки потолка.", tab: "ceiling", spot: [72, 12.5] },
  { id: "acoustic", title: "Акустические панели", text: "Перфорированные панели для комфортной звуковой среды.", tab: "acoustic", spot: null },
  { id: "doors", title: "Двери Invisible", text: "Скрытый короб и отделка полотна под интерьер.", tab: "system", spot: [55, 59] },
  { id: "profiles", title: "Монтажные профили", text: "Крепление панелей и оформление стыков, углов и примыканий.", tab: "system", spot: [47.4, 30] },
  { id: "plinths", title: "Плинтусы", text: "Аккуратное завершение отделки на стыке стены и пола.", tab: "system", spot: [48, 71.5] },
  { id: "radiators", title: "Экраны радиаторов", text: "Решётки и короба для оформления зоны отопления.", tab: "system", spot: [89, 73] },
  { id: "hatches", title: "Ревизионные люки", text: "Доступ к коммуникациям с отделкой дверцы под интерьер.", tab: "system", spot: null },
] as const;

type SolutionId = (typeof solutions)[number]["id"];

const cutout = (id: string) => "/images/complex-approach-v2/" + id + "-cutout.webp";
const num = (i: number) => String(i + 1).padStart(2, "0");

// Повторный клик по той же вкладке каталога: хэш не меняется, поэтому шлём hashchange сами.
function repeatCatalogNavigation(event: MouseEvent<HTMLAnchorElement>) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (window.location.hash === event.currentTarget.hash) {
    event.preventDefault();
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

// catalogBase: "" на главной (якоря в той же странице), "/" на отдельной странице варианта.
export function ComplexApproachInterior({ catalogBase = "" }: { catalogBase?: string }) {
  const lenis = useLenis();

  // Переход по #complex-approach и #project-form с учётом плавного скролла (как в прежней секции).
  useEffect(() => {
    const openLinkedSection = () => {
      const target = window.location.hash.slice(1);
      if (target !== "complex-approach" && target !== "project-form") return;
      const section = document.getElementById(target);
      if (!section) return;
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(section, { offset: -100, immediate: true });
      } else {
        section.scrollIntoView({ block: "start" });
      }
    };
    const frame = requestAnimationFrame(openLinkedSection);
    window.addEventListener("hashchange", openLinkedSection);
    window.addEventListener("load", openLinkedSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", openLinkedSection);
      window.removeEventListener("load", openLinkedSection);
    };
  }, [lenis]);

  const [active, setActive] = useState<SolutionId>("wall");
  const index = solutions.findIndex((s) => s.id === active);
  const current = solutions[index];

  return (
    <section
      id="complex-approach"
      aria-labelledby="complex-approach-title"
      data-header-density-trigger
      className={["dealer-section-glass", styles.section].join(" ")}
    >
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <p className={styles.eyebrow}>Комплексный подход</p>
          <h2 id="complex-approach-title" className="dealer-section-title">
            От стен и потолка до деталей отделки
          </h2>
        </div>
        <div className={styles.headerAside}>
          <p className="dealer-section-lead">
            Подберём стеновые и потолочные панели, акустику, двери и комплектующие WINAL для вашего проекта. Выберите точку в интерьере, чтобы увидеть решение.
          </p>
          <a href={catalogBase + "#project-form"} className={["dealer-btn-primary", styles.button].join(" ")}>
            Подобрать комплектацию
            <Image src="/images/home/arrow-white.svg" alt="" width={12} height={10} />
          </a>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.scene}>
          <div className={styles.frame}>
            <Image
              src="/images/complex-approach-v1/hero.webp"
              alt="Лобби бизнес-центра со стеновыми и потолочными панелями WINAL, акустическими островами, скрытой дверью и экранами радиаторов"
              width={1860}
              height={846}
              sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 112px), 1060px"
              className={styles.sceneImage}
            />
            {solutions.map((s, i) =>
              s.spot ? (
                <button
                  key={s.id}
                  type="button"
                  className={[styles.hs, s.id === active ? styles.on : ""].join(" ")}
                  style={{ "--x": s.spot[0], "--y": s.spot[1], "--o": i } as CSSProperties}
                  aria-label={s.title}
                  aria-pressed={s.id === active}
                  onClick={() => setActive(s.id)}
                >
                  <span className={styles.glow} aria-hidden />
                  <span className={styles.led} aria-hidden>{num(i)}</span>
                  <span className={styles.ray} aria-hidden />
                  <span className={styles.label} aria-hidden>
                    <b>{num(i)}</b>
                    {s.title}
                  </span>
                </button>
              ) : null,
            )}
          </div>
        </div>

        <aside className={styles.aside}>
          <div className={styles.list} role="group" aria-label="Направления">
            {solutions.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={styles.row}
                aria-pressed={s.id === active}
                onClick={() => setActive(s.id)}
              >
                <b>{num(i)}</b>
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          <div className={styles.detail} aria-live="polite">
            <Image key={current.id} src={cutout(current.id)} alt="" width={720} height={960} unoptimized className={styles.detailImage} />
            <div className={styles.detailCopy}>
              <h3>{current.title}</h3>
              <p>{current.text}</p>
              <a href={catalogBase + "#catalog-" + current.tab} onClick={repeatCatalogNavigation} className={styles.detailLink}>
                Смотреть в каталоге
                <Image src="/images/home/arrow-blue.svg" alt="" width={12} height={10} />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
