import { motion } from 'framer-motion'

export default function CTAButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="flex flex-col sm:flex-row items-center gap-4"
    >
      <a
        href="#demo"
        className="group relative px-8 py-3.5 bg-cyan-400 text-navy-900 font-semibold rounded-xl btn-glow text-base inline-flex items-center gap-2 hover:bg-cyan-500 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        Watch Demo
      </a>

      <a
        href="#architecture"
        className="group px-8 py-3.5 text-gray-300 font-semibold rounded-xl btn-outline text-base inline-flex items-center gap-2 hover:text-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        View Architecture
      </a>
    </motion.div>
  )
}
