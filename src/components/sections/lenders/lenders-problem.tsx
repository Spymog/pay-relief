'use client'

import { motion } from 'framer-motion'
import { TrendingDown, Banknote, UserX } from 'lucide-react'

const problems = [
  {
    icon: TrendingDown,
    title: 'Charge-Offs Eroding Your Bottom Line',
    description: 'Every unresolved account becomes a write-off. Your margins depend on recovery rates.'
  },
  {
    icon: Banknote,
    title: 'Legal Costs Outpacing Recovery',
    description: 'Third-party collectors and litigation eat into profits. The math no longer works.'
  },
  {
    icon: UserX,
    title: 'Debtors Disengaging from Standard Collections',
    description: 'Borrowers ignore calls and letters. They need a better path forward—and so do you.'
  }
]

export function LendersProblem() {
  return (
    <section className="bg-secondary/20 py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance">
            Traditional Collections Isn't Working.
          </h2>
          <p className="text-lg text-muted-foreground">
            The challenges lending institutions face today demand a better solution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-lg border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          We're building a structured alternative that works better for your institution and your borrowers.
        </motion.p>
      </div>
    </section>
  )
}
