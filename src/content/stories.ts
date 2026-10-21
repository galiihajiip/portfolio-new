import type { Chapter } from "@/types/portfolio";

/** Narrative copy for each homepage chapter. Edit freely. */
export const chapters = {
  beginning: {
    id: "story",
    number: "01",
    label: "The beginning",
    headline: "A different way to approach problems.",
    body: [
      "I moved from a social-science background into Informatics. That transition shaped how I approach technology: understand the context, identify the problem, and consider who the solution is meant to serve.",
      "It is a perspective I bring to the work I choose and the way I develop ideas.",
    ],
  },
  build: {
    id: "projects",
    number: "02",
    label: "What I build",
    headline: "From ideas to working systems.",
    body: [
      "My work spans software, AI, data, and applied technology. Each project is an opportunity to solve a specific problem, explore an approach, and develop something that can be evaluated.",
    ],
    region: "building-grounds",
  },
  apply: {
    id: "experience",
    number: "03",
    label: "Applying what I learn",
    headline: "Where ideas meet real-world constraints.",
    body: [
      "Professional roles put technical skills into practice through team responsibilities, shared priorities, and real working environments.",
      "The entries below document the roles I have held and the contributions I have made.",
    ],
    region: "systems-highlands",
  },
  research: {
    id: "research",
    number: "03b",
    label: "Research",
    headline: "Research, followed through.",
    body: [
      "Research gives structure to curiosity. It requires a clear question, an appropriate method, and conclusions grounded in evidence.",
      "This collection brings together presented work, ongoing studies, and other research contributions, with each project's status clearly identified.",
    ],
    region: "research-woods",
  },
  together: {
    id: "leadership",
    number: "04",
    label: "Building with others",
    headline: "Good work takes a team.",
    body: [
      "Beyond individual projects, I contribute through leadership, mentoring, event delivery, and community initiatives.",
      "These experiences reflect how I work with others, share knowledge, and help turn collective plans into action.",
    ],
    region: "collaboration-grove",
  },
  milestones: {
    id: "achievements",
    number: "05",
    label: "Milestones",
    headline: "Progress, put to the test.",
    body: [
      "Competitions, scholarships, and other recognitions mark the challenges I have taken on and the results achieved along the way.",
      "Each milestone records the outcome and the organisation behind it.",
    ],
    region: "milestone-summit",
  },
  toolkit: {
    id: "toolkit",
    number: "06",
    label: "Continued learning",
    headline: "The toolkit behind the work.",
    body: [
      "My education and training provide the foundation for the projects I take on. Here are the academic experiences, credentials, and capabilities that support my work.",
    ],
    region: "workshop",
  },
  closing: {
    id: "contact",
    number: "07",
    label: "The next destination",
    headline: "The map keeps expanding.",
    body: [
      "I'm continuing to develop my technical skills, contribute to research, and take on new challenges. There is still more to learn, build, and discover.",
    ],
  },
} satisfies Record<string, Chapter>;

/** Three working principles shown in Chapter One. */
export const principles = [
  {
    label: "Understand the context",
    title: "Start with the problem.",
    body: "Identify who needs a solution, what stands in their way, and what a better outcome would look like.",
  },
  {
    label: "Build to test",
    title: "Make ideas tangible.",
    body: "Develop a working version early enough to challenge assumptions and reveal what needs to change.",
  },
  {
    label: "Learn from the result",
    title: "Let evidence guide the next step.",
    body: "Use testing, feedback, and outcomes to decide what to improve, refine, or rethink.",
  },
];

/** Copy for the project carousel in Chapter Two. */
export const projectsCopy = {
  title: "Selected work",
  intro: "Projects across different disciplines, connected by a focus on practical problem-solving.",
  helper: "Swipe, scroll, or use the arrows. Open any card to explore the case study.",
  cta: "View all projects",
};

export const researchCopy = {
  published: "Published & presented",
  ongoing: "Ongoing & unpublished work",
  cta: "Explore the research archive",
};

export const leadershipCopy = {
  current: "Current roles",
  past: "Leadership",
  speaking: "Speaking & knowledge sharing",
  log: "Organisation log",
  communities: "Communities I learn with",
};

export const achievementsCopy = {
  featured: "Featured achievements",
  log: "Full milestone log",
  helper: "Browse achievements by year and recognition type.",
};

export const about = {
  headline: "The person behind the map.",
  body: [
    "I'm Galih Aji Pangestu, an Informatics student at UPN “Veteran” Jawa Timur.",
    "I work across technology, research, and collaborative initiatives. I value clear thinking, practical experimentation, and learning from the process of bringing an idea into reality.",
    "This portfolio brings together the work, responsibilities, and milestones that have shaped my development so far.",
  ],
};

export const contact = {
  eyebrow: "Get in touch",
  headline: "Have something to build?",
  body: "For project collaborations, research discussions, or professional opportunities, reach out through the channels below.",
  cta: "Let's collaborate",
};
