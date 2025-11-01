import React from 'react'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section id="home" className="min-h-[70vh] flex items-center">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold glow text-white">
            Hi, I’m Mustapha El Ghazzal <span className="animate-wave">👋</span>
          </h1>
          <p className="mt-4 text-[#e6e6e6] max-w-xl leading-relaxed">
            I’m a 19-year-old Computer Science student at the Higher School of Technology in Safi, Morocco.
            Passionate about software development, web technologies, and machine learning.
            I work with Python, Java, C, PHP, JavaScript, and HTML/CSS.
          </p>

          <div className="mt-6 flex gap-4">
            <a href="#projects" className="inline-block bg-red-600 text-white px-5 py-2 rounded-lg font-semibold shadow-neon-lg">View Projects</a>
            <a href="/MUSTAPHA_CV.pdf" download className="inline-block border border-red-600 px-5 py-2 rounded-lg text-red-200 hover:text-white">Download CV</a>
            <a href="#contact" className="inline-block border border-slate-700 px-5 py-2 rounded-lg text-slate-300 hover:text-white">Contact</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-72 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-[#071025] to-[#120517] shadow-neon-lg"
        >
          {/* Decorative area for 3D scene — actually implemented in About section for full canvas */}
          <div className="w-full h-full flex items-center justify-center text-slate-400">Digital Avatar / 3D</div>
        </motion.div>
      </div>
    </section>
  )
}
