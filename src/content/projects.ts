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
const gh = (repo: string) => `https://github.com/galiihajiip/${repo}`;

export const projects: Project[] = [
  // ---------------------------------------------------------------- Featured
  {
    id: "cogniflip",
    slug: "cogniflip",
    title: "CogniFlip",
    category: "ai",
    year: "2026",
    summary:
      "An interactive programming-education platform for primary-school children (grades 4–6) built on reverse tutoring: children learn by teaching an AI learner, with deterministic rubric assessment and client-side code intelligence.",
    role: "Solo developer",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Google Gemini", "PostgreSQL"],
    status: "competition-entry",
    featured: true,
    links: { repository: gh("cogniflip-ai") },
    caseStudy: {
      overview:
        "CogniFlip (“Flip the Way You Learn”) is an independent innovation entry for the M-ONE Telkomsel Coding Competition 2026, General category, sub-theme Web Education for Kids. It flips the usual tutoring model: the child takes the role of the tutor and explains programming ideas to an AI learner, which turns explanation into an active part of learning.",
      objectives: [
        "Make explaining an idea a deliberate part of how young learners practise programming.",
        "Assess answers with a deterministic rubric so feedback stays consistent and explainable.",
        "Keep code analysis on the client side and isolated, for safety and speed.",
      ],
    },
    todo: ["Competition result, if any", "Screenshots", "Live demo URL"],
  },
  {
    id: "radar",
    slug: "radar",
    title: "RADAR",
    category: "software",
    year: "2026",
    summary:
      "Rapid AI Damage Assessment and Response: citizens report damaged buildings after a disaster with a photo and GPS location, AI gives a first damage estimate, and operators validate it before aid is prioritised. 1st Runner-up at the National Web Development FIT Competition 2026.",
    role: "Team PREKETEK",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "PostGIS", "AI image assessment"],
    status: "competition-entry",
    featured: true,
    relatedAchievements: ["fit-2026"],
    links: { repository: gh("RADAR-PREKETEK"), demo: "https://radar-upnvjt.vercel.app" },
    caseStudy: {
      overview:
        "Built by team PREKETEK for FIT Competition 2026, Track I: Natural Disasters (website development). RADAR runs on a real Supabase PostgreSQL + PostGIS database rather than in-memory demo data.",
      approach: [
        "Residents submit a report with a photo and GPS coordinates.",
        "AI provides an initial estimate of the damage level.",
        "Operators validate, override, or reject the estimate before aid is prioritised.",
      ],
    },
    todo: ["Your role in the team", "Which AI model or service estimates damage", "Screenshots"],
  },
  {
    id: "paygent-ai",
    slug: "paygent-ai",
    title: "PayGent AI",
    category: "ai",
    year: "2026",
    summary:
      "Bill a client in one sentence and get a payment link in seconds. PayGent turns natural-language requests into invoices and Doku payment links for freelancers and small businesses. Won Best Final Project, Web Development (1st Winner) at PIBITI 2026.",
    technologies: ["Laravel", "PHP", "TypeScript", "Doku payments", "LLM"],
    status: "competition-entry",
    featured: true,
    relatedAchievements: ["pibiti-2026"],
    links: {
      repository: gh("paygent-ai"),
      demo: "https://paygent-ai.vercel.app",
      other: [{ label: "OpenClaw Agenthon version", href: gh("OpenClaw2026_GalihAjiPangestu_PayGent") }],
    },
    caseStudy: {
      overview:
        "PayGent AI is a smart billing app: a user types something like “bill HIMATIFA for the remaining balance of their website order” and PayGent drafts the invoice and generates a Doku payment link. The Laravel version was the PIBITI 2026 submission; an earlier version was built in 12 hours for OpenClaw Agenthon Indonesia 2026 as a Best Payment Use Case submission.",
      problem:
        "Freelancers spend hours every week writing invoices by hand, copying client details, and chasing payments.",
    },
    todo: ["Screenshots", "OpenClaw Agenthon result, if any"],
  },
  {
    id: "pacul",
    slug: "pacul",
    title: "PACUL",
    category: "software",
    year: "2026",
    summary:
      "Platform Aksi Komunitas Untuk Lingkungan: a Surabaya-first community platform that turns verified green actions into measurable impact, EcoPoints, and rewards from local small businesses. Finalist at GAYATAMA 5.0 2026.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Leaflet", "Recharts", "Zustand", "PWA"],
    status: "competition-entry",
    featured: true,
    relatedAchievements: ["gayatama-2026"],
    links: {
      repository: gh("pacul-gayatama"),
      demo: "https://pacul-gayatama.vercel.app",
      other: [
        { label: "PEKAN IT 2026 version", href: "https://pacul-upnvjt.vercel.app" },
        { label: "Web Design Competition 2026 version", href: "https://pacul-titiknadir.vercel.app" },
      ],
    },
    caseStudy: {
      overview:
        "PACUL is a progressive web app that helps local communities act on climate change by combining gamification, AI, and data visualisation. It was developed and refined across several competitions: GAYATAMA 5.0 2026 (Finalist), the National PEKAN IT Competition 2026 (team 3 Sushi Rolls), and a Web Design Competition 2026 (team Titik Nadir).",
      objectives: [
        "Let residents track the carbon footprint of everyday activities.",
        "Reward verified green actions with EcoPoints redeemable at local small businesses.",
      ],
    },
    todo: ["Is the Web Design Competition 2026 version the IT DAYS 2026 winner?", "Your role and teammates", "Screenshots"],
  },
  {
    id: "lentera",
    slug: "lentera",
    title: "LENTERA",
    category: "ai",
    year: "2026",
    summary:
      "A culturally adaptive AI study companion that explains dense academic material through Indonesian cultural analogies, with dyslexia-friendly reading and interactive micro-quizzes.",
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS", "Google Gemini", "Zustand"],
    status: "competition-entry",
    featured: true,
    relatedAchievements: ["nitro-2026"],
    links: { repository: gh("lentera"), demo: "https://lentera-id.vercel.app" },
    todo: ["Confirm this was the NITRO 2026 entry (repo is tagged nitro-2026)", "Screenshots"],
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
  // ------------------------------------------------------------ AI & ML
  {
    id: "kalika",
    slug: "kalika",
    title: "KALIKA",
    category: "ai",
    year: "2026",
    summary:
      "A culturally aware AI study companion for neurodivergent learners: academic concepts explained through 50+ cultural lenses with accessible, dyslexia-friendly output. Built for the GDG UTSC AI Case Competition 2026.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Google Gemini 2.5 Flash"],
    status: "competition-entry",
    links: { repository: gh("kalika"), demo: "https://kalika-edu.vercel.app" },
  },
  {
    id: "sigap-ai",
    slug: "sigap-ai",
    title: "SIGAP AI",
    category: "ai",
    year: "2026",
    summary:
      "A smart traffic management platform with real-time intersection simulation, congestion prediction, AI-assisted signal-timing recommendations, and an operator dashboard with decision logging.",
    technologies: ["FastAPI", "React", "Vite", "scikit-learn", "XGBoost", "TensorFlow"],
    status: "prototype",
    links: { repository: gh("sigap-ai"), demo: "https://sigap-ai-id.vercel.app" },
    todo: ["Built for a competition? If so, which one"],
  },
  {
    id: "aijarin",
    slug: "aijarin",
    title: "AIjarin",
    category: "ai",
    year: "2026",
    summary:
      "A gamified, AI-powered learning platform for students on affirmative-admission pathways, piloted at SMA Negeri 20 Surabaya. Students play SIGMA agents who learn computational logic while defeating the ERROR-X virus.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Claude Haiku", "Recharts"],
    status: "prototype",
    links: { repository: gh("AIjarin") },
    todo: ["Pilot outcome or status", "Competition or programme it was built for"],
  },
  {
    id: "agrowth",
    slug: "agrowth",
    title: "AGROWTH",
    category: "ai",
    year: "2026",
    summary:
      "A hybrid planting-recommendation system for Java that combines traditional Pranata Mangsa knowledge, real-time weather forecasts, an ensemble ML model, and AI explanations in Javanese to support farmers' planting decisions.",
    technologies: ["Machine learning ensemble", "Google Gemini", "Docker"],
    status: "prototype",
    links: { repository: gh("AGROWTH"), demo: "https://agrowth-orcin.vercel.app" },
    todo: ["Competition it was built for, if any"],
  },
  {
    id: "telepati-agridata",
    slug: "telepati-agridata",
    title: "Rice Disease Detection — TELEPATI 8.0",
    category: "ai",
    year: "2026",
    summary:
      "Object detection for 11 classes of rice plant disease, trained from scratch without external pretrained weights for the TELEPATI 8.0 AgriData Intelligence Race, documented as a full research notebook from dataset audit to error analysis.",
    technologies: ["Python", "PyTorch", "Ultralytics YOLO", "Jupyter"],
    status: "competition-entry",
    links: { repository: gh("agridata-telepati") },
    todo: ["Result in TELEPATI 8.0, if announced"],
  },
  {
    id: "catatduit-ai",
    slug: "catatduit-ai",
    title: "CatatDuit AI",
    category: "ai",
    year: "2026",
    summary:
      "A personal-finance dashboard that reads shopping receipts with OCR, categorises the transactions, and stores them for tracking.",
    technologies: ["Next.js", "Tesseract.js OCR", "Supabase"],
    status: "prototype",
    links: { repository: gh("catatduit-ai"), demo: "https://catatduit-ai.vercel.app" },
    todo: ["Was this the KOIN 2026 accounting application? If yes, I'll merge the two entries"],
  },
  {
    id: "tulis-in",
    slug: "tulis-in",
    title: "Tulis.in",
    category: "ai",
    year: "2026",
    summary:
      "An ethical paraphrasing aid focused on clarity, style, and proper citation, designed to help people write better rather than to evade AI detectors.",
    technologies: ["Next.js", "TypeScript", "OpenAI API", "Prisma", "Supabase"],
    status: "prototype",
    links: { repository: gh("tulis.in") },
  },
  {
    id: "raksha-ai",
    slug: "raksha-ai",
    title: "Raksha AI",
    category: "ai",
    year: "2025",
    summary:
      "A 24/7 AI health-triage web app for Indonesia with explainable risk assessment, seasonal and regional prioritisation, a low-bandwidth mode, and WhatsApp/SMS bot integration.",
    technologies: ["Next.js", "Google Gemini", "Prisma", "Recharts"],
    status: "prototype",
    links: { repository: gh("raksha-ai"), demo: "https://raksha-triage-ai.vercel.app" },
  },
  {
    id: "kriya-ai",
    slug: "kriya-ai",
    title: "KRIYA.AI",
    category: "ai",
    year: "2025",
    summary:
      "A marketplace and digital catalogue for traditional Indonesian crafts that uses visual AI to explore, explain, and promote regional weaving and craft motifs.",
    technologies: ["React", "Vite", "Google Gemini", "Zustand"],
    status: "prototype",
    links: { repository: gh("kriya.ai"), demo: "https://kriya-ai-one.vercel.app" },
  },
  {
    id: "umkm-financial-copilot",
    slug: "umkm-financial-copilot",
    title: "AI Financial Co-Pilot for UMKM",
    category: "ai",
    year: "2025",
    summary:
      "An AI financial assistant for Indonesian micro and small businesses, built for the IMPHNEN × KOLOSAL AI Hackathon 2025 on inclusive AI for local businesses.",
    technologies: ["Next.js", "Google Gemini", "Prisma"],
    status: "competition-entry",
    links: { repository: gh("imphnen") },
  },
  // ------------------------------------------------------------ Data & IoT
  {
    id: "hycane",
    slug: "hycane",
    title: "HYCANE",
    category: "data-iot",
    year: "2026",
    summary:
      "Guided hydroponics for beginners: sensors read the system, the app explains what is happening, recommends what to do, and links to the supplies needed. Demo for the FESTAFORA 2026 business plan competition (3rd place), backed by a social-listening study.",
    technologies: ["JavaScript", "Chart.js", "Social listening"],
    status: "competition-entry",
    relatedAchievements: ["festafora-2026"],
    links: {
      repository: gh("hycane"),
      demo: "https://hycane.vercel.app",
      other: [{ label: "Social-listening research", href: "https://scraping-hycane.vercel.app" }],
    },
  },
  {
    id: "canebiokit",
    slug: "canebiokit",
    title: "CaneBioKit",
    category: "data-iot",
    year: "2026",
    summary:
      "A demo dashboard for a biodegradable sugarcane-bagasse growing matrix with beneficial root-zone microbes, monitored by an ESP32 for pH, EC, and water level. Sensor data in the demo is simulated.",
    technologies: ["Next.js", "TypeScript", "ESP32 (concept)"],
    status: "concept",
    links: { repository: gh("canebiokit"), demo: "https://canebiokit.vercel.app" },
  },
  {
    id: "piters",
    slug: "piters",
    title: "PITERS",
    category: "data-iot",
    year: "2026",
    summary:
      "A health-monitoring dashboard for a smart sensor necklace (MAX30102 PPG and MPU6050 accelerometer) showing heart rate, blood oxygen, and family-member monitoring. Data in the prototype is simulated.",
    technologies: ["Next.js", "Recharts", "IoT sensors (concept)"],
    status: "prototype",
    links: { repository: gh("piters") },
  },
  // ------------------------------------------------------- Software & research
  {
    id: "tumbuh",
    slug: "tumbuh",
    title: "TUMBUH",
    category: "software",
    year: "2026",
    summary:
      "Telkomsel untuk UMKM Tumbuh: a functional prototype for the Telkomsel Business Case Competition that orchestrates Telkomsel's digital ecosystem so small businesses get measurable growth, not just app installs.",
    technologies: ["HTML", "JavaScript"],
    status: "competition-entry",
    links: { repository: gh("TUMBUH") },
  },
  {
    id: "halo-kampus",
    slug: "halo-kampus",
    title: "Telkomsel Halo Kampus",
    category: "software",
    year: "2026",
    summary:
      "A number-ordering and inventory system that lets university students browse, reserve, and order Telkomsel Halo numbers with campus data packages, without conflicts between online orders and campus sales teams.",
    technologies: ["Next.js", "TypeScript", "Supabase"],
    status: "prototype",
    links: { repository: gh("halo") },
    todo: ["Built during the Telkomsel internship? Confirm it's fine to show publicly"],
  },
  {
    id: "signal-quest",
    slug: "signal-quest",
    title: "Signal Quest",
    category: "software",
    year: "2026",
    summary:
      "A Telkomsel market-research survey for Surabaya university students packaged as a 2D adventure game so respondents don't skip it, with an analytics dashboard for the research team.",
    technologies: ["Next.js 15", "Supabase", "Zustand", "Recharts", "PWA"],
    status: "prototype",
    links: { repository: gh("inlife-b") },
    todo: ["Built during the Telkomsel internship? Confirm it's fine to show publicly"],
  },
  {
    id: "sod-market-research",
    slug: "sod-market-research",
    title: "SOD Surabaya Market Research Pipeline",
    category: "research",
    year: "2026",
    summary:
      "A reproducible pipeline that turns public Instagram comments from the SOD Surabaya event into market research (sentiment, intent, topics, engagement) for a Telkomsel starter-card sales programme.",
    technologies: ["Python", "pandas", "scikit-learn", "matplotlib"],
    status: "completed",
    links: { repository: gh("scraping-sod") },
    todo: ["Confirm status and that it's fine to show publicly"],
  },
  {
    id: "upn-alumni-scraper",
    slug: "upn-alumni-scraper",
    title: "UPN Informatics Alumni Data Collector",
    category: "research",
    year: "2026",
    summary:
      "A data-collection system for profiles of UPN “Veteran” Jawa Timur Informatics alumni (2004–2026), storing results in PostgreSQL for analysis.",
    technologies: ["TypeScript", "Playwright", "PostgreSQL", "Prisma"],
    status: "prototype",
    links: { repository: gh("scraper-alumni") },
    todo: ["Purpose (e.g. tracer study for the department)", "Confirm it complies with the platform's terms before featuring it"],
  },
  {
    id: "gelar-rasa-2025",
    slug: "gelar-rasa-2025",
    title: "GELAR RASA 2025 Data Science Entry",
    titleNote: "Project title to be confirmed",
    category: "research",
    year: "2025",
    summary: "The data science notebook behind the 1st-place win at the National Data Science Competition GELAR RASA 2025.",
    technologies: ["Python", "Jupyter"],
    status: "competition-entry",
    relatedAchievements: ["gelar-rasa-2025"],
    links: { repository: gh("gelarrasa") },
    draft: true,
    todo: ["Problem, dataset, and approach", "Team (LinkedIn mentions Tim Hitam)"],
  },
  {
    id: "seapedia",
    slug: "seapedia",
    title: "SEAPEDIA",
    category: "software",
    year: "2026",
    summary: "A multi-role e-commerce marketplace for buyers, sellers, drivers, and admins in one ecosystem, built for COMPFEST 18.",
    technologies: ["TypeScript", "Prisma", "PostgreSQL", "Docker"],
    status: "competition-entry",
    links: { repository: gh("SEAPEDIA") },
  },
  {
    id: "circularfund",
    slug: "circularfund",
    title: "CircularFund",
    category: "software",
    year: "2026",
    summary:
      "A funding platform that connects small businesses practising the circular economy with investors, using AI to score circular readiness and credibility.",
    technologies: ["TypeScript", "AI scoring"],
    status: "in-progress",
    links: { repository: gh("CircularFunds"), demo: "https://circular-funds.vercel.app" },
  },
  {
    id: "stuntcare",
    slug: "stuntcare",
    title: "STUNTCARE",
    category: "software",
    year: "2026",
    summary:
      "A stunting-prevention platform for Posyandu health volunteers and parents to track child growth in real time using WHO z-score standards.",
    technologies: ["Next.js", "Supabase", "Recharts"],
    status: "prototype",
    links: { repository: gh("stuntcare") },
  },
  {
    id: "ekspor-in",
    slug: "ekspor-in",
    title: "Ekspor.in",
    category: "software",
    year: "2025",
    summary:
      "An export-readiness evaluation platform that helps Indonesian small businesses understand compliance gaps, destination-market requirements, and product readiness before they export.",
    technologies: ["TypeScript"],
    status: "prototype",
    links: { repository: gh("ekspor.in") },
  },
  {
    id: "coplace",
    slug: "coplace",
    title: "COPLACE",
    category: "software",
    year: "2025",
    summary:
      "A marketplace for local Indonesian coffee with an AI barista for health insights and coffee storytelling, plus real-time community threads.",
    technologies: ["React", "Vite", "Firebase", "Google Gemini", "Framer Motion"],
    status: "prototype",
    links: { repository: gh("coplace"), demo: "https://coplace.vercel.app" },
  },
  {
    id: "sukunergy-store",
    slug: "sukunergy-store",
    title: "SUKUNERGY Store",
    category: "software",
    year: "2025",
    summary:
      "The e-commerce MVP for SUKUNERGY, a healthy, high-protein breadfruit (sukun) bar brand, where I serve as CTO.",
    technologies: ["Next.js", "Prisma", "Tailwind CSS"],
    status: "prototype",
    links: { repository: gh("sukunergy"), demo: "https://sukunergy.vercel.app" },
  },
  {
    id: "ekraf-himatifa",
    slug: "ekraf-himatifa",
    title: "Ekraf HIMATIFA E-Commerce",
    category: "software",
    year: "2026",
    summary:
      "A unified e-commerce platform for the Creative Economy department of HIMATIFA UPN “Veteran” Jawa Timur covering digital services, merchandise, food sales, and printing.",
    technologies: ["Next.js", "Supabase", "Tailwind CSS"],
    status: "prototype",
    links: { repository: gh("ekraf-himatifa"), demo: "https://ekraf-himatifa.vercel.app" },
  },
  {
    id: "dcn-upnvjt",
    slug: "dcn-upnvjt",
    title: "DCN UPNVJT Gen AI Learning Path",
    category: "software",
    year: "2025",
    summary:
      "The landing page for the Dicoding Community Network at UPN “Veteran” Jawa Timur's Gen AI Engineer learning path, with contributor registration.",
    technologies: ["HTML", "CSS", "JavaScript"],
    status: "completed",
    links: { repository: gh("dcnupnvjt"), demo: "https://dcnupnvjt.vercel.app" },
  },
  {
    id: "twogather",
    slug: "twogather",
    title: "TWO-GATHER",
    category: "software",
    year: "2025",
    summary:
      "The campaign website for a Vietnam fair-labour youth initiative, the final project of AIESEC Future Leaders Winter Peak 2025.",
    technologies: ["HTML", "CSS", "JavaScript"],
    status: "completed",
    links: { repository: gh("twogather"), demo: "https://twogather.vercel.app" },
  },
  {
    id: "voidnet",
    slug: "voidnet",
    title: "VOIDNET",
    category: "software",
    year: "2025",
    summary: "A cyberpunk multiplayer strategy game with real-time movement, procedural maps, and a WebSocket game server.",
    technologies: ["Python", "Pygame", "FastAPI", "WebSockets"],
    status: "prototype",
    links: { repository: gh("voidnet") },
  },
  // ------------------------------------------------- Not on GitHub yet
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
