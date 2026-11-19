import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BTN_PRIMARY, CardGrid, PANEL, PANEL_SHADOW, SectionHeading } from "@/app/catalog/catalog-cards";
import { PhotoGallery } from "@/app/catalog/product-page";
import { InnerPage } from "@/app/site-chrome";
import { findProject, projectCard, projectProducts, projects } from "@/data/project-pages";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  return project ? { title: `${project.title} — проекты WINAL`, description: project.description } : {};
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  const products = projectProducts(project);
  const others = projects.filter((item) => item.slug !== project.slug);
  const sameKind = [...others.filter((item) => item.categoryId === project.categoryId), ...others.filter((item) => item.categoryId !== project.categoryId)].slice(0, 4);

  return (
    <InnerPage crumbs={[{ label: "Главная", href: "/" }, { label: "Проекты", href: "/projects" }, { label: project.title }]}>
      <div className="flex flex-col gap-10 md:gap-16">
        <section aria-labelledby="project-title" className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-dealer-brand-decoration lg:aspect-auto lg:min-h-[455px]">
            <img src={project.heroImage} alt={project.title} className="size-full object-cover" />
          </div>
          <div className={`${PANEL} flex min-w-0 flex-col justify-between gap-8`} style={PANEL_SHADOW}>
            <div className="flex flex-col gap-4">
              <p className="dealer-type-base-medium text-dealer-brand-primary">{project.categoryEyebrow}</p>
              <h1 id="project-title" className="dealer-type-h1 text-dealer-text-primary [text-wrap:balance] max-md:!text-[36px] max-md:!leading-[1.1]">
                {project.title}
              </h1>
              <p className="dealer-type-base-medium text-dealer-text-secondary">{project.description}</p>
            </div>
            {products.length ? (
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-dealer-text-description">Продукты на объекте</span>
                <ul className="flex flex-col gap-2">
                  {products.map((product) => {
                    const body = (
                      <>
                        <img src={product.image} alt="" className="size-12 shrink-0 rounded object-cover" />
                        <span className="flex min-w-0 flex-col">
                          <span className="text-xs font-semibold text-dealer-text-muted">{product.categoryLabel}</span>
                          <span className="text-sm font-semibold text-dealer-text-primary">{product.label}</span>
                        </span>
                      </>
                    );
                    return (
                      <li key={product.label}>
                        {product.href ? (
                          <Link href={product.href} className="flex items-center gap-3 rounded p-1 transition-colors hover:bg-dealer-brand-primary/5">
                            {body}
                          </Link>
                        ) : (
                          <span className="flex items-center gap-3 p-1">{body}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
            <div>
              <a href="#project-form" className={BTN_PRIMARY}>
                <span className="dealer-type-mini-semibold">Обсудить похожий проект</span>
              </a>
            </div>
          </div>
        </section>

        <PhotoGallery images={project.heroImages.map((src) => ({ src, caption: project.title }))} title="Фото объекта" />

        <section aria-labelledby="more-projects" className="flex flex-col gap-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <SectionHeading id="more-projects" title="Другие проекты" />
            <Link href="/projects" className="text-sm font-semibold text-dealer-brand-primary hover:opacity-80">
              Все проекты →
            </Link>
          </div>
          <CardGrid cards={sameKind.map(projectCard)} columns={4} />
        </section>
      </div>
    </InnerPage>
  );
}
