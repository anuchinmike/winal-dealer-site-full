"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { OpenProduct } from "@/app/catalog/catalog-kit";
import type { CatalogModalSequenceItem } from "@/data/dealer-catalog-modal-sequence";
import type { DealerCatalogAction } from "@/data/dealer-catalog-products";
import { catalogPageSections, type CatalogPageEntry } from "@/data/dealer-catalog-page";

// Catalogue page: sticky bar with section anchors and product search; sections with a sticky
// intro on the left and family cards on the right. A query switches to a flat result grid.

type SearchItem = {
  key: string;
  title: string;
  description: string;
  image: string;
  family?: string;
  sections: string[];
  action: DealerCatalogAction;
  sequence: CatalogModalSequenceItem[];
  hay: string;
};

/** One item per product; a product listed in several sections is shown once. */
const SEARCH_INDEX: SearchItem[] = (() => {
  const byAction = new Map<string, SearchItem>();
  for (const section of catalogPageSections) {
    for (const entry of section.entries) {
      const items = entry.children.length
        ? entry.children.map((child) => ({ ...child, family: entry.title }))
        : [{ ...entry, family: undefined as string | undefined }];
      for (const item of items) {
        const existing = byAction.get(item.action);
        if (existing) {
          if (!existing.sections.includes(section.label)) existing.sections.push(section.label);
          continue;
        }
        byAction.set(item.action, {
          key: item.id,
          title: item.title,
          description: item.description,
          image: item.image,
          family: item.family,
          sections: [section.label],
          action: item.action,
          sequence: item.sequence,
          hay: `${item.title} ${item.description} ${item.family ?? ""} ${section.label}`.toLowerCase().replaceAll("ё", "е"),
        });
      }
    }
  }
  return [...byAction.values()];
})();

const TOTAL = SEARCH_INDEX.length;

/** Every word must match; longer words lose their ending so «профиль» finds «профили». */
function search(query: string): SearchItem[] {
  const words = query.toLowerCase().replaceAll("ё", "е").split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const stems = words.map((word) => (word.length > 5 ? word.slice(0, word.length - 2) : word));
  return SEARCH_INDEX.filter((item) => stems.every((stem) => item.hay.includes(stem)));
}

const EXAMPLES = ["СМЛ HPL", "акустика", "дверь", "плинтус", "потолок"];

export function CatalogView() {
  const [query, setQuery] = useState("");

  // Keep the query in ?q= so a search can be shared or restored with Back.
  useEffect(() => {
    const read = () => setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);
  const update = (next: string) => {
    setQuery(next);
    const url = new URL(window.location.href);
    if (next.trim()) url.searchParams.set("q", next);
    else url.searchParams.delete("q");
    window.history.replaceState(window.history.state, "", url);
  };

  const q = query.trim();
  const results = useMemo(() => search(q), [q]);

  return (
    <>
      <div className="sticky top-2 z-30 flex flex-col gap-2 rounded-lg bg-white/70 p-2 backdrop-blur-[20px] lg:flex-row lg:items-center" style={{ boxShadow: "var(--dealer-shadow-glass)" }}>
        <label className="relative flex min-w-0 items-center lg:order-2 lg:ml-auto lg:w-[320px] lg:shrink-0">
          <span className="sr-only">Поиск по каталогу</span>
          <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute left-3 h-4 w-4 text-dealer-text-muted" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="9" cy="9" r="6" />
            <path d="m14 14 4 4" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => update(event.target.value)}
            placeholder="Поиск: СМЛ HPL, дверь, плинтус"
            className="h-10 w-full rounded border border-[var(--dealer-border-brand-soft)] bg-dealer-brand-white pl-9 pr-3 text-sm font-medium text-dealer-text-primary outline-none placeholder:text-dealer-text-description focus-visible:border-dealer-brand-primary"
          />
        </label>
        {/* Below lg all four sections are visible at once (2×2 on phones, one row from sm) instead of a
            sideways strip where only the first one and a half fitted (Mikhail, 20.11). */}
        <nav aria-label="Разделы каталога" className="min-w-0 lg:order-1">
          <ul className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:flex lg:w-max">
            {catalogPageSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.anchor}`}
                  onClick={(event) => {
                    if (!q) return;
                    // Sections are hidden while searching: clear the query, then scroll once they render.
                    event.preventDefault();
                    update("");
                    requestAnimationFrame(() => document.getElementById(section.anchor)?.scrollIntoView());
                  }}
                  className="flex h-10 items-center gap-2 whitespace-nowrap rounded bg-dealer-brand-white px-3 text-sm font-semibold text-dealer-text-secondary lg:bg-transparent transition-colors hover:bg-dealer-brand-primary/10 hover:text-dealer-brand-primary"
                >
                  <img src={section.icon} alt="" width={20} height={20} className="h-5 w-5" />
                  <span className="lg:hidden">{section.label.split(" ")[0]}</span>
                  <span className="hidden lg:inline">{section.label}</span>
                  <span className="ml-auto text-dealer-text-description lg:ml-0">{section.productCount}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {q ? <SearchResults query={q} results={results} onReset={() => update("")} onPick={update} /> : <Sections />}
    </>
  );
}

function SearchResults({ query, results, onReset, onPick }: { query: string; results: SearchItem[]; onReset: () => void; onPick: (q: string) => void }) {
  return (
    <section aria-label="Результаты поиска" className="flex flex-col gap-6 pt-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p aria-live="polite" className="text-xl font-semibold text-dealer-text-primary">
          {results.length ? `Найдено ${results.length} из ${TOTAL}` : `По запросу «${query}» ничего нет`}
        </p>
        <button type="button" onClick={onReset} className="text-sm font-semibold text-dealer-brand-primary transition-opacity hover:opacity-80">
          Показать весь каталог
        </button>
      </div>
      {results.length ? (
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 xl:grid-cols-4">
          {results.map((item) => (
            <li key={item.key}>
              <OpenProduct
                action={item.action}
                sequence={item.sequence}
                catalogId={item.key}
                className="group flex h-full w-full flex-col overflow-hidden rounded-lg bg-dealer-brand-white text-left transition-shadow hover:shadow-[0_8px_40px_rgba(1,88,171,0.14)]"
              >
                <span className="block aspect-[4/3] w-full overflow-hidden bg-dealer-brand-decoration">
                  <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </span>
                <span className="flex flex-1 flex-col gap-1 p-3 md:p-4">
                  <span className="text-xs font-semibold text-dealer-text-muted">{item.family ?? item.sections.join(" · ")}</span>
                  <span className="text-sm font-semibold leading-5 text-dealer-text-primary md:text-base">{item.title}</span>
                  <span className="line-clamp-2 text-xs font-medium leading-4 text-dealer-text-description md:text-sm md:leading-5">{item.description}</span>
                </span>
              </OpenProduct>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-lg bg-dealer-brand-white p-6 md:p-8" style={{ boxShadow: "var(--dealer-shadow-glass)" }}>
          <p className="text-sm font-medium text-dealer-text-description">Проверьте написание или попробуйте другой запрос. Если нужного продукта нет в каталоге, менеджер подберёт решение по заявке.</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => onPick(example)}
                className="inline-flex min-h-8 items-center rounded border border-[var(--dealer-border-brand-soft)] px-3 text-xs font-semibold text-dealer-brand-primary transition-colors hover:bg-dealer-brand-primary hover:text-dealer-brand-white"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Sections() {
  return (
    <>
      {catalogPageSections.map((section) => (
        <section
          key={section.id}
          id={section.anchor}
          aria-labelledby={`${section.anchor}-title`}
          className="grid scroll-mt-24 gap-6 border-t border-dealer-brand-decoration pt-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-10"
        >
          <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-3">
              <img src={section.icon} alt="" width={32} height={32} className="h-8 w-8" />
              <span className="text-sm font-semibold text-dealer-brand-primary">
                {section.label} · {section.productCount}
              </span>
            </div>
            <h2 id={`${section.anchor}-title`} className="text-[28px] font-semibold leading-[1.15] text-dealer-text-primary md:text-[32px]">
              {section.title}
            </h2>
            <p className="text-base font-medium leading-6 text-dealer-text-description">{section.intro}</p>
            <Link href={`/catalog/${section.id}`} className="text-sm font-semibold text-dealer-brand-primary transition-opacity hover:opacity-80">
              Открыть раздел →
            </Link>
            <ul className="grid grid-cols-2 gap-3">
              {section.features.map((feature) => (
                <li key={feature.label} className="flex items-center gap-2 rounded-lg bg-dealer-brand-white p-3 text-xs font-semibold leading-4 text-dealer-text-secondary" style={{ boxShadow: "var(--dealer-shadow-video)" }}>
                  <img src={feature.icon} alt="" width={24} height={24} className="h-6 w-6 shrink-0" />
                  {feature.label}
                </li>
              ))}
            </ul>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2">
            {section.entries.map((entry) => (
              <li key={entry.id}>
                <FamilyCard entry={entry} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

function FamilyCard({ entry }: { entry: CatalogPageEntry }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg bg-dealer-brand-white" style={{ boxShadow: "var(--dealer-shadow-glass)" }}>
      <OpenProduct action={entry.action} sequence={entry.sequence} catalogId={entry.id} className="group block aspect-[4/3] w-full overflow-hidden bg-dealer-brand-decoration" aria-label={`Открыть ${entry.title}`}>
        <img src={entry.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </OpenProduct>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-xs font-semibold text-dealer-text-muted">{entry.contextTitle}</span>
        <h3 className="text-xl font-semibold leading-6 text-dealer-text-primary">{entry.title}</h3>
        <p className="text-sm font-medium leading-5 text-dealer-text-description">{entry.description}</p>
        {entry.children.length > 0 ? (
          <ul className="flex flex-wrap gap-2 pt-1">
            {entry.children.map((child) => (
              <li key={child.id}>
                <OpenProduct
                  action={child.action}
                  sequence={child.sequence}
                  catalogId={child.id}
                  className="inline-flex min-h-8 items-center rounded border border-[var(--dealer-border-brand-soft)] px-3 text-xs font-semibold text-dealer-brand-primary transition-colors hover:bg-dealer-brand-primary hover:text-dealer-brand-white"
                >
                  {child.shortTitle}
                </OpenProduct>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto pt-2">
          <OpenProduct
            action={entry.action}
            sequence={entry.sequence}
            catalogId={entry.id}
            className="inline-flex h-10 items-center rounded bg-dealer-brand-primary px-6 text-xs font-semibold text-dealer-brand-white transition-opacity hover:opacity-90"
          >
            {entry.children.length > 0 ? `Смотреть серию · ${entry.children.length}` : "Подробнее"}
          </OpenProduct>
        </div>
      </div>
    </article>
  );
}
