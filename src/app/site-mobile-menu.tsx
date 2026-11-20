"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { SiteHeaderNav } from "@/app/site-header-nav";

// Меню шапки ниже 1280px, где строчное меню скрыто (шапка М3, как на dev.dealer.winal.ru):
// в полосе слева контакты, справа кнопка «Меню»; логотип и пункты — в раскрытой панели.

export function SiteMobileMenu({ cta }: { cta: string }) {
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
        className="dealer-site-menu-btn"
      >
        {open ? null : <span className="dealer-site-menu-label">Меню</span>}
        <img src={asset("/images/home/decor-glass-logo.webp")} alt="" width={40} height={40} className="dealer-site-menu-img" />
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="dealer-site-menu-panel absolute inset-x-0 top-[calc(100%+8px)] z-50 rounded-lg bg-dealer-brand-white px-5 py-3"
        style={{ boxShadow: "var(--dealer-shadow-glass)" }}
      >
        <Link href="/" aria-label="WINAL, на главную" onClick={() => setOpen(false)} className="mb-2 inline-flex py-2">
          <img src={asset("/images/home/header-logo.svg")} alt="WINAL — панели для внутренней отделки" width={214} height={48} className="h-9 w-auto" />
        </Link>
        <nav aria-label="Меню">
          <SiteHeaderNav onNavigate={() => setOpen(false)} />
        </nav>
        <a
          href="#project-form"
          onClick={() => setOpen(false)}
          className="mt-2 flex h-11 items-center justify-center rounded bg-dealer-brand-primary text-sm font-semibold text-dealer-brand-white sm:hidden"
        >
          {cta}
        </a>
      </div>
    </>
  );
}
