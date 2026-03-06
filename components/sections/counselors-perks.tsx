'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Star, Zap } from 'lucide-react'

const perks = [
  {
    icon: TrendingUp,
    title: '0% Platform Fees for 6 Months',
    description: 'Keep 100% of your earnings from client work during the founding phase. Exceptional value for early adopters.',
  },
  {
    icon: Star,
    title: 'Featured Profile at Launch',
    description: 'Get prominent placement in our counselor directory when we go public. Attract more clients faster.',
  },
  {
    icon: Zap,
    title: 'Direct Input into Platform Features',
    description: 'Shape the future of PayRelief. Your feedback directly influences what we build next.',
  },
]

export function CounselorsPerkss() {
  return (
    <section className="w-full bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Headline */}
        <motion.div 
          className="max-w-2xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Why Apply Before We Launch?
          </h2>
        </motion.div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {perks.map((perk, index) => {
            const Icon = perk.icon
            return (
              <motion.div
                key={index}
                className="p-8 bg-card rounded-xl border border-border hover:border-accent/50 transition-colors text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/10 text-accent mx-auto mb-4">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Title and Description */}
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {perk.title}
                </h3>
                <p className="text-foreground/60 text-sm">
                  {perk.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
