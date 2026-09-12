import { motion } from 'framer-motion'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface BenefitCardProps {
  icon?: number | MediaType
  title?: string
  description?: string
  delay: number
}

export const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
  delay = 0.1,
}) => {
  return (
    <motion.div
      className="flex flex-1 flex-col items-center gap-[32px] px-[18px]"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 40,
        mass: 1.4,
        delay,
      }}
    >
      <Media className="w-[139px] aspect-1" imgClassName="object-cover" resource={icon} />
      <div className="flex flex-col gap-[12px] items-center justify-center text-center">
        <div className="text-text-main font-bold text-[20px] leading-[24px]">{title}</div>
        <div className="text-text-secondary font-medium text-[20px] leading-[32px]">
          {description}
        </div>
      </div>
    </motion.div>
  )
}
