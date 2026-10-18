import type { Achievement, AchievementCategory } from "@/types/portfolio";

/**
 * ACHIEVEMENTS (Milestone Summit)
 * Imported from LinkedIn "Honors & awards", newest first.
 * `featured: true` entries appear as large cards (keep it to ~6); every entry
 * appears in the year-grouped log. Add `verificationUrl` where you can.
 */
export const achievements: Achievement[] = [
  // 2026
  {
    id: "aspire-2026",
    title: "International Essay — ASEAN Sustainability Pioneers Competition (ASPIRE) 2026",
    organiser: "KSM Bioteknologi Universitas Diponegoro & Universiti Malaysia Sabah",
    category: "competition",
    result: "2nd Place",
    date: "Oct 2026",
    featured: true,
  },
  {
    id: "festafora-2026",
    title: "National Business Plan Competition — FESTAFORA 2026",
    organiser: "FORMASI KIP-K “Bela Negara” UPN “Veteran” Jawa Timur",
    category: "competition",
    result: "3rd Place",
    date: "Oct 2026",
  },
  {
    id: "gayatama-2026",
    title: "International Web Technology Competition — GAYATAMA 5.0 2026",
    organiser: "Universitas Negeri Surabaya",
    category: "competition",
    result: "Finalist",
    date: "Oct 2026",
  },
  {
    id: "exploraition-2026",
    title: "48-Hour Hackathon — ExplorAItion Batch 4 2026",
    organiser: "KOMDIGI × Garuda Spark × Ngalup.co",
    category: "competition",
    result: "Most Innovative Product",
    date: "Oct 2026",
    featured: true,
    todo: ["LinkedIn says Batch 3; you confirmed Batch 4. Update LinkedIn too, and check the month"],
  },
  {
    id: "ibc-2026",
    title: "International Business Competition (IBC) 2026",
    organiser: "Universitas Brawijaya",
    category: "competition",
    result: "Top 5 Finalist",
    date: "Oct 2026",
  },
  {
    id: "luminux-2026",
    title: "Business Model Canvas Competition — LUMINUX 2.0 2026",
    organiser: "Himpunan Mahasiswa Manajemen Informatika UNESA",
    category: "competition",
    result: "Top 4 Finalist",
    date: "Oct 2026",
  },
  {
    id: "rise-2026",
    title: "National Business Proposal Competition — RISE 2026",
    organiser: "UKM HIPMI PT UPN “Veteran” Jawa Timur",
    category: "competition",
    result: "Top 5 Finalist",
    date: "Oct 2026",
  },
  {
    id: "fit-2026",
    title: "National Web Development Competition — FIT 2026",
    organiser: "HMPTI UKSW",
    category: "competition",
    result: "1st Runner-up",
    date: "Jul 2026",
    featured: true,
    relatedProject: "fit-2026-web-development",
  },
  {
    id: "indonesianext-2026",
    title: "IndonesiaNEXT — 10th edition",
    organiser: "IndonesiaNEXT",
    category: "programme",
    result: "Top 1000",
    date: "Jun 2026",
    todo: ["LinkedIn lists this under Experience (Jun 2026 – Present) with a certificate"],
  },
  {
    id: "pibiti-2026",
    title: "Best Final Project, Web Development — PIBITI 2026",
    organiser: "Himpunan Mahasiswa Informatika UPN “Veteran” Jawa Timur",
    category: "competition",
    result: "1st Winner",
    date: "Jun 2026",
    relatedProject: "pibiti-2026-final-project",
  },
  {
    id: "koin-2026",
    title: "National Accounting Application Competition — KOIN 2026",
    organiser: "Akuntansi Universitas Sebelas Maret",
    category: "competition",
    result: "1st Winner",
    date: "Jun 2026",
    featured: true,
    relatedProject: "koin-2026-accounting-application",
  },
  {
    id: "playit-2026",
    title: "National Hackathon Web Application — PLAY IT! 2026 (Best Solver)",
    organiser: "Jurusan Teknologi Informasi Politeknik Negeri Malang",
    category: "competition",
    result: "2nd Winner",
    date: "Jun 2026",
  },
  {
    id: "psi-2026",
    title: "Pusat Studi Inovasi (PSI) National Tech Innovation Competition 2026",
    organiser: "Universitas Muhammadiyah Gresik",
    category: "competition",
    result: "3rd Winner",
    date: "Jun 2026",
  },
  {
    id: "satria-data-2026",
    title: "Statistics Essay Competition (SEC) — SATRIA DATA 2026",
    organiser: "UPN “Veteran” Jawa Timur",
    category: "delegation",
    result: "National Delegate",
    date: "Jun 2026",
  },
  {
    id: "antigravity-2026",
    title: "National Hackathon Competition — Google Antigravity 2026",
    organiser: "Google Developer Groups Surabaya",
    category: "competition",
    result: "1st Winner",
    date: "May 2026",
    featured: true,
  },
  {
    id: "itdays-2026",
    title: "National Web Design Competition — IT DAYS 2026",
    organiser: "BEM Fakultas Ilmu Komputer dan Informatika Universitas Nurtanio Bandung",
    category: "competition",
    result: "1st Winner",
    date: "May 2026",
  },
  {
    id: "kbmk-2026",
    title: "KBMK 2026 — Research Commercialisation & Appropriate Technology",
    context: "Kompetisi Ilmu Bisnis, Manajemen, dan Keuangan, Bidang Komersialisasi Riset dan Teknologi Tepat Guna.",
    organiser: "UPN “Veteran” Jawa Timur",
    category: "delegation",
    result: "National Delegate",
    date: "Apr 2026",
  },
  {
    id: "pkm-pm-2026",
    title: "Program Kreativitas Mahasiswa — Community Service Scheme (PKM-PM) 2026",
    organiser: "UPN “Veteran” Jawa Timur",
    category: "delegation",
    result: "National Delegate",
    date: "Apr 2026",
  },
  {
    id: "iyref-2026",
    title: "National Hackathon — IYREF 2026",
    organiser: "SRE ITB",
    category: "competition",
    result: "Semifinalist",
    date: "Apr 2026",
  },
  {
    id: "pidi-2026",
    title: "PIDI Digdaya × Hackathon 2026",
    organiser: "Bank Indonesia",
    category: "competition",
    result: "Top 480 Semifinalist",
    date: "Apr 2026",
  },
  {
    id: "nitro-2026",
    title: "National Hackathon — NITRO 2026",
    organiser: "Himpunan Mahasiswa Teknik Informatika UMP",
    category: "competition",
    result: "Top 6 Finalist",
    date: "Apr 2026",
  },
  {
    id: "findit-2026",
    title: "National Hackathon — Find IT! UGM 2026",
    organiser: "DTETI FT UGM",
    category: "competition",
    result: "Top 26 Semifinalist",
    date: "Mar 2026",
  },
  {
    id: "hackvidia-2026",
    title: "HackVidia — Arkavidia 10.0",
    organiser: "Himpunan Mahasiswa Informatika Institut Teknologi Bandung",
    category: "competition",
    result: "Top 6 Finalist",
    date: "Mar 2026",
  },

  {
    id: "bintang-mandiri-6",
    title: "Beasiswa Bintang Mandiri — Batch 6",
    category: "scholarship",
    result: "Scholarship Awardee",
    date: "2026",
    draft: true,
    todo: ["Awarding organisation and month (not on LinkedIn)"],
  },

  // 2025
  {
    id: "gelar-rasa-2025",
    title: "National Data Science Competition — GELAR RASA 2025",
    organiser: "Himpunan Mahasiswa Sains Data UPN “Veteran” Jawa Timur",
    category: "competition",
    result: "1st Winner",
    date: "Nov 2025",
    featured: true,
    todo: ["LinkedIn media mentions 'Tim Hitam'; add the team name to `context` if you want it shown"],
  },
  {
    id: "studentsxceos-2025",
    title: "Business Case Competition — StudentsxCEOs Global Summit 2025",
    organiser: "StudentsxCEOs East Java",
    category: "competition",
    result: "Top 10 Finalist",
    date: "Nov 2025",
  },
  {
    id: "elevatalks-2025",
    title: "Reward and Recognition (RnR) — Elevatalks 2025",
    organiser: "AIESEC in Surabaya",
    category: "recognition",
    result: "1st RnR Winner",
    date: "Oct 2025",
  },
  {
    id: "impact-circle-2025",
    title: "Impact Circle 2.0 2025",
    organiser: "AIESEC in Surabaya",
    category: "recognition",
    result: "Best Group",
    date: "Oct 2025",
  },
  {
    id: "aws-ug-2025",
    title: "Social Media Challenge — Buka Puasa Meetup AWS UG Surabaya 2025",
    organiser: "AWS User Group Surabaya",
    category: "recognition",
    result: "1st Winner",
    date: "Mar 2025",
  },
  {
    id: "robocamp-2025",
    title: "Best Final Project — ROBOCAMP Vol. 1 2025",
    organiser: "Veteran Robotics UPN “Veteran” Jawa Timur",
    category: "competition",
    result: "Top 5",
    date: "Mar 2025",
  },

  // 2024
  {
    id: "kip-k",
    title: "Kartu Indonesia Pintar Kuliah (KIP-K)",
    context: "A fully funded scholarship programme.",
    organiser: "Kemendikbudristek",
    category: "scholarship",
    result: "Scholarship Awardee",
    date: "Oct 2024",
  },
  {
    id: "gradient-2024",
    title: "Gradient Platform Scholarship",
    context: "A six-month platform scholarship.",
    organiser: "Gradient",
    category: "scholarship",
    result: "Scholarship Awardee",
    date: "Feb 2024",
  },
  {
    id: "osn-at-2024",
    title: "Olimpiade Sains Nasional — Awal Tahun (OSN-AT) 2024, English",
    context: "Organised by FOSNAT under Yayasan Berlian Hati Mulia and Pusat Kejuaraan Sains Nasional (PUSKANAS).",
    organiser: "Festival Olimpiade Sains Nasional (FOSNAT)",
    category: "competition",
    result: "Gold Medal",
    date: "Jan 2024",
  },
  {
    id: "pesona-2024",
    title: "Pekan Sains & Olimpiade Nasional (PESONA) 2024, English",
    organiser: "Yayasan Prestasi Maju Indonesia (PRESMANESIA)",
    category: "competition",
    result: "Gold Medal",
    date: "Jan 2024",
  },

  // 2023
  {
    id: "indoneris-2023",
    title: "Essay — Indoneris National IT Competition 2023",
    organiser: "Universitas Amikom Purwokerto",
    category: "competition",
    result: "Honorable Mention 1",
    date: "Dec 2023",
  },

];

export const achievementCategoryLabels: Record<AchievementCategory, string> = {
  competition: "Competition",
  scholarship: "Scholarship",
  programme: "Selection programme",
  recognition: "Recognition",
  delegation: "Delegation",
};

/** Groups achievements by the four-digit year in `date`, newest first. */
export const achievementsByYear = (list: Achievement[] = achievements) => {
  const groups = new Map<string, Achievement[]>();
  for (const a of list) {
    const year = a.date?.match(/\d{4}/)?.[0] ?? "Undated";
    groups.set(year, [...(groups.get(year) ?? []), a]);
  }
  return [...groups.entries()].sort(([a], [b]) => (b === "Undated" ? -1 : a === "Undated" ? 1 : Number(b) - Number(a)));
};
