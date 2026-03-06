'use client'

import { motion } from 'framer-motion'
import { Users, TrendingUp, LineChart } from 'lucide-react'

const perks = [
  {
    icon: Users,
    title: 'Co-Develop Portal Features',
    description: 'Shape the platform. Your feedback directly influences product roadmap and feature prioritization.'
  },
  {
    icon: TrendingUp,
    title: 'Locked-In Preferred Pricing',
    description: 'Launch partner rates are guaranteed for 3 years. Lock in savings before general availability.'
  },
  {
    icon: LineChart,
    title: 'First Access to Analytics',
    description: 'Benchmark your performance against aggregate data. Early insights into settlement trends and patterns.'
  }
]

export function LendersPerks() {
  return (
    <section className="bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance">
            Launch Partners Get More
          </h2>
          <p className="text-lg text-muted-foreground">
            Early adopters receive exclusive benefits and ongoing partnership advantages.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {perks.map((perk, index) => {
            const Icon = perk.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-secondary/50 p-8 rounded-lg border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-accent/10 mb-4">
                  <Icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{perk.title}</h3>
                <p className="text-muted-foreground">{perk.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
