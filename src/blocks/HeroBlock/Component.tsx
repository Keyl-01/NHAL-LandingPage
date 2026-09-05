'use client'

import React from 'react'
import { motion } from 'framer-motion'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { Hero } from './components/Hero'

export const HeroBlock: React.FC<HeroBlockProps> = ({
  heroStats,
  headline,
  subtitle,
  primaryCta,
}) => {
  return (
    <section id="nhal-hero-section" className="flex w-full justify-center">
      <div
        className="
      flex flex-col w-full max-w-[1200px] gap-[82px] items-center py-[27px] px-[16px]
      md:py-[49px] md:px-[24px]
      "
      >
        <motion.div
          className="flex flex-col max-w-[920px] w-full gap-[30px] py-6 px-0 md:p-[24px] overflow-hidden"
          initial={{ opacity: 0, y: 96 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
            mass: 1,
            delay: 0.3,
          }}
        >
          <Hero
            className="flex flex-col w-full gap-[13px] md:gap-[34px]"
            heroStats={heroStats}
            headline={headline}
            subtitle={subtitle}
            primaryCta={primaryCta}
          />
        </motion.div>
      </div>
    </section>
  )
}
