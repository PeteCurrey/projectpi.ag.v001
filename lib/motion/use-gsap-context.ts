"use client";

import { useRef, useEffect, RefObject } from "react";
import { gsap } from "gsap";

/**
 * TFTSGSAPContext
 *
 * Creates a properly scoped GSAP context for a component,
 * ensuring animations are cleaned up on unmount (React 19 compatible).
 *
 * Returns a stable ref holding the gsap.Context — callers access
 * ctx.current inside effects only (never during render).
 *
 * Usage:
 *   const containerRef = useRef<HTMLDivElement>(null);
 *   const ctxRef = useGSAPContext(containerRef);
 *
 *   useEffect(() => {
 *     const ctx = ctxRef.current;
 *     ctx.add(() => {
 *       gsap.from(".my-el", { opacity: 0, y: 40 });
 *     });
 *     return () => ctx.revert();
 *   }, []);
 */
export function useGSAPContext(
  scope: RefObject<Element | null>
): RefObject<gsap.Context> {
  // Hold the context in a ref — never accessed during render
  const ctxRef = useRef<gsap.Context>(gsap.context(() => {}, scope));

  useEffect(() => {
    // Re-initialise with the correct scope element after mount
    ctxRef.current = gsap.context(() => {}, scope);
    return () => {
      ctxRef.current.revert();
    };
  }, [scope]);

  // Return the ref itself (not .current) — callers access .current in effects
  return ctxRef;
}
