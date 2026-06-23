'use client'

import { motion } from 'framer-motion'
import { Shield, Users, Zap, TrendingDown, Lock, Clock } from 'lucide-react'

const perks = [
  {
    icon: Shield,
    title: 'FDCPA Protected',
    description: 'We handle all communications so collectors can\'t call, email, or harass you anymore.'
  },
  {
    icon: Users,
    title: 'Expert Negotiators',
    description: 'Our team has decades of experience settling debts with all major creditors.'
  },
  {
    icon: Zap,
    title: 'AI-Powered Strategy',
    description: 'Custom negotiation plans based on your debt type, amount, and local regulations.'
  },
  {
    icon: TrendingDown,
    title: '30-70% Savings',
    description: 'Members typically settle for far less than originally owed. Average savings: $8,500.'
  },
  {
    icon: Lock,
    title: 'Bank-Level Security',
    description: 'Your financial information is encrypted and protected with military-grade security.'
  },
  {
    icon: Clock,
    title: 'Fast Settlement',
    description: 'Most debts settle within 2-4 months. No years-long processes or complicated paperwork.'
  }
]

export function DebtorsPerks() {
  return (
    <section className="py-24 px-4 bg-primary/5">
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
            Why Choose PayRelief
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            We're not debt consolidation or a loan. We're direct negotiation with the power of AI.
          </p>
        </motion.div>

        {/* Perks grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {perks.map((perk, index) => {
            const Icon = perk.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="p-8 rounded-lg bg-background border border-border hover:border-accent/50 transition-colors"
              >
                <Icon className="h-8 w-8 text-accent mb-4" />
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {perk.title}
                </h3>
                <p className="text-foreground/60">
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
