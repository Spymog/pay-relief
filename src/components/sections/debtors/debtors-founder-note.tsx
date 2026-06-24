'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export function DebtorsFounderNote() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          {/* Quote icon */}
          <Quote className="h-12 w-12 text-accent mx-auto mb-8 opacity-50" />

          {/* Quote text */}
          <p className="font-serif text-2xl md:text-4xl font-semibold text-foreground mb-8 leading-relaxed">
            "Debt doesn't have to control your life. We built PayRelief because we believe everyone deserves a path forward—one where you're not fighting creditors alone, and where settling your debt actually means saving money, not paying more."
          </p>

          {/* Author */}
          <div className="border-t border-border pt-8">
            <p className="font-semibold text-foreground mb-1">
              Sarah Chen, Co-Founder
            </p>
            <p className="text-sm text-foreground/60 mb-6">
              Former financial counselor, settled $180K+ in client debt
            </p>

            {/* Callout */}
            <div className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/30">
              <p className="text-accent font-medium">
                We're FDCPA licensed and regulated. Your trust is everything.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
