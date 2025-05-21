// src/app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'Tex Dashboard',
  description: 'The most alive AGI dashboard ever created',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-hidden">{children}</body>
    </html>
  )
}