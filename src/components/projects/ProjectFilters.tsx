"use client";

import { projectFilters } from "@/content/projects";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types/portfolio";

export type FilterId = "all" | ProjectCategory;

export function ProjectFilters({
  value,
  onChange,
  projects,
  controls,
}: {
  value: FilterId;
  onChange: (f: FilterId) => void;
  projects: Project[];
  controls: string;
}) {
  return (
    <div role="group" aria-label="Filter projects by category" className="no-scrollbar -mx-[var(--gutter)] overflow-x-auto px-[var(--gutter)] py-1">
      <ul className="flex w-max gap-2">
        {projectFilters.map((f) => {
          const count = f.id === "all" ? projects.length : projects.filter((p) => p.category === f.id).length;
          const active = value === f.id;
          return (
            <li key={f.id}>
              <button
                type="button"
                aria-pressed={active}
                aria-controls={controls}
                onClick={() => onChange(f.id)}
                className={cn(
                  "flex min-h-10 items-center gap-2 rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition-colors",
                  active ? "border-ink bg-ink text-cream" : "border-ink/25 bg-transparent text-ink hover:border-ink",
                )}
              >
                {f.label}
                <span className={cn("font-mono text-[0.7rem]", active ? "text-mustard" : "text-slate")}>{count}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
