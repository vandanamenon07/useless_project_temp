import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CornerDownLeft, Sparkles, MapPin, TreePine, Building, GraduationCap, Building2, ArrowRight } from 'lucide-react'

const ENVIRONMENTS = [
  {
    id: 'Village',
    label: 'Village',
    malayalam: 'ഗ്രാമം',
    hint: 'Where everyone knows everyone',
    icon: TreePine,
    accent: '#efb089',
    surveillance: 'Maximum'
  },
  {
    id: 'Town',
    label: 'Town',
    malayalam: 'ചെറുനഗരം',
    hint: 'Curtains twitching on balconies',
    icon: Building,
    accent: '#8dbb7b',
    surveillance: 'High'
  },
  {
    id: 'College',
    label: 'College',
    malayalam: 'ക്യാമ്പസ്',
    hint: 'Canteen judges & hostel rules',
    icon: GraduationCap,
    accent: '#e4b75d',
    surveillance: 'Peer-Pressure'
  },
  {
    id: 'City',
    label: 'City',
    malayalam: 'നഗരം',
    hint: 'Mind your business till WhatsApp rings',
    icon: Building2,
    accent: '#8aa7cf',
    surveillance: 'WhatsApp-Only'
  },
]

const SAMPLE_DECISIONS = [
  "Dye my hair bright pink",
  "Quit IT job to start a tea stall",
  "Love marriage with college friend",
  "Buy a BMW on 7-year EMI",
  "Solo backpacking trip to Goa",
  "Adopt a stray puppy instead of kid"
]

export default function DecisionInput({ onScan, onBack, apiError }) {
  const [decision, setDecision] = useState('')
  const [environment, setEnvironment] = useState('Village')
  const [inputFocused, setInputFocused] = useState(false)

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    if (!decision.trim()) return
    onScan(decision.trim(), environment)
  }

  return (
    <div className="relative min-h-screen w-full bg-[#f3e4cb] text-[#173f30] overflow-hidden flex flex-col justify-between select-none">
      {/* Cinematic Grain Overlay */}
      <div className="grain" />

      {/* Decorative Orbits */}
      <div className="absolute top-[280px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] border border-[#173f30]/10 rounded-full pointer-events-none" />
      <div className="absolute top-[160px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] border border-[#173f30]/5 rounded-full pointer-events-none" />

      {/* Top Bar */}
      <header className="relative z-30 w-full px-6 py-6 md:px-12 md:py-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2.5 text-xs md:text-sm font-black uppercase tracking-wider text-[#173f30] hover:opacity-80 transition-opacity cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#df7046] animate-pulse" />
          <span>THINNAYILE KAARYAM</span>
        </button>

        <span className="text-xs md:text-sm font-bold tracking-wider text-[#173f30]/70 font-syne">
          02 / 03 · THE DECISION DESK
        </span>
      </header>

      {/* Main Container - Requirement 8: Environment selector must be inside same container as input */}
      <motion.main
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 flex-1 max-w-4xl w-full mx-auto px-4 py-4 md:py-8 flex flex-col items-center justify-center text-center"
      >
        <div className="w-full max-w-2xl bg-[#fff8ec]/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border-2 border-[#173f30]/15">
          
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            className="text-[11px] font-extrabold uppercase tracking-widest text-[#173f30] mb-2 block font-syne"
          >
            The Decision Desk
          </motion.span>

          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-[#173f30] leading-tight mb-2">
            Okay… what exactly are you planning?
          </h2>
          <p className="font-syne text-xs sm:text-sm font-bold text-[#df7046] mb-6">
            So, what’s the karyam?
          </p>

          {apiError && (
            <p role="alert" className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-left text-xs font-semibold text-red-800">
              {apiError}
            </p>
          )}

          {/* Decision Search Bar */}
          <form onSubmit={handleSubmit} className="w-full relative mb-6">
            <motion.div 
              animate={{ 
                boxShadow: inputFocused 
                  ? "0 0 0 4px rgba(223, 112, 70, 0.3), 0 10px 25px rgba(23, 63, 48, 0.12)" 
                  : "0 6px 20px rgba(23, 63, 48, 0.08)" 
              }}
              className="w-full flex items-center bg-[#fff8ec] border-2 border-[#173f30] rounded-full px-5 py-3.5 sm:py-4 transition-all"
            >
              <Search className="w-5 h-5 text-[#173f30]/60 mr-3 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                value={decision}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onChange={(e) => setDecision(e.target.value)}
                placeholder="Tell us your decision…"
                className="w-full bg-transparent outline-none text-sm sm:text-base font-semibold text-[#173f30] placeholder-[#173f30]/45"
              />
              {decision && (
                <button
                  type="submit"
                  className="bg-[#173f30] text-[#f7e7cf] p-2 rounded-full hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
                  title="Scan now"
                >
                  <CornerDownLeft className="w-4 h-4" />
                </button>
              )}
            </motion.div>

            {/* Quick Inspiration Chips */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#173f30]/50 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#df7046]" /> Try:
              </span>
              {SAMPLE_DECISIONS.slice(0, 4).map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setDecision(sample)}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#173f30]/5 hover:bg-[#173f30]/10 text-[#173f30] transition-colors border border-[#173f30]/10 cursor-pointer"
                >
                  {sample}
                </button>
              ))}
            </div>
          </form>

          {/* Environment Selection - INSIDE SAME CONTAINER */}
          <div className="w-full mt-6 text-left">
            <div className="flex items-center justify-between mb-3 px-1">
              <label className="text-xs font-black uppercase tracking-wider text-[#173f30]/80 flex items-center gap-1.5 font-syne">
                <MapPin className="w-3.5 h-3.5 text-[#df7046]" />
                Select Environment
              </label>
              <span className="text-[10px] text-[#173f30]/60 font-semibold">
                Where will the tea be spilt?
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {ENVIRONMENTS.map((env) => {
                const IconComponent = env.icon
                const isSelected = environment === env.id

                return (
                  <motion.button
                    key={env.id}
                    type="button"
                    onClick={() => setEnvironment(env.id)}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left ${
                      isSelected
                        ? 'border-[#173f30] bg-[#fff8ec] shadow-lg ring-2 ring-[#df7046]/40'
                        : 'border-[#173f30]/15 bg-white/60 hover:bg-white/90 shadow-sm'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeEnvGlow"
                        className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#df7046] border-2 border-white"
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center shadow-inner"
                        style={{ backgroundColor: env.accent }}
                      >
                        <IconComponent className="w-4 h-4 text-[#173f30]" />
                      </div>
                      <span className="font-malayalam text-xs font-bold text-[#173f30]/70">
                        {env.malayalam}
                      </span>
                    </div>

                    <div>
                      <strong className="block text-xs sm:text-sm font-extrabold text-[#173f30]">
                        {env.label}
                      </strong>
                      <small className="block text-[10px] text-[#173f30]/65 leading-tight line-clamp-2 mt-0.5">
                        {env.hint}
                      </small>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Big SCAN Button */}
          <div className="mt-8 pt-4 border-t border-[#173f30]/10">
            <motion.button
              type="button"
              disabled={!decision.trim()}
              onClick={handleSubmit}
              whileHover={decision.trim() ? { scale: 1.04, y: -2 } : {}}
              whileTap={decision.trim() ? { scale: 0.96 } : {}}
              className={`w-full py-4 rounded-full font-headline font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl transition-all cursor-pointer ${
                decision.trim()
                  ? 'bg-[#173f30] text-[#f7e7cf] hover:bg-[#0d3024] border-2 border-[#173f30]'
                  : 'bg-[#173f30]/20 text-[#173f30]/40 cursor-not-allowed border-2 border-transparent'
              }`}
            >
              <span>SCAN COMMUNITY REACTION</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <p className="text-[10px] font-bold text-[#173f30]/50 uppercase tracking-wider mt-2.5 text-center">
              Powered by scikit-learn Decision Tree · Genuine Kerala Gossip Analytics
            </p>
          </div>

        </div>
      </motion.main>

      {/* Footer */}
      <footer className="relative z-30 px-6 py-4 md:px-12 flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#173f30]/70">
        <span>Pick a world & describe your plan</span>
        <span>Every decision has an audience ↓</span>
      </footer>
    </div>
  )
}
