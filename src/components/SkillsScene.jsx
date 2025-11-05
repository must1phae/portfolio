import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { 
  SiPython,
  SiJava,
  SiC,
  SiPhp,
  SiJavascript,
  SiHtml5,
  SiCss3
} from 'react-icons/si'

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

  // Official brand logos using react-icons (Simple Icons) rendered as DOM in 3D
  const logos = useMemo(()=>[
    { id:'Python', label: 'Python', level: 'Advanced', Icon: SiPython, bg:'#3776AB', color:'#ffffff' },
    { id:'Java', label: 'Java', level: 'Intermediate', Icon: SiJava, bg:'#007396', color:'#ffffff' },
    { id:'C', label: 'C', level: 'Intermediate', Icon: SiC, bg:'#27338e', color:'#ffffff' },
    { id:'PHP', label: 'PHP', level: 'Intermediate', Icon: SiPhp, bg:'#777BB4', color:'#ffffff' },
    { id:'JS', label: 'JavaScript', level: 'Intermediate', Icon: SiJavascript, bg:'#F7DF1E', color:'#000000' },
    { id:'HTML', label: 'HTML', level: 'Experienced', Icon: SiHtml5, bg:'#E34F26', color:'#ffffff' },
    { id:'CSS', label: 'CSS', level: 'Experienced', Icon: SiCss3, bg:'#1572B6', color:'#ffffff' }
  ], [])

  const positions = [
    [-1.8,0.2,0],[-0.6,0.6,-0.4],[0.6,-0.2,0.3],[1.6,0.4,-0.2],[-0.2,-0.8,0.6],[0.9,0.9,0.2],[-1.1,-0.6,-0.5]
  ]
  // combine logos with positions
  const items = logos.map((l, i) => ({
    ...l,
    position: positions[i] || [0,0,0],
    speed: 0.8 + i*0.05
  }))

  return (
    <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden bg-transparent relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        {items.map((it, i) => (
          <FloatingLogoWithHover
            key={i}
            id={it.id}
            Icon={it.Icon}
            bg={it.bg}
            color={it.color}
            position={it.position}
            speed={it.speed}
            onHoverStart={(name, clientX, clientY) => setHoverInfo({ name: it.label, x: clientX, y: clientY, level: it.level })}
            onHoverMove={(clientX, clientY) => setHoverInfo(prev => ({ ...prev, x: clientX, y: clientY }))}
            onHoverEnd={() => setHoverInfo({ name: null, x: 0, y: 0 })}
            onClick={()=>handleSkillClick(it.id)}
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

function FloatingLogoWithHover({ id, Icon, bg, color, position, speed = 1, onHoverStart = ()=>{}, onHoverMove = ()=>{}, onHoverEnd = ()=>{}, onClick = ()=>{} }){
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
      onClick={(e)=>{ e.stopPropagation(); onClick(id) }}
    >
      {/* invisible plane for raycasting / hover */}
      <planeGeometry args={[1.5,1.5]} />
      <meshBasicMaterial transparent opacity={0} />
      {/* DOM icon rendered in 3D space */}
      <Html center transform>
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 20,
            background: bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 24px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.06)'
          }}
        >
          {Icon ? <Icon size={58} color={color} /> : null}
        </div>
      </Html>
    </mesh>
  )
}
