import { ChevronDown, MapPin, Mic, Users } from "lucide-react";
import { DraftNote } from "@/components/ui/DraftNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { leadership, organisationKindLabels } from "@/content/experience";
import { chapters, leadershipCopy } from "@/content/stories";
import { talks } from "@/content/talks";
import { formatRange } from "@/lib/utils";
import type { LeadershipRole } from "@/types/portfolio";

function LeadershipCard({ l }: { l: LeadershipRole }) {
  const range = formatRange(l.start, l.end);
  return (
    <article className="panel reveal flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="label flex items-center gap-2 text-teal">
          <Users className="size-4" aria-hidden /> {l.end ? "Leadership" : "Current role"}
        </p>
        {range && <span className="chip">{range}</span>}
      </div>
      <h3 className="mt-4 font-display text-xl font-bold leading-snug">{l.position}</h3>
      <p className="mt-1 font-semibold text-ink-soft">{l.organisation}</p>
      {l.arrangement && <p className="text-sm text-slate">{l.arrangement}</p>}
      {l.scope && <p className="mt-3 text-ink-soft">{l.scope}</p>}
      {!!l.initiatives?.length && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-ink-soft">
          {l.initiatives.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
      {l.coordination && <p className="mt-3 text-ink-soft">{l.coordination}</p>}
      {l.mentoring && <p className="mt-2 text-ink-soft">{l.mentoring}</p>}
      {!!l.verifiedOutcomes?.length && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-ink-soft">
          {l.verifiedOutcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      )}
      {!!l.highlights?.length && (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label="Activities">
          {l.highlights.map((h) => (
            <li key={h} className="tag">
              {h}
            </li>
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
      <DraftNote entry={l} className="mt-4" />
    </article>
  );
}

/** Groups roles by organisation, keeping the authored (newest-first) order. */
function byOrganisation(list: LeadershipRole[]) {
  const groups = new Map<string, LeadershipRole[]>();
  for (const r of list) groups.set(r.organisation, [...(groups.get(r.organisation) ?? []), r]);
  return [...groups.entries()];
}

export function LeadershipSection() {
  const c = chapters.together;
  const featured = leadership.filter((l) => l.kind === "leadership" && l.featured);
  const current = featured.filter((l) => !l.end);
  const past = featured.filter((l) => l.end);
  const log = leadership.filter((l) => (l.kind === "leadership" && !l.featured) || l.kind === "organisation" || l.kind === "volunteer");
  const communities = leadership.filter((l) => l.kind === "community");

  return (
    <section id={c.id} aria-labelledby="leadership-title" className="section border-y-[2.5px] border-ink bg-[#d9eff0]">
      <div className="container-atlas">
        <SectionHeading chapter={c} id="leadership-title" />

        {[
          { title: leadershipCopy.current, roles: current },
          { title: leadershipCopy.past, roles: past },
        ]
          .filter((g) => g.roles.length > 0)
          .map((g) => (
            <div key={g.title} className="mt-14">
              <h3 className="label mb-5 flex items-center gap-2 text-slate">
                <Users className="size-4" aria-hidden /> {g.title}
              </h3>
              <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {g.roles.map((l) => (
                  <li key={l.id}>
                    <LeadershipCard l={l} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

        {talks.length > 0 && (
          <div className="mt-14">
            <h3 className="label mb-5 flex items-center gap-2 text-slate">
              <Mic className="size-4" aria-hidden /> {leadershipCopy.speaking}
            </h3>
            <ul className="grid gap-5 md:grid-cols-2">
              {talks.map((t) => (
                <li key={t.id}>
                  <article className="panel-flat reveal flex h-full flex-col bg-paper p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="chip bg-mustard">{t.role}</span>
                      {t.date && <span className="font-mono text-xs text-slate">{t.date}</span>}
                    </div>
                    <h4 className="mt-3 font-display text-xl font-bold leading-snug">{t.event}</h4>
                    <p className="mt-2 text-ink-soft">{t.topic}</p>
                    <p className="mt-auto pt-3 text-sm text-slate">
                      {[t.audience, t.organiser].filter(Boolean).join(" · ")}
                      {t.location && (
                        <span className="mt-0.5 flex items-center gap-1">
                          <MapPin className="size-3.5" aria-hidden /> {t.location}
                        </span>
                      )}
                    </p>
                    {t.link && (
                      <SmartLink href={t.link} className="link-underline mt-2 text-sm font-semibold">
                        Watch or read more
                      </SmartLink>
                    )}
                    <DraftNote entry={{ draft: !!t.todo, todo: t.todo }} className="mt-3" />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        )}

        {log.length > 0 && (
          <details className="group mt-12 rounded-2xl border-[2.5px] border-ink bg-paper shadow-[4px_4px_0_0_var(--color-ink)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
              <span>
                <span className="label block text-slate">{leadershipCopy.log}</span>
                <span className="mt-1 block font-display text-xl font-bold">Committees, events & volunteering ({log.length})</span>
              </span>
              <ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <div className="grid gap-8 border-t-2 border-ink/10 p-5 sm:p-6 lg:grid-cols-2">
              {byOrganisation(log).map(([org, roles]) => (
                <div key={org}>
                  <h3 className="font-display text-lg font-bold">{org}</h3>
                  <ul className="mt-2 divide-y divide-ink/10">
                    {roles.map((r) => (
                      <li key={r.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 py-2.5">
                        <span className="min-w-0">
                          <span className="font-semibold">{r.position}</span>
                          {r.event && <span className="text-ink-soft"> · {r.event}</span>}
                          {r.kind !== "organisation" && <span className="label ml-2 text-teal">{organisationKindLabels[r.kind]}</span>}
                        </span>
                        <span className="font-mono text-xs text-slate">{formatRange(r.start, r.end)}</span>
                        <DraftNote entry={{ draft: !!r.todo, todo: r.todo }} className="mt-1 w-full" />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        )}

        {communities.length > 0 && (
          <div className="mt-12">
            <h3 className="label mb-4 text-slate">{leadershipCopy.communities}</h3>
            <ul className="flex flex-wrap gap-2">
              {communities.map((m) => (
                <li key={m.id} className="rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm">
                  <span className="font-semibold">{m.organisation}</span>
                  <span className="text-slate"> · since {m.start}</span>
                  {!!m.highlights?.length && <span className="block text-xs text-ink-soft">{m.highlights.join(" · ")}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
