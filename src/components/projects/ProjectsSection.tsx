import { SectionHeading } from "@/components/ui/SectionHeading";
import { orderedProjects } from "@/content/projects";
import { chapters } from "@/content/stories";
import { ProjectCarousel } from "./ProjectCarousel";

export function ProjectsSection() {
  const c = chapters.build;
  return (
    <section id={c.id} aria-labelledby="projects-title" className="section border-y-[2.5px] border-ink bg-cream-deep">
      <div className="container-atlas">
        <SectionHeading chapter={c} id="projects-title" />
        <div className="mt-16">
          <ProjectCarousel projects={orderedProjects()} />
        </div>
      </div>
    </section>
  );
}
