import Link from "next/link";

// Shared cards and headings for the catalogue pages (section, family, product).

export const PANEL = "rounded-lg bg-dealer-brand-white p-5 md:p-7";
export const PANEL_SHADOW = { boxShadow: "var(--dealer-shadow-video)" } as const;
export const GLASS_SHADOW = { boxShadow: "var(--dealer-shadow-glass)" } as const;
export const CHIP_GRADIENT = "linear-gradient(143.68deg, rgba(1, 88, 171, 0.05) 14.835%, rgba(255, 255, 255, 0.013) 125.3%)";
export const CHIP_LINK =
  "inline-flex min-h-10 items-center rounded border border-[var(--dealer-border-brand-soft)] px-4 text-sm font-semibold text-dealer-brand-primary transition-colors hover:bg-dealer-brand-primary hover:text-dealer-brand-white aria-[current=page]:border-dealer-brand-primary aria-[current=page]:bg-dealer-brand-primary aria-[current=page]:text-dealer-brand-white";
export const BTN_PRIMARY =
  "inline-flex h-10 items-center justify-center rounded bg-dealer-brand-primary px-8 text-dealer-brand-white transition-opacity hover:opacity-90 md:px-12";
export const BTN_SECONDARY =
  "inline-flex h-10 items-center justify-center rounded border border-dealer-brand-primary px-8 text-dealer-brand-primary transition-colors hover:bg-dealer-brand-primary/5 md:px-12";

export type PageCardData = {
  href: string;
  image: string;
  title: string;
  kicker?: string;
  description?: string;
  /** Product names inside a family card. */
  chips?: readonly string[];
};

/** `compact`: on phones the card keeps the image, title and product list; the description shows from md up
 *  (used in «Ещё в разделе», where 8 full cards made a very long column on a phone — Mikhail, 20.11). */
export function PageCard({ card, headingLevel = 3, compact = false }: { card: PageCardData; headingLevel?: 2 | 3; compact?: boolean }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col overflow-hidden rounded-lg bg-dealer-brand-white transition-shadow hover:shadow-[0_8px_40px_rgba(1,88,171,0.14)]"
      style={GLASS_SHADOW}
    >
      <span className="block aspect-[4/3] w-full overflow-hidden bg-dealer-brand-decoration">
        <img src={card.image} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </span>
      <span className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        {card.kicker ? <span className="text-xs font-semibold text-dealer-text-muted">{card.kicker}</span> : null}
        <Heading className="text-lg font-semibold leading-6 text-dealer-text-primary md:text-xl">{card.title}</Heading>
        {card.description ? <span className={`${compact ? "hidden md:block " : ""}text-sm font-medium leading-5 text-dealer-text-description`}>{card.description}</span> : null}
        {card.chips?.length ? (
          <span className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {card.chips.map((chip) => (
              <span key={chip} className="rounded px-2 py-1 text-xs font-semibold text-dealer-brand-primary" style={{ backgroundImage: CHIP_GRADIENT }}>
                {chip}
              </span>
            ))}
          </span>
        ) : null}
      </span>
    </Link>
  );
}

export function CardGrid({ cards, columns = 3, compact = false }: { cards: readonly PageCardData[]; columns?: 2 | 3 | 4; compact?: boolean }) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 xl:grid-cols-3", 4: "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" }[columns];
  return (
    <ul className={`grid gap-3 md:gap-6 ${cols}`}>
      {cards.map((card) => (
        <li key={card.href}>
          <PageCard card={card} compact={compact} />
        </li>
      ))}
    </ul>
  );
}

export function SectionHeading({ id, title, aside }: { id?: string; title: string; aside?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 id={id} className="dealer-type-h2 text-dealer-text-primary">
        {title}
      </h2>
      {aside ? <span className="shrink-0 text-sm font-semibold text-dealer-text-description">{aside}</span> : null}
    </div>
  );
}
