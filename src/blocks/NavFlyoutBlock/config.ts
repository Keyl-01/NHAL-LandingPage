import type { Block } from 'payload'

export const NavFlyout: Block = {
  slug: 'nav-flyout',
  interfaceName: 'NavFlyoutBlock',
  labels: {
    singular: 'Navigation Flyout',
    plural: 'Navigation Flyouts',
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Navigation Items',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Component Name',
          required: true,
        },
        {
          name: 'targetAnchor',
          type: 'text',
          label: 'Target Anchor ID',
          required: true,
          admin: {
            description: 'Nhập chính xác Anchor ID của phân cảnh mà bạn muốn màn hình tự động cuộn tới khi click (ví dụ: nhal-hero-section)',
          },
        },
      ],
    },
  ],
}
