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
      "The accounting application that won 1st place at the National Accounting Application Competition (KOIN) 2026, organised by Akuntansi Universitas Sebelas Maret.",
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
      "The web application that earned 1st runner-up in the National Web Development FIT Competition 2026, organised by HMPTI UKSW.",
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
    year: "2026",
    summary:
      "An IoT irrigation system with a monitoring dashboard for automated farming, built as an LPPM UPN “Veteran” Jawa Timur–funded community service project with lecturers from the Faculty of Agriculture.",
    status: "in-progress",
    featured: true,
    caseStudy: {
      overview:
        "A community service (pengabdian kepada masyarakat) project that brings IoT into farming: field sensors feed a monitoring dashboard, and irrigation runs automatically based on the readings. The project is funded by LPPM UPN “Veteran” Jawa Timur and carried out with lecturers from the Faculty of Agriculture (Faperta). The research team is working toward a Scopus-indexed publication.",
      objectives: [
        "Automate irrigation using sensor data from the field.",
        "Give farmers a monitoring dashboard to see field conditions.",
      ],
    },
    draft: true,
    todo: [
      "Your role and the lecturers involved",
      "Hardware (microcontroller, sensors) and dashboard stack",
      "Partner farmers or village, if public",
      "Photos of the device and dashboard",
    ],
  },
  {
    id: "maize-disease-detection",
    slug: "maize-disease-detection",
    title: "Maize Leaf Disease Detection",
    titleNote: "Working title",
    category: "ai",
    year: "2026",
    summary:
      "A computer vision model that detects diseases in maize (corn) plants, trained on thousands of images. A funded research collaboration between lecturers of the Faculty of Computer Science and the Faculty of Agriculture.",
    status: "in-progress",
    featured: true,
    caseStudy: {
      overview:
        "A computer vision research project focused on maize plant diseases. The model is trained on a dataset of thousands of plant images to recognise disease from photos. It is a funded collaboration between lecturers of the Faculty of Computer Science (Fasilkom) and the Faculty of Agriculture (Faperta) at UPN “Veteran” Jawa Timur, working toward a Scopus-indexed publication.",
      objectives: ["Detect maize plant diseases from images using computer vision."],
    },
    draft: true,
    todo: [
      "Funding source (LPPM UPNVJT?)",
      "Diseases covered, dataset size and source",
      "Model architecture and results (only verified numbers)",
      "Your role and the lecturers involved",
    ],
  },
  {
    id: "pibiti-2026-final-project",
    slug: "pibiti-2026-final-project",
    title: "PIBITI 2026 Web Development Final Project",
    titleNote: "Project title to be confirmed",
    category: "software",
    year: "2026",
    summary:
      "The web development final project that won Best Final Project (1st Winner) at PIBITI 2026, the IT training programme of Himpunan Mahasiswa Informatika UPN “Veteran” Jawa Timur.",
    status: "competition-entry",
    relatedAchievements: ["pibiti-2026"],
    draft: true,
    todo: ["Project title and what it does", "Stack and your role", "Screenshots or live link"],
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
