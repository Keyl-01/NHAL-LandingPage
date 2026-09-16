'use client'

import React, { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type SpringOptions,
  type UseScrollOptions,
} from 'framer-motion'

import type { ServiceBlock } from '@/payload-types'
import { ImageCard } from '../ImageCard'

// ─── Constants ──────────────────────────────────────────────────────────────

const SCROLL_OFFSET: UseScrollOptions['offset'] = ['start end', 'end end']

const SPRING_CONFIG: SpringOptions = {
  stiffness: 500,
  damping: 60,
  mass: 1,
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface ImageWrapperProps {
  imgWrapper: ServiceBlock['imgWrapper']
}

// ─── Component ──────────────────────────────────────────────────────────────

export const ImageWrapper: React.FC<ImageWrapperProps> = ({ imgWrapper }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: SCROLL_OFFSET,
  })

  // Map scroll progress to scale (0 -> 1) and Y position (32px -> 0px)
  const rawScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const rawY = useTransform(scrollYProgress, [0, 1], [32, 0])

  // Apply spring smoothing
  const scale = useSpring(rawScale, SPRING_CONFIG)
  const y = useSpring(rawY, SPRING_CONFIG)

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
