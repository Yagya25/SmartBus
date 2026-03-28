import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// --- Data ---
const steps = [
  {
    number: '01',
    title: 'Real-time Data Ingestion',
    color: 'emerald',
    icon: 'satellite',
    points: [
      'GPS from 6,000 buses → WiFi/4G to cloud',
      'Passenger tap-in data, weather, traffic feeds',
      '40K concurrent riders tracked live',
    ],
    visual: 'ingestion',
  },
  {
    number: '02',
    title: 'Smart Demand Prediction',
    color: 'purple',
    icon: 'brain',
    points: [
      'LSTM model analyzes historical patterns',
      'Predicts demand 30 mins ahead by area',
      'Accounts for weather, events, holidays, time-of-day',
    ],
    visual: 'heatmap',
  },
  {
    number: '03',
    title: 'Dynamic Route Optimization',
    color: 'amber',
    icon: 'route',
    points: [
      'RL algorithm rewires routes every 5 mins',
      'Minimizes wait times + passenger crowding',
      'Handles breakdowns instantly with rerouting',
    ],
    visual: 'routes',
  },
  {
    number: '04',
    title: 'Live ETA Calculation',
    color: 'cyan',
    icon: 'clock',
    points: [
      'XGBoost predicts arrival time with ±60s accuracy',
      'Incorporates traffic, weather, passenger load',
      'Updates every 30 seconds per bus',
    ],
    visual: 'eta',
  },
  {
    number: '05',
    title: 'Instant Passenger Updates',
    color: 'pink',
    icon: 'phone',
    points: [
      'WebSocket pushes updates in real-time',
      'SMS via Twilio + WhatsApp bot integration',
      'Passenger app shows live bus tracking on map',
    ],
    visual: 'notification',
  },
  {
    number: '06',
    title: 'Continuous AI Learning',
    color: 'teal',
    icon: 'loop',
    points: [
      'Every trip feeds data back into models',
      'Models retrain weekly on new patterns',
      'System gets smarter with every bus run',
    ],
    visual: 'loop',
  },
]

const colorMap = {
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', dot: 'bg-purple-400' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', dot: 'bg-cyan-400' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400', dot: 'bg-pink-400' },
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400', dot: 'bg-teal-400' },
}

const iconPaths = {
  satellite: <><path d="M13 10l-2 2M10.5 13.5l-1 1M16.5 7.5l-1 1"/><path d="M6 18L18 6"/><circle cx="18" cy="6" r="3"/><path d="M3 21c3-3 6-3 9-6"/></>,
  brain: <><path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z"/><path d="M9 21h6M10 17v4M14 17v4"/></>,
  route: <><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 000-7h-11a3.5 3.5 0 010-7H15"/><circle cx="18" cy="5" r="3"/></>,
  clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  phone: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/><path d="M9 6h6"/></>,
  loop: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></>,
}

function Icon({ name, size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name]}
    </svg>
  )
}

function MiniVisual({ type, color }) {
  const c = colorMap[color]
  
  if (type === 'ingestion') {
    return (
      <div className="relative h-24 flex items-center justify-center gap-6">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} className={`w-3 h-3 rounded-full ${c.dot}`} animate={{ y: [-15, 15], opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }} />
        ))}
      </div>
    )
  }
  if (type === 'heatmap') {
    return (
      <div className="flex gap-1.5 h-20 items-end justify-center">
        {[40, 70, 100, 60, 30].map((h, i) => (
          <motion.div key={i} className="w-8 rounded-t-lg" style={{ background: `linear-gradient(to top, rgba(168,85,247,0.2), rgba(168,85,247,${h / 100}))` }} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: i * 0.1 }} />
        ))}
      </div>
    )
  }
  if (type === 'routes') {
    return (
      <div className="relative h-24 flex items-center justify-center">
        <svg width="200" height="80" viewBox="0 0 200 80" className="opacity-80">
          <motion.path d="M20 60 Q 60 10, 100 40 T 180 20" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeDasharray="300" initial={{ strokeDashoffset: 300 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 2.5, repeat: Infinity }} />
          <circle cx="20" cy="60" r="5" fill="#f59e0b" />
          <circle cx="180" cy="20" r="5" fill="#f59e0b" />
        </svg>
      </div>
    )
  }
  if (type === 'eta') {
    return (
      <div className="flex flex-col items-center justify-center h-24">
        <motion.div className="text-4xl font-extrabold font-mono text-cyan-400" animate={{ opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          3:42 <span className="text-xl">min</span>
        </motion.div>
        <div className="text-emerald-400 text-xs font-bold mt-1">▲ ETA improved by 12%</div>
      </div>
    )
  }
  if (type === 'notification') {
    return (
      <div className="flex items-center justify-center h-24">
        <motion.div className="bg-navy-800 border border-white/10 rounded-2xl px-6 py-3 flex items-center gap-4 shadow-xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400">
            <Icon name="phone" size={20} />
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-white">Bus 42 Arriving</div>
            <div className="text-xs text-gray-400">Platform B • 3 min away</div>
          </div>
        </motion.div>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center h-24">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className={`w-14 h-14 rounded-full border-[3px] border-white/5 border-t-teal-400`} />
    </div>
  )
}

function CenteredStepCard({ step, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const c = colorMap[step.color]

  return (
    <div ref={ref} className="relative flex flex-col items-center mb-16 last:mb-0 w-full group">
      
      {/* Centered Number Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, type: 'spring' }}
        className={`w-14 h-14 rounded-full ${c.bg} border-2 ${c.border} text-white font-bold flex items-center justify-center text-lg z-20 mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]`}
      >
        {step.number}
      </motion.div>

      {/* Vertical Line Connector (behind card) */}
      {index !== steps.length - 1 && (
        <div className="absolute top-14 bottom-[-64px] left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-white/20 to-transparent z-0" />
      )}

      {/* Main Content Card perfectly centered */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full max-w-3xl glass-card rounded-3xl p-8 sm:p-10 border border-white/10 text-center relative z-10 hover:border-white/20 transition-colors shadow-2xl bg-navy-800/40 backdrop-blur-xl"
      >
        <div className="flex flex-col items-center mb-6">
          <div className={`p-4 rounded-2xl ${c.bg} ${c.text} mb-4`}>
            <Icon name={step.icon} size={32} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{step.title}</h3>
        </div>

        <ul className="flex flex-col items-center space-y-3 mb-8">
          {step.points.map((point, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="text-base text-gray-300 font-medium max-w-lg"
            >
              {point}
            </motion.li>
          ))}
        </ul>

        <div className={`rounded-2xl ${c.bg} border ${c.border} overflow-hidden py-4 px-6`}>
          <MiniVisual type={step.visual} color={step.color} />
        </div>
      </motion.div>

    </div>
  )
}

export default function HowItWorks() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-navy-900">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 -z-10" />
      
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Centered Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold tracking-widest uppercase mb-6">
            <Icon name="loop" size={16} /> HOW IT WORKS
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            From Raw Data to <br/><span className="gradient-text">Smart Transit</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium">
            Everything you need for smart transit. Six elegant steps transform chaotic bus networks into a responsive, AI-optimized transit system.
          </p>
        </motion.div>

        {/* Vertical Centered Timeline Stack */}
        <div className="relative w-full flex flex-col items-center">
          {steps.map((step, i) => (
            <CenteredStepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
