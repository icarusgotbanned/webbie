import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Absolute Assistant — Local AI Desktop RPA',
  description: 'Your local AI that clicks, types and automates your desktop for you.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


