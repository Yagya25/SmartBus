import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Navigation, ArrowRight, Loader2 } from 'lucide-react'
import Aurora from './Aurora'
import Hyperspeed from './Hyperspeed'

const hyperspeedOptions = {
  distortion: 'turbulentDistortion',
  length: 400, roadWidth: 10, islandWidth: 2, lanesPerRoad: 3, fov: 90, fovSpeedUp: 150, speedUp: 2,
  carLightsFade: 0.4, totalSideLightSticks: 20, lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05, brokenLinesWidthPercentage: 0.1, brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5], lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80], movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2], carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5], carShiftX: [-0.8, 0.8], carFloorSeparation: [0, 5],
  colors: {
    roadColor: 0x080808, islandColor: 0x0a0a0a, background: 0x000000,
    shoulderLines: 0x131318, brokenLines: 0x131318,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3
  }
}

export default function WelcomeScreen({ onEnter }) {
  const [name, setName] = useState('')
  const [fromLoc, setFromLoc] = useState('')
  const [toLoc, setToLoc] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const memoizedOptions = useMemo(() => hyperspeedOptions, [])

  const handleStart = async (e) => {
    e.preventDefault()
    if (!name || !fromLoc || !toLoc) { setError('Please fill all fields.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fromLoc)}&format=json&limit=1`)
      const data = await res.json()
      let center = [77.5946, 12.9716]
      if (data && data.length > 0) center = [parseFloat(data[0].lon), parseFloat(data[0].lat)]
      setTimeout(() => { onEnter({ name, fromLoc, toLoc, center }) }, 3500)
    } catch (err) {
      console.error(err)
      setTimeout(() => { onEnter({ name, fromLoc, toLoc, center: [77.5946, 12.9716] }) }, 3500)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {!loading ? (
          <motion.div key="aurora" className="absolute inset-0 z-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <Aurora colorStops={["#7cff67", "#B19EEF", "#5227FF"]} blend={0.5} amplitude={1.0} speed={1} />
          </motion.div>
        ) : (
          <motion.div key="hyperspeed" className="absolute inset-0 z-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Hyperspeed effectOptions={memoizedOptions} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!loading ? (
          <motion.div key="form" initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="relative z-10 w-full max-w-xl mx-4">
            <div className="bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-14 sm:p-20">
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-16">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-10 shadow-lg shadow-cyan-500/30">
                  <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-white">
                    <path d="M4 16C4 16 7.5 14 12 14C16.5 14 20 16 20 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 14V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="16" width="20" height="4" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M6 20V22M18 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h1 className="text-5xl font-extrabold text-white mb-4">
                  Welcome to <span className="gradient-text">SmartBus</span>
                </h1>
                <p className="text-gray-400 text-lg">Initialize your intelligent transit simulation.</p>
              </div>

              {/* Form */}
              <form onSubmit={handleStart} className="space-y-10">
                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm text-center p-4 bg-red-500/10 rounded-xl border border-red-500/20">{error}</motion.div>
                )}

                {/* Name Field - Clean, no icon */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-white text-lg placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium" />
                </div>

                {/* Route Fields - Spacious */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Your Route</label>
                  <div className="relative flex flex-col gap-8 p-8 rounded-2xl border border-white/5 bg-white/5">
                    {/* From */}
                    <div className="relative flex items-center gap-5">
                      <div className="w-8 h-8 rounded-full bg-black/50 border-2 border-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      </div>
                      <div className="flex-1 relative">
                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input type="text" value={fromLoc} onChange={e => setFromLoc(e.target.value)} placeholder="From (e.g., Mumbai, New York)"
                          className="w-full bg-black/30 border border-white/10 rounded-xl pl-5 pr-11 py-4 text-white text-base placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all" />
                      </div>
                    </div>

                    {/* Dotted line connector */}
                    <div className="absolute left-[2.9rem] top-[4.5rem] bottom-[4.5rem] w-px border-l-2 border-dashed border-white/10 hidden sm:block" />

                    {/* To */}
                    <div className="relative flex items-center gap-5">
                      <div className="w-8 h-8 rounded-full bg-black/50 border-2 border-cyan-500 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
                        <Navigation className="w-3.5 h-3.5 text-cyan-500 stroke-[3]" />
                      </div>
                      <div className="flex-1 relative">
                        <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input type="text" value={toLoc} onChange={e => setToLoc(e.target.value)} placeholder="To (e.g., Delhi, London)"
                          className="w-full bg-black/30 border border-white/10 rounded-xl pl-5 pr-11 py-4 text-white text-base placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-6 px-8 rounded-xl transition-all disabled:opacity-70 group shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] text-lg mt-4">
                  Launch Simulation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div key="loading" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }} className="relative z-10 flex flex-col items-center gap-6 text-center">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2">
                Initializing for <span className="gradient-text">{name}</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Mapping route from <span className="text-emerald-400 font-semibold">{fromLoc}</span> to <span className="text-cyan-400 font-semibold">{toLoc}</span>...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
