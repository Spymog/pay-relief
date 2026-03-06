'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function CounselorsFinalCTA() {
  return (
    <section className="w-full bg-gradient-to-b from-background to-primary/10 py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Headline */}
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-8 text-balance">
            Founding Spots Are Limited.
            <br />
            <span className="text-accent">Apply Today.</span>
          </h2>

          {/* CTA Button */}
          <Button
            className="bg-accent hover:bg-accent/90 text-primary px-8 py-6 text-base font-semibold rounded-lg mb-6"
            onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Apply as a Founding Counselor
          </Button>

          {/* Fine Print */}
          <p className="text-sm text-foreground/60">
            First cohort capped at 100 counselors nationally.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
