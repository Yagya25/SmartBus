import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Team data ──────────────────────────────────────────────── */
const team = [
  {
    name: 'Yagya Mishra',
    role: 'Leader',
    bio: 'Leading product vision, architecture, and core engine development to solve the ghost bus problem.',
    expertise: ['AI/ML', 'System Design', 'Full-Stack'],
    color: 'cyan'
  },
  {
    name: 'Akshita Mallick',
    role: 'Member',
    bio: 'Orchestrating AI models, optimizing routing algorithms, and ensuring high-fidelity data processing.',
    expertise: ['Machine Learning', 'Data Science', 'Backend'],
    color: 'emerald'
  }
]

const colorMap = {
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20', hover: 'group-hover:border-cyan-500/50 group-hover:shadow-cyan-500/20' },
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', hover: 'group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/20' },
}

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="team" className="relative py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0f1419]">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center" ref={ref}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium tracking-wider uppercase mb-4">
            Team AY
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Meet the Team Behind <span className="text-cyan-400">SmartBus</span>
          </h2>
          <p className="text-lg text-gray-400 font-medium tracking-wide max-w-2xl leading-relaxed">
            Built for the HackOlympus hackathon.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {team.map((member, i) => {
            const c = colorMap[member.color]
            
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative glass-card rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 border border-white/5 ${c.hover} bg-[#151b22]`}
              >
                {/* Avatar Placeholder */}
                <div className="shrink-0 relative mb-6">
                  <div className={`w-24 h-24 rounded-full ${c.bg} border ${c.border} flex items-center justify-center text-4xl font-black ${c.text} transform group-hover:scale-105 transition-transform duration-300`}>
                    {member.name[0]}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors">{member.name}</h3>
                    <p className={`text-sm font-black tracking-wide uppercase mt-1 ${c.text}`}>{member.role}</p>
                  </div>
                  
                  <p className="text-sm text-gray-400 italic mb-6 leading-relaxed">
                    "{member.bio}"
                  </p>

                  <div className="mt-auto">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-3">Expertise</span>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.expertise.map(skill => (
                        <span key={skill} className={`text-xs font-bold px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 border border-white/5`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
