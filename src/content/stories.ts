import type { Chapter } from "@/types/portfolio";

/** Narrative copy for each homepage chapter. Edit freely. */
export const chapters = {
  beginning: {
    id: "story",
    number: "01",
    label: "The beginning",
    headline: "Every journey starts somewhere.",
    body: [
      "Before I learned how to build systems, I learned to ask questions.",
      "Coming from a social-science background into Informatics changed how I approach technology. I became interested not only in how things work, but also in why they matter, who they serve, and what happens when an idea becomes real.",
      "That curiosity still shapes the work I pursue today.",
    ],
  },
  build: {
    id: "projects",
    number: "02",
    label: "What I build",
    headline: "Ideas are better when they become real.",
    body: [
      "Every project begins with a question. The interesting part is finding a way to turn it into something that works.",
      "From software and AI-driven ideas to research and technical experiments, I enjoy moving between understanding a problem, testing an approach, and building a solution.",
    ],
    region: "building-grounds",
  },
  apply: {
    id: "experience",
    number: "03",
    label: "Applying what I learn",
    headline: "Where ideas meet real-world constraints.",
    body: [
      "Building in practice means working with real people, real limitations, and responsibilities beyond the technical solution.",
      "Each professional and collaborative experience adds a new perspective on how useful systems are built, tested, and improved.",
    ],
    region: "systems-highlands",
  },
  research: {
    id: "research",
    number: "03b",
    label: "Research",
    headline: "Questions, followed through.",
    body: [
      "Research is where I slow down: framing a question carefully, choosing a method that can answer it, and letting the evidence decide.",
    ],
    region: "research-woods",
  },
  together: {
    id: "leadership",
    number: "04",
    label: "Building with others",
    headline: "The best work is rarely built alone.",
    body: [
      "Technical skill is only part of the work. Communication, coordination, leadership, and shared responsibility determine how ideas develop when different people work toward a common goal.",
    ],
    region: "collaboration-grove",
  },
  milestones: {
    id: "achievements",
    number: "05",
    label: "Milestones",
    headline: "Every milestone marks a new beginning.",
    body: [
      "Competitions, recognitions, and challenging projects have pushed me to test what I can do under new constraints. I value them as evidence of effort and as motivation to keep improving.",
    ],
    region: "milestone-summit",
  },
  toolkit: {
    id: "toolkit",
    number: "06",
    label: "Continued learning",
    headline: "The toolkit keeps growing.",
    body: [
      "Every new challenge expands the knowledge, methods, and tools I bring to the next one. Learning is an ongoing part of the building process.",
    ],
    region: "workshop",
  },
  closing: {
    id: "contact",
    number: "07",
    label: "The next destination",
    headline: "There is still more to build.",
    body: [
      "I'm continuing to explore AI, software, research, and technology-driven solutions to real-world problems. I'm interested in thoughtful collaborations, ambitious ideas, and technical challenges worth taking on.",
      "If you're working on something meaningful, let's talk.",
    ],
  },
} satisfies Record<string, Chapter>;

/** Three short principles shown in Chapter One. Values, not claims. */
export const principles = [
  {
    label: "Start with why",
    title: "Questions before code.",
    body: "A social-science starting point taught me to ask who a system serves and why it matters before deciding how to build it.",
  },
  {
    label: "Build to learn",
    title: "Prototypes over promises.",
    body: "An idea becomes clearer once it can be tested. I would rather build a small working version than describe a perfect one.",
  },
  {
    label: "Improve in public",
    title: "Evidence over adjectives.",
    body: "Competitions, research, and feedback are where assumptions get checked. Each result feeds the next iteration.",
  },
];

export const about = {
  headline: "The person behind the map.",
  body: [
    "I'm an Informatics student interested in what happens when technical ideas meet real problems.",
    "My work takes me across software, AI, research, and collaborative projects. I enjoy understanding a challenge, building a solution, testing assumptions, and improving the result.",
    "I see this portfolio as a record of what I am learning, the things I have built, and the directions I am continuing to explore.",
  ],
};

export const contact = {
  eyebrow: "Get in touch",
  headline: "Have a question worth exploring?",
  body: "I'm interested in meaningful technical challenges, ambitious ideas, research conversations, and collaborative projects. If you're building something worth exploring, let's talk.",
  cta: "Let's build something",
};
