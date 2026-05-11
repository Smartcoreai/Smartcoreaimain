"use client";
import { useEffect } from "react";

/**
 * Re-runs the hash scroll after hydration. Needed when arriving at the
 * home page from another route (e.g. /diagnose) via a Link to "/#problem":
 * the browser tries to scroll before the section components have mounted,
 * so the default jump misses or undershoots. Two RAFs gives the layout
 * one paint to settle, then we scrollIntoView ourselves so scroll-margin-top
 * is honoured.
 */
export default function HashScroller() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    let id: number;
    requestAnimationFrame(() => {
      id = requestAnimationFrame(() => {
        let el: Element | null = null;
        try { el = document.querySelector(hash); } catch { /* invalid selector */ }
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    return () => { if (id) cancelAnimationFrame(id); };
  }, []);
  return null;
}
