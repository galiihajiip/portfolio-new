import type { RegionId } from "@/types/portfolio";

/**
 * Island layout in local "map" coordinates.
 *
 * The island group is rotated 45° so local +x reads as screen-right and local
 * +z as screen-down (towards the viewer) under the isometric camera. That lets
 * the map be authored like a drawing: x = across, z = depth, y = height.
 */

export type Vec2 = [number, number];

/** Small deterministic PRNG so the island is identical on every load. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** An irregular closed outline (in x/z) sampled around an ellipse. */
export function blobOutline(cx: number, cz: number, rx: number, rz: number, seed: number, wobble = 0.14, n = 18): Vec2[] {
  const rand = mulberry32(seed);
  const radii = Array.from({ length: n }, () => 1 + (rand() * 2 - 1) * wobble);
  // Smooth the noise so the outline stays organic rather than spiky.
  const smooth = radii.map((r, i) => (r * 2 + radii[(i + 1) % n]! + radii[(i - 1 + n) % n]!) / 4);
  return smooth.map((r, i) => {
    const a = (i / n) * Math.PI * 2;
    return [cx + Math.cos(a) * rx * r, cz + Math.sin(a) * rz * r];
  });
}

export function pointInPolygon([x, z]: Vec2, poly: Vec2[]) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i]!;
    const [xj, zj] = poly[j]!;
    if (zi > z !== zj > z && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}

export type TerrainKind = "sand" | "grass" | "rock";

export interface TerrainPiece {
  id: string;
  outline: Vec2[];
  /** Height of the top surface. */
  top: number;
  /** Height of the bottom of this piece (pieces stack like terraces). */
  base: number;
  kind: TerrainKind;
  region?: RegionId;
}

const piece = (
  id: string,
  [cx, cz]: Vec2,
  [rx, rz]: Vec2,
  top: number,
  kind: TerrainKind,
  seed: number,
  region?: RegionId,
  base = 0,
  wobble = 0.14,
): TerrainPiece => ({ id, outline: blobOutline(cx, cz, rx, rz, seed, wobble), top, base, kind, region });

/** Regions: centre, footprint radius, and plateau height. */
export const regionSites: Record<RegionId, { center: Vec2; radius: number; top: number }> = {
  "systems-highlands": { center: [-1.9, -3.1], radius: 2.35, top: 2.7 },
  "milestone-summit": { center: [5.1, -2.9], radius: 1.45, top: 3.7 },
  "research-woods": { center: [-5.5, -0.3], radius: 2.3, top: 1.55 },
  "collaboration-grove": { center: [0.9, -0.2], radius: 1.9, top: 1.3 },
  workshop: { center: [5.2, 1.1], radius: 1.9, top: 1.75 },
  "building-grounds": { center: [-0.9, 3.0], radius: 2.1, top: 1.0 },
};

export const terrain: TerrainPiece[] = [
  // Beach ring and main grassy landmass.
  piece("beach", [0, 0.2], [9.4, 6.5], 0.42, "sand", 11, undefined, -0.3, 0.1),
  piece("land", [0, 0.1], [8.6, 5.7], 0.9, "grass", 7, undefined, 0.2, 0.12),
  // Region plateaus.
  piece("highlands-low", [-1.6, -2.8], [3.3, 2.4], 1.75, "grass", 21, "systems-highlands", 0.6),
  piece("highlands", regionSites["systems-highlands"].center, [2.35, 1.85], 2.7, "grass", 22, "systems-highlands", 1.5),
  piece("summit-rock", [5.0, -2.6], [2.6, 2.2], 2.3, "rock", 31, "milestone-summit", 0.3, 0.18),
  piece("summit", regionSites["milestone-summit"].center, [1.45, 1.25], 3.7, "rock", 32, "milestone-summit", 2.0, 0.12),
  piece("woods", regionSites["research-woods"].center, [2.3, 2.0], 1.55, "grass", 41, "research-woods", 0.6),
  piece("grove", regionSites["collaboration-grove"].center, [1.9, 1.55], 1.3, "grass", 51, "collaboration-grove", 0.6),
  piece("workshop-low", [5.4, 1.4], [2.6, 2.0], 1.25, "grass", 61, "workshop", 0.5),
  piece("workshop", regionSites.workshop.center, [1.9, 1.5], 1.75, "grass", 62, "workshop", 1.0),
  piece("grounds", regionSites["building-grounds"].center, [2.4, 1.6], 1.0, "grass", 71, "building-grounds", 0.5),
];

/** Height of the walkable surface at a point (0 = water). */
export function surfaceHeight(p: Vec2) {
  let h = 0;
  for (const t of terrain) if (t.top > h && pointInPolygon(p, t.outline)) h = t.top;
  return h;
}

/** Landmark footprints that trees and dots should avoid. */
const clearings: { c: Vec2; r: number }[] = [
  { c: regionSites["systems-highlands"].center, r: 1.25 },
  { c: regionSites["milestone-summit"].center, r: 1.1 },
  { c: [-5.2, -0.4], r: 0.95 },
  { c: regionSites["collaboration-grove"].center, r: 1.55 },
  { c: regionSites.workshop.center, r: 1.25 },
  { c: regionSites["building-grounds"].center, r: 1.45 },
  { c: [-0.6, 5.0], r: 0.8 }, // dock
];

/** Path waypoints between regions (x/z); heights come from the surface. */
export const paths: Vec2[][] = [
  [[-0.9, 3.0], [-0.2, 1.8], [0.4, 0.8], [0.9, -0.2]],
  [[0.9, -0.2], [-0.4, -1.2], [-1.4, -2.2], [-1.9, -3.1]],
  [[0.9, -0.2], [2.4, 0.4], [3.8, 0.9], [5.2, 1.1]],
  [[-1.9, -3.1], [0.4, -3.6], [2.6, -3.5], [4.0, -3.0], [5.1, -2.9]],
  [[-0.9, 3.0], [-2.6, 2.4], [-4.0, 1.2], [-5.0, -0.2]],
  [[5.2, 1.1], [5.4, -0.6], [5.1, -2.9]],
];

function catmull(points: Vec2[], samplesPerSegment: number): Vec2[] {
  const out: Vec2[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[Math.min(points.length - 1, i + 2)]!;
    for (let s = 0; s < samplesPerSegment; s++) {
      const t = s / samplesPerSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  return out;
}

/** Evenly spaced dots along every path, sitting on the terrain surface. */
export function pathDots(spacing = 0.32) {
  const dots: [number, number, number][] = [];
  for (const path of paths) {
    const dense = [...catmull(path, 24), path[path.length - 1]!];
    let travelled = 0;
    let next = 0;
    for (let i = 1; i < dense.length; i++) {
      const [ax, az] = dense[i - 1]!;
      const [bx, bz] = dense[i]!;
      const len = Math.hypot(bx - ax, bz - az);
      if (len === 0) continue;
      while (next <= travelled + len) {
        const t = (next - travelled) / len;
        const p: Vec2 = [ax + (bx - ax) * t, az + (bz - az) * t];
        const inClearing = clearings.some(({ c, r }) => Math.hypot(p[0] - c[0], p[1] - c[1]) < r * 0.75);
        const h = surfaceHeight(p);
        if (!inClearing && h > 0) dots.push([p[0], h + 0.02, p[1]]);
        next += spacing;
      }
      travelled += len;
    }
  }
  return dots;
}

function nearPath(p: Vec2, threshold: number) {
  for (const path of paths) {
    for (const q of catmull(path, 10)) if (Math.hypot(p[0] - q[0], p[1] - q[1]) < threshold) return true;
  }
  return false;
}

export interface TreeInstance {
  position: [number, number, number];
  scale: number;
  kind: "pine" | "round";
  rotation: number;
}

/**
 * Scatter trees on grass, denser in Research Woods, avoiding clearings and
 * paths. `density` scales the count down on low-power devices.
 */
export function scatterTrees(density = 1): TreeInstance[] {
  const rand = mulberry32(2024);
  const trees: TreeInstance[] = [];
  const target = Math.round(105 * density);
  let attempts = 0;
  while (trees.length < target && attempts < 6000) {
    attempts++;
    // Bias a share of samples into the woods.
    const inWoods = rand() < 0.5;
    const p: Vec2 = inWoods
      ? [-5.5 + (rand() * 2 - 1) * 2.4, -0.3 + (rand() * 2 - 1) * 2.1]
      : [(rand() * 2 - 1) * 8.6, (rand() * 2 - 1) * 5.8];
    const ground = terrain.filter((t) => t.kind !== "sand" && pointInPolygon(p, t.outline));
    if (!ground.length) continue;
    const top = ground.reduce((a, b) => (b.top > a.top ? b : a));
    if (top.kind === "rock" && rand() < 0.75) continue;
    // Stay away from the edge of the plateau so trees do not hang over cliffs.
    const inset: Vec2[] = [
      [p[0] + 0.3, p[1]],
      [p[0] - 0.3, p[1]],
      [p[0], p[1] + 0.3],
      [p[0], p[1] - 0.3],
    ];
    if (!inset.every((q) => pointInPolygon(q, top.outline))) continue;
    if (clearings.some(({ c, r }) => Math.hypot(p[0] - c[0], p[1] - c[1]) < r)) continue;
    if (nearPath(p, 0.42)) continue;
    // Keep the centre of every non-forest plateau open so its landmark reads clearly.
    if (top.region && top.region !== "research-woods") {
      const site = regionSites[top.region];
      if (Math.hypot(p[0] - site.center[0], p[1] - site.center[1]) < site.radius * 0.72) continue;
    }
    if (trees.some((t) => Math.hypot(t.position[0] - p[0], t.position[2] - p[1]) < 0.42)) continue;
    const woods = top.region === "research-woods" || inWoods;
    trees.push({
      position: [p[0], top.top, p[1]],
      scale: 0.75 + rand() * 0.55,
      kind: woods ? (rand() < 0.75 ? "pine" : "round") : rand() < 0.45 ? "pine" : "round",
      rotation: rand() * Math.PI * 2,
    });
  }
  return trees;
}

/** Beach rocks. */
export function scatterRocks(count = 18) {
  const rand = mulberry32(99);
  const beach = terrain[0]!.outline;
  const land = terrain[1]!.outline;
  const rocks: { position: [number, number, number]; scale: number; rotation: number }[] = [];
  let attempts = 0;
  while (rocks.length < count && attempts < 2000) {
    attempts++;
    const p: Vec2 = [(rand() * 2 - 1) * 9.6, (rand() * 2 - 1) * 6.8];
    if (!pointInPolygon(p, beach) || pointInPolygon(p, land)) continue;
    rocks.push({ position: [p[0], 0.42, p[1]], scale: 0.18 + rand() * 0.25, rotation: rand() * Math.PI });
  }
  return rocks;
}
