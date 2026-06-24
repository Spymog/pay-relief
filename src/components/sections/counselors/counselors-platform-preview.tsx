'use client'

import { motion } from 'framer-motion'
import { Users, Calendar, Lock, FileText } from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Smart Client Matching',
    description: 'AI-powered matching connects you with clients aligned to your specializations and availability.',
  },
  {
    icon: Calendar,
    title: 'Integrated Scheduling',
    description: 'Manage your entire calendar, set your rates, and control your availability seamlessly.',
  },
  {
    icon: Lock,
    title: 'Secure Messaging Portal',
    description: 'HIPAA-compliant communication keeps client conversations and documents protected.',
  },
  {
    icon: FileText,
    title: 'Compliance Tools',
    description: 'Built-in documentation, templates, and audit trails to stay FDCPA and NFCC compliant.',
  },
]

export function CounselorsplatformPreview() {
  return (
    <section className="w-full bg-background py-20 lg:py-32">
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
            A Platform Built Around You
          </h2>
          <p className="text-lg text-foreground/60">
            Powerful tools designed specifically for financial counselors to manage clients, track outcomes, and grow your practice.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="relative p-8 bg-card rounded-xl border border-border hover:border-accent/50 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Coming at Launch badge */}
                <div className="absolute top-4 right-4 inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                  Coming at Launch
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-accent/10 text-accent mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title and Description */}
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-foreground/60">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
