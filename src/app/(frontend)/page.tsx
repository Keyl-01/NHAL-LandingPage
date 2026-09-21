import type { Metadata } from 'next'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { draftMode } from 'next/headers'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getHome } from '@/utilities/getHome'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '@/utilities/siteMeta'

// import './styles.css'

// Render per request: content comes from the DB, which isn't reachable during `docker build`
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const { meta } = await getHome(draft)

  const title = meta?.title || DEFAULT_TITLE
  const description = meta?.description || DEFAULT_DESCRIPTION
  const image = meta?.image && typeof meta.image === 'object' ? meta.image : null
  const images = image?.url
    ? [
        {
          url: image.url,
          width: image.width ?? undefined,
          height: image.height ?? undefined,
          alt: image.alt || title,
        },
      ]
    : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      type: 'website',
      locale: 'vi_VN',
      url: '/',
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title,
      description,
      images,
    },
  }
}

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const data = await getHome(draft)

  return (
    <article className="home">
      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={data.layout} />
    </article>
  )
}
