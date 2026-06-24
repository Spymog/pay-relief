'use client'

import { motion } from 'framer-motion'
import { Lock, Users, FileCheck, BarChart2 } from 'lucide-react'

const features = [
  {
    icon: Lock,
    title: 'Secure Lender Portal',
    description: 'Enterprise-grade security. Manage all your proposals, resolutions, and reporting in one place.'
  },
  {
    icon: Users,
    title: 'Pre-Screened Debtors',
    description: 'Only verified, motivated debtors seeking resolution. Reduce fraud risk and improve success rates.'
  },
  {
    icon: FileCheck,
    title: 'Full Compliance Logging',
    description: 'Every interaction documented. FDCPA audit trail. Regulatory peace of mind.'
  },
  {
    icon: BarChart2,
    title: 'Analytics Dashboard',
    description: 'Track settlement rates, recovery amounts, and ROI in real-time. Data-driven insights at your fingertips.'
  }
]

export function LendersFeatures() {
  return (
    <section className="bg-secondary/20 py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance">
            Platform Features Preview
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-lg border border-border hover:border-accent/50 transition-colors relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full -mr-10 -mt-10" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 flex-shrink-0">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold bg-accent/10 text-accent rounded">
                      Available at Launch
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
