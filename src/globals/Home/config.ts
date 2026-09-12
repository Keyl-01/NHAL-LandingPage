import type { GlobalConfig } from 'payload'
import { Banner } from '@/blocks/BannerBlock/config'
import { Hero } from '@/blocks/HeroBlock/config'
import { About } from '@/blocks/AboutBlock/config'
import { Benefit } from '@/blocks/BenefitBlock/config'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home',
  admin: {
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: 'home',
          global: 'home',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: 'home',
        global: 'home',
        req,
      }),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [Banner, Hero, About, Benefit],
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
  },
}
