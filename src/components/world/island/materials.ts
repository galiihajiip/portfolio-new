import * as THREE from "three";

/**
 * Shared flat-shaded materials. Created once per module so every mesh reuses
 * them (fewer GPU programs and state changes).
 */
const flat = (color: string, extra: THREE.MeshStandardMaterialParameters = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.95, metalness: 0, flatShading: true, ...extra });

export const palette = {
  grass: "#7cc24a",
  grassDark: "#5aa83a",
  moss: "#9cbc5a",
  dirt: "#b87a4b",
  dirtDark: "#8f5a36",
  sand: "#f4d9a0",
  sandDark: "#dcb779",
  rock: "#a9a59c",
  rockDark: "#7f7b74",
  cream: "#fff5e6",
  ink: "#202735",
  coral: "#ef5b4e",
  mustard: "#f6b832",
  teal: "#2c929c",
  glass: "#9fe0e6",
  wood: "#b8733f",
  woodDark: "#6e4227",
  brick: "#9a4f3c",
  steel: "#5b6474",
  solar: "#29457a",
  skin: "#f3c299",
  hair: "#1a1e28",
  pants: "#223147",
};

export const materials = {
  grass: flat(palette.grass),
  grassDark: flat(palette.grassDark),
  moss: flat(palette.moss),
  dirt: flat(palette.dirt),
  dirtDark: flat(palette.dirtDark),
  sand: flat(palette.sand),
  sandDark: flat(palette.sandDark),
  rock: flat(palette.rock),
  rockDark: flat(palette.rockDark),
  cream: flat(palette.cream),
  ink: flat(palette.ink),
  coral: flat(palette.coral),
  mustard: flat(palette.mustard),
  teal: flat(palette.teal),
  wood: flat(palette.wood),
  woodDark: flat(palette.woodDark),
  brick: flat(palette.brick),
  skin: flat(palette.skin),
  hair: flat(palette.hair),
  pants: flat(palette.pants),
  steel: flat(palette.steel, { roughness: 0.6, metalness: 0.2 }),
  solar: flat(palette.solar, { roughness: 0.35, metalness: 0.3 }),
  glass: flat(palette.glass, { transparent: true, opacity: 0.72, roughness: 0.2 }),
  lamp: new THREE.MeshStandardMaterial({ color: "#ffe39a", emissive: "#ffc94a", emissiveIntensity: 1.4, flatShading: true }),
  glow: new THREE.MeshStandardMaterial({ color: "#ffb347", emissive: "#ff8a2a", emissiveIntensity: 1.6, flatShading: true }),
  window: new THREE.MeshStandardMaterial({ color: "#ffe7a8", emissive: "#ffcf66", emissiveIntensity: 0.7, flatShading: true }),
  path: flat(palette.cream, { roughness: 1 }),
  foam: new THREE.MeshBasicMaterial({ color: "#f3fbfb", transparent: true, opacity: 0.85 }),
  lagoon: new THREE.MeshStandardMaterial({ color: "#58c0c4", transparent: true, opacity: 0.75, roughness: 0.4 }),
  cloud: new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 1, flatShading: true, transparent: true, opacity: 0.94 }),
  smoke: new THREE.MeshStandardMaterial({ color: "#eae6df", roughness: 1, flatShading: true, transparent: true, opacity: 0.8 }),
  beam: new THREE.MeshBasicMaterial({ color: "#fff1bf", transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false }),
  ring: new THREE.MeshBasicMaterial({ color: palette.mustard, transparent: true, opacity: 0.95, depthWrite: false }),
};

/** Shared low-poly geometries. */
export const geometries = {
  box: new THREE.BoxGeometry(1, 1, 1),
  cyl6: new THREE.CylinderGeometry(1, 1, 1, 6),
  cyl10: new THREE.CylinderGeometry(1, 1, 1, 10),
  cone6: new THREE.ConeGeometry(1, 1, 6),
  cone8: new THREE.ConeGeometry(1, 1, 8),
  ico: new THREE.IcosahedronGeometry(1, 0),
  dodeca: new THREE.DodecahedronGeometry(1, 0),
  dot: new THREE.CylinderGeometry(0.075, 0.075, 0.03, 6),
};
