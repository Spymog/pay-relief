'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function LendersFinalCTA() {
  return (
    <section className="w-full bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl blur-xl" />

          <div className="relative bg-gradient-to-r from-accent/5 via-primary/5 to-accent/5 rounded-2xl border border-accent/30 p-12 lg:p-16 text-center">
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4 text-balance">
              Launch Partners Are Being Selected Now.
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Limited institutional partner slots remaining for our founding cohort. Secure your spot and shape the future of debt resolution.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
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
                Request a Preview Call
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Enterprise onboarding available. SOC 2 compliant. Limited launch partner slots remaining.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
