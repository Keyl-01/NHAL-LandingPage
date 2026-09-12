import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

// ---------------------------------------------------------------------------
// Shared field definitions
// ---------------------------------------------------------------------------

/**
 * Reusable field set for a single benefit card.
 * Both card slots share an identical shape — defined once to avoid duplication.
 */
const benefitCardFields: Field[] = [
  {
    name: 'icon',
    type: 'upload',
    label: 'Icon',
    relationTo: 'media',
    required: true,
  },
  {
    name: 'title',
    type: 'text',
    label: 'Title',
    required: true,
  },
  {
    name: 'description',
    type: 'text',
    label: 'Description',
    required: true,
  },
]

// ---------------------------------------------------------------------------
// Block definition
// ---------------------------------------------------------------------------

export const Benefit: Block = {
  slug: 'benefit',
  interfaceName: 'BenefitBlock',
  labels: {
    singular: 'Benefit Section',
    plural: 'Benefit Sections',
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
      name: 'benefitWrappers',
      type: 'array',
      label: 'Benefit Wrappers',
      fields: [
        {
          name: 'benefitCard1',
          type: 'group',
          label: 'Benefit Card 1',
          fields: benefitCardFields,
        },
        {
          name: 'benefitCard2',
          type: 'group',
          label: 'Benefit Card 2',
          fields: benefitCardFields,
        },
      ],
    },
  ],
}
