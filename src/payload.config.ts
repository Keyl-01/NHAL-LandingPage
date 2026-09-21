import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Home } from './globals/Home/config'
import { plugins } from './plugins'
import { defaultLexical } from './fields/defaultLexical'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 810,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1200,
          height: 900,
        },
      ],
    },
  },
  onInit: async (payload) => {
    const { PAYLOAD_ADMIN_EMAIL, PAYLOAD_ADMIN_PASSWORD, PAYLOAD_ADMIN_NAME } = process.env

    if (PAYLOAD_ADMIN_EMAIL && PAYLOAD_ADMIN_PASSWORD) {
      const existingUsers = await payload.find({
        collection: 'users',
        limit: 1,
      })

      if (existingUsers.totalDocs === 0) {
        await payload.create({
          collection: 'users',
          data: {
            email: PAYLOAD_ADMIN_EMAIL,
            password: PAYLOAD_ADMIN_PASSWORD,
            name: PAYLOAD_ADMIN_NAME || 'Admin',
          },
        })
        payload.logger.info(`✨ Default admin user created successfully: ${PAYLOAD_ADMIN_EMAIL}`)
      }
    }
  },
  collections: [Users, Media],
  globals: [Home],
  plugins,
  editor: defaultLexical,
  // Without SMTP_HOST, Payload falls back to logging emails to the console
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_FROM_ADDRESS || '',
        defaultFromName: process.env.SMTP_FROM_NAME || 'Ngày Hội An Lạc',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          // 465 uses implicit TLS; 587 upgrades via STARTTLS
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
      })
    : undefined,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Schema push only runs in dev; in production (NODE_ENV=production) pending
    // migrations are applied automatically when the server boots.
    prodMigrations: migrations,
  }),
  sharp,
})
