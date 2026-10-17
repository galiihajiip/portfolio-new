"use client";

import { useMemo, useState } from "react";
import { filterProjects } from "@/content/projects";
import type { Project } from "@/types/portfolio";
import { ProjectCard } from "./ProjectCard";
import { type FilterId, ProjectFilters } from "./ProjectFilters";

export function ProjectArchiveGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const items = useMemo(() => filterProjects(projects, filter), [projects, filter]);
  return (
    <div>
      <ProjectFilters value={filter} onChange={setFilter} projects={projects} controls="project-archive" />
      <p className="sr-only" aria-live="polite">
        {items.length} {items.length === 1 ? "project" : "projects"} shown
      </p>
      {items.length === 0 ? (
        <div className="panel-flat mt-8 border-dashed p-10 text-center text-ink-soft">No projects in this category yet.</div>
      ) : (
        <ul id="project-archive" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <li key={p.id}>
              <ProjectCard project={p} headingLevel="h2" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
