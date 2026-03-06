'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export function LendersHero() {
  return (
    <section className="relative w-full bg-background overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <div className="h-px w-8 bg-accent" />
            <span className="text-sm font-medium text-accent">
              Launching Soon · Now Accepting Institutional Partners
            </span>
            <div className="h-px w-8 bg-accent" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl lg:text-6xl font-semibold text-center text-foreground mb-6 text-balance leading-tight"
          >
            A Better Way to Resolve Delinquent Accounts Is Almost Here.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-center text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            A compliant negotiation platform connecting institutional lenders with pre-screened debtors. Recover more, reduce legal costs, and build borrower loyalty.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-primary font-semibold"
            >
              Become a Launch Partner
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-secondary"
            >
              Request a Preview
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              'FDCPA Compliant',
              'Pre-Screened Debtors',
              'No Litigation Required',
              'SOC 2 Infrastructure'
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-3 bg-secondary/50 rounded-lg border border-border"
              >
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
