'use client'

import React from 'react'
import { motion } from 'framer-motion'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { Hero } from './components/Hero'
import { HeroStory } from './components/HeroStory'
import { HeroSponsors } from './components/HeroSponsors'

const HERO_ENTRANCE = {
  initial: { opacity: 0, y: 96 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 400, damping: 30, mass: 1, delay: 0.3 } as const,
}

const STORY_ENTRANCE = {
  initial: { opacity: 0, y: 96, scale: 0 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { type: 'spring', stiffness: 300, damping: 30, mass: 1, delay: 0.5 } as const,
}

const SPONSORS_ENTRANCE = {
  initial: { opacity: 0, y: 96 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 400, damping: 30, mass: 1, delay: 0.6 } as const,
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  anchorId,
  heroStats,
  heading,
  subHeading,
  primaryCta,
  heroStory,
  sponsors,
}) => {
  return (
    <section id={anchorId || 'nhal-hero-section'} className="flex w-full justify-center">
      <div
        className="
      flex flex-col w-full max-w-[1200px] gap-[82px] items-center py-[27px] px-[16px]
      md:py-[49px] md:px-[24px]
      "
      >
        <motion.div
          className="flex flex-col max-w-[920px] w-full gap-[30px] py-6 px-0 md:p-[24px] overflow-hidden"
          {...HERO_ENTRANCE}
        >
          <Hero
            className="flex flex-col w-full gap-[13px] md:gap-[34px]"
            heroStats={heroStats}
            heading={heading}
            subHeading={subHeading}
            primaryCta={primaryCta}
          />
        </motion.div>
        <motion.div
          className="w-full"
          {...STORY_ENTRANCE}
        >
          <HeroStory videoUrl={heroStory?.videoUrl} thumbnail={heroStory?.thumbnail} />
        </motion.div>
        <motion.div
          className="flex justify-center w-full"
          {...SPONSORS_ENTRANCE}
        >
          <HeroSponsors sponsors={sponsors} />
        </motion.div>
      </div>
    </section>
  )
}
