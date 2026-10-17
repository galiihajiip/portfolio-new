import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

/** Teal banner with a cream headline panel, used at the top of inner pages. */
export function PageIntro({
  eyebrow,
  title,
  children,
  back,
}: {
  eyebrow: ReactNode;
  title: string;
  children?: ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <div className="bg-atlas-grid border-b-[2.5px] border-ink pb-14 pt-[calc(var(--header-h)+2.5rem)]">
      <div className="container-atlas">
        {back && (
          <Link href={back.href} className="btn btn-secondary btn-sm mb-6">
            <ArrowLeft className="size-4" aria-hidden /> {back.label}
          </Link>
        )}
        <div className="panel panel-lg relative p-6 sm:p-10">
          <p className="chip absolute -top-4 left-6 bg-mustard">{eyebrow}</p>
          <h1 className="display-lg mt-2 max-w-4xl">{title}</h1>
          {children && <div className="mt-5 max-w-3xl text-lg text-ink-soft">{children}</div>}
        </div>
      </div>
    </div>
  );
}
