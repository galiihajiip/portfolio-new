import type { Project, ProjectCategory, ProjectStatus } from "@/types/portfolio";

/**
 * PROJECTS
 * --------
 * Add a project by appending an object to this array. The carousel, archive,
 * filters, sitemap and case-study routes all read from here.
 *
 * Cover images: put files in /public/assets/projects/<slug>/ and set `cover`.
 * Without a cover, a generated category illustration is shown instead.
 *
 * Only state facts you can verify. Leave unknown fields out and list them in
 * `todo`; they will appear as owner notes in `npm run dev` only.
 */
export const projects: Project[] = [
  {
    id: "cogniflip",
    slug: "cogniflip",
    title: "CogniFlip",
    category: "ai",
    summary:
      "An AI-assisted reverse-tutoring concept for elementary-school learners: instead of only receiving explanations, children practise by teaching an AI learner.",
    status: "concept",
    featured: true,
    caseStudy: {
      overview:
        "CogniFlip explores reverse tutoring for elementary-school learners. The learner takes the role of the tutor and explains a topic to an AI-assisted learner, which turns explanation into an active part of learning.",
      objectives: [
        "Make explaining an idea a deliberate part of how young learners practise.",
        "Use AI assistance to respond to a learner's explanation in an age-appropriate way.",
      ],
    },
    draft: true,
    todo: [
      "Year, team, and your exact role",
      "Technologies used",
      "Problem framing, constraints, and any testing done with users",
      "Screenshots or concept visuals for /public/assets/projects/cogniflip/",
      "Repository, demo, or pitch links if public",
    ],
  },
  {
    id: "regional-policy-simulation",
    slug: "regional-policy-simulation",
    title: "Regional Policy Simulation Game",
    titleNote: "Working title",
    category: "software",
    summary:
      "A simulation game built around Indonesian regional, resource, and public-policy data, where players see how decisions play out across regions.",
    status: "prototype",
    featured: true,
    draft: true,
    todo: [
      "Official project name",
      "Confirm status (concept, prototype, released?)",
      "Data sources, engine or framework, and your role",
      "Gameplay screenshots",
    ],
  },
  {
    id: "koin-2026-accounting-app",
    slug: "koin-2026-accounting-application",
    title: "KOIN 2026 Accounting Application",
    titleNote: "Entry name to be confirmed",
    category: "software",
    year: "2026",
    summary:
      "The accounting application entry that won first place at the National Accounting Application Competition (KOIN) 2026.",
    status: "competition-entry",
    featured: true,
    relatedAchievements: ["koin-2026"],
    draft: true,
    todo: ["Application name, problem, and features", "Team members and your role", "Technology stack", "Screenshots"],
  },
  {
    id: "fit-2026-web",
    slug: "fit-2026-web-development",
    title: "FIT 2026 Web Development Entry",
    titleNote: "Entry name to be confirmed",
    category: "software",
    year: "2026",
    summary:
      "The web application that earned first runner-up in the National Web Development FIT Competition 2026.",
    status: "competition-entry",
    featured: true,
    relatedAchievements: ["fit-2026"],
    draft: true,
    todo: ["Product name and problem statement", "Stack and your role", "Live URL or repository", "Screenshots"],
  },
  {
    id: "smart-irrigation",
    slug: "smart-irrigation",
    title: "Smart Irrigation System",
    titleNote: "Working title",
    category: "data-iot",
    summary:
      "An IoT engineering project on sensor-informed irrigation: measuring field conditions and using them to decide when to water.",
    status: "prototype",
    draft: true,
    todo: [
      "Confirm scope and status",
      "Hardware (microcontroller, sensors) and software stack",
      "Your role and collaborators",
      "Photos of the device or dashboard",
    ],
  },
  {
    id: "pibiti-2026-final-project",
    slug: "pibiti-2026-final-project",
    title: "PIBITI 2026 Final Project",
    titleNote: "Project title to be confirmed",
    category: "research",
    year: "2026",
    summary: "The final project that received the Best Final Project award (first winner) at PIBITI 2026.",
    status: "competition-entry",
    relatedAchievements: ["pibiti-2026"],
    draft: true,
    todo: ["Project title, research question, and methods", "Programme full name and organiser", "Your role and team"],
  },
  {
    id: "cvd-training",
    slug: "colour-vision-training",
    title: "Colour Vision Training & Assessment",
    titleNote: "Working title",
    category: "ai",
    summary:
      "A concept for training and assessing colour-vision deficiency through structured, repeatable exercises.",
    status: "concept",
    draft: true,
    todo: ["Official name", "Target users and approach", "Whether AI or adaptive logic is involved", "Visuals"],
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  ai: "AI & Machine Learning",
  software: "Software Engineering",
  research: "Research",
  "data-iot": "Data & IoT",
};

export const statusLabels: Record<ProjectStatus, string> = {
  concept: "Concept",
  prototype: "Prototype",
  "in-progress": "In progress",
  completed: "Completed",
  "competition-entry": "Competition entry",
};

export const projectFilters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "ai", label: categoryLabels.ai },
  { id: "software", label: categoryLabels.software },
  { id: "research", label: categoryLabels.research },
  { id: "data-iot", label: categoryLabels["data-iot"] },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const filterProjects = (list: Project[], filter: "all" | ProjectCategory) =>
  filter === "all" ? list : list.filter((p) => p.category === filter);

/** Featured projects first, preserving authored order within each group. */
export const orderedProjects = () => [...projects.filter((p) => p.featured), ...projects.filter((p) => !p.featured)];

export const adjacentProjects = (slug: string) => {
  const list = orderedProjects();
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1) return { previous: undefined, next: undefined };
  return {
    previous: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
};
