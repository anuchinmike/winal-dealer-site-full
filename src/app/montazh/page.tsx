import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { BTN_PRIMARY, BTN_SECONDARY, CHIP_GRADIENT, CHIP_LINK, GLASS_SHADOW, PANEL, PANEL_SHADOW } from "@/app/catalog/catalog-cards";
import { MontazhSection } from "@/app/montazh-section";
import { InnerPage } from "@/app/site-chrome";
import { kartaCards, kartaMarkers, sqSrc, type KartaBranch, type KartaCard, type KartaSolution } from "@/data/montazh-karta";
import { PRODUCT_PAGE_HREF_BY_ACTION } from "@/data/product-pages";
import { BASE_PATH } from "@/lib/asset";

// «Монтаж» as its own page: the interactive room from the home page, then every node of it as a static reference list.

const TITLE = "Монтаж панелей WINAL";
const LEAD =
  "Сухой монтаж без клея: панель держится в профиле, профиль стоит на обрешётке или прямо на стене. Ниже все узлы — стыки, углы, пол, потолок, свет и двери — с профилями для каждого.";

export const metadata: Metadata = { title: TITLE, description: LEAD };

const FACTS = [
  { value: "Сухой", label: "монтаж, панели к стене не клеятся" },
  { value: "2 способа", label: "на обрешётку из ПС или прямо на стену" },
  { value: "Открытое и скрытое", label: "крепление: профиль в шве или под панелью" },
  { value: "22 профиля", label: "для стыков, углов, торцов и света" },
];

/** A file under /public exists at build time. */
function publicFile(src: string): boolean {
  const rel = BASE_PATH && src.startsWith(BASE_PATH + "/") ? src.slice(BASE_PATH.length) : src;
  return existsSync(path.join(process.cwd(), "public", rel));
}

function solutionImage(card: KartaCard, branch: KartaBranch, solution: KartaSolution) {
  const marker =
    kartaMarkers.find((m) => m.card === card.key && m.branch === branch.id && m.solution === solution.id) ??
    kartaMarkers.find((m) => m.card === card.key && m.branch === branch.id && !m.solution);
  const square = marker ? sqSrc(marker, solution, 700) : null;
  if (square && publicFile(square)) return { src: square, alt: solution.images[0]?.alt ?? solution.name, square: true };
  const first = solution.images[0];
  return first ? { src: first.src, alt: first.alt, square: false } : null;
}

function solutionHref(solution: KartaSolution): string | undefined {
  if (solution.profile) return `/catalog/profiles/${solution.profile}`;
  if (solution.modal) return PRODUCT_PAGE_HREF_BY_ACTION[solution.modal];
  return undefined;
}

function SolutionCard({ card, branch, solution }: { card: KartaCard; branch: KartaBranch; solution: KartaSolution }) {
  const image = solutionImage(card, branch, solution);
  const href = solutionHref(solution);
  return (
    <li className="flex h-full flex-col overflow-hidden rounded-lg bg-dealer-brand-white" style={GLASS_SHADOW}>
      {image ? (
        <span className="block aspect-square w-full overflow-hidden bg-dealer-brand-decoration">
          <img src={image.src} alt={image.alt} loading="lazy" className={`size-full ${image.square ? "object-cover" : "object-contain p-4"}`} />
        </span>
      ) : null}
      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        <h4 className="text-lg font-semibold leading-6 text-dealer-text-primary">
          {solution.title ?? solution.name}
          {solution.planned ? <span className="ml-2 align-middle text-xs font-semibold text-dealer-text-description">в разработке</span> : null}
        </h4>
        <p className="text-sm font-medium leading-5 text-dealer-text-description">{solution.text}</p>
        {solution.props?.length ? (
          <ul className="flex flex-col gap-1 pt-1 text-sm leading-5">
            {solution.props.map((prop) => (
              <li key={prop.t}>
                <span className="font-semibold text-dealer-text-primary">{prop.t}.</span> <span className="text-dealer-text-description">{prop.s}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {solution.profiles.length ? (
          <ul className="flex flex-wrap gap-1.5 pt-2">
            {solution.profiles.map((profile) => (
              <li key={profile} className="rounded px-2 py-1 text-xs font-semibold text-dealer-brand-primary" style={{ backgroundImage: CHIP_GRADIENT }}>
                {profile}
              </li>
            ))}
          </ul>
        ) : null}
        {href ? (
          <Link href={href} className="mt-auto pt-3 text-sm font-semibold text-dealer-brand-primary hover:opacity-80">
            Подробнее о профиле →
          </Link>
        ) : null}
      </div>
    </li>
  );
}

/** Story nodes without profile cards: a comparison table or a list of points. */
function InfoSolution({ card, branch, solution }: { card: KartaCard; branch: KartaBranch; solution: KartaSolution }) {
  const image = solutionImage(card, branch, solution);
  return (
    <div className={`${PANEL} grid gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]`} style={PANEL_SHADOW}>
      {image ? (
        <div className="aspect-square overflow-hidden rounded-lg bg-dealer-brand-decoration">
          <img src={image.src} alt={image.alt} loading="lazy" className="size-full object-cover" />
        </div>
      ) : null}
      <div className="flex min-w-0 flex-col gap-4">
        <h4 className="text-xl font-semibold text-dealer-text-primary">{solution.title ?? solution.name}</h4>
        <p className="text-base font-medium leading-6 text-dealer-text-secondary">{solution.text}</p>
        {solution.compare ? (
          <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr>
                  <th scope="col" className="w-[24%] border-b border-dealer-brand-decoration py-2" />
                  {solution.compare.cols.map((col) => (
                    <th key={col} scope="col" className="border-b border-dealer-brand-decoration px-3 py-2 font-semibold text-dealer-brand-primary">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {solution.compare.rows.map((row) => (
                  <tr key={row.t}>
                    <th scope="row" className="border-b border-dealer-brand-decoration py-2 pr-3 align-top font-medium text-dealer-text-description">
                      {row.t}
                    </th>
                    <td className="border-b border-dealer-brand-decoration px-3 py-2 align-top font-medium text-dealer-text-primary">{row.a}</td>
                    <td className="border-b border-dealer-brand-decoration px-3 py-2 align-top font-medium text-dealer-text-primary">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {solution.points?.length ? (
          <ul className="flex flex-col gap-2 text-sm leading-5">
            {solution.points.map((point) => (
              <li key={point.t}>
                <span className="font-semibold text-dealer-text-primary">{point.t}.</span> <span className="text-dealer-text-description">{point.s}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

function cardAnchor(card: KartaCard) {
  return `uzel-${card.key.toLowerCase()}`;
}

export default function MontazhPage() {
  return (
    <InnerPage crumbs={[{ label: "Главная", href: "/" }, { label: "Монтаж" }]}>
      <header className="grid gap-6 pt-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-end lg:gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="dealer-section-title">{TITLE}</h1>
          <p className="dealer-section-lead max-w-[720px]">{LEAD}</p>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {FACTS.map((fact) => (
            <li key={fact.value} className="flex flex-col gap-1 rounded-lg bg-dealer-brand-white p-4" style={PANEL_SHADOW}>
              <span className="text-base font-semibold text-dealer-brand-primary">{fact.value}</span>
              <span className="text-xs font-medium leading-4 text-dealer-text-description">{fact.label}</span>
            </li>
          ))}
        </ul>
      </header>

      <MontazhSection />

      <nav aria-label="Узлы монтажа" className="flex flex-col gap-4">
        <h2 className="dealer-type-h2 text-dealer-text-primary">Все узлы</h2>
        <ul className="flex flex-wrap gap-2">
          {kartaCards.map((card) => (
            <li key={card.key}>
              <a href={`#${cardAnchor(card)}`} className={CHIP_LINK}>
                {card.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-14 md:gap-20">
        {kartaCards.map((card) => (
          <section key={card.key} id={cardAnchor(card)} aria-labelledby={`${cardAnchor(card)}-title`} className="flex scroll-mt-8 flex-col gap-6">
            <div className="flex max-w-[860px] flex-col gap-2">
              <h2 id={`${cardAnchor(card)}-title`} className="dealer-type-h2 text-dealer-text-primary">
                {card.title}
              </h2>
              <p className="text-base font-medium leading-6 text-dealer-text-description">{card.intro}</p>
            </div>
            {card.branches.map((branch) => (
              <div key={branch.id} className="flex flex-col gap-4">
                {card.branches.length > 1 || branch.heading ? (
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-semibold text-dealer-text-primary">{branch.heading ?? branch.name}</h3>
                    {branch.note ? <p className="max-w-[860px] text-sm font-medium leading-5 text-dealer-text-description">{branch.note}</p> : null}
                  </div>
                ) : null}
                {branch.info ? (
                  branch.solutions.map((solution) => <InfoSolution key={solution.id} card={card} branch={branch} solution={solution} />)
                ) : (
                  <ul className="grid gap-3 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
                    {branch.solutions.map((solution) => (
                      <SolutionCard key={solution.id} card={card} branch={branch} solution={solution} />
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>

      <section aria-labelledby="montazh-next" className={`${PANEL} flex flex-col gap-5 md:flex-row md:items-center md:justify-between`} style={PANEL_SHADOW}>
        <div className="flex max-w-[720px] flex-col gap-2">
          <h2 id="montazh-next" className="dealer-type-h2 text-dealer-text-primary">
            Подберём узлы под ваш объект
          </h2>
          <p className="text-base font-medium leading-6 text-dealer-text-description">
            Пришлите планировку или спецификацию: подберём профили для каждого узла, посчитаем количество и подскажем по монтажу.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link href="/catalog/profiles" className={BTN_SECONDARY}>
            <span className="dealer-type-mini-semibold">Каталог профилей</span>
          </Link>
          <a href="#project-form" className={BTN_PRIMARY}>
            <span className="dealer-type-mini-semibold">Обсудить проект</span>
          </a>
        </div>
      </section>
    </InnerPage>
  );
}
