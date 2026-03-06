'use client'

import { motion } from 'framer-motion'
import { Building2, FileText, CheckCircle, BarChart3 } from 'lucide-react'

const steps = [
  {
    icon: Building2,
    title: 'Register Your Institution',
    description: 'Quick setup. Verify your lending credentials. Begin inviting your portfolio.'
  },
  {
    icon: FileText,
    title: 'Receive Structured Proposals',
    description: 'Pre-screened debtors matching your accounts are presented with resolution offers.'
  },
  {
    icon: CheckCircle,
    title: 'Review & Approve',
    description: 'Review each proposal. Approve, counter, or decline directly from the dashboard.'
  },
  {
    icon: BarChart3,
    title: 'Resolution & Reporting',
    description: 'Once approved, settlement funds are collected and reported. Full audit trail included.'
  }
]

export function LendersHowItWorks() {
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
            How It'll Work
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent to-transparent" />
                  )}

                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-accent/10 mx-auto mb-4 relative z-10">
                      <Icon className="h-8 w-8 text-accent" />
                    </div>
                    <div className="inline-block px-3 py-1 bg-accent/10 rounded-full mb-3">
                      <span className="text-xs font-semibold text-accent">Coming at Launch</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
