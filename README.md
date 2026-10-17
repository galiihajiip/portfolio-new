# GAPZ. — The Builder's Atlas

Interactive portfolio of **Galih Aji Pangestu**: an isometric 3D island whose six regions lead to projects, experience, research, leadership, milestones and the toolkit.

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · React Three Fiber / Three.js · Vitest · Playwright.

## Commands

```bash
npm install          # dependencies
npm run dev          # http://localhost:3000 (shows owner "Draft" notes)
npm run build        # production build (all routes are static)
npm run start        # serve the build
npm run lint         # ESLint (next/core-web-vitals + typescript)
npm run typecheck    # tsc --noEmit
npm test             # Vitest unit tests (carousel geometry)
npm run test:e2e     # Playwright, desktop + mobile (run `npm run build` first;
                     # first time: `npx playwright install chromium`)
```

## Editing content — no component changes needed

| What | File |
| --- | --- |
| Name, positioning, hero copy, **email, social links, CV, avatar**, site URL | `src/lib/site-config.ts` |
| Projects (carousel, archive, case studies, sitemap) | `src/content/projects.ts` |
| Professional experience + leadership | `src/content/experience.ts` |
| Research entries | `src/content/research.ts` |
| Awards, scholarships, programmes | `src/content/achievements.ts` |
| Education, certifications, capability groups | `src/content/education.ts` |
| Chapter headlines and narrative copy, About, Contact | `src/content/stories.ts` |
| Map regions (titles, anchors, fallback pin positions) | `src/content/regions.ts` |
| Types for all of the above | `src/types/portfolio.ts` |

Add a project by appending an object to `projects`. Its route `/projects/<slug>` is generated automatically. Case-study sections render only when filled; the rest are listed as "still being written".

Entries marked `draft: true` carry a `todo` list that appears as a dashed "Draft · needs your input" note **only in `npm run dev`**.

## Assets

```
public/assets/projects/<slug>/   cover + gallery images → set `cover` / `caseStudy.gallery`
public/assets/achievements/      certificates, trophies → `image`
public/assets/certificates/      credential previews → `preview`
public/assets/organisations/     logos → experience `logo`
public/assets/profile/           avatar → siteConfig.avatar
public/assets/map/atlas-island.png  illustrated fallback map (from the Stitch export)
```

Projects without a `cover` use generated category artwork (`ProjectCover.tsx`), labelled as illustration only.

## How the map works

- `src/components/world/WorldMap.tsx` decides between the WebGL island and the illustrated map. It falls back to the illustration when WebGL is missing, the scene throws, the context is lost, or loading takes over 15s. Visitors can switch views; `?map=2d` forces the illustration.
- `WorldScene.tsx`: orthographic isometric camera, gentle pointer parallax, region pins projected into plain DOM buttons. Rendering pauses off-screen and becomes on-demand with `prefers-reduced-motion`.
- `island/layout.ts` (terrain, paths, deterministic tree placement), `island/Landmarks.tsx`, `island/Island.tsx` (instanced trees, rocks and path dots).
- The accessible way to navigate regions is the "World atlas" list (or chips on mobile). The 3D pins are decorative duplicates.

## Design reference

`design-reference/STITCH_DESIGN.md` holds the tokens from the Stitch export; `src/app/globals.css` implements them. The original archive `stitch_the_builder_s_atlas_portfolio.zip` is untouched.
