import { about } from "@/content/stories";
import { siteConfig } from "@/lib/site-config";

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="section border-t-[2.5px] border-ink">
      <div className="container-atlas grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="chip mb-5">
            <span className="inline-block size-2 rounded-full bg-coral" aria-hidden /> About
          </p>
          <h2 id="about-title" className="display-lg">
            {about.headline}
          </h2>
        </div>
        <div className="space-y-4 lg:col-span-7">
          {about.body.map((p) => (
            <p key={p} className="prose-atlas text-ink-soft">
              {p}
            </p>
          ))}
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Studying", `Informatics, ${siteConfig.institution}`],
              ["Exploring", "AI, software, research, data"],
              ["Brand", `${siteConfig.brand} — ${siteConfig.title}`],
            ].map(([k, v]) => (
              <div key={k} className="panel-flat bg-paper p-4">
                <dt className="label text-slate">{k}</dt>
                <dd className="mt-1 font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          {siteConfig.cvPath && (
            <a href={siteConfig.cvPath} className="btn btn-secondary mt-4">
              Download CV
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
