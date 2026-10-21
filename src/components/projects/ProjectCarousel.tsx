"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { type KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { filterProjects } from "@/content/projects";
import { projectsCopy } from "@/content/stories";
import { indexFromScroll, maxIndex, rangeLabel, scrollForIndex, type TrackMetrics, targetIndex } from "@/lib/carousel";
import type { Project } from "@/types/portfolio";
import { ProjectCard } from "./ProjectCard";
import { type FilterId, ProjectFilters } from "./ProjectFilters";

const TRACK_ID = "project-track";

/**
 * Horizontal, data-driven project carousel. Built on a native scroller so
 * touch swiping, trackpads and keyboard scrolling work; the arrows page by the
 * number of fully visible cards and disable themselves at either end.
 */
export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const items = useMemo(() => filterProjects(projects, filter), [projects, filter]);
  const trackRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ index: 0, atStart: true, atEnd: true, label: "" });

  const metrics = useCallback((): TrackMetrics | null => {
    const track = trackRef.current;
    const first = track?.querySelector("li");
    if (!track || !first) return null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return { cardWidth: first.getBoundingClientRect().width, gap, viewportWidth: track.clientWidth, count: items.length };
  }, [items.length]);

  const sync = useCallback(() => {
    const track = trackRef.current;
    const m = metrics();
    if (!track || !m) {
      setState({ index: 0, atStart: true, atEnd: true, label: "0 of 0" });
      return;
    }
    const maxScroll = track.scrollWidth - track.clientWidth;
    // Small tolerance absorbs sub-pixel and snap-padding offsets at either edge.
    const EDGE = 12;
    const atEnd = track.scrollLeft >= maxScroll - EDGE;
    // At the far end, report the final page even if the peek offsets the index.
    const index = atEnd ? maxIndex(m) : indexFromScroll(track.scrollLeft, m);
    setState({ index, atStart: track.scrollLeft <= EDGE, atEnd, label: rangeLabel(index, m) });
  }, [metrics]);

  // Re-measure on scroll and resize.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(track);
    onScroll();
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [sync]);

  // A new filter starts at the beginning so the index is always valid.
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
    sync();
  }, [filter, sync]);

  const go = (direction: 1 | -1) => {
    const track = trackRef.current;
    const m = metrics();
    if (!track || !m) return;
    const next = targetIndex(state.index, direction, m);
    const maxScroll = track.scrollWidth - track.clientWidth;
    const left = next >= maxIndex(m) ? maxScroll : scrollForIndex(next, m);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left, behavior: reduce ? "instant" : "smooth" });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" && !state.atEnd) {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft" && !state.atStart) {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="display-md">{projectsCopy.title}</h3>
          <p className="mt-2 max-w-xl text-ink-soft">
            {projectsCopy.intro}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="label text-slate" aria-live="polite">
            <span className="sr-only">Showing projects </span>
            {state.label}
          </p>
          <button type="button" className="icon-btn" onClick={() => go(-1)} disabled={state.atStart} aria-controls={TRACK_ID} aria-label="Previous projects">
            <ArrowLeft className="size-5" aria-hidden />
          </button>
          <button type="button" className="icon-btn bg-mustard" onClick={() => go(1)} disabled={state.atEnd} aria-controls={TRACK_ID} aria-label="Next projects">
            <ArrowRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <div className="mt-6">
        <ProjectFilters value={filter} onChange={setFilter} projects={projects} controls={TRACK_ID} />
      </div>

      <div role="region" aria-roledescription="carousel" aria-label="Projects" onKeyDown={onKeyDown} className="mt-6">
        {items.length === 0 ? (
          <div className="panel-flat border-dashed p-10 text-center text-ink-soft">
            No projects in this category yet. New work will appear here as it is documented.
          </div>
        ) : (
          <ul
            id={TRACK_ID}
            ref={trackRef}
            className="no-scrollbar -mx-2 flex snap-x snap-proximity scroll-px-2 gap-5 overflow-x-auto scroll-smooth px-2 pb-6 pt-2 motion-reduce:scroll-auto lg:gap-6"
          >
            {items.map((p, i) => (
              <li
                key={p.id}
                className="shrink-0 basis-[84%] snap-start sm:basis-[46%] lg:basis-[calc((100%-3rem)/3.2)]"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${items.length}: ${p.title}`}
              >
                <ProjectCard project={p} headingLevel="h4" />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-slate">{projectsCopy.helper}</p>
        <Link href="/projects" className="btn btn-dark">
          {projectsCopy.cta} <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
