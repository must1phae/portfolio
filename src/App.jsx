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
      {/* Header responsive avec menu burger sur mobile */}
      <header className="fixed w-full z-30 top-0 left-0 px-4 sm:px-6 py-3 sm:py-4 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-white font-semibold text-sm sm:text-base">Mustapha El Ghazzal</div>
          <nav className="hidden sm:flex space-x-4 md:space-x-6">
            <a href="#about" className="text-sm text-[#cfcfcf] hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-sm text-[#cfcfcf] hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="text-sm text-[#cfcfcf] hover:text-white transition-colors">Skills</a>
            <a href="#contact" className="text-sm text-[#cfcfcf] hover:text-white transition-colors">Contact</a>
          </nav>
          {/* Menu mobile - simple version */}
          <nav className="flex sm:hidden space-x-3 text-xs">
            <a href="#about" className="text-[#cfcfcf] hover:text-white">About</a>
            <a href="#projects" className="text-[#cfcfcf] hover:text-white">Projects</a>
            <a href="#skills" className="text-[#cfcfcf] hover:text-white">Skills</a>
            <a href="#contact" className="text-[#cfcfcf] hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      {/* Social bar (fixed) rendered separately */}
      <div id="social-bar-placeholder" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-24">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <SocialBar />

      <footer className="text-center py-6 sm:py-8 text-xs sm:text-sm text-slate-500 px-4">
        © {new Date().getFullYear()} Itachi — Built with React, Three.js, Framer Motion
      </footer>
    </div>
  )
}
