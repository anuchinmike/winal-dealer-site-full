import Link from "next/link";
import { asset } from "@/lib/asset";
import { dealerConfig } from "@/lib/dealer-config";
import { ProjectFormSection } from "@/app/project-form-section";
import { FooterSection } from "@/app/site-footer";
import { SiteMobileMenu } from "@/app/site-mobile-menu";
import { HeaderContacts } from "@/app/header-contacts";
import { SiteHeaderNav } from "@/app/site-header-nav";

// Header, breadcrumbs and page frame for inner pages of the multi-page version.
// Same tokens, logo and nav labels as the home page header, without the hero scroll scene.

export function SiteHeader() {
  return (
    <header className="dealer-site-header relative flex w-full items-center justify-between gap-4 rounded-lg bg-dealer-brand-white px-4 md:px-8"
      style={{ boxShadow: "var(--dealer-shadow-glass)" }}
    >
      <Link href="/" aria-label="WINAL, на главную" className="dealer-site-header-logo shrink-0">
        <img src={asset("/images/home/header-logo.svg")} alt="WINAL — панели для внутренней отделки" width={214} height={48} className="h-12 w-auto" />
      </Link>
      <nav aria-label="Основная навигация" className="dealer-site-header-nav">
        <SiteHeaderNav />
      </nav>
      <HeaderContacts />
      <SiteMobileMenu cta={dealerConfig.primaryCta} />
    </header>
  );
}

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const parent = [...items].reverse().find((item) => item.href);
  return (
    <nav aria-label="Хлебные крошки" className="text-sm font-medium text-dealer-text-description">
      {/* Phones: one link back to the parent level instead of the full trail. */}
      {parent ? (
        <Link href={parent.href!} className="inline-flex items-center gap-2 transition-colors hover:text-dealer-brand-primary md:hidden">
          <span aria-hidden>←</span>
          {parent.label}
        </Link>
      ) : null}
      <ol className="hidden flex-wrap items-center gap-x-2 gap-y-1 md:flex">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden>/</span> : null}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-dealer-brand-primary">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-dealer-text-secondary">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Frame of every inner page: header, crumbs, content, the same enquiry form and footer as the home page. */
export function InnerPage({ crumbs, children }: { crumbs: Crumb[]; children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-dealer-surface-page px-4 py-4 md:px-8 md:py-6">
      <div className="flex w-full max-w-[1376px] flex-col gap-6">
        <SiteHeader />
        <Breadcrumbs items={crumbs} />
        {children}
      </div>
      <div className="mt-16 flex w-full flex-col items-center gap-16">
        <ProjectFormSection />
        <FooterSection />
      </div>
    </main>
  );
}
