import { Media } from '@/components/Media'
import type { HeroBlock } from '@/payload-types'

type HeroStoryProps = {
  thumbnail?: HeroBlock['heroStory']['thumbnail']
  videoUrl?: HeroBlock['heroStory']['videoUrl']
}

export const HeroStory: React.FC<HeroStoryProps> = ({ thumbnail, videoUrl }) => {
  return (
    <div className="group relative w-full h-[250px] md:h-[460px] lg:h-[620px] flex justify-center items-center bg-white rounded-[24px] p-1 cursor-pointer overflow-hidden">
      <Media
        className="relative w-full h-full"
        imgClassName="object-cover rounded-[20px] w-full h-full"
        resource={thumbnail}
      />

      <div className="absolute flex justify-center items-center p-[24px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white">
        <svg
          className="fill-[var(--nhal-gray,rgb(148,151,158))] group-hover:fill-[var(--nhal-dark)] transition-[fill] duration-200 inline-block shrink-0 select-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          focusable={false}
          width={24}
          height={24}
          aria-hidden="true"
        >
          <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
        </svg>
      </div>

      <div
        className="absolute opacity-20 pointer-events-none"
        style={{
          right: '-373px',
          bottom: '-373px',
          width: '960px',
          height: '900px',
          background:
            'radial-gradient(50% 50% at 50% 50%, var(--nhal-coral, rgb(255, 101, 36)) 0%, rgba(243, 131, 112, 0) 100%)',
        }}
      />
    </div>
  )
}
