"use client";

import { useState } from "react";
import { CardGrid, CHIP_LINK } from "@/app/catalog/catalog-cards";
import type { DealerCase } from "@/data/dealer-cases";
import { projectCard, projectCategories } from "@/data/project-pages";

export function ProjectsView({ projects }: { projects: readonly DealerCase[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const visible = category ? projects.filter((item) => item.categoryId === category) : projects;
  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-wrap gap-2" aria-label="Тип объекта">
        {[{ id: null, label: "Все", count: projects.length }, ...projectCategories.map((c) => ({ id: c.id as string | null, label: c.label, count: projects.filter((p) => p.categoryId === c.id).length }))].map((chip) => (
          <li key={chip.label}>
            <button type="button" aria-pressed={category === chip.id} aria-current={category === chip.id ? "page" : undefined} onClick={() => setCategory(chip.id)} className={`${CHIP_LINK} gap-2`}>
              {chip.label}
              <span className="opacity-60">{chip.count}</span>
            </button>
          </li>
        ))}
      </ul>
      <CardGrid cards={visible.map(projectCard)} columns={3} />
    </div>
  );
}
