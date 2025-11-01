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
    <section id="contact" className="mt-20">
      <h2 className="text-2xl font-semibold glow">Contact</h2>
  <p className="mt-3 text-[#e6e6e6]">Have a project in mind or want to collaborate? Drop a message.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 max-w-lg">
  <input className="bg-[#0b0b0b] p-3 rounded-md border border-red-900 text-[#e6e6e6]" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
  <input className="bg-[#0b0b0b] p-3 rounded-md border border-red-900 text-[#e6e6e6]" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} />
  <textarea className="bg-[#0b0b0b] p-3 rounded-md border border-red-900 text-[#e6e6e6] h-32" placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} />

        <div className="flex items-center gap-4">
          <button type="submit" className="px-5 py-2 rounded-md bg-red-600 text-white font-semibold shadow-neon-lg">
            {sent ? 'Sent ✓' : 'Send Message'}
          </button>
          <span className="text-sm text-slate-400">Or email: itachi@example.com</span>
        </div>
      </form>
    </section>
  )
}
