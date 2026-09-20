import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const About: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },
  fields: [
    {
      name: 'simpleBadge',
      type: 'text',
      label: 'Simple Badge',
      required: true,
    },
    {
      name: 'content',
      type: 'group',
      label: 'Content',
      fields: [
        {
          name: 'heading',
          type: 'richText',
          label: 'Heading',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
        },
        {
          name: 'description1',
          type: 'textarea',
          label: 'Description 1',
        },
        {
          name: 'description2',
          type: 'textarea',
          label: 'Description 2',
        },
      ],
    },
    {
      name: 'aboutImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'About Image',
    },
  ],
}
