import { useState, useEffect, useRef } from 'react'
import Map, { Marker } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Play, Pause, Activity, Zap, Shield, Bus } from 'lucide-react'
import { motion } from 'framer-motion'
import BorderGlow from './BorderGlow'

const NUM_BUSES = 60

const satelliteStyle = {
  version: 8,
  sources: { satellite: { type: "raster", tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"], tileSize: 256 } },
  layers: [{ id: "satellite-layer", type: "raster", source: "satellite", minzoom: 0, maxzoom: 19 }]
}

export default function DashboardDemo({ userContext }) {
  const cityName = userContext?.fromLoc || 'Bangalore'
  const mapCenter = userContext?.center || [77.5946, 12.9716]
  const [buses, setBuses] = useState([])
  const [isPlaying, setIsPlaying] = useState(true)
  const [incidentBusId, setIncidentBusId] = useState(null)
  const [rescueBusId, setRescueBusId] = useState(null)
  const mapRef = useRef(null)

  useEffect(() => {
    const newBuses = Array.from({ length: NUM_BUSES }).map((_, i) => {
      const lng = mapCenter[0] + (Math.random() - 0.5) * 0.15
      const lat = mapCenter[1] + (Math.random() - 0.5) * 0.15
      const dx = (Math.random() - 0.5) * 0.00004
      const dy = (Math.random() - 0.5) * 0.00004
      const r = Math.random()
      const status = r > 0.9 ? 'crowded' : r > 0.6 ? 'normal' : 'sparse'
      return { id: i, lng, lat, dx, dy, status }
    })
    setBuses(newBuses)
  }, [mapCenter[0], mapCenter[1]])

  useEffect(() => {
    if (mapRef.current) mapRef.current.flyTo({ center: mapCenter, zoom: 12.5, duration: 3500, essential: true })
  }, [mapCenter[0], mapCenter[1]])

  useEffect(() => {
    if (!isPlaying || buses.length === 0) return
    let frame; let lastTime = performance.now()
    const animate = (time) => {
      const delta = (time - lastTime) / 16; lastTime = time
      setBuses((prev) => prev.map(bus => {
        if (bus.id === incidentBusId) return bus
        let { lng, lat, dx, dy } = bus
        if (bus.id === rescueBusId) {
          const bBus = prev.find(b => b.id === incidentBusId)
          if (bBus) { const diffX = bBus.lng - bus.lng; const diffY = bBus.lat - bus.lat; const dist = Math.sqrt(diffX*diffX + diffY*diffY); if (dist > 0.002) { dx = (diffX/dist)*0.00008; dy = (diffY/dist)*0.00008 } else { dx = 0; dy = 0 } }
        }
        lng += dx * delta; lat += dy * delta
        if (bus.id !== rescueBusId && Math.abs(lng - mapCenter[0]) > 0.1) dx *= -1
        if (bus.id !== rescueBusId && Math.abs(lat - mapCenter[1]) > 0.1) dy *= -1
        return { ...bus, lng, lat, dx, dy }
      }))
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isPlaying, incidentBusId, rescueBusId, mapCenter[0], mapCenter[1], buses.length])

  const triggerIncident = () => {
    const brokenBusIndex = Math.floor(Math.random() * buses.length)
    const bus = buses[brokenBusIndex]
    let rBus = null; let minDist = Infinity
    buses.forEach(b => { if (b.id !== bus.id) { const d = Math.sqrt(Math.pow(b.lng-bus.lng,2)+Math.pow(b.lat-bus.lat,2)); if (d < minDist) { minDist = d; rBus = b } } })
    setIncidentBusId(bus.id); setRescueBusId(rBus.id)
    setTimeout(() => { setIncidentBusId(null); setRescueBusId(null) }, 15000)
  }

  return (
    <section id="dashboard" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-navy-900 border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-[#0a0f14] to-navy-900 -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center gap-4">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Activity size={16} /> LIVE DASHBOARD
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">SmartBus Control Center</h2>
          <p className="text-lg text-gray-400 max-w-2xl font-medium tracking-wide">
            Real satellite telemetry from 60+ active buses operating across the {cityName} transit grid.
          </p>
        </div>

        {/* Map */}
        <div className="w-full max-w-5xl mb-12">
          <div className="w-full h-[550px] rounded-3xl overflow-hidden border border-white/10 relative shadow-[0_0_60px_rgba(0,0,0,0.5)]">
            <Map
              ref={mapRef}
              initialViewState={{ longitude: mapCenter[0], latitude: mapCenter[1], zoom: 12.5 }}
              mapStyle={satelliteStyle}
              interactive={true}
              scrollZoom={true}
              dragPan={true}
              dragRotate={true}
              doubleClickZoom={true}
              touchZoomRotate={true}
            >
              {buses.map((bus) => {
                const isBroken = bus.id === incidentBusId
                const isRescue = bus.id === rescueBusId
                return (
                  <Marker key={bus.id} longitude={bus.lng} latitude={bus.lat}>
                    <div className={`relative flex flex-col items-center ${isBroken || isRescue ? 'z-50' : 'z-10'}`}>
                      <span className={`text-xl transition-all ${isBroken ? 'grayscale filter hue-rotate-180 brightness-150 scale-150 drop-shadow-[0_0_15px_rgba(239,68,68,1)] z-50' : isRescue ? 'drop-shadow-[0_0_15px_rgba(34,211,238,1)] scale-125 z-40' : 'opacity-90 drop-shadow-md'}`}>
                        🚌
                      </span>
                      {isBroken && <span className="absolute top-6 text-[10px] font-black text-white bg-red-600 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(239,68,68,0.8)] uppercase animate-pulse">Breakdown</span>}
                      {isRescue && <span className="absolute top-6 text-[10px] font-black text-navy-900 bg-cyan-400 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(34,211,238,0.8)] uppercase animate-pulse">Rescue</span>}
                    </div>
                  </Marker>
                )
              })}
            </Map>
            {/* Map controls overlay */}
            <div className="absolute top-5 left-5 flex gap-3">
              <button onClick={() => setIsPlaying(!isPlaying)} className="w-12 h-12 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 shadow-xl transition-all hover:scale-105">
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
            </div>
            <div className="absolute top-5 right-5 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2 animate-pulse" />
              Live • {cityName}
            </div>
          </div>
        </div>

        {/* Bottom Stats & Chaos Button */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <BorderGlow edgeSensitivity={30} glowColor="40 80 80" backgroundColor="#0a0f14" borderRadius={20} glowRadius={25} glowIntensity={0.8} colors={['#22d3ee', '#60a5fa', '#a78bfa']}>
            <div className="p-8 flex flex-col items-center justify-center text-center">
              <Bus className="w-8 h-8 text-cyan-400 mb-3" />
              <div className="text-5xl font-black text-white font-mono">{60 - (incidentBusId !== null ? 1 : 0)}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-3">Active Fleet</div>
            </div>
          </BorderGlow>

          <div className="flex flex-col items-center justify-center">
            <motion.button
              onClick={triggerIncident}
              disabled={!!incidentBusId}
              whileHover={!incidentBusId ? { scale: 1.05 } : {}}
              whileTap={!incidentBusId ? { scale: 0.95 } : {}}
              className={`w-full py-6 px-8 rounded-2xl font-extrabold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                incidentBusId
                ? 'bg-red-500/10 text-red-400 border-2 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)]'
                : 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-[0_0_40px_rgba(239,68,68,0.4)] hover:shadow-[0_0_60px_rgba(239,68,68,0.6)] border-0'
              }`}
            >
              <Zap className="w-5 h-5" />
              {incidentBusId ? 'Rescue in Progress...' : 'Inject Chaos Event'}
            </motion.button>
            <p className="text-[10px] text-gray-600 mt-3 uppercase tracking-widest font-bold">Simulate a real bus breakdown</p>
          </div>

          <BorderGlow edgeSensitivity={30} glowColor="40 80 80" backgroundColor="#0a0f14" borderRadius={20} glowRadius={25} glowIntensity={0.8} colors={['#34d399', '#22d3ee', '#60a5fa']}>
            <div className="p-8 flex flex-col items-center justify-center text-center">
              <Shield className="w-8 h-8 text-emerald-400 mb-3" />
              <div className="text-5xl font-black text-emerald-400 font-mono">99.8%</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-3">System Uptime</div>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  )
}
