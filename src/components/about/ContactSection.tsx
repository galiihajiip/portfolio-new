import { ArrowUpRight, Mail } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { chapters, contact } from "@/content/stories";
import { configuredSocials, isDev, siteConfig } from "@/lib/site-config";

export function ContactSection() {
  const c = chapters.closing;
  const socials = configuredSocials();
  const email = siteConfig.email;
  const fallback = socials.find((s) => s.id === "linkedin") ?? socials[0];

  return (
    <section id={c.id} aria-labelledby="closing-title" className="bg-atlas-grid section border-t-[2.5px] border-ink">
      <div className="container-atlas">
        <div className="panel panel-lg mx-auto max-w-5xl p-6 sm:p-10 lg:p-14">
          <SectionHeading chapter={c} id="closing-title" />
          <div className="mt-12 rounded-2xl border-[2.5px] border-ink bg-ink p-6 text-cream sm:p-10">
            <p className="label text-mustard">{contact.eyebrow}</p>
            <h3 id="contact-title" className="display-md mt-3">
              {contact.headline}
            </h3>
            <p className="mt-4 max-w-2xl text-cream/80">{contact.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {email ? (
                <a href={`mailto:${email}`} className="btn btn-primary text-lg">
                  <Mail className="size-5" aria-hidden /> {contact.cta}
                </a>
              ) : fallback ? (
                <a href={fallback.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-lg">
                  {contact.cta} on {fallback.label} <ArrowUpRight className="size-5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <p className="rounded-xl border-2 border-dashed border-cream/40 px-4 py-3 text-sm text-cream/80">
                  Contact details are being set up.
                  {isDev && " (Dev: set siteConfig.email or a social link in src/lib/site-config.ts.)"}
                </p>
              )}
              {email && <span className="font-mono text-sm text-cream/70">{email}</span>}
            </div>
            {socials.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <li key={s.id}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="btn btn-sm border-cream bg-transparent text-cream shadow-none hover:bg-cream hover:text-ink">
                      {s.label} <ArrowUpRight className="size-4" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
