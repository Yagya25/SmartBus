import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Database, Cpu, Brain, Radio } from 'lucide-react'

const layers = [
  {
    id: 'data',
    title: 'Data Sources',
    icon: <Database size={24} className="text-blue-400" />,
    items: [
      'GPS from buses (real-time location)',
      "Passenger tap-in data (who's boarding)",
      'Weather API (affects demand)',
      'Event calendar (affects demand)',
      'Traffic data (affects ETA)'
    ]
  },
  {
    id: 'processing',
    title: 'Processing',
    icon: <Cpu size={24} className="text-cyan-400" />,
    items: [
      'Kafka: Real-time data streaming',
      'TimescaleDB: Store time-series data',
      'PostgreSQL: Regular data'
    ]
  },
  {
    id: 'models',
    title: 'Models',
    icon: <Brain size={24} className="text-purple-400" />,
    items: [
      'LSTM model (demand)',
      'RL agent (routing)',
      'XGBoost model (ETA)'
    ]
  },
  {
    id: 'serving',
    title: 'Serving',
    icon: <Radio size={24} className="text-emerald-400" />,
    items: [
      'FastAPI: REST endpoints for apps',
      'WebSocket: Real-time updates',
      'SMS: Notify passengers'
    ]
  }
]

export default function HowWeBuiltItSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="architecture" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0f1419] border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            How We Built It
          </h2>
          <p className="text-lg text-gray-400 font-medium">
            No frills. Just a robust event-driven architecture.
          </p>
        </motion.div>

        <div className="w-full flex flex-col lg:flex-row gap-4 items-stretch justify-center relative">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex-1 bg-[#151b22] border border-white/10 rounded-2xl p-6 relative z-10 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <div className="p-2.5 rounded-xl bg-white/5">
                  {layer.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-widest uppercase">{layer.title}</h3>
              </div>
              
              <ul className="space-y-4 flex-1">
                {layer.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-400 font-medium flex items-start gap-3 bg-[#0f1419] p-3 rounded-lg border border-white/5">
                    <span className="text-gray-600 mt-1">↳</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Arrow connector for desktop */}
              {i < layers.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-5 w-6 h-6 -translate-y-1/2 items-center justify-center text-gray-600 z-20">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              )}
              {/* Arrow connector for mobile */}
              {i < layers.length - 1 && (
                <div className="lg:hidden absolute -bottom-5 left-1/2 w-6 h-6 -translate-x-1/2 items-center justify-center text-gray-600 z-20 rotate-90 flex">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
