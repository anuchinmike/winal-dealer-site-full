import type { Crumb } from "@/app/site-chrome";
import { catalogPageSections } from "@/data/dealer-catalog-page";

export const CATALOG_CRUMBS: Crumb[] = [{ label: "Главная", href: "/" }, { label: "Каталог", href: "/catalog" }, { label: "Каталог продуктов" }];

/** Sticky glass row of anchors to the catalogue sections. Scrolls sideways on phones. */
export function SectionChips({ tone = "light" }: { tone?: "light" | "glass" }) {
  return (
    <nav aria-label="Разделы каталога" className="sticky top-2 z-30 -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
      <ul
        className={`flex w-max gap-2 rounded-lg p-2 backdrop-blur-[20px] ${tone === "glass" ? "border border-white/40 bg-white/25" : "bg-white/70"}`}
        style={{ boxShadow: "var(--dealer-shadow-glass)" }}
      >
        {catalogPageSections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.anchor}`}
              className="flex h-10 items-center gap-2 whitespace-nowrap rounded px-4 text-sm font-semibold text-dealer-text-secondary transition-colors hover:bg-dealer-brand-primary hover:text-dealer-brand-white"
            >
              <img src={section.icon} alt="" width={20} height={20} className="h-5 w-5" />
              {section.label}
              <span className="text-dealer-text-description">{section.productCount}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
