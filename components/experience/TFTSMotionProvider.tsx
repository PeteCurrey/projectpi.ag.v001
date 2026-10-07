"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TFTS_MOTION } from "@/lib/motion/config";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

/**
 * TFTSMotionProvider
 *
 * Root motion provider for the public TFTS experience.
 * Responsibilities:
 *   1. Registers GSAP ScrollTrigger plugin
 *   2. Initialises Lenis smooth scroll (client-side only)
 *   3. Bridges Lenis raf loop with GSAP ScrollTrigger
 *   4. Respects prefers-reduced-motion — disables Lenis if user prefers reduced
 *   5. Cleans up on unmount
 *
 * Must wrap public layout only. Admin routes should not include this.
 */
export default function TFTSMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReduced = useReducedMotion();
  const lenisRef = useRef<import("lenis").default | null>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // ScrollTrigger normalisation for Lenis
    ScrollTrigger.config({ limitCallbacks: true });

    // Bail out of Lenis if reduced motion is preferred
    if (prefersReduced) {
      return;
    }

    // Dynamically import Lenis (avoids SSR issues)
    async function initLenis() {
      const { default: Lenis } = await import("lenis");

      const lenis = new Lenis({
        lerp: TFTS_MOTION.lenis.lerp,
        duration: TFTS_MOTION.lenis.duration,
        wheelMultiplier: TFTS_MOTION.lenis.wheelMultiplier,
        smoothWheel: TFTS_MOTION.lenis.smoothWheel,
      });

      lenisRef.current = lenis;

      // Bridge Lenis → GSAP ScrollTrigger
      lenis.on("scroll", () => {
        ScrollTrigger.update();
      });

      // GSAP ticker → Lenis raf (Lenis is not running its own RAF loop)
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    initLenis().catch(console.error);

    return () => {
      // Cleanup
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [prefersReduced]);

  return <>{children}</>;
}
