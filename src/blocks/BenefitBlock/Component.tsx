'use client'

import React from 'react'
import { motion } from 'framer-motion'

import type { BenefitBlock as BenefitBlockProps } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { BenefitWrapper } from './components/BenefitWrapper'

export const BenefitBlock: React.FC<BenefitBlockProps> = ({ heading, benefitWrappers }) => {
  return (
    <motion.section
      id="nhal-benefit-section"
      className="flex justify-center items-center w-full"
      initial={{ opacity: 0, y: 96 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 1,
        delay: 0.6,
      }}
    >
      <div className="flex flex-col w-full items-center max-w-[1200px] gap-[50px] px-[16px] py-[64px] md:py-[98px] md:px-[24px] md:gap-[48px]">
        <RichText
          data={heading}
          className="
          block text-center w-fit font-heading text-brand-light font-bold text-[37px] leading-[36px]
          md:leading-[44px]
        "
        />

        {benefitWrappers?.map((wrapper) => (
          <BenefitWrapper
            key={wrapper.id}
            benefitCard1={wrapper.benefitCard1}
            benefitCard2={wrapper.benefitCard2}
          />
        ))}
      </div>
    </motion.section>
  )
}
