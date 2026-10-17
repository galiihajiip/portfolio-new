import { regionById } from "@/content/regions";
import { cn } from "@/lib/utils";
import type { Chapter } from "@/types/portfolio";

interface Props {
  chapter: Pick<Chapter, "number" | "label" | "headline" | "body" | "region">;
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
  id?: string;
}

/** Chapter eyebrow + narrative headline + intro, shared by every homepage section. */
export function SectionHeading({ chapter, tone = "light", className, as: Tag = "h2", id }: Props) {
  const region = chapter.region ? regionById(chapter.region) : undefined;
  const dark = tone === "dark";
  return (
    <header className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
      <div className="lg:col-span-7">
        <p className="mb-5 flex flex-wrap items-center gap-2">
          <span className={cn("chip", dark ? "bg-mustard" : "bg-paper")}>
            <span className="inline-block size-2 rounded-full bg-coral" aria-hidden />
            Chapter {chapter.number.replace(/\D/g, "")} · {chapter.label}
          </span>
          {region && (
            <span className={cn("chip", dark ? "border-cream/80 bg-transparent text-cream shadow-none" : "bg-teal text-paper")}>
              Region {String(region.index).padStart(2, "0")} · {region.title}
            </span>
          )}
        </p>
        <Tag id={id} className={cn("display-lg", dark ? "text-cream" : "text-ink")}>
          {chapter.headline}
        </Tag>
      </div>
      <div className={cn("space-y-3 lg:col-span-5", dark ? "text-cream/85" : "text-ink-soft")}>
        {chapter.body.map((p) => (
          <p key={p} className="prose-atlas">
            {p}
          </p>
        ))}
      </div>
    </header>
  );
}
