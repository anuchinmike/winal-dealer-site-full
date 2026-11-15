"use client";

import { useMemo, useState } from "react";
import { OpenProduct } from "@/app/catalog/catalog-kit";
import type { CatalogModalSequenceItem } from "@/data/dealer-catalog-modal-sequence";
import type { DealerCatalogAction, DealerCatalogTabId } from "@/data/dealer-catalog-products";
import { catalogPageSections, type CatalogPageEntry, type CatalogPageSection } from "@/data/dealer-catalog-page";

type Tile = {
  key: string;
  title: string;
  description: string;
  image: string;
  objectPosition?: string;
  action: DealerCatalogAction;
  sequence: CatalogModalSequenceItem[];
};

type Group = { key: string; title: string; subtitle: string; tiles: Tile[] };

function groupsOf(section: CatalogPageSection): Group[] {
  const families: Group[] = [];
  const singles: Tile[] = [];
  const tileOf = (sectionId: string, entry: Pick<CatalogPageEntry, "id" | "title" | "description" | "image" | "objectPosition" | "action" | "sequence">): Tile => ({
    key: `${sectionId}-${entry.id}`,
    title: entry.title,
    description: entry.description,
    image: entry.image,
    objectPosition: entry.objectPosition,
    action: entry.action,
    sequence: entry.sequence,
  });
  for (const entry of section.entries) {
    if (entry.children.length) {
      families.push({
        key: `${section.id}-${entry.id}`,
        title: entry.title,
        subtitle: entry.description,
        tiles: entry.children.map((child) => tileOf(section.id, child)),
      });
    } else {
      singles.push(tileOf(section.id, entry));
    }
  }
  if (singles.length) {
    families.push({ key: `${section.id}-singles`, title: "Другие продукты раздела", subtitle: "", tiles: singles });
  }
  return families;
}

const ALL_GROUPS = catalogPageSections.map((section) => ({ section, groups: groupsOf(section) }));

function matches(tile: Tile, group: Group, query: string) {
  if (!query) return true;
  const hay = `${tile.title} ${tile.description} ${group.title}`.toLowerCase();
  return query
    .split(/\s+/)
    .filter(Boolean)
    // Rough Russian stemming: drop the ending of longer words so «профиль» finds «профили».
    .every((word) => hay.includes(word.length > 5 ? word.slice(0, word.length - 2) : word));
}

export function CatalogIndex() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<DealerCatalogTabId | "all">("all");
  const q = query.trim().toLowerCase();

  const visible = useMemo(
    () =>
      ALL_GROUPS.filter(({ section }) => active === "all" || section.id === active)
        .map(({ section, groups }) => ({
          section,
          groups: groups
            .map((group) => ({ ...group, tiles: group.tiles.filter((tile) => matches(tile, group, q)) }))
            .filter((group) => group.tiles.length > 0),
        }))
        .filter(({ groups }) => groups.length > 0),
    [active, q],
  );
  const found = visible.reduce((sum, s) => sum + s.groups.reduce((n, g) => n + g.tiles.length, 0), 0);

  const filterButton = (id: DealerCatalogTabId | "all", label: string, count: number, icon?: string) => {
    const on = active === id;
    return (
      <button
        key={id}
        type="button"
        aria-pressed={on}
        onClick={() => setActive(id)}
        className={`flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded px-3 text-left text-sm font-semibold transition-colors lg:w-full ${
          on ? "bg-dealer-brand-primary text-dealer-brand-white" : "text-dealer-text-secondary hover:bg-white/70"
        }`}
      >
        {icon ? <img src={icon} alt="" width={20} height={20} className={`h-5 w-5 ${on ? "brightness-0 invert" : ""}`} /> : null}
        <span>{label}</span>
        <span className={`ml-auto pl-2 ${on ? "text-white/80" : "text-dealer-text-description"}`}>{count}</span>
      </button>
    );
  };
  const total = catalogPageSections.reduce((sum, s) => sum + s.productCount, 0);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
      <aside className="z-20 min-w-0 max-lg:sticky max-lg:top-2 lg:sticky lg:top-6 lg:self-start">
        <div className="dealer-section-glass flex flex-col gap-3 border border-white/40 p-3 backdrop-blur-[20px] lg:p-4">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-dealer-text-muted">Поиск по каталогу</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Например, СМЛ HPL"
              className="h-10 w-full rounded border border-[var(--dealer-border-brand-soft)] bg-dealer-brand-white px-3 text-sm font-medium text-dealer-text-primary outline-none focus-visible:border-dealer-brand-primary"
            />
          </label>
          <div role="group" aria-label="Раздел" className="-mx-3 flex gap-1 overflow-x-auto px-3 lg:mx-0 lg:flex-col lg:px-0">
            {filterButton("all", "Все разделы", total)}
            {catalogPageSections.map((s) => filterButton(s.id, s.label, s.productCount, s.icon))}
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col gap-12">
        <p aria-live="polite" className="text-sm font-medium text-dealer-text-description">
          {q || active !== "all" ? `Найдено: ${found}` : `Всего продуктов: ${total}`}
        </p>

        {visible.length === 0 ? (
          <div className="flex flex-col items-start gap-4 rounded-lg bg-dealer-brand-white p-8" style={{ boxShadow: "var(--dealer-shadow-glass)" }}>
            <p className="text-xl font-semibold text-dealer-text-primary">По запросу «{query}» ничего нет</p>
            <p className="text-sm font-medium text-dealer-text-description">Проверьте написание или посмотрите все разделы. Нужный продукт подберёт менеджер по заявке.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive("all");
              }}
              className="inline-flex h-10 items-center rounded bg-dealer-brand-primary px-6 text-xs font-semibold text-dealer-brand-white"
            >
              Показать весь каталог
            </button>
          </div>
        ) : null}

        {visible.map(({ section, groups }) => (
          <section key={section.id} id={section.anchor} aria-labelledby={`${section.anchor}-title`} className="flex scroll-mt-24 flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h2 id={`${section.anchor}-title`} className="text-[28px] font-semibold leading-[1.15] text-dealer-text-primary md:text-[40px] md:leading-[1.1]">
                {section.label}
              </h2>
              <p className="max-w-[760px] text-base font-medium leading-6 text-dealer-text-description">{section.intro}</p>
            </div>
            {groups.map((group) => (
              <div key={group.key} className="flex flex-col gap-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-dealer-brand-decoration pb-3">
                  <h3 className="text-xl font-semibold leading-6 text-dealer-text-primary">{group.title}</h3>
                  {group.subtitle ? <p className="max-w-[560px] text-sm font-medium leading-5 text-dealer-text-description">{group.subtitle}</p> : null}
                </div>
                <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
                  {group.tiles.map((tile) => (
                    <li key={tile.key}>
                      <OpenProduct
                        action={tile.action}
                        sequence={tile.sequence}
                        className="group flex h-full w-full flex-col overflow-hidden rounded-lg bg-dealer-brand-white text-left transition-shadow hover:shadow-[0_8px_40px_rgba(1,88,171,0.14)]"
                      >
                        <span className="block aspect-[4/3] w-full overflow-hidden bg-dealer-brand-decoration">
                          <img
                            src={tile.image}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            style={tile.objectPosition ? { objectPosition: tile.objectPosition } : undefined}
                          />
                        </span>
                        <span className="flex flex-1 flex-col gap-1 p-3 md:p-4">
                          <span className="text-sm font-semibold leading-5 text-dealer-text-primary md:text-base">{tile.title}</span>
                          <span className="line-clamp-2 text-xs font-medium leading-4 text-dealer-text-description md:text-sm md:leading-5">{tile.description}</span>
                        </span>
                      </OpenProduct>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
