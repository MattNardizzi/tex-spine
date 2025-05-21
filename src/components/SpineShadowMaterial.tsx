'use client'

import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import glsl from 'babel-plugin-glsl/macro'

// Shadow aura shader material
const SpineShadowMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0x00ffff),
    intensity: 0.5,
  },
  // Vertex Shader
  glsl`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment Shader
  glsl`
    uniform float time;
    uniform vec3 color;
    uniform float intensity;
    varying vec2 vUv;

    void main() {
      float dist = distance(vUv, vec2(0.5, 0.5));
      float glow = smoothstep(0.5, 0.1, dist);
      float pulse = 0.6 + 0.4 * sin(time * 4.0);
      gl_FragColor = vec4(color * glow * intensity * pulse, 0.9);
    }
  `
)

extend({ SpineShadowMaterial })