import Link from "next/link";
import { navigation } from "@/lib/navigation";
import { configuredSocials, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const socials = configuredSocials();
  return (
    <footer className="bg-ink text-cream">
      <div className="container-atlas grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-display text-2xl font-bold">
            GAPZ<span className="text-mustard">.</span> <span className="text-cream/70">{siteConfig.title}</span>
          </p>
          <p className="max-w-sm text-sm text-cream/70">
            {siteConfig.name} · {siteConfig.tagline} · {siteConfig.institution}
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="label mb-3 text-mustard">Explore</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navigation.map((n) => (
              <li key={n.id}>
                <Link href={n.href} className="link-underline">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/projects" className="link-underline">
                Project archive
              </Link>
            </li>
            <li>
              <Link href="/research" className="link-underline">
                Research
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="label mb-3 text-mustard">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            {siteConfig.email && (
              <li>
                <a href={`mailto:${siteConfig.email}`} className="link-underline">
                  {siteConfig.email}
                </a>
              </li>
            )}
            {socials.map((s) => (
              <li key={s.id}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                  {s.label}
                </a>
              </li>
            ))}
            {!siteConfig.email && socials.length === 0 && <li className="text-cream/60">Profile links coming soon.</li>}
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="container-atlas flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-cream/60">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <a href="#main" className="link-underline">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
