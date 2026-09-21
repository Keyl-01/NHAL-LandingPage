import type { Metadata } from 'next'
import React from 'react'

import './globals.css'
import { Background } from '@/components/Background'
import { getServerSideURL } from '@/utilities/getURL'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '@/utilities/siteMeta'

export const metadata: Metadata = {
  // Makes relative OG image URLs (e.g. /api/media/file/...) absolute
  metadataBase: new URL(getServerSideURL()),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main>
          <Background />
          {children}
        </main>
      </body>
    </html>
  )
}
