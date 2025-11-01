import React from 'react'
import { SiGithub, SiLinkedin } from 'react-icons/si'

export default function SocialBar(){
  return (
    <div className="fixed right-4 top-1/3 z-40 flex flex-col gap-4">
      <a href="https://github.com/must1phae" target="_blank" rel="noreferrer" className="p-2 bg-[#0b0b0b] rounded-md border border-red-900 text-red-400 hover:text-white" aria-label="GitHub">
        <SiGithub size={20} />
      </a>
      <a href="https://www.linkedin.com/in/mustapha-el-ghazzal-91b4a6342" target="_blank" rel="noreferrer" className="p-2 bg-[#0b0b0b] rounded-md border border-red-900 text-red-400 hover:text-white" aria-label="LinkedIn">
        <SiLinkedin size={20} />
      </a>
    </div>
  )
}
