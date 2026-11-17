"use client";
import { asset } from "@/lib/asset";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  flySrc,
  sqSrc,
  type KartaMarker,
  type KartaSolution,
} from "@/data/montazh-karta";
import type { KartaState } from "../karta-ui";
import { openDealerProductModal } from "@/app/dealer-product-modal-bridge";
import {
  PROFILE_IDS,
  profileModalAction,
  profilesById,
  type ProfileId,
} from "@/data/profiles-product-modal";
import cu from "./closeup.module.css";

/**
 * Крупный кадр точки по макету Михаила в Figma (Winal, узел 1617:1983).
 * Белое поле. Слева квадратный кадр из комнаты, справа его обрезает дуга маски
 * экрана «Внутренняя отделка объектов». На кадре стеклянные плашки, они чуть следуют за мышью.
 * Справа: надзаголовок (вид крепления), заголовок, описание, вкладки как в каталоге
 * дилерского сайта, плитки вариантов. Плитка меняет кадр слева.
 */

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Картинка с цепочкой запасных адресов: первый, что загрузился. */
function Pic({ srcs, alt, className }: { srcs: (string | null | undefined)[]; alt: string; className?: string }) {
  const list = srcs.filter(Boolean) as string[];
  const [bad, setBad] = useState<Record<string, true>>({});
  const src = list.find((s) => !bad[s]);
  if (!src) return null;
  return (
    <img
      key={src}
      className={className}
      src={src}
      alt={alt}
      draggable={false}
      decoding="async"
      onError={() => setBad((b) => ({ ...b, [src]: true }))}
    />
  );
}

/** Сколько плиток помещается без вкладок; вкладки — только когда вариантов больше (Михаил 29.10). */
const TILES_FIT = 6;

/** Карточка профиля для «Подробнее»: явная у варианта, иначе по первому профилю узла; нет в реестре — ссылки нет. */
const PROFILE_BY_NAME: Record<string, ProfileId> = {
  "L-профиль": "l",
  "L-профиль скрытого крепления": "lh",
  "H-профиль скрытого крепления": "nev",
  "Омега-профиль": "open",
  "H-профиль": "h",
  "Ультратонкий H": "uth",
  "F-профиль": "f",
  "Защитный уголок": "pro",
  "Профиль «Стрела»": "str",
  "Радиус R-5": "r5",
  "Ультратонкий угловой профиль": "ut",
  "Lumen L": "lumen",
  "Lumen Line": "lumen",
};

const profileIdOf = (s: KartaSolution): ProfileId | undefined => s.profile ?? PROFILE_BY_NAME[s.profiles[0] ?? ""];
const hasCard = (s: KartaSolution) => Boolean(s.modal || profileIdOf(s));

/** «Подробнее» открывает модалку профиля (не хаб) или модалку продукта; закрытие возвращает к крупному кадру. */
function openProfileCard(s: KartaSolution, trigger: HTMLElement) {
  if (s.modal) {
    openDealerProductModal(s.modal, trigger, [{ id: s.modal, action: s.modal, title: s.title ?? s.name }]);
    return;
  }
  const id = profileIdOf(s);
  if (!id) return;
  const seq = PROFILE_IDS.map((p) => ({ id: `profile-${p}`, action: profileModalAction(p), title: profilesById[p].name, image: profilesById[p].cardImage }));
  openDealerProductModal(profileModalAction(id), trigger, seq);
}

// Кадр слева: крупный кадр из комнаты → рендер узла варианта (меняется по плитке) → кадр подлёта точки
/**
 * HTML-сцена узла (та же, что в модалке профиля). Анимация сцены запускается классом play на .node:
 * после загрузки и при каждом открытии крупного кадра. Файл сцены с того же домена.
 */
/** Сцена в кадре — только узел с размерами, как в модалке профиля: без полей страницы, своих плашек
 * и мобильной ленты (название и «Подробнее» даёт плашка крупного кадра). */
const SCENE_CSS =
  "html,body{margin:0!important;padding:0!important;background:#3a3b3c!important;overflow:hidden}" +
  ".node{max-width:none!important;margin:0!important}.stage{border-radius:0!important}" +
  ".stack,.below,.bar{display:none!important}";

function NodeScene({ src, active, title }: { src: string; active: boolean; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const play = () => {
    try {
      const doc = ref.current?.contentDocument;
      const node = doc?.querySelector(".node");
      if (!doc || !node) return;
      if (!doc.getElementById("montazh-scene-css")) {
        const st = doc.createElement("style");
        st.id = "montazh-scene-css";
        st.textContent = SCENE_CSS;
        doc.head.appendChild(st);
      }
      // Плоскости размеров (SVG в matrix3d) Chrome растрирует в масштабе подлёта и потом не перерисовывает —
      // линии и подписи рвутся. Пересоздаём слои уже в итоговом размере кадра и запускаем анимацию заново.
      const planes = Array.from(doc.querySelectorAll<SVGElement>("svg.plane"));
      planes.forEach((el) => (el.style.display = "none"));
      node.classList.remove("play");
      void (node as HTMLElement).offsetWidth;
      planes.forEach((el) => (el.style.display = ""));
      node.classList.add("play");
    } catch {
      // кадр ещё не готов — сцена запустится по onLoad
    }
  };
  useEffect(() => {
    if (!active) return;
    // после подлёта: кадр уже в итоговом размере
    const t = window.setTimeout(play, 1100);
    return () => window.clearTimeout(t);
  }, [active]);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    let t = 0;
    let w = el.clientWidth;
    const ro = new ResizeObserver(() => {
      if (Math.abs(el.clientWidth - w) < 2) return;
      w = el.clientWidth;
      window.clearTimeout(t);
      t = window.setTimeout(play, 250);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      window.clearTimeout(t);
    };
  }, []);
  return <iframe ref={ref} src={src} title={title} className={cu.sceneFrame} onLoad={play} tabIndex={-1} />;
}

// Кадр слева без HTML-сцены: картинка сцены узла (Михаил 13.11 — Crystal Base, 14.11 — uzel-01 у «Обрешётка
// или стена»); кадр комнаты — только если у варианта нет картинки узла
const shotSrcs = (m: KartaMarker, s: KartaSolution, _info = false) => [s.images[0]?.src, sqSrc(m, s), flySrc(m)];

/**
 * mobile: тот же крупный кадр на телефоне — поверх страницы на весь экран, кадр сверху, площадка под ним,
 * прокрутка внутри слоя (контент длиннее экрана), без ужатия колонки.
 */
export function CloseUp({ k, mobile = false }: { k: KartaState; mobile?: boolean }) {
  const { card, branch, solution, sel, marker } = k;
  const on = Boolean(sel);
  const frameRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  // 0 — всё помещается; 1 — без свойств; 2 — ещё и без общего вступления; 3 — компактно (плитки по 4, заголовок мельче)
  const [tight, setTight] = useState<0 | 1 | 2 | 3>(0);

  // Плашки чуть следуют за мышью: transform пишем прямо в элемент
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !on || reduceMotion()) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.querySelectorAll<HTMLElement>("[data-depth]").forEach((p) => {
          const f = Number(p.dataset.depth);
          p.style.transform = `translate3d(${(-dx * f).toFixed(1)}px, ${(-dy * f).toFixed(1)}px, 0)`;
        });
      });
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [on]);

  const ready = card && branch && solution && marker;
  const live = branch ? branch.solutions.filter((s) => !s.planned) : [];
  // Вкладки — группы вариантов этой точки; группа без готовых вариантов не показывается
  const allGroups = (branch?.groups ?? []).filter((g) => live.some((s) => s.group === g));
  // Одна группа или всё помещается — без вкладок, все варианты сразу
  const groups = allGroups.length > 1 && live.length > TILES_FIT ? allGroups : [];
  const group = solution?.group ?? groups[0];
  const tiles = live.filter((s) => (groups.length ? s.group === group : true));

  // Колонка без прокрутки: не помещается — убираем свойства (они повторяют плашки на кадре),
  // не помогло — и общее вступление карточки (описание ветки остаётся)
  const solId = solution?.id;
  useLayoutEffect(() => {
    const el = infoRef.current;
    if (!el || mobile) return;                      // телефон: колонка листается, ужимать не нужно
    const over = () => el.scrollHeight > el.clientHeight + 1;
    const fit = () => {
      // Замер по шагам: data-measure="n" показывает колонку так, как на шаге n; берём первый, где всё помещается
      let level: 0 | 1 | 2 | 3 = 3;
      for (const n of [0, 1, 2] as const) {
        el.dataset.measure = String(n);
        if (!over()) {
          level = n;
          break;
        }
      }
      delete el.dataset.measure;
      setTight(level);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    Array.from(el.children).forEach((c) => ro.observe(c));   // плитки дорастают, когда загрузились картинки
    return () => ro.disconnect();
  }, [solId, group, mobile]);

  // При открытии узла докручиваем страницу, чтобы кадр слева и колонка справа целиком были в окне (Михаил 14.11).
  // Меряем по offset* от сцены — они не зависят от анимации подлёта; листаем на минимально нужное расстояние.
  const markerId = marker?.id;
  useEffect(() => {
    if (mobile || !on) return;
    const t = window.setTimeout(() => {
      const frame = frameRef.current;
      const info = infoRef.current;
      const stage = frame?.closest<HTMLElement>("[data-montazh-stage]");
      if (!frame || !info || !stage) return;
      const rel = (el: HTMLElement) => {
        let y = 0;
        let e: HTMLElement | null = el;
        while (e && e !== stage) {
          y += e.offsetTop;
          e = e.offsetParent as HTMLElement | null;
          if (e && !stage.contains(e)) return null;
        }
        return y;
      };
      const ft = rel(frame);
      const it = rel(info);
      if (ft === null || it === null) return;
      const s = stage.getBoundingClientRect().top;
      const top = s + Math.min(ft, it);
      const bottom = s + Math.max(ft + frame.offsetHeight, it + info.offsetHeight);
      const header = (document.querySelector("header")?.getBoundingClientRect().bottom ?? 0) + 16;
      const gap = 24;
      let dy = 0;
      if (bottom > window.innerHeight - gap) dy = bottom - (window.innerHeight - gap);
      if (top - dy < header) dy = top - header;     // выше не уводим: верх кадра под шапкой важнее низа
      if (Math.abs(dy) > 2) window.scrollBy({ top: dy, behavior: reduceMotion() ? "auto" : "smooth" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [mobile, on, markerId]);

  // Телефон: пока открыт крупный кадр, страница под ним не листается
  useEffect(() => {
    if (!mobile || !on) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [mobile, on]);

  return (
    <div
      className={`${cu.root} ${on ? cu.on : ""} ${mobile ? cu.mobile : ""}`}
      data-montazh-closeup=""
      aria-hidden={!on}
      {...(mobile ? { "data-lenis-prevent": true, role: "dialog", "aria-modal": on || undefined, "aria-label": card?.title } : {})}
    >
      <div className={cu.bg} aria-hidden="true" />
      <div className={cu.layout} data-montazh-layout="">
        <div ref={frameRef} className={cu.frame} data-montazh-frame="">
          {/* Узел (HTML-сцена или картинка сцены) — квадрат без дуги; дуга — только у кадра комнаты */}
          <div className={`${cu.shot} ${ready && (solution.scene || solution.images[0]) ? cu.shotScene : ""}`}>
            {ready
              ? live.map((s) => (
                  <Pic
                    key={`${marker.id}-${s.id}`}
                    className={`${cu.shotImg} ${s.id === solution.id ? cu.shotImgOn : ""}`}
                    srcs={shotSrcs(marker, s, Boolean(branch.info))}
                    alt={s.id === solution.id ? `${card.title}: ${s.name}` : ""}
                  />
                ))
              : null}
            {/* Слева — сцена узла, кадр комнаты остаётся под ней запасным (Михаил 13.11) */}
            {ready && solution.scene ? (
              <NodeScene key={solution.scene} src={solution.scene} active={on} title={`Сцена узла: ${solution.title ?? solution.name}`} />
            ) : null}
          </div>
          {ready && !solution.scene ? (
            <div key={solution.id} className={cu.plaques} data-montazh-plaques="">
              {(solution.plaques ?? []).slice(0, 5).map((p, i) => (
                <span
                  key={p.t}
                  className={cu.plaque}
                  style={{ left: `${p.x}%`, top: `${p.y}%`, ["--i" as string]: i }}
                >
                  <span className={cu.plaqueGlass} data-depth={8 + i * 5}>
                    <span className={cu.plaqueIn}>
                      <span className={cu.plaqueIcon} aria-hidden="true">
                        <img src={asset(`/images/tech/icons/${p.icon ?? "ugol-v-cvet"}.svg`)} alt="" width={20} height={20} />
                      </span>
                      <span className={cu.plaqueText}>
                        <b>{p.t}</b>
                        <small>{p.s}</small>
                      </span>
                    </span>
                  </span>
                </span>
              ))}
            </div>
          ) : null}
          {ready && !branch.info && (solution.title || solution.profiles.length) ? (
            <div key={`p-${solution.id}`} className={cu.profileTag}>
              {/* Стеклянная подложка как у плашек: стекло + внутренний слой */}
              <span className={cu.profileTagGlass}>
                <span className={cu.profileTagIn}>
                  <b className={cu.profileTagName} data-montazh-profile-name="">{solution.title ?? solution.profiles.join(" + ")}</b>
                  {hasCard(solution) ? (
                    <button type="button" className={cu.profileTagMore} onClick={(e) => openProfileCard(solution, e.currentTarget)} tabIndex={on ? 0 : -1}>
                      Подробнее →
                    </button>
                  ) : null}
                </span>
              </span>
            </div>
          ) : null}
          {/* Выход в комнату — слева снизу на кадре, чтобы не закрывать название профиля (Михаил 29.10) */}
          <button type="button" className={cu.back} onClick={k.close} tabIndex={on ? 0 : -1}>
            ← Вся комната
          </button>
        </div>

        <div ref={infoRef} className={`${cu.info} ${tight >= 1 ? cu.infoTight : ""} ${tight >= 2 ? cu.infoTighter : ""} ${tight === 3 ? cu.infoCompact : ""}`}>
          {ready ? (
            <>
              <p className={cu.eyebrow}>{branch.heading ? card.title : branch.name}</p>
              <h2 className={cu.title}>{branch.heading ?? card.title}</h2>
              <div className={cu.desc}>
                <p className={cu.intro}>{card.intro}</p>
                {branch.note ? <p>{branch.note}</p> : null}
              </div>

              {groups.length ? (
                <div className={cu.tablist} role="tablist" aria-label="Варианты">
                  {groups.map((g) => {
                    const cur = g === group;
                    return (
                      <button
                        key={g}
                        type="button"
                        role="tab"
                        aria-selected={cur}
                        className={`${cu.tab} ${cur ? cu.tabOn : ""}`}
                        onClick={() => {
                          const first = live.find((s) => s.group === g);
                          if (first) k.setSolution(first.id);
                        }}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {tiles.length > 1 || (tiles.length === 1 && hasCard(tiles[0])) ? (
              <div className={cu.tiles}>
                {tiles.map((s) => {
                  const cur = s.id === solution.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      className={`${cu.tile} ${cur ? cu.tileOn : ""}`}
                      aria-pressed={cur}
                      onClick={() => k.setSolution(s.id)}
                    >
                      <span className={cu.tileIn}>
                        {s.sq || s.images[0] ? (
                          <Pic srcs={[s.images[0]?.src.replace(/\.webp$/, "-640.webp"), s.images[0]?.src, sqSrc(marker, s, 700)]} alt={s.images[0]?.alt ?? `${card.title}: ${s.name}`} className={cu.tileImg} />
                        ) : (
                          <span className={cu.tileEmpty}>Рендер готовится</span>
                        )}
                        <span className={cu.tileName}>{s.name}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
              ) : null}

              <div className={cu.detail} aria-live="polite">
                <p className={cu.text}>{solution.text}</p>
                {solution.compare ? (
                  <table className={cu.compare}>
                    <thead>
                      <tr>
                        <th aria-label="Параметр" />
                        <th scope="col">{solution.compare.cols[0]}</th>
                        <th scope="col">{solution.compare.cols[1]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {solution.compare.rows.map((r) => (
                        <tr key={r.t}>
                          <th scope="row">{r.t}</th>
                          <td>{r.a}</td>
                          <td>{r.b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
                {solution.points?.length ? (
                  <ul className={cu.points}>
                    {solution.points.map((p) => (
                      <li key={p.t}>
                        <b>{p.t}</b>
                        <span>{p.s}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {hasCard(solution) ? (
                  <button type="button" className={cu.more} onClick={(e) => openProfileCard(solution, e.currentTarget)}>
                    Подробнее →
                  </button>
                ) : null}
                {solution.props?.length ? (
                  <ul className={cu.props}>
                    {solution.props.map((p) => (
                      <li key={p.t} className={cu.prop}>
                        <b>{p.t}</b>
                        <span>{p.s}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
