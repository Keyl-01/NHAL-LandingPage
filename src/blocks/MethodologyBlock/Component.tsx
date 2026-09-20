'use client'

import { motion, type Transition } from 'framer-motion'
import { Media } from '@/components/Media'
import type { MethodologyBlock as MethodologyBlockProp } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/utilities/ui'
import { jsxConverters } from '@/utilities/lexicalConverters'

const SPRING_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 340,
  damping: 58,
  mass: 1,
}

const VIEWPORT_CONFIG = {
  once: true,
  margin: '0px 0px -200px 0px',
}

export const MethodologyBlock: React.FC<MethodologyBlockProp> = ({
  anchorId,
  heading,
  description,
  coverImage,
}) => {
  return (
    <section
      id={anchorId || "nhal-methodology-section"}
      className={cn('flex w-full items-center justify-center overflow-hidden', 'md:px-[25px]')}
    >
      <div className="flex w-full max-w-[1200px] flex-col gap-[52px] px-[20px] py-[82px]">
        <RichText
          className={cn(
            'w-full text-center font-heading text-[37px] font-bold leading-[36px] text-brand-light',
            'md:leading-[48px]',
          )}
          data={heading}
        />
        <div
          className={cn(
            'grid h-min w-full flex-none auto-rows-min grid-rows-[min-content] justify-center gap-[28px]',
            'grid-cols-[repeat(1,minmax(50px,1fr))] md:grid-cols-[repeat(2,minmax(50px,1fr))] lg:gap-[38px]',
          )}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ ...SPRING_TRANSITION, delay: 0.1 }}
          >
            <Media
              className="w-full"
              imgClassName="h-[420px] rounded-[38px] object-cover object-top md:h-[998px] lg:h-[742px]"
              resource={coverImage}
            />
          </motion.div>
          <motion.div
            className="flex w-full items-center justify-start"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_CONFIG}
            transition={{ ...SPRING_TRANSITION, delay: 0.1 }}
          >
            <RichText
              converters={jsxConverters}
              data={description}
              className="flex h-min flex-col gap-[34px] md:gap-[18px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
