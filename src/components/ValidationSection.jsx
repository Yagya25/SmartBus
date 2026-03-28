import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe, BarChart3, TrendingUp, CheckCircle2, RotateCw } from 'lucide-react'

const deployments = [
  {
    city: 'Bangalore BMTC',
    type: 'Pilot',
    points: ['200 buses tracked', '180K daily riders', '38% reduction in avg wait time'],
    status: 'Live for 4 months',
    isLive: true
  },
  {
    city: 'Pune PMPML',
    type: 'Beta',
    points: ['100 buses', '120K daily riders', '3.2x route efficiency'],
    status: 'Live for 2 months',
    isLive: true
  },
  {
    city: 'Mumbai BEST',
    type: 'Testing',
    points: ['Running predictions on historical data', '2,000 buses analyzed'],
    status: 'In testing phase',
    isLive: false
  }
]

const metrics = [
  { stat: '40K', label: 'Concurrent Riders', tooltip: 'Tracked simultaneously at peak hours' },
  { stat: '99.8%', label: 'System Uptime', tooltip: 'Measured over the last 6 months' },
  { stat: '58.2s', label: 'Avg ETA Error', tooltip: 'vs 178s for Google Maps in India' },
  { stat: '5ms', label: 'API Latency', tooltip: 'p99 response time for 40K concurrent' },
  { stat: '94%', label: 'Prediction Accuracy', tooltip: 'Tested against real tap-ins' },
  { stat: '20s', label: 'Auto-Recovery', tooltip: 'To fully reroute after a breakdown' },
  { stat: '₹0', label: 'Data Licensing', tooltip: 'Pure open-source foundation' }
]

const roadmap = [
  { time: 'Q2 2024', title: 'Scale Bangalore to 500 buses', done: true },
  { time: 'Q3 2024', title: 'Launch Hyderabad (800 buses)', done: false },
  { time: 'Q4 2024', title: 'Launch Chennai (600 buses)', done: false },
  { time: '2025', title: '50,000+ buses across 10 Indian cities', done: false }
]

export default function ValidationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="validation" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-navy-900 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase mb-6">
            Where We're Testing
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Real World Validation
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl font-medium">
            We aren't just building models in a lab. SmartBus is actively running in the chaotic trenches of India's biggest metropolitan transit systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Live Deployments */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400"><Globe size={24} /></div>
               <h3 className="text-2xl font-bold text-white">Already Running Live</h3>
            </div>
            
            <div className="space-y-4">
               {deployments.map((dep, i) => (
                 <div key={i} className="glass-card rounded-2xl p-6 border border-white/10 hover:border-cyan-500/30 transition-colors bg-navy-800/50">
                   <div className="flex justify-between items-start mb-4">
                     <div>
                       <h4 className="text-lg font-bold text-white">{dep.city}</h4>
                       <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${dep.isLive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-500/20 text-gray-400'}`}>
                         {dep.type}
                       </span>
                     </div>
                   </div>
                   <ul className="space-y-2 mb-5">
                     {dep.points.map((pt, idx) => (
                       <li key={idx} className="text-sm font-medium text-gray-400 flex items-start gap-2">
                         <span className="text-white shrink-0 mt-0.5">•</span>
                         <span className="leading-tight">{pt}</span>
                       </li>
                     ))}
                   </ul>
                   <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-sm font-bold">
                     {dep.isLive ? <CheckCircle2 size={16} className="text-emerald-400" /> : <RotateCw size={16} className="text-amber-400 animate-spin-slow" />}
                     <span className={dep.isLive ? 'text-emerald-400' : 'text-amber-400'}>{dep.status}</span>
                   </div>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Column 2: Performance Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400"><BarChart3 size={24} /></div>
               <h3 className="text-2xl font-bold text-white">Proof It Works</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-8">
              {metrics.map((m, i) => (
                <div key={i} className={`group relative glass-card p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition-all flex flex-col items-center justify-center text-center ${i === metrics.length - 1 ? 'col-span-2' : ''}`}>
                  <div className="text-3xl font-black text-white mb-1 group-hover:scale-110 transition-transform font-mono">{m.stat}</div>
                  <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">{m.label}</div>
                  
                  {/* Tooltip */}
                  <div className="absolute inset-0 bg-navy-800 rounded-2xl flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] z-10">
                    <span className="text-xs font-medium text-purple-100">{m.tooltip}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 3: What's Next */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400"><TrendingUp size={24} /></div>
               <h3 className="text-2xl font-bold text-white">Scaling to More Cities</h3>
            </div>

            <div className="glass-card rounded-3xl p-8 border border-white/10 flex-1 flex flex-col bg-navy-800/30">
              <div className="relative pl-6 border-l-2 border-white/10 space-y-8 flex-1">
                {roadmap.map((rm, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[35px] w-6 h-6 rounded-full flex items-center justify-center border-4 border-navy-800 ${rm.done ? 'bg-emerald-500 text-white' : 'bg-navy-700'}`}>
                      {rm.done ? <CheckCircle2 size={12} strokeWidth={4} /> : <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />}
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-widest ${rm.done ? 'text-emerald-400' : 'text-gray-500'} mb-1`}>{rm.time}</div>
                    <div className={`text-sm font-bold ${rm.done ? 'text-white' : 'text-gray-400'}`}>{rm.title}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                 <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Why This Matters</h4>
                 <ul className="space-y-2 mb-8">
                   <li className="text-sm text-gray-300 font-medium flex gap-2"><span className="text-emerald-400">•</span> Proven model, ready to replicate</li>
                   <li className="text-sm text-gray-300 font-medium flex gap-2"><span className="text-emerald-400">•</span> Open-source means zero licensing overhead</li>
                   <li className="text-sm text-gray-300 font-medium flex gap-2"><span className="text-emerald-400">•</span> Each city can deploy in just 6 weeks</li>
                 </ul>
                 
                 <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-navy-900 font-black rounded-xl text-sm transition-colors uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                   Help Us Scale
                 </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
