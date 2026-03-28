import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X, Minus } from 'lucide-react'

const rows = [
  { feature: 'Real-time rerouting', google: 'No (static)', moovit: 'Limited (5 min delays)', smartbus: 'YES (5 sec response)' },
  { feature: 'Works offline', google: 'No (needs data)', moovit: 'No', smartbus: 'YES (SMS-based)' },
  { feature: 'Cost to city', google: "Can't use (black box)", moovit: '₹50L+/year licensing', smartbus: '₹0 (open-source)' },
  { feature: 'Demand prediction', google: 'Uses historical only', moovit: 'No', smartbus: 'LSTM with weather/events' },
  { feature: 'Handles breakdowns', google: 'No (no API)', moovit: 'No', smartbus: 'Auto-reroutes in 20 sec' },
  { feature: 'WhatsApp bot', google: 'No', moovit: 'No', smartbus: 'YES (7 languages)' },
  { feature: 'Works on ₹2000 phones', google: 'No', moovit: 'No', smartbus: 'YES (no app needed)' },
  { feature: 'City owns data', google: 'NO (Google owns it)', moovit: 'NO (Moovit owns it)', smartbus: 'YES (100% city owned)' },
  { feature: 'Can customize routes', google: 'No', moovit: 'Limited', smartbus: 'YES (real-time tuning)' },
]

export default function ComparisonSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="comparison" className="relative py-40 px-4 sm:px-6 lg:px-8 bg-[#0f1419] border-t border-white/5 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.03),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center" ref={ref}>
        {/* Header - Massive and Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 flex flex-col items-center gap-6"
        >
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black tracking-[0.3em] uppercase">
            WHY WE WIN
          </span>
          <h2 className="text-5xl sm:text-7xl font-black text-white leading-tight">
            SmartBus vs Alternatives
          </h2>
          <p className="text-xl text-gray-400 font-medium tracking-wide max-w-3xl leading-relaxed">
            Google predicts individual arrivals based on traffic. We predict system-wide behavior using LSTM networks and real-time tap-in data to optimize every route.
          </p>
        </motion.div>

        {/* Comparison Table - Spacious and Centered */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full overflow-x-auto lg:overflow-visible"
        >
          <div className="min-w-[1000px] lg:min-w-full rounded-[40px] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-[#0a0f14] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/10">
                  <th className="py-10 px-12 text-xs font-black text-gray-500 uppercase tracking-[0.3em] text-center">Feature Dimension</th>
                  <th className="py-10 px-8 text-xs font-black text-gray-300 uppercase tracking-[0.3em] text-center border-l border-white/5">Google Transit</th>
                  <th className="py-10 px-8 text-xs font-black text-gray-300 uppercase tracking-[0.3em] text-center border-l border-white/5">Moovit <span className="text-[10px] text-gray-600">(VC)</span></th>
                  <th className="py-10 px-12 text-sm font-black text-cyan-400 uppercase tracking-[0.4em] text-center bg-cyan-500/5 border-l border-white/10">SmartBus (Us)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={`group border-b border-white/5 transition-all hover:bg-white/[0.03] ${i % 2 === 0 ? 'bg-[#0a0f14]' : 'bg-[#0c1218]'}`}>
                    <td className="py-7 px-12 text-base font-bold text-white border-r border-white/5 tracking-tight group-hover:text-cyan-400 transition-colors text-center">{row.feature}</td>
                    
                    <td className="py-7 px-8 text-sm text-center text-gray-500 border-r border-white/5">
                      <div className="flex items-center justify-center gap-3">
                        <X size={16} className="text-red-900/40" />
                        <span className="font-medium">{row.google}</span>
                      </div>
                    </td>
                    
                    <td className="py-7 px-8 text-sm text-center text-gray-500 border-r border-white/5">
                      <div className="flex items-center justify-center gap-3">
                         {row.moovit.includes('No') ? <X size={16} className="text-red-900/40" /> : <Minus size={16} className="text-amber-900/40" />}
                         <span className="font-medium">{row.moovit}</span>
                      </div>
                    </td>
                    
                    <td className="py-7 px-12 text-sm font-black text-cyan-300 text-center bg-cyan-500/[0.02] relative group-hover:bg-cyan-500/[0.05] transition-colors">
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                           <Check size={14} className="text-cyan-400" />
                        </div>
                        <span className="tracking-wide uppercase">{row.smartbus}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
