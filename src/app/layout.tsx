// src/app/layout.tsx
import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'Tex Dashboard',
  description: 'The most alive AGI dashboard ever created',
}

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-hidden">{children}</body>
    </html>
  )
}