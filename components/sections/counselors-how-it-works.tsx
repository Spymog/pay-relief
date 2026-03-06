'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Apply & Get Verified',
    description: 'Submit your credentials and specializations. Our team reviews your application within 48 hours.',
  },
  {
    number: '02',
    title: 'Get Matched at Launch',
    description: 'Once live, our AI system matches you with qualified clients based on your expertise.',
  },
  {
    number: '03',
    title: 'Counsel & Negotiate',
    description: 'Provide debt relief guidance and negotiation support using our integrated platform tools.',
  },
  {
    number: '04',
    title: 'Get Paid',
    description: 'Receive payments directly based on your rates and completed work. No platform fees for 6 months.',
  },
]

export function CounselorsHowItWorks() {
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
            How It'll Work
          </h2>
          <p className="text-lg text-foreground/60">
            From application to your first client, here's the founding counselor journey.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex gap-8 mb-12 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Number and connector */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-xl font-bold mb-4">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-1 h-16 bg-primary/20" />
                )}
              </div>

              {/* Content */}
              <div className="pt-2 pb-8">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-foreground/60">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
