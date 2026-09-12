import React from 'react'
import { motion } from 'framer-motion'
import { Quote, Sparkles } from 'lucide-react'

export default function GossipQuotes({ quotes = [] }) {
  const displayQuotes = quotes || []

  return (
    <div className="w-full bg-[#fff8ec] rounded-3xl p-6 md:p-8 border-2 border-[#173f30]/15 shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Quote className="w-6 h-6 text-[#df7046]" />
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#df7046] block font-syne">
            Audio Surveillance Transcripts
          </span>
          <h3 className="font-headline text-xl md:text-2xl font-black text-[#173f30]">
            Overheard at the Thinnayi
          </h3>
        </div>
      </div>

      <div className="space-y-3.5">
        {displayQuotes.length === 0 && (
          <p className="text-sm font-semibold text-[#173f30]/60">
            No transcripts were returned by the API.
          </p>
        )}
        {displayQuotes.map((quote, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -25 : 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3 + idx * 0.15,
              type: "spring",
              stiffness: 140,
              damping: 14
            }}
            whileHover={{ scale: 1.01, x: 4 }}
            className="flex items-start gap-3.5 bg-[#f3e4cb]/60 border border-[#173f30]/15 rounded-2xl p-4 shadow-sm"
          >
            <div className="w-7 h-7 rounded-full bg-[#173f30] text-[#f7e7cf] flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
              {idx + 1}
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-base font-bold text-[#173f30] italic leading-snug">
                {quote}
              </p>
              <span className="text-[10px] font-bold text-[#173f30]/50 uppercase tracking-wide mt-1 block">
                Source: Neighbourhood Advisory Committee (Unofficial)
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
