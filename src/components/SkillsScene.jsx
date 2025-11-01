import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three'

function svgToDataUrl(svg){
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function makeLogoSVG(text, bg, fg){
  return `
  <svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'>
    <rect width='100%' height='100%' fill='${bg}' rx='28' />
    <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='80' fill='${fg}'>${text}</text>
  </svg>`
}

function FloatingLogo({ texture, position, speed = 1 }){
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    if(ref.current){
      ref.current.position.y = position[1] + Math.sin(t) * 0.35
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.3
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[1.4,1.4]} />
      <meshStandardMaterial map={texture} transparent={true} />
    </mesh>
  )
}

export default function SkillsScene(){
  const [hoverInfo, setHoverInfo] = useState({ name: null, x: 0, y: 0 })
  
  const handleSkillClick = (skillName) => {
    // Scroll to projects section
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
    
    // Trigger project filtering via custom event
    const event = new CustomEvent('filterProjects', { 
      detail: { skill: skillName }
    })
    window.dispatchEvent(event)
  }

  const logos = useMemo(()=>[
    { id:'Python', label: 'Python', level: 'Advanced', svg: makeLogoSVG('Py','#3776AB','#FFFFFF') },
    { id:'Java', label: 'Java', level: 'Intermediate', svg: makeLogoSVG('Jv','#007396','#FFFFFF') },
    { id:'C', label: 'C', level: 'Intermediate', svg: makeLogoSVG('C','#004482','#FFFFFF') },
    { id:'PHP', label: 'PHP', level: 'Intermediate', svg: makeLogoSVG('PHP','#777BB4','#FFFFFF') },
    { id:'JS', label: 'JavaScript', level: 'Intermediate', svg: makeLogoSVG('JS','#F7DF1E','#000000') },
    { id:'HTML', label: 'HTML', level: 'Experienced', svg: makeLogoSVG('HT','#E34F26','#FFFFFF') },
    { id:'CSS', label: 'CSS', level: 'Experienced', svg: makeLogoSVG('CS','#1572B6','#FFFFFF') }
  ], [])

  const urls = logos.map(l => svgToDataUrl(l.svg))
  const textures = useLoader(TextureLoader, urls)

  const positions = [
    [-1.8,0.2,0],[-0.6,0.6,-0.4],[0.6,-0.2,0.3],[1.6,0.4,-0.2],[-0.2,-0.8,0.6],[0.9,0.9,0.2],[-1.1,-0.6,-0.5]
  ]
  // combine logos and textures
  const items = textures.map((tex, i) => ({ id: logos[i].id, label: logos[i].label, level: logos[i].level, texture: tex, position: positions[i], speed: 0.8 + i*0.05 }))

  return (
    <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden bg-transparent relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        {items.map((it, i) => (
          <FloatingLogoWithHover
            key={i}
            id={it.id}
            texture={it.texture}
            position={it.position}
            speed={it.speed}
            onHoverStart={(name, clientX, clientY) => setHoverInfo({ name: it.label, x: clientX, y: clientY, level: it.level })}
            onHoverMove={(clientX, clientY) => setHoverInfo(prev => ({ ...prev, x: clientX, y: clientY }))}
            onHoverEnd={() => setHoverInfo({ name: null, x: 0, y: 0 })}
          />
        ))}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={true} autoRotateSpeed={0.6} />
      </Canvas>

      {/* DOM tooltip overlay */}
      {hoverInfo.name && (
        <div className="pointer-events-none absolute z-50" style={{ left: hoverInfo.x + 12, top: hoverInfo.y + 12 }}>
          <div className="bg-black/80 text-white text-sm px-3 py-1 rounded-md border border-red-900">
            <div className="font-medium">{hoverInfo.name}</div>
            {hoverInfo.level && <div className="text-xs text-[#cfcfcf]">{hoverInfo.level}</div>}
          </div>
        </div>
      )}
    </div>
  )
}

function FloatingLogoWithHover({ id, texture, position, speed = 1, onHoverStart = ()=>{}, onHoverMove = ()=>{}, onHoverEnd = ()=>{} }){
  const ref = useRef()
  const hovered = useRef(false)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
      if(ref.current){
      // floating motion
      ref.current.position.y = position[1] + Math.sin(t) * 0.35
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.3
      // smooth scale toward target (manual lerp)
      const target = hovered.current ? 1.2 : 1.0
      ref.current.scale.x += (target - ref.current.scale.x) * 0.08
      ref.current.scale.y += (target - ref.current.scale.y) * 0.08
      ref.current.scale.z += (target - ref.current.scale.z) * 0.08
    }
  })

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={(e)=>{ e.stopPropagation(); hovered.current = true; document.body.style.cursor = 'pointer'; onHoverStart(id, e.clientX, e.clientY) }}
      onPointerMove={(e)=>{ e.stopPropagation(); onHoverMove(e.clientX, e.clientY) }}
      onPointerOut={(e)=>{ e.stopPropagation(); hovered.current = false; document.body.style.cursor = 'default'; onHoverEnd() }}
      onClick={(e)=>{ e.stopPropagation(); handleSkillClick(id) }}
    >
      <planeGeometry args={[1.4,1.4]} />
      <meshStandardMaterial map={texture} transparent={true} />
    </mesh>
  )
}
