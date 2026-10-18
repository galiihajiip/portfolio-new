import type { ResearchEntry, ResearchStatus } from "@/types/portfolio";

/**
 * RESEARCH (Research Woods)
 * Set `status` only when it is verified; entries without a status show none.
 * Never add a DOI, venue, or acceptance decision you cannot link to.
 */
export const research: ResearchEntry[] = [
  {
    id: "maize-disease-research",
    slug: "maize-disease-detection",
    title: "Computer Vision for Maize Plant Disease Detection",
    titleNote: "Working title",
    summary:
      "Training a computer vision model on thousands of plant images to detect diseases in maize. A funded collaboration between the Faculty of Computer Science and the Faculty of Agriculture, working toward a Scopus-indexed publication.",
    objective: "Detect maize plant diseases from images so problems can be identified earlier in the field.",
    methods: ["Computer vision", "Deep learning", "Image dataset"],
    institution: "Faculty of Computer Science × Faculty of Agriculture, UPN “Veteran” Jawa Timur",
    status: "in-progress",
    date: "2026",
    relatedProject: "maize-disease-detection",
    draft: true,
    todo: ["Funder", "Co-authors", "Model and dataset details"],
  },
  {
    id: "smart-irrigation-research",
    slug: "smart-irrigation-system",
    title: "IoT Smart Irrigation and Monitoring Dashboard for Automated Farming",
    titleNote: "Working title",
    summary:
      "A community service research project that uses IoT sensors and a monitoring dashboard to automate irrigation, funded by LPPM UPN “Veteran” Jawa Timur with lecturers from the Faculty of Agriculture, working toward a Scopus-indexed publication.",
    objective: "Automate irrigation from sensor readings and make field conditions visible through a dashboard.",
    methods: ["Internet of Things", "Sensor monitoring", "Dashboard"],
    institution: "Faculty of Agriculture, UPN “Veteran” Jawa Timur",
    funding: "LPPM UPN “Veteran” Jawa Timur (community service scheme)",
    status: "in-progress",
    date: "2026",
    relatedProject: "smart-irrigation",
    draft: true,
    todo: ["Co-authors", "Hardware and stack"],
  },
  {
    id: "isrm-2026",
    slug: "isrm-2026",
    title:
      "Ethical Web Scraping of Southeast Asian Food Composition Databases: An Automated Pipeline for Extracting and Harmonizing TKPI and MyFCD Nutritional Data",
    summary:
      "An automated, ethical web-scraping pipeline that extracts nutritional data from Indonesia's food composition table (TKPI) and the Malaysian Food Composition Database (MyFCD) and harmonises it into one comparable dataset. Part of a Jatim Melaju–funded research project led by lecturers of the Department of Informatics, which I was invited to join; I presented it as first author at the 11th International Seminar of Research Month (ISRM) 2026. The wider project is working toward a Scopus-indexed journal article.",
    objective:
      "Build an automated pipeline that collects Southeast Asian food composition data responsibly and harmonises the TKPI and MyFCD datasets so their nutritional values can be compared and reused.",
    methods: ["Ethical web scraping", "Data extraction pipeline", "Data harmonisation"],
    role: "First author & oral presenter",
    institution: "Department of Informatics, Faculty of Computer Science, UPN “Veteran” Jawa Timur",
    collaborators: ["Intan Yuniar Purbasari, S.Kom., M.Sc.", "Fetty Tri Anggraeny, S.Kom., M.Kom."],
    funding: "Jatim Melaju research funding",
    venue: "11th International Seminar of Research Month (ISRM) 2026 · Virtual, 22–23 September 2026",
    status: "presented",
    date: "Sep 2026",
    draft: true,
    todo: [
      "Track: Science & Engineering or Social Sciences & Humanities",
      "Official full name of the Jatim Melaju funding scheme, if different",
      "Check the objective wording; add tools (e.g. Python libraries) to `methods`",
      "Key results, e.g. number of foods harmonised (only if stated in the paper)",
      "Proceedings link or DOI once published (then status can become 'published')",
    ],
  },
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
