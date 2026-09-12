import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Video, MoreVertical, CheckCheck, Send } from 'lucide-react'

export default function FakeWhatsApp({ chatMessages = [] }) {
  const messages = chatMessages

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-[#173f30]/20 bg-[#efeae2]">
      
      {/* WhatsApp Header */}
      <div className="bg-[#075e54] text-white px-4 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#128c7e] flex items-center justify-center font-black text-sm border-2 border-white/40">
              👵
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#075e54]" />
          </div>

          <div>
            <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
              <span>AMMACHI GROUP</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-normal">18 members</span>
            </h4>
            <p className="text-[11px] text-white/80 leading-tight">
              Aunty 1, Aunty 2, Aunty 3, Leela, Indira...
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-white/90">
          <Video className="w-5 h-5 cursor-pointer hover:opacity-80" />
          <Phone className="w-4 h-4 cursor-pointer hover:opacity-80" />
          <MoreVertical className="w-5 h-5 cursor-pointer hover:opacity-80" />
        </div>
      </div>

      {/* Encryption Banner */}
      <div className="bg-[#ffeecd] text-[#54656f] text-[10px] py-1.5 px-4 text-center font-medium border-b border-[#e1d5be]">
        🔒 Messages are end-to-end forwarded. Nobody's privacy is safe in this group.
      </div>

      {/* WhatsApp Chat Body */}
      <div className="p-4 sm:p-6 space-y-3 min-h-[320px] whatsapp-chat-bg flex flex-col justify-end">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id || index}
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: 0.35 + index * 0.4,
              type: "spring",
              stiffness: 220,
              damping: 18
            }}
            className="flex flex-col items-start max-w-[85%] sm:max-w-[75%]"
          >
            <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-md border border-[#000000]/5 relative">
              <span
                className="block text-[11px] font-black leading-tight mb-1"
                style={{ color: msg.senderColor || '#128c7e' }}
              >
                {msg.sender}
              </span>
              <p className="text-xs sm:text-sm text-[#111b21] leading-snug font-medium break-words">
                {msg.message}
              </p>
              <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-[#667781]">
                <span>{msg.time || '10:15 AM'}</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
              </div>
            </div>
          </motion.div>
        ))}

        {/* Animated Typing Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 + messages.length * 0.4 }}
          className="flex items-center gap-2 text-[11px] text-[#667781] italic font-semibold px-2"
        >
          <span>Aunty 4 is typing...</span>
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-[#667781] rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-[#667781] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
            <span className="w-1.5 h-1.5 bg-[#667781] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
          </span>
        </motion.div>
      </div>

      {/* Fake Input Bar */}
      <div className="bg-[#f0f2f5] px-3 py-2.5 flex items-center gap-2 border-t border-[#d1d7db]">
        <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-[#667781] border border-[#e9edef]">
          You can only watch... Ammachis control this chat.
        </div>
        <div className="w-9 h-9 rounded-full bg-[#00a884] text-white flex items-center justify-center cursor-not-allowed opacity-75">
          <Send className="w-4 h-4 ml-0.5" />
        </div>
      </div>

    </div>
  )
}
