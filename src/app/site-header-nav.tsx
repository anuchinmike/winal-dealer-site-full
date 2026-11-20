"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

// Меню М3 (как на dev.dealer.winal.ru): Каталог, Решения, Дизайн, Монтаж, Проекты.
// На главной пункты — якоря секций с плавной прокруткой и подсветкой текущего раздела.
// На внутренних страницах пункт ведёт на свою страницу, а если её нет — на раздел главной.
export const HEADER_NAV_ITEMS = [
  { label: "Каталог", targetId: "catalog", page: "/catalog" },
  { label: "Решения", targetId: "complex-approach", page: null },
  { label: "Дизайн", targetId: "design", page: null },
  { label: "Монтаж", targetId: "montazh", page: "/montazh" },
  { label: "Проекты", targetId: "cases", page: "/projects" },
] as const;

type HeaderNavItem = (typeof HEADER_NAV_ITEMS)[number];
type HeaderNavTargetId = HeaderNavItem["targetId"];

// Активный пункт на главной: секция, пересекающая полосу около 40% высоты экрана.
function useActiveHeaderSection(enabled: boolean): HeaderNavTargetId | null {
  const [active, setActive] = useState<HeaderNavTargetId | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = HEADER_NAV_ITEMS.map((item) => document.getElementById(item.targetId)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as HeaderNavTargetId);
          } else {
            setActive((current) => (current === entry.target.id ? null : current));
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

function scrollToSection(id: string, lenis: ReturnType<typeof useLenis>) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (lenis) {
    lenis.scrollTo(el, { offset: -12 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return true;
}

function isOnPage(pathname: string, page: string) {
  return pathname === page || pathname.startsWith(`${page}/`);
}

export function SiteHeaderNav({ className = "", onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lenis = useLenis();
  const activeSection = useActiveHeaderSection(isHome);

  const renderItem = (item: HeaderNavItem) => {
    if (isHome) {
      return (
        <a
          href={`#${item.targetId}`}
          className="dealer-header-nav-link"
          aria-current={activeSection === item.targetId ? "true" : undefined}
          onClick={(event) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            if (!scrollToSection(item.targetId, lenis)) return;
            event.preventDefault();
            onNavigate?.();
          }}
        >
          {item.label}
        </a>
      );
    }
    const href = item.page ?? `/#${item.targetId}`;
    const current = item.page ? isOnPage(pathname, item.page) : false;
    return (
      <Link href={href} className="dealer-header-nav-link" aria-current={current ? "page" : undefined} onClick={() => onNavigate?.()}>
        {item.label}
      </Link>
    );
  };

  return (
    <ul className={`dealer-header-nav-list ${className}`}>
      {HEADER_NAV_ITEMS.map((item) => (
        <li key={item.targetId} className="dealer-header-nav-item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
