import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature, TextSizeFeature } from 'payload-lexical-typography'
import type { Block } from 'payload'

export const Methodology: Block = {
  slug: 'methodology',
  interfaceName: 'MethodologyBlock',
  labels: {
    singular: 'Methodology Section',
    plural: 'Methodology Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      label: 'Heading',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: 'Cover Image',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          TextColorFeature({
            colors: ['#121218', '#7e1225'],
            colorPicker: true,
          }),
          TextSizeFeature({
            customSize: true,
          }),
        ],
      }),
    },
  ],
}
