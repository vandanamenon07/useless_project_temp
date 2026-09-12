import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2, AlertCircle, ShieldCheck, Flame, Zap } from 'lucide-react'
import GossipNetwork from './GossipNetwork'
import GossipQuotes from './GossipQuotes'
import FakeWhatsApp from './FakeWhatsApp'
import MeanwhileComparison from './MeanwhileComparison'
import Verdict from './Verdict'

export default function Result({ data, onReset, onBackToInput }) {
  const score = data?.risk_score ?? 75
  const category = (data?.category || 'HIGH').toUpperCase()
  const environment = data?.environment || 'Village'
  const decision = data?.decision || 'Make an unusual life choice'
  const verdict = data?.verdict
  const factors = data?.factors || {
    family_involvement: 7,
    traditionalness: 8,
    visibility: 8,
    uniqueness: 8,
    age_sensitivity: 7,
    community_reaction: 9
  }

  // Animated count-up score state
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    let start = 0
    const end = Math.min(Math.max(score, 0), 100)
    const duration = 1500
    const stepTime = 20
    const totalSteps = duration / stepTime
    const increment = end / totalSteps

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setAnimatedScore(end)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.floor(start))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [score])

  const getCategoryTheme = (cat) => {
    switch (cat) {
      case 'LOW':
        return {
          bg: '#2b8a3e',
          text: 'text-green-700',
          badgeBg: 'bg-green-100 text-green-800 border-green-300',
          ringColor: '#2b8a3e',
          label: 'Peaceful & Unremarkable',
          icon: ShieldCheck
        }
      case 'MODERATE':
        return {
          bg: '#e4b75d',
          text: 'text-amber-700',
          badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
          ringColor: '#d8ad4d',
          label: 'A Few Brows Raised',
          icon: AlertCircle
        }
      case 'EXTREME':
        return {
          bg: '#c92a2a',
          text: 'text-red-700',
          badgeBg: 'bg-red-100 text-red-800 border-red-300',
          ringColor: '#c92a2a',
          label: 'Emergency Family Council',
          icon: Zap
        }
      case 'HIGH':
      default:
        return {
          bg: '#df7046',
          text: 'text-orange-700',
          badgeBg: 'bg-orange-100 text-orange-800 border-orange-300',
          ringColor: '#df7046',
          label: 'The Porch Has Convened',
          icon: Flame
        }
    }
  }

  const theme = getCategoryTheme(category)
  const CategoryIcon = theme.icon

  // Circular gauge calculations
  const strokeWidth = 10
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  return (
    <div className="relative min-h-screen w-full bg-[#f3e4cb] text-[#173f30] overflow-x-hidden flex flex-col justify-between select-none">
      {/* Cinematic Grain Overlay */}
      <div className="grain" />

      {/* Top Bar */}
      <header className="relative z-30 w-full px-6 py-6 md:px-12 md:py-8 flex items-center justify-between border-b border-[#173f30]/10 bg-[#f3e4cb]/80 backdrop-blur-sm sticky top-0">
        <button
          type="button"
          onClick={onBackToInput}
          className="flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-wider text-[#173f30] hover:opacity-80 transition-opacity cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Decision</span>
        </button>

        <span className="font-headline font-black text-xs md:text-sm tracking-wider text-[#173f30]">
          THINNAYILE KAARYAM
        </span>

        <span className="text-xs md:text-sm font-bold tracking-wider text-[#173f30]/70 font-syne">
          03 / 03 · REPORT
        </span>
      </header>

      {/* Main Results Container */}
      <main className="relative z-20 flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-8">
        
        {/* Header Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <span className="text-xs font-black uppercase tracking-widest text-[#df7046] font-syne block">
            The Social Weather Report · {environment}
          </span>
          <h2 className="font-headline text-3xl sm:text-5xl font-black text-[#173f30] leading-tight">
            Here’s what they’re saying about your karyam.
          </h2>
          <div className="inline-block bg-[#173f30]/5 border border-[#173f30]/15 px-4 py-1.5 rounded-full mt-2">
            <span className="text-xs sm:text-sm font-semibold text-[#173f30]/85 italic">
              “{decision}”
            </span>
          </div>
        </motion.div>

        {/* 14. RISK SCORE HERO BANNER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-[#fff8ec] rounded-3xl p-6 sm:p-8 border-2 border-[#173f30]/15 shadow-xl flex flex-col sm:flex-row items-center gap-6 sm:gap-10"
        >
          {/* Circular Meter */}
          <div className="relative w-36 h-36 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
              <circle
                cx="65"
                cy="65"
                r={radius}
                stroke="#e8dbc5"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <motion.circle
                cx="65"
                cy="65"
                r={radius}
                stroke={theme.ringColor}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <motion.strong
                className="font-headline text-3xl sm:text-4xl font-black text-[#173f30] leading-none"
              >
                {animatedScore}
              </motion.strong>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#173f30]/60 mt-0.5">
                / 100
              </span>
            </div>
          </div>

          {/* Risk Details & Category */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#173f30]/60 font-syne">
                SOCIETY RISK SCORE
              </span>
              <span className={`text-xs font-black uppercase px-3 py-0.5 rounded-full border ${theme.badgeBg} flex items-center gap-1`}>
                <CategoryIcon className="w-3.5 h-3.5" />
                <span>{category} RISK</span>
              </span>
            </div>

            <h3 className="font-headline text-2xl sm:text-3xl font-black text-[#173f30] leading-tight">
              {theme.label}
            </h3>

            <p className="text-xs sm:text-sm text-[#173f30]/75 leading-relaxed font-medium">
              Based on the demographic sensitivity of <strong className="text-[#173f30]">{environment}</strong> and scikit-learn regression models calibrated for Malayali neighbourhood reactions.
            </p>

            {/* Feature bars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-[#173f30]/10 text-left">
              <div>
                <span className="text-[10px] text-[#173f30]/60 block font-semibold">Visibility</span>
                <strong className="text-xs font-bold text-[#173f30]">{factors.visibility || 8} / 10</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#173f30]/60 block font-semibold">Traditional Shock</span>
                <strong className="text-xs font-bold text-[#173f30]">{factors.traditionalness || 8} / 10</strong>
              </div>
              <div>
                <span className="text-[10px] text-[#173f30]/60 block font-semibold">WhatsApp Virality</span>
                <strong className="text-xs font-bold text-[#173f30]">{factors.community_reaction || 9} / 10</strong>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 15. GOSSIP NETWORK */}
        <GossipNetwork nodes={data?.gossip_network} />

        {/* 16. GOSSIP QUOTES */}
        <GossipQuotes quotes={data?.gossip_quotes} />

        {/* 17. FAKE WHATSAPP SECTION */}
        <div className="space-y-3">
          <div className="text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#df7046] font-syne block">
              Intercepted Communications
            </span>
            <h3 className="font-headline text-xl sm:text-2xl font-black text-[#173f30]">
              The Ammachi Group Chat Leak
            </h3>
          </div>
          <FakeWhatsApp chatMessages={data?.whatsapp_chat} decision={decision} />
        </div>

        {/* 18. MEANWHILE COMPARISON SECTION */}
        <MeanwhileComparison meanwhile={data?.meanwhile} decision={decision} />

        {/* 19 & 20. FINAL SOCIETY VERDICT & RESET BUTTON */}
        <Verdict score={score} customVerdict={verdict} onReset={onReset} />

      </main>

      {/* Footer */}
      <footer className="relative z-30 px-6 py-6 md:px-12 flex flex-col sm:flex-row justify-between items-center text-[11px] font-bold uppercase tracking-wider text-[#173f30]/70 border-t border-[#173f30]/10 mt-12 gap-2">
        <span>THINNAYILE KAARYAM · Because everyone has an opinion</span>
        <span>Made for the Overthinkers</span>
      </footer>
    </div>
  )
}
