import type { Experience, ExperienceType, LeadershipRole } from "@/types/portfolio";

/**
 * PROFESSIONAL EXPERIENCE (Systems Highlands)
 * Newest first. Only list responsibilities and outcomes you can stand behind.
 */
export const experience: Experience[] = [
  {
    id: "inlife-telkomsel",
    organisation: "InLife Telkomsel",
    position: "Information Systems Intern",
    type: "internship",
    location: "Surabaya, Indonesia",
    summary:
      "An Information Systems internship applying software and data skills inside a working telecommunications environment.",
    draft: true,
    todo: [
      "Start and end dates",
      "Your team and 3–5 concrete responsibilities",
      "Contributions you can describe publicly",
      "Technologies used",
      "Confirm the official position title",
    ],
  },
];

/**
 * LEADERSHIP & ORGANISATIONS (Collaboration Grove)
 */
export const leadership: LeadershipRole[] = [
  {
    id: "himatif-research-technology",
    organisation: "Informatics Student Association, UPN “Veteran” Jawa Timur",
    position: "Research & Technology leadership",
    scope:
      "Leading the Research and Technology portfolio of the university's Informatics student organisation.",
    draft: true,
    todo: [
      "Official organisation name and your exact title (e.g. Head of Division)",
      "Period",
      "Initiatives you led (workshops, programmes, events)",
      "Team size and how you coordinated it",
    ],
  },
];

export const experienceTypeLabels: Record<ExperienceType, string> = {
  internship: "Internship",
  employment: "Employment",
  "technical-appointment": "Technical appointment",
  "research-role": "Research role",
  collaboration: "Collaboration",
};
