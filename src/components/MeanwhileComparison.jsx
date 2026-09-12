import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, ThumbsUp, Scale } from 'lucide-react'

export default function MeanwhileComparison({ meanwhile, decision }) {
  const userDecision = (meanwhile && meanwhile.user_decision) || decision || 'I want to dye my hair pink'
  const userReaction = (meanwhile && meanwhile.user_reaction) || '🚨 EMERGENCY AT THE THINNAYIL 🚨'
  const relativeDecision = (meanwhile && meanwhile.relative_decision) || "Someone's son: Bought a BMW on 7-year EMI with zero savings"
  const relativeReaction = (meanwhile && meanwhile.relative_reaction) || '“Very responsible boy. Such maturity!”'

  return (
    <div className="w-full bg-[#fff8ec] rounded-3xl p-6 md:p-8 border-2 border-[#173f30]/15 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Scale className="w-6 h-6 text-[#df7046]" />
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#df7046] block font-syne">
            Comparative Justice Analysis
          </span>
          <h3 className="font-headline text-xl md:text-2xl font-black text-[#173f30]">
            “Meanwhile…” — Double Standards Division
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        
        {/* YOU CARD */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#df7046]/10 border-2 border-[#df7046] rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-[#df7046] text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            YOU
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#df7046] block mb-2 font-syne">
              Your Innocent Decision
            </span>
            <p className="text-base sm:text-lg font-black text-[#173f30] leading-snug">
              “{userDecision}”
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#df7046]/20 bg-[#df7046]/15 -mx-5 -mb-5 p-4 rounded-b-2xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#df7046] block mb-1">
              Society Reaction:
            </span>
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-[#c92a2a]">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 animate-bounce" />
              <span>{userReaction}</span>
            </div>
            <p className="text-[11px] text-[#173f30]/70 mt-1 italic">
              “What will the people at the wedding say? Our family reputation is ruined!”
            </p>
          </div>
        </motion.div>

        {/* SOMEONE'S SON CARD */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bg-[#2b8a3e]/10 border-2 border-[#2b8a3e] rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-[#2b8a3e] text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            SOMEONE'S SON
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#2b8a3e] block mb-2 font-syne">
              Meanwhile, In Another House
            </span>
            <p className="text-base sm:text-lg font-black text-[#173f30] leading-snug">
              {relativeDecision}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#2b8a3e]/20 bg-[#2b8a3e]/15 -mx-5 -mb-5 p-4 rounded-b-2xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#2b8a3e] block mb-1">
              Society Reaction:
            </span>
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-[#2b8a3e]">
              <ThumbsUp className="w-5 h-5 flex-shrink-0" />
              <span>{relativeReaction}</span>
            </div>
            <p className="text-[11px] text-[#173f30]/70 mt-1 italic">
              “Look at how hard he works! Such proud parents!”
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
