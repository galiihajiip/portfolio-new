import { ArrowUpRight, Award, GraduationCap, Medal, Trophy } from "lucide-react";
import Link from "next/link";
import { DraftNote } from "@/components/ui/DraftNote";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievementCategoryLabels, achievements } from "@/content/achievements";
import { chapters } from "@/content/stories";
import type { Achievement } from "@/types/portfolio";

const icons = { competition: Trophy, scholarship: GraduationCap, programme: Medal, recognition: Award };

function FeaturedAchievement({ a }: { a: Achievement }) {
  const Icon = icons[a.category];
  return (
    <article className="reveal flex h-full flex-col rounded-2xl border-[2.5px] border-ink bg-paper p-6 text-ink shadow-[6px_6px_0_0_var(--color-mustard)]">
      <div className="flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-xl border-2 border-ink bg-mustard" aria-hidden>
          <Icon className="size-6" />
        </span>
        {a.date && <span className="label text-slate">{a.date}</span>}
      </div>
      <p className="mt-6 font-display text-4xl font-bold tracking-tight text-coral">{a.result}</p>
      <h3 className="mt-2 font-display text-xl font-bold leading-snug">{a.title}</h3>
      {a.organiser && <p className="mt-1 text-sm text-slate">{a.organiser}</p>}
      {a.context && <p className="mt-3 text-ink-soft">{a.context}</p>}
      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-sm font-semibold">
        {a.relatedProject && (
          <Link href={`/projects/${a.relatedProject}`} className="link-underline">
            See the project
          </Link>
        )}
        {a.verificationUrl && (
          <a href={a.verificationUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1">
            Verify <ArrowUpRight className="size-3.5" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
      <DraftNote entry={a} className="mt-4" />
    </article>
  );
}

export function AchievementSection() {
  const c = chapters.milestones;
  const featured = achievements.filter((a) => a.featured);
  return (
    <section id={c.id} aria-labelledby="achievements-title" className="section relative overflow-hidden bg-teal-deep text-cream">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(255_245_230/0.08)_1.2px,transparent_1.3px)] bg-[length:22px_22px]" aria-hidden />
      <div className="container-atlas relative">
        <SectionHeading chapter={c} tone="dark" id="achievements-title" />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((a) => (
            <li key={a.id}>
              <FeaturedAchievement a={a} />
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <h3 className="label mb-4 text-mustard">Full milestone log</h3>
          <ol className="divide-y-2 divide-cream/15 border-y-2 border-cream/15">
            {achievements.map((a) => {
              const Icon = icons[a.category];
              return (
                <li key={a.id} className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-1 py-5 md:grid-cols-[auto_1fr_12rem_6rem] md:items-center">
                  <span className="grid size-10 place-items-center rounded-lg border-2 border-cream/40 text-mustard" aria-hidden>
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold leading-snug">{a.title}</p>
                    <p className="text-sm text-cream/65">
                      {achievementCategoryLabels[a.category]}
                      {a.organiser && ` · ${a.organiser}`}
                    </p>
                  </div>
                  <p className="col-start-2 font-semibold text-mustard md:col-start-auto">{a.result}</p>
                  <p className="col-start-2 font-mono text-sm text-cream/65 md:col-start-auto md:text-right">{a.date ?? "—"}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
