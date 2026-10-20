"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { regions } from "@/content/regions";
import * as THREE from "three";
import type { RegionId } from "@/types/portfolio";
import { GREETING_ANCHOR, Island, pinAnchors } from "./island/Island";

export interface Framing {
  /** Where the island's centre should sit, as fractions of the canvas. */
  cx: number;
  cy: number;
  /** Share of the canvas width/height the island may occupy. */
  fitW: number;
  fitH: number;
}

export interface WorldSceneProps {
  selected: RegionId | null;
  hovered: RegionId | null;
  onHover: (id: RegionId | null) => void;
  onSelect: (id: RegionId) => void;
  onReady: () => void;
  onError: (reason: string) => void;
  framing: Framing;
  quality: "high" | "low";
  animate: boolean;
  /** False while the map is scrolled out of view: rendering pauses. */
  active: boolean;
  compactLabels: boolean;
}

// Island extents in screen-space world units (measured from the layout).
const ISLAND_W = 21;
const ISLAND_H = 11.5;

const VIEW_DIR = new THREE.Vector3(1, 1, 1).normalize();
const SCREEN_RIGHT = new THREE.Vector3(1, 0, -1).normalize();
const SCREEN_UP = new THREE.Vector3(-1, 2, -1).normalize();
const BASE_TARGET = new THREE.Vector3(0, 1.6, 0);

/**
 * Isometric orthographic camera that frames the island inside the free area
 * of the hero and drifts a little with the pointer (never rotates the world).
 */
function CameraRig({ framing, animate }: { framing: Framing; animate: boolean }) {
  const parallax = useRef(new THREE.Vector2());
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    const { size, pointer } = state;
    const camera = state.camera as THREE.OrthographicCamera;
    const zoom = Math.min((size.width * framing.fitW) / ISLAND_W, (size.height * framing.fitH) / ISLAND_H);
    if (Math.abs(camera.zoom - zoom) > 0.001) {
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    }
    const k = animate ? 1 - Math.exp(-dt * 2.5) : 1;
    const px = animate ? pointer.x * 0.35 : 0;
    const py = animate ? pointer.y * 0.2 : 0;
    parallax.current.x += (px - parallax.current.x) * k;
    parallax.current.y += (py - parallax.current.y) * k;

    const shiftX = ((0.5 - framing.cx) * size.width) / zoom - parallax.current.x;
    const shiftY = ((framing.cy - 0.5) * size.height) / zoom - parallax.current.y;
    target.copy(BASE_TARGET).addScaledVector(SCREEN_RIGHT, shiftX).addScaledVector(SCREEN_UP, shiftY);
    camera.position.copy(target).addScaledVector(VIEW_DIR, 40);
    camera.lookAt(target);
  });

  return <OrthographicCamera makeDefault near={0.1} far={200} position={[40, 41.6, 40]} zoom={30} />;
}

function Lights({ shadows }: { shadows: boolean }) {
  const light = useRef<THREE.DirectionalLight>(null);
  useEffect(() => {
    const l = light.current;
    if (!l) return;
    const cam = l.shadow.camera;
    cam.left = -15;
    cam.right = 15;
    cam.top = 15;
    cam.bottom = -15;
    cam.near = 1;
    cam.far = 60;
    cam.updateProjectionMatrix();
    l.shadow.bias = -0.0008;
    l.shadow.normalBias = 0.03;
  }, []);
  return (
    <>
      <hemisphereLight args={["#fff8ec", "#2c929c", 1.35]} />
      <directionalLight
        ref={light}
        position={[-6, 18, 12]}
        intensity={2.1}
        color="#fff2dc"
        castShadow={shadows}
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[12, 6, -8]} intensity={0.35} color="#bfe9ee" />
    </>
  );
}

type PinMap = Partial<Record<RegionId, HTMLButtonElement | null>>;

const ISLAND_ROTATION = Math.PI / 4;
const Y_AXIS = new THREE.Vector3(0, 1, 0);

/**
 * Projects each region's anchor to screen space every frame and moves the
 * matching HTML pin. Pins are plain DOM buttons outside the canvas, so text
 * stays crisp and one rAF handles all six.
 */
function PinTracker({
  place,
  placeGreeting,
  highlighted,
}: {
  place: (id: RegionId, x: number, y: number) => void;
  placeGreeting: (x: number, y: number) => void;
  highlighted: RegionId[];
}) {
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame((state) => {
    const { camera, size } = state;
    for (const r of regions) {
      const [x, y, z] = pinAnchors[r.id];
      v.set(x, y + (highlighted.includes(r.id) ? 0.16 : 0), z).applyAxisAngle(Y_AXIS, ISLAND_ROTATION).project(camera);
      const px = ((v.x + 1) / 2) * size.width;
      const py = ((1 - v.y) / 2) * size.height;
      place(r.id, px, py);
    }
    // Track greeting speech bubble above welcoming character
    v.set(GREETING_ANCHOR[0], GREETING_ANCHOR[1], GREETING_ANCHOR[2])
      .applyAxisAngle(Y_AXIS, ISLAND_ROTATION)
      .project(camera);
    const gx = ((v.x + 1) / 2) * size.width;
    const gy = ((1 - v.y) / 2) * size.height;
    placeGreeting(gx, gy);
  });
  return null;
}

export default function WorldScene(props: WorldSceneProps) {
  const { framing, quality, animate, active, onReady, onError } = props;
  const shadows = quality === "high";
  const pins = useRef<PinMap>({});
  const greetingRef = useRef<HTMLDivElement>(null);
  const [greetingTextIndex, setGreetingTextIndex] = useState(0);

  const greetings = [
    "Hello! Welcome to my Atlas 👋",
    "I'm Galih, nice to meet you! ✨",
    "Explore the islands around! 🗺️",
    "Let's build something great! 🚀",
  ];

  const place = useCallback((id: RegionId, x: number, y: number) => {
    const el = pins.current[id];
    if (!el) return;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, calc(-100% - 14px))`;
    el.style.opacity = "1";
  }, []);

  const placeGreeting = useCallback((x: number, y: number) => {
    const el = greetingRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, calc(-100% - 10px))`;
    el.style.opacity = "1";
  }, []);

  const cycleGreeting = () => {
    setGreetingTextIndex((prev) => (prev + 1) % greetings.length);
  };

  const highlighted = [props.selected, props.hovered].filter(Boolean) as RegionId[];

  return (
    <div className="relative h-full w-full">
      <Canvas
        flat
        shadows={shadows ? "percentage" : false}
        dpr={quality === "high" ? [1, 1.75] : 1}
        frameloop={!active ? "never" : animate ? "always" : "demand"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        aria-hidden="true"
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            onError("WebGL context lost");
          });
          // Wait one frame so the first image is drawn before revealing the canvas.
          requestAnimationFrame(() => onReady());
        }}
      >
        <CameraRig framing={framing} animate={animate} />
        <Lights shadows={shadows} />
        <Island
          selected={props.selected}
          hovered={props.hovered}
          onHover={props.onHover}
          onSelect={props.onSelect}
          onCharacterClick={cycleGreeting}
          animate={animate}
          density={quality === "high" ? 1 : 0.6}
        />
        <PinTracker place={place} placeGreeting={placeGreeting} highlighted={highlighted} />
        <InvalidateOnChange deps={[props.selected, props.hovered, framing]} />
      </Canvas>

      {/* Region pins: decorative duplicates of the accessible atlas index. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {regions.map((r) => {
          const isActive = props.selected === r.id;
          return (
            <button
              key={r.id}
              ref={(el) => {
                pins.current[r.id] = el;
              }}
              type="button"
              tabIndex={-1}
              className="map-pin map-pin--tracked pointer-events-auto absolute left-0 top-0 opacity-0"
              data-active={isActive}
              data-hovered={props.hovered === r.id}
              onPointerEnter={() => props.onHover(r.id)}
              onPointerLeave={() => props.onHover(null)}
              onClick={() => props.onSelect(r.id)}
            >
              <span className="map-pin__index">{String(r.index).padStart(2, "0")}</span>
              {(!props.compactLabels || isActive) && <span>{r.title}</span>}
            </button>
          );
        })}

        {/* Welcoming Speech Bubble from the 3D Character */}
        {/* Outer element is positioned every frame; hover effects live on the inner
            bubble so they never overwrite the tracked transform. */}
        <div ref={greetingRef} className="character-bubble-anchor absolute left-0 top-0 opacity-0">
          <div role="status" onClick={cycleGreeting} title="Click to talk!" className="character-bubble pointer-events-auto cursor-pointer select-none">
            <div className="flex items-center gap-1.5 font-display text-xs font-bold text-ink sm:text-[0.82rem]">
              <span className="inline-block size-2 shrink-0 animate-ping rounded-full bg-coral" />
              <span>{greetings[greetingTextIndex]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** In "demand" mode (reduced motion), re-render when interaction state changes. */
function InvalidateOnChange({ deps }: { deps: unknown[] }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return null;
}
