import React from 'react'
import type { HeroBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { motion } from 'framer-motion'

interface HeroSponsorsProps {
  className?: string
  sponsors?: HeroBlock['sponsors']
}

export const HeroSponsors: React.FC<HeroSponsorsProps> = ({ className, sponsors }) => {
  const duplicatedSponsors = sponsors ? [...sponsors, ...sponsors, ...sponsors, ...sponsors] : []

  return (
    <div
      className={`flex w-full max-w-[920px] px-[24px] gap-[48px] items-center justify-center ${className || ''}`}
    >
      <div className="hidden md:block text-[16px] font-medium leading-[24px] shrink-0">
        Nhà tài trợ
      </div>
      <div className="flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_25%,black_75%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_25%,black_75%,transparent_100%)]">
        <motion.div
          className="flex w-max h-[24px] items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 36,
            repeat: Infinity,
          }}
        >
          {duplicatedSponsors.map((sponsor, index) => (
            <Media
              key={`${sponsor.id || index}-${index}`}
              className="shrink-0 mr-[48px] flex items-center justify-center"
              imgClassName="w-full h-[24px] object-contain"
              resource={sponsor.sponsorLogo}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
