'use client'

import type { RefObject } from 'react'
import { useScroll, useTransform, useSpring } from 'framer-motion'
import type { SpringOptions, UseScrollOptions } from 'framer-motion'

// ─── Default Configuration ───────────────────────────────────────────────────

const DEFAULT_SPRING: SpringOptions = { stiffness: 500, damping: 60, mass: 1 }

const DEFAULT_SCROLL_OFFSET: NonNullable<UseScrollOptions['offset']> = [
  'start end',
  'end start',
]

// ─── Preset Keyframes ────────────────────────────────────────────────────────

/**
 * Common keyframe presets for scroll-driven Y-axis translation.
 *
 * Each preset maps `scrollYProgress` input ranges → pixel output values.
 *
 * - `default`  — gentle reveal that settles quickly (content & images)
 * - `fast`     — snappier reveal for small elements like badges
 */
export const SCROLL_REVEAL_PRESETS = {
  default: {
    input: [0, 0.3, 0.7, 1],
    output: [64, 0, 0, 0],
  },
  fast: {
    input: [0, 0.03, 1],
    output: [64, 0, 0],
  },
} as const satisfies Record<string, ScrollKeyframes>

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ScrollKeyframes {
  /** `scrollYProgress` breakpoints (0 → 1). */
  readonly input: readonly number[]
  /** Pixel offsets mapped to each breakpoint. */
  readonly output: readonly number[]
}

export interface UseScrollRevealOptions {
  /** Keyframes or a preset name. Defaults to `'default'`. */
  keyframes?: ScrollKeyframes | keyof typeof SCROLL_REVEAL_PRESETS
  /** Spring physics overrides. */
  spring?: SpringOptions
  /** Scroll offset tuple. */
  offset?: NonNullable<UseScrollOptions['offset']>
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * Returns a spring-smoothed `MotionValue<number>` representing a Y-axis
 * translation driven by the element's scroll progress.
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null)
 * const y = useScrollReveal(ref)                          // default preset
 * const y = useScrollReveal(ref, { keyframes: 'fast' })   // fast preset
 * ```
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options: UseScrollRevealOptions = {},
) {
  const {
    keyframes = 'default',
    spring = DEFAULT_SPRING,
    offset = DEFAULT_SCROLL_OFFSET,
  } = options

  const resolved =
    typeof keyframes === 'string' ? SCROLL_REVEAL_PRESETS[keyframes] : keyframes

  const { scrollYProgress } = useScroll({ target: ref, offset })

  const raw = useTransform(
    scrollYProgress,
    resolved.input as number[],
    resolved.output as number[],
  )

  return useSpring(raw, spring)
}
