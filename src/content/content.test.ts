import { describe, expect, it } from "vitest";
import { achievements } from "./achievements";
import { capabilities } from "./education";
import { projects } from "./projects";
import { research } from "./research";

const projectSlugs = new Set(projects.map((p) => p.slug));
const researchSlugs = new Set(research.map((r) => r.slug));
const achievementIds = new Set(achievements.map((a) => a.id));

describe("content integrity", () => {
  it("has unique slugs and ids", () => {
    expect(projectSlugs.size).toBe(projects.length);
    expect(researchSlugs.size).toBe(research.length);
    expect(achievementIds.size).toBe(achievements.length);
  });

  it("links achievements to existing projects", () => {
    for (const a of achievements) if (a.relatedProject) expect(projectSlugs, `${a.id} → ${a.relatedProject}`).toContain(a.relatedProject);
  });

  it("links projects to existing achievements", () => {
    for (const p of projects) for (const id of p.relatedAchievements ?? []) expect(achievementIds, `${p.slug} → ${id}`).toContain(id);
  });

  it("links research to existing projects and achievements", () => {
    for (const r of research) {
      if (r.relatedProject) expect(projectSlugs, `${r.slug} → ${r.relatedProject}`).toContain(r.relatedProject);
      if (r.relatedAchievement) expect(achievementIds, `${r.slug} → ${r.relatedAchievement}`).toContain(r.relatedAchievement);
    }
  });

  it("points capability evidence at real pages", () => {
    for (const g of capabilities)
      for (const e of g.evidence ?? []) {
        const [, kind, slug] = e.href.match(/^\/(projects|research)\/(.+)$/) ?? [];
        if (kind === "projects") expect(projectSlugs, e.href).toContain(slug);
        if (kind === "research") expect(researchSlugs, e.href).toContain(slug);
      }
  });
});
