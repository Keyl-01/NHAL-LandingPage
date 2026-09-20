import type { Block } from 'payload'

export const Banner: Block = {
  slug: 'banner',
  interfaceName: 'BannerBlock',
  labels: {
    singular: 'Banner Section',
    plural: 'Banner Sections',
  },
  fields: [
    {
      name: 'anchorId',
      type: 'text',
      label: 'Anchor ID',
      admin: {
        placeholder: 'nhal-banner-section',
        description: 'Tự đặt một tên (viết liền, không dấu) để làm mốc cho phân cảnh này. Dùng tên này nhập vào Nav Flyout để trang cuộn tới đây. Nếu để trống, sẽ dùng mặc định: nhal-banner-section',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Banner Image',
    },
    {
      name: 'href',
      type: 'text',
      label: 'Link',
    },
  ],
}
