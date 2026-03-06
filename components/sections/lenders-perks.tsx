'use client'

import { motion } from 'framer-motion'
import { Handshake, Zap, TrendingUp } from 'lucide-react'

export function LendersPerks() {
  const perks = [
    {
      icon: Handshake,
      title: 'Co-Develop Portal Features',
      description: 'Shape the platform roadmap. Launch partners get direct input on features and workflows.',
    },
    {
      icon: Zap,
      title: 'Locked-In Preferred Pricing',
      description: 'Grandfathered rates for founding partners. Never pay more than your launch agreement rate.',
    },
    {
      icon: TrendingUp,
      title: 'First Access to Analytics',
      description: 'Exclusive insights into industry benchmarks and competitive settlement trends.',
    },
  ]

  return (
    <section className="w-full bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Launch Partners Get More
          </h2>
          <p className="text-lg text-muted-foreground">
            Early movers receive exclusive benefits and preferential terms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {perks.map((perk, i) => {
            const Icon = perk.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-gradient-to-br from-accent/5 to-transparent rounded-xl border border-accent/20"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-semibold text-xl text-foreground mb-3">
                  {perk.title}
                </h3>
                <p className="text-muted-foreground">
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
