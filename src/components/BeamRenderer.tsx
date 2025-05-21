'use client'

import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import glsl from 'babel-plugin-glsl/macro'
import { extend } from '@react-three/fiber'

// Beam shader material
const BeamMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0x00ffff),
  },
  // Vertex Shader
  glsl`
    uniform float time;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.y += sin(uv.y * 10.0 + time * 5.0) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  glsl`
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;

    void main() {
      float intensity = pow(1.0 - abs(vUv.y - 0.5) * 2.0, 3.0);
      float pulse = 0.5 + 0.5 * sin(time * 5.0);
      gl_FragColor = vec4(color * intensity * pulse, 1.0);
    }
  `
)

extend({ BeamMaterial })

export function BeamRenderer() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>()

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime()
    }
  })

  const geometry = useMemo(() => {
    const height = 5
    const radius = 0.1
    return new THREE.CylinderGeometry(radius, radius, height, 32, 1, true)
  }, [])

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[0, 0, 0]}>
      <beamMaterial ref={materialRef} color={new THREE.Color(0x00ffff)} />
    </mesh>
  )
}

export default BeamRenderer