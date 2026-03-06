'use client'

import { motion } from 'framer-motion'
import { AlertCircle, Phone, DollarSign, Clock, HelpCircle } from 'lucide-react'

const painPoints = [
  {
    icon: AlertCircle,
    title: 'Debt Stress Overwhelming',
    description: 'Constant calls, threatening letters, and anxiety about your financial future.'
  },
  {
    icon: Phone,
    title: 'Collectors Always Calling',
    description: 'Harassing phone calls and pressure tactics that make negotiation feel impossible.'
  },
  {
    icon: DollarSign,
    title: 'Stuck With High Payments',
    description: 'Settlement offers feel unaffordable and you don\'t know if there\'s a better deal.'
  },
  {
    icon: Clock,
    title: 'Wasting Time & Money',
    description: 'Complex paperwork, legal fees, and months of back-and-forth with no results.'
  },
  {
    icon: HelpCircle,
    title: 'No Expert Guidance',
    description: 'Negotiating alone means missing leverage points that could save you thousands.'
  }
]

export function DebtorsPainPoints() {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            We Know Your Struggle
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            If you're drowning in debt, you're not alone. These are the exact problems our members face every day.
          </p>
        </motion.div>

        {/* Pain points grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="p-6 rounded-lg bg-background border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-accent mt-1" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {point.title}
                    </h3>
                    <p className="text-foreground/60">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
