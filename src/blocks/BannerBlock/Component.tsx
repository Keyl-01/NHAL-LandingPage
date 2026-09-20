import React from 'react'
import type { BannerBlock as BannerBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'

export const BannerBlock: React.FC<BannerBlockProps> = ({ anchorId, image, href }) => {
  return (
    <div id={anchorId || "nhal-banner-section"} className="flex justify-center">
      <Link href={href || '#'}>
        <Media
          className="max-w-[1348px]"
          imgClassName="object-cover h-[182px] md:h-[337px] lg:min-h-[337px] lg:h-auto w-full"
          resource={image}
        />
      </Link>
    </div>
  )
}
