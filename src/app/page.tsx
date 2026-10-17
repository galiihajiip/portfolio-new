import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/about/ContactSection";
import { StorySection } from "@/components/about/StorySection";
import { AchievementSection } from "@/components/achievements/AchievementSection";
import { ToolkitSection } from "@/components/education/ToolkitSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { LeadershipSection } from "@/components/experience/LeadershipSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { ResearchSection } from "@/components/research/ResearchSection";
import { Hero } from "@/components/world/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StorySection />
      <ProjectsSection />
      <ExperienceSection />
      <ResearchSection />
      <LeadershipSection />
      <AchievementSection />
      <ToolkitSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
