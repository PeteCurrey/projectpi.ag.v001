"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TFTS_MOTION } from "@/lib/motion/config";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

interface TFTSViewportMediaProps {
  /** Image source URL */
  src: string;
  /** Alt text — required for accessibility */
  alt: string;
  /** Aspect ratio class (e.g. "aspect-[16/9]") or fixed height class */
  aspectClass?: string;
  /** Whether to apply subtle scale animation on scroll (1.08 → 1.0) */
  scaleOnScroll?: boolean;
  /** Whether this image is the LCP (sets priority) */
  priority?: boolean;
  /** Additional className on outer wrapper */
  className?: string;
  /** Image CSS filter — e.g. "grayscale(100%) contrast(1.05)" */
  imageFilter?: string;
  /** Optional caption rendered bottom-left over the image */
  caption?: string;
  /** sizes attribute for responsive images */
  sizes?: string;
}

/**
 * TFTSViewportMedia
 *
 * Primary editorial image component for the TFTS public experience.
 *
 * Features:
 *   - Full-width or proportional image
 *   - Subtle scale on scroll: image enters at 1.08, settles to 1.0
 *     This is driven by ScrollTrigger scrub — feels physical and controlled
 *   - Optional caption (minimal, position: bottom-left)
 *   - Accessibility: proper alt text, no decorative role
 *
 * Reduced motion: Static image, no scale animation.
 *
 * This is not a hero-only component — use it for any architectural image
 * that should behave as a primary visual design material.
 */
export default function TFTSViewportMedia({
  src,
  alt,
  aspectClass = "aspect-[16/9]",
  scaleOnScroll = true,
  priority = false,
  className,
  imageFilter,
  caption,
  sizes = "100vw",
}: TFTSViewportMediaProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const imageEl = imageRef.current;
    if (!wrapper || !imageEl || prefersReduced || !scaleOnScroll) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scale from 1.08 → 1.0 as element passes through viewport
      gsap.fromTo(
        imageEl,
        { scale: TFTS_MOTION.imageScale.from },
        {
          scale: TFTS_MOTION.imageScale.to,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: TFTS_MOTION.scroll.scrubSmooth,
          },
        }
      );
    }, wrapper);

    return () => ctx.revert();
  }, [prefersReduced, scaleOnScroll]);

  const filterStyle = imageFilter ? { filter: imageFilter } : undefined;

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${aspectClass} ${className ?? ""}`}
    >
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={filterStyle}
        />
      </div>
      {caption && (
        <div className="absolute bottom-4 left-6 text-[10px] tracking-[0.18em] uppercase font-[300] text-paper/80 z-10 pointer-events-none">
          {caption}
        </div>
      )}
    </div>
  );
}
