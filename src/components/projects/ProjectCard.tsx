"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type PointerEvent, useRef, useState } from "react";
import { categoryLabels, statusLabels } from "@/content/projects";
import type { Project } from "@/types/portfolio";
import { ProjectCover } from "./ProjectCover";

const MAX_TILT = 2.5; // degrees

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" | "h4" }) {
  const ref = useRef<HTMLElement>(null);
  const [imageFailed, setImageFailed] = useState(false);
  const Heading = headingLevel;

  // Restrained tilt on precise pointers only; CSS ignores it under reduced motion.
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.setProperty("--ry", `${(x * MAX_TILT).toFixed(2)}deg`);
    ref.current.style.setProperty("--rx", `${(-y * MAX_TILT).toFixed(2)}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  const showImage = project.cover && !imageFailed;

  return (
    <article ref={ref} className="project-card group" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="project-card__meta flex items-center justify-between gap-3 border-b-2 border-ink bg-cream px-4 py-2.5 text-slate">
        <span className="label truncate">{categoryLabels[project.category]}</span>
        {project.year && (
          <span className="label flex shrink-0 items-center gap-1.5">
            <span className="inline-block size-2 rounded-full bg-coral" aria-hidden />
            {project.year}
          </span>
        )}
      </div>
      <div className="project-card__media relative aspect-[5/3] overflow-hidden border-b-2 border-ink bg-cream-deep">
        {showImage ? (
          <Image
            src={project.cover!.src}
            alt={project.cover!.alt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 85vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <ProjectCover slug={project.slug} title={project.title} category={project.category} className="h-full w-full" />
        )}
        <span className="chip absolute bottom-3 left-3 bg-paper text-[0.62rem]">{statusLabels[project.status]}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="project-card__title font-display text-2xl font-bold leading-tight tracking-tight">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.title}
          </Link>
        </Heading>
        {project.titleNote && <p className="mt-1 text-xs text-slate">{project.titleNote}</p>}
        <p className="mt-3 line-clamp-4 text-[0.95rem] leading-relaxed text-ink-soft">
          {project.summary || "Description coming soon."}
        </p>
        {!!project.technologies?.length && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.technologies.slice(0, 4).map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="font-display text-sm font-semibold">Read the case study</span>
          <span className="project-card__arrow grid size-10 place-items-center rounded-full border-2 border-ink bg-paper" aria-hidden>
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </article>
  );
}
