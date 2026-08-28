import React from 'react'
import type { BannerBlock as BannerBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const BannerBlock: React.FC<BannerBlockProps> = ({ image, href }) => {
  return (
    <div className="flex justify-center">
      <a href={href || '#'}>
        <Media className="max-w-[1348px]" resource={image} />
      </a>
    </div>
  )
}
