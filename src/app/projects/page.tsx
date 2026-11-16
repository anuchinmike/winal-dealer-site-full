import type { Metadata } from "next";
import { ProjectsView } from "@/app/projects/projects-view";
import { InnerPage } from "@/app/site-chrome";
import { projects } from "@/data/project-pages";

const TITLE = "Проекты WINAL";
const LEAD = "Объекты, где работают панели и системы WINAL: офисы, медицина, спорт, образование и общественные пространства.";

export const metadata: Metadata = { title: TITLE, description: LEAD };

export default function ProjectsPage() {
  return (
    <InnerPage crumbs={[{ label: "Главная", href: "/" }, { label: "Проекты" }]}>
      <header className="flex flex-col gap-4 pt-4">
        <h1 className="dealer-section-title">{TITLE}</h1>
        <p className="dealer-section-lead max-w-[720px]">{LEAD}</p>
      </header>
      <ProjectsView projects={projects} />
    </InnerPage>
  );
}
