import { ArrowRight, FlaskConical } from "lucide-react";
import Link from "next/link";
import { DraftNote } from "@/components/ui/DraftNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { groupResearch, research, researchStatusLabels } from "@/content/research";
import { chapters, researchCopy } from "@/content/stories";
import type { ResearchEntry } from "@/types/portfolio";

export function ResearchCard({ entry, headingLevel = "h4" }: { entry: ResearchEntry; headingLevel?: "h2" | "h3" | "h4" }) {
  const H = headingLevel;
  return (
    <article className="panel reveal relative flex h-full flex-col p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="grid size-10 place-items-center rounded-lg border-2 border-ink bg-teal-light" aria-hidden>
          <FlaskConical className="size-5" />
        </span>
        {entry.status && <span className="chip bg-mustard">{researchStatusLabels[entry.status]}</span>}
      </div>
      <H className="mt-5 font-display text-xl font-bold leading-tight">
        <Link href={`/research/${entry.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {entry.title}
        </Link>
      </H>
      {entry.titleNote && <p className="mt-1 text-xs text-slate">{entry.titleNote}</p>}
      <p className="mt-3 text-ink-soft">{entry.summary}</p>
      {!!entry.methods?.length && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Methods">
          {entry.methods.map((m) => (
            <li key={m} className="tag">
              {m}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-auto flex items-center gap-2 pt-5 font-display text-sm font-semibold">
        Read more <ArrowRight className="size-4" aria-hidden />
      </p>
      <div className="relative z-10">
        <DraftNote entry={entry} className="mt-4" />
      </div>
    </article>
  );
}

export function ResearchSection() {
  const c = chapters.research;
  const { published, ongoing } = groupResearch(research);
  return (
    <section id={c.id} aria-labelledby="research-title" className="section bg-paper-grid border-t-[2.5px] border-ink">
      <div className="container-atlas">
        <SectionHeading chapter={{ ...c, number: "03" }} id="research-title" />
        {published.length > 0 && (
          <div className="mt-14">
            <h3 className="label mb-4 text-slate">{researchCopy.published}</h3>
            <ul className="grid gap-6 md:grid-cols-2">
              {published.map((r) => (
                <li key={r.id}>
                  <ResearchCard entry={r} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {ongoing.length > 0 && (
          <div className="mt-14">
            <h3 className="label mb-4 text-slate">{researchCopy.ongoing}</h3>
            <ul className="grid gap-6 md:grid-cols-2">
              {ongoing.map((r) => (
                <li key={r.id}>
                  <ResearchCard entry={r} />
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="mt-10">
          <Link href="/research" className="btn btn-secondary">
            {researchCopy.cta} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
}
