export default function Footer() {
  return (
    <footer className="bg-[#0f1419] py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-10">
        
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <span className="text-xl">🚌</span>
            </div>
            <span className="text-3xl font-black tracking-tight text-white">SmartBus<span className="text-cyan-400">.ai</span></span>
          </div>
        </div>

        {/* Hackathon Description */}
        <div className="bg-[#151b22] border border-white/5 rounded-3xl p-8 sm:p-10 text-gray-400 w-full glass-card leading-relaxed">
          <p className="mb-6 text-lg text-white font-medium">
            This project is built by <span className="text-cyan-400 font-bold">Team AY</span><br />
            for the <span className="text-white font-bold tracking-wide">HackOlympus</span> hackathon.
          </p>

          <p className="mb-6 text-sm sm:text-base">
            We're solving the real problem of unpredictable transit<br/>
            using LSTM demand prediction, RL route optimization,<br/>
            and XGBoost ETA engines.
          </p>

          <p className="text-sm sm:text-base mb-8">
            All code is open-source on GitHub.<br/>
            All models are trained on real data.<br/>
            Everything here is honest and working.
          </p>

        <a 
            href="https://github.com/Yagya25/SmartBus" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 4.05 5.04 5.04 0 0 0 19 2a5.04 5.04 0 0 0-3 1.1A10.8 10.8 0 0 0 12 3a10.8 10.8 0 0 0-3-.1A5.04 5.04 0 0 0 6 2s-1.8 0-3 1.1A5.04 5.04 0 0 0 3 4.05 5.44 5.44 0 0 0 1 8.98c0 5.45 3.3 6.64 6.44 7A4.8 4.8 0 0 0 6.5 19v3"></path>
            </svg>
            View Source Code
          </a>
        </div>

        {/* Copyright */}
        <div className="text-gray-600 text-xs font-medium uppercase tracking-widest mt-4">
          © {new Date().getFullYear()} Team AY. Built for HackOlympus.
        </div>
      </div>
    </footer>
  )
}
