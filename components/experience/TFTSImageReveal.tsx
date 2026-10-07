"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TFTS_MOTION } from "@/lib/motion/config";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

interface TFTSImageRevealProps {
  /** The image or media content to reveal */
  children: ReactNode;
  /** Reveal mode:
   *  - 'wipe-up': clip-path wipe from bottom to top
   *  - 'wipe-right': clip-path wipe from left to right
   *  - 'scale': subtle scale + fade reveal
   */
  mode?: "wipe-up" | "wipe-right" | "scale";
  /** Animation duration in seconds */
  duration?: number;
  /** ScrollTrigger start position */
  triggerStart?: string;
  /** Additional class on the outer wrapper */
  className?: string;
  /** Delay before reveal */
  delay?: number;
}

/**
 * TFTSImageReveal
 *
 * Reveals an image with clip-path or scale animation on scroll.
 * Wraps any content — typically a Next.js <Image> or a div.
 *
 * Wipe modes use clip-path inset, which doesn't affect layout.
 * Scale mode uses transform: scale, so the wrapper should overflow: hidden.
 *
 * Reduced motion: Shows image immediately, no animation.
 */
export default function TFTSImageReveal({
  children,
  mode = "wipe-up",
  duration = TFTS_MOTION.duration.cinematic,
  triggerStart = "top 82%",
  className,
  delay = 0,
}: TFTSImageRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (mode === "wipe-up") {
        gsap.from(el, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration,
          ease: TFTS_MOTION.ease.image,
          delay,
          scrollTrigger: {
            trigger: el,
            start: triggerStart,
            once: true,
          },
        });
        // Set initial state
        gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)" });
      } else if (mode === "wipe-right") {
        gsap.set(el, { clipPath: "inset(0% 100% 0% 0%)" });
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration,
          ease: TFTS_MOTION.ease.image,
          delay,
          scrollTrigger: {
            trigger: el,
            start: triggerStart,
            once: true,
          },
        });
      } else {
        // scale mode — also needs wrapper to have overflow:hidden
        gsap.from(el, {
          scale: TFTS_MOTION.imageScale.from,
          opacity: 0,
          duration,
          ease: TFTS_MOTION.ease.image,
          delay,
          scrollTrigger: {
            trigger: el,
            start: triggerStart,
            once: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [prefersReduced, mode, duration, triggerStart, delay]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
}
