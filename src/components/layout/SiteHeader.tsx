"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/ui/BrandMark";
import { navigation, sectionOrder, sectionToNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type NavId = (typeof navigation)[number]["id"];

/** Tracks which homepage chapter is in view to highlight its nav item. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<NavId | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        // The first section in page order that is meaningfully visible wins.
        const current = sectionOrder.find((id) => (visible.get(id) ?? 0) > 0);
        if (current) setActive(sectionToNav[current]);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01] },
    );
    for (const id of sectionOrder) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [enabled]);
  return enabled ? active : null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(isHome);
  const archiveActive = pathname.startsWith("/projects") ? "projects" : pathname.startsWith("/research") ? "experience" : null;
  const current = active ?? archiveActive;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu on route change.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Solid backdrop once the page scrolls, so capsules never sit on body text. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-[calc(var(--header-h)+0.5rem)] border-b-2 border-ink bg-cream/92 backdrop-blur-md transition-opacity duration-200",
          scrolled || open ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="container-atlas relative flex h-[var(--header-h)] items-center justify-between gap-3 pt-3">
        <BrandMark className="pointer-events-auto" />

        <nav aria-label="Primary" className="pointer-events-auto hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border-2 border-ink bg-paper p-1 shadow-[3px_3px_0_0_var(--color-ink)]">
            {navigation.map((item) => {
              const isActive = current === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "block rounded-full px-4 py-2 font-display text-[0.95rem] font-semibold transition-colors",
                      isActive ? "bg-ink text-cream" : "text-ink hover:bg-cream-deep",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="pointer-events-auto flex items-center gap-2">
          <Link href="/#contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Let&apos;s collaborate <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="icon-btn size-11 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="pointer-events-auto container-atlas mt-3 lg:hidden"
      >
        <nav aria-label="Mobile" className="panel panel-lg p-3">
          <ul className="grid gap-1">
            {navigation.map((item, i) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={current === item.id ? "location" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 font-display text-lg font-bold",
                    current === item.id ? "bg-ink text-cream" : "hover:bg-cream-deep",
                  )}
                >
                  {item.label}
                  <span className="font-mono text-xs opacity-60">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link href="/#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Let&apos;s collaborate
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
