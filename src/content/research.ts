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
    id: "pkm-pm-2026",
    slug: "pkm-pm-2026",
    title: "PKM-PM 2026 Community Service Proposal",
    titleNote: "Proposal title to be confirmed",
    summary:
      "A Program Kreativitas Mahasiswa proposal in the community-service funding scheme (PKM-PM), selected as a national delegate of UPN “Veteran” Jawa Timur.",
    date: "Apr 2026",
    institution: "UPN “Veteran” Jawa Timur",
    relatedAchievement: "pkm-pm-2026",
    draft: true,
    todo: ["Proposal title, community partner, and objective", "Funding outcome if announced"],
  },
  {
    id: "kbmk-2026",
    slug: "kbmk-2026",
    title: "KBMK 2026 Research Commercialisation Entry",
    titleNote: "Entry title to be confirmed",
    summary:
      "An entry in the research commercialisation and appropriate technology field of KBMK 2026, sent as a national delegate of UPN “Veteran” Jawa Timur.",
    date: "Apr 2026",
    institution: "UPN “Veteran” Jawa Timur",
    relatedAchievement: "kbmk-2026",
    draft: true,
    todo: ["Title and the technology being commercialised"],
  },
  {
    id: "satria-data-2026",
    slug: "satria-data-2026",
    title: "SATRIA DATA 2026 Statistics Essay",
    titleNote: "Essay title to be confirmed",
    summary: "A statistics essay submitted to the Statistics Essay Competition (SEC) of SATRIA DATA 2026 as a national delegate.",
    date: "Jun 2026",
    methods: ["Statistics"],
    relatedAchievement: "satria-data-2026",
    draft: true,
    todo: ["Essay title, question, and data used"],
  },
  {
    id: "aspire-2026",
    slug: "aspire-2026",
    title: "ASPIRE 2026 Sustainability Essay",
    titleNote: "Essay title to be confirmed",
    summary:
      "An international essay on sustainability that won 2nd place at the ASEAN Sustainability Pioneers Competition (ASPIRE) 2026.",
    date: "Oct 2026",
    institution: "KSM Bioteknologi Universitas Diponegoro & Universiti Malaysia Sabah",
    relatedAchievement: "aspire-2026",
    draft: true,
    todo: ["Essay title and argument in one or two sentences"],
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
