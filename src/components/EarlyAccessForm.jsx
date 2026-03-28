import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function EarlyAccessForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, success
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  return (
    <section id="early-access" className="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-navy-900 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-10 sm:p-14 border border-white/10 shadow-2xl relative z-10 flex flex-col items-center bg-navy-900/60 backdrop-blur-2xl"
        >
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-8">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Help us test in reality
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            We've proven the models on historical data. Now we need transit authorities to help us test in live operations. Get access to the beta.
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-md relative flex flex-col items-center gap-4">
            <input
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'success'}
              required
              className="w-full bg-navy-800/80 border border-white/10 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-center text-lg transition-all"
            />
            
            <button
              type="submit"
              disabled={status !== 'idle'}
              className="w-full bg-cyan-400 text-navy-900 font-bold px-8 py-4 rounded-xl hover:bg-cyan-300 transition-colors shadow-[0_0_30px_rgba(34,211,238,0.3)] disabled:opacity-80 flex items-center justify-center gap-2 text-lg"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-navy-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Requesting Access...
                </>
              ) : status === 'success' ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Access Requested!
                </>
              ) : (
                'Request Early Access'
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm font-medium text-gray-500">
             <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/> Open Source Core</span>
             <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"/> Zero Lock-in</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
