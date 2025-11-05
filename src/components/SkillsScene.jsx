import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import ErrorBoundary from './ErrorBoundary'

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

  // Official brand logos using Simple Icons CDN rendered as DOM in 3D
  const logos = useMemo(()=>[
    { id:'Python', label: 'Python', level: 'Advanced', bg:'#3776AB', slug:'python', color:'ffffff' },
    { id:'Java', label: 'Java', level: 'Intermediate', bg:'#007396', slug:'java', color:'ffffff' },
    { id:'C', label: 'C', level: 'Intermediate', bg:'#27338e', slug:'c', color:'ffffff' },
    { id:'PHP', label: 'PHP', level: 'Intermediate', bg:'#777BB4', slug:'php', color:'ffffff' },
    { id:'JS', label: 'JavaScript', level: 'Intermediate', bg:'#F7DF1E', slug:'javascript', color:'000000' },
    { id:'HTML', label: 'HTML', level: 'Experienced', bg:'#E34F26', slug:'html5', color:'ffffff' },
    { id:'CSS', label: 'CSS', level: 'Experienced', bg:'#1572B6', slug:'css3', color:'ffffff' }
  ], [])

  const positions = [
    [-1.8,0.2,0],[-0.6,0.6,-0.4],[0.6,-0.2,0.3],[1.6,0.4,-0.2],[-0.2,-0.8,0.6],[0.9,0.9,0.2],[-1.1,-0.6,-0.5]
  ]
  // combine logos with positions
  const items = logos.map((l, i) => ({
    ...l,
    src: `https://cdn.simpleicons.org/${l.slug}/${l.color}`,
    fallbackSrc: `https://cdn.jsdelivr.net/npm/simple-icons/icons/${l.slug}.svg`,
    position: positions[i] || [0,0,0],
    speed: 0.8 + i*0.05
  }))

  return (
    <ErrorBoundary fallback={
      <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden bg-gradient-to-br from-[#071025] to-[#120517] p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {logos.map((logo) => (
            <div key={logo.id} className="p-4 rounded-lg border border-slate-700 bg-slate-800/50 flex flex-col items-center justify-center hover:border-red-900 transition-colors cursor-pointer"
                 onClick={() => handleSkillClick(logo.id)}>
              <div className="w-12 h-12 rounded-full mb-2" style={{ backgroundColor: logo.bg }}></div>
              <div className="text-sm text-slate-200 font-medium">{logo.label}</div>
              <div className="text-xs text-slate-400">{logo.level}</div>
            </div>
          ))}
        </div>
      </div>
    }>
      <div className="w-full h-80 md:h-96 rounded-lg overflow-hidden bg-transparent relative">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          {items.map((it) => (
            <FloatingLogoWithHover
              key={it.id}
              id={it.id}
              src={it.src}
              fallbackSrc={it.fallbackSrc}
              bg={it.bg}
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
    </ErrorBoundary>
  )
}

function FloatingLogoWithHover({ id, src, fallbackSrc, bg, position, speed = 1, onHoverStart = ()=>{}, onHoverMove = ()=>{}, onHoverEnd = ()=>{}, onClick = ()=>{} }){
  const ref = useRef()
  const hovered = useRef(false)
  const imgRef = useRef(null)
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
          {src ? (
            <img
              ref={imgRef}
              src={src}
              alt={id}
              width={58}
              height={58}
              referrerPolicy="no-referrer"
              style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))' }}
              onError={(e)=>{
                if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
                  e.currentTarget.src = fallbackSrc
                }
              }}
            />
          ) : null}
        </div>
      </Html>
    </mesh>
  )
}
