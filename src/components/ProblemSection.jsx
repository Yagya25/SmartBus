import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import DecryptedText from './DecryptedText'
import BorderGlow from './BorderGlow'

const problems = [
  {
    title: 'Unpredictable wait times',
    stat: '27 mins',
    statLabel: 'Average wait',
    points: ['People give up', 'Take Uber instead']
  },
  {
    title: 'No real-time tracking',
    stat: '0',
    statLabel: 'Visibility',
    points: ["Can't find where your bus actually is", 'Passengers lose trust in the system']
  },
  {
    title: 'Fixed routes from 1960s',
    stat: '60s',
    statLabel: 'Routing logic',
    points: ['Peak hours: buses overcrowded', 'Off-peak: empty buses running']
  }
]

export default function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="problem" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#0f1419] border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center" ref={ref}>

        {/* Heading with DecryptedText */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center flex flex-col items-center gap-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold tracking-widest uppercase">
            The Problem
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            <DecryptedText
              text="The Ghost Bus Problem"
              animateOn="view"
              speed={40}
              maxIterations={15}
              sequential
              revealDirection="start"
              className="text-white"
              encryptedClassName="text-red-500/70"
            />
          </h2>

          <p className="text-xl text-gray-400 font-medium max-w-2xl">
            40% of Indian transit users don't know when their bus is coming.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mb-20">
          {problems.map((prob, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            >
              <BorderGlow
                edgeSensitivity={30}
                glowColor="0 80 60"
                backgroundColor="#151b22"
                borderRadius={16}
                glowRadius={25}
                glowIntensity={0.8}
                coneSpread={25}
                colors={['#f87171', '#ef4444', '#dc2626']}
              >
                <div className="p-10 flex flex-col items-center text-center">
                  <h3 className="text-xl font-bold text-white mb-8">{prob.title}</h3>

                  <div className="mb-8">
                    <div className="text-5xl font-black text-red-400 uppercase">{prob.stat}</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2">{prob.statLabel}</div>
                  </div>

                  <ul className="space-y-3">
                    {prob.points.map((pt, idx) => (
                      <li key={idx} className="text-sm text-gray-400 font-medium flex items-center gap-2">
                        <span className="text-red-500">✕</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full max-w-2xl"
        >
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#0a0f14"
            borderRadius={20}
            glowRadius={30}
            glowIntensity={1}
            colors={['#22d3ee', '#a78bfa', '#f472b6']}
          >
            <div className="p-10 text-center">
              <h3 className="text-2xl font-black text-white leading-tight">
                This is why cities need <span className="text-cyan-400">smarter software.</span>
              </h3>
              <p className="text-sm text-gray-500 mt-4 font-medium uppercase tracking-widest">
                No fancy claims. Just solving the facts.
              </p>
            </div>
          </BorderGlow>
        </motion.div>
      </div>
    </section>
  )
}
