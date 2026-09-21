'use client'

import { motion } from 'framer-motion'
import { FooterBlock as FooterBlockType } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { jsxConverters } from '@/utilities/lexicalConverters'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const FooterBlock: React.FC<FooterBlockType> = ({ anchorId, description, socialLinks }) => {
  return (
    <motion.footer
      id={anchorId || 'nhal-footer-section'}
      className="relative flex w-full overflow-hidden"
      initial={{ opacity: 0, y: 96 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 1,
        delay: 0.6,
        bounce: 0.2,
        timeConstant: 400,
      }}
    >
      <div
        className={cn(
          'flex w-full flex-col items-center gap-[32px] pt-[64px] px-[16px] pb-[96px] z-2',
          'md:py-[96px]',
        )}
      >
        <RichText
          className="w-full max-w-[420px] leading-[24px] text-nhal-dark text-center whitespace-pre-wrap break-words"
          converters={jsxConverters}
          data={description}
        />
        <div className="flex w-full flex-col items-center gap-[32px]">
          <div className="flex w-full justify-center items-center gap-[16px] py-[19px]">
            {socialLinks?.map((link) => (
              <Link key={link?.id} href={link?.link || '#'} target="_blank">
                {link?.icon && (
                  <Media
                    className="size-[60px]"
                    imgClassName="object-contain"
                    resource={link?.icon}
                    alt={link?.name}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex text-[var(--nhal-text-secondary)] text-[22px] leading-[24px]">
            © 2026 Ngày Hội An Lạc
          </div>
        </div>
      </div>

      <div className={cn('absolute bottom-0 right-0 flex size-[96px] z-1', 'md:size-[256px]')}>
        <div
          className={cn(
            'absolute w-[600px] h-[161px] top-[calc(130.208%-80.5px)] left-[calc(96.875%-300px)] bg-nhal-red rotate-140 overflow-hidden',
            'md:top-[calc(79.6875%-80.5px)] md:left-[calc(74.6094%-300px)]',
          )}
        />
      </div>
    </motion.footer>
  )
}
