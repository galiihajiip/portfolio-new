import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/layout/PageIntro";
import { DraftNote } from "@/components/ui/DraftNote";
import { getProject } from "@/content/projects";
import { getResearch, research, researchStatusLabels } from "@/content/research";

export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/research/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResearch(slug);
  if (!entry) return { title: "Research not found" };
  return { title: entry.title, description: entry.summary, alternates: { canonical: `/research/${entry.slug}` } };
}

export default async function ResearchEntryPage({ params }: PageProps<"/research/[slug]">) {
  const { slug } = await params;
  const entry = getResearch(slug);
  if (!entry) notFound();
  const project = entry.relatedProject ? getProject(entry.relatedProject) : undefined;

  const facts = [
    ["Status", entry.status && researchStatusLabels[entry.status]],
    ["Date", entry.date],
    ["Role", entry.role],
    ["Institution", entry.institution],
    ["Collaborators", entry.collaborators?.join(", ")],
    ["Venue", entry.venue],
  ].filter(([, v]) => !!v) as [string, string][];

  return (
    <article>
      <PageIntro eyebrow="Research Woods" title={entry.title} back={{ href: "/research", label: "All research" }}>
        {entry.titleNote && <p className="label mb-2 text-slate">{entry.titleNote}</p>}
        <p>{entry.summary}</p>
      </PageIntro>
      <div className="container-atlas grid gap-12 py-14 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-8 text-[1.05rem] leading-relaxed text-ink-soft">
          {entry.objective && (
            <section>
              <h2 className="display-md text-2xl text-ink">Objective</h2>
              <p className="mt-3">{entry.objective}</p>
            </section>
          )}
          {!!entry.methods?.length && (
            <section>
              <h2 className="display-md text-2xl text-ink">Methods</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {entry.methods.map((m) => (
                  <li key={m} className="tag text-sm">
                    {m}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {project && (
            <p>
              Related project:{" "}
              <Link href={`/projects/${project.slug}`} className="link-underline font-semibold text-ink">
                {project.title}
              </Link>
            </p>
          )}
          {!entry.objective && (
            <p className="rounded-xl border-2 border-dashed border-ink/30 bg-paper p-5 text-sm">
              Full details for this research will be published once they are confirmed.
            </p>
          )}
          <DraftNote entry={entry} />
        </div>
        <aside className="panel h-fit p-5 text-sm">
          {facts.length > 0 ? (
            <dl className="space-y-3">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-slate">{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-slate">Details to be confirmed.</p>
          )}
          {entry.doi && (
            <a href={`https://doi.org/${entry.doi}`} target="_blank" rel="noopener noreferrer" className="link-underline mt-4 inline-flex items-center gap-1 font-semibold">
              DOI {entry.doi} <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          )}
          {entry.links?.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 flex items-center gap-1 font-semibold">
              {l.label} <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          ))}
        </aside>
      </div>
    </article>
  );
}
