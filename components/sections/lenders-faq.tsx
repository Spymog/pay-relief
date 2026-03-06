'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function LendersFAQ() {
  const faqs = [
    {
      question: 'When does the platform launch?',
      answer:
        'We're targeting Q2 2025 for full public launch. Launch partners will get early access starting this spring.',
    },
    {
      question: 'How is debtor compliance ensured?',
      answer:
        'Every debtor on our platform undergoes identity verification, income validation, and settlement intent assessment. We maintain compliance standards aligned with FDCPA and state debt collection laws.',
    },
    {
      question: 'What settlement ranges are typical?',
      answer:
        'Settlement percentages vary by debt type and debtor circumstances. Medical debt averages 40-60% recovery. Credit card debt typically settles 35-50%. We provide predictive analytics to help you set targets.',
    },
    {
      question: 'Can we set our own resolution floors?',
      answer:
        'Yes. You maintain full control over minimum settlement thresholds, account eligibility, and negotiation parameters. The platform enforces your institutional policies.',
    },
    {
      question: 'How does this compare to a collections agency?',
      answer:
        'Unlike traditional agencies, PayRelief connects you directly with debtors in resolution mode. No third-party overhead, full transparency, and faster settlement timelines. You control the process.',
    },
    {
      question: 'What does integration look like?',
      answer:
        'We offer secure API integration, batch upload capability, and manual portal entry. Most institutions are up and running within 2 weeks. Dedicated onboarding support included for launch partners.',
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
            Institutional Partner FAQ
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-lg hover:text-accent transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
