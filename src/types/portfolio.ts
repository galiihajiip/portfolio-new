/**
 * Content schema for The Builder's Atlas.
 *
 * Every optional field is optional on purpose: renderers omit anything that is
 * missing instead of inventing it. `draft` + `todo` mark entries that still need
 * verified details from the owner; they are surfaced only in development.
 */

export type RegionId =
  | "building-grounds"
  | "systems-highlands"
  | "research-woods"
  | "collaboration-grove"
  | "milestone-summit"
  | "workshop";

export type ProjectCategory = "ai" | "software" | "research" | "data-iot";

export type ProjectStatus =
  | "concept"
  | "prototype"
  | "in-progress"
  | "completed"
  | "competition-entry";

export interface ImageAsset {
  /** Path under /public, e.g. "/assets/projects/cogniflip/cover.webp". */
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ExternalLink {
  label: string;
  href: string;
}

export interface DraftMarker {
  /** True while the entry still contains unverified or missing details. */
  draft?: boolean;
  /** Owner-facing notes listing what needs to be supplied. Never shown in production. */
  todo?: string[];
}

export interface CaseStudy {
  overview?: string;
  problem?: string;
  objectives?: string[];
  constraints?: string[];
  role?: string;
  approach?: string[];
  decisions?: { title: string; detail: string }[];
  results?: string[];
  lessons?: string[];
  gallery?: ImageAsset[];
}

export interface Project extends DraftMarker {
  id: string;
  slug: string;
  title: string;
  /** Shown when the public title is still a working name. */
  titleNote?: string;
  category: ProjectCategory;
  /** Display string, e.g. "2026" or "2025 – 2026". */
  year?: string;
  summary: string;
  role?: string;
  technologies?: string[];
  status: ProjectStatus;
  featured?: boolean;
  cover?: ImageAsset;
  /** Only outcomes backed by evidence. */
  verifiedOutcomes?: string[];
  links?: {
    repository?: string;
    demo?: string;
    publication?: string;
    other?: ExternalLink[];
  };
  /** Achievement ids this project is connected to. */
  relatedAchievements?: string[];
  caseStudy?: CaseStudy;
}

export type ExperienceType =
  | "internship"
  | "employment"
  | "technical-appointment"
  | "research-role"
  | "collaboration"
  | "contract"
  | "venture";

export interface Experience extends DraftMarker {
  id: string;
  organisation: string;
  position: string;
  type: ExperienceType;
  location?: string;
  /** e.g. "Remote", "Hybrid", "Part-time". */
  arrangement?: string;
  start?: string;
  end?: string;
  summary?: string;
  responsibilities?: string[];
  contributions?: string[];
  verifiedOutcomes?: string[];
  technologies?: string[];
  links?: ExternalLink[];
  relatedProject?: string;
  logo?: ImageAsset;
}

export type OrganisationKind = "leadership" | "organisation" | "volunteer" | "community";

export interface LeadershipRole extends DraftMarker {
  id: string;
  kind: OrganisationKind;
  /** Featured roles appear as full cards; the rest in the compact log. */
  featured?: boolean;
  organisation: string;
  position: string;
  /** Event or programme the role belonged to, e.g. "PIXEL 2025". */
  event?: string;
  location?: string;
  arrangement?: string;
  start?: string;
  end?: string;
  /** Activities, media, or certificates attached to the role. */
  highlights?: string[];
  scope?: string;
  initiatives?: string[];
  coordination?: string;
  mentoring?: string;
  verifiedOutcomes?: string[];
  links?: ExternalLink[];
}

export type ResearchStatus = "in-progress" | "submitted" | "presented" | "published";

export interface ResearchEntry extends DraftMarker {
  id: string;
  slug: string;
  title: string;
  titleNote?: string;
  summary: string;
  objective?: string;
  role?: string;
  institution?: string;
  collaborators?: string[];
  /** Grant or funding scheme, e.g. "Jatim Melaju". */
  funding?: string;
  methods?: string[];
  /** Only set when verified. Unset renders no status label. */
  status?: ResearchStatus;
  date?: string;
  venue?: string;
  doi?: string;
  links?: ExternalLink[];
  relatedProject?: string;
  relatedAchievement?: string;
}

export type AchievementCategory = "competition" | "scholarship" | "programme" | "recognition" | "delegation";

export interface Achievement extends DraftMarker {
  id: string;
  title: string;
  organiser?: string;
  category: AchievementCategory;
  /** Placement or selection type, e.g. "1st Winner", "Awardee". */
  result: string;
  date?: string;
  context?: string;
  featured?: boolean;
  verificationUrl?: string;
  image?: ImageAsset;
  relatedProject?: string;
}

export interface Certification extends DraftMarker {
  id: string;
  title: string;
  issuer: string;
  issued?: string;
  expires?: string;
  credentialId?: string;
  verificationUrl?: string;
  preview?: ImageAsset;
}

export interface Education extends DraftMarker {
  id: string;
  institution: string;
  programme: string;
  degree?: string;
  field?: string;
  start?: string;
  end?: string;
  location?: string;
  grade?: string;
  details?: string[];
  links?: ExternalLink[];
}

/** Training cohorts, bootcamps, mentoring programmes and industry visits. */
export interface Programme extends DraftMarker {
  id: string;
  title: string;
  organisation: string;
  kind: "training" | "mentoring" | "membership" | "visit";
  location?: string;
  arrangement?: string;
  start?: string;
  end?: string;
  highlights?: string[];
}

export interface CapabilityGroup extends DraftMarker {
  id: string;
  title: string;
  description: string;
  /** Specific tools confirmed by the owner. Empty until supplied. */
  tools: string[];
  /** Project slugs or achievement ids that evidence this capability. */
  evidence?: { label: string; href: string }[];
}

export interface Region {
  id: RegionId;
  index: number;
  title: string;
  theme: string;
  description: string;
  /** Section anchor on the homepage. */
  anchor: string;
  landmark: string;
  /** Position on the fallback illustration, in percent of width/height. */
  illustration: { x: number; y: number };
}

export interface Chapter {
  id: string;
  number: string;
  label: string;
  headline: string;
  body: string[];
  region?: RegionId;
}

/** Talks, moderating, interviews and other knowledge-sharing appearances. */
export interface Talk extends DraftMarker {
  id: string;
  role: "Speaker" | "Moderator" | "Interviewee" | "Panelist" | "Master of Ceremony" | "Facilitator";
  event: string;
  topic: string;
  /** Who it was for, e.g. "New Informatics students". */
  audience?: string;
  organiser?: string;
  location?: string;
  date?: string;
  link?: string;
}
