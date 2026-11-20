"use client";

import Link from "next/link";
import { useState } from "react";
import { coatingLightboxSrc, openCasePhotoGallery } from "@/app/case-fancybox";
import {
  BTN_PRIMARY,
  BTN_SECONDARY,
  CardGrid,
  CHIP_GRADIENT,
  CHIP_LINK,
  GLASS_SHADOW,
  PANEL,
  PANEL_SHADOW,
  SectionHeading,
  type PageCardData,
} from "@/app/catalog/catalog-cards";
import { HeroGlassNavButton } from "@/app/hero-glass-nav-button";
import type {
  ProductCoatingsBlock,
  ProductFeature,
  ProductGalleryImage,
  ProductInfoBlock,
  ProductPageData,
} from "@/data/product-pages";

// Product page template: the product modal laid out as a page. Hero with photo carousel,
// content blocks (specs, coatings, formats…), the full photo gallery as a grid, and links
// to the other products of the family or section.

const ICON_SHADOW = { boxShadow: "0 4px 32px rgba(1, 88, 171, 0.1)" } as const;

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

function Hero({ product, images }: { product: ProductPageData; images: readonly ProductGalleryImage[] }) {
  const [index, setIndex] = useState(0);
  const step = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);
  const current = images[index];

  return (
    <section aria-labelledby="product-title" className="grid gap-4 lg:grid-cols-[minmax(0,548px)_minmax(0,1fr)]">
      <div className="relative flex aspect-[4/3] items-center justify-between overflow-hidden rounded-lg bg-dealer-brand-decoration px-4 lg:aspect-auto lg:min-h-[455px]">
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
            <span className="pointer-events-none absolute bottom-3 right-3 z-[2] rounded bg-white/75 px-2 py-1 text-xs font-semibold text-dealer-text-secondary backdrop-blur-[10px]">
              {index + 1} / {images.length}
            </span>
          </>
        ) : null}
      </div>

      <div className={`${PANEL} flex min-w-0 flex-col justify-between gap-8`} style={PANEL_SHADOW}>
        <div className="flex flex-col gap-4">
          <p className="dealer-type-base-medium text-dealer-brand-primary">{product.categoryLabel}</p>
          <h1 id="product-title" className="dealer-type-h1 text-dealer-text-primary [text-wrap:balance] max-md:!text-[36px] max-md:!leading-[1.1]">
            {product.title}
          </h1>
          <p className="dealer-type-base-medium text-dealer-text-secondary">{product.description}</p>
        </div>
        {product.heroFeatures.length ? (
          <ul className="grid gap-4 sm:grid-cols-2">
            {product.heroFeatures.map((feature) => (
              <Feature key={feature.title} feature={feature} />
            ))}
          </ul>
        ) : null}
        <div className="flex flex-wrap gap-3 md:gap-6">
          <a href="#project-form" className={BTN_PRIMARY}>
            <span className="dealer-type-mini-semibold">{product.primaryCta}</span>
          </a>
          {product.secondaryCta ? (
            <a href="#project-form" className={BTN_SECONDARY}>
              <span className="dealer-type-mini-semibold">{product.secondaryCta}</span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Chips({ chips }: { chips: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <li key={chip} className="dealer-type-mini-semibold rounded px-3 py-1.5 text-dealer-brand-primary" style={{ backgroundImage: CHIP_GRADIENT }}>
          {chip}
        </li>
      ))}
    </ul>
  );
}

function InfoBlock({ block, index }: { block: ProductInfoBlock; index: number }) {
  const id = `block-${index}`;
  const side = block.features?.length ? (
    <ul className="flex min-w-0 flex-col justify-center gap-5">
      {block.features.map((feature) => (
        <Feature key={feature.title} feature={feature} />
      ))}
    </ul>
  ) : null;
  const tiles = block.tiles ?? [];
  const openTile = (i: number, trigger: HTMLElement) =>
    openCasePhotoGallery(
      tiles.map((tile) => ({ src: tile.image, caption: tile.label })),
      i,
      trigger,
    );

  return (
    <section aria-labelledby={id} className={`${PANEL} grid gap-8 ${side ? "lg:grid-cols-2" : ""}`} style={PANEL_SHADOW}>
      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 id={id} className="dealer-type-h2 text-dealer-text-primary">
            {block.title}
          </h2>
          {block.subtitle ? <p className="dealer-type-h3 text-dealer-text-secondary">{block.subtitle}</p> : null}
          {block.caption ? <p className="dealer-type-base-medium max-w-[860px] text-dealer-text-secondary">{block.caption}</p> : null}
        </div>

        {block.facts?.length ? (
          <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            {block.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-2 rounded-lg p-4" style={{ backgroundImage: CHIP_GRADIENT }}>
                <dt className="dealer-type-mini-regular text-dealer-text-description">{fact.label}</dt>
                <dd className="flex flex-col gap-2">
                  {fact.value ? <span className="dealer-type-mini-semibold text-dealer-text-primary">{fact.value}</span> : null}
                  {fact.chips?.length ? (
                    <span className="flex flex-wrap gap-1.5">
                      {fact.chips.map((chip) => (
                        <span key={chip} className="rounded bg-dealer-brand-white px-2 py-1 text-xs font-semibold text-dealer-brand-primary">
                          {chip}
                        </span>
                      ))}
                    </span>
                  ) : null}
                  {fact.description ? <span className="dealer-type-mini-regular text-dealer-text-secondary">{fact.description}</span> : null}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {block.items?.length ? <Chips chips={block.items} /> : null}

        {block.rows?.length ? (
          <dl className="flex flex-col">
            {block.rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-4 border-b border-dealer-brand-decoration py-3 last:border-b-0">
                <dt className="dealer-type-mini-regular whitespace-pre-line text-dealer-text-description">{row.label}</dt>
                <dd className="dealer-type-mini-semibold whitespace-pre-line text-dealer-text-primary">{row.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {block.table ? (
          <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr>
                  {block.table.columns.map((column, i) => (
                    <th
                      key={`${column}-${i}`}
                      scope="col"
                      className={`dealer-type-mini-semibold border-b border-dealer-brand-decoration px-3 py-3 first:pl-0 ${i === block.table!.highlight ? "text-dealer-brand-primary" : "text-dealer-text-primary"}`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.table.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="dealer-type-mini-regular border-b border-dealer-brand-decoration py-3 pr-3 align-top text-dealer-text-description">
                          {cell}
                        </th>
                      ) : (
                        <td
                          key={i}
                          className={`dealer-type-mini-semibold border-b border-dealer-brand-decoration px-3 py-3 align-top ${i === block.table!.highlight ? "bg-dealer-brand-primary/5 text-dealer-brand-primary" : "text-dealer-text-primary"}`}
                        >
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {tiles.length ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {tiles.map((tile, i) => {
              const body = (
                <>
                  <span className="block aspect-square w-full overflow-hidden bg-dealer-brand-decoration">
                    <img src={tile.image} alt="" loading="lazy" className="size-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </span>
                  <span className="flex flex-col gap-1 px-3 py-2">
                    <span className="dealer-type-mini-semibold text-dealer-text-primary">{tile.label}</span>
                    {tile.description ? <span className="dealer-type-mini-regular text-dealer-text-description">{tile.description}</span> : null}
                  </span>
                </>
              );
              const cls = "group flex h-full w-full flex-col overflow-hidden rounded bg-dealer-brand-white text-left";
              return (
                <li key={`${tile.label}-${i}`}>
                  {tile.href ? (
                    <a href={tile.href} target="_blank" rel="noreferrer" className={cls} style={GLASS_SHADOW}>
                      {body}
                    </a>
                  ) : (
                    <button type="button" onClick={(event) => openTile(i, event.currentTarget)} className={`${cls} cursor-zoom-in`} style={GLASS_SHADOW}>
                      {body}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        ) : null}

        {block.note ? (
          <p className="dealer-type-mini-regular rounded px-4 py-3 text-dealer-brand-primary" style={{ backgroundImage: CHIP_GRADIENT }}>
            {block.note}
          </p>
        ) : null}
      </div>
      {side}
    </section>
  );
}

function CoatingsBlock({ block, index }: { block: ProductCoatingsBlock; index: number }) {
  const id = `block-${index}`;
  return (
    <section aria-labelledby={id} className={`${PANEL} flex flex-col gap-6`} style={GLASS_SHADOW}>
      <h2 id={id} className="dealer-type-h2 text-dealer-text-primary">
        {block.title}
      </h2>
      {block.groups.map((group) => (
        <div key={group.chip} className="flex flex-col gap-3">
          <p className="dealer-type-mini-semibold w-fit rounded px-3 py-1.5 text-dealer-brand-primary" style={{ backgroundImage: CHIP_GRADIENT }}>
            {group.chip} <span className="text-dealer-text-description">· {group.swatches.length}</span>
          </p>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
            {group.swatches.map((swatch, i) => (
              <li key={swatch.id}>
                <button
                  type="button"
                  onClick={(event) =>
                    openCasePhotoGallery(
                      group.swatches.map((s) => ({ src: coatingLightboxSrc(s.image), caption: s.label })),
                      i,
                      event.currentTarget,
                    )
                  }
                  className="group flex w-full flex-col overflow-hidden rounded bg-dealer-brand-white text-left"
                  style={GLASS_SHADOW}
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
      ))}
      {block.ral ? (
        <div className="flex items-center gap-4 overflow-hidden rounded pr-4" style={{ backgroundImage: CHIP_GRADIENT }}>
          <img src={block.ral.chart} alt="" loading="lazy" className="size-20 shrink-0 object-cover md:size-24" />
          <p className="dealer-type-mini-regular text-dealer-brand-primary">{block.ral.note}</p>
        </div>
      ) : null}
    </section>
  );
}

const GALLERY_STEP = 12;

export function PhotoGallery({ images, title = "Фото" }: { images: readonly ProductGalleryImage[]; title?: string }) {
  return <Gallery images={images} title={title} />;
}

function Gallery({ images, title }: { images: readonly ProductGalleryImage[]; title: string }) {
  const [shown, setShown] = useState(GALLERY_STEP);
  return (
    <section aria-labelledby="gallery-title" className="flex flex-col gap-5">
      <SectionHeading id="gallery-title" title={title} aside={`${images.length} фото`} />
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {images.slice(0, shown).map((image, i) => (
          <li key={`${image.src}-${i}`}>
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
        <button type="button" onClick={() => setShown((n) => n + GALLERY_STEP * 2)} className={`${BTN_SECONDARY} mx-auto`}>
          <span className="dealer-type-mini-semibold">Показать ещё · {images.length - shown}</span>
        </button>
      ) : null}
    </section>
  );
}

export type ProductSibling = { id: string; title: string; shortTitle: string; href: string };

export type ProductPageLinks = {
  /** Family products (with the current one) for chips and prev/next. */
  siblings?: { title: string; href: string; items: readonly ProductSibling[] };
  /** Projects where the product was used. */
  projects?: readonly PageCardData[];
  /** Related cards at the bottom (other families or products of the section). */
  related?: { title: string; cards: readonly PageCardData[] };
};

function Siblings({ product, siblings }: { product: ProductPageData; siblings: NonNullable<ProductPageLinks["siblings"]> }) {
  const items = siblings.items;
  const i = items.findIndex((item) => item.id === product.id);
  const prev = items[(i - 1 + items.length) % items.length];
  const next = items[(i + 1) % items.length];
  return (
    <nav aria-label={`Другие продукты: ${siblings.title}`} className="flex flex-col gap-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="dealer-type-h2 text-dealer-text-primary">{siblings.title}</h2>
        <Link href={siblings.href} className="text-sm font-semibold text-dealer-brand-primary hover:opacity-80">
          Вся серия →
        </Link>
      </div>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.href} aria-current={item.id === product.id ? "page" : undefined} className={CHIP_LINK}>
              {item.shortTitle}
            </Link>
          </li>
        ))}
      </ul>
      {items.length > 1 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { item: prev, label: "Предыдущий", align: "" },
            { item: next, label: "Следующий", align: "sm:text-right" },
          ].map(({ item, label, align }) => (
            <Link
              key={label}
              href={item.href}
              className={`${PANEL} flex flex-col gap-1 transition-shadow hover:shadow-[0_8px_40px_rgba(1,88,171,0.14)] ${align}`}
              style={PANEL_SHADOW}
            >
              <span className="text-xs font-semibold text-dealer-text-muted">{label}</span>
              <span className="dealer-type-h3 text-dealer-text-primary">{item.title}</span>
            </Link>
          ))}
        </div>
      ) : null}
    </nav>
  );
}

export function ProductPageContent({ product, links }: { product: ProductPageData; links: ProductPageLinks }) {
  const images = product.gallery.length ? product.gallery : [{ src: product.cover, caption: product.title }];
  return (
    <div className="flex flex-col gap-10 md:gap-16">
      <div className="flex flex-col gap-4">
        <Hero product={product} images={images} />
        {product.blocks.map((block, i) =>
          block.kind === "coatings" ? <CoatingsBlock key={i} block={block} index={i} /> : <InfoBlock key={i} block={block} index={i} />,
        )}
      </div>
      {images.length >= 3 ? <Gallery images={images} title="Фото" /> : null}
      {links.projects?.length ? (
        <section aria-labelledby="projects-title" className="flex flex-col gap-5">
          <SectionHeading id="projects-title" title="Проекты с этим продуктом" aside={`${links.projects.length}`} />
          <CardGrid cards={links.projects} columns={4} />
        </section>
      ) : null}
      {links.siblings ? <Siblings product={product} siblings={links.siblings} /> : null}
      {links.related?.cards.length ? (
        <section aria-labelledby="related-title" className="flex flex-col gap-5">
          <SectionHeading id="related-title" title={links.related.title} />
          <CardGrid cards={links.related.cards} columns={4} compact />
        </section>
      ) : null}
    </div>
  );
}
