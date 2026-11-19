"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

// Burger menu of the site header below the lg breakpoint, where the inline nav is hidden.

export function SiteMobileMenu({ items, cta, phone, phoneHref }: { items: readonly { label: string; href: string }[]; cta: string; phone: string; phoneHref: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!buttonRef.current?.closest("header")?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        onClick={() => setOpen((value) => !value)}
        className="flex size-10 shrink-0 items-center justify-center rounded border border-[var(--dealer-border-brand-soft)] text-dealer-brand-primary lg:hidden"
      >
        <svg aria-hidden viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {open ? <path d="m5 5 10 10M15 5 5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
        </svg>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-[calc(100%+8px)] z-50 rounded-lg bg-dealer-brand-white p-2 lg:hidden"
        style={{ boxShadow: "var(--dealer-shadow-glass)" }}
      >
        <nav aria-label="Меню">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded px-4 text-base font-semibold text-dealer-text-primary transition-colors hover:bg-dealer-brand-primary/5 hover:text-dealer-brand-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a href={phoneHref} className="mt-1 flex min-h-12 items-center border-t border-dealer-brand-decoration px-4 text-base font-semibold text-dealer-brand-primary">
          {phone}
        </a>
        <a
          href="#project-form"
          onClick={() => setOpen(false)}
          className="m-2 flex h-11 items-center justify-center rounded bg-dealer-brand-primary text-sm font-semibold text-dealer-brand-white sm:hidden"
        >
          {cta}
        </a>
      </div>
    </>
  );
}
