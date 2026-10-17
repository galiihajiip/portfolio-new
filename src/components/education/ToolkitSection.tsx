import { BadgeCheck, GraduationCap, Rocket, Wrench } from "lucide-react";
import Link from "next/link";
import { DraftNote } from "@/components/ui/DraftNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { capabilities, certifications, education, programmeKindLabels, programmes } from "@/content/education";
import { chapters } from "@/content/stories";
import { isDev } from "@/lib/site-config";
import { formatRange } from "@/lib/utils";

export function ToolkitSection() {
  const c = chapters.toolkit;
  return (
    <section id={c.id} aria-labelledby="toolkit-title" className="section bg-paper-grid">
      <div className="container-atlas">
        <SectionHeading chapter={c} id="toolkit-title" />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          {/* Education + certifications */}
          <div className="space-y-6">
            <h3 className="label flex items-center gap-2 text-slate">
              <GraduationCap className="size-4" aria-hidden /> Education
            </h3>
            {education.map((e) => (
              <article key={e.id} className="panel reveal p-5">
                <p className="label text-teal">{formatRange(e.start, e.end) ?? "Current studies"}</p>
                <h4 className="mt-2 font-display text-xl font-bold leading-snug">
                  {e.programme}
                  {e.field && e.field !== e.programme && <span className="font-medium text-ink-soft"> · {e.field}</span>}
                </h4>
                <p className="mt-1 font-semibold text-ink-soft">{e.institution}</p>
                <p className="text-sm text-slate">{[e.degree, e.grade, e.location].filter(Boolean).join(" · ")}</p>
                {!!e.details?.length && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-ink-soft">
                    {e.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
                <DraftNote entry={e} className="mt-4" />
              </article>
            ))}

            {(certifications.length > 0 || isDev) && (
              <div>
                <h3 className="label mb-4 flex items-center gap-2 text-slate">
                  <BadgeCheck className="size-4" aria-hidden /> Certifications
                </h3>
                {certifications.length === 0 ? (
                  <p className="rounded-lg border-2 border-dashed border-coral bg-coral-soft/60 p-3 text-xs">
                    Dev only: no certifications yet. Add them in <code>src/content/education.ts</code>; this block stays hidden for visitors until then.
                  </p>
                ) : (
                  <ul className="divide-y-2 divide-ink/10 rounded-xl border-2 border-ink bg-paper">
                    {certifications.map((cert) => (
                      <li key={cert.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                        <div>
                          <p className="font-semibold">{cert.title}</p>
                          <p className="text-sm text-slate">
                            {cert.issuer}
                            {cert.issued && ` · ${cert.issued}`}
                            {cert.expires && ` – ${cert.expires}`}
                            {cert.credentialId && ` · ID ${cert.credentialId}`}
                          </p>
                        </div>
                        {cert.verificationUrl && (
                          <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-sm font-semibold">
                            Verify<span className="sr-only"> {cert.title} (opens in a new tab)</span>
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Capability groups */}
          <div>
            <h3 className="label mb-6 flex items-center gap-2 text-slate">
              <Wrench className="size-4" aria-hidden /> The builder&apos;s toolkit
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((g) => (
                <li key={g.id} className="panel-flat reveal flex flex-col bg-paper p-5">
                  <h4 className="font-display text-lg font-bold leading-snug">{g.title}</h4>
                  <p className="mt-2 text-sm text-ink-soft">{g.description}</p>
                  {g.tools.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tools">
                      {g.tools.map((t) => (
                        <li key={t} className="tag">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                  {!!g.evidence?.length && (
                    <p className="mt-auto pt-4 text-sm">
                      <span className="text-slate">Seen in </span>
                      {g.evidence.map((e, i) => (
                        <span key={e.href}>
                          {i > 0 && ", "}
                          <Link href={e.href} className="link-underline font-semibold">
                            {e.label}
                          </Link>
                        </span>
                      ))}
                    </p>
                  )}
                  <DraftNote entry={{ draft: g.tools.length === 0, todo: g.todo }} className="mt-3" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {programmes.length > 0 && (
          <div className="mt-16">
            <h3 className="label mb-6 flex items-center gap-2 text-slate">
              <Rocket className="size-4" aria-hidden /> Programmes, training & industry visits
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {programmes.map((p) => (
                <li key={p.id} className="panel-flat reveal flex flex-col bg-paper p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="label text-teal">{programmeKindLabels[p.kind]}</span>
                    <span className="font-mono text-xs text-slate">{formatRange(p.start, p.end)}</span>
                  </div>
                  <h4 className="mt-2 font-display text-lg font-bold leading-snug">{p.title}</h4>
                  <p className="text-sm font-semibold text-ink-soft">{p.organisation}</p>
                  {(p.location || p.arrangement) && <p className="text-sm text-slate">{[p.location, p.arrangement].filter(Boolean).join(" · ")}</p>}
                  {!!p.highlights?.length && (
                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-3" aria-label="Activities">
                      {p.highlights.map((h) => (
                        <li key={h} className="tag">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                  <DraftNote entry={p} className="mt-3" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
