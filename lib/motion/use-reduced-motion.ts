"use client";

import { useEffect, useState } from "react";

/**
 * TFTSReducedMotion
 *
 * Returns true if the user has requested reduced motion via their OS settings.
 * All motion primitives in the TFTS Experience System must respect this.
 *
 * Initialises from the media query synchronously on mount (SSR-safe default: false).
 * Reactively updates if the user changes their OS setting at runtime.
 */
export function useReducedMotion(): boolean {
  // SSR-safe lazy initialiser — reads matchMedia only in browser
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Subscribe to runtime changes only (initial value handled by useState)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
