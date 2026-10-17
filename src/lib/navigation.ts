/** Primary navigation. Anchors resolve to homepage sections from any route. */
export const navigation = [
  { id: "map", label: "Map", href: "/#map" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "experience", label: "Journey", href: "/#experience" },
  { id: "achievements", label: "Milestones", href: "/#achievements" },
  { id: "toolkit", label: "Toolkit", href: "/#toolkit" },
  { id: "about", label: "About", href: "/#about" },
] as const;

/** Section ids observed for the active-chapter indicator, in page order. */
export const sectionOrder = [
  "map",
  "story",
  "projects",
  "experience",
  "research",
  "leadership",
  "achievements",
  "toolkit",
  "about",
  "contact",
] as const;

/** Maps every observed section to the nav item that should appear active. */
export const sectionToNav: Record<(typeof sectionOrder)[number], (typeof navigation)[number]["id"]> = {
  map: "map",
  story: "map",
  projects: "projects",
  experience: "experience",
  research: "experience",
  leadership: "experience",
  achievements: "achievements",
  toolkit: "toolkit",
  about: "about",
  contact: "about",
};
