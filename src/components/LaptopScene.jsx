import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'

// Setup de développeur complet : moniteur + clavier + café + icônes tech
function DeveloperSetup({ position = [0, 0, 0] }) {
  const groupRef = useRef()
  
  // Animation de rotation douce
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Bureau / Base */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#3d2f1f" roughness={0.8} />
      </mesh>
      
      {/* Moniteur - Pied */}
      <mesh position={[0, -0.2, -0.3]}>
        <cylinderGeometry args={[0.05, 0.08, 0.4, 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Moniteur - Écran cadre */}
      <mesh position={[0, 0.3, -0.35]}>
        <boxGeometry args={[1.8, 1.1, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Moniteur - Écran actif (bleu VS Code) */}
      <mesh position={[0, 0.3, -0.31]}>
        <boxGeometry args={[1.7, 1, 0.01]} />
        <meshStandardMaterial 
          color="#1e1e1e" 
          emissive="#007acc" 
          emissiveIntensity={0.4} 
        />
      </mesh>
      
      {/* Code à l'écran - Ligne 1 */}
      <mesh position={[-0.5, 0.5, -0.30]}>
        <boxGeometry args={[0.6, 0.06, 0.01]} />
        <meshStandardMaterial color="#4ec9b0" emissive="#4ec9b0" emissiveIntensity={0.8} />
      </mesh>
      
      {/* Code à l'écran - Ligne 2 */}
      <mesh position={[-0.4, 0.38, -0.30]}>
        <boxGeometry args={[0.8, 0.06, 0.01]} />
        <meshStandardMaterial color="#dcdcaa" emissive="#dcdcaa" emissiveIntensity={0.8} />
      </mesh>
      
      {/* Code à l'écran - Ligne 3 */}
      <mesh position={[-0.3, 0.26, -0.30]}>
        <boxGeometry args={[0.5, 0.06, 0.01]} />
        <meshStandardMaterial color="#ce9178" emissive="#ce9178" emissiveIntensity={0.8} />
      </mesh>

      {/* Clavier */}
      <mesh position={[0, -0.52, 0.4]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[1.2, 0.05, 0.4]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Touches de clavier (effet) */}
      <mesh position={[0, -0.49, 0.4]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[1.1, 0.02, 0.35]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Souris */}
      <mesh position={[0.7, -0.51, 0.3]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.15, 0.04, 0.2]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Tasse de café */}
      <group position={[-0.8, -0.5, 0.2]}>
        {/* Corps de la tasse */}
        <mesh>
          <cylinderGeometry args={[0.08, 0.1, 0.15, 32]} />
          <meshStandardMaterial color="#8b4513" roughness={0.6} />
        </mesh>
        {/* Anse */}
        <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.06, 0.015, 16, 32]} />
          <meshStandardMaterial color="#8b4513" roughness={0.6} />
        </mesh>
        {/* Café à l'intérieur */}
        <mesh position={[0, 0.06, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.02, 32]} />
          <meshStandardMaterial color="#1a0f0a" emissive="#3d2817" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Icône flottante - React (bleu) */}
      <FloatingIcon position={[-1, 0.8, 0.2]} color="#61dafb" />
      
      {/* Icône flottante - Python (jaune/bleu) */}
      <FloatingIcon position={[1, 0.6, 0]} color="#ffd43b" delay={1} />
      
      {/* Icône flottante - JS (jaune) */}
      <FloatingIcon position={[0.5, 1, -0.5]} color="#f7df1e" delay={2} />
    </group>
  )
}

// Icône tech flottante
function FloatingIcon({ position, color, delay = 0 }) {
  const iconRef = useRef()
  
  useFrame(({ clock }) => {
    if (iconRef.current) {
      const t = clock.getElapsedTime() + delay
      iconRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.15
      iconRef.current.rotation.y = t * 0.5
    }
  })
  
  return (
    <mesh ref={iconRef} position={position}>
      <boxGeometry args={[0.15, 0.15, 0.15]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.5}
        metalness={0.3}
        roughness={0.4}
      />
    </mesh>
  )
}

// Ombres portées (shadows)
function Shadows() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <shadowMaterial opacity={0.2} />
    </mesh>
  )
}

export default function LaptopScene(){
  return (
    <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center">
      <Canvas 
        camera={{ position: [0, 1.5, 3.5], fov: 50 }} 
        shadows
        dpr={[1, 2]}
      >
        {/* Lumières améliorées pour mieux éclairer */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[3, 5, 2]} 
          intensity={1.2} 
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-2, 2, 2]} intensity={0.8} color="#60a5fa" />
        <pointLight position={[2, 1, 1]} intensity={0.5} color="#a78bfa" />
        
        {/* Setup de développeur 3D */}
        <DeveloperSetup position={[0, 0, 0]} />
        
        {/* Ombres */}
        <Shadows />
        
        {/* Contrôles */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.4}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  )
}
