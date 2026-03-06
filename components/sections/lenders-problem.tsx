'use client'

import { motion } from 'framer-motion'
import { TrendingDown, Gavel, Users } from 'lucide-react'

export function LendersProblem() {
  const problems = [
    {
      icon: TrendingDown,
      title: 'Charge-Offs Eroding Bottom Line',
      description: 'Every unresolved account costs you. Charge-offs reduce recoveries and harm lifetime customer value.',
    },
    {
      icon: Gavel,
      title: 'Legal Costs Outpacing Recovery',
      description: 'Collections litigation is expensive. Court costs, attorney fees, and compliance overhead drain profitability.',
    },
    {
      icon: Users,
      title: 'Debtors Disengaging from Collections',
      description: 'Aggressive collections push borrowers away. Missing the chance for mutually beneficial resolutions.',
    },
  ]

  return (
    <section className="w-full bg-secondary/30 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Traditional Collections Isn't Working.
          </h2>
          <p className="text-lg text-muted-foreground">
            The current approach leaves money on the table and damages borrower relationships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, i) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-card rounded-xl border border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-lg text-foreground font-medium">
            We're building a structured alternative that works better for your institution and your borrowers.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
