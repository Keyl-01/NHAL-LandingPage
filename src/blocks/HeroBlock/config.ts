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
      name: 'anchorId',
      type: 'text',
      label: 'Anchor ID',
      admin: {
        placeholder: 'nhal-hero-section',
        description: 'Tự đặt một tên (viết liền, không dấu) để làm mốc cho phân cảnh này. Dùng tên này nhập vào Nav Flyout để trang cuộn tới đây. Nếu để trống, sẽ dùng mặc định: nhal-hero-section',
      },
    },
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
      name: 'heading',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: 'Heading',
    },
    {
      name: 'subHeading',
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
      label: 'Sub Heading',
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
    {
      name: 'heroStory',
      type: 'group',
      label: 'Hero Story',
      fields: [
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail',
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'Video URL (YouTube)',
        },
      ],
    },
    {
      name: 'sponsors',
      type: 'array',
      label: 'Sponsors',
      fields: [
        {
          name: 'sponsorLogo',
          type: 'upload',
          relationTo: 'media',
          label: 'Sponsor Logo',
        },
      ],
    },
  ],
}
