import type { Metadata } from "next";
import { PageIntro } from "@/components/layout/PageIntro";
import { ResearchCard } from "@/components/research/ResearchSection";
import { groupResearch, research } from "@/content/research";

export const metadata: Metadata = {
  title: "Research",
  description: "Research projects, collaborations, and publications by Galih Aji Pangestu.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  const { published, ongoing } = groupResearch(research);
  const groups = [
    { title: "Published & presented", items: published },
    { title: "Ongoing & unpublished work", items: ongoing },
  ].filter((g) => g.items.length > 0);
  return (
    <>
      <PageIntro eyebrow="Region 03 · Research Woods" title="Questions, followed through." back={{ href: "/#research", label: "Back to the map" }}>
        <p>Research projects and applied investigations. A status is shown only once it is confirmed.</p>
      </PageIntro>
      <div className="container-atlas space-y-14 py-14">
        {groups.map((g) => (
          <section key={g.title} aria-labelledby={`g-${g.title}`}>
            <h2 id={`g-${g.title}`} className="label mb-4 text-slate">
              {g.title}
            </h2>
            <ul className="grid gap-6 md:grid-cols-2">
              {g.items.map((r) => (
                <li key={r.id}>
                  <ResearchCard entry={r} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
