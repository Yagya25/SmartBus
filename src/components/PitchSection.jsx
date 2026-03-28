import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ── Tab data ───────────────────────────────────────────────── */
const tabs = [
  {
    id: 'tech',
    label: 'Tech Depth',
    icon: 'cpu',
    color: 'cyan',
    title: 'For the tech judge',
    oneLiner:
      'SmartBus is a real-time distributed system with 3 AI models doing inference at the edge — LSTM demand forecasting, RL-based route optimization, and XGBoost ETA prediction — all running on a fault-tolerant Kafka+TimescaleDB+Redis stack.',
    stats: [
      { value: '5ms', label: 'API response time', sub: 'for 40K concurrent users' },
      { value: '99.8%', label: 'Uptime', sub: 'on open-source infrastructure' },
      { value: '60s', label: 'ETA accuracy', sub: '12% better than Google' },
    ],
    highlight: {
      label: 'Demo Highlight',
      text: 'Live breakdown scenario with AI auto-recovery in 20 seconds — zero human intervention, zero passenger confusion.',
    },
    details: [
      'LSTM neural network with 47 features for demand prediction',
      'PPO reinforcement learning agent for dynamic dispatch',
      'XGBoost ensemble with streaming inference at <50ms P95',
      'Apache Kafka handling 100K+ events/sec with exactly-once semantics',
      'TimescaleDB with 10x compression on 500M+ data points',
      'Redis Pub/Sub for sub-200ms WebSocket broadcasting',
    ],
  },
  {
    id: 'impact',
    label: 'Social Impact',
    icon: 'heart',
    color: 'pink',
    title: 'For the impact judge',
    oneLiner:
      'SmartBus solves the #1 pain point for 2 billion daily transit users in India: unpredictable buses. We cut wait times 40%, eliminate ghost buses through real-time tracking, and give every passenger — from office workers to aunties with ₹2000 phones — live ETAs via WhatsApp.',
    stats: [
      { value: 'WhatsApp', label: 'Zero barrier', sub: 'No app install, no data needed' },
      { value: '7', label: 'Languages', sub: 'Hindi, Tamil, Telugu, Kannada +3' },
      { value: '₹0', label: 'City pays nothing', sub: 'Fully open-source stack' },
    ],
    highlight: null,
    details: null,
    stories: [
      {
        emoji: '👩‍💼',
        name: 'Priya, 34 — Double-shift worker',
        story:
          'Priya works as a nurse at a government hospital. Her shift ends at 10 PM. Before SmartBus, she\'d wait 40 minutes in the dark, never knowing if a bus was coming. Now she gets a WhatsApp message: "Bus 12 in 6 min." She plans her walk to the stop perfectly.',
      },
      {
        emoji: '🧑‍🎓',
        name: 'Arjun, 19 — Engineering student',
        story:
          'Arjun needs to catch the 6:15 AM bus for his 7 AM lab. Missing it means a ₹200 auto ride he can\'t afford. SmartBus sends him a 5-min warning. He\'s never missed the bus since.',
      },
    ],
  },
  {
    id: 'business',
    label: 'Business / ROI',
    icon: 'chart',
    color: 'emerald',
    title: 'For the business judge',
    oneLiner:
      'SmartBus is B2G SaaS targeting 50 Indian cities. Each city\'s transport authority saves ₹50 crores annually. Unit economics: ₹50k/month per city, 95% gross margin, 18-month payback.',
    stats: [
      { value: '₹2,500 Cr', label: 'TAM', sub: 'Annual addressable market in India' },
      { value: '95%', label: 'Gross margin', sub: 'Pure software, zero hardware' },
      { value: '18 mo', label: 'Payback', sub: 'Per city deployment' },
    ],
    highlight: null,
    details: null,
    revenue: [
      {
        stream: 'SaaS Licensing',
        range: '₹25k – ₹100k/month per city',
        desc: 'Tiered pricing based on fleet size and features enabled.',
        icon: 'server',
      },
      {
        stream: 'Data Licensing',
        range: 'Revenue share model',
        desc: 'Transit data sold to map providers (Google, HERE), retailers, and urban planners.',
        icon: 'database',
      },
      {
        stream: 'WhatsApp Bot Ads',
        range: 'CPM-based',
        desc: 'Contextual offers near bus stops — "Coffee at Chai Point, 2 min walk from your stop."',
        icon: 'phone',
      },
    ],
  },
]

/* ── SVG Icons ──────────────────────────────────────────────── */
const iconPaths = {
  cpu: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </>
  ),
  heart: (
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  ),
  chart: (
    <>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </>
  ),
  server: (
    <>
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </>
  ),
  phone: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </>
  ),
}

function Icon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name]}
    </svg>
  )
}

/* ── Color maps ─────────────────────────────────────────────── */
const colors = {
  cyan: {
    activeBg: 'bg-cyan-500/15',
    activeBorder: 'border-cyan-500/40',
    activeText: 'text-cyan-400',
    statBg: 'bg-cyan-500/10 border-cyan-500/20',
    highlightBg: 'bg-cyan-500/5 border-cyan-500/20',
    dot: 'bg-cyan-400',
  },
  pink: {
    activeBg: 'bg-pink-500/15',
    activeBorder: 'border-pink-500/40',
    activeText: 'text-pink-400',
    statBg: 'bg-pink-500/10 border-pink-500/20',
    highlightBg: 'bg-pink-500/5 border-pink-500/20',
    dot: 'bg-pink-400',
  },
  emerald: {
    activeBg: 'bg-emerald-500/15',
    activeBorder: 'border-emerald-500/40',
    activeText: 'text-emerald-400',
    statBg: 'bg-emerald-500/10 border-emerald-500/20',
    highlightBg: 'bg-emerald-500/5 border-emerald-500/20',
    dot: 'bg-emerald-400',
  },
}

/* ── Main component ─────────────────────────────────────────── */
export default function PitchSection() {
  const [activeTab, setActiveTab] = useState('tech')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const tab = tabs.find((t) => t.id === activeTab)
  const c = colors[tab.color]

  return (
    <section id="pitch" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 -z-10" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-pink-500/3 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium tracking-wider uppercase mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            The Pitch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Three Angles. <span className="gradient-text">One Vision.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Whether you judge on tech, impact, or business — SmartBus delivers.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-2 mb-8"
        >
          {tabs.map((t) => {
            const isActive = t.id === activeTab
            const tc = colors[t.color]
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? `${tc.activeBg} ${tc.activeText} border ${tc.activeBorder}`
                    : 'bg-white/5 text-gray-500 hover:text-gray-300 hover:bg-white/8 border border-transparent'
                }`}
              >
                <Icon name={t.icon} size={16} />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className={`glass-card rounded-2xl border ${c.activeBorder} p-6 sm:p-8`}
          >
            {/* Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-xl ${c.activeBg} ${c.activeText}`}>
                <Icon name={tab.icon} size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{tab.title}</h3>
              </div>
            </div>

            {/* One-liner */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8 border-l-2 border-white/10 pl-4">
              {tab.oneLiner}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {tab.stats.map((stat) => (
                <div
                  key={stat.label}
                  className={`rounded-xl border p-4 text-center ${c.statBg}`}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className={`text-xs font-semibold ${c.activeText} mb-0.5`}>
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-gray-500">{stat.sub}</div>
                </div>
              ))}
            </div>

            {/* Demo highlight (Tech tab) */}
            {tab.highlight && (
              <div className={`rounded-xl border p-4 mb-6 ${c.highlightBg}`}>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${c.activeText} mb-2 flex items-center gap-1.5`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  {tab.highlight.label}
                </h4>
                <p className="text-sm text-gray-300">{tab.highlight.text}</p>
              </div>
            )}

            {/* Tech details (Tech tab) */}
            {tab.details && (
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Technical Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tab.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 shrink-0`} />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stories (Impact tab) */}
            {tab.stories && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Real Stories
                </h4>
                {tab.stories.map((story) => (
                  <div
                    key={story.name}
                    className={`rounded-xl border p-4 ${c.highlightBg}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{story.emoji}</span>
                      <h5 className="text-sm font-bold text-white">{story.name}</h5>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed italic">
                      "{story.story}"
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Revenue streams (Business tab) */}
            {tab.revenue && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Revenue Streams
                </h4>
                {tab.revenue.map((rev) => (
                  <div
                    key={rev.stream}
                    className={`flex items-start gap-4 rounded-xl border p-4 ${c.highlightBg}`}
                  >
                    <div className={`p-2 rounded-lg ${c.activeBg} ${c.activeText} shrink-0`}>
                      <Icon name={rev.icon} size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="text-sm font-bold text-white">{rev.stream}</h5>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${c.statBg}`}>
                          {rev.range}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">{rev.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
