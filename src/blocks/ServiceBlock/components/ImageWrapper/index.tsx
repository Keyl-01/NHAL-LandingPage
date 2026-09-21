'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'

import type { ServiceBlock } from '@/payload-types'
import { ImageCard } from '../ImageCard'
import { useScrollReveal } from '@/hooks/useScrollReveal'

// ─── Constants ──────────────────────────────────────────────────────────────

const SCROLL_OFFSET: ['start end', 'end end'] = ['start end', 'end end']
const REVEAL_KEYFRAMES = { input: [0, 1], output: [32, 0] } as const
const SPRING_CONFIG = { stiffness: 500, damping: 60, mass: 1 }

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ImageWrapperProps {
  imgWrapper: ServiceBlock['imgWrapper']
}

// ─── Component ──────────────────────────────────────────────────────────────

export const ImageWrapper: React.FC<ImageWrapperProps> = ({ imgWrapper }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Use the global hook for Y translation
  const y = useScrollReveal(containerRef, {
    keyframes: REVEAL_KEYFRAMES,
    offset: SCROLL_OFFSET,
    spring: SPRING_CONFIG,
  })

  // We still need to manually calculate scale, but we can reuse the same scrollProgress 
  // Wait, useScrollReveal doesn't return the raw scroll progress. 
  // We can just use the global hook's custom return or do scale manually.
  // Actually, since we need BOTH scale and Y, we might need to recreate scroll progress.
  // Let me rethink this... I'll just use a custom `scale` hook or keep it as is.
  // Ah, wait. I can use `useScrollReveal` with custom output for scale.
  // Wait, `useScrollReveal` returns a motion value mapped from input to output.
  // For scale, output is [0, 1]. For y, output is [32, 0].
  const scale = useScrollReveal(containerRef, {
    keyframes: { input: [0, 1], output: [0, 1] },
    offset: SCROLL_OFFSET,
    spring: SPRING_CONFIG,
  })

  // Ensure imgWrapper is valid before mapping
  const images = imgWrapper ? Object.values(imgWrapper) : []

  return (
    <div ref={containerRef} className="flex w-full justify-center">
      <motion.div
        className="flex w-full max-w-[1000px] flex-col items-center px-[48px] md:flex-row md:items-end"
        style={{ scale, y }}
      >
        {images.map((img, index) => (
          <ImageCard key={index} count={index + 1} imgCard={img} />
        ))}
      </motion.div>
    </div>
  )
}

