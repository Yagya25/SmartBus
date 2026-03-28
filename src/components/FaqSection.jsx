import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    q: 'Is this actually working?',
    a: "The models work on historical data. LSTM is 94% accurate at predicting demand. RL finds good routes. XGBoost ETAs are ±60 seconds. But we haven't deployed live yet—that's the next step."
  },
  {
    q: 'Why is this better than Google Maps?',
    a: "Google predicts individual arrivals. We predict system-wide behavior. We handle breakdowns in real-time. We work offline (SMS). We're optimized for Indian traffic patterns."
  },
  {
    q: "What's the hardest part?",
    a: "Getting real data from cities and deploying to live buses. The models are the easy part. Making it work in the chaos of real operations is the hard part."
  },
  {
    q: 'Can we see the code?',
    a: "Yes, it's open-source on GitHub. The neural engine and the routing agents are fully transparent."
  },
  {
    q: 'Why does this need AI?',
    a: "Because routes need to change in real-time based on demand, traffic, and breakdowns. Humans can't react fast enough to a system with 500+ variables. AI can."
  }
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="faq" className="relative py-40 px-4 sm:px-6 lg:px-8 bg-[#111822] border-t border-white/5 overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] -z-10" />

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 flex flex-col items-center gap-6"
        >
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-black tracking-[0.3em] uppercase">
            RESOURCES
          </span>
          <h2 className="text-5xl sm:text-7xl font-black text-white leading-tight">
            Common Inquiries
          </h2>
          <p className="text-xl text-gray-400 font-medium tracking-wide max-w-2xl leading-relaxed">
            Honest answers only. No marketing speak. We're building for the real world, including its limitations.
          </p>
        </motion.div>

        <div className="w-full space-y-6">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`group border-2 rounded-[32px] overflow-hidden transition-all duration-500 ${isOpen ? 'border-cyan-500/40 bg-[#151b22] shadow-[0_0_50px_rgba(34,211,238,0.1)]' : 'border-white/5 bg-[#0f1419] hover:bg-white/5'}`}
              >
                <button
                  className="w-full px-10 py-10 flex flex-col items-center justify-center text-center gap-4"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isOpen ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-500'}`}>
                    <HelpCircle size={28} />
                  </div>
                  <span className={`text-2xl font-black tracking-tight ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{faq.q}</span>
                  <ChevronDown className={`shrink-0 text-gray-600 transition-transform duration-500 size-6 mt-2 ${isOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                    >
                      <div className="px-10 pb-12 text-center text-gray-400 text-lg leading-relaxed border-t border-white/5 pt-10 flex flex-col items-center">
                        <p className="max-w-3xl">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
