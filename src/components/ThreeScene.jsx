import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'

function FloatingCube({ position, color, speed = 1 }){
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    ref.current.rotation.x = Math.sin(t) * 0.4
    ref.current.rotation.y = Math.cos(t) * 0.6
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.35
  })
  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[1.2,1.2,1.2]} />
      <meshStandardMaterial emissive={color} color="#0f1724" metalness={0.6} roughness={0.1} />
    </mesh>
  )
}

export default function ThreeScene(){
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <FloatingCube position={[ -1.4, 0.2, 0 ]} color={[0.28,0.94,1]} speed={1} />
      <FloatingCube position={[ 1.2, -0.1, -0.4 ]} color={[0.61,0.35,1]} speed={1.2} />
      <FloatingCube position={[ 0, 0.6, 0.6 ]} color={[0.49,0.8,1]} speed={0.9} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.9} />
      <Html center style={{ pointerEvents: 'none' }}>
        {/* optional overlay */}
      </Html>
    </Canvas>
  )
}
