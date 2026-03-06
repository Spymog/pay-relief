'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const tiers = [
  {
    name: 'Community Lender',
    pricing: 'Pay-Per-Resolution',
    description: 'Smaller institutions or specialized lenders',
    features: [
      'Secure portal access',
      'Pre-screened debtors',
      'Settlement approval workflow',
      'Basic reporting'
    ]
  },
  {
    name: 'Regional Partner',
    pricing: '$299/mo',
    description: 'Growing regional institutions',
    badge: 'Most Popular',
    features: [
      'Everything in Community',
      'Priority debtor matching',
      'API integration',
      'Advanced analytics',
      'Dedicated account manager'
    ]
  },
  {
    name: 'Enterprise',
    pricing: 'Custom Pricing',
    description: 'Large institutions and portfolio companies',
    features: [
      'Everything in Regional',
      'White-label options',
      'Custom integrations',
      'Unlimited seats',
      'Strategic partnership benefits'
    ]
  }
]

export function LendersTiers() {
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
            Built for Institutions of Every Size
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-lg border transition-all ${
                tier.badge
                  ? 'border-accent bg-accent/5 md:scale-105'
                  : 'border-border bg-secondary/50'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="inline-block px-3 py-1 bg-accent text-primary text-xs font-semibold rounded-full">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-2">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-accent">{tier.pricing}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.badge ? 'default' : 'outline'}
                  className="w-full"
                >
                  {tier.pricing === 'Custom Pricing' ? 'Contact Us' : 'Get Started'}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Contact us for early access rates
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
