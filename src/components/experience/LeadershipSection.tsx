import { Users } from "lucide-react";
import { DraftNote } from "@/components/ui/DraftNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { leadership } from "@/content/experience";
import { chapters } from "@/content/stories";
import { formatRange } from "@/lib/utils";

export function LeadershipSection() {
  const c = chapters.together;
  return (
    <section id={c.id} aria-labelledby="leadership-title" className="section border-y-[2.5px] border-ink bg-[#d9eff0]">
      <div className="container-atlas">
        <SectionHeading chapter={c} id="leadership-title" />
        <ul className="mt-14 grid gap-6 lg:grid-cols-2">
          {leadership.map((l) => {
            const range = formatRange(l.start, l.end);
            return (
              <li key={l.id}>
                <article className="panel reveal h-full p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="label flex items-center gap-2 text-teal">
                      <Users className="size-4" aria-hidden /> Leadership role
                    </p>
                    {range && <span className="chip">{range}</span>}
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold">{l.position}</h3>
                  <p className="mt-1 font-semibold text-ink-soft">{l.organisation}</p>
                  {l.scope && <p className="mt-4 text-ink-soft">{l.scope}</p>}
                  {!!l.initiatives?.length && (
                    <div className="mt-5">
                      <p className="label mb-2 text-slate">Initiatives</p>
                      <ul className="list-disc space-y-1 pl-5 text-ink-soft">
                        {l.initiatives.map((i) => (
                          <li key={i}>{i}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {l.coordination && (
                    <p className="mt-4 text-ink-soft">
                      <strong className="text-ink">Coordination. </strong>
                      {l.coordination}
                    </p>
                  )}
                  {l.mentoring && (
                    <p className="mt-2 text-ink-soft">
                      <strong className="text-ink">Mentoring. </strong>
                      {l.mentoring}
                    </p>
                  )}
                  {!!l.verifiedOutcomes?.length && (
                    <ul className="mt-4 list-disc space-y-1 pl-5 text-ink-soft">
                      {l.verifiedOutcomes.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  )}
                  {!!l.links?.length && (
                    <p className="mt-4 flex gap-4 text-sm font-semibold">
                      {l.links.map((k) => (
                        <SmartLink key={k.href} href={k.href} className="link-underline">
                          {k.label}
                        </SmartLink>
                      ))}
                    </p>
                  )}
                  <DraftNote entry={l} className="mt-5" />
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
