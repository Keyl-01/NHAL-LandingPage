import { motion, type Transition } from 'framer-motion'
import type { ServiceBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

interface ServiceCardProps {
  serviceCard: NonNullable<ServiceBlock['serviceCards']>[number]
  count: number
}

const DELAY_MAP: Record<number, number> = {
  1: 0.3,
  2: 0.1,
  3: 0.1,
  4: 0.2,
  5: 0.2,
  6: 0.3,
}

const getDelay = (count: number): number => DELAY_MAP[count] ?? 0.3

const SPRING_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 340,
  damping: 58,
  mass: 1,
}

export const ServiceCard = ({ serviceCard, count }: ServiceCardProps) => {
  const { cardIcon, cardDescription, isActive } = serviceCard

  return (
    <motion.div
      className={cn(
        'flex h-[325px] w-full flex-col items-start justify-between rounded-[22px] p-[28px]',
        isActive ? 'bg-brand-light shadow-[0px_0px_52px_0px_rgba(156,99,73,0.3)]' : 'bg-white',
      )}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        ...SPRING_TRANSITION,
        delay: getDelay(count),
      }}
    >
      <Media
        className="aspect-1"
        imgClassName={cn('object-cover', isActive ? 'size-[58px]' : 'size-[54px]')}
        resource={cardIcon || ''}
      />
      <div
        className={cn(
          isActive
            ? 'text-[28px] leading-[42px] tracking-[-0.84px] text-white'
            : 'text-[24px] font-medium leading-[38px] tracking-[-0.6px] text-text-main',
        )}
      >
        {cardDescription}
      </div>
    </motion.div>
  )
}
