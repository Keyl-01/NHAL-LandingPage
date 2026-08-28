'use client'

import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { motion } from 'framer-motion'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'

export const HeroBlock: React.FC<HeroBlockProps> = ({ headline, subtitle, primaryCta }) => {
  return (
    <section id="hero" className="flex flex-col w-full">
      {/* Content */}
      {/* Headline */}
      {headline && (
        <motion.div
          className="font-heading text-brand text-[40px] font-bold leading-[48px] md:text-[56px] md:leading-[64px] lg:text-[72px] lg:leading-[80px] max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <RichText data={headline} />
        </motion.div>
      )}

      {/* Description */}
      {subtitle && (
        <motion.div
          className="text-base lg:text-lg max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <RichText data={subtitle} />
        </motion.div>
      )}
      {/* CTAs */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        {primaryCta?.label && (
          <a
            href={primaryCta.href || '#'}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-nhal-gold text-nhal-dark font-bold text-base rounded-full hover:bg-nhal-gold-light transition-all duration-300 shadow-xl shadow-nhal-gold/30 hover:shadow-2xl hover:shadow-nhal-gold/40 hover:-translate-y-0.5"
          >
            {primaryCta.label}
          </a>
        )}
      </motion.div>
    </section>
  )
}
