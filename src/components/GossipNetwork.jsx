import React from 'react'
import { motion } from 'framer-motion'
import { User, Eye, Megaphone, Users, MessageSquare, ArrowRight } from 'lucide-react'

const ICON_MAP = {
  user: User,
  eye: Eye,
  megaphone: Megaphone,
  users: Users,
  'message-circle': MessageSquare
}

export default function GossipNetwork({ nodes = [] }) {
  const defaultNodes = [
    { id: 'n1', label: 'You', role: 'Decision Maker', icon: 'user', reaction: 'Made the bold choice' },
    { id: 'n2', label: 'Neighbour A', role: 'Eyewitness', icon: 'eye', reaction: 'Saw from the terrace' },
    { id: 'n3', label: 'Aunty', role: 'The Megaphone', icon: 'megaphone', reaction: 'Dialed 4 cousins' },
    { id: 'n4', label: 'Relative / Sister', role: 'Intermediary', icon: 'users', reaction: 'Cross-verifying tea' },
    { id: 'n5', label: 'WhatsApp Group', role: 'Mass Broadcast', icon: 'message-circle', reaction: 'Forwarded 47 times' },
  ]

  const displayNodes = nodes && nodes.length > 0 ? nodes : defaultNodes

  return (
    <div className="w-full bg-[#fff8ec] rounded-3xl p-6 md:p-8 border-2 border-[#173f30]/15 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#df7046] block font-syne">
            Propagation Pipeline
          </span>
          <h3 className="font-headline text-xl md:text-2xl font-black text-[#173f30]">
            The Kerala Gossip Transmission Network
          </h3>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-[#173f30]/60 bg-[#173f30]/5 px-3 py-1 rounded-full">
          <span>Speed: Mach 3.4</span>
        </div>
      </div>

      {/* Network Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-2 relative items-center">
        {displayNodes.map((node, index) => {
          const IconComponent = ICON_MAP[node.icon] || User
          const isLast = index === displayNodes.length - 1

          return (
            <React.Fragment key={node.id || index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.18 + 0.2, type: "spring", stiffness: 180, damping: 14 }}
                className="relative bg-[#f3e4cb]/70 border-2 border-[#173f30]/20 rounded-2xl p-4 flex sm:flex-col items-center sm:text-center gap-3.5 sm:gap-2 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Step pill */}
                <div className="absolute -top-2.5 -right-2 bg-[#173f30] text-[#f7e7cf] text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase">
                  #{index + 1}
                </div>

                {/* Avatar Icon */}
                <div className="w-12 h-12 rounded-full bg-[#e87549] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <IconComponent className="w-5 h-5" />
                </div>

                <div className="flex-1 sm:flex-initial">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#df7046] block font-syne">
                    {node.role}
                  </span>
                  <strong className="text-sm font-black text-[#173f30] block leading-tight">
                    {node.label}
                  </strong>
                  <p className="text-[11px] text-[#173f30]/75 leading-tight mt-1 line-clamp-2">
                    {node.reaction}
                  </p>
                </div>
              </motion.div>

              {/* Connecting indicator on mobile & desktop */}
              {!isLast && (
                <div className="hidden sm:flex justify-center text-[#df7046] -mx-2 z-10">
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5 text-[#df7046]" />
                  </motion.div>
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-[#173f30]/10 flex justify-between items-center text-[10px] font-semibold text-[#173f30]/60">
        <span>Transmission medium: Tea stall gossip & balcony whisper</span>
        <span className="text-[#df7046] font-bold">100% Packet Delivery</span>
      </div>
    </div>
  )
}
