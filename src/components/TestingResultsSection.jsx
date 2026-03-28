import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle, CloudOff, Radio } from 'lucide-react'
import Carousel from './Carousel'
import DecryptedText from './DecryptedText'

const limitations = [
  {
    id: 1,
    title: 'Not Deployed Live Yet',
    description: 'The models work on historical data and simulated environments. We haven\'t deployed to real buses on real roads yet — that\'s the next milestone.',
    icon: <AlertTriangle className="carousel-icon" style={{ color: '#f59e0b' }} />
  },
  {
    id: 2,
    title: 'Not Tested with City Ops',
    description: 'We\'ve validated with datasets, not with actual transit authority operations. Real-world conditions (weather, strikes, festivals) remain untested.',
    icon: <CloudOff className="carousel-icon" style={{ color: '#f59e0b' }} />
  },
  {
    id: 3,
    title: 'No Real GPS Hardware Yet',
    description: 'Currently using simulated GPS feeds. Integration with ₹500/unit GPS modules on actual buses is the next engineering challenge.',
    icon: <Radio className="carousel-icon" style={{ color: '#f59e0b' }} />
  }
]

export default function TestingResultsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="testing" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#111822] border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03),transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 flex flex-col items-center gap-5"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold tracking-widest uppercase">
            <AlertTriangle size={14} /> Transparency
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            <DecryptedText
              text="Honest Limitations"
              animateOn="view"
              speed={40}
              maxIterations={12}
              sequential
              revealDirection="start"
              className="text-white"
              encryptedClassName="text-amber-500/60"
            />
          </h2>

          <p className="text-lg text-gray-400 font-medium max-w-xl">
            We believe in transparency. Drag or click to see what we're still working on.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center w-full"
        >
          <Carousel
            items={limitations}
            baseWidth={420}
            autoplay={true}
            autoplayDelay={4000}
            pauseOnHover={true}
            loop={true}
          />
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-sm text-gray-600 mt-12 text-center font-medium italic"
        >
          Being honest about limitations makes us stronger, not weaker.
        </motion.p>
      </div>
    </section>
  )
}
