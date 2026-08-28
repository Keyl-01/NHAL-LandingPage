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
      <body>
        <main>
          <Background />
          {children}
        </main>
      </body>
    </html>
  )
}
