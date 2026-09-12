import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radio, Users, MessageCircle, AlertCircle, Sparkles } from 'lucide-react'

const SCANNING_MESSAGES = [
  "Consulting the neighbours...",
  "Checking WhatsApp groups...",
  "Asking the aunty next door...",
  "Checking what your cousin's mother thinks...",
  "Calculating unnecessary opinions...",
  "Finalising your social damage..."
]

export default function LoadingScreen({ decision, environment }) {
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0)
  const [progress, setProgress] = useState(10)

  useEffect(() => {
    // Message cycler
    const msgInterval = setInterval(() => {
      setCurrentMsgIndex((prev) => (prev + 1) % SCANNING_MESSAGES.length)
    }, 1100)

    // Progress bar animator
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95
        const increment = Math.floor(Math.random() * 12) + 6
        return Math.min(prev + increment, 95)
      })
    }, 400)

    return () => {
      clearInterval(msgInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-[#e87549] text-[#173f30] overflow-hidden flex flex-col items-center justify-center select-none px-4">
      {/* Cinematic Grain Overlay */}
      <div className="grain" />

      {/* Radar rings in background */}
      <div className="absolute w-[450px] h-[450px] rounded-full border border-[#173f30]/20 animate-radar pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full border-2 border-[#173f30]/30 animate-radar pointer-events-none" style={{ animationDelay: '0.8s' }} />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="relative z-10 max-w-md w-full bg-[#fff8ec]/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-[#173f30]/20 text-center flex flex-col items-center"
      >
        {/* Pulsing Scanner Icon */}
        <div className="relative mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="w-20 h-20 rounded-full border-4 border-dashed border-[#df7046] flex items-center justify-center"
          >
            <Radio className="w-8 h-8 text-[#173f30]" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#df7046] border-2 border-white flex items-center justify-center text-[9px] font-black text-white"
          >
            !
          </motion.div>
        </div>

        {/* Top Kicker */}
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#df7046] mb-1 font-syne">
          COMMUNITY SURVEILLANCE RADAR ACTIVE
        </span>

        <h3 className="font-headline text-xl sm:text-2xl font-black text-[#173f30] mb-3 leading-snug">
          Scanning {environment} Reaction…
        </h3>

        {/* Target decision snippet */}
        <div className="bg-[#173f30]/5 px-3.5 py-1.5 rounded-full mb-6 border border-[#173f30]/10 max-w-xs truncate">
          <span className="text-xs font-semibold text-[#173f30]/80 italic">
            "{decision}"
          </span>
        </div>

        {/* Dynamic Animated Scanning Message */}
        <div className="h-14 flex items-center justify-center mb-6 w-full">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMsgIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="text-sm sm:text-base font-bold text-[#173f30] tracking-wide"
            >
              {SCANNING_MESSAGES[currentMsgIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#e8dbc5] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#173f30]/20 mb-2">
          <motion.div
            className="h-full bg-[#df7046] rounded-full transition-all duration-300 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>

        {/* Percentage Counter */}
        <div className="w-full flex justify-between text-[10px] font-extrabold tracking-wider text-[#173f30]/60 uppercase font-syne">
          <span>Processing Gossip</span>
          <span>{progress}%</span>
        </div>

      </motion.div>
    </div>
  )
}
