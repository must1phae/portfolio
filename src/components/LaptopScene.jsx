import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, ContactShadows, Html, MeshDistortMaterial, Sphere } from '@react-three/drei'

// Portfolio-themed 3D scene with code symbols
function CodeSymbol({ position, symbol, color }) {
  const ref = useRef()
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
    </Float>
  )
}

// Central sphere representing portfolio/development
function CentralSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <Sphere args={[1, 64, 64]} scale={0.8}>
        <MeshDistortMaterial
          color="#e11d48"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

export default function LaptopScene(){
  return (
    <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden bg-transparent">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 2]} intensity={0.8} />
        <spotLight position={[-3, 3, 3]} angle={0.3} penumbra={1} intensity={0.5} castShadow />
        
        <Suspense fallback={<Html center className="text-slate-300">Loading 3D…</Html>}>
          <CentralSphere />
          
          {/* Code symbols orbiting around */}
          <CodeSymbol position={[2, 0.5, 0]} symbol="</>" color="#3776AB" />
          <CodeSymbol position={[-2, -0.5, 0]} symbol="{}" color="#F7DF1E" />
          <CodeSymbol position={[0, 1.5, -1]} symbol="<>" color="#E34F26" />
          <CodeSymbol position={[-1.5, -1, 1]} symbol="[]" color="#1572B6" />
          
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        </Suspense>
        
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  )
}
