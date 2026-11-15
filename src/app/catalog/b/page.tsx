import type { Metadata } from "next";
import { InnerPage } from "@/app/site-chrome";
import { CatalogModalsHost, CatalogVariantSwitcher, OpenProduct } from "@/app/catalog/catalog-kit";
import { CATALOG_CRUMBS, SectionChips } from "@/app/catalog/catalog-shared";
import { CATALOG_PAGE_LEAD, CATALOG_PAGE_TITLE, catalogPageSections, type CatalogPageEntry } from "@/data/dealer-catalog-page";
import styles from "./catalog-b.module.css";

export const metadata: Metadata = { title: `${CATALOG_PAGE_TITLE} — вариант B` };

// Variant B: the winal.ru catalogue layout (large photo card per family with a product list
// and a description box, smaller photo cards for single products) in dealer glass and tokens.

type Block = { kind: "large"; entry: CatalogPageEntry } | { kind: "row"; entries: CatalogPageEntry[] };

function nextRowSize(remaining: number) {
  if (remaining === 4 || remaining === 2) return 2;
  return Math.min(3, remaining);
}

/** Families as large cards; single products in rows of 3 or 2 between them. */
function layout(entries: CatalogPageEntry[]): Block[] {
  const families = entries.filter((entry) => entry.children.length > 0);
  const singles = entries.filter((entry) => entry.children.length === 0);
  const blocks: Block[] = [];
  const takeRow = () => {
    const size = nextRowSize(singles.length);
    const row = singles.splice(0, size);
    if (row.length === 1) blocks.push({ kind: "large", entry: row[0] });
    else blocks.push({ kind: "row", entries: row });
  };
  for (const family of families) {
    blocks.push({ kind: "large", entry: family });
    if (singles.length) takeRow();
  }
  while (singles.length) takeRow();
  return blocks;
}

export default function CatalogVariantB() {
  return (
    <InnerPage crumbs={CATALOG_CRUMBS}>
      <header className="flex flex-col gap-4 pt-4">
        <h1 className="dealer-section-title">{CATALOG_PAGE_TITLE}</h1>
        <p className="dealer-section-lead max-w-[720px]">{CATALOG_PAGE_LEAD}</p>
      </header>
      <SectionChips tone="glass" />

      {catalogPageSections.map((section) => (
        <section key={section.id} id={section.anchor} aria-labelledby={`${section.anchor}-title`} className={styles.section}>
          <div className={styles.heading}>
            <div className={styles.headingRow}>
              <img src={section.icon} alt="" width={40} height={40} className={styles.mark} />
              <h2 id={`${section.anchor}-title`} className={styles.h2}>
                {section.label}
              </h2>
            </div>
            <p className="dealer-section-lead">{section.intro}</p>
          </div>

          <div className={styles.rows}>
            {layout(section.entries).map((block) =>
              block.kind === "large" ? (
                <PhotoCard key={block.entry.id} entry={block.entry} size="large" />
              ) : (
                <div key={block.entries.map((e) => e.id).join("+")} className={`${styles.row} ${block.entries.length === 3 ? styles.row3 : styles.row2}`}>
                  {block.entries.map((entry) => (
                    <PhotoCard key={entry.id} entry={entry} size="small" />
                  ))}
                </div>
              ),
            )}
          </div>
        </section>
      ))}

      <CatalogModalsHost />
      <CatalogVariantSwitcher current="b" />
    </InnerPage>
  );
}

function PhotoCard({ entry, size }: { entry: CatalogPageEntry; size: "large" | "small" }) {
  const isFamily = entry.children.length > 0;
  return (
    <article className={`${styles.card} ${size === "large" ? styles.large : styles.small}`}>
      <img
        src={entry.image}
        alt=""
        loading="lazy"
        className={styles.bg}
        style={entry.objectPosition ? { objectPosition: entry.objectPosition } : undefined}
      />
      <OpenProduct action={entry.action} sequence={entry.sequence} className={styles.stretched} aria-label={`Открыть ${entry.title}`}>
        <span className="sr-only">{entry.title}</span>
      </OpenProduct>

      {size === "large" ? <span className={styles.context}>{entry.contextTitle}</span> : null}
      <h3 className={styles.label}>
        <span className={styles.labelMark} aria-hidden />
        {entry.title}
      </h3>

      {isFamily ? (
        <ul className={styles.list}>
          {entry.children.map((child) => (
            <li key={child.id}>
              <OpenProduct action={child.action} sequence={child.sequence} className={`${styles.glass} ${styles.item}`}>
                <img
                  src={child.image}
                  alt=""
                  loading="lazy"
                  className={styles.thumb}
                  style={child.objectPosition ? { objectPosition: child.objectPosition } : undefined}
                />
                <span className={styles.itemText}>
                  <span className={styles.itemTitle}>{child.shortTitle}</span>
                  <span className={styles.itemDesc}>{child.description}</span>
                </span>
                <span className={styles.chevron} aria-hidden>
                  ›
                </span>
              </OpenProduct>
            </li>
          ))}
        </ul>
      ) : null}

      <div className={`${styles.glass} ${styles.desc}`}>
        <p className={styles.descText}>{entry.description}</p>
        <OpenProduct action={entry.action} sequence={entry.sequence} className={styles.btn}>
          {isFamily ? "Перейти в серию" : "Подробнее"}
        </OpenProduct>
      </div>
    </article>
  );
}
