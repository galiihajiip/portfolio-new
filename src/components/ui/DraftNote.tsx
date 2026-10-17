import { isDev } from "@/lib/site-config";
import type { DraftMarker } from "@/types/portfolio";

/**
 * Owner-facing reminder of missing details. Renders only in `next dev`, so
 * visitors never see it.
 */
export function DraftNote({ entry, className }: { entry: DraftMarker; className?: string }) {
  if (!isDev || !entry.draft || !entry.todo?.length) return null;
  return (
    <details className={`rounded-lg border-2 border-dashed border-coral bg-coral-soft/60 px-3 py-2 text-xs text-ink ${className ?? ""}`}>
      <summary className="cursor-pointer font-mono font-semibold uppercase tracking-wider">Draft · needs your input (dev only)</summary>
      <ul className="mt-2 list-disc space-y-0.5 pl-5">
        {entry.todo.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </details>
  );
}
