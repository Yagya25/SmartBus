import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const layers = [
  {
    id: 'ui', title: 'USER INTERFACES', color: 'purple',
    items: [
      { name: 'Passenger App', desc: 'Real-time ETAs and crowd levels.' },
      { name: 'Control Dashboard', desc: 'Real-time operations center for authorities.' },
      { name: 'Driver App', desc: 'Turn-by-turn navigation with AI routes.' }
    ],
  },
  {
    id: 'services', title: 'BACKEND SERVICES', color: 'cyan',
    items: [
      { name: 'FastAPI Gateway', desc: 'High-performance API handling 10K+ req/sec.' },
      { name: 'WebSocket Server', desc: 'Live data streaming to all clients.' },
      { name: 'Auth Service', desc: 'JWT-based auth and RBAC.' }
    ],
  },
  {
    id: 'ai', title: 'AI BRAIN (CORE ENGINE)', color: 'amber', highlight: true,
    items: [
      { name: 'Demand Forecaster', desc: 'LSTM network predicting ridership.' },
      { name: 'Route Optimizer', desc: 'GA solver rebalancing routes every 5 mins.' },
      { name: 'ETA Predictor', desc: 'XGBoost models updating ETAs continuously.' }
    ],
  },
  {
    id: 'pipeline', title: 'DATA PIPELINE', color: 'teal',
    items: [
      { name: 'Apache Kafka', desc: 'Event stream ingesting 100K events/sec.' },
      { name: 'TimescaleDB', desc: 'Time-series optimized PostgreSQL.' },
      { name: 'Redis Cache', desc: 'In-memory cache for live bus positions.' }
    ],
  },
  {
    id: 'ingestion', title: 'DATA INGESTION', color: 'emerald',
    items: [
      { name: 'GPS Trackers', desc: 'IoT modules transmitting live location.' },
      { name: 'Passenger Tap-in', desc: 'NFC boarding system capturing ridership.' },
      { name: 'Traffic & Weather', desc: 'Live external feeds impacting demand.' }
    ],
  },
]

const colorClasses = {
  purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/30 text-purple-300 ring-purple-500/40',
  cyan: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/30 text-cyan-300 ring-cyan-500/40',
  amber: 'from-amber-500/20 to-orange-600/5 border-amber-500/40 text-amber-300 ring-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)]',
  teal: 'from-teal-500/20 to-teal-600/5 border-teal-500/30 text-teal-300 ring-teal-500/40',
  emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30 text-emerald-300 ring-emerald-500/40',
}

export default function ArchitectureSection() {
  const [activeLayer, setActiveLayer] = useState(layers[2].id) // default to AI layer
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="architecture" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-navy-900">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 -z-10" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center"
          ref={ref}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold tracking-widest uppercase mb-6">
            System Architecture
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Five-Layer <span className="gradient-text">Intelligence Stack</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
            Explore our elegantly streamlined stack. Data flows transparently from the edge devices to the AI core, delivering seamless optimizations.
          </p>
        </motion.div>

        {/* Centered Accordion/Interactive Vertical List */}
        <div className="w-full flex flex-col gap-4">
          {layers.map((layer, idx) => {
            const isActive = activeLayer === layer.id
            const cStyles = colorClasses[layer.color]
            
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActiveLayer(isActive ? null : layer.id)}
                className={`w-full cursor-pointer rounded-3xl border transition-all duration-300 overflow-hidden bg-gradient-to-r ${cStyles} ${isActive ? 'ring-2 bg-navy-800/80 backdrop-blur-xl' : 'hover:bg-white/5 bg-navy-900/40 hover:border-white/20'}`}
              >
                {/* Layer Header */}
                <div className="px-8 py-6 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full bg-${layer.color}-400 ${layer.highlight ? 'animate-pulse' : ''}`} />
                      <h3 className="text-xl sm:text-2xl font-black tracking-wide text-white">
                        {layer.title}
                      </h3>
                   </div>
                   <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white transition-transform">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
                         <path d="M6 9l6 6 6-6"/>
                      </svg>
                   </div>
                </div>

                {/* Layer Detailed Body (Centered Grid) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="px-8 pb-8 pt-2 border-t border-white/10"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        {layer.items.map((item, i) => (
                          <div key={i} className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                            <h4 className={`text-lg font-bold mb-3 ${layer.highlight ? 'text-amber-400' : 'text-white'}`}>{item.name}</h4>
                            <p className="text-sm text-gray-300 leading-relaxed font-medium">{item.desc}</p>
                          </div>
                        ))}
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
