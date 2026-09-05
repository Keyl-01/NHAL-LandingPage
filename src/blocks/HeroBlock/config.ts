import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'heroStats',
      type: 'group',
      label: 'Hero Stats',
      fields: [
        {
          name: 'count',
          type: 'text',
          label: 'Count',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'avatars',
          type: 'array',
          maxRows: 6,
          fields: [
            {
              name: 'avatar',
              type: 'upload',
              relationTo: 'media',
              label: 'Avatar',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'headline',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: 'Headline',
    },
    {
      name: 'subtitle',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Sub Title',
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA Button',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link',
        },
      ],
    },
  ],
}
