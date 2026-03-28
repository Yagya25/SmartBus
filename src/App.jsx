import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProblemSection from './components/ProblemSection'
import ImpactSection from './components/ImpactSection'
import ApproachSection from './components/ApproachSection'
import ComparisonSection from './components/ComparisonSection'
import TestingResultsSection from './components/TestingResultsSection'
import RoadmapSection from './components/RoadmapSection'
import FaqSection from './components/FaqSection'
import DashboardDemo from './components/DashboardDemo'
import FeaturesGrid from './components/FeaturesGrid'
import KillerDemo from './components/KillerDemo'
import TeamSection from './components/TeamSection'
import Footer from './components/Footer'
import WelcomeScreen from './components/WelcomeScreen'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
  const [userContext, setUserContext] = useState(null)

  return (
    <div className="min-h-screen bg-[#0f1419] overflow-x-hidden selection:bg-cyan-500/30">
      <AnimatePresence mode="wait">
        {!userContext ? (
          <WelcomeScreen key="welcome" onEnter={setUserContext} />
        ) : (
          <motion.div key="main" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="w-full">
            <Navbar />
            <HeroSection />
            <RoadmapSection />
            <FeaturesGrid />
            <ProblemSection />
            <ImpactSection />
            <ApproachSection />
            <KillerDemo userContext={userContext} />
            <DashboardDemo userContext={userContext} />
            <TestingResultsSection />
            <ComparisonSection />
            <FaqSection />
            <TeamSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

