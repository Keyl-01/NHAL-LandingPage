import type { Metadata } from 'next'
import { Allura, Inter } from 'next/font/google'
import React from 'react'

import './globals.css'
import { Background } from '@/components/Background'
import { getServerSideURL } from '@/utilities/getURL'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '@/utilities/siteMeta'

// Self-hosted and preloaded by Next; exposed as CSS variables used in globals.css
const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-inter',
  display: 'swap',
})

const allura = Allura({
  weight: '400',
  subsets: ['latin', 'vietnamese'],
  variable: '--font-allura',
  display: 'swap',
})

export const metadata: Metadata = {
  // Makes relative OG image URLs (e.g. /api/media/file/...) absolute
  metadataBase: new URL(getServerSideURL()),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: [
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-192x192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180' },
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="vi" className={`${inter.variable} ${allura.variable}`}>
      <body>
        <main>
          <Background />
          {children}
        </main>
      </body>
    </html>
  )
}
