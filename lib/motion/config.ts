/**
 * TFTS Motion System — Configuration
 *
 * Single source of truth for all animation parameters.
 * All motion primitives read from this config.
 * Adjust here, affects the entire experience.
 */

export const TFTS_MOTION = {
  /**
   * Duration scale (seconds)
   * Cinematic timing — deliberately slow and physical
   */
  duration: {
    instant: 0.15,
    fast: 0.4,
    base: 0.8,
    slow: 1.2,
    cinematic: 1.8,
    epic: 2.8,
  },

  /**
   * Stagger between sequential reveals
   */
  stagger: {
    tight: 0.04,
    base: 0.08,
    loose: 0.14,
    wide: 0.22,
  },

  /**
   * Easing curves — all using GSAP power/expo notation
   * These define the physical character of the motion
   */
  ease: {
    /** Standard reveal — enters with weight */
    reveal: "power3.out",
    /** Image transitions — smoother, more cinematic */
    image: "power2.inOut",
    /** Scrubbed/scroll-tied animations — linear feel */
    scrub: "none",
    /** Precise precision snap */
    snap: "expo.out",
    /** Slow, deliberate exit */
    exit: "power2.in",
    /** Page-level transitions */
    page: "power4.inOut",
  },

  /**
   * Scroll trigger defaults
   */
  scroll: {
    /** Scrub smoothing — higher = more lag/inertia */
    scrubSmooth: 1.4,
    /** Start position for standard reveals */
    startReveal: "top 88%",
    /** Start position for full-viewport elements */
    startViewport: "top bottom",
  },

  /**
   * Image scale — subtle, not dramatic
   * Enters slightly enlarged and settles to natural size
   */
  imageScale: {
    from: 1.08,
    to: 1.0,
  },

  /**
   * Parallax — strictly bounded to avoid motion sickness
   * All values in px
   */
  parallax: {
    subtle: 40,    // px total travel
    base: 60,
    strong: 80,   // maximum
  },

  /**
   * Lenis smooth scroll configuration
   */
  lenis: {
    lerp: 0.08,         // smoothing — lower = more lag
    duration: 1.4,
    wheelMultiplier: 0.9,
    smoothWheel: true,
  },
} as const;

export type MotionDuration = keyof typeof TFTS_MOTION.duration;
export type MotionEase = keyof typeof TFTS_MOTION.ease;
