import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const allProjects = [
  { id:1, title: 'AutoLoc', desc: 'Full-stack car rental management platform', tags: ['Full-Stack','JavaScript','PHP'], github: '#', live: '#'} ,
  { id:2, title: 'FastFood Store', desc: 'Online ordering system for fast-food restaurants', tags: ['React','Node'], github: '#', live: '#'},
  { id:3, title: 'Portfolio Website', desc: 'Personal website to display skills and works', tags: ['React','HTML','CSS'], github: '#', live: '#'},
  { id:4, title: 'Gaming Store Website', desc: 'Platform for buying digital games', tags: ['E-commerce','JavaScript','PHP'], github: '#', live: '#'}
]

const skillToTags = {
  'Python': ['Python'],
  'Java': ['Java'],
  'C': ['C'],
  'PHP': ['PHP'],
  'JS': ['JavaScript', 'React', 'Node'],
  'HTML': ['HTML'],
  'CSS': ['CSS']
}

export default function Projects(){
  const [projects, setProjects] = useState(allProjects)
  const [activeFilter, setActiveFilter] = useState(null)

  useEffect(() => {
    const handleFilter = (e) => {
      const skill = e.detail.skill
      setActiveFilter(skill)
      
      if (!skill) {
        setProjects(allProjects)
        return
      }

      const relevantTags = skillToTags[skill] || []
      const filtered = allProjects.filter(project => 
        project.tags.some(tag => relevantTags.includes(tag))
      )
      setProjects(filtered)
    }

    window.addEventListener('filterProjects', handleFilter)
    return () => window.removeEventListener('filterProjects', handleFilter)
  }, [])
  return (
    <section id="projects" className="mt-20">
      <h2 className="text-2xl font-semibold glow">Projects {activeFilter && 
        <span className="text-lg font-normal text-red-400 ml-2">
          filtered by {activeFilter}
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('filterProjects', { detail: { skill: null } }))}
            className="ml-2 text-sm text-slate-400 hover:text-white"
          >
            (clear)
          </button>
        </span>
      }</h2>
      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {projects.map(p => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="block bg-[#0b0b0b] p-5 rounded-xl border border-red-900 shadow-neon-lg transform-gpu"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg text-white">{p.title}</h3>
                <div className="flex items-center gap-3">
                  <a href={p.github} target="_blank" rel="noreferrer" className="text-red-400 hover:text-white">Github</a>
                  <a href={p.live} target="_blank" rel="noreferrer" className="text-red-400 hover:text-white">Live</a>
                </div>
              </div>
              <p className="mt-2 text-[#e6e6e6] text-sm">{p.desc}</p>
              <div className="mt-4 flex gap-2 text-xs text-[#e6e6e6]">
                {p.tags.map(t => <span key={t} className="px-2 py-1 bg-[#111] rounded-md border border-red-900">{t}</span>)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
