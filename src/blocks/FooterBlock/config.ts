import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { TextColorFeature, TextSizeFeature } from 'payload-lexical-typography'

export const Footer: Block = {
  slug: 'footer',
  interfaceName: 'FooterBlock',
  labels: {
    singular: 'Footer',
    plural: 'Footers',
  },
  fields: [
    {
      name: 'description',
      type: 'richText',
      label: 'Footer Description',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          TextColorFeature({
            colors: ['#121218'],
            colorPicker: true,
          }),
          TextSizeFeature({
            customSize: true,
          }),
        ],
      }),
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Social Network Name',
              required: true,
              admin: {
                width: '50%',
              },
            },
            {
              name: 'link',
              type: 'text',
              label: 'Social Network Link',
              required: true,
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Social Network Icon',
          required: true,
        },
      ],
    },
  ],
}
