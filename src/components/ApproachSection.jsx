import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import VariableProximity from './VariableProximity'
import ScrollStack, { ScrollStackItem } from './ScrollStack'

const flowSteps = [
  {
    name: '1. LSTM Demand Prediction',
    heading: 'Predict Where People Will Be',
    accent: 'from-orange-500/20 to-orange-500/5',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-400',
    text: 'Predicts demand 30 minutes ahead using 47 features (time, weather, events). Accounts for Indian patterns like festivals, monsoons, and cricket matches.',
    metrics: ['47 input features', '94% accuracy', '30-min lookahead']
  },
  {
    name: '2. RL Route Optimizer',
    heading: 'Reroute When Things Break',
    accent: 'from-blue-500/20 to-blue-500/5',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    text: 'Reinforcement learning agent figures out alternatives instantly without stranding passengers. Adapts to traffic, breakdowns, and demand surges in real-time.',
    metrics: ['3.1x better than static', 'Sub-second decisions', 'Zero passenger stranding']
  },
  {
    name: '3. XGBoost ETA Prediction',
    heading: 'Predict When Bus Will Arrive',
    accent: 'from-emerald-500/20 to-emerald-500/5',
    borderColor: 'border-emerald-500/30',
    iconColor: 'text-emerald-400',
    text: 'Takes current traffic and passenger load, outputs ±60s accurate ETAs. Runs instantly on edge devices — no cloud dependency.',
    metrics: ['±60s accuracy', 'Edge-ready', 'Real-time updates']
  }
]

export default function ApproachSection() {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="approach" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#0f1419] border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center" ref={ref}>

        {/* Heading with VariableProximity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24 flex flex-col items-center gap-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold tracking-widest uppercase">
            Our Approach
          </span>

          <div ref={containerRef} style={{ position: 'relative' }} className="w-full flex justify-center">
            <VariableProximity
              label="Neural Pipeline"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={120}
              falloff="linear"
            />
          </div>

          <p className="text-lg text-gray-400 font-medium max-w-2xl">
            A three-step AI pipeline solving the core transit problems. Each model handles one critical piece.
          </p>
        </motion.div>

        {/* Pipeline Cards as ScrollStack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full"
        >
          <div className="flex flex-col items-center gap-12 w-full">
            {flowSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="w-full max-w-3xl"
              >
                <div className={`bg-gradient-to-br ${step.accent} rounded-2xl border ${step.borderColor} p-10 sm:p-12 shadow-xl text-center`}>
                  {/* Step label */}
                  <div className={`text-[11px] font-black uppercase tracking-widest mb-4 ${step.iconColor}`}>
                    {step.name}
                  </div>

                  {/* Heading */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                    {step.heading}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-base leading-relaxed max-w-xl mx-auto mb-8">
                    {step.text}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap justify-center gap-4">
                    {step.metrics.map((metric, idx) => (
                      <span key={idx} className={`px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold ${step.iconColor}`}>
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow connector */}
                {i < flowSteps.length - 1 && (
                  <div className="flex justify-center py-6">
                    <div className="flex flex-col items-center gap-1 text-gray-600">
                      <div className="w-px h-6 bg-gradient-to-b from-white/10 to-white/5" />
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
