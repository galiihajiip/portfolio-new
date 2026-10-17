/**
 * Central site configuration.
 *
 * Every personal link lives here. Leave a value as `null` until you have the
 * real one: components hide links that are not configured instead of
 * rendering dead or invented URLs.
 */

export interface SocialLink {
  id: "linkedin" | "github" | "scholar" | "orcid" | "instagram" | "website";
  label: string;
  href: string | null;
}

export const siteConfig = {
  name: "Galih Aji Pangestu",
  brand: "GAPZ.",
  title: "The Builder's Atlas",
  /** Short professional positioning used in the hero and metadata. */
  positioning:
    "Informatics student and emerging technology builder exploring AI, software engineering, research, data, and product innovation.",
  tagline: "Informatics · AI · Software · Research",
  institution: "UPN “Veteran” Jawa Timur",
  location: "Surabaya, Indonesia",

  /**
   * Public production URL, used for canonical links, the sitemap and Open
   * Graph. Set NEXT_PUBLIC_SITE_URL in your hosting environment.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://galihajipangestu.vercel.app").replace(/\/$/, ""),

  /** TODO(owner): your public contact email. */
  email: null as string | null,

  /** TODO(owner): fill in the profile URLs you want to show. */
  socials: [
    { id: "linkedin", label: "LinkedIn", href: null },
    { id: "github", label: "GitHub", href: "https://github.com/galiihajiip" },
    { id: "scholar", label: "Google Scholar", href: null },
  ] satisfies SocialLink[] as SocialLink[],

  /** Optional downloadable CV in /public, e.g. "/cv/galih-aji-pangestu.pdf". */
  cvPath: null as string | null,

  /** Optional profile photo in /public/assets/profile. */
  avatar: null as { src: string; alt: string } | null,

  /**
   * SEO. `seoTitle` is the homepage <title>: lead with the exact name people
   * search for. Set GOOGLE_SITE_VERIFICATION in Vercel to verify Search Console.
   */
  seoTitle: "Galih Aji Pangestu — Informatics Student, AI & Software Builder",
  seoDescription:
    "Galih Aji Pangestu (GAPZ.) is an Informatics student at UPN “Veteran” Jawa Timur building AI, software, and research projects. Explore projects, experience, awards, and how to get in touch.",
  alternateNames: ["GAPZ", "Galih Aji", "Galih Pangestu", "galiihajiip"],
  jobTitle: "Informatics Student & Technology Builder",
  knowsAbout: ["Artificial Intelligence", "Machine Learning", "Software Engineering", "Web Development", "Data Science", "Internet of Things", "Research"],

  hero: {
    eyebrow: "The Builder's Atlas · Galih Aji Pangestu",
    headline: ["I build things", "to see how far", "an idea can go."],
    copy: "Curiosity led me into Informatics. Today, I explore AI, software, research, and product development by turning questions into things that can be tested, improved, and used.",
    primaryCta: { label: "Explore my work", href: "#projects" },
    secondaryCta: { label: "Let's collaborate", href: "#contact" },
    microcopy: "Choose a region on the map or scroll down to follow the story.",
  },

  features: {
    /** Set to false to always show the illustrated map instead of WebGL. */
    interactiveMap: true,
  },
} as const;

export const configuredSocials = () => siteConfig.socials.filter((s): s is SocialLink & { href: string } => !!s.href);

export const isDev = process.env.NODE_ENV === "development";
