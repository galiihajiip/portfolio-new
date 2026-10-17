import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.brand} ${siteConfig.title} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full border-2 border-ink bg-paper py-1.5 pl-1.5 pr-4 shadow-[3px_3px_0_0_var(--color-ink)] transition-transform hover:-translate-y-0.5",
        className,
      )}
    >
      <span className="grid size-8 place-items-center rounded-full border-2 border-ink bg-mustard" aria-hidden>
        <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-500 group-hover:rotate-[200deg]">
          <path d="M12 2.5 14.6 12 12 21.5 9.4 12Z" fill="#202735" />
          <path d="M12 2.5 14.6 12H9.4Z" fill="#ef5b4e" />
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        GAPZ<span className="text-coral">.</span>
      </span>
    </Link>
  );
}
