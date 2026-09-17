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

export const GalleryBlock: React.FC<GalleryBlockType> = ({ images }) => {
  if (!images || images.length === 0) return null

  // Đảm bảo có đủ số lượng ảnh để chạy vòng lặp mượt mà (slider không bị hụt ở đuôi)
  let displayImages = [...images]
  while (displayImages.length < 10) {
    displayImages = [...displayImages, ...images]
  }

  const containerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  // Tốc độ mặc định chạy sang trái (âm là sang trái)
  const baseVelocity = -1
  const [isHovered, setIsHovered] = useState(false)
  const velocityFactor = useRef(1)

  useAnimationFrame((t, delta) => {
    if (!containerRef.current) return
    const container = containerRef.current

    // Vì ta render 2 cụm content y hệt nhau, chia đôi scrollWidth sẽ ra chiều rộng của 1 cụm
    const scrollWidth = container.scrollWidth / 2

    // Target velocity: 0.5x khi hover, 1x khi bình thường
    const targetVelocity = isHovered ? 0.5 : 1
    // Làm mượt sự thay đổi tốc độ
    velocityFactor.current += (targetVelocity - velocityFactor.current) * 0.1

    // Tính toán quãng đường di chuyển mỗi frame
    const moveBy = baseVelocity * velocityFactor.current * (delta / 16.666)

    let currentX = x.get() + moveBy
    // Nếu chạy hết 1 cụm thì reset vị trí về đầu để tạo cảm giác chạy vô tận
    if (currentX <= -scrollWidth) {
      currentX += scrollWidth
    } else if (currentX >= 0) {
      currentX -= scrollWidth
    }

    x.set(currentX)
  })

  // Một cụm gallery item với gap 10px
  // Thêm pr-[10px] để khi cụm thứ 2 nối tiếp vào cũng có khoảng cách 10px ở ranh giới
  const content = (
    <div className="flex shrink-0 items-center gap-[10px] pr-[10px]">
      {displayImages.map((imageItem, index) => (
        <GalleryItem key={`set-${index}`} imageItem={imageItem} />
      ))}
    </div>
  )

  return (
    <section
      id="nhal-gallery-section"
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
