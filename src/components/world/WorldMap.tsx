"use client";

import { ArrowRight, Compass, Loader2, X } from "lucide-react";
import dynamic from "next/dynamic";
import { Component, type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { regions } from "@/content/regions";
import { cn } from "@/lib/utils";
import type { Region, RegionId } from "@/types/portfolio";
import { IllustratedMap } from "./IllustratedMap";
import type { Framing } from "./WorldScene";

const WorldScene = dynamic(() => import("./WorldScene"), { ssr: false, loading: () => null });

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Catches failures inside the WebGL scene (including a failed chunk import or WebGL crash). */
class SceneBoundary extends Component<{ onError: (reason: string) => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error) {
    console.error("[WorldMap] 3D scene failed:", error);
    this.props.onError(error.message);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function useMediaQuery(query: string, fallback = false) {
  const [matches, setMatches] = useState(fallback);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

export function WorldMap({ profile }: { profile?: ReactNode }) {
  const [selected, setSelected] = useState<RegionId | null>(null);
  const [hovered, setHovered] = useState<RegionId | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [inView, setInView] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)", true);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [quality, setQuality] = useState<"high" | "low">("high");

  useEffect(() => {
    const lowPower =
      window.innerWidth < 768 ||
      (navigator.hardwareConcurrency ?? 8) <= 4 ||
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client capability detection
    setQuality(lowPower ? "low" : "high");

    if (!hasWebGL()) {
      setSceneFailed(true);
    }
  }, []);

  // Pause rendering while the hero is off-screen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleError = useCallback((reason: string) => {
    console.warn("[WorldMap] 3D scene error:", reason);
    setSceneFailed(true);
  }, []);

  const handleReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  const select = useCallback((id: RegionId | null) => setSelected((cur) => (cur === id ? cur : id)), []);

  const framing: Framing = isDesktop
    ? { cx: 0.45, cy: 0.38, fitW: 0.58, fitH: 0.52 }
    : { cx: 0.5, cy: 0.5, fitW: 0.98, fitH: 0.92 };

  const selectedRegion = selected ? regions.find((r) => r.id === selected) : undefined;

  return (
    <>
      {/* Map stage */}
      <div
        ref={stageRef}
        className="relative h-[clamp(320px,78vw,560px)] lg:absolute lg:inset-0 lg:h-auto"
        onPointerLeave={() => setHovered(null)}
      >
        {/* If WebGL is completely unsupported on device, render the illustrated map quietly as graceful fallback */}
        {sceneFailed ? (
          <div className="absolute inset-0">
            <IllustratedMap
              selected={selected}
              hovered={hovered}
              onSelect={select}
              onHover={setHovered}
              interactive={true}
            />
          </div>
        ) : (
          <div className={cn("absolute inset-0 transition-opacity duration-700", sceneReady ? "opacity-100" : "opacity-0")}>
            <SceneBoundary onError={handleError}>
              <WorldScene
                selected={selected}
                hovered={hovered}
                onHover={setHovered}
                onSelect={select}
                onReady={handleReady}
                onError={handleError}
                framing={framing}
                quality={quality}
                animate={!reducedMotion}
                active={inView}
                compactLabels={!isDesktop}
              />
            </SceneBoundary>
          </div>
        )}

        {!sceneReady && !sceneFailed && (
          <p className="chip absolute bottom-3 left-1/2 -translate-x-1/2 lg:bottom-auto lg:top-[calc(var(--header-h)+1.25rem)]" role="status">
            <Loader2 className="size-3.5 animate-spin" aria-hidden /> Loading 3D island…
          </p>
        )}
      </div>

      {/* Desktop overlays: profile card + atlas index */}
      {profile && (
        <div className="pointer-events-none absolute left-[var(--gutter)] top-[calc(var(--header-h)+1.25rem)] z-10 hidden lg:block">
          <div className="pointer-events-auto">{profile}</div>
        </div>
      )}
      <div className="absolute right-[var(--gutter)] top-[calc(var(--header-h)+1.25rem)] z-10 hidden w-[19.5rem] lg:block xl:w-[21rem]">
        <AtlasIndex
          selected={selected}
          hovered={hovered}
          onSelect={select}
          onHover={setHovered}
        />
      </div>

      {/* Mobile / tablet: chips + detail under the map */}
      <div className="container-atlas relative z-10 -mt-2 pb-4 lg:hidden">
        <RegionChips selected={selected} onSelect={select} />
        {selectedRegion && <RegionDetail region={selectedRegion} onClose={() => setSelected(null)} className="mt-3" />}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function AtlasIndex({
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  selected: RegionId | null;
  hovered: RegionId | null;
  onSelect: (id: RegionId | null) => void;
  onHover: (id: RegionId | null) => void;
}) {
  return (
    <nav aria-label="World atlas regions" className="panel panel-lg p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="label flex items-center gap-2">
          <Compass className="size-4 text-coral" aria-hidden /> World atlas
        </p>
        <span className="label rounded-full bg-cream-deep px-2 py-0.5 text-[0.62rem]">{regions.length} regions</span>
      </div>
      <ul className="space-y-1">
        {regions.map((r) => {
          const isSel = selected === r.id;
          return (
            <li key={r.id}>
              <button
                type="button"
                aria-expanded={isSel}
                aria-controls={`region-detail-${r.id}`}
                onClick={() => onSelect(isSel ? null : r.id)}
                onPointerEnter={() => onHover(r.id)}
                onPointerLeave={() => onHover(null)}
                onFocus={() => onHover(r.id)}
                onBlur={() => onHover(null)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors",
                  isSel ? "bg-ink text-cream" : hovered === r.id ? "bg-mustard-soft" : "hover:bg-cream-deep",
                )}
              >
                <span className={cn("font-mono text-xs", isSel ? "text-mustard" : "text-slate")}>{String(r.index).padStart(2, "0")}</span>
                <span className="flex-1 font-display text-[0.95rem] font-semibold leading-tight">{r.title}</span>
                <span className={cn("text-xs", isSel ? "text-cream/70" : "text-slate")}>{r.theme.split(" ")[0]}</span>
              </button>
              <div id={`region-detail-${r.id}`} hidden={!isSel} className="px-2.5 pb-2 pt-2">
                <p className="text-sm text-ink-soft">{r.description}</p>
                <a href={`#${r.anchor}`} className="btn btn-primary btn-sm mt-3">
                  Explore {r.theme.toLowerCase()} <ArrowRight className="size-4" aria-hidden />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function RegionChips({ selected, onSelect }: { selected: RegionId | null; onSelect: (id: RegionId | null) => void }) {
  return (
    <nav aria-label="World atlas quick regions">
      <ul className="no-scrollbar -mx-[var(--gutter)] flex snap-x gap-2 overflow-x-auto px-[var(--gutter)] py-2">
        {regions.map((r) => {
          const isSel = selected === r.id;
          return (
            <li key={r.id} className="snap-start">
              <button
                type="button"
                aria-expanded={isSel}
                onClick={() => onSelect(isSel ? null : r.id)}
                className={cn(
                  "flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border-2 border-ink px-3 py-1.5 font-display text-sm font-semibold shadow-[2px_2px_0_0_var(--color-ink)]",
                  isSel ? "bg-mustard" : "bg-paper",
                )}
              >
                <span className="font-mono text-[0.68rem] text-slate">{String(r.index).padStart(2, "0")}</span>
                {r.title}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function RegionDetail({ region, onClose, className }: { region: Region; onClose: () => void; className?: string }) {
  return (
    <div className={cn("panel p-4", className)} role="region" aria-label={`${region.title} details`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label text-coral">Region {String(region.index).padStart(2, "0")} · {region.theme}</p>
          <p className="mt-1 font-display text-xl font-bold">{region.title}</p>
        </div>
        <button type="button" onClick={onClose} className="icon-btn size-9 shadow-none" aria-label="Close region details">
          <X className="size-4" aria-hidden />
        </button>
      </div>
      <p className="mt-2 text-sm text-ink-soft">{region.description}</p>
      <a href={`#${region.anchor}`} className="btn btn-primary btn-sm mt-3">
        Explore {region.theme.toLowerCase()} <ArrowRight className="size-4" aria-hidden />
      </a>
    </div>
  );
}
