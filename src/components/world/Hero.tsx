import { ArrowDown, ArrowRight, MessageSquare } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { WorldMap } from "./WorldMap";

function ProfileCard() {
  return (
    <div className="panel panel-lg flex max-w-[23rem] items-center gap-4 p-4">
      <div className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-full border-[2.5px] border-ink bg-mustard">
        {siteConfig.avatar ? (
          <Image src={siteConfig.avatar.src} alt={siteConfig.avatar.alt} fill sizes="64px" className="object-cover" />
        ) : (
          <span className="font-display text-xl font-bold" aria-hidden>
            GA
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="flex items-center gap-2 font-display text-lg font-bold leading-tight">
          {siteConfig.name}
        </p>
        <p className="text-sm text-ink-soft">{siteConfig.tagline}</p>
        {siteConfig.availability && (
          <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex size-full rounded-full bg-green opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-green" />
            </span>
            {siteConfig.availability}
          </p>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  const { hero } = siteConfig;
  return (
    <section id="map" aria-labelledby="hero-title" className="bg-atlas-grid relative overflow-hidden pt-[var(--header-h)] lg:pt-0">
      <div className="relative lg:min-h-[max(46rem,100svh)]">
        <WorldMap profile={<ProfileCard />} />

        <div className="container-atlas relative z-20 pb-10 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-0 lg:pb-8">
          <div className="panel panel-lg pointer-events-auto grid gap-6 p-6 sm:p-8 lg:mx-auto lg:max-w-[76rem] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-12 lg:px-10 lg:py-9">
            <div className="min-w-0">
              <p className="chip mb-5 max-w-full whitespace-normal bg-cream">
                <span className="inline-block size-2 rounded-full bg-coral" aria-hidden />
                {hero.eyebrow}
              </p>
              <h1 id="hero-title" className="font-display text-[clamp(2.4rem,4.3vw,4rem)] font-bold leading-[0.97] tracking-[-0.045em] text-ink">
                {hero.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </div>
            <div className="min-w-0">
              <p className="text-[1.02rem] leading-relaxed text-ink-soft">{hero.copy}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href={hero.primaryCta.href} className="btn btn-primary">
                  {hero.primaryCta.label} <ArrowRight className="size-5" aria-hidden />
                </a>
                <a href={hero.secondaryCta.href} className="btn btn-secondary">
                  <MessageSquare className="size-5" aria-hidden /> {hero.secondaryCta.label}
                </a>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-xs leading-relaxed text-slate">{hero.microcopy}</p>
                <a href="#story" className="hidden shrink-0 lg:inline-flex" aria-label="Follow the story: scroll to chapter one">
                  <span className="grid size-9 place-items-center rounded-full border-2 border-ink bg-cream">
                    <ArrowDown className="size-4 motion-safe:animate-[scroll-cue_1.8s_ease-in-out_infinite]" aria-hidden />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
