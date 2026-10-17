import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { ProjectArchiveGrid } from "@/components/projects/ProjectArchiveGrid";
import { orderedProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Project archive",
  description: "Every project in The Builder's Atlas: software, AI, research, and data & IoT work by Galih Aji Pangestu.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const list = orderedProjects();
  return (
    <>
      <PageIntro eyebrow={`Region 01 · The Building Grounds · ${list.length} projects`} title="Every project, from first question to working build." back={{ href: "/#projects", label: "Back to the map" }}>
        <p>Each card opens a case study with the problem, the approach, and what I learned. Filter by the kind of work you are interested in.</p>
      </PageIntro>
      <section className="section pt-14" aria-label="Projects">
        <div className="container-atlas">
          <ProjectArchiveGrid projects={list} />
        </div>
      </section>
    </>
  );
}
