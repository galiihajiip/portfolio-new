import { ArrowLeft, ArrowRight, ArrowUpRight, Trophy } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PageIntro } from "@/components/layout/PageIntro";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { DraftNote } from "@/components/ui/DraftNote";
import { achievements } from "@/content/achievements";
import { adjacentProjects, categoryLabels, getProject, projects, statusLabels } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, type: "article" },
  };
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t-2 border-ink/10 pt-8">
      <h2 className="display-md text-[clamp(1.4rem,2.2vw,1.9rem)]">{title}</h2>
      <div className="mt-4 space-y-3 text-[1.05rem] leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2.5 size-2 shrink-0 rounded-full bg-teal" aria-hidden />
          {i}
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const cs = project.caseStudy ?? {};
  const { previous, next } = adjacentProjects(project.slug);
  const related = achievements.filter((a) => project.relatedAchievements?.includes(a.id));
  const role = cs.role ?? project.role;

  const sections: { title: string; present: boolean; render: () => ReactNode }[] = [
    { title: "Overview", present: !!cs.overview, render: () => <p>{cs.overview}</p> },
    { title: "The problem", present: !!cs.problem, render: () => <p>{cs.problem}</p> },
    { title: "Objectives", present: !!cs.objectives?.length, render: () => <Bullets items={cs.objectives!} /> },
    { title: "Constraints", present: !!cs.constraints?.length, render: () => <Bullets items={cs.constraints!} /> },
    { title: "My role", present: !!role, render: () => <p>{role}</p> },
    { title: "Approach", present: !!cs.approach?.length, render: () => <Bullets items={cs.approach!} /> },
    {
      title: "Technical decisions",
      present: !!cs.decisions?.length,
      render: () => (
        <dl className="space-y-4">
          {cs.decisions!.map((d) => (
            <div key={d.title}>
              <dt className="font-display font-bold text-ink">{d.title}</dt>
              <dd>{d.detail}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      title: "Visual evidence",
      present: !!cs.gallery?.length,
      render: () => (
        <ul className="grid gap-4 sm:grid-cols-2">
          {cs.gallery!.map((img) => (
            <li key={img.src} className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-ink">
              <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 40vw, 90vw" className="object-cover" />
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Results",
      present: !!(cs.results?.length || project.verifiedOutcomes?.length),
      render: () => <Bullets items={[...(project.verifiedOutcomes ?? []), ...(cs.results ?? [])]} />,
    },
    { title: "Lessons learned", present: !!cs.lessons?.length, render: () => <Bullets items={cs.lessons!} /> },
  ];
  const present = sections.filter((s) => s.present);
  const pending = sections.filter((s) => !s.present).map((s) => s.title);

  const links = [
    project.links?.repository && { label: "Repository", href: project.links.repository },
    project.links?.demo && { label: "Live demo", href: project.links.demo },
    project.links?.publication && { label: "Publication", href: project.links.publication },
    ...(project.links?.other ?? []),
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <article>
      <PageIntro
        eyebrow={`${categoryLabels[project.category]} · ${statusLabels[project.status]}`}
        title={project.title}
        back={{ href: "/projects", label: "All projects" }}
      >
        {project.titleNote && <p className="label mb-2 text-slate">{project.titleNote}</p>}
        <p>{project.summary}</p>
      </PageIntro>

      <div className="container-atlas grid gap-12 py-14 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div className="space-y-10">
          <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border-[2.5px] border-ink shadow-[6px_6px_0_0_var(--color-ink)]">
            {project.cover ? (
              <Image src={project.cover.src} alt={project.cover.alt} fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            ) : (
              <ProjectCover slug={project.slug} title={project.title} category={project.category} className="h-full w-full" />
            )}
          </div>
          {!project.cover && <p className="-mt-6 text-xs text-slate">Illustration only. Project visuals will be added here.</p>}

          {present.map((s) => (
            <Block key={s.title} title={s.title}>
              {s.render()}
            </Block>
          ))}

          {pending.length > 0 && (
            <aside className="rounded-xl border-2 border-dashed border-ink/30 bg-paper p-5 text-sm text-ink-soft">
              <p className="font-display font-bold text-ink">This case study is still being written.</p>
              <p className="mt-1">
                Coming next: {pending.map((p) => p.toLowerCase()).join(", ")}. Only verified details are published here.
              </p>
            </aside>
          )}
          <DraftNote entry={project} />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <div className="panel p-5">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="label text-slate">Category</dt>
                <dd className="mt-1 font-semibold">{categoryLabels[project.category]}</dd>
              </div>
              <div>
                <dt className="label text-slate">Status</dt>
                <dd className="mt-1 font-semibold">{statusLabels[project.status]}</dd>
              </div>
              {project.year && (
                <div>
                  <dt className="label text-slate">Year</dt>
                  <dd className="mt-1 font-semibold">{project.year}</dd>
                </div>
              )}
              {role && (
                <div>
                  <dt className="label text-slate">Role</dt>
                  <dd className="mt-1 font-semibold">{role}</dd>
                </div>
              )}
              {!!project.technologies?.length && (
                <div>
                  <dt className="label text-slate">Technologies</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
            {links.length > 0 && (
              <ul className="mt-5 space-y-2 border-t-2 border-ink/10 pt-4">
                {links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 font-semibold">
                      {l.label} <ArrowUpRight className="size-3.5" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {related.length > 0 && (
            <div className="rounded-2xl border-[2.5px] border-ink bg-teal-deep p-5 text-cream">
              <p className="label flex items-center gap-2 text-mustard">
                <Trophy className="size-4" aria-hidden /> Recognition
              </p>
              <ul className="mt-3 space-y-3">
                {related.map((a) => (
                  <li key={a.id}>
                    <p className="font-display text-lg font-bold text-mustard">{a.result}</p>
                    <p className="text-sm">{a.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <nav aria-label="More projects" className="border-t-[2.5px] border-ink bg-cream-deep">
        <div className="container-atlas grid gap-4 py-10 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          {previous && previous.slug !== project.slug ? (
            <Link href={`/projects/${previous.slug}`} className="group flex items-center gap-3">
              <span className="icon-btn shrink-0" aria-hidden>
                <ArrowLeft className="size-5" />
              </span>
              <span>
                <span className="label block text-slate">Previous</span>
                <span className="font-display font-bold">{previous.title}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          <Link href="/projects" className="btn btn-secondary btn-sm justify-self-center">
            Project archive
          </Link>
          {next && next.slug !== project.slug ? (
            <Link href={`/projects/${next.slug}`} className="group flex items-center justify-end gap-3 text-right">
              <span>
                <span className="label block text-slate">Next</span>
                <span className="font-display font-bold">{next.title}</span>
              </span>
              <span className="icon-btn shrink-0 bg-mustard" aria-hidden>
                <ArrowRight className="size-5" />
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </article>
  );
}
