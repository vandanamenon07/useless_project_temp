import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'

export default function Landing({ onStart }) {
  return (
    <div className="relative min-h-screen w-full bg-[#e87549] text-[#173f30] overflow-hidden flex flex-col justify-between select-none">
      {/* Cinematic Grain Overlay */}
      <div className="grain" />

      {/* Top Bar */}
      <header className="relative z-30 w-full px-6 py-6 md:px-12 md:py-8 flex items-center justify-between">
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#173f30]/80 font-syne"
        >
          A Social Reaction Simulator
        </motion.span>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          type="button"
          onClick={onStart}
          className="bg-[#173f30] hover:bg-[#0d3024] text-[#f7e7cf] px-5 py-3 md:px-7 md:py-3.5 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 shadow-lg transition-colors cursor-pointer group"
        >
          <span>ENTER THE THINNAYI</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.button>
      </header>

      {/* Hero Center Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-8 max-w-4xl mx-auto">
        
        {/* Malayalam Speech Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: [0, -8, 0],
            rotate: [-8, -6, -8]
          }}
          transition={{ 
            opacity: { duration: 0.5, delay: 0.4 },
            scale: { type: "spring", stiffness: 200, damping: 15, delay: 0.4 },
            y: { repeat: Infinity, duration: 3.5, ease: "easeInOut" },
            rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" }
          }}
          className="speech-bubble-bubble w-36 h-24 md:w-44 md:h-28 px-4 flex items-center justify-center text-center text-xs md:text-sm font-extrabold text-[#173f30] leading-tight mb-4 md:mb-6 shadow-md border border-[#173f30]/10"
        >
          Athe ningal<br />arinjoo.....?
        </motion.div>

        {/* Malayalam Script */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-malayalam text-lg md:text-2xl font-bold text-[#173f30] tracking-wide mb-1"
        >
          തിണ്ണയിലെ കാര്യം
        </motion.p>

        {/* Main Title: THINNAYILE KAARYAM */}
        <motion.h1
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 90, 
            damping: 14, 
            delay: 0.2 
          }}
          className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-[#173f30] leading-[0.88] select-none"
        >
          THINNAYILE
          <br />
          <span className="hero-title-stroke block mt-1">
            KAARYAM
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 md:mt-8 max-w-lg text-sm sm:text-base md:text-lg font-semibold text-[#173f30]/90 leading-relaxed"
        >
          Because somehow, everyone has an opinion.
          <span className="block text-xs md:text-sm font-normal text-[#173f30]/75 mt-1">
            Your life decisions deserve unnecessary community approval.
          </span>
        </motion.p>

        {/* Primary CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 md:mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0px 15px 30px rgba(23,63,48,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="bg-[#173f30] text-[#f7e7cf] hover:bg-[#0f2e23] px-8 py-4 md:px-10 md:py-4.5 rounded-full font-headline font-bold text-sm md:text-base tracking-wider uppercase flex items-center gap-3 shadow-xl transition-all cursor-pointer border-2 border-[#173f30]"
          >
            <span>LET'S SEE WHAT SOCIETY SAYS</span>
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>

      {/* Old Lady (Left) - Framer Motion slide-in from LEFT: x: -100% -> 0 with bounce */}
      <motion.img
        src="/oldlad.png"
        alt="Old Lady eavesdropping"
        initial={{ x: "-100%", opacity: 0, rotate: -15 }}
        animate={{ x: 0, opacity: 1, rotate: -8 }}
        transition={{
          type: "spring",
          stiffness: 65,
          damping: 12,
          mass: 1.1,
          delay: 0.35
        }}
        className="absolute bottom-0 -left-12 sm:-left-8 md:-left-4 lg:left-0 w-[210px] sm:w-[280px] md:w-[350px] lg:w-[410px] h-auto object-contain pointer-events-none z-20 origin-bottom select-none drop-shadow-xl"
      />

      {/* Old Man (Right) - Framer Motion slide-in from RIGHT: x: 100% -> 0 with bounce */}
      <motion.img
        src="/oldman.png"
        alt="Old Man listening"
        initial={{ x: "100%", opacity: 0, rotate: 15 }}
        animate={{ x: 0, opacity: 1, rotate: 8 }}
        transition={{
          type: "spring",
          stiffness: 65,
          damping: 12,
          mass: 1.1,
          delay: 0.45
        }}
        className="absolute bottom-0 -right-12 sm:-right-8 md:-right-4 lg:right-0 w-[210px] sm:w-[280px] md:w-[350px] lg:w-[410px] h-auto object-contain pointer-events-none z-20 origin-bottom select-none drop-shadow-xl"
      />

      {/* Scroll / Tap Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        onClick={onStart}
        className="relative z-30 pb-6 flex flex-col items-center gap-1.5 cursor-pointer text-[#173f30] group"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-9 h-9 rounded-full border-1.5 border-[#173f30] flex items-center justify-center group-hover:bg-[#173f30] group-hover:text-[#f7e7cf] transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
        <span className="text-[10px] uppercase tracking-widest font-bold opacity-75">
          Tap anywhere to scan
        </span>
      </motion.div>

      {/* Footer Info */}
      <div className="relative z-30 px-6 py-4 md:px-12 flex justify-between text-[11px] font-bold uppercase tracking-wider text-[#173f30]/70">
        <span>01 / 03 · PROLOGUE</span>
        <span>Made for the Overthinkers</span>
      </div>
    </div>
  )
}
