import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { BrainCircuit, GitPullRequest, Target } from 'lucide-react'

function CollapsibleTech({ details }) {
  const [open, setOpen] = useState(false)
  
  return (
    <div className="mt-6 border-t border-white/10 pt-4">
      <button 
        onClick={() => setOpen(!open)}
        className="text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-white transition-colors flex items-center gap-2 w-full justify-between"
      >
        <span>Technical Details</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
           <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <AnimatePresence>
        {open && (
           <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
             <ul className="mt-3 space-y-2">
                {details.map((d,i) => (
                   <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                      <span className="text-white shrink-0 mt-0.5">•</span>
                      <span>{d}</span>
                   </li>
                ))}
             </ul>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function LstmVisual() {
  const [time, setTime] = useState(0) // 0 to 3
  const times = ['Now', '+5 min', '+15 min', '+30 min']
  
  useEffect(() => {
    const int = setInterval(() => setTime(t => (t + 1) % 4), 2000)
    return () => clearInterval(int)
  }, [])
  
  return (
    <div className="w-full h-full min-h-[250px] relative bg-navy-900 rounded-xl overflow-hidden border border-white/5 flex flex-col p-4 shadow-inner">
      <div className="flex justify-between items-center mb-4">
         {times.map((t, i) => (
            <div key={i} className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${time === i ? 'bg-orange-500 text-white' : 'text-gray-600'}`}>
               {t}
            </div>
         ))}
      </div>
      <div className="flex-1 relative">
         {/* Map Grid */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
         {/* Heatmap blur */}
         <motion.div 
           className="absolute bg-orange-500/30 rounded-full blur-2xl"
           animate={{
             left: ['30%', '40%', '60%', '80%'][time],
             top: ['50%', '40%', '30%', '20%'][time],
             width: ['50px', '80px', '120px', '180px'][time],
             height: ['50px', '80px', '120px', '180px'][time],
           }}
           transition={{ duration: 1 }}
         />
         {/* Passengers (checkmarks) */}
         <AnimatePresence>
           {time === 3 && (
              <>
                 {[0,1,2,3,4].map(idx => (
                    <motion.div 
                      key={idx}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="absolute w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold"
                      style={{ left: `${75 + Math.random()*15}%`, top: `${15 + Math.random()*15}%` }}
                    >✓</motion.div>
                 ))}
              </>
           )}
         </AnimatePresence>
      </div>
      <div className="absolute bottom-4 left-4 text-xs font-bold text-orange-400 uppercase tracking-widest">Live Prediction Matrix</div>
    </div>
  )
}

function RlVisual() {
  const [state, setState] = useState('normal') // normal, peak, breakdown
  
  useEffect(() => {
    const int = setInterval(() => {
      setState(s => s === 'normal' ? 'peak' : s === 'peak' ? 'breakdown' : 'normal')
    }, 3000)
    return () => clearInterval(int)
  }, [])
  
  return (
    <div className="w-full h-full min-h-[250px] relative bg-navy-900 rounded-xl overflow-hidden border border-white/5 flex flex-col p-4 shadow-inner">
       <div className="flex gap-2 mb-4 z-10 w-full justify-between">
          <div className={`px-2 py-1 text-[10px] font-bold rounded ${state==='normal'?'bg-blue-500 text-white':'bg-white/5 text-gray-500'}`}>Normal</div>
          <div className={`px-2 py-1 text-[10px] font-bold rounded ${state==='peak'?'bg-blue-500 text-white':'bg-white/5 text-gray-500'}`}>Peak Hour</div>
          <div className={`px-2 py-1 text-[10px] font-bold rounded ${state==='breakdown'?'bg-blue-500 text-white':'bg-white/5 text-gray-500'}`}>Breakdown</div>
       </div>
       <div className="flex-1 relative">
         <svg className="w-full h-full opacity-60">
            {/* Route 1 */}
            <motion.polyline 
              animate={{
                points: state === 'peak' ? '10,50 50,20 90,50' : state === 'breakdown' ? '10,50 50,50 90,50' : '10,50 50,50 90,50',
                strokeWidth: state === 'peak' ? 4 : 2
              }}
              fill="none" stroke="#3b82f6" transition={{ duration: 0.5 }}
            />
            {/* Route 2 */}
            <motion.polyline 
              animate={{
                points: state === 'breakdown' ? '20,80 50,50 80,80' : '20,80 50,80 80,80',
                strokeWidth: state === 'breakdown' ? 4 : 2,
                stroke: state === 'breakdown' ? '#34d399' : '#3b82f6'
              }}
              fill="none" transition={{ duration: 0.5 }}
            />
         </svg>
         {state === 'breakdown' && (
           <div className="absolute w-3 h-3 bg-red-500 rounded-full animate-pulse z-20" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
         )}
       </div>
       <div className="absolute bottom-4 left-4 text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
         Agent Status: {state === 'peak' ? 'Rebalancing' : state === 'breakdown' ? 'Rerouting' : 'Idle'}
       </div>
    </div>
  )
}

function EtaVisual() {
  const [eta, setEta] = useState(180) // seconds
  const [actual, setActual] = useState(198) // +18s
  
  useEffect(() => {
    const int = setInterval(() => {
      setEta(Math.floor(Math.random() * 300 + 100))
      setActual(prev => prev)
    }, 2000)
    return () => clearInterval(int)
  }, [])
  
  useEffect(() => {
     setActual(eta + Math.floor(Math.random() * 40 - 20))
  }, [eta])

  return (
    <div className="w-full h-full min-h-[250px] relative bg-navy-900 rounded-xl overflow-hidden border border-white/5 flex flex-col p-6 shadow-inner justify-center gap-6 text-center">
       <div>
         <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">SmartBus Predicted ETA</div>
         <div className="text-4xl font-mono text-emerald-400 font-black">{Math.floor(eta/60)}m {eta%60}s <span className="text-sm font-normal text-gray-500 ml-2">± 60s</span></div>
       </div>
       <div className="h-px bg-white/5 w-full"/>
       <div>
         <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Actual Arrival</div>
         <div className="text-2xl font-mono text-white font-bold inline-flex items-center gap-3">
           {Math.floor(actual/60)}m {actual%60}s
           <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">✅ Within 60s Range</span>
         </div>
       </div>
       <div className="text-[10px] text-gray-600 mt-2">Streaming inference &lt; 50ms latency</div>
    </div>
  )
}

const advantages = [
  {
    id: 'lstm',
    title: 'We Know Where Demand Will Be 30 Minutes Before It Happens',
    accent: 'orange',
    icon: <BrainCircuit size={28} />,
    visual: <LstmVisual />,
    stat: '94%',
    statLabel: 'Accuracy measured against actual tap-ins',
    comparison: 'Google Trips predicts location, we predict behavior.',
    why: "Buses aren't waiting for demand, they're already there when riders arrive.",
    details: [
      'LSTM with 47 features: time-of-day, weather, events, holidays, school holidays, stadium events, transit strikes.',
      'Handles Indian-specific patterns (Diwali exodus, monsoon delays, cricket matches).',
      'Retrains daily, not yearly.'
    ]
  },
  {
    id: 'rl',
    title: 'Routes Change Every 5 Minutes (Not Every 5 Years)',
    accent: 'blue',
    icon: <GitPullRequest size={28} />,
    visual: <RlVisual />,
    stat: '3.1x',
    statLabel: 'Route efficiency vs static scheduling',
    comparison: 'Response time: 5 minutes (competitors: 5 days/3 months)',
    why: "One broken-down bus used to cascade (200 people angry). Now? Passengers reassigned instantly.",
    details: [
      'PPO (Proximal Policy Optimization) agent with 500K training steps.',
      'Constraint-based: never strand a passenger, minimize crowding, maximize coverage.',
      'Trained on 2 years of real BMTC/KSRTC data.'
    ]
  },
  {
    id: 'xgb',
    title: '60-Second Accuracy. Google Gets It 3 Minutes Wrong.',
    accent: 'emerald',
    icon: <Target size={28} />,
    visual: <EtaVisual />,
    stat: '60s',
    statLabel: 'Accuracy (Google Maps: ±180 seconds in India)',
    comparison: '12% consistently better than Google in deep urban testing.',
    why: "A woman waiting shouldn't have to check her phone every 30 seconds. She trusts the time and gets on the next bus.",
    details: [
      '200+ features: traffic conditions, weather, passenger load, road type.',
      'Streaming inference: model runs on edge, not cloud.',
      '< 50ms latency per prediction.'
    ]
  }
]

const acc = {
  orange: { card: 'border-l-orange-500', stat: 'text-orange-500', why: 'text-orange-300' },
  blue: { card: 'border-l-blue-500', stat: 'text-blue-500', why: 'text-blue-300' },
  emerald: { card: 'border-l-emerald-500', stat: 'text-emerald-500', why: 'text-emerald-300' },
}

export default function AdvantageSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="advantages" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#111822] border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-6">
            The Technology Advantage
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Three Things We Figured Out First
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl font-medium">
            We don't rely on basic data aggregation. We built advanced AI models capable of thriving in deep chaotic environments.
          </p>
        </motion.div>

        <div className="w-full flex flex-col gap-12">
          {advantages.map((adv, i) => {
            const c = acc[adv.accent]
            return (
              <motion.div 
                key={adv.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`bg-[#18202b] rounded-3xl border border-white/5 border-l-4 ${c.card} p-8 lg:p-10 shadow-2xl flex flex-col lg:flex-row gap-10 items-center overflow-hidden relative`}
              >
                <div className={`absolute -top-32 -left-32 w-64 h-64 bg-${adv.accent}-500/5 rounded-full blur-[100px] pointer-events-none`} />
                
                {/* Visual Left */}
                <div className="w-full lg:w-1/2">
                   {adv.visual}
                </div>

                {/* Content Right */}
                <div className="w-full lg:w-1/2 flex flex-col text-left">
                   <div className={`mb-6 p-4 bg-${adv.accent}-500/10 inline-flex rounded-2xl w-max text-${adv.accent}-500`}>
                      {adv.icon}
                   </div>
                   
                   <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">{adv.title}</h3>
                   
                   <div className="mb-6 pb-6 border-b border-white/5 flex gap-6 items-center">
                      <div className={`text-5xl lg:text-6xl font-black ${c.stat}`}>{adv.stat}</div>
                      <div className="text-sm text-gray-400 font-bold max-w-[150px] leading-tight">{adv.statLabel}</div>
                   </div>

                   <div className="space-y-4 font-bold text-sm">
                      <div className="bg-white/5 rounded-xl p-4">
                         <span className="text-[10px] uppercase text-gray-500 tracking-wider block mb-1">Comparison</span>
                         <span className="text-gray-300">{adv.comparison}</span>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                         <span className="text-[10px] uppercase text-gray-500 tracking-wider block mb-1">Why It Matters</span>
                         <span className={c.why}>{adv.why}</span>
                      </div>
                   </div>

                   <CollapsibleTech details={adv.details} />
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
