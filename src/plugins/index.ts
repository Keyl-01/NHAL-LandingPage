import { Plugin } from 'payload'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<any> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Ngày Hội An Lạc` : 'Ngày Hội An Lạc'
}

const generateURL: GenerateURL<any> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    uploadsCollection: 'media',
    generateTitle,
    generateURL,
  }),
]
