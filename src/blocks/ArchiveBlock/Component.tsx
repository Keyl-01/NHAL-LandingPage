'use client'

import type { ArchiveBlock as ArchiveBlockProp } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { motion, Transition } from 'framer-motion'
import { cn } from '@/utilities/ui'
import { jsxConverters } from '@/utilities/lexicalConverters'
import Link from 'next/link'

const SECTION_ENTRANCE = {
  initial: { opacity: 0, y: 96 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 400, damping: 30, mass: 1, delay: 0.6 } as const,
}

const SPRING_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 1,
}

export const ArchiveBlock: React.FC<ArchiveBlockProp> = ({
  heading,
  description,
  importantDescription,
  primaryCta,
}) => {
  return (
    <motion.section
      id="nhal-archive-section"
      className="flex w-full justify-center"
      {...SECTION_ENTRANCE}
    >
      <div
        className="
        flex w-full h-[1283x] max-w-[1200px] flex-col items-center gap-[40px] px-[16px] py-[64px] overflow-hidden
        md:h-[1283px] md:gap-[48px] md:px-[24px] md:py-[96px]
        lg:h-[1162px]
        "
      >
        <RichText
          data={heading}
          className={cn(
            'text-center font-heading text-[37px] font-bold leading-[36px] text-brand-light',
            'md:leading-[48px]',
          )}
        />
        <RichText
          converters={jsxConverters}
          data={description}
          className={cn('w-full max-w-[920px] md:px-[24px]')}
        />
        <div
          className="
            flex items-center w-full max-w-[1280px]
            md:w-[96%] md:max-w-[158%] md:pt-[60px] md:pb-[80px]
            lg:w-[85%] lg:max-w-[1280px] lg:pt-[12px] lg:px-[32px] lg:pb-[36px]
            "
        >
          <motion.div
            className="
            flex flex-col w-[136%] p-[20px] items-center gap-[56px] rounded-[24px] bg-brand-light overflow-hidden
            md:w-[117%] md:gap-[28px] md:py-[36px] md:px-[30px]
            lg:w-[97%] lg:py-[35px] lg:px-[60px] lg:gap-[17px]
            "
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ ...SPRING_TRANSITION, delay: 0.3, duration: 1 }}
          >
            <RichText
              converters={jsxConverters}
              data={importantDescription}
              className={cn('w-full text-white')}
            />

            {primaryCta?.label && (
              <Link
                href={primaryCta.href || '#'}
                className="
                    flex justify-center items-center py-2.5 px-4 rounded-full border border-nhal-dark 
                    bg-gradient-to-b from-[rgb(255,179,3)] to-[var(--nhal-gold,rgb(227,185,85))] shadow-[0px_1px_2px_0px_rgba(18,18,24,0.03),0px_2px_4px_0px_rgba(18,18,24,0.05),inset_0px_4px_8px_1px_rgba(255,255,255,0.15)]
                    text-[26px] text-nhal-red font-medium leading-6
                    hover:text-white transition-colors duration-500 ease-in-out

                    w-full sm:h-[11%]
                    md:w-[33%] md:h-[11%]
                    lg:w-[35%] lg:h-[16%]
                    "
              >
                {primaryCta.label}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
