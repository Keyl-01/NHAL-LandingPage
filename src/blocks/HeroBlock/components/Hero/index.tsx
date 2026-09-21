import { RichText } from '@payloadcms/richtext-lexical/react'
import { motion } from 'framer-motion'

import type { HeroBlock } from '@/payload-types'
import { HeroStat } from '../HeroStat'
import Link from 'next/link'

type HeroProps = {
  className?: string
  heroStats?: HeroBlock['heroStats']
  heading?: HeroBlock['heading']
  subHeading?: HeroBlock['subHeading']
  primaryCta?: HeroBlock['primaryCta']
}

export const Hero: React.FC<HeroProps> = ({
  className,
  heroStats,
  heading,
  subHeading,
  primaryCta,
}) => {
  return (
    <div className={className}>
      {heroStats && (
        <HeroStat count={heroStats.count} label={heroStats.label} avatars={heroStats.avatars} />
      )}
      {heading && (
        <RichText
          data={heading}
          className="
          font-heading text-brand font-bold max-w-4xl

          [&>*:first-child]:text-[66px] [&>*:first-child]:leading-[66px]
          md:[&>*:first-child]:text-[48px] md:[&>*:first-child]:leading-[56px]
          lg:[&>*:first-child]:text-[66px] lg:[&>*:first-child]:leading-[72px]
          
          [&>*:nth-child(2)]:text-[36px] [&>*:nth-child(2)]:leading-[66px]
          md:[&>*:nth-child(2)]:text-[48px] md:[&>*:nth-child(2)]:leading-[56px]
          lg:[&>*:nth-child(2)]:text-[72px] lg:[&>*:nth-child(2)]:leading-[72px]
          "
        />
      )}

      {subHeading && (
        <RichText
          data={subHeading}
          className="
          text-base 
          text-[17px] leading-[24px] 
          md:text-[25px] md:leading-[33px] 
          "
        />
      )}

      <motion.div
        className="flex md:-mt-1"
        initial={{ opacity: 0, y: 96 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 1, delay: 0.5 }}
      >
        {primaryCta?.label && (
          <Link
            href={primaryCta.href || '#'}
            className="
            flex justify-center items-center py-2.5 px-4 rounded-full border border-nhal-dark 
            bg-gradient-to-b from-[rgb(255,179,3)] to-[var(--nhal-gold,rgb(227,185,85))] shadow-[0px_1px_2px_0px_rgba(18,18,24,0.03),0px_2px_4px_0px_rgba(18,18,24,0.05),inset_0px_4px_8px_1px_rgba(255,255,255,0.15)]
            text-[26px] text-nhal-red font-medium leading-6
            hover:text-white transition-colors duration-500 ease-in-out

            w-full h-[66px]
            md:w-[32%] md:h-[69px]
            lg:w-[31%] lg:h-[66px]
            "
          >
            {primaryCta.label}
          </Link>
        )}
      </motion.div>
    </div>
  )
}
