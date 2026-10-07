"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TFTS_MOTION } from "@/lib/motion/config";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

interface TFTSParallaxProps {
  /** Content to apply parallax to */
  children: ReactNode;
  /**
   * Y travel distance in px.
   * Positive = moves down relative to scroll.
   * Negative = moves up relative to scroll (counter-parallax).
   * Keep within ±80px to avoid motion sickness.
   */
  speed?: number;
  /** Additional className on the wrapper */
  className?: string;
}

/**
 * TFTSParallax
 *
 * Applies a subtle Y-axis parallax effect tied to scroll position.
 * The child moves at a different rate to the page scroll, creating depth.
 *
 * Bounded at ±80px maximum travel. Never dramatic.
 * Intended for architectural images and background elements.
 *
 * Reduced motion: No movement applied, children render normally.
 */
export default function TFTSParallax({
  children,
  speed = TFTS_MOTION.parallax.subtle,
  className,
}: TFTSParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;

    // Clamp speed to safe maximum
    const clampedSpeed = Math.max(-80, Math.min(80, speed));

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -clampedSpeed / 2 },
        {
          y: clampedSpeed / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: TFTS_MOTION.scroll.scrubSmooth,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [prefersReduced, speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
