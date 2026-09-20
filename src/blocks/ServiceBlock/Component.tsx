'use client'

import { motion } from 'framer-motion'
import type { ServiceBlock as ServiceBlockProps } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { ImageWrapper } from './components/ImageWrapper'
import { ServiceCard } from './components/ServiceCard'

export const ServiceBlock: React.FC<ServiceBlockProps> = ({
  anchorId,
  imgWrapper,
  heading,
  serviceCards,
}) => {
  return (
    <motion.section
      id={anchorId || "nhal-service-section"}
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
      <div
        className="
      flex justify-center items-center w-full max-w-[1200px] py-[64px] px-[16px] overflow-hidden
      md:py-[40px] md:px-[24px]
      "
      >
        <div className="flex flex-col w-full max-w-[1150px] gap-[72px] items-center px-[20px] md:px-[25px]">
          <ImageWrapper imgWrapper={imgWrapper} />
          <RichText
            className="
            block text-center w-fit font-heading text-brand-light font-bold text-[37px] leading-[36px]
            md:leading-[48px]
            "
            data={heading}
          />
          <div className="grid w-full h-min justify-center gap-[20px] auto-rows-min grid-rows-[repeat(2,min-content)] grid-cols-[repeat(1,minmax(50px,1fr))] md:grid-cols-[repeat(2,minmax(50px,1fr))] lg:grid-cols-[repeat(3,minmax(50px,1fr))]">
            {serviceCards?.map((serviceCard, index) => (
              <ServiceCard key={index} serviceCard={serviceCard} count={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}
