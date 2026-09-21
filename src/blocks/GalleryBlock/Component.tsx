'use client'

import { memo, useRef, useState } from 'react'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import type { GalleryBlock as GalleryBlockType } from '@/payload-types'
import { Media } from '@/components/Media'

type ImageType = NonNullable<GalleryBlockType['images']>[number]

const GalleryItem = memo(({ imageItem }: { imageItem: ImageType }) => {
  if (!imageItem.image) return null

  return (
    <div className="flex items-center relative h-[319px] w-[420px] shrink-0 overflow-hidden md:w-[480px]">
      <Media
        resource={imageItem.image}
        className="h-[96%] w-full object-cover"
        imgClassName="h-full w-full object-cover"
      />
    </div>
  )
})
GalleryItem.displayName = 'GalleryItem'

export const GalleryBlock: React.FC<GalleryBlockType> = ({ anchorId, images }) => {
  if (!images || images.length === 0) return null

  // Ensure enough images for a smooth infinite loop (prevents gap at the end)
  let displayImages = [...images]
  while (displayImages.length < 10) {
    displayImages = [...displayImages, ...images]
  }

  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  // Default speed moving left (negative is left)
  const baseVelocity = -1
  const [isHovered, setIsHovered] = useState(false)
  const velocityFactor = useRef(1)

  useAnimationFrame((t, delta) => {
    if (!containerRef.current) return
    const container = containerRef.current

    // Since we render 2 identical content blocks, half the scrollWidth is the width of one block
    const scrollWidth = container.scrollWidth / 2

    // Target velocity: 0.5x when hovered, 1x when normal
    const targetVelocity = isHovered ? 0.5 : 1
    // Smooth out velocity changes
    velocityFactor.current += (targetVelocity - velocityFactor.current) * 0.1

    // Calculate distance moved per frame
    const moveBy = baseVelocity * velocityFactor.current * (delta / 16.666)

    let currentX = x.get() + moveBy
    // If one block finishes scrolling, reset position to start to create infinite loop effect
    if (currentX <= -scrollWidth) {
      currentX += scrollWidth
    } else if (currentX >= 0) {
      currentX -= scrollWidth
    }

    x.set(currentX)
  })

  // A cluster of gallery items with 10px gap
  // Add pr-[10px] so when the second cluster follows there's a 10px gap at the boundary
  const content = (
    <div className="flex shrink-0 items-center gap-[10px] pr-[10px]">
      {displayImages.map((imageItem, index) => (
        <GalleryItem key={`set-${index}`} imageItem={imageItem} />
      ))}
    </div>
  )

  return (
    <section
      id={anchorId || 'nhal-gallery-section'}
      className="flex w-full flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="relative flex w-full items-center overflow-hidden"
        style={{ height: '319px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div className="flex shrink-0 items-center" style={{ x }} ref={containerRef}>
          {content}
          {content}
        </motion.div>
      </div>
    </section>
  )
}
