import { SectionHeading } from "@/components/ui/SectionHeading";
import { chapters, principles } from "@/content/stories";

const accents = ["bg-mustard", "bg-teal-light", "bg-coral-soft"];

export function StorySection() {
  const c = chapters.beginning;
  return (
    <section id={c.id} aria-labelledby="story-title" className="section bg-paper-grid">
      <div className="container-atlas">
        <SectionHeading chapter={c} id="story-title" />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.title} className="panel reveal flex flex-col p-6">
              <span className={`grid size-11 place-items-center rounded-lg border-2 border-ink font-mono text-sm font-semibold ${accents[i]}`} aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="label mt-6 text-slate">{p.label}</p>
              <h3 className="mt-2 font-display text-2xl font-bold">{p.title}</h3>
              <p className="mt-3 text-ink-soft">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
