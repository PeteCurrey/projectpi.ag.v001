"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TFTS_MOTION } from "@/lib/motion/config";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

interface TFTSHorizontalScrollProps {
  /**
   * The items to display horizontally.
   * Each item should be a fixed-width panel.
   */
  children: ReactNode;
  /**
   * Number of panels. Used to calculate total scroll distance.
   * Default: auto-detected from children count.
   */
  panelCount?: number;
  /** Additional className on the outer pinned wrapper */
  className?: string;
  /** Height multiplier for the scroll distance (default: 1.0 = 100vh per panel) */
  scrollMultiplier?: number;
}

/**
 * TFTSHorizontalScroll
 *
 * Translates vertical scroll into horizontal movement.
 * The outer container is pinned; the inner container moves left
 * as the user scrolls down.
 *
 * Architecture:
 *   - Outer div: pinned wrapper, height = scrollHeight (calculated)
 *   - Inner div: flex row, translates left on scroll
 *   - Each child: 100vw wide panel
 *
 * Mobile (< 1024px): Renders as normal vertical scroll (no pinning).
 * This is handled by a matchMedia inside the ScrollTrigger setup.
 *
 * Reduced motion: No horizontal scroll — renders vertically.
 */
export default function TFTSHorizontalScroll({
  children,
  panelCount,
  className,
  scrollMultiplier = 1.0,
}: TFTSHorizontalScrollProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const count =
    panelCount ??
    React.Children.count(children);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner || prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // Desktop only — match media
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Total horizontal travel = (panelCount - 1) * 100vw
      const totalWidth = inner.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: () => `+=${totalWidth * scrollMultiplier}`,
          scrub: TFTS_MOTION.scroll.scrubSmooth,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(inner, {
        x: -totalWidth,
        ease: "none",
      });

      return () => {
        tl.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [prefersReduced, count, scrollMultiplier]);

  return (
    <div ref={outerRef} className={`overflow-hidden ${className ?? ""}`}>
      <div
        ref={innerRef}
        className="flex flex-col lg:flex-row lg:flex-nowrap will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
