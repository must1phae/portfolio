import React from 'react'
import { motion } from 'framer-motion'
import ThreeScene from './ThreeScene'

export default function About(){
  return (
    <section id="about" className="mt-16 py-12">
      <div className="md:flex items-center gap-8">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold glow text-white">About</h2>
          <p className="mt-4 text-[#e6e6e6] leading-relaxed">
            I’m Mustapha El Ghazzal, a 19-year-old Computer Science student at the Higher School of Technology in Safi.
            I’m passionate about software development, web technologies, and machine learning. I enjoy building
            interactive frontends, 3D visualizations, and practical applications that solve real problems.
          </p>
          <p className="mt-3 text-[#e6e6e6]">Education: Higher School of Technology, Safi — Computer Science (ongoing)</p>
          <p className="mt-2 text-[#e6e6e6]">Languages & Tools: Python, Java, C, PHP, JavaScript, HTML/CSS</p>
        </motion.div>

        <motion.div
          className="md:w-1/2 mt-8 md:mt-0 h-80 rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ThreeScene />
        </motion.div>
      </div>
    </section>
  )
}
