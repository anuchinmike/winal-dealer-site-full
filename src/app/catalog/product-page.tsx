"use client";

import Link from "next/link";
import { useState } from "react";
import { coatingLightboxSrc, openCasePhotoGallery } from "@/app/case-fancybox";
import { HeroGlassNavButton } from "@/app/hero-glass-nav-button";
import {
  productHref,
  type ProductCoatingGroup,
  type ProductFamily,
  type ProductFeature,
  type ProductPageData,
} from "@/data/product-pages";

// Product page template: the product modal laid out as a page. Hero with photo carousel,
// coatings, specs, the full photo gallery as a grid, and links to the other products of the family.

const PANEL = "rounded-lg bg-dealer-brand-white p-5 md:p-7";
const PANEL_SHADOW = { boxShadow: "var(--dealer-shadow-video)" } as const;
const ICON_SHADOW = { boxShadow: "0 4px 32px rgba(1, 88, 171, 0.1)" } as const;
const CHIP_GRADIENT = "linear-gradient(143.68deg, rgba(1, 88, 171, 0.05) 14.835%, rgba(255, 255, 255, 0.013) 125.3%)";

function Feature({ feature }: { feature: ProductFeature }) {
  return (
    <li className="flex min-w-0 items-center gap-4">
      <span className="flex size-[60px] shrink-0 items-center justify-center rounded-lg bg-dealer-brand-white p-4 md:size-[70px] md:p-[18px]" style={ICON_SHADOW}>
        <img src={feature.icon} alt="" width={34} height={34} className="size-full object-contain" />
      </span>
      <span className="flex min-w-0 flex-col gap-1 text-dealer-text-primary">
        <span className="dealer-type-mini-semibold">{feature.title}</span>
        <span className="dealer-type-mini-regular">{feature.description}</span>
      </span>
    </li>
  );
}

function Hero({ product }: { product: ProductPageData }) {
  const images = product.gallery;
  const [index, setIndex] = useState(0);
  const step = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);
  const current = images[index];

  return (
    <section aria-labelledby="product-title" className="grid gap-4 lg:grid-cols-[minmax(0,548px)_minmax(0,1fr)]">
      <div className="relative flex aspect-[4/3] items-center justify-between overflow-hidden rounded-lg px-4 lg:aspect-auto lg:min-h-[455px]">
        <button
          type="button"
          aria-label="Открыть фото на весь экран"
          onClick={(event) => openCasePhotoGallery([...images], index, event.currentTarget)}
          className="absolute inset-0 z-[1] cursor-zoom-in"
        >
          <img src={current.src} alt={current.caption} className="pointer-events-none absolute inset-0 size-full object-cover" />
        </button>
        {images.length > 1 ? (
          <>
            <HeroGlassNavButton direction="left" ariaLabel="Предыдущее фото" onClick={() => step(-1)} />
            <HeroGlassNavButton direction="right" ariaLabel="Следующее фото" onClick={() => step(1)} />
          </>
        ) : null}
        <span className="pointer-events-none absolute bottom-3 right-3 z-[2] rounded bg-white/75 px-2 py-1 text-xs font-semibold text-dealer-text-secondary backdrop-blur-[10px]">
          {index + 1} / {images.length}
        </span>
      </div>

      <div className={`${PANEL} flex min-w-0 flex-col justify-between gap-8`} style={PANEL_SHADOW}>
        <div className="flex flex-col gap-4">
          <p className="dealer-type-base-medium text-dealer-brand-primary">{product.categoryLabel}</p>
          <h1 id="product-title" className="dealer-type-h1 text-dealer-text-primary [text-wrap:balance] max-md:!text-[36px] max-md:!leading-[1.1]">
            {product.title}
          </h1>
          <p className="dealer-type-base-medium text-dealer-text-secondary">{product.description}</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {product.heroFeatures.map((feature) => (
            <Feature key={feature.title} feature={feature} />
          ))}
        </ul>
        <div className="flex flex-wrap gap-3 md:gap-6">
          <a href="#project-form" className="inline-flex h-10 items-center justify-center rounded bg-dealer-brand-primary px-8 text-dealer-brand-white transition-opacity hover:opacity-90 md:px-12">
            <span className="dealer-type-mini-semibold">{product.primaryCta}</span>
          </a>
          <a href="#project-form" className="inline-flex h-10 items-center justify-center rounded border border-dealer-brand-primary px-8 text-dealer-brand-primary transition-colors hover:bg-dealer-brand-primary/5 md:px-12">
            <span className="dealer-type-mini-semibold">{product.secondaryCta}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function CoatingGroup({ group }: { group: ProductCoatingGroup }) {
  const open = (start: number, trigger: HTMLElement) =>
    openCasePhotoGallery(
      group.swatches.map((swatch) => ({ src: coatingLightboxSrc(swatch.image), caption: swatch.label })),
      start,
      trigger,
    );
  return (
    <div className="flex flex-col gap-3">
      <p className="dealer-type-mini-semibold w-fit rounded px-3 py-1.5 text-dealer-brand-primary" style={{ backgroundImage: CHIP_GRADIENT }}>
        {group.chip} <span className="text-dealer-text-description">· {group.swatches.length}</span>
      </p>
      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
        {group.swatches.map((swatch, i) => (
          <li key={swatch.id}>
            <button
              type="button"
              onClick={(event) => open(i, event.currentTarget)}
              className="group flex w-full flex-col overflow-hidden rounded bg-dealer-brand-white text-left"
              style={{ boxShadow: "var(--dealer-shadow-glass)" }}
            >
              <span className="block aspect-[4/3] w-full overflow-hidden">
                <img src={swatch.image} alt="" loading="lazy" className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
              </span>
              <span className="dealer-type-mini-regular truncate px-2 py-1.5 text-center text-black">{swatch.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Coatings({ product }: { product: ProductPageData }) {
  return (
    <section aria-labelledby="coatings-title" className={`${PANEL} flex flex-col gap-6`} style={{ boxShadow: "var(--dealer-shadow-glass)" }}>
      <h2 id="coatings-title" className="dealer-type-h2 text-dealer-text-primary">
        {product.coatingTitle}
      </h2>
      {product.coatingGroups.map((group) => (
        <CoatingGroup key={group.chip} group={group} />
      ))}
      {product.ral ? (
        <div className="flex items-center gap-4 overflow-hidden rounded pr-4" style={{ backgroundImage: CHIP_GRADIENT }}>
          <img src={product.ral.chart} alt="" loading="lazy" className="size-20 shrink-0 object-cover md:size-24" />
          <p className="dealer-type-mini-regular text-dealer-brand-primary">{product.ral.note}</p>
        </div>
      ) : null}
    </section>
  );
}

function Specs({ product }: { product: ProductPageData }) {
  return (
    <section aria-labelledby="specs-title" className={`${PANEL} grid gap-8 lg:grid-cols-2`} style={PANEL_SHADOW}>
      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 id="specs-title" className="dealer-type-h2 text-dealer-text-primary">
            {product.specs.title}
          </h2>
          <p className="dealer-type-h3 text-dealer-text-secondary">{product.specs.productName}</p>
        </div>
        <dl className="flex flex-col">
          {product.specs.rows.map((row) => (
            <div key={row.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-4 border-b border-dealer-brand-decoration py-3 last:border-b-0">
              <dt className="dealer-type-mini-regular whitespace-pre-line text-dealer-text-description">{row.label}</dt>
              <dd className="dealer-type-mini-semibold whitespace-pre-line text-dealer-text-primary">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ul className="flex min-w-0 flex-col justify-center gap-5">
        {product.extraFeatures.map((feature) => (
          <Feature key={feature.title} feature={feature} />
        ))}
      </ul>
    </section>
  );
}

const GALLERY_STEP = 12;

function Gallery({ product }: { product: ProductPageData }) {
  const images = product.gallery;
  const [shown, setShown] = useState(GALLERY_STEP);
  const visible = images.slice(0, shown);
  return (
    <section aria-labelledby="gallery-title" className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="gallery-title" className="dealer-type-h2 text-dealer-text-primary">
          Фото на объектах
        </h2>
        <span className="text-sm font-semibold text-dealer-text-description">{images.length} фото</span>
      </div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {visible.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={(event) => openCasePhotoGallery([...images], i, event.currentTarget)}
              className="group block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-lg bg-dealer-brand-decoration"
              aria-label={image.caption ? `Открыть фото: ${image.caption}` : "Открыть фото"}
            >
              <img src={image.src} alt={image.caption} loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
            </button>
          </li>
        ))}
      </ul>
      {shown < images.length ? (
        <button
          type="button"
          onClick={() => setShown((n) => n + GALLERY_STEP * 2)}
          className="mx-auto inline-flex h-10 items-center rounded border border-dealer-brand-primary px-8 text-dealer-brand-primary transition-colors hover:bg-dealer-brand-primary/5"
        >
          <span className="dealer-type-mini-semibold">Показать ещё · {images.length - shown}</span>
        </button>
      ) : null}
    </section>
  );
}

function Neighbours({ family, product }: { family: ProductFamily; product: ProductPageData }) {
  const i = family.products.findIndex((item) => item.id === product.id);
  const prev = family.products[(i - 1 + family.products.length) % family.products.length];
  const next = family.products[(i + 1) % family.products.length];
  return (
    <nav aria-label={`Другие продукты: ${family.title}`} className="flex flex-col gap-5">
      <h2 className="dealer-type-h2 text-dealer-text-primary">{family.title}</h2>
      <ul className="flex flex-wrap gap-2">
        {family.products.map((item) => (
          <li key={item.id}>
            <Link
              href={productHref(family.id, item.id)}
              aria-current={item.id === product.id ? "page" : undefined}
              className="inline-flex min-h-10 items-center rounded border border-[var(--dealer-border-brand-soft)] px-4 text-sm font-semibold text-dealer-brand-primary transition-colors hover:bg-dealer-brand-primary hover:text-dealer-brand-white aria-[current=page]:border-dealer-brand-primary aria-[current=page]:bg-dealer-brand-primary aria-[current=page]:text-dealer-brand-white"
            >
              {item.shortTitle}
            </Link>
          </li>
        ))}
      </ul>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { item: prev, label: "Предыдущий", align: "text-left" },
          { item: next, label: "Следующий", align: "sm:text-right" },
        ].map(({ item, label, align }) => (
          <Link
            key={label}
            href={productHref(family.id, item.id)}
            className={`${PANEL} flex flex-col gap-1 transition-shadow hover:shadow-[0_8px_40px_rgba(1,88,171,0.14)] ${align}`}
            style={PANEL_SHADOW}
          >
            <span className="text-xs font-semibold text-dealer-text-muted">{label}</span>
            <span className="dealer-type-h3 text-dealer-text-primary">{item.title}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function ProductPageContent({ family, product }: { family: ProductFamily; product: ProductPageData }) {
  return (
    <div className="flex flex-col gap-10 md:gap-16">
      <div className="flex flex-col gap-4">
        <Hero product={product} />
        <Specs product={product} />
        <Coatings product={product} />
      </div>
      <Gallery product={product} />
      <Neighbours family={family} product={product} />
    </div>
  );
}
