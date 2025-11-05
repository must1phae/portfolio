import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, Float, ContactShadows, Html } from '@react-three/drei'

function LaptopModel(props){
  // Lightweight MacBook model hosted publicly (used in R3F examples)
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/assets/30/macbook/model.gltf')
  return <primitive object={scene} {...props} />
}

export default function LaptopScene(){
  return (
    <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden bg-transparent">
      <Canvas camera={{ position: [0, 0.6, 2.6], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 2]} intensity={0.8} />
        <Suspense fallback={<Html center className="text-slate-300">Loading 3D…</Html>}>
          <Environment preset="city" />
          <Float speed={1} rotationIntensity={0.4} floatIntensity={0.8}>
            <LaptopModel position={[0, -0.5, 0]} scale={0.6} />
          </Float>
          <ContactShadows position={[0, -0.95, 0]} opacity={0.35} scale={8} blur={2.5} far={4} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  )
}

// Preload the model for snappier UX
useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/assets/30/macbook/model.gltf')
