import { BenefitCard } from '../BenefitCard'
import type { BenefitBlock } from '@/payload-types'

type BenefitWrapper = NonNullable<BenefitBlock['benefitWrappers']>[number]

type BenefitWrapperProps = {
  benefitCard1: BenefitWrapper['benefitCard1']
  benefitCard2: BenefitWrapper['benefitCard2']
}

export const BenefitWrapper: React.FC<BenefitWrapperProps> = ({ benefitCard1, benefitCard2 }) => {
  return (
    <div className="flex w-full py-[18px] gap-[38px] flex-col md:flex-row items-center justify-center md:gap-[22px] lg:gap-0">
      <BenefitCard
        icon={benefitCard1?.icon}
        title={benefitCard1?.title}
        description={benefitCard1?.description}
        delay={0.1}
      />
      <div className="hidden md:block w-[1px] self-stretch opacity-20 bg-nhal-brown" />
      <BenefitCard
        icon={benefitCard2?.icon}
        title={benefitCard2?.title}
        description={benefitCard2?.description}
        delay={0.2}
      />
    </div>
  )
}
