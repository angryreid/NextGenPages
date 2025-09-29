import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dynamic SSG Site',
  description: 'Statically generated site from JSON configuration',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}