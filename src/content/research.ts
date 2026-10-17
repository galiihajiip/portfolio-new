import type { ResearchEntry, ResearchStatus } from "@/types/portfolio";

/**
 * RESEARCH (Research Woods)
 * Set `status` only when it is verified; entries without a status show none.
 * Never add a DOI, venue, or acceptance decision you cannot link to.
 */
export const research: ResearchEntry[] = [
  {
    id: "applied-ml-data-mining",
    slug: "applied-machine-learning",
    title: "Applied Machine Learning & Data Mining Research",
    titleNote: "Research title to be confirmed",
    summary:
      "Research work applying data mining and machine-learning methods to real-world data, from preparing data to evaluating models.",
    methods: ["Data mining", "Machine learning"],
    draft: true,
    todo: [
      "Research title and question",
      "Institution, supervisor, collaborators",
      "Dataset and methods",
      "Status (in progress / submitted / presented / published) and any DOI",
    ],
  },
  {
    id: "pibiti-2026-research",
    slug: "pibiti-2026",
    title: "PIBITI 2026 Final Project",
    titleNote: "Research title to be confirmed",
    summary:
      "The research-and-innovation final project recognised as Best Final Project (first winner) at PIBITI 2026.",
    date: "2026",
    relatedProject: "pibiti-2026-final-project",
    draft: true,
    todo: ["Title and objective", "Methods", "Programme organiser", "Report or publication link"],
  },
];

export const researchStatusLabels: Record<ResearchStatus, string> = {
  "in-progress": "In progress",
  submitted: "Submitted",
  presented: "Presented",
  published: "Published",
};

export const getResearch = (slug: string) => research.find((r) => r.slug === slug);

/** Published and presented work is listed separately from ongoing work. */
export const groupResearch = (list: ResearchEntry[]) => ({
  published: list.filter((r) => r.status === "published" || r.status === "presented"),
  ongoing: list.filter((r) => r.status !== "published" && r.status !== "presented"),
});
