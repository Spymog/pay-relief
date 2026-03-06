'use client'

import { motion } from 'framer-motion'

export function LendersDebtTypes() {
  const debtTypes = [
    'Credit Cards',
    'Personal Loans',
    'Medical Debt',
    'Auto Loans',
    'Student Loans',
    'Small Business Debt',
    'Mortgage Hardship',
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
            Portfolio Diversification Support
          </h2>
          <p className="text-lg text-muted-foreground">
            We resolve across all major debt categories.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-3">
          {debtTypes.map((type, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="px-6 py-3 bg-card border border-border rounded-full font-medium text-foreground hover:border-accent hover:bg-accent/5 transition-all duration-300 cursor-default"
            >
              {type}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
