'use client'

import { motion } from 'framer-motion'

const specializations = [
  'Credit Cards',
  'Medical Debt',
  'Student Loans',
  'Auto Loans',
  'Bankruptcy Alternatives',
  'Credit Repair',
  'Mortgage Hardship',
  'Personal Loans',
]

export function CounselorsSpecializations() {
  return (
    <section className="w-full bg-secondary/30 py-20 lg:py-32">
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
            What Do You Specialize In?
          </h2>
          <p className="text-lg text-foreground/60">
            Select your areas of expertise. We match you with clients seeking your specific knowledge.
          </p>
        </motion.div>

        {/* Specializations Grid */}
        <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
          {specializations.map((spec, index) => (
            <motion.button
              key={index}
              className="px-6 py-3 bg-card border border-border rounded-full text-foreground font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              {spec}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
