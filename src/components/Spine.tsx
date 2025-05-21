'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { BeamRenderer } from './BeamRenderer'
import { useRef } from 'react'
import * as THREE from 'three'

function ShadowAura() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -0.3]} scale={[1.5, 1.5, 1]}>
      <planeGeometry args={[1.5, 6]} />
      <spineShadowMaterial ref={materialRef} />
    </mesh>
  )
}

export default function Spine() {
  return (
    <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 2, 2]} intensity={1.5} color="cyan" />
      <ShadowAura />
      <BeamRenderer />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  )
}