import React, { useState } from 'react'

export default function Contact(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // placeholder — in real site, wire to API / Netlify functions
    setSent(true)
    setTimeout(()=>{ setName(''); setEmail(''); setMessage('') }, 600)
  }

  return (
    <section id="contact" className="mt-16 sm:mt-20">
      <h2 className="text-xl sm:text-2xl font-semibold glow">Contact</h2>
      <p className="mt-3 text-sm sm:text-base text-[#e6e6e6]">Have a project in mind or want to collaborate? Drop a message.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 max-w-full sm:max-w-lg">
        <input 
          className="bg-[#0b0b0b] p-3 rounded-md border border-red-900 text-[#e6e6e6] text-sm sm:text-base focus:outline-none focus:border-red-600 transition-colors" 
          placeholder="Your name" 
          value={name} 
          onChange={e=>setName(e.target.value)} 
        />
        <input 
          className="bg-[#0b0b0b] p-3 rounded-md border border-red-900 text-[#e6e6e6] text-sm sm:text-base focus:outline-none focus:border-red-600 transition-colors" 
          placeholder="Your email" 
          type="email"
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
        />
        <textarea 
          className="bg-[#0b0b0b] p-3 rounded-md border border-red-900 text-[#e6e6e6] h-32 text-sm sm:text-base focus:outline-none focus:border-red-600 transition-colors resize-none" 
          placeholder="Message" 
          value={message} 
          onChange={e=>setMessage(e.target.value)} 
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          <button 
            type="submit" 
            className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-red-600 text-white font-semibold shadow-neon-lg hover:bg-red-700 transition-colors"
          >
            {sent ? 'Sent ✓' : 'Send Message'}
          </button>
          <span className="text-xs sm:text-sm text-slate-400">Or email: itachi@example.com</span>
        </div>
      </form>
    </section>
  )
}
