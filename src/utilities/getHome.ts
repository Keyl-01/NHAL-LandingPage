import { getPayload } from 'payload'
import { cache } from 'react'

import configPromise from '@payload-config'

// Deduped per request so the page and generateMetadata share a single query
export const getHome = cache(async (draft: boolean) => {
  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({ slug: 'home', draft })
})
