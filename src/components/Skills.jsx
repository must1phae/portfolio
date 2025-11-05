import React from 'react'
import SkillsScene from './SkillsScene'

export default function Skills(){
  return (
    <section id="skills" className="mt-16 sm:mt-20">
      <h2 className="text-xl sm:text-2xl font-semibold glow text-white">Skills</h2>
      <p className="mt-2 text-sm sm:text-base text-[#cfcfcf]">Some of the languages and technologies I study and use.</p>

      <div className="mt-6">
        {/* 3D floating logos / text */}
        <SkillsScene />
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:hidden">
        {/* fallback simple list for small screens */}
        <div className="p-2.5 sm:p-3 bg-[#0b0b0b] rounded-md border border-red-900 text-center text-xs sm:text-sm">Python</div>
        <div className="p-2.5 sm:p-3 bg-[#0b0b0b] rounded-md border border-red-900 text-center text-xs sm:text-sm">Java</div>
        <div className="p-2.5 sm:p-3 bg-[#0b0b0b] rounded-md border border-red-900 text-center text-xs sm:text-sm">C</div>
        <div className="p-2.5 sm:p-3 bg-[#0b0b0b] rounded-md border border-red-900 text-center text-xs sm:text-sm">PHP</div>
        <div className="p-2.5 sm:p-3 bg-[#0b0b0b] rounded-md border border-red-900 text-center text-xs sm:text-sm">JavaScript</div>
        <div className="p-2.5 sm:p-3 bg-[#0b0b0b] rounded-md border border-red-900 text-center text-xs sm:text-sm">HTML/CSS</div>
      </div>
    </section>
  )
}
