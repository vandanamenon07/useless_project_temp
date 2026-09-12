import React from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Award, Stamp } from 'lucide-react'

export default function Verdict({ score = 75, customVerdict, onReset }) {
  const getVerdict = (s) => {
    if (customVerdict) return customVerdict
    if (s <= 30) return "Nobody really cares. Congratulations."
    if (s <= 60) return "A few aunties noticed."
    if (s <= 80) return "The thinnayil has started discussing."
    if (s <= 95) return "Your decision has entered the neighbourhood WhatsApp group."
    return "Congratulations. You are now tomorrow's main topic."
  }

  const verdictText = getVerdict(score)

  const getVerdictLevelColor = (s) => {
    if (s <= 30) return { bg: '#2b8a3e', text: '#d3f9d8', border: '#2b8a3e' }
    if (s <= 60) return { bg: '#e4b75d', text: '#fff3bf', border: '#d8ad4d' }
    if (s <= 80) return { bg: '#df7046', text: '#ffe8cc', border: '#df7046' }
    return { bg: '#c92a2a', text: '#ffe3e3', border: '#c92a2a' }
  }

  const colors = getVerdictLevelColor(score)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full bg-[#173f30] text-[#f7e7cf] rounded-3xl p-6 sm:p-10 shadow-2xl border-4 border-[#df7046]/40 text-center flex flex-col items-center relative overflow-hidden"
    >
      {/* Background seal watermarks */}
      <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full border-8 border-white/5 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full border-8 border-white/5 pointer-events-none" />

      {/* Rubber Stamp Badge */}
      <motion.div
        initial={{ rotate: -25, scale: 2, opacity: 0 }}
        animate={{ rotate: -6, scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.4 }}
        className="border-3 border-[#df7046] text-[#df7046] px-4 py-1.5 rounded-xl uppercase font-headline font-black text-xs md:text-sm tracking-widest mb-4 shadow-lg inline-block"
      >
        OFFICIAL COMMUNITY DECREE
      </motion.div>

      <span className="text-[11px] font-bold uppercase tracking-widest text-[#f7e7cf]/60 block font-syne mb-2">
        Final Society Verdict
      </span>

      <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl font-black leading-tight max-w-xl text-white mb-4">
        “{verdictText}”
      </h3>

      <p className="text-xs sm:text-sm text-[#f7e7cf]/80 max-w-md mx-auto mb-8 font-medium">
        {score > 80
          ? "We advise staying indoors tomorrow between 8:00 AM and 11:30 AM when the morning tea sessions convene."
          : score > 50
          ? "Expect at least 2 casual phone calls asking if you 'really thought this through'."
          : "You escaped without triggering any emergency family meetings. Enjoy your freedom!"}
      </p>

      {/* Requirement 20: RESET BUTTON: SCAN ANOTHER DECISION */}
      <motion.button
        type="button"
        onClick={onReset}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#df7046] hover:bg-[#c95f36] text-white font-headline font-black text-sm sm:text-base uppercase tracking-wider px-8 py-4 rounded-full flex items-center gap-3 shadow-xl transition-all cursor-pointer border-2 border-white/20"
      >
        <RotateCcw className="w-5 h-5" />
        <span>SCAN ANOTHER DECISION</span>
      </motion.button>

      <span className="text-[10px] text-[#f7e7cf]/50 uppercase tracking-widest mt-3 font-semibold">
        Resets all variables instantly without page reload
      </span>
    </motion.div>
  )
}
