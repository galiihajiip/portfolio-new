import { Briefcase, ChevronDown, MapPin } from "lucide-react";
import { DraftNote } from "@/components/ui/DraftNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { experience, experienceTypeLabels } from "@/content/experience";
import { chapters } from "@/content/stories";
import { formatRange } from "@/lib/utils";
import type { Experience } from "@/types/portfolio";

function List({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="label mb-2 text-slate">{title}</p>
      <ul className="space-y-1.5">
        {items.map((r) => (
          <li key={r} className="flex gap-2.5 text-ink-soft">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-teal" aria-hidden />
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExperienceEntry({ entry, index }: { entry: Experience; index: number }) {
  const range = formatRange(entry.start, entry.end);
  const details = [entry.responsibilities, entry.contributions, entry.verifiedOutcomes].flat().filter(Boolean).length;
  const long = details > 4;
  const body = (
    <div className="mt-5 space-y-5">
      <List title="Responsibilities" items={entry.responsibilities} />
      <List title="Contributions" items={entry.contributions} />
      <List title="Outcomes" items={entry.verifiedOutcomes} />
    </div>
  );
  return (
    <li className="relative grid gap-4 md:grid-cols-[11rem_1fr] md:gap-8">
      <div className="flex items-center gap-3 md:flex-col md:items-end md:pt-5 md:text-right">
        <span className="chip bg-mustard">{range ?? experienceTypeLabels[entry.type]}</span>
        <span className="label text-slate">Expedition {String(index + 1).padStart(2, "0")}</span>
      </div>
      <article className="panel reveal p-6 md:p-7">
        <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-slate">
          <span className="flex items-center gap-1.5 text-ink">
            <Briefcase className="size-3.5" aria-hidden /> {entry.organisation}
          </span>
          {entry.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" aria-hidden /> {entry.location}
            </span>
          )}
          {range && <span className="text-teal">{experienceTypeLabels[entry.type]}</span>}
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">{entry.position}</h3>
        {entry.summary && <p className="mt-3 max-w-3xl text-ink-soft">{entry.summary}</p>}
        {long ? (
          <details className="group mt-4">
            <summary className="flex cursor-pointer list-none items-center gap-2 font-display font-semibold">
              <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden /> Responsibilities & contributions
            </summary>
            {body}
          </details>
        ) : (
          body
        )}
        {!!entry.technologies?.length && (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
            {entry.technologies.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        )}
        {!!entry.links?.length && (
          <p className="mt-5 flex flex-wrap gap-4 text-sm font-semibold">
            {entry.links.map((l) => (
              <SmartLink key={l.href} href={l.href} className="link-underline">
                {l.label}
              </SmartLink>
            ))}
          </p>
        )}
        <DraftNote entry={entry} className="mt-5" />
      </article>
    </li>
  );
}

export function ExperienceSection() {
  const c = chapters.apply;
  return (
    <section id={c.id} aria-labelledby="experience-title" className="section">
      <div className="container-atlas">
        <SectionHeading chapter={c} id="experience-title" />
        <ol className="mt-14 space-y-8">
          {experience.map((e, i) => (
            <ExperienceEntry key={e.id} entry={e} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
