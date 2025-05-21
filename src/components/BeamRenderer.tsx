'use client'

import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'

// ✅ Shader code inlined as raw strings (no plugin)
const vertexShader = `
  varying vec2 vUv;
  uniform float time;

  void main() {
    vUv = uv;
    vec3 pos = position;
    pos.y += sin(uv.y * 10.0 + time * 5.0) * 0.15;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform vec3 color;
  varying vec2 vUv;

  void main() {
    float intensity = pow(1.0 - abs(vUv.y - 0.5) * 2.0, 4.0);
    float pulse = 0.5 + 0.5 * sin(time * 5.0);
    gl_FragColor = vec4(color * intensity * pulse, 1.0);
  }
`

const BeamMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0x00ffff),
  },
  vertexShader,
  fragmentShader
)

extend({ BeamMaterial })

export function BeamRenderer() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime()
    }
  })

  const geometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.08, 0.08, 5, 64, 1, true)
  }, [])

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[0, 0, 0]}>
      <beamMaterial ref={materialRef} />
    </mesh>
  )
}

export default BeamRenderer