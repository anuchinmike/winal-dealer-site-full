"use client";

import Image from "next/image";
import { type MouseEvent, useEffect } from "react";
import { useLenis } from "lenis/react";
import { dealerMotionColors } from "./dealer-motion";
import styles from "./complex-approach-section.module.css";

const IMAGE_ROOT = "/images/complex-approach-v1/";

const solutions = [
  { id: "wall", title: "Стеновые панели", text: "Декоративная отделка стен в цветах и фактурах вашего проекта.", tab: "wall" },
  { id: "ceiling", title: "Потолочные решения", text: "Панели и подвесные акустические острова для отделки потолка.", tab: "ceiling" },
  { id: "acoustic", title: "Акустические панели", text: "Перфорированные панели для комфортной звуковой среды.", tab: "acoustic" },
  { id: "doors", title: "Двери Invisible", text: "Скрытый короб и отделка полотна под интерьер.", tab: "system" },
  { id: "profiles", title: "Монтажные профили", text: "Крепление панелей и оформление стыков, углов и примыканий.", tab: "system" },
  { id: "plinths", title: "Плинтусы", text: "Аккуратное завершение отделки на стыке стены и пола.", tab: "system" },
  { id: "radiators", title: "Экраны радиаторов", text: "Решётки и короба для оформления зоны отопления.", tab: "system" },
  { id: "hatches", title: "Ревизионные люки", text: "Доступ к коммуникациям с отделкой дверцы под интерьер.", tab: "system" },
] as const;

function repeatCatalogNavigation(event: MouseEvent<HTMLAnchorElement>) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (window.location.hash === event.currentTarget.hash) {
    event.preventDefault();
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

export function ComplexApproachSection({ cardsVariant = "original", catalogBase = "" }: { cardsVariant?: "original" | "studio" | "cutout"; catalogBase?: string }) {
  const portrait = cardsVariant !== "original";
  const lenis = useLenis();

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
        <p className={["dealer-section-lead", styles.lead].join(" ")}>
          Подберём стеновые и потолочные панели, акустику, двери и комплектующие WINAL для вашего проекта.
        </p>
      </header>

      <figure className={styles.scene}>
        <Image
          src={IMAGE_ROOT + "hero.webp"}
          alt="Лобби бизнес-центра со стеновыми и потолочными панелями WINAL, акустическими островами, скрытой дверью и экранами радиаторов"
          width={1860}
          height={846}
          sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1472px) calc(100vw - 96px), 1376px"
          className={styles.sceneImage}
        />
      </figure>

      <div className={[styles.solutions, portrait ? styles.portraitSolutions : ""].join(" ")}>
        {solutions.map((solution) => (
          <a
            key={solution.id}
            href={catalogBase + "#catalog-" + solution.tab}
            onClick={repeatCatalogNavigation}
            className={[styles.card, portrait ? styles.portraitCard : "", dealerMotionColors].join(" ")}
          >
            <div className={styles.cardInner}>
              <div className={styles.visual}>
                <Image
                  src={portrait ? "/images/complex-approach-v2/" + solution.id + "-" + cardsVariant + ".webp" : IMAGE_ROOT + solution.id + ".webp"}
                  alt=""
                  unoptimized
                  width={portrait ? 720 : 800}
                  height={portrait ? 960 : 520}
                  sizes={portrait ? "(max-width: 639px) 42vw, 220px" : "(max-width: 479px) calc(100vw - 64px), (max-width: 1023px) calc(50vw - 48px), 320px"}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.cardCopy}>
                <div className={styles.cardHeading}>
                  <h3>{solution.title}</h3>
                  <Image src="/images/home/arrow-blue.svg" alt="" width={12} height={10} />
                </div>
                <p>{solution.text}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className={styles.action}>
        <p>Расскажите об объекте — обсудим подходящие материалы и комплектующие.</p>
        <a href={catalogBase + "#project-form"} className={["dealer-btn-primary", styles.button].join(" ")}>
          Подобрать комплектацию
          <Image src="/images/home/arrow-white.svg" alt="" width={12} height={10} />
        </a>
      </div>
    </section>
  );
}
