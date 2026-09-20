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
      name: 'anchorId',
      type: 'text',
      label: 'Anchor ID',
      admin: {
        placeholder: 'nhal-sponsors-section',
        description: 'Tự đặt một tên (viết liền, không dấu) để làm mốc cho phân cảnh này. Dùng tên này nhập vào Nav Flyout để trang cuộn tới đây. Nếu để trống, sẽ dùng mặc định: nhal-sponsors-section',
      },
    },
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
