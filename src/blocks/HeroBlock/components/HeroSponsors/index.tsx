import React from 'react'
import type { HeroBlock, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { motion } from 'framer-motion'

interface HeroSponsorsProps {
  className?: string
  sponsors?: HeroBlock['sponsors']
}

// Logo sizing: normalize visual weight by aspect ratio instead of a fixed height.
// Exponent 0 = equal height, 0.5 = equal area.
const LOGO_BASE_HEIGHT = 36
const LOGO_MIN_HEIGHT = 20
const LOGO_MAX_HEIGHT = 40
const LOGO_SCALE_EXPONENT = 0.8
const LOGO_FALLBACK_HEIGHT = 28

const getLogoSize = (logo?: MediaType | string | number | null) => {
  if (!logo || typeof logo !== 'object' || !logo.width || !logo.height) {
    return null
  }

  const ratio = logo.width / logo.height
  const height = Math.min(
    LOGO_MAX_HEIGHT,
    Math.max(LOGO_MIN_HEIGHT, LOGO_BASE_HEIGHT * ratio ** -LOGO_SCALE_EXPONENT),
  )

  return { height, width: height * ratio }
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
          className="flex w-max h-[40px] items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 36,
            repeat: Infinity,
          }}
        >
          {duplicatedSponsors.map((sponsor, index) => {
            const size = getLogoSize(sponsor.sponsorLogo)

            return (
              <div
                key={`${sponsor.id || index}-${index}`}
                className="shrink-0 mr-[48px] flex items-center justify-center"
                style={size ?? { height: LOGO_FALLBACK_HEIGHT }}
              >
                <Media
                  htmlElement={null}
                  pictureClassName="block h-full"
                  imgClassName={`h-full object-contain ${size ? 'w-full' : 'w-auto'}`}
                  size="200px"
                  resource={sponsor.sponsorLogo}
                />
              </div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
