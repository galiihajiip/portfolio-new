"use client";

import { ArrowRight, Box, Compass, ImageIcon, Loader2, X } from "lucide-react";
import dynamic from "next/dynamic";
import { Component, type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { regions } from "@/content/regions";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Region, RegionId } from "@/types/portfolio";
import { IllustratedMap } from "./IllustratedMap";
import type { Framing } from "./WorldScene";

const WorldScene = dynamic(() => import("./WorldScene"), { ssr: false, loading: () => null });

type Mode = "detecting" | "loading" | "3d" | "illustration";

const PREF_KEY = "atlas:map-mode";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function readPref(): "3d" | "illustration" | null {
  try {
    const q = new URLSearchParams(window.location.search).get("map");
    if (q === "2d" || q === "illustration") return "illustration";
    if (q === "3d") return "3d";
    const v = window.localStorage.getItem(PREF_KEY);
    return v === "3d" || v === "illustration" ? v : null;
  } catch {
    return null;
  }
}

function writePref(v: "3d" | "illustration") {
  try {
    window.localStorage.setItem(PREF_KEY, v);
  } catch {
    /* storage unavailable: preference simply isn't remembered */
  }
}

/** Catches failures inside the WebGL scene (including a failed chunk import). */
class SceneBoundary extends Component<{ onError: (reason: string) => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error) {
    console.error("[WorldMap] 3D scene failed, showing the illustrated map instead.", error);
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
  const [mode, setMode] = useState<Mode>("detecting");
  const [notice, setNotice] = useState<string | null>(null);
  const [inView, setInView] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)", true);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [quality, setQuality] = useState<"high" | "low">("high");

  // Decide between WebGL and the illustration once, on the client.
  useEffect(() => {
    const pref = readPref();
    const lowPower =
      window.innerWidth < 768 ||
      (navigator.hardwareConcurrency ?? 8) <= 4 ||
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client capability detection
    setQuality(lowPower ? "low" : "high");
    if (!siteConfig.features.interactiveMap || pref === "illustration") {
      setMode("illustration");
    } else if (!hasWebGL()) {
      setMode("illustration");
      setNotice("3D isn't available in this browser, so you're seeing the illustrated map.");
    } else {
      setMode("loading");
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

  // A slow device or a stalled chunk should not leave the visitor waiting.
  useEffect(() => {
    if (mode !== "loading") return;
    const t = window.setTimeout(() => {
      setMode((m) => (m === "loading" ? "illustration" : m));
      setNotice("The 3D map took too long to load, so you're seeing the illustrated map.");
    }, 15000);
    return () => window.clearTimeout(t);
  }, [mode]);

  const handleError = useCallback((reason: string) => {
    console.warn("[WorldMap] Falling back to illustration:", reason);
    setMode("illustration");
    setNotice("The 3D map couldn't start on this device, so you're seeing the illustrated map.");
  }, []);
  const handleReady = useCallback(() => setMode((m) => (m === "loading" ? "3d" : m)), []);

  const switchMode = (next: "3d" | "illustration") => {
    writePref(next);
    setNotice(null);
    if (next === "3d" && !hasWebGL()) {
      setNotice("3D isn't available in this browser.");
      return;
    }
    setMode(next === "3d" ? "loading" : "illustration");
  };

  const select = useCallback((id: RegionId | null) => setSelected((cur) => (cur === id ? cur : id)), []);

  const framing: Framing = isDesktop ? { cx: 0.45, cy: 0.38, fitW: 0.58, fitH: 0.52 } : { cx: 0.5, cy: 0.52, fitW: 0.98, fitH: 0.92 };
  const showCanvas = mode === "loading" || mode === "3d";
  const showIllustration = mode !== "3d";
  const selectedRegion = selected ? regions.find((r) => r.id === selected) : undefined;

  return (
    <>
      {/* Map stage */}
      <div
        ref={stageRef}
        className="relative h-[clamp(300px,74vw,540px)] lg:absolute lg:inset-0 lg:h-auto"
        onPointerLeave={() => setHovered(null)}
      >
        {showIllustration && (
          <div className={cn("absolute inset-0 transition-opacity duration-500", mode === "loading" && "opacity-90")}>
            <IllustratedMap
              selected={selected}
              hovered={hovered}
              onSelect={select}
              onHover={setHovered}
              interactive={mode === "illustration"}
            />
          </div>
        )}
        {showCanvas && (
          <div className={cn("absolute inset-0 transition-opacity duration-700", mode === "3d" ? "opacity-100" : "opacity-0")}>
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
        {(mode === "loading" || mode === "detecting") && (
          <p className="chip absolute bottom-3 left-1/2 -translate-x-1/2 lg:bottom-auto lg:top-[calc(var(--header-h)+1.25rem)]" role="status">
            <Loader2 className="size-3.5 animate-spin" aria-hidden /> Loading the 3D island…
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
          mode={mode}
          onSwitchMode={switchMode}
          notice={notice}
        />
      </div>

      {/* Mobile / tablet: chips + detail under the map */}
      <div className="container-atlas relative z-10 -mt-2 pb-4 lg:hidden">
        <RegionChips selected={selected} onSelect={select} />
        {selectedRegion && <RegionDetail region={selectedRegion} onClose={() => setSelected(null)} className="mt-3" />}
        <MapModeToggle mode={mode} onSwitch={switchMode} className="mt-3" />
        {notice && <p className="mt-2 text-sm text-cream">{notice}</p>}
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
  mode,
  onSwitchMode,
  notice,
}: {
  selected: RegionId | null;
  hovered: RegionId | null;
  onSelect: (id: RegionId | null) => void;
  onHover: (id: RegionId | null) => void;
  mode: Mode;
  onSwitchMode: (m: "3d" | "illustration") => void;
  notice: string | null;
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
      <MapModeToggle mode={mode} onSwitch={onSwitchMode} className="mt-4 border-t-2 border-dashed border-ink/15 pt-3" />
      {notice && <p className="mt-2 text-xs text-ink-soft">{notice}</p>}
    </nav>
  );
}

function MapModeToggle({ mode, onSwitch, className }: { mode: Mode; onSwitch: (m: "3d" | "illustration") => void; className?: string }) {
  const is3d = mode === "3d" || mode === "loading";
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <span className="label text-[0.62rem] text-cream lg:text-slate">Map view</span>
      <div role="group" aria-label="Map view" className="inline-flex rounded-full border-2 border-ink bg-paper p-0.5">
        <button
          type="button"
          aria-pressed={is3d}
          onClick={() => onSwitch("3d")}
          className={cn("flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", is3d && "bg-ink text-cream")}
        >
          <Box className="size-3.5" aria-hidden /> 3D
        </button>
        <button
          type="button"
          aria-pressed={!is3d}
          onClick={() => onSwitch("illustration")}
          className={cn("flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", !is3d && "bg-ink text-cream")}
        >
          <ImageIcon className="size-3.5" aria-hidden /> Illustrated
        </button>
      </div>
    </div>
  );
}

function RegionChips({ selected, onSelect }: { selected: RegionId | null; onSelect: (id: RegionId | null) => void }) {
  return (
    <nav aria-label="World atlas regions">
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
