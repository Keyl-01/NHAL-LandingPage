import { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { PayloadRequest, CollectionSlug, GlobalSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {}
const globalPathMap: Partial<Record<GlobalSlug, string>> = {
  home: '/',
}

type Props = {
  collection?: keyof typeof collectionPrefixMap
  global?: keyof typeof globalPathMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, global, slug }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  let path: string

  if (global) {
    // For globals, use the mapped path directly (e.g., 'home' → '/')
    path = globalPathMap[global] || `/${slug}`
  } else if (collection) {
    // For collections, concatenate prefix + slug
    const encodedSlug = encodeURIComponent(slug)
    path = `${collectionPrefixMap[collection] || ''}/${encodedSlug}`
  } else {
    path = `/${encodeURIComponent(slug)}`
  }

  const encodedParams = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
