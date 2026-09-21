import { Plugin } from 'payload'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { getServerSideURL } from '@/utilities/getURL'
import { DEFAULT_TITLE } from '@/utilities/siteMeta'

// The Home global has no title/slug field and lives at '/'
const generateTitle: GenerateTitle = () => DEFAULT_TITLE

const generateURL: GenerateURL = () => getServerSideURL()

export const plugins: Plugin[] = [
  seoPlugin({
    uploadsCollection: 'media',
    generateTitle,
    generateURL,
  }),
]
