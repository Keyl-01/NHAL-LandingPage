import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

// ---------------------------------------------------------------------------
// Shared field definitions
// ---------------------------------------------------------------------------

const IMAGE_CARD_COUNT = 5

/**
 * Generate a media upload field for a numbered image card.
 */
const imageCardField = (index: number): Field => ({
  name: `imgCard${index}`,
  type: 'upload',
  label: `Image Card ${index}`,
  relationTo: 'media',
  required: true,
})

const imageCardFields: Field[] = Array.from({ length: IMAGE_CARD_COUNT }, (_, i) =>
  imageCardField(i + 1),
)

// ---------------------------------------------------------------------------
// Block definition
// ---------------------------------------------------------------------------

export const Service: Block = {
  slug: 'service',
  interfaceName: 'ServiceBlock',
  labels: {
    singular: 'Service Section',
    plural: 'Service Sections',
  },
  fields: [
    {
      name: 'imgWrapper',
      type: 'group',
      label: 'Image Wrapper',
      fields: imageCardFields,
    },
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
      name: 'serviceCards',
      type: 'array',
      label: 'Service Cards',
      labels: {
        singular: 'Service Card',
        plural: 'Service Cards',
      },
      fields: [
        {
          name: 'cardIcon',
          type: 'upload',
          label: 'Card Icon',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'cardDescription',
          type: 'textarea',
          label: 'Card Description',
          required: true,
        },
        {
          name: 'isActive',
          type: 'checkbox',
          label: 'Is Active',
          defaultValue: false,
        },
      ],
    },
  ],
}
