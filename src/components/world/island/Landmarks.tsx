"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { geometries, materials } from "./materials";

type V3 = [number, number, number];

/** Terse mesh helper: shared geometry + material, casting shadows. */
function M({
  g,
  m,
  p = [0, 0, 0],
  s = [1, 1, 1],
  r = [0, 0, 0],
  shadow = true,
}: {
  g: THREE.BufferGeometry;
  m: THREE.Material;
  p?: V3;
  s?: V3 | number;
  r?: V3;
  shadow?: boolean;
}) {
  return (
    <mesh
      geometry={g}
      material={m}
      position={p}
      scale={typeof s === "number" ? [s, s, s] : s}
      rotation={r}
      castShadow={shadow}
      receiveShadow
    />
  );
}

/** Systems Highlands — observatory with a dish. */
export function Observatory() {
  const dome = useMemo(() => new THREE.SphereGeometry(0.72, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), []);
  return (
    <group>
      <M g={geometries.cyl10} m={materials.cream} p={[0, 0.36, 0]} s={[0.85, 0.72, 0.85]} />
      <M g={geometries.cyl10} m={materials.ink} p={[0, 0.74, 0]} s={[0.9, 0.06, 0.9]} />
      <mesh geometry={dome} material={materials.steel} position={[0, 0.76, 0]} castShadow />
      <M g={geometries.box} m={materials.ink} p={[0.12, 1.16, 0.32]} s={[0.18, 0.5, 0.3]} r={[0.6, 0.4, 0]} />
      {/* Door */}
      <M g={geometries.box} m={materials.woodDark} p={[0.0, 0.22, 0.84]} s={[0.26, 0.42, 0.04]} shadow={false} />
      {/* Satellite dish */}
      <group position={[-1.05, 0, 0.45]}>
        <M g={geometries.cyl6} m={materials.steel} p={[0, 0.35, 0]} s={[0.05, 0.7, 0.05]} />
        <M g={geometries.cone8} m={materials.cream} p={[0, 0.78, 0]} s={[0.36, 0.16, 0.36]} r={[2.4, 0.6, 0.3]} />
      </group>
      <group position={[0.95, 0, -0.55]}>
        <M g={geometries.cyl6} m={materials.steel} p={[0, 0.5, 0]} s={[0.035, 1, 0.035]} />
        <M g={geometries.ico} m={materials.coral} p={[0, 1.02, 0]} s={0.07} />
      </group>
    </group>
  );
}

/** Milestone Summit — striped lighthouse with a sweeping beam. */
export function Lighthouse({ animate }: { animate: boolean }) {
  const beam = useRef<THREE.Group>(null);
  const beamGeo = useMemo(() => {
    const g = new THREE.ConeGeometry(0.55, 3.2, 12, 1, true);
    g.rotateZ(Math.PI / 2);
    g.translate(1.6, 0, 0);
    return g;
  }, []);
  useFrame((_, dt) => {
    if (animate && beam.current) beam.current.rotation.y += dt * 0.6;
  });
  const bands = [0, 1, 2, 3];
  return (
    <group>
      <M g={geometries.cyl10} m={materials.rock} p={[0, 0.12, 0]} s={[0.75, 0.24, 0.75]} />
      {bands.map((i) => {
        const r = 0.5 - i * 0.07;
        return (
          <M
            key={i}
            g={geometries.cyl10}
            m={i % 2 === 0 ? materials.cream : materials.coral}
            p={[0, 0.24 + 0.3 * i + 0.15, 0]}
            s={[r, 0.3, r]}
          />
        );
      })}
      <M g={geometries.cyl10} m={materials.ink} p={[0, 1.47, 0]} s={[0.42, 0.06, 0.42]} />
      <M g={geometries.cyl10} m={materials.lamp} p={[0, 1.66, 0]} s={[0.22, 0.32, 0.22]} shadow={false} />
      <M g={geometries.cone8} m={materials.ink} p={[0, 1.98, 0]} s={[0.3, 0.32, 0.3]} />
      <group ref={beam} position={[0, 1.66, 0]}>
        <mesh geometry={beamGeo} material={materials.beam} />
      </group>
    </group>
  );
}

/** Research Woods — timber cabin. */
export function Cabin() {
  const roof = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.62, 0.62, 1.35, 3);
    g.rotateZ(Math.PI / 2);
    return g;
  }, []);
  return (
    <group rotation={[0, 0.35, 0]}>
      <M g={geometries.box} m={materials.woodDark} p={[0, 0.06, 0]} s={[1.35, 0.12, 1.05]} />
      <M g={geometries.box} m={materials.wood} p={[0, 0.45, 0]} s={[1.1, 0.68, 0.85]} />
      <mesh geometry={roof} material={materials.woodDark} position={[0, 0.98, 0]} scale={[1, 0.85, 1.05]} castShadow />
      <M g={geometries.box} m={materials.window} p={[0.28, 0.5, 0.43]} s={[0.24, 0.24, 0.03]} shadow={false} />
      <M g={geometries.box} m={materials.window} p={[-0.3, 0.5, 0.43]} s={[0.24, 0.24, 0.03]} shadow={false} />
      <M g={geometries.box} m={materials.window} p={[0.56, 0.5, 0]} s={[0.03, 0.24, 0.28]} shadow={false} />
      <M g={geometries.box} m={materials.brick} p={[-0.32, 1.25, -0.15]} s={[0.16, 0.42, 0.16]} />
    </group>
  );
}

/** Collaboration Grove — a stepped amphitheatre with a small pavilion. */
export function Amphitheatre() {
  const steps = useMemo(() => {
    const make = (outer: number, inner: number, height: number) => {
      const shape = new THREE.Shape();
      shape.absarc(0, 0, outer, 0, Math.PI, false);
      shape.lineTo(-inner, 0);
      shape.absarc(0, 0, inner, Math.PI, 0, true);
      shape.closePath();
      const g = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false, curveSegments: 10 });
      g.rotateX(-Math.PI / 2);
      return g;
    };
    return [make(1.35, 1.05, 0.42), make(1.05, 0.78, 0.28), make(0.78, 0.52, 0.14)];
  }, []);
  return (
    <group>
      {/* Seats open towards the viewer. */}
      <group rotation={[0, Math.PI + 0.25, 0]} position={[0, 0, -0.1]}>
        {steps.map((g, i) => (
          <mesh key={i} geometry={g} material={i % 2 ? materials.sandDark : materials.sand} castShadow receiveShadow />
        ))}
      </group>
      <M g={geometries.cyl10} m={materials.cream} p={[0, 0.04, 0.05]} s={[0.5, 0.08, 0.5]} />
      <M g={geometries.ico} m={materials.coral} p={[0, 0.18, 0.05]} s={0.09} />
      {/* Pavilion */}
      <group position={[1.35, 0, 0.75]}>
        {[
          [-0.32, -0.28],
          [0.32, -0.28],
          [-0.32, 0.28],
          [0.32, 0.28],
        ].map(([x, z]) => (
          <M key={`${x}${z}`} g={geometries.box} m={materials.woodDark} p={[x!, 0.32, z!]} s={[0.06, 0.64, 0.06]} />
        ))}
        <M g={geometries.box} m={materials.cream} p={[0, 0.68, 0]} s={[0.86, 0.06, 0.78]} r={[0, 0, 0.12]} />
      </group>
    </group>
  );
}

/** The Workshop — brick forge with chimneys, gears and drifting smoke. */
export function Forge({ animate }: { animate: boolean }) {
  const smoke = useRef<THREE.Group>(null);
  const gear = useMemo(() => new THREE.TorusGeometry(0.22, 0.07, 6, 10), []);
  useFrame((state) => {
    if (!animate || !smoke.current) return;
    const t = state.clock.elapsedTime;
    smoke.current.children.forEach((puff, i) => {
      const phase = (t * 0.35 + i / 3) % 1;
      puff.position.y = phase * 1.3;
      puff.position.x = Math.sin(phase * 3 + i) * 0.12;
      puff.scale.setScalar(0.1 + phase * 0.2);
      ((puff as THREE.Mesh).material as THREE.Material).opacity = 0.85 * (1 - phase);
    });
  });
  const smokeMats = useMemo(() => [0, 1, 2].map(() => materials.smoke.clone()), []);
  return (
    <group rotation={[0, -0.3, 0]}>
      <M g={geometries.box} m={materials.brick} p={[0, 0.42, 0]} s={[1.15, 0.84, 0.9]} />
      <M g={geometries.box} m={materials.ink} p={[0, 0.9, 0]} s={[1.25, 0.1, 1.0]} />
      <M g={geometries.box} m={materials.glow} p={[0.05, 0.28, 0.46]} s={[0.38, 0.48, 0.03]} shadow={false} />
      <M g={geometries.cyl6} m={materials.steel} p={[-0.32, 1.3, -0.15]} s={[0.13, 0.85, 0.13]} />
      <M g={geometries.cyl6} m={materials.steel} p={[0.25, 1.15, -0.2]} s={[0.1, 0.55, 0.1]} />
      <group ref={smoke} position={[-0.32, 1.75, -0.15]}>
        {smokeMats.map((mat, i) => (
          <mesh key={i} geometry={geometries.ico} material={mat} scale={0.15 + i * 0.05} position={[0, i * 0.4, 0]} />
        ))}
      </group>
      <mesh geometry={gear} material={materials.mustard} position={[0.95, 0.24, 0.55]} rotation={[-Math.PI / 2.4, 0, 0]} castShadow />
      <mesh geometry={gear} material={materials.steel} position={[1.15, 0.12, 0.05]} rotation={[-Math.PI / 2, 0, 0]} scale={0.75} castShadow />
      <M g={geometries.box} m={materials.wood} p={[-0.95, 0.15, 0.45]} s={0.3} />
      <M g={geometries.box} m={materials.wood} p={[-0.85, 0.42, 0.42]} s={0.24} r={[0, 0.5, 0]} />
      <M g={geometries.box} m={materials.woodDark} p={[-1.0, 0.13, 0.05]} s={0.26} r={[0, 0.3, 0]} />
    </group>
  );
}

/** The Building Grounds — glass lab with solar panels and a dock. */
export function GlassLab() {
  const panels: V3[] = [
    [-0.55, 0, -0.1],
    [-0.1, 0, -0.1],
    [0.35, 0, -0.1],
  ];
  return (
    <group rotation={[0, 0.1, 0]}>
      {/* Main block */}
      <M g={geometries.box} m={materials.cream} p={[-0.1, 0.06, 0]} s={[1.75, 0.12, 1.15]} />
      <M g={geometries.box} m={materials.glass} p={[-0.1, 0.5, 0]} s={[1.55, 0.8, 0.95]} shadow={false} />
      <M g={geometries.box} m={materials.cream} p={[-0.1, 0.93, 0]} s={[1.65, 0.08, 1.05]} />
      {/* Frame columns */}
      {[-0.86, -0.1, 0.66].map((x) => (
        <M key={x} g={geometries.box} m={materials.cream} p={[x, 0.5, 0.46]} s={[0.06, 0.82, 0.06]} />
      ))}
      {/* Solar panels */}
      {panels.map((p, i) => (
        <M key={i} g={geometries.box} m={materials.solar} p={[p[0], 1.05, p[2]]} s={[0.4, 0.04, 0.62]} r={[0.35, 0, 0]} />
      ))}
      {/* Glass cube annex */}
      <M g={geometries.box} m={materials.glass} p={[1.08, 0.38, 0.25]} s={[0.62, 0.62, 0.62]} shadow={false} />
      <M g={geometries.box} m={materials.cream} p={[1.08, 0.72, 0.25]} s={[0.68, 0.06, 0.68]} />
      <M g={geometries.box} m={materials.teal} p={[-0.1, 0.32, 0.49]} s={[0.32, 0.5, 0.02]} shadow={false} />
    </group>
  );
}

/** Wooden dock with a small boat. */
export function Dock({ animate }: { animate: boolean }) {
  const boat = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!animate || !boat.current) return;
    const t = state.clock.elapsedTime;
    boat.current.position.y = 0.06 + Math.sin(t * 1.4) * 0.04;
    boat.current.rotation.z = Math.sin(t * 1.1) * 0.05;
  });
  return (
    <group>
      <M g={geometries.box} m={materials.wood} p={[0, 0.3, 0]} s={[0.55, 0.07, 1.6]} />
      {[-0.6, 0.1, 0.7].map((z) => (
        <group key={z}>
          <M g={geometries.cyl6} m={materials.woodDark} p={[-0.25, 0.12, z]} s={[0.05, 0.4, 0.05]} />
          <M g={geometries.cyl6} m={materials.woodDark} p={[0.25, 0.12, z]} s={[0.05, 0.4, 0.05]} />
        </group>
      ))}
      <group ref={boat} position={[0.75, 0.06, 0.55]}>
        <Boat />
      </group>
    </group>
  );
}

export function Boat({ sail = false }: { sail?: boolean }) {
  return (
    <group>
      <M g={geometries.box} m={materials.coral} p={[0, 0.06, 0]} s={[0.32, 0.14, 0.75]} />
      <M g={geometries.box} m={materials.cream} p={[0, 0.15, 0]} s={[0.26, 0.04, 0.62]} />
      {sail && (
        <>
          <M g={geometries.cyl6} m={materials.woodDark} p={[0, 0.5, 0.05]} s={[0.025, 0.75, 0.025]} />
          <mesh position={[0.01, 0.55, 0.12]} material={materials.cream} castShadow>
            <coneGeometry args={[0.28, 0.6, 3]} />
          </mesh>
        </>
      )}
    </group>
  );
}
