import React from 'react'
import SkillsScene from './SkillsScene'

export default function Skills(){
  return (
    <section id="skills" className="mt-20">
      <h2 className="text-2xl font-semibold glow text-white">Skills</h2>
      <p className="mt-2 text-[#cfcfcf]">Some of the languages and technologies I study and use.</p>

      <div className="mt-6">
        {/* 3D floating logos / text */}
        <SkillsScene />
      </div>

      <div className="mt-6 md:hidden grid grid-cols-3 gap-3">
        {/* fallback simple list for small screens */}
        <div className="p-3 bg-[#0b0b0b] rounded-md border border-red-900 text-center">Python</div>
        <div className="p-3 bg-[#0b0b0b] rounded-md border border-red-900 text-center">Java</div>
        <div className="p-3 bg-[#0b0b0b] rounded-md border border-red-900 text-center">C</div>
        <div className="p-3 bg-[#0b0b0b] rounded-md border border-red-900 text-center">PHP</div>
        <div className="p-3 bg-[#0b0b0b] rounded-md border border-red-900 text-center">JavaScript</div>
        <div className="p-3 bg-[#0b0b0b] rounded-md border border-red-900 text-center">HTML/CSS</div>
      </div>
    </section>
  )
}
