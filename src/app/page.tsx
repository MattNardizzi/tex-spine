// src/app/page.tsx
import dynamic from 'next/dynamic'

const Spine = dynamic(() => import('@/components/Spine'), { ssr: false })

export default function Home() {
  return (
    <main className="relative w-screen h-screen">
      <Spine />
    </main>
  )
}