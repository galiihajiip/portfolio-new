import type { CapabilityGroup, Certification, Education, Programme } from "@/types/portfolio";

/** EDUCATION (The Workshop), newest first. */
export const education: Education[] = [
  {
    id: "unisza",
    institution: "Universiti Sultan Zainal Abidin (UniSZA)",
    programme: "International Academic Mobility Program",
    field: "Computer Science",
    start: "Oct 2026",
    location: "Malaysia",
  },
  {
    id: "upn-veteran-jatim",
    institution: "Universitas Pembangunan Nasional “Veteran” Jawa Timur",
    programme: "Informatics",
    field: "Informatics",
    start: "Aug 2024",
    end: "2028",
    location: "Surabaya, Indonesia",
    draft: true,
    todo: ["Degree name (e.g. S.Kom.) and whether 2028 should read 'expected'"],
  },
  {
    id: "amikom-surakarta",
    institution: "STMIK Amikom Surakarta",
    programme: "Informatics",
    degree: "Alumnus",
    start: "2023",
    end: "2024",
    grade: "GPA 3.80",
    location: "Surakarta, Indonesia",
  },
  {
    id: "dicoding-academy",
    institution: "Dicoding Academy",
    programme: "Online learning",
    start: "2022",
    draft: true,
    todo: ["Which learning paths or classes you completed"],
  },
  {
    id: "sman1-surakarta",
    institution: "SMA Negeri 1 Surakarta",
    programme: "Social Sciences",
    degree: "High School Diploma",
    start: "2020",
    end: "2023",
    location: "Surakarta, Indonesia",
  },
];

/**
 * PROGRAMMES, TRAINING & INDUSTRY VISITS
 * Imported from LinkedIn Experience entries that are cohorts, bootcamps,
 * mentoring programmes, club memberships, or study visits.
 */
export const programmes: Programme[] = [
  {
    id: "asah-dicoding",
    title: "AI Full Stack Developer",
    organisation: "Asah led by Dicoding",
    kind: "training",
    arrangement: "Remote · One-semester intensive independent study",
    start: "Aug 2026",
    highlights: ["Independent study bootcamp"],
  },
  { id: "ibm-skillsbuild", title: "AI Engineer Cohort", organisation: "Pijak in collaboration with IBM SkillsBuild", kind: "training", arrangement: "Contract", start: "Dec 2025" },
  { id: "idcamp", title: "Machine Learning Engineer Trainee", organisation: "Indosat Ooredoo Hutchison Digital Camp", kind: "training", start: "Jul 2025" },
  { id: "dbs-coding-camp", title: "Machine Learning Engineer Trainee", organisation: "Coding Camp powered by DBS Foundation", kind: "training", start: "Jan 2025" },
  { id: "google-cloud-arcade", title: "Google Cloud Arcade Facilitator", organisation: "Google Cloud Arcade Facilitator Program", kind: "training", start: "Jul 2025", highlights: ["Certificate"] },
  { id: "digistar-business", title: "Digital Business Club Member", organisation: "Digistar Club by Telkom Indonesia", kind: "membership", start: "Aug 2025", highlights: ["DigiCourse #4"] },
  { id: "digistar-network", title: "Digital Network Club Member", organisation: "Digistar Club by Telkom Indonesia", kind: "membership", start: "Aug 2025", highlights: ["DigiCourse IoT", "Diner Course"] },
  { id: "digistar-application", title: "Digital Application Club Member", organisation: "Digistar Club by Telkom Indonesia", kind: "membership", start: "Jul 2025", highlights: ["DigiCourse #2", "DigiCourse #3", "DigiWar #1"] },
  { id: "aiesec-delegate", title: "Delegate", organisation: "AIESEC in Surabaya", kind: "membership", start: "Aug 2025", highlights: ["Impact Circle 2.0", "Youth Today"] },
  { id: "180dc-its", title: "Consulting Mentee", organisation: "180 Degrees Consulting — Institut Teknologi Sepuluh Nopember", kind: "mentoring", start: "Aug 2025", end: "Dec 2025", highlights: ["Membership Program", "Networking Space"] },
  { id: "studentsxceos-mentee", title: "Tech & Startup Mentee", organisation: "StudentsxCEOs East Java", kind: "mentoring", arrangement: "Part-time · Remote", start: "Jul 2025", end: "Aug 2025" },
  {
    id: "bmkg-juanda",
    title: "Company Visit",
    organisation: "BMKG Stasiun Meteorologi Kelas I Juanda",
    kind: "visit",
    location: "Sidoarjo, East Java",
    start: "2025",
    end: "2025",
    highlights: ["Organised by BEM Fasilkom UPNVJT 2025"],
    todo: ["Month of the visit"],
  },
  {
    id: "idx-jatim",
    title: "Company Visit",
    organisation: "Bursa Efek Indonesia (IDX) Kantor Perwakilan Jawa Timur",
    kind: "visit",
    location: "Surabaya, East Java",
    start: "2025",
    end: "2025",
    highlights: ["Organised by BEM Fasilkom UPNVJT 2025"],
    todo: ["Month of the visit"],
  },
  { id: "telkom-landmark", title: "Study Excursion", organisation: "PT Telkom Landmark Tower", kind: "visit", location: "Surabaya, East Java", start: "Nov 2024", end: "Jan 2026", highlights: ["Certificate"] },
  { id: "petrokimia", title: "Study Excursion", organisation: "PT Petrokimia Gresik", kind: "visit", start: "Nov 2024", end: "Nov 2024", highlights: ["Certificate"] },
];

export const programmeKindLabels: Record<Programme["kind"], string> = {
  training: "Training",
  mentoring: "Mentoring",
  membership: "Club & delegate",
  visit: "Industry visit",
};

/**
 * CERTIFICATIONS
 * Still empty: LinkedIn only had certificates attached to roles, not a
 * Licenses & Certifications list. Add credentials here; previews go in
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
    description: "Designing and building working applications, tested in national web, hackathon, and application competitions.",
    tools: [],
    evidence: [
      { label: "RADAR", href: "/projects/radar" },
      { label: "KOIN 2026 application", href: "/projects/koin-2026-accounting-application" },
      { label: "PayGent AI", href: "/projects/paygent-ai" },
    ],
    todo: ["Languages and frameworks you use"],
  },
  {
    id: "ai-ml",
    title: "Artificial Intelligence & Machine Learning",
    description: "Exploring how AI can support learning and decision-making, trained through ML engineering and AI engineering cohorts.",
    tools: [],
    evidence: [
      { label: "CogniFlip", href: "/projects/cogniflip" },
      { label: "Maize disease detection", href: "/projects/maize-disease-detection" },
      { label: "SIGAP AI", href: "/projects/sigap-ai" },
    ],
    todo: ["Libraries and models you have worked with"],
  },
  {
    id: "data",
    title: "Data Science & Analytics",
    description: "Preparing, analysing, and modelling data to answer concrete questions.",
    tools: [],
    evidence: [
      { label: "GELAR RASA 2025", href: "/#achievements" },
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
    evidence: [
      { label: "Smart irrigation", href: "/projects/smart-irrigation" },
      { label: "HYCANE", href: "/projects/hycane" },
      { label: "PITERS", href: "/projects/piters" },
    ],
    todo: ["Boards, sensors, and platforms"],
  },
  {
    id: "research",
    title: "Research & Writing",
    description: "Framing questions, choosing methods, and writing them up, from essays to research-funding proposals.",
    tools: [],
    evidence: [{ label: "Research Woods", href: "/#research" }],
    todo: ["Research tools (e.g. reference managers, statistics software)"],
  },
  {
    id: "business",
    title: "Business & Product Thinking",
    description: "Turning ideas into business plans and ventures, and mentoring others on theirs.",
    tools: [],
    evidence: [
      { label: "Ventures", href: "/#experience" },
      { label: "Business plan competitions", href: "/#achievements" },
    ],
    todo: ["Optional: frameworks or tools you use"],
  },
  {
    id: "communication",
    title: "Communication & Public Relations",
    description: "Leading PR divisions, writing content, and managing social media for organisations and events.",
    tools: [],
    evidence: [{ label: "Collaboration Grove", href: "/#leadership" }],
    todo: ["LinkedIn skills mention Copywriting, Social Media, Instagram Marketing; confirm which to list"],
  },
];
