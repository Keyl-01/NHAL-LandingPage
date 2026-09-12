'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'

import type { AboutBlock as AboutBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

// ─── Animation Constants ─────────────────────────────────────────────────────

const SECTION_ENTRANCE = {
  initial: { opacity: 0, y: 96 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 400, damping: 30, mass: 1, delay: 0.6 } as const,
}

// ─── Component ───────────────────────────────────────────────────────────────

export const AboutBlock: React.FC<AboutBlockProps> = ({ simpleBadge, content, aboutImage }) => {
  const badgeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const badgeY = useScrollReveal(badgeRef, { keyframes: 'fast' })
  const contentY = useScrollReveal(contentRef)
  const imageY = useScrollReveal(imageRef)

  return (
    <motion.section
      id="nhal-about-section"
      className="flex w-full justify-center"
      {...SECTION_ENTRANCE}
    >
      <div className="relative flex flex-col w-full max-w-[1200px] gap-[16px] items-center py-[64px] px-[16px] overflow-hidden md:px-[24px] md:py-0">
        {/* Badge */}
        <div ref={badgeRef} className="relative flex h-fit max-w-[920px] w-full p-0 md:px-[24px]">
          <motion.div
            className="w-full h-fit text-[16px] text-nhal-dark font-medium leading-[24px]"
            style={{ y: badgeY }}
          >
            {simpleBadge}
          </motion.div>
        </div>

        {/* Content + Image */}
        <div className="flex w-full max-w-[920px] gap-[64px] items-start flex-col p-0 md:px-[24px] md:flex-row">
          {/* Text Column */}
          <div ref={contentRef} className="flex w-full">
            <motion.div
              className="flex flex-col gap-[24px] w-full items-start"
              style={{ y: contentY }}
            >
              <RichText
                data={content?.title}
                className="
                  max-w-[560px] w-full
                  font-heading text-brand-light font-bold text-[36px] leading-[39px]
                  md:text-[36px] md:leading-[48px]
                "
              />
              <div className="max-w-[600px] w-full text-[22px] text-nhal-dark leading-[24px]">
                {content?.description1}
              </div>
              <div className="max-w-[402px] w-full text-[22px] text-nhal-dark leading-[24px] md:text-[17px]">
                {content?.description2}
              </div>
            </motion.div>
          </div>

          {/* Image Column */}
          {aboutImage && (
            <div ref={imageRef} className="relative w-full aspect-[404/412]">
              <motion.div className="w-full h-full" style={{ y: imageY }}>
                <Media
                  className="w-full h-full overflow-hidden rounded-[71px]"
                  imgClassName="object-cover w-full h-full"
                  resource={aboutImage}
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}
