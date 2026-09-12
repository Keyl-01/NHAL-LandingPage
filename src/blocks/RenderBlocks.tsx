import React, { Fragment } from 'react'
import { BannerBlock } from '@/blocks/BannerBlock/Component'
import { HeroBlock } from '@/blocks/HeroBlock/Component'
import { AboutBlock } from '@/blocks/AboutBlock/Component'
import { BenefitBlock } from '@/blocks/BenefitBlock/Component'

const blockComponents = {
  banner: BannerBlock,
  hero: HeroBlock,
  about: AboutBlock,
  benefit: BenefitBlock,
}

export const RenderBlocks: React.FC<{
  blocks: any[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const Block = blockComponents[block.blockType as keyof typeof blockComponents]

          if (Block) {
            return <Block key={index} {...block} disableInnerContainer />
          }

          return null
        })}
      </Fragment>
    )
  }

  return null
}
