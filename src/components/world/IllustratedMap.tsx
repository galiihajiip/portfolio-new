"use client";

import Image from "next/image";
import { regions } from "@/content/regions";
import type { RegionId } from "@/types/portfolio";
import islandImage from "../../../public/assets/map/atlas-island.png";

/**
 * Illustrated island from the Stitch export. Used while the 3D scene loads,
 * when WebGL is unavailable, and when a visitor chooses the illustrated view.
 */
export function IllustratedMap({
  selected,
  hovered,
  onSelect,
  onHover,
  interactive,
}: {
  selected: RegionId | null;
  hovered: RegionId | null;
  onSelect: (id: RegionId | null) => void;
  onHover: (id: RegionId | null) => void;
  interactive: boolean;
}) {
  return (
    <div className="h-full w-full px-[var(--gutter)] py-3 lg:px-[23rem] lg:pb-[22rem] lg:pt-[calc(var(--header-h)+1.5rem)]">
      {/* Size container so the frame keeps the image's aspect ratio in any box. */}
      <div className="grid h-full w-full place-items-center [container-type:size]">
        <div className="relative aspect-[1376/768] w-[min(100cqw,calc(100cqh*1376/768))] overflow-hidden rounded-2xl border-[2.5px] border-ink shadow-[6px_6px_0_0_var(--color-ink)]">
          <Image
            src={islandImage}
            alt="Illustrated map of The Builder's Atlas: an island with an observatory, a lighthouse, a cabin in the woods, an amphitheatre, a forge and a glass workshop."
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
            placeholder="blur"
          />
          {interactive &&
            regions.map((r) => (
              <div
                key={r.id}
                className="absolute -translate-x-1/2 -translate-y-full"
                style={{ left: `${r.illustration.x}%`, top: `${r.illustration.y}%` }}
              >
                <button
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="map-pin relative text-xs sm:text-sm"
                  data-active={selected === r.id}
                  data-hovered={hovered === r.id}
                  onClick={() => onSelect(r.id)}
                  onPointerEnter={() => onHover(r.id)}
                  onPointerLeave={() => onHover(null)}
                >
                  <span className="map-pin__index">{String(r.index).padStart(2, "0")}</span>
                  <span className="hidden sm:inline">{r.title}</span>
                </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
