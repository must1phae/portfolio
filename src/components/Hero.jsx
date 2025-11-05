import React from 'react'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section id="home" className="min-h-[70vh] flex items-center px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold glow text-white leading-tight">
            Hi, I’m Mustapha El Ghazzal <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#e6e6e6] max-w-xl leading-relaxed">
            I’m a 19-year-old Computer Science student at the Higher School of Technology in Safi, Morocco.
            Passionate about software development, web technologies, and machine learning.
            I work with Python, Java, C, PHP, JavaScript, and HTML/CSS.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href="#projects" className="inline-block text-center bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-neon-lg hover:bg-red-700 transition-colors">View Projects</a>
            <a href={`${import.meta.env.BASE_URL}MUSTAPHA_CV.pdf`} download className="inline-block text-center border border-red-600 px-5 py-2.5 rounded-lg text-red-200 hover:text-white hover:bg-red-600/10 transition-colors">Download CV</a>
            <a href="#contact" className="inline-block text-center border border-slate-700 px-5 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/20 transition-colors">Contact</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative order-first md:order-last w-full h-64 sm:h-72 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-[#071025] to-[#120517] shadow-neon-lg flex items-center justify-center"
        >
          {/* Developer avatar (local SVG) */}
          <motion.img
            src={`${import.meta.env.BASE_URL}avatar.svg`}
            alt="Mustapha — developer avatar"
            className="w-40 sm:w-48 md:w-60 drop-shadow-[0_10px_25px_rgba(0,0,0,0.45)]"
            initial={{ y: 0, opacity: 0.95 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="pointer-events-none absolute -z-0 w-72 h-72 md:w-96 md:h-96 rounded-full bg-red-500/10 blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  )
}
