'use client'

import { memo } from 'react'
import { motion, type Transition, type Variants } from 'framer-motion'
import type { SponsorBlock as SponsorBlockType } from '@/payload-types'
import { Media } from '@/components/Media'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { jsxConverters } from '@/utilities/lexicalConverters'
import { cn } from '@/utilities/ui'

const SPRING_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 340,
  damping: 58,
  mass: 1,
}

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...SPRING_TRANSITION, delay: 0.1 },
  },
}

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...SPRING_TRANSITION, delay: 0.1 },
  },
}

type SponsorType = NonNullable<SponsorBlockType['sponsors']>[number]

const SponsorItem = memo(({ sponsor }: { sponsor: SponsorType }) => {
  return (
    <div
      className={cn(
        'flex w-full max-w-[1200px] flex-col gap-[52px] px-[20px] overflow-hidden',
        'md:px-[25px]',
      )}
    >
      <RichText
        className={cn(
          'w-full text-center font-heading text-[37px] font-bold leading-[43px] text-brand-light',
          'lg:leading-[48px]',
        )}
        data={sponsor.heading}
      />

      <div
        className={cn(
          'grid w-full h-min justify-center grid-rows-[min-content] auto-rows-min',
          'gap-[28px] grid-cols-[repeat(1,minmax(50px,1fr))]',
          'lg:gap-[38px] md:grid-cols-[repeat(2,minmax(50px,1fr))]',
        )}
      >
        <motion.div
          className="flex order-1 md:order-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={descriptionVariants}
        >
          <RichText
            converters={jsxConverters}
            data={sponsor.description}
            className={cn(
              'flex flex-col self-center justify-self-start items-start gap-[34px] w-full h-min overflow-hidden',
              'md:gap-[18px]',
            )}
          />
        </motion.div>

        <motion.div
          className="flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={logoVariants}
        >
          {sponsor.logo && (
            <Media
              resource={sponsor.logo}
              className="w-full h-min justify-self-center"
              imgClassName="w-full h-[420px] object-contain rounded-[38px] md:h-[439px] lg:h-[742px]"
            />
          )}
        </motion.div>
      </div>
    </div>
  )
})
SponsorItem.displayName = 'SponsorItem'

export const SponsorBlock: React.FC<SponsorBlockType> = ({ anchorId, sponsors }) => {
  if (!sponsors || sponsors.length === 0) return null

  return (
    <section
      id={anchorId || "nhal-sponsors-section"}
      className="flex flex-col w-full items-center justify-center py-[82px] gap-[82px] overflow-hidden"
    >
      {sponsors.map((sponsor, index) => (
        <SponsorItem key={sponsor.id || index} sponsor={sponsor} />
      ))}
    </section>
  )
}
