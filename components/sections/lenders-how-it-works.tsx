'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function LendersHowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Register Your Institution',
      description: 'Set up your lender account and configure resolution parameters.',
    },
    {
      number: '2',
      title: 'Receive Structured Proposals',
      description: 'AI-matched debtor proposals based on account severity and history.',
    },
    {
      number: '3',
      title: 'Review & Approve',
      description: 'Transparent negotiation tracking with full compliance logging.',
    },
    {
      number: '4',
      title: 'Resolution & Reporting',
      description: 'Automated settlement reporting and performance analytics.',
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
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            How It'll Work
          </h2>
          <p className="text-lg text-muted-foreground">
            A streamlined process designed for institutional efficiency and borrower fairness.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  {/* Connecting line */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] right-[-50%] h-1 bg-gradient-to-r from-accent to-accent/20" />
                  )}

                  {/* Step card */}
                  <div className="relative bg-card border border-border rounded-xl p-6">
                    {/* Step number */}
                    <div className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-sm mb-4">
                      {step.number}
                    </div>

                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {step.description}
                    </p>

                    {/* Coming at launch tag */}
                    <div className="inline-block px-3 py-1 bg-secondary/50 rounded text-xs font-medium text-muted-foreground">
                      Coming at Launch
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
