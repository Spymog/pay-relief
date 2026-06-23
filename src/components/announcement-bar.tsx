"use client"

import { motion } from "framer-motion"
import { Rocket } from "lucide-react"

export function AnnouncementBar() {
  return (
    <motion.div 
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-primary text-primary-foreground py-2.5 px-4 text-center"
    >
      <p className="text-sm font-medium flex items-center justify-center gap-2">
        <Rocket className="h-4 w-4" />
        <span>
          PayRelief is launching soon — 
          <a href="#waitlist" className="underline underline-offset-2 hover:text-accent transition-colors ml-1">
            Join the waitlist and get 3 months free.
          </a>
        </span>
      </p>
    </motion.div>
  )
}
