"use client";

import { type ThreeEvent, useFrame } from "@react-three/fiber";
import { type ComponentType, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { regions } from "@/content/regions";
import type { RegionId } from "@/types/portfolio";
import { Amphitheatre, Boat, Cabin, Dock, Forge, GlassLab, Lighthouse, Observatory } from "./Landmarks";
import { pathDots, regionSites, scatterRocks, scatterTrees, type TerrainPiece, terrain, type Vec2 } from "./layout";
import { geometries, materials } from "./materials";
import { WelcomingBuilder } from "./WelcomingBuilder";

export interface IslandProps {
  selected: RegionId | null;
  hovered: RegionId | null;
  onHover: (id: RegionId | null) => void;
  onSelect: (id: RegionId) => void;
  animate: boolean;
  density: number;
  onCharacterClick?: () => void;
}

/** Local coordinates of the character standing at the dock pier */
export const CHARACTER_ANCHOR: [number, number, number] = [-0.6, 0.35, 6.4];
/** Local anchor where the greeting speech bubble should hang above the character's head */
export const GREETING_ANCHOR: [number, number, number] = [-0.6, 1.45, 6.4];

/* ------------------------------------------------------------------ */
/* Terrain                                                            */
/* ------------------------------------------------------------------ */

function centroid(outline: Vec2[]): Vec2 {
  const s = outline.reduce<Vec2>((a, p) => [a[0] + p[0], a[1] + p[1]], [0, 0]);
  return [s[0] / outline.length, s[1] / outline.length];
}

/** Outline -> THREE.Shape in the XY plane (y = -z so it lies flat after rotation). */
function toShape(outline: Vec2[], scale = 1) {
  const [cx, cz] = centroid(outline);
  const pts = outline.map(([x, z]) => new THREE.Vector2(cx + (x - cx) * scale, -(cz + (z - cz) * scale)));
  const shape = new THREE.Shape();
  shape.moveTo(pts[0]!.x, pts[0]!.y);
  shape.splineThru([...pts.slice(1), pts[0]!]);
  return shape;
}

function slab(shape: THREE.Shape, depth: number, bevel: number) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 1,
    curveSegments: 3,
  });
  g.rotateX(-Math.PI / 2);
  return g;
}

const topFor: Record<TerrainPiece["kind"], THREE.Material> = {
  sand: materials.sand,
  grass: materials.grass,
  rock: materials.moss,
};
const sideFor: Record<TerrainPiece["kind"], THREE.Material> = {
  sand: materials.sandDark,
  grass: materials.dirt,
  rock: materials.rock,
};

function TerrainPieceMesh({ piece }: { piece: TerrainPiece }) {
  const bevel = 0.07;
  const { body, lip } = useMemo(() => {
    const body = slab(toShape(piece.outline), Math.max(0.05, piece.top - piece.base - bevel), bevel);
    const lip = piece.kind === "grass" ? slab(toShape(piece.outline, 1.025), 0.12, 0.05) : null;
    return { body, lip };
  }, [piece]);
  useLayoutEffect(
    () => () => {
      body.dispose();
      lip?.dispose();
    },
    [body, lip],
  );
  const summitTop = piece.id === "summit" ? materials.rock : topFor[piece.kind];
  return (
    <group>
      <mesh geometry={body} material={[summitTop, sideFor[piece.kind]]} position={[0, piece.base, 0]} castShadow receiveShadow />
      {lip && (
        <mesh geometry={lip} material={[materials.grass, materials.grassDark]} position={[0, piece.top - 0.15, 0]} receiveShadow />
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Water                                                              */
/* ------------------------------------------------------------------ */

function Water({ animate }: { animate: boolean }) {
  const foam = useRef<THREE.Mesh>(null);
  const { lagoon, ring } = useMemo(() => {
    const beach = terrain[0]!.outline;
    const lagoon = new THREE.ShapeGeometry(toShape(beach, 1.22), 6);
    lagoon.rotateX(-Math.PI / 2);
    const outer = toShape(beach, 1.075);
    const inner = toShape(beach, 1.0);
    outer.holes.push(new THREE.Path(inner.getPoints(8).reverse()));
    const ring = new THREE.ShapeGeometry(outer, 8);
    ring.rotateX(-Math.PI / 2);
    return { lagoon, ring };
  }, []);
  useFrame((state) => {
    if (!animate || !foam.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.008;
    foam.current.scale.set(s, 1, s);
  });
  return (
    <group>
      <mesh geometry={lagoon} material={materials.lagoon} position={[0, 0, 0]} receiveShadow />
      <mesh ref={foam} geometry={ring} material={materials.foam} position={[0, 0.02, 0]} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Vegetation, rocks, paths                                           */
/* ------------------------------------------------------------------ */

const foliageMaterial = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.95, flatShading: true });
const pineColors = ["#2f7d43", "#3b8f4c", "#2a6e3c"].map((c) => new THREE.Color(c));
const roundColors = ["#5fae3c", "#6fbd45", "#4f9d36"].map((c) => new THREE.Color(c));

function Trees({ density }: { density: number }) {
  const trees = useMemo(() => scatterTrees(density), [density]);
  const pines = trees.filter((t) => t.kind === "pine");
  const rounds = trees.filter((t) => t.kind === "round");
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const pineLowRef = useRef<THREE.InstancedMesh>(null);
  const pineHighRef = useRef<THREE.InstancedMesh>(null);
  const roundRef = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const set = (mesh: THREE.InstancedMesh | null, i: number, pos: THREE.Vector3, scale: THREE.Vector3, rot: number) => {
      if (!mesh) return;
      q.setFromAxisAngle(up, rot);
      m.compose(pos, q, scale);
      mesh.setMatrixAt(i, m);
    };
    trees.forEach((t, i) => {
      const [x, y, z] = t.position;
      set(trunkRef.current, i, new THREE.Vector3(x, y + 0.16 * t.scale, z), new THREE.Vector3(0.07, 0.34, 0.07).multiplyScalar(t.scale), t.rotation);
    });
    pines.forEach((t, i) => {
      const [x, y, z] = t.position;
      const s = t.scale;
      set(pineLowRef.current, i, new THREE.Vector3(x, y + 0.55 * s, z), new THREE.Vector3(0.4, 0.7, 0.4).multiplyScalar(s), t.rotation);
      set(pineHighRef.current, i, new THREE.Vector3(x, y + 0.92 * s, z), new THREE.Vector3(0.28, 0.55, 0.28).multiplyScalar(s), t.rotation);
      pineLowRef.current?.setColorAt(i, pineColors[i % pineColors.length]!);
      pineHighRef.current?.setColorAt(i, pineColors[(i + 1) % pineColors.length]!);
    });
    rounds.forEach((t, i) => {
      const [x, y, z] = t.position;
      const s = t.scale;
      set(roundRef.current, i, new THREE.Vector3(x, y + 0.6 * s, z), new THREE.Vector3(0.42, 0.4, 0.42).multiplyScalar(s), t.rotation);
      roundRef.current?.setColorAt(i, roundColors[i % roundColors.length]!);
    });
    for (const mesh of [trunkRef.current, pineLowRef.current, pineHighRef.current, roundRef.current]) {
      if (!mesh) continue;
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.computeBoundingSphere();
    }
  }, [trees, pines, rounds]);

  return (
    <group>
      <instancedMesh ref={trunkRef} args={[geometries.cyl6, materials.woodDark, trees.length]} castShadow />
      <instancedMesh ref={pineLowRef} args={[geometries.cone6, foliageMaterial, pines.length]} castShadow receiveShadow />
      <instancedMesh ref={pineHighRef} args={[geometries.cone6, foliageMaterial, pines.length]} castShadow />
      <instancedMesh ref={roundRef} args={[geometries.ico, foliageMaterial, rounds.length]} castShadow receiveShadow />
    </group>
  );
}

function Rocks() {
  const rocks = useMemo(() => scatterRocks(), []);
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const o = new THREE.Object3D();
    rocks.forEach((r, i) => {
      o.position.set(...r.position);
      o.rotation.set(0.3, r.rotation, 0.2);
      o.scale.set(r.scale * 1.3, r.scale, r.scale);
      o.updateMatrix();
      ref.current?.setMatrixAt(i, o.matrix);
    });
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
  }, [rocks]);
  return <instancedMesh ref={ref} args={[geometries.dodeca, materials.rock, rocks.length]} castShadow receiveShadow />;
}

function PathDots() {
  const dots = useMemo(() => pathDots(), []);
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const o = new THREE.Object3D();
    dots.forEach((d, i) => {
      o.position.set(...d);
      o.updateMatrix();
      ref.current?.setMatrixAt(i, o.matrix);
    });
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
  }, [dots]);
  return <instancedMesh ref={ref} args={[geometries.dot, materials.path, dots.length]} receiveShadow />;
}

function Cloud({ position, scale = 1, animate, speed = 0.15 }: { position: [number, number, number]; scale?: number; animate: boolean; speed?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (animate && ref.current) ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * speed) * 0.6;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh geometry={geometries.ico} material={materials.cloud} scale={[0.9, 0.55, 0.7]} />
      <mesh geometry={geometries.ico} material={materials.cloud} position={[0.75, -0.1, 0.15]} scale={[0.6, 0.42, 0.55]} />
      <mesh geometry={geometries.ico} material={materials.cloud} position={[-0.7, -0.12, 0.05]} scale={[0.55, 0.38, 0.5]} />
    </group>
  );
}

function FloatingBoat({ position, rotation, animate }: { position: [number, number, number]; rotation: number; animate: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!animate || !ref.current) return;
    const t = state.clock.elapsedTime + position[0];
    ref.current.position.y = position[1] + Math.sin(t * 1.3) * 0.05;
    ref.current.rotation.x = Math.sin(t) * 0.05;
  });
  return (
    <group ref={ref} position={position} rotation={[0, rotation, 0]}>
      <Boat sail />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Regions: landmark, hit area, active ring, label                    */
/* ------------------------------------------------------------------ */

/** Landmark per region; `pin` is the label anchor relative to the plateau top. */
const landmarkFor: Record<RegionId, { Component: ComponentType<{ animate: boolean }>; offset: Vec2; pin: [number, number, number] }> = {
  "systems-highlands": { Component: Observatory, offset: [0, 0], pin: [0, 1.9, 0] },
  "milestone-summit": { Component: Lighthouse, offset: [0, 0], pin: [0, 2.25, 0] },
  "research-woods": { Component: Cabin, offset: [0.3, -0.1], pin: [0.3, 1.55, -0.1] },
  "collaboration-grove": { Component: Amphitheatre, offset: [0, 0], pin: [-0.3, 1.0, -0.6] },
  workshop: { Component: Forge, offset: [0, 0], pin: [0.5, 1.6, 0.4] },
  "building-grounds": { Component: GlassLab, offset: [0, 0], pin: [-1.9, 0.9, 0.9] },
};

/** Pin anchor for each region in island-local coordinates (above its landmark). */
export const pinAnchors = Object.fromEntries(
  regions.map((r) => {
    const site = regionSites[r.id];
    const { pin } = landmarkFor[r.id];
    return [r.id, [site.center[0] + pin[0], site.top + pin[1], site.center[1] + pin[2]]];
  }),
) as Record<RegionId, [number, number, number]>;

function RegionNode({
  id,
  active,
  hovered,
  animate,
  onHover,
  onSelect,
}: {
  id: RegionId;
  active: boolean;
  hovered: boolean;
  animate: boolean;
  onHover: IslandProps["onHover"];
  onSelect: IslandProps["onSelect"];
}) {
  const site = regionSites[id];
  const { Component, offset } = landmarkFor[id];
  const lift = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const ringGeo = useMemo(() => {
    const g = new THREE.RingGeometry(site.radius * 0.82, site.radius * 0.82 + 0.1, 48);
    g.rotateX(-Math.PI / 2);
    return g;
  }, [site.radius]);
  const highlighted = active || hovered;

  useFrame((state, dt) => {
    if (lift.current) {
      const target = highlighted ? 0.16 : 0;
      const k = animate ? 1 - Math.exp(-dt * 10) : 1;
      lift.current.position.y += (target - lift.current.position.y) * k;
    }
    if (ring.current) {
      ring.current.visible = highlighted;
      const pulse = animate ? 1 + Math.sin(state.clock.elapsedTime * 3) * 0.03 : 1;
      ring.current.scale.set(pulse, 1, pulse);
    }
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onHover(id);
  };
  const out = () => onHover(null);
  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(id);
  };

  return (
    <group position={[site.center[0], 0, site.center[1]]}>
      {/* Invisible hit area covering the region's plateau. */}
      <mesh position={[0, site.top / 2, 0]} scale={[site.radius, site.top + 0.6, site.radius]} onPointerOver={over} onPointerOut={out} onClick={click}>
        <cylinderGeometry args={[1, 1, 1, 12]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <mesh ref={ring} geometry={ringGeo} material={materials.ring} position={[0, site.top + 0.05, 0]} visible={false} />
      <group ref={lift}>
        <group position={[offset[0], site.top, offset[1]]}>
          <Component animate={animate} />
        </group>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Island                                                             */
/* ------------------------------------------------------------------ */

export function Island({
  selected,
  hovered,
  onHover,
  onSelect,
  animate,
  density,
  onCharacterClick,
}: IslandProps) {
  return (
    // Rotated so local +x = screen right and local +z = towards the viewer.
    <group rotation={[0, Math.PI / 4, 0]}>
      <Water animate={animate} />
      {terrain.map((p) => (
        <TerrainPieceMesh key={p.id} piece={p} />
      ))}
      <Trees density={density} />
      <Rocks />
      <PathDots />
      <group position={[-0.6, 0, 6.6]}>
        <Dock animate={animate} />
      </group>
      {/* Welcoming animated 3D character greeting visitors on the pier */}
      <group position={[-0.6, 0.35, 6.4]} rotation={[0, 0.25, 0]}>
        <WelcomingBuilder animate={animate} onInteract={onCharacterClick} />
      </group>
      <FloatingBoat position={[-9.3, 0.05, 4.2]} rotation={0.6} animate={animate} />
      <FloatingBoat position={[8.6, 0.05, 6.0]} rotation={-0.9} animate={animate} />
      {regions.map((r) => (
        <RegionNode
          key={r.id}
          id={r.id}
          active={selected === r.id}
          hovered={hovered === r.id}
          animate={animate}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
      <Cloud position={[-10.5, 5.2, -5.5]} scale={1.3} animate={animate} />
      <Cloud position={[10.5, 4.6, -6.5]} scale={1.1} animate={animate} speed={0.11} />
      <Cloud position={[11, 3.8, 5]} scale={0.9} animate={animate} speed={0.18} />
    </group>
  );
}
