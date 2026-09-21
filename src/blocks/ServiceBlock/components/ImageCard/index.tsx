import { Media } from '@/components/Media'
import type { ServiceBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'

type ImageCardProps = {
  imgCard: ServiceBlock['imgWrapper']['imgCard1']
  count: number
}

const getClassName = (count: number) => {
  const rotations = {
    1: '-rotate-[10deg]',
    2: '-rotate-[5deg] pb-0 md:pb-[48px] z-2',
    3: 'rotate-[0deg] pb-0 md:pb-[96px] z-3',
    4: 'rotate-[5deg] pb-0 md:pb-[48px] z-2',
    5: 'rotate-[10deg]',
  }
  return rotations[count as keyof typeof rotations]
}

export const ImageCard: React.FC<ImageCardProps> = ({ imgCard, count }) => {
  return (
    <div
      className={cn(
        getClassName(count),
        'flex w-full justify-center md:justify-start md:items-end',
      )}
    >
      <div className="group w-full h-[200px] p-[8px] rounded-[16px] border border-white bg-nhal-bg-cream shadow-[0px_4px_8px_-4px_rgba(18,18,24,0.1),0px_12px_18px_-2px_rgba(18,18,24,0.05)]">
        <div className="relative w-full h-full rounded-[8px] overflow-hidden">
          <Media
            className="w-full h-full"
            pictureClassName="w-full h-full block"
            imgClassName="object-cover w-full h-full"
            resource={imgCard || null}
          />
          <div className="absolute inset-0 mix-blend-color bg-nhal-dark group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
