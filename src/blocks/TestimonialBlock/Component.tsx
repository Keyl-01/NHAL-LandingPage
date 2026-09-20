'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel'

// ─── Slideshow Constants ─────────────────────────────────────────────────────

const SPRING_CONFIG = { stiffness: 300, damping: 40, mass: 1 }

const INACTIVE_OPACITY = 0.5
const INACTIVE_SCALE = 0.7

const MD_BREAKPOINT = 768

// ─── Testimonial Slide ───────────────────────────────────────────────────────

function TestimonialSlide({
  quote,
  author,
  isActive,
}: {
  quote: string
  author: string
  isActive: boolean
}) {
  return (
    <motion.div
      className="flex w-full"
      animate={{
        opacity: isActive ? 1 : INACTIVE_OPACITY,
        scale: isActive ? 1 : INACTIVE_SCALE,
      }}
      transition={SPRING_CONFIG}
      style={{ perspective: 1200 }}
    >
      <div
        className={cn(
          'flex w-full h-[483px] flex-col gap-[32px] items-start',
          'md:gap-[40px] md:h-[348px]',
          'lg:h-[419px]',
        )}
      >
        {/* Quote mark */}
        <div className="flex w-[34px] h-[28px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 34 28"
          >
            <path
              d="M 11.421 0 C 7.38 1.229 4.393 3.072 2.636 5.354 C 0.879 7.636 0 10.709 0 14.395 L 0 28 L 15.023 28 L 15.023 13.605 L 7.995 13.605 L 7.995 13.43 C 7.995 11.411 8.434 9.831 9.313 8.69 C 10.191 7.636 11.861 6.671 14.32 5.793 Z M 30.398 0 C 26.357 1.229 23.369 3.072 21.612 5.354 C 19.855 7.636 18.977 10.709 18.977 14.395 L 18.977 28 L 34 28 L 34 13.605 L 26.972 13.605 L 26.972 13.43 C 26.972 11.411 27.411 9.831 28.289 8.69 C 29.168 7.636 30.837 6.671 33.297 5.793 Z"
              fill="rgb(110, 19, 19)"
            ></path>
          </svg>
        </div>

        {/* Quote */}
        <div className="flex w-full text-[28px] leading-[36px] text-brand font-script">{quote}</div>

        {/* Author */}
        <div className="flex w-full max-w-[577px] text-[16px] leading-[24px] text-nhal-dark font-medium pl-[16px] border-l-[1px] border-[#c9cdd2]">
          {author}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({ heading, testimonials }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sectionY = useScrollReveal(sectionRef)

  const [api, setApi] = useState<CarouselApi>()
  const [activeIndex, setActiveIndex] = useState(0)

  // ─── Track active slide ──────────────────────────────────────────────────

  useEffect(() => {
    if (!api) return

    const onSelect = () => setActiveIndex(api.selectedScrollSnap())

    api.on('select', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  if (!testimonials || testimonials.length === 0) return null

  return (
    <motion.section
      id="nhal-testimonial-section"
      className="flex w-full justify-center"
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
        className={cn(
          'flex flex-col w-full max-w-[1200px] pt-[64px] px-[16px] items-center gap-[40px]',
          'md:gap-[48px] md:px-[24px] md:pb-[14px]',
        )}
      >
        <RichText
          className={cn(
            'w-full text-center font-heading text-[37px] font-bold leading-[36px] text-brand-light',
            'lg:leading-[48px]',
          )}
          data={heading}
        />

        {/* Slideshow */}
        <div
          ref={sectionRef}
          className="flex w-full max-w-[920px] items-center px-[24px] md:px-[64px] lg:px-[24px]"
        >
          <motion.div className="w-full" style={{ y: sectionY }}>
            <Carousel
              opts={{
                align: 'center',
                loop: true,
                dragFree: false,
              }}
              setApi={setApi}
              className="group w-full"
            >
              <CarouselContent className="-ml-[48px] md:-ml-[96px] select-none">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={testimonial.id || index}
                    className="pl-[48px] md:pl-[96px] cursor-grab active:cursor-grabbing"
                  >
                    <TestimonialSlide
                      quote={testimonial.quote}
                      author={testimonial.author}
                      isActive={index === activeIndex}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Arrows — md+ only, visible on hover */}
              <CarouselPrevious
                variant="ghost"
                size="icon"
                className={cn(
                  'hidden md:flex items-center justify-center cursor-pointer',
                  '!text-white hover:!text-white [&_svg]:!size-[30px] [&_svg]:stroke-[1.7]',
                  'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
                  '!w-[40px] !h-[40px] !rounded-full !bg-[rgba(18,18,24,0.2)] hover:!bg-[rgba(18,18,24,0.2)] !border-none',
                  '!inset-y-auto !top-1/2 !-translate-y-1/2',
                )}
              />
              <CarouselNext
                variant="ghost"
                size="icon"
                className={cn(
                  'hidden md:flex items-center justify-center cursor-pointer',
                  '!text-white hover:!text-white [&_svg]:!size-[30px] [&_svg]:stroke-[1.7]',
                  'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
                  '!w-[40px] !h-[40px] !rounded-full !bg-[rgba(18,18,24,0.2)] hover:!bg-[rgba(18,18,24,0.2)] !border-none',
                  '!inset-y-auto !top-1/2 !-translate-y-1/2',
                )}
              />
            </Carousel>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
