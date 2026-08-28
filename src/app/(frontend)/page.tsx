import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'

// import './styles.css'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const data = await payload.findGlobal({ slug: 'home', draft })

  return (
    <article className="home">
      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={data.layout} />
    </article>
  )
}
