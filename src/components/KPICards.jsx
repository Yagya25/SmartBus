import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import BorderGlow from './BorderGlow'

const icons = {
  clock: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  route: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 000-7h-11a3.5 3.5 0 010-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  ),
  zap: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  code: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
}

function useCounter(end, duration = 2000, isInView) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isInView) return
    let startTime = null; let animationFrame
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) animationFrame = requestAnimationFrame(animate)
    }
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])
  return count
}

const kpis = [
  { icon: 'clock', value: 40, suffix: '%', label: 'Wait Time Cut', description: 'Reduced passenger wait times across all routes', color: 'text-cyan-400', animated: true },
  { icon: 'route', value: 3, suffix: 'x', label: 'Route Efficiency', description: 'Better coverage with optimized scheduling', color: 'text-purple-400', animated: true },
  { icon: 'zap', value: null, suffix: '', label: 'Real-time Rerouting', description: 'Dynamic route adjustment based on live conditions', color: 'text-amber-400', animated: false },
  { icon: 'code', value: 0, suffix: '', label: '₹0 Infra Cost', description: 'Fully open-source stack', color: 'text-emerald-400', animated: false },
]

function KPICard({ kpi, index, isInView }) {
  const count = useCounter(kpi.value || 0, 2000, isInView && kpi.animated)

  return (
    <BorderGlow
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="#0a0f14"
      borderRadius={16}
      glowRadius={25}
      glowIntensity={0.8}
      coneSpread={25}
      animated={false}
      colors={['#22d3ee', '#a78bfa', '#f472b6']}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
        className="p-6 flex flex-col items-center text-center group"
      >
        <div className={`${kpi.color} mb-4 p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-300`}>
          {icons[kpi.icon]}
        </div>
        <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
          {kpi.animated ? (
            <>{count}<span className={kpi.color}>{kpi.suffix}</span></>
          ) : kpi.label === '₹0 Infra Cost' ? (
            <>₹0 <span className={`text-lg font-normal ${kpi.color}`}>(OSS)</span></>
          ) : (
            <span className={kpi.color}>Live</span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-gray-300 mb-1">
          {kpi.animated ? kpi.label : kpi.label === '₹0 Infra Cost' ? 'Infra Cost' : kpi.label}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">{kpi.description}</p>
      </motion.div>
    </BorderGlow>
  )
}

export default function KPICards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full max-w-5xl mx-auto">
      {kpis.map((kpi, i) => (
        <KPICard key={kpi.label} kpi={kpi} index={i} isInView={isInView} />
      ))}
    </div>
  )
}
