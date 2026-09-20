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
  anchorId,
  heading,
  description,
  importantDescription,
  primaryCta,
}) => {
  return (
    <motion.section
      id={anchorId || "nhal-archive-section"}
      className="relative flex w-full justify-center overflow-x-clip"
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

      <div
        className={cn(
          'hidden flex-row flex-none items-center gap-2.5 h-[701px] p-0 absolute -bottom-[1026px] -left-[116px] -right-[116px] overflow-visible',
          'md:flex',
        )}
      >
        {/* Orange glow */}
        <div
          className={cn(
            'bg-[radial-gradient(50%_50%,#e3940040_0%,#e3940000_100%)] flex-none w-[500px] h-[500px] absolute overflow-hidden',
            'md:top-0 md:-left-[58px]',
            'lg:-top-[147px] lg:-left-[105px]',
          )}
        />
        {/* Blue glow */}
        <div
          className={cn(
            'bg-[radial-gradient(50%_50%,#0097fe40_0%,#e3940000_100%)] flex-none w-[500px] h-[500px] absolute overflow-hidden',
            'md:-top-[197px] md:-left-[336px]',
            'lg:-bottom-[250px] lg:-left-[308px] lg:top-auto',
          )}
        />
        {/* Green glow */}
        <div
          className={cn(
            'bg-[radial-gradient(50%_50%,#00ad0940_0%,#e3940000_100%)] flex-none w-[500px] h-[500px] absolute overflow-hidden',
            'md:-top-[149px] md:-right-[220px]',
            'lg:-top-[214px] lg:-right-[134px]',
          )}
        />
        {/* Pink glow */}
        <div
          className={cn(
            'bg-[radial-gradient(50%_50%,#f347ff40_0%,#e3940000_100%)] flex-none w-[500px] h-[500px] absolute overflow-hidden',
            'md:-bottom-[69px] md:-right-[285px]',
            'lg:-bottom-[85px] lg:-right-[188px]',
          )}
        />
        {/* Purple glow */}
        <div
          className={cn(
            'bg-[radial-gradient(50%_50%,#9966ff40_0%,#e3940000_100%)] flex-none w-[500px] h-[500px] absolute -right-[220px] overflow-hidden',
          )}
        />
        {/* Red glow */}
        <div
          className={cn(
            'bg-[radial-gradient(50%_50%,#ff474740_0%,#e3940000_100%)] flex-none w-[500px] h-[500px] absolute overflow-hidden',
            'md:-bottom-[150px] md:-left-[176px]',
            'lg:-bottom-[90px] lg:-left-[191px]',
          )}
        />
        {/* Blue-purple glow */}
        <div
          className={cn(
            'bg-[radial-gradient(50%_50%,#4772ff40_0%,#e3940000_100%)] flex-none w-[500px] h-[500px] absolute overflow-hidden',
            'md:top-[calc(50.0713%-250px)] md:-left-[97px]',
            'lg:-bottom-[405px] lg:-left-[177px] lg:top-auto',
          )}
        />
      </div>
    </motion.section>
  )
}
