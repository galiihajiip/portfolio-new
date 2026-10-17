import { Compass } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-atlas-grid grid min-h-[80svh] place-items-center px-[var(--gutter)] pb-16 pt-[calc(var(--header-h)+3rem)]">
      <div className="panel panel-lg max-w-xl p-8 text-center sm:p-12">
        <span className="mx-auto grid size-14 place-items-center rounded-full border-[2.5px] border-ink bg-mustard" aria-hidden>
          <Compass className="size-7" />
        </span>
        <p className="label mt-6 text-coral">404 · Off the map</p>
        <h1 className="display-md mt-2">This part of the island hasn&apos;t been charted.</h1>
        <p className="mt-4 text-ink-soft">The page you were looking for doesn&apos;t exist, or it has moved to another region.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Return to the map
          </Link>
          <Link href="/projects" className="btn btn-secondary">
            Browse projects
          </Link>
        </div>
      </div>
    </section>
  );
}
