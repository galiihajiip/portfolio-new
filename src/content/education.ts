import type { CapabilityGroup, Certification, Education } from "@/types/portfolio";

/** EDUCATION (The Workshop) */
export const education: Education[] = [
  {
    id: "upn-veteran-jatim",
    institution: "Universitas Pembangunan Nasional “Veteran” Jawa Timur",
    programme: "Informatics",
    field: "Informatics",
    location: "Surabaya, Indonesia",
    draft: true,
    todo: ["Degree name", "Start year (and expected graduation if you want it shown)", "Relevant academic activities or mobility programmes"],
  },
];

/**
 * CERTIFICATIONS
 * Empty until real credentials are supplied. Add previews to
 * /public/assets/certificates/.
 */
export const certifications: Certification[] = [];

/**
 * CAPABILITIES
 * Groups describe areas evidenced by real work. `tools` stays empty until you
 * confirm the specific languages, frameworks, and instruments you use.
 * No percentages or levels, by design.
 */
export const capabilities: CapabilityGroup[] = [
  {
    id: "software",
    title: "Software Engineering & Web Development",
    description: "Designing and building working applications, including competition-tested web and accounting software.",
    tools: [],
    evidence: [
      { label: "FIT 2026 web entry", href: "/projects/fit-2026-web-development" },
      { label: "KOIN 2026 application", href: "/projects/koin-2026-accounting-application" },
    ],
    todo: ["Languages and frameworks you use"],
  },
  {
    id: "ai-ml",
    title: "Artificial Intelligence & Machine Learning",
    description: "Exploring how AI can support learning and decision-making, and applying ML methods in research.",
    tools: [],
    evidence: [
      { label: "CogniFlip", href: "/projects/cogniflip" },
      { label: "Applied ML research", href: "/research/applied-machine-learning" },
    ],
    todo: ["Libraries and models you have worked with"],
  },
  {
    id: "data",
    title: "Data Mining & Analytics",
    description: "Preparing, analysing, and modelling data to answer concrete questions.",
    tools: [],
    evidence: [
      { label: "Applied ML research", href: "/research/applied-machine-learning" },
      { label: "Policy simulation", href: "/projects/regional-policy-simulation" },
    ],
    todo: ["Analysis tools and databases"],
  },
  {
    id: "iot",
    title: "IoT & Hardware",
    description: "Connecting sensors and software to respond to conditions in the physical world.",
    tools: [],
    evidence: [{ label: "Smart irrigation", href: "/projects/smart-irrigation" }],
    todo: ["Boards, sensors, and platforms"],
  },
  {
    id: "research",
    title: "Research Methods",
    description: "Framing questions, choosing methods, and reporting results that others can check.",
    tools: [],
    evidence: [{ label: "PIBITI 2026", href: "/research/pibiti-2026" }],
    todo: ["Research tools (e.g. reference managers, statistics software)"],
  },
];
