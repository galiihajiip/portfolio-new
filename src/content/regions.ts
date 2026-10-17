import type { Region, RegionId } from "@/types/portfolio";

/**
 * The six regions of the island. `illustration` positions are percentages on
 * /public/assets/map/atlas-island.png, used by the non-WebGL fallback map.
 */
export const regions: Region[] = [
  {
    id: "building-grounds",
    index: 1,
    title: "The Building Grounds",
    theme: "Projects",
    description: "Software, AI concepts, and technical experiments, from first question to working prototype.",
    anchor: "projects",
    landmark: "Glass workshop",
    illustration: { x: 44.5, y: 70 },
  },
  {
    id: "systems-highlands",
    index: 2,
    title: "Systems Highlands",
    theme: "Professional experience",
    description: "Where ideas meet real organisations, real users, and real constraints.",
    anchor: "experience",
    landmark: "Observatory",
    illustration: { x: 42.5, y: 16 },
  },
  {
    id: "research-woods",
    index: 3,
    title: "Research Woods",
    theme: "Research & publications",
    description: "Questions investigated through data, methods, and evidence.",
    anchor: "research",
    landmark: "Cabin in the woods",
    illustration: { x: 24, y: 43 },
  },
  {
    id: "collaboration-grove",
    index: 4,
    title: "Collaboration Grove",
    theme: "Leadership",
    description: "Organisations, communities, and the shared work of building with others.",
    anchor: "leadership",
    landmark: "Amphitheatre",
    illustration: { x: 48.5, y: 42 },
  },
  {
    id: "milestone-summit",
    index: 5,
    title: "Milestone Summit",
    theme: "Awards & achievements",
    description: "Competitions, scholarships, and selections that marked a new starting point.",
    anchor: "achievements",
    landmark: "Lighthouse",
    illustration: { x: 71, y: 12 },
  },
  {
    id: "workshop",
    index: 6,
    title: "The Workshop",
    theme: "Education & toolkit",
    description: "Education, certifications, and the capabilities that keep growing.",
    anchor: "toolkit",
    landmark: "Forge",
    illustration: { x: 74, y: 52 },
  },
];

export const regionById = (id: RegionId) => regions.find((r) => r.id === id)!;
