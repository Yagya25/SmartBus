import { motion, AnimatePresence } from 'framer-motion'

/* ── Detailed component data ────────────────────────────────── */
const componentDetails = {
  'Demand Forecaster': {
    icon: 'brain',
    title: 'LSTM Demand Forecaster',
    tagline: 'Predicts ridership 30 mins ahead with 94% accuracy',
    techStack: ['PyTorch', 'LSTM', 'TimeSeries', 'CUDA', 'Feature Store'],
    description:
      'A 3-layer LSTM neural network trained on 2+ years of historical ridership data across 6,000+ bus stops. The model ingests 47 features including time-of-day, day-of-week, weather conditions, nearby events, and school/office schedules to predict passenger demand at 15-minute intervals.',
    metrics: [
      { label: 'Prediction Accuracy', value: '94%' },
      { label: 'Forecast Window', value: '30 min' },
      { label: 'Retraining Cycle', value: 'Weekly' },
      { label: 'Features Used', value: '47' },
    ],
    integrations: {
      inputs: ['GPS Trackers', 'Passenger Tap-in', 'Weather API', 'Events Calendar'],
      outputs: ['Route Optimizer', 'AI Dispatcher', 'Control Dashboard'],
    },
    example:
      'During Diwali week, the model detected a 4.2x demand surge at temple-adjacent stops 25 minutes before peak, allowing the dispatcher to pre-position 18 additional buses — reducing average wait from 22 min to 6 min.',
  },
  'Route Optimizer': {
    icon: 'route',
    title: 'RL Route Optimizer',
    tagline: 'Re-optimizes every 5 mins for 3x efficiency gain',
    techStack: ['OR-Tools', 'PPO', 'PostGIS', 'Genetic Algorithm', 'Constraint Solver'],
    description:
      'A hybrid reinforcement learning + constraint optimization engine that continuously rewires bus routes across the city. It models the transit network as a graph and solves a multi-objective optimization: minimize total passenger wait time, balance bus loads, and respect operational constraints like driver shifts and fuel limits.',
    metrics: [
      { label: 'Optimization Cycle', value: '5 min' },
      { label: 'Efficiency Gain', value: '3x' },
      { label: 'Routes Managed', value: '400+' },
      { label: 'Avg Wait Reduction', value: '40%' },
    ],
    integrations: {
      inputs: ['Demand Forecaster', 'Traffic Feed', 'Anomaly Detector'],
      outputs: ['AI Dispatcher', 'Driver App', 'Control Dashboard'],
    },
    example:
      'When a water-logging event blocked 3 major routes in Mumbai, the optimizer rerouted 45 buses through alternate corridors within 4 minutes, maintaining 85% on-time performance vs. the usual 30% during flooding.',
  },
  'ETA Predictor': {
    icon: 'clock',
    title: 'XGBoost ETA Predictor',
    tagline: '60-second accuracy — beats Google Maps by 12%',
    techStack: ['XGBoost', 'Feature Store', 'Redis', 'Streaming Inference'],
    description:
      'A gradient-boosted tree ensemble that predicts bus arrival times by combining live GPS telemetry, current traffic conditions, weather, passenger load, and historical travel patterns. The model updates ETAs every 30 seconds per bus, achieving ±60 second accuracy on 89% of predictions.',
    metrics: [
      { label: 'ETA Accuracy', value: '±60s' },
      { label: 'Update Frequency', value: '30 sec' },
      { label: 'vs Google Maps', value: '+12%' },
      { label: 'P95 Latency', value: '<50ms' },
    ],
    integrations: {
      inputs: ['GPS Trackers', 'Traffic Feed', 'Weather API', 'Redis Cache'],
      outputs: ['Passenger App', 'WebSocket Server', 'SMS/Push'],
    },
    example:
      'During morning rush hour on Bangalore\'s Outer Ring Road, the predictor accounts for the 8:45 AM IT-park arrival pattern and adjusts ETAs 4 minutes before Google detects the slowdown, giving passengers time to catch alternative buses.',
  },
  'Apache Kafka': {
    icon: 'stream',
    title: 'Kafka Stream Broker',
    tagline: 'Handles 40K concurrent GPS streams with zero data loss',
    techStack: ['Apache Kafka', 'Avro', 'Schema Registry', 'Kafka Streams', 'ZooKeeper'],
    description:
      'A distributed event streaming platform that serves as the central nervous system of SmartBus. Every GPS ping, tap-in event, weather update, and traffic signal flows through Kafka topics partitioned by city zone. Exactly-once semantics ensure no data is ever lost or duplicated.',
    metrics: [
      { label: 'Concurrent Streams', value: '40K' },
      { label: 'Events/Second', value: '100K+' },
      { label: 'Data Guarantee', value: 'Exactly-once' },
      { label: 'Avg Latency', value: '<10ms' },
    ],
    integrations: {
      inputs: ['GPS Trackers', 'Passenger Tap-in', 'Weather API', 'Traffic Feed'],
      outputs: ['TimescaleDB', 'Demand Forecaster', 'Anomaly Detector', 'Redis Cache'],
    },
    example:
      'When 6,000 buses simultaneously send GPS pings every 5 seconds (1,200 events/sec per zone), Kafka distributes the load across 12 partitions per topic, maintaining sub-10ms end-to-end latency.',
  },
  'TimescaleDB': {
    icon: 'database',
    title: 'TimescaleDB Time-Series Store',
    tagline: 'Stores 6 months of time-series data with 10x compression',
    techStack: ['PostgreSQL', 'TimescaleDB', 'Hypertables', 'Compression', 'Continuous Aggregates'],
    description:
      'A PostgreSQL extension optimized for time-series workloads. Stores every GPS data point, ridership count, and system metric in automatically-chunked hypertables. Continuous aggregates pre-compute hourly/daily rollups, while native compression reduces storage by 10x.',
    metrics: [
      { label: 'Data Retention', value: '6 months' },
      { label: 'Compression Ratio', value: '10x' },
      { label: 'Data Points', value: '500M+' },
      { label: 'Query Latency', value: '<100ms' },
    ],
    integrations: {
      inputs: ['Apache Kafka', 'GPS Trackers', 'Passenger Tap-in'],
      outputs: ['Demand Forecaster', 'ETA Predictor', 'Admin Portal', 'Control Dashboard'],
    },
    example:
      'A city planner queries 3 months of ridership data for Route 42 across all stops, grouped by hour — the continuous aggregate returns results in 80ms instead of the 12 seconds a raw query would take.',
  },
  'WebSocket Server': {
    icon: 'wifi',
    title: 'WebSocket Real-Time Server',
    tagline: 'Sub-second updates pushed to every passenger',
    techStack: ['Socket.IO', 'Redis Pub/Sub', 'Node.js', 'Clustering', 'Load Balancer'],
    description:
      'A horizontally-scaled WebSocket server cluster that maintains persistent connections with passenger apps, driver apps, and the control dashboard. Uses Redis Pub/Sub for cross-node message broadcasting. Supports graceful reconnection and message queuing for intermittent connections.',
    metrics: [
      { label: 'Concurrent Connections', value: '40K' },
      { label: 'Message Latency', value: '<200ms' },
      { label: 'Uptime SLA', value: '99.9%' },
      { label: 'Server Nodes', value: '8' },
    ],
    integrations: {
      inputs: ['ETA Predictor', 'Route Optimizer', 'Anomaly Detector'],
      outputs: ['Passenger App', 'Driver App', 'Control Dashboard'],
    },
    example:
      'When a bus breaks down, the anomaly detector triggers an event that reaches all 200 affected passengers\' apps within 400ms, showing updated ETAs and alternative bus suggestions.',
  },
}

/* ── SVG Icons ──────────────────────────────────────────────── */
const iconPaths = {
  brain: (
    <>
      <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
      <path d="M9 21h6M10 17v4M14 17v4" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 000-7h-11a3.5 3.5 0 010-7H15" />
      <circle cx="18" cy="5" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  stream: <path d="M21 12H3M21 6H3M21 18H3" />,
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </>
  ),
  wifi: (
    <>
      <path d="M5 12.55a11 11 0 0114.08 0" />
      <path d="M1.42 9a16 16 0 0121.16 0" />
      <path d="M8.53 16.11a6 6 0 016.95 0" />
      <line x1="12" y1="20" x2="12.01" y2="20" />
    </>
  ),
}

function Icon({ name, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths[name]}
    </svg>
  )
}

/* ── Modal component ────────────────────────────────────────── */
export default function ComponentModal({ componentName, onClose }) {
  const data = componentDetails[componentName]
  if (!data) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-navy-800 border border-cyan-500/30 shadow-2xl shadow-cyan-500/10"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-navy-800/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Icon name={data.icon} size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{data.title}</h3>
                <p className="text-xs text-cyan-400 font-medium">{data.tagline}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="px-6 py-5 space-y-6">
            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {data.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                How It Works
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed">{data.description}</p>
            </div>

            {/* Metrics */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Key Metrics
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {data.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="bg-white/5 rounded-xl p-3 text-center border border-white/5"
                  >
                    <div className="text-xl font-bold text-white">{m.value}</div>
                    <div className="text-[10px] text-gray-500 font-medium mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration Points */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Integration Points
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Inputs */}
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                    <span className="text-xs font-bold text-emerald-400 uppercase">Data In</span>
                  </div>
                  <div className="space-y-1">
                    {data.integrations.inputs.map((inp) => (
                      <div key={inp} className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        {inp}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Outputs */}
                <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                    <span className="text-xs font-bold text-purple-400 uppercase">Data Out</span>
                  </div>
                  <div className="space-y-1">
                    {data.integrations.outputs.map((out) => (
                      <div key={out} className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-purple-500" />
                        {out}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Example */}
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Real-World Example
              </h4>
              <p className="text-sm text-gray-300 leading-relaxed italic">"{data.example}"</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export { componentDetails }
