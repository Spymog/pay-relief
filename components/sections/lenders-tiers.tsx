'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LendersTiers() {
  const tiers = [
    {
      name: 'Community Lender',
      pricing: 'Pay-Per-Resolution',
      description: 'Perfect for smaller institutions or pilots',
      features: [
        'Portal access',
        'Per-resolution fees',
        'Compliance logging',
        'Basic analytics',
        'Email support',
      ],
    },
    {
      name: 'Regional Partner',
      pricing: '$299/month',
      description: 'For growing portfolios',
      features: [
        'Everything in Community +',
        'Unlimited resolutions',
        'Advanced analytics',
        'Priority matching',
        'Phone support',
        'Custom integrations',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      pricing: 'Custom',
      description: 'Full-service partnership',
      features: [
        'Everything in Regional +',
        'Dedicated account manager',
        'SLA guarantees',
        'White-label options',
        'Custom pricing',
        'API access',
      ],
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
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Built for Institutions of Every Size
          </h2>
          <p className="text-lg text-muted-foreground">
            Flexible partnership models to match your institution's scale and needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl border transition-all duration-300 ${
                tier.highlighted
                  ? 'border-accent bg-gradient-to-br from-accent/5 to-transparent ring-1 ring-accent/30 md:scale-105'
                  : 'border-border bg-card hover:border-accent/50'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-primary text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="font-semibold text-xl text-foreground mb-2">
                  {tier.name}
                </h3>
                <div className="text-3xl font-bold text-accent mb-1">
                  {tier.pricing}
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {tier.description}
                </p>

                <Button
                  className={`w-full mb-8 ${
                    tier.highlighted
                      ? 'bg-accent hover:bg-accent/90 text-primary font-semibold'
                      : 'border-border hover:bg-secondary'
                  }`}
                  variant={tier.highlighted ? 'default' : 'outline'}
                >
                  Contact for Early Access
                </Button>

                <div className="space-y-4">
                  {tier.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          Contact us for early access rates and launch partner discounts.
        </motion.p>
      </div>
    </section>
  )
}
