'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: 'PayRelief got me a settlement for $15k less than my total debt. I never thought that was possible. The whole process was easy.',
    author: 'Marcus T.',
    debt: 'Settled $42,000 in credit card debt'
  },
  {
    quote: 'The collectors stopped calling immediately once PayRelief took over. That peace of mind alone was worth it. Plus I saved $23k.',
    author: 'Jennifer L.',
    debt: 'Settled $38,000 in mixed debt'
  },
  {
    quote: 'I was too embarrassed to handle this myself. PayRelief\'s team negotiated with my creditors while I got my life back together.',
    author: 'David M.',
    debt: 'Settled $19,500 in medical debt'
  }
]

export function DebtorsSocialProof() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Success Stories from Our Members
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Real people, real results. See how PayRelief is changing lives.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="p-8 rounded-lg bg-background border border-border hover:border-accent/50 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/70 mb-6 italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-accent">
                  {testimonial.debt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
