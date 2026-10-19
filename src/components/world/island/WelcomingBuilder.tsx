"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { geometries, materials } from "./materials";

type V3 = [number, number, number];

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

/**
 * 3D Animated Builder Character on the island dock.
 * Features a friendly welcoming low-poly avatar with an animated waving arm,
 * gentle breathing/idle movement, and an explorer cap.
 */
export function WelcomingBuilder({
  animate,
  onInteract,
}: {
  animate: boolean;
  onInteract?: () => void;
}) {
  const wavingArmRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const headGeo = useMemo(() => new THREE.SphereGeometry(0.18, 10, 8), []);

  useFrame((state) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;

    // Smooth idle breathing and slight bobbing
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(t * 2) * 0.02;
    }

    // Friendly head tilt
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(t * 1.5) * 0.08;
      headRef.current.rotation.y = Math.sin(t * 1.2) * 0.12;
    }

    // Welcoming waving right arm
    if (wavingArmRef.current) {
      // Base arm raised up + oscillating wave back and forth
      const wave = Math.sin(t * 5.5) * 0.35;
      wavingArmRef.current.rotation.z = -2.1 + wave;
      wavingArmRef.current.rotation.x = Math.cos(t * 5.5) * 0.15;
    }
  });

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onInteract?.();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <group ref={bodyRef}>
        {/* Legs & Shoes */}
        <M g={geometries.box} m={materials.ink} p={[-0.1, 0.06, 0]} s={[0.11, 0.12, 0.18]} />
        <M g={geometries.box} m={materials.ink} p={[0.1, 0.06, 0]} s={[0.11, 0.12, 0.18]} />
        <M g={geometries.cyl6} m={materials.pants} p={[-0.1, 0.22, 0]} s={[0.065, 0.22, 0.065]} />
        <M g={geometries.cyl6} m={materials.pants} p={[0.1, 0.22, 0]} s={[0.065, 0.22, 0.065]} />

        {/* Torso (Warm Mustard Builder Jacket) */}
        <M g={geometries.box} m={materials.mustard} p={[0, 0.46, 0]} s={[0.34, 0.28, 0.22]} />
        {/* Belt */}
        <M g={geometries.box} m={materials.ink} p={[0, 0.33, 0]} s={[0.35, 0.04, 0.23]} />
        {/* Inner Shirt Collar */}
        <M g={geometries.box} m={materials.cream} p={[0, 0.58, 0.09]} s={[0.12, 0.08, 0.04]} />

        {/* Left Arm (Relaxed at side) */}
        <group position={[-0.22, 0.54, 0]}>
          <M g={geometries.cyl6} m={materials.mustard} p={[0, -0.12, 0]} s={[0.05, 0.22, 0.05]} r={[0, 0, 0.2]} />
          <M g={geometries.ico} m={materials.skin} p={[-0.04, -0.24, 0]} s={0.045} />
        </group>

        {/* Right Arm (Waving Welcome Arm) */}
        <group position={[0.22, 0.54, 0]}>
          {/* Pivot point at the shoulder */}
          <group ref={wavingArmRef}>
            {/* Upper & Forearm */}
            <M g={geometries.cyl6} m={materials.mustard} p={[0, 0.12, 0]} s={[0.05, 0.24, 0.05]} />
            {/* Waving Hand */}
            <M g={geometries.ico} m={materials.skin} p={[0, 0.26, 0]} s={0.05} />
          </group>
        </group>

        {/* Head & Face */}
        <group ref={headRef} position={[0, 0.73, 0]}>
          <mesh geometry={headGeo} material={materials.skin} castShadow />
          {/* Dark Hair / Back & Top */}
          <M g={geometries.box} m={materials.hair} p={[0, 0.07, -0.04]} s={[0.34, 0.18, 0.32]} />
          {/* Friendly Explorer Cap (Coral visor) */}
          <M g={geometries.cyl10} m={materials.coral} p={[0, 0.16, 0]} s={[0.2, 0.07, 0.2]} />
          <M g={geometries.box} m={materials.coral} p={[0, 0.14, 0.15]} s={[0.22, 0.03, 0.14]} r={[-0.1, 0, 0]} />
        </group>
      </group>
    </group>
  );
}
