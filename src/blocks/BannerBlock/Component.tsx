import React from 'react'
import { motion } from 'framer-motion'

import type { BannerBlock as BannerBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const BannerBlock: React.FC<BannerBlockProps> = ({ banner, href }) => {
  return (
    <div className="w-full mx-auto h-48">
      <a href={href || '#'}>
        <Media resource={banner} />
      </a>
    </div>
  )
}
