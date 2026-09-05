import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@/components/ui/avatar'
import type { HeroBlock } from '@/payload-types'
import styles from './index.module.scss'

type HeroStatProps = {
  count?: HeroBlock['heroStats']['count']
  label?: HeroBlock['heroStats']['label']
  avatars?: HeroBlock['heroStats']['avatars']
}

export const HeroStat: React.FC<HeroStatProps> = ({ count, label, avatars }) => {
  return (
    <div className="flex w-fit gap-2 items-center bg-white p-0.5 pl-2.5 rounded-full border border-nhal-border-color">
      <div className="flex gap-[3px] text-[14px] leading-4 font-medium font-backquote">
        <span className={styles.count}>{count}</span>
        <span className="text-nhal-dark">{label}</span>
      </div>
      <AvatarGroup>
        {avatars?.map((avatar, index) => (
          <Avatar
            key={index}
            className="size-[18px]"
            style={
              {
                '--tw-ring-offset-width': '-1px',
                '--spacing': '2px',
              } as React.CSSProperties
            }
          >
            {avatar.avatar && typeof avatar.avatar === 'object' && (
              <>
                <AvatarImage src={avatar.avatar.url || ''} alt={avatar.avatar.alt || ''} />
                <AvatarFallback>{avatar.avatar.alt}</AvatarFallback>
              </>
            )}
          </Avatar>
        ))}
      </AvatarGroup>
    </div>
  )
}
