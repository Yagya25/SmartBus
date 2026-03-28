import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, FlaskConical, Map } from 'lucide-react'
import CardSwap, { Card } from './CardSwap'
import TextPressure from './TextPressure'

const phases = [
  {
    title: 'Phase 1: Models Working',
    status: 'Now',
    icon: <CheckCircle2 size={22} className="text-emerald-500" />,
    borderColor: 'border-emerald-500/40',
    bgColor: 'from-emerald-500/10 to-emerald-500/5',
    accentColor: 'text-emerald-400',
    bullets: [
      '✅ LSTM trained and tested',
      '✅ RL agent working on data',
      '✅ XGBoost ETA model running',
      '🔧 Current: Integration + demo'
    ]
  },
  {
    title: 'Phase 2: Test with Real City',
    status: 'Next',
    icon: <FlaskConical size={22} className="text-blue-500" />,
    borderColor: 'border-blue-500/40',
    bgColor: 'from-blue-500/10 to-blue-500/5',
    accentColor: 'text-blue-400',
    bullets: [
      'Need to work with a transport authority',
      'Deploy on 100-200 buses',
      'See if it actually helps in real conditions',
      'Learn what we got wrong'
    ]
  },
  {
    title: 'Phase 3: Scale to More Cities',
    status: 'Future',
    icon: <Map size={22} className="text-purple-500" />,
    borderColor: 'border-purple-500/40',
    bgColor: 'from-purple-500/10 to-purple-500/5',
    accentColor: 'text-purple-400',
    bullets: [
      'Build once, deploy to 10+ cities',
      'Each city gets custom trained models',
      'Open-source the code'
    ]
  }
]

export default function RoadmapSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="roadmap" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0f1419] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Split Layout: Left heading + Right CardSwap */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* Left side — Heading */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-8"
          >
            {/* TextPressure Title */}
            <div className="w-full" style={{ position: 'relative', height: '120px' }}>
              <TextPressure
                text="Building"
                flex
                alpha={false}
                stroke={false}
                width
                weight
                italic
                textColor="#ffffff"
                strokeColor="#22d3ee"
                minFontSize={36}
              />
            </div>

            <p className="text-lg text-gray-400 font-medium max-w-md">
              Honest roadmap. No promises we can't keep. Here's exactly where we are and where we're going.
            </p>

            <div className="flex flex-col gap-4 w-full max-w-sm">
              {phases.map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <div className={`p-2 rounded-lg bg-white/5 border border-white/5`}>
                    {phase.icon}
                  </div>
                  <div>
                    <span className={`text-sm font-bold ${phase.accentColor}`}>{phase.status}</span>
                    <p className="text-xs text-gray-500">{phase.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side — CardSwap */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 flex items-center justify-center"
          >
            <div style={{ height: '520px', width: '100%', maxWidth: '480px', position: 'relative' }}>
              <CardSwap
                cardDistance={50}
                verticalDistance={60}
                delay={5000}
                pauseOnHover={true}
                width={420}
                height={380}
              >
                {phases.map((phase, i) => (
                  <Card key={i}>
                    <div className={`h-full w-full bg-gradient-to-br ${phase.bgColor} p-8 flex flex-col border ${phase.borderColor} rounded-2xl`}>
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-[#151b22] rounded-xl border border-white/5">
                          {phase.icon}
                        </div>
                        <span className={`text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-full bg-white/5 ${phase.accentColor}`}>
                          {phase.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-5 uppercase tracking-wider leading-tight">
                        {phase.title}
                      </h3>

                      <ul className="space-y-3 flex-1">
                        {phase.bullets.map((b, idx) => (
                          <li key={idx} className="text-sm font-medium text-gray-300 flex items-start gap-2">
                            <span className="text-gray-600 mt-0.5">→</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
