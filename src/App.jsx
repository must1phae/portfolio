import React from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import SocialBar from './components/SocialBar'

export default function App(){
  return (
    <div className="min-h-screen text-slate-100 antialiased">
      <header className="fixed w-full z-30 top-4 left-0 px-6 flex justify-between items-center">
        <div className="pl-2 text-white font-semibold">Mustapha El Ghazzal</div>
        <nav className="space-x-4">
          <a href="#about" className="text-sm text-[#cfcfcf] hover:text-white">About</a>
          <a href="#projects" className="text-sm text-[#cfcfcf] hover:text-white">Projects</a>
          <a href="#skills" className="text-sm text-[#cfcfcf] hover:text-white">Skills</a>
          <a href="#contact" className="text-sm text-[#cfcfcf] hover:text-white">Contact</a>
        </nav>
      </header>

      {/* Social bar (fixed) rendered separately */}
      <div id="social-bar-placeholder" />

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-24">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <SocialBar />

      <footer className="text-center py-8 text-sm text-slate-500">
        © {new Date().getFullYear()} Itachi — Built with React, Three.js, Framer Motion
      </footer>
    </div>
  )
}
