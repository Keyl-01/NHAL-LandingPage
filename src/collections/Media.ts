import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import {
  captureOriginalUpload,
  keepOriginalFilesize,
  restoreOriginalUpload,
} from '@/hooks/preserveOriginalUpload'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    read: () => true,
  },
  hooks: {
    beforeOperation: [captureOriginalUpload],
    beforeChange: [keepOriginalFilesize],
    afterChange: [restoreOriginalUpload],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      // required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // MEDIA_DIR is set in the Docker image (mounted as a volume); local dev falls back to public/media
    staticDir: process.env.MEDIA_DIR || path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
}
