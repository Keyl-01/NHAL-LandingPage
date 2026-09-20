import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature, TextSizeFeature } from 'payload-lexical-typography'
import type { Block } from 'payload'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  labels: {
    singular: 'Archive Section',
    plural: 'Archive Sections',
  },
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      label: 'Anchor ID',
      admin: {
        placeholder: 'nhal-archive-section',
        description: 'Tự đặt một tên (viết liền, không dấu) để làm mốc cho phân cảnh này. Dùng tên này nhập vào Nav Flyout để trang cuộn tới đây. Nếu để trống, sẽ dùng mặc định: nhal-archive-section',
      },
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
            colors: ['#000000', '#6e1313'],
            colorPicker: true,
          }),
          TextSizeFeature({
            customSize: true,
          }),
        ],
      }),
    },
    {
      name: 'importantDescription',
      type: 'richText',
      label: 'Important Description',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          TextColorFeature({
            colors: ['#ffffff', '#000000', '#fbda8a'],
            colorPicker: true,
          }),
          TextSizeFeature({
            customSize: true,
          }),
        ],
      }),
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
