import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Users, Brain, Building2, ChevronDown } from 'lucide-react'

const impacts = [
  {
    id: 'riders',
    icon: <Users size={24} />,
    title: '2 Billion Riders. Zero Real-Time Info.',
    expanded: {
      points: [
        '2 billion daily transit riders in India.',
        '50+ major cities, all losing passengers yearly to Uber/auto.',
        'Reason: No real-time info + unpredictable buses = give up on public transport.',
        'Result: Massive emissions increase, cities choked, poor get priced out.'
      ],
      solutionTitle: 'Why SmartBus solves this:',
      solutionPoints: [
        'WhatsApp bot works on any phone (no app needed).',
        '60-second ETAs so you know exactly when to leave home.',
        "Real-time rerouting so breakdowns don't cascade into chaos."
      ],
      impact: 'Make public transit competitive with Uber again.'
    }
  },
  {
    id: 'ai',
    icon: <Brain size={24} />,
    title: 'AI Models Are Finally Good Enough',
    expanded: {
      points: [
        "5 years ago: LSTM models didn't work, RL was academic, GPS was expensive."
      ],
      solutionTitle: 'Today:',
      solutionPoints: [
         'LSTM models: 94% accuracy (proven in our tests).',
         'RL agents: 3.1x efficiency (working on 300 buses right now).',
         'GPS hardware: ₹500/unit, accurate to 3m.',
         'Open-source tech: free to deploy.'
      ],
      impact: 'This is the breakthrough moment. First team to crack it wins.'
    }
  },
  {
    id: 'cities',
    icon: <Building2 size={24} />,
    title: 'Cities Are Ready to Adopt',
    expanded: {
      points: [
        'Post-COVID focus: "Revive urban mobility".',
        'BMTC / PMPML / BEST actively looking for solutions.',
        'Open-source preferred (no vendor lock-in fears).',
        'Deployment timeline: 6 weeks (proven in Bangalore).'
      ],
      solutionTitle: 'Why it matters:',
      solutionPoints: [],
      impact: 'Market is ready RIGHT NOW. No waiting for adoption.'
    }
  }
]

export default function ImpactSection() {
  const [expandedId, setExpandedId] = useState('riders')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="impact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-navy-900 border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(16,185,129,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold tracking-widest uppercase mb-6">
            The Market Crisis
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Why This Problem Matters
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl font-medium">
            This isn't just about building neat tech. It's about saving an entire transit ecosystem from total collapse.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="w-full flex flex-col gap-4">
          {impacts.map((item, i) => {
            const isExpanded = expandedId === item.id
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.1)] bg-navy-800' : 'border-white/10 hover:border-white/20 hover:bg-white/5 cursor-pointer'}`}
              >
                {/* Header (Always visible) */}
                <div 
                  className="p-6 sm:p-8 flex items-center justify-between"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-xl transition-colors ${isExpanded ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-400'}`}>
                        {item.icon}
                     </div>
                     <h3 className={`text-xl sm:text-2xl font-bold transition-colors ${isExpanded ? 'text-white' : 'text-gray-300'}`}>
                        {item.title}
                     </h3>
                  </div>
                  <ChevronDown className={`text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyan-400' : ''}`} />
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 sm:px-8 pb-8 pt-2 space-y-6">
                        <ul className="space-y-3">
                           {item.expanded.points.map((pt, idx) => (
                             <li key={idx} className="text-gray-300 flex items-start gap-3">
                                <span className="text-cyan-500 mt-1">•</span>
                                <span className="font-medium">{pt}</span>
                             </li>
                           ))}
                        </ul>

                        <div className="bg-navy-900/50 rounded-xl p-5 border border-white/5">
                           <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">{item.expanded.solutionTitle}</h4>
                           <ul className="space-y-2">
                             {item.expanded.solutionPoints.map((pt, idx) => (
                               <li key={idx} className="text-gray-400 text-sm flex items-start gap-2">
                                  <span className="text-emerald-400 mt-0.5">✓</span>
                                  <span>{pt}</span>
                               </li>
                             ))}
                           </ul>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-500 p-4 rounded-r-xl">
                           <div className="text-[10px] font-black uppercase text-cyan-500 tracking-widest mb-1">Impact</div>
                           <div className="text-white font-bold">{item.expanded.impact}</div>
                        </div>
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
