'use client'

import { motion } from 'framer-motion'
import { Shield, Users, FileText, BarChart3 } from 'lucide-react'

export function LendersFeatures() {
  const features = [
    {
      icon: Shield,
      title: 'Secure Lender Portal',
      description: 'Enterprise-grade security with role-based access controls and audit logs.',
    },
    {
      icon: Users,
      title: 'Pre-Screened Debtors',
      description: 'AI-matched debtors with verified intent to settle and capability to pay.',
    },
    {
      icon: FileText,
      title: 'Full Compliance Logging',
      description: 'Automatic FDCPA documentation and audit trails for every interaction.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time metrics on settlement rates, recovery totals, and ROI.',
    },
  ]

  return (
    <section className="w-full bg-secondary/30 py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Platform Features Preview
          </h2>
          <p className="text-lg text-muted-foreground">
            Built for scalability, compliance, and recovery optimization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-card rounded-xl border border-border relative group"
              >
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <div className="inline-block px-3 py-1 bg-accent/10 rounded text-xs font-medium text-accent">
                    Available at Launch
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
