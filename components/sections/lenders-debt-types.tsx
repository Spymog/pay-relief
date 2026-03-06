'use client'

import { motion } from 'framer-motion'

const debtTypes = [
  'Credit Cards',
  'Personal Loans',
  'Medical Debt',
  'Auto Loans',
  'Student Loans',
  'Small Business Debt',
  'Mortgage Hardship'
]

export function LendersDebtTypes() {
  return (
    <section className="bg-secondary/20 py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance">
            We Support All Debt Types
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center">
          {debtTypes.map((type, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="px-6 py-3 bg-background border border-border rounded-full font-medium text-foreground hover:border-accent hover:bg-accent/5 transition-all"
            >
              {type}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
