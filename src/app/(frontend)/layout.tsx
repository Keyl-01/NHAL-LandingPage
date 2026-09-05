import React from 'react'

import './globals.css'
import { Background } from '@/components/Background'

export const metadata = {
  title: 'Ngày Hội An Lạc - Healing Day',
  description:
    'Ngày Hội An Lạc - Healing Day được khởi xướng và tổ chức bởi TS Lê Nguyên Phương và cộng đồng học viên. Đây là chuỗi sự kiện hỗ trợ tâm lý miễn phí dành cho những người đang gặp các khó khăn về sức khỏe tinh thần.',
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
