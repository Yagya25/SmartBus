import { motion } from 'framer-motion'
import KPICards from './KPICards'
import BorderGlow from './BorderGlow'
import ShinyText from './ShinyText'
import BlurText from './BlurText'

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 -z-20" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/3 rounded-full blur-3xl -z-10" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8">

        {/* Indian Tagline in BorderGlow */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#0a0a14"
            borderRadius={20}
            glowRadius={30}
            glowIntensity={1}
            coneSpread={25}
            animated={false}
            colors={['#22d3ee', '#a78bfa', '#f472b6']}
          >
            <div className="px-8 py-5 flex items-center justify-center gap-3">
              <p className="text-lg sm:text-xl font-bold text-white text-center">
                Built <span className="text-cyan-400">FOR</span> Indian cities, not adapted <span className="text-red-400">FROM</span> Silicon Valley.
              </p>
            </div>
          </BorderGlow>
        </motion.div>

        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-medium tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <ShinyText text="✨ Built for Indian Cities" speed={3} color="#22d3ee" shineColor="#ffffff" spread={120} />
        </motion.div>

        {/* Title with ShinyText */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            <ShinyText text="SmartBus" speed={2} color="#b5b5b5" shineColor="#ffffff" spread={120}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold gradient-text" />
            <br />
            <ShinyText text="Predictive Transit Engine" speed={3} delay={0.5} color="#e0e0e0" shineColor="#ffffff" spread={120}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white" />
          </h1>
        </motion.div>

        {/* Subheading with BlurText */}
        <BlurText
          text="An LSTM and RL-based engine that predicts demand with 94% historical accuracy, reroutes around breakdowns in seconds, and provides ±60s ETAs."
          delay={80}
          animateBy="words"
          direction="top"
          className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl leading-relaxed"
          stepDuration={0.4}
        />

        {/* KPI Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.2 }} className="w-full mt-8">
          <KPICards />
        </motion.div>
      </div>
    </section>
  )
}
