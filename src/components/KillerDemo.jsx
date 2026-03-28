import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Map, { Marker } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import BorderGlow from './BorderGlow'
import DecryptedText from './DecryptedText'

const SCRIPT = [
  { ms: 0, phase: 0 },
  { ms: 500, phase: 1 },
  { ms: 3500, phase: 2 },
  { ms: 8500, phase: 3 },
  { ms: 12500, phase: 4 },
  { ms: 20500, phase: 5 },
]

const timelineEntries = [
  { time: 'T+0s', label: 'Bus 42 stops moving', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', icon: '🛑' },
  { time: 'T+3s', label: 'System detects breakdown', color: 'text-white', bg: 'bg-white/5', border: 'border-white/10', icon: '🔍' },
  { time: 'T+8s', label: 'AI reroutes to 42A/B', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', icon: '🧠' },
  { time: 'T+12s', label: 'Capacity check passed', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: '✅' },
  { time: 'T+20s', label: 'SMS sent to passengers', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: '📲' },
]

function LiveMap({ phase, center }) {
  const [buses, setBuses] = useState([])
  const mapRef = useRef(null)

  useEffect(() => {
    const newBuses = Array.from({ length: 25 }).map((_, i) => ({
      id: `bus-${i}`, lng: center[0] + (Math.random() - 0.5) * 0.1, lat: center[1] + (Math.random() - 0.5) * 0.1,
      dx: (Math.random() - 0.5) * 0.00004, dy: (Math.random() - 0.5) * 0.00004, isRescue: i === 1 || i === 2
    }))
    setBuses(newBuses)
  }, [center[0], center[1]])

  useEffect(() => { if (mapRef.current) mapRef.current.flyTo({ center, zoom: 13, duration: 2000 }) }, [center[0], center[1]])

  useEffect(() => {
    let frame
    const animate = () => {
      setBuses(prev => prev.map(b => {
        if (phase >= 1 && b.id === 'bus-0') return { ...b, dx: 0, dy: 0 }
        let { lng, lat, dx, dy } = b
        if (phase >= 3 && b.isRescue) {
          const bBus = prev.find(bx => bx.id === 'bus-0')
          if (bBus) { const diffX = bBus.lng-lng; const diffY = bBus.lat-lat; const dist = Math.sqrt(diffX*diffX+diffY*diffY); if (dist > 0.005) { dx=(diffX/dist)*0.00008; dy=(diffY/dist)*0.00008 } else { dx=0;dy=0 } }
        }
        lng += dx; lat += dy
        if (!b.isRescue && Math.abs(lng-center[0]) > 0.1) dx *= -1
        if (!b.isRescue && Math.abs(lat-center[1]) > 0.1) dy *= -1
        return { ...b, lng, lat, dx, dy }
      }))
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [phase, center[0], center[1]])

  return (
    <div className="w-full h-[550px] relative rounded-[40px] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] bg-navy-900">
      <Map ref={mapRef}
        initialViewState={{ longitude: center[0], latitude: center[1], zoom: 13 }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        interactive={true} scrollZoom={true} dragPan={true} dragRotate={true} doubleClickZoom={true} touchZoomRotate={true}
      >
        {buses.map((bus) => {
          const isBroken = bus.id === 'bus-0'
          const isRescue = bus.isRescue
          return (
            <Marker key={bus.id} longitude={bus.lng} latitude={bus.lat}>
              <div className="relative flex flex-col items-center">
                <span className={`text-3xl transition-all ${isBroken && phase >= 1 ? 'grayscale hue-rotate-180 brightness-150 scale-150 drop-shadow-[0_0_20px_rgba(239,68,68,1)] z-50' : isRescue && phase >= 3 ? 'drop-shadow-[0_0_20px_rgba(34,211,238,1)] scale-125 z-40' : 'opacity-80'}`}>
                  🚌
                </span>
                {isBroken && phase >= 1 && <span className="absolute top-10 whitespace-nowrap bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded shadow-2xl z-50 uppercase animate-pulse">Breakdown</span>}
                {isRescue && phase >= 3 && <span className="absolute top-10 whitespace-nowrap bg-cyan-400 text-navy-900 text-[10px] font-black px-3 py-1 rounded shadow-2xl z-40 uppercase animate-pulse">Rescue Route</span>}
              </div>
            </Marker>
          )
        })}
      </Map>
      <div className="absolute top-8 right-8 px-6 py-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
        Live Telemetry Feed
      </div>
    </div>
  )
}

export default function KillerDemo({ userContext }) {
  const [playing, setPlaying] = useState(false)
  const [phase, setPhase] = useState(0)
  const center = userContext?.center || [77.5946, 12.9716]
  const timerRef = useRef([])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const reset = () => { timerRef.current.forEach(clearTimeout); timerRef.current = []; setPlaying(false); setPhase(0) }
  const play = () => { reset(); setPlaying(true); SCRIPT.forEach(step => { timerRef.current.push(setTimeout(() => setPhase(step.phase), step.ms)) }) }
  const loads = phase >= 4 ? { a: 85, b: 64 } : { a: 72, b: 45 }

  return (
    <section id="demo" className="relative py-40 px-4 sm:px-6 lg:px-8 bg-[#0f1419] border-t border-white/5 overflow-hidden">
      {/* Deep decorative center light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-cyan-500/5 blur-[150px] -z-10" />

      <div className="max-w-5xl mx-auto flex flex-col items-center" ref={ref}>
        {/* Header - Perfectly Centered Vertical Stack */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-24 flex flex-col items-center gap-8">
          <span className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-red-500/10 border-2 border-red-500/20 text-red-400 text-[10px] font-black tracking-[0.3em] uppercase shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            LIVE SYSTEM STRESS TEST
          </span>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight">
            <DecryptedText text="Simulation Control" animateOn="view" speed={35} maxIterations={12} className="text-white" encryptedClassName="text-red-500/60" />
          </h2>
          <p className="text-xl sm:text-2xl text-gray-400 font-medium tracking-wide max-w-3xl leading-relaxed">
            Witness our RL-agents handle a catastrophic bus breakdown. Rerouting happens in seconds, keeping {userContext?.fromLoc || 'the city'} moving.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-8">
             <motion.button
                onClick={playing ? reset : play}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`px-16 py-6 font-black text-sm rounded-[24px] shadow-2xl uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 border-0 ${playing ? 'bg-white/10 text-gray-400' : 'bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-[length:200%_auto] animate-gradient text-white shadow-[0_0_60px_rgba(239,68,68,0.4)] hover:shadow-[0_0_80px_rgba(239,68,68,0.6)]'}`}
              >
                {playing ? '↺ RESET SCENARIO' : '⚡ INJECT CHAOS EVENT'}
              </motion.button>
          </div>
        </motion.div>

        {/* Map - Wide and Centered */}
        <div className="w-full mb-24 px-4 lg:px-0">
           <LiveMap phase={phase} center={center} />
        </div>

        {/* Metrics - Centered Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          <BorderGlow edgeSensitivity={30} glowColor="40 80 80" backgroundColor="#0a141a" borderRadius={32} glowRadius={25} glowIntensity={0.8} colors={['#22d3ee', '#60a5fa']}>
            <div className="p-12 flex flex-col items-center text-center">
              <div className="text-xs text-gray-500 uppercase font-black tracking-[0.3em] mb-6">Secondary Node Load</div>
              <div className={`text-7xl lg:text-8xl font-black font-mono tracking-tighter transition-all duration-1000 ${phase >= 4 ? 'text-cyan-400 scale-110 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-gray-300'}`}>{loads.a}%</div>
              <div className="text-xs text-gray-600 font-black mt-8 uppercase tracking-[0.2em]">{phase >= 4 ? 'AUTO-REROUTE SYNCED' : 'NOMINAL DATA STREAM'}</div>
            </div>
          </BorderGlow>
          <BorderGlow edgeSensitivity={30} glowColor="40 80 80" backgroundColor="#0a141a" borderRadius={32} glowRadius={25} glowIntensity={0.8} colors={['#a78bfa', '#f472b6']}>
            <div className="p-12 flex flex-col items-center text-center">
              <div className="text-xs text-gray-500 uppercase font-black tracking-[0.3em] mb-6">Backup System Sync</div>
              <div className={`text-7xl lg:text-8xl font-black font-mono tracking-tighter transition-all duration-1000 ${phase >= 4 ? 'text-cyan-400 scale-110 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-gray-300'}`}>{loads.b}%</div>
              <div className="text-xs text-gray-600 font-black mt-8 uppercase tracking-[0.2em]">{phase >= 4 ? 'LOAD REBALANCED' : 'STANDBY IDLE'}</div>
            </div>
          </BorderGlow>
        </div>

        {/* Timeline - Centered Vertical Progression */}
        <div className="w-full max-w-4xl">
           <div className="bg-[#0c1218] border-2 border-white/5 rounded-[50px] p-16 shadow-[0_0_100px_rgba(0,0,0,0.4)] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-[0.03] select-none pointer-events-none">
                 <span className="text-[200px] font-black leading-none">AI</span>
              </div>
              
              <h4 className="text-sm font-black text-gray-500 uppercase tracking-[0.4em] mb-16 text-center">Autonomous Recovery Engine (ARE)</h4>
              
              <div className="flex flex-col gap-6">
                {timelineEntries.map((entry, i) => (
                  <AnimatePresence key={i}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: phase >= (i + 1) ? 1 : 0.08, y: 0 }}
                      className={`flex items-center gap-8 p-6 rounded-[32px] transition-all duration-1000 border-2 ${phase >= (i + 1) ? entry.border + ' bg-white/[0.03] shadow-xl' : 'border-transparent'}`}
                    >
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${phase >= (i + 1) ? entry.bg : 'bg-transparent border border-white/10'}`}>
                        {entry.icon}
                      </div>
                      <div className="flex-1">
                        <div className={`text-[11px] font-black uppercase tracking-[0.3em] ${phase >= (i + 1) ? entry.color : 'text-gray-700'}`}>{entry.time}</div>
                        <div className={`text-xl font-black mt-2 tracking-tight ${phase >= (i + 1) ? 'text-white' : 'text-gray-800'}`}>{entry.label}</div>
                      </div>
                      {phase >= (i + 1) && (
                        <div className="hidden md:block">
                           <span className="px-5 py-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-black uppercase tracking-widest rounded-full">System Handled</span>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                ))}
              </div>

              <div className="mt-16 flex flex-wrap justify-center gap-6 border-t border-white/5 pt-16">
                 {['No Human Ops', '99.9% Failover', 'SMS Alerts'].map((t, idx) => (
                   <div key={idx} className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 shadow-lg">
                      <span className="text-emerald-500 text-xl">✔</span>
                      <span className="text-xs font-black text-gray-400 tracking-[0.2em] uppercase">{t}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </section>
  )
}
