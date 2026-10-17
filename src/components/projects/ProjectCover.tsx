import type { ProjectCategory } from "@/types/portfolio";

/**
 * Deliberate placeholder artwork for projects without real screenshots yet.
 * Deterministic per slug, themed per category, and clearly illustrative so it
 * is never mistaken for a product screenshot.
 */

const themes: Record<ProjectCategory, { bg: string; fg: string; accent: string; ink: string }> = {
  ai: { bg: "#123f49", fg: "#2c929c", accent: "#f6b832", ink: "#fff5e6" },
  software: { bg: "#f6b832", fg: "#fff5e6", accent: "#ef5b4e", ink: "#202735" },
  research: { bg: "#fff5e6", fg: "#2c929c", accent: "#ef5b4e", ink: "#202735" },
  "data-iot": { bg: "#2c929c", fg: "#8fd3d9", accent: "#f6b832", ink: "#fff5e6" },
};

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function Motif({ category, seed, t }: { category: ProjectCategory; seed: number; t: (typeof themes)[ProjectCategory] }) {
  const r = (n: number) => ((seed >> n) & 0xff) / 255;
  switch (category) {
    case "ai": {
      const nodes = Array.from({ length: 7 }, (_, i) => ({
        x: 70 + (i % 3) * 95 + r(i) * 30,
        y: 50 + Math.floor(i / 3) * 70 + r(i + 3) * 20,
      }));
      return (
        <g>
          {nodes.map((a, i) =>
            nodes.slice(i + 1, i + 3).map((b, j) => (
              <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={t.fg} strokeWidth="3" />
            )),
          )}
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={i === 3 ? 16 : 10} fill={i === 3 ? t.accent : t.ink} stroke="#202735" strokeWidth="3" />
          ))}
        </g>
      );
    }
    case "software":
      return (
        <g>
          <rect x="62" y="38" width="276" height="170" rx="14" fill={t.fg} stroke="#202735" strokeWidth="4" />
          <rect x="62" y="38" width="276" height="30" rx="14" fill="#202735" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={82 + i * 16} cy="53" r="5" fill={[t.accent, "#f6b832", "#2c929c"][i]} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={84 + (i % 2) * 18} y={86 + i * 22} width={80 + r(i) * 140} height="10" rx="5" fill={i === 2 ? t.accent : "#202735"} opacity={i === 2 ? 1 : 0.8} />
          ))}
        </g>
      );
    case "research":
      return (
        <g>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const h = 30 + r(i) * 110;
            return <rect key={i} x={80 + i * 38} y={200 - h} width="26" height={h} rx="4" fill={i === 3 ? t.accent : t.fg} stroke="#202735" strokeWidth="3" />;
          })}
          <circle cx="285" cy="80" r="38" fill="#fff5e6" stroke="#202735" strokeWidth="6" />
          <line x1="312" y1="107" x2="345" y2="140" stroke="#202735" strokeWidth="10" strokeLinecap="round" />
        </g>
      );
    case "data-iot":
      return (
        <g>
          <path d="M200 50 C 240 105 256 130 256 152 a56 56 0 0 1 -112 0 C 144 130 160 105 200 50 Z" fill={t.fg} stroke="#202735" strokeWidth="4" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M ${300 + i * 16} ${90 - i * 14} a ${40 + i * 18} ${40 + i * 18} 0 0 1 0 ${80 + i * 28}`} fill="none" stroke={t.ink} strokeWidth="4" strokeLinecap="round" opacity={1 - i * 0.25} />
          ))}
          <rect x="70" y="150" width="70" height="46" rx="8" fill={t.accent} stroke="#202735" strokeWidth="4" />
          <line x1="105" y1="150" x2="105" y2="118" stroke="#202735" strokeWidth="4" />
          <circle cx="105" cy="112" r="7" fill="#ef5b4e" stroke="#202735" strokeWidth="3" />
        </g>
      );
  }
}

export function ProjectCover({ slug, title, category, className }: { slug: string; title: string; category: ProjectCategory; className?: string }) {
  const t = themes[category];
  const seed = hash(slug);
  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={`Illustration for ${title}`}>
      <defs>
        <pattern id={`grid-${slug}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill={t.ink} opacity="0.18" />
        </pattern>
      </defs>
      <rect width="400" height="240" fill={t.bg} />
      <rect width="400" height="240" fill={`url(#grid-${slug})`} />
      <Motif category={category} seed={seed} t={t} />
    </svg>
  );
}
