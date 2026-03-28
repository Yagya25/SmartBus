import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MagicBento from './MagicBento'
import TextType from './TextType'

const iconPaths = {
  satellite: <><path d="M13 10l-2 2"/><circle cx="18" cy="6" r="3"/><path d="M6 18L18 6"/><path d="M3 21l2.5-2.5"/><path d="M7 17l-4 4"/><path d="M2 15l5 5"/></>,
  clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  route: <><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 000-7h-11a3.5 3.5 0 010-7H15"/><circle cx="18" cy="5" r="3"/></>,
  brain: <><path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z"/><path d="M9 21h6M10 17v4M14 17v4"/></>,
  speech: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></>,
  leaf: <><path d="M11 20A7 7 0 019.8 6.9C15.5 4.9 20 2 20 2s-1.3 5.7-4.6 10.2"/><path d="M6.8 11a5.5 5.5 0 007.7 7.2"/><path d="M2 22l4-4"/></>,
  dashboard: <><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></>,
}

function Icon({ name, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name]}
    </svg>
  )
}

const colorMap = {
  cyan: '#22d3ee', purple: '#a78bfa', amber: '#fbbf24', pink: '#f472b6',
  teal: '#2dd4bf', red: '#f87171', emerald: '#34d399', blue: '#60a5fa',
}

const features = [
  { title: 'Real-Time Bus Tracking', desc: 'Live GPS tracking of every bus with 5-second updates. Know exactly where your bus is, down to the street.', label: 'Tracking', icon: 'satellite', color: 'cyan' },
  { title: 'Accurate ETAs', desc: '±60 second accuracy, accounts for traffic & weather. No more guessing—know when you\'ll arrive.', label: 'Precision', icon: 'clock', color: 'purple' },
  { title: 'Smart Route Optimization', desc: 'Routes auto-adjust every 5 mins based on demand. System finds the best route, not the standard one.', label: 'Optimization', icon: 'route', color: 'amber' },
  { title: 'Demand Prediction', desc: 'LSTM predicts rider demand 30 mins in advance. Buses go where riders will be, not where they were.', label: 'AI Prediction', icon: 'brain', color: 'pink' },
  { title: 'Multi-Language Support', desc: 'WhatsApp bot in 7 Indian languages. Works on any phone, any plan.', label: 'Accessibility', icon: 'speech', color: 'teal' },
  { title: 'Auto-Recovery', desc: 'Automatic rerouting on breakdowns, zero downtime. System handles emergencies, not your support team.', label: 'Resilience', icon: 'shield', color: 'red' },
  { title: 'Zero Infrastructure Cost', desc: 'Open-source stack, no vendor lock-in. Cities own the infrastructure.', label: 'Open Source', icon: 'leaf', color: 'emerald' },
  { title: 'Real-Time Dashboard', desc: 'Control room sees all buses, anomalies, congestion. Ops team makes decisions in seconds, not hours.', label: 'Control', icon: 'dashboard', color: 'blue' },
]

const cardData = features.map(f => ({
  color: '#0a0f14',
  title: f.title,
  description: f.desc,
  label: f.label,
  icon: <Icon name={f.icon} />,
  iconColor: colorMap[f.color],
}))

export default function FeaturesGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="features" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-navy-900">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 -z-10" />
      <div className="max-w-7xl mx-auto flex flex-col items-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold tracking-widest uppercase mb-6">
            Capabilities
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-white mb-4 text-center">
            <TextType
              text={["Everything You Need for Smart Transit", "8 Core Capabilities Built for India", "AI-Powered Transit Infrastructure"]}
              typingSpeed={60}
              pauseDuration={2500}
              showCursor
              cursorCharacter="_"
              deletingSpeed={40}
              className="inline"
              startOnVisible
            />
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl font-medium text-center">
            Eight core capabilities perfectly engineered and seamlessly integrated to transform how cities run their bus networks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full flex justify-center"
        >
          <MagicBento
            cardData={cardData}
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="34, 211, 238"
            disableAnimations={false}
          />
        </motion.div>
      </div>
    </section>
  )
}
