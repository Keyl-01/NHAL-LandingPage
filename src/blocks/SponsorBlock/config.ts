import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { TextColorFeature, TextSizeFeature } from 'payload-lexical-typography'

export const Sponsor: Block = {
  slug: 'sponsor',
  interfaceName: 'SponsorBlock',
  labels: {
    singular: 'Sponsor Section',
    plural: 'Sponsor Sections',
  },
  fields: [
    {
      name: 'sponsors',
      type: 'array',
      label: 'Sponsors',
      minRows: 1,
      fields: [
        {
          name: 'heading',
          type: 'richText',
          label: 'Sponsor Name (Heading)',
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
          name: 'description',
          type: 'richText',
          label: 'Sponsor Description',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
              TextColorFeature({
                colors: ['#000000', '#121218'],
                colorPicker: true,
              }),
              TextSizeFeature({
                customSize: true,
              }),
            ],
          }),
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Sponsor Logo',
          required: true,
        },
      ],
    },
  ],
}
