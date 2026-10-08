"use client";

import React, { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TFTS_MOTION } from "@/lib/motion/config";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";

interface TFTSTextRevealProps {
  /** The text content. Can be a string or inline elements. */
  children: ReactNode;
  /** HTML element to render */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  /** Reveal by 'line'/'lines' or 'word'/'words' */
  mode?: "line" | "lines" | "word" | "words";
  /** Animation duration in seconds */
  duration?: number;
  /** Stagger between items in seconds */
  stagger?: number;
  /** ScrollTrigger start position */
  triggerStart?: string;
  /** Y offset to animate from (px) */
  yOffset?: number;
  /** Additional className */
  className?: string;
  /** Delay before reveal begins */
  delay?: number;
}

/**
 * TFTSTextReveal
 *
 * Reveals text line-by-line or word-by-word using GSAP ScrollTrigger.
 * Each line/word translates from below with a slight Y offset and fades in.
 *
 * Accessibility: The full text is always present in the DOM (no hidden text).
 * Animation is purely visual — content is readable without JS.
 *
 * Reduced motion: Falls back to immediate visibility (no translate/fade).
 *
 * Usage:
 *   <TFTSTextReveal as="h1" mode="word" className="text-7xl">
 *     Tactical field intelligence
 *   </TFTSTextReveal>
 */
export default function TFTSTextReveal({
  children,
  as: Tag = "div",
  mode = "line",
  duration = TFTS_MOTION.duration.slow,
  stagger = TFTS_MOTION.stagger.base,
  triggerStart = TFTS_MOTION.scroll.startReveal,
  yOffset = 48,
  className,
  delay = 0,
}: TFTSTextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const isWord = mode === "word" || mode === "words";

    // We animate the wrapper element itself if mode is "line" on a single block
    // For word mode, we need to split by words
    const ctx = gsap.context(() => {
      if (!isWord) {
        // Animate the whole block as one line reveal
        gsap.from(el, {
          y: yOffset,
          opacity: 0,
          duration,
          ease: TFTS_MOTION.ease.reveal,
          delay,
          scrollTrigger: {
            trigger: el,
            start: triggerStart,
            once: true,
          },
        });
      } else {
        // Word-by-word: find all .tfts-word spans inside
        const words = el.querySelectorAll<HTMLElement>(".tfts-word");
        if (words.length > 0) {
          gsap.from(words, {
            y: yOffset,
            opacity: 0,
            duration,
            ease: TFTS_MOTION.ease.reveal,
            stagger,
            delay,
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              once: true,
            },
          });
        }
      }
    }, el);

    return () => ctx.revert();
  }, [prefersReduced, mode, duration, stagger, triggerStart, yOffset, delay]);

  const isWord = mode === "word" || mode === "words";

  // For word mode, wrap each word in a span for GSAP targeting
  const content =
    isWord && typeof children === "string"
      ? children.split(" ").map((word, i, arr) => (
          <span
            key={i}
            className="tfts-word inline-block"
            aria-hidden="true"
          >
            {word}
            {i < arr.length - 1 ? "\u00A0" : ""}
          </span>
        ))
      : children;

  return (
    <Tag
      ref={containerRef as React.Ref<never>}
      className={className}
      // Keep text accessible even when word mode wraps in spans
      aria-label={
        isWord && typeof children === "string" ? children : undefined
      }
    >
      {content}
    </Tag>
  );
}
