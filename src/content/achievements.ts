import type { Achievement, AchievementCategory } from "@/types/portfolio";

/**
 * ACHIEVEMENTS
 * ------------
 * `featured: true` entries appear as large cards; everything appears in the
 * archive list. Add `verificationUrl` (certificate, announcement, news post)
 * whenever possible. Certificate images go in /public/assets/achievements/.
 */
export const achievements: Achievement[] = [
  {
    id: "fit-2026",
    title: "National Web Development Competition — FIT 2026",
    category: "competition",
    result: "1st Runner-up",
    date: "2026",
    featured: true,
    relatedProject: "fit-2026-web-development",
    draft: true,
    todo: ["Organiser and official competition name", "Exact date", "Verification link"],
  },
  {
    id: "pibiti-2026",
    title: "Best Final Project — PIBITI 2026",
    category: "competition",
    result: "1st Winner",
    date: "2026",
    featured: true,
    relatedProject: "pibiti-2026-final-project",
    draft: true,
    todo: ["Programme full name and organiser", "Exact date", "Verification link"],
  },
  {
    id: "koin-2026",
    title: "National Accounting Application Competition — KOIN 2026",
    category: "competition",
    result: "1st Winner",
    date: "2026",
    featured: true,
    relatedProject: "koin-2026-accounting-application",
    draft: true,
    todo: ["Organiser", "Exact date", "Verification link"],
  },
  {
    id: "bintang-mandiri-6",
    title: "Beasiswa Bintang Mandiri — Batch 6",
    category: "scholarship",
    result: "Scholarship awardee",
    draft: true,
    todo: ["Awarding organisation", "Year", "Verification link"],
  },
  {
    id: "google-student-ambassador",
    title: "Google Student Ambassador Programme",
    organiser: "Google",
    category: "programme",
    result: "Selected ambassador",
    draft: true,
    todo: ["Official programme name and cohort", "Period", "Verification link"],
  },
];

export const achievementCategoryLabels: Record<AchievementCategory, string> = {
  competition: "Competition",
  scholarship: "Scholarship",
  programme: "Selection programme",
  recognition: "Recognition",
};
