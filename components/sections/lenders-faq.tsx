'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'When does the platform launch?',
    answer: 'We are currently accepting feedback from launch partners. The platform will officially launch in Q2 2024, with early partner onboarding beginning in Q1.'
  },
  {
    question: 'How is debtor compliance ensured?',
    answer: 'All debtors go through a verification process before matching. We use identity verification, credit report analysis, and phone verification to ensure legitimacy and intent to resolve.'
  },
  {
    question: 'What settlement ranges are typical?',
    answer: 'Settlement ranges vary by debt type and debtor profile. Generally, we see 30-70% settlements on credit card debt and 20-50% on personal loans, though institutional agreements may differ.'
  },
  {
    question: 'Can we set our own resolution floors?',
    answer: 'Yes. Each institution can define minimum settlement amounts per debt type. The system will only present proposals that meet your thresholds.'
  },
  {
    question: 'How does this compare to a collections agency?',
    answer: 'Unlike traditional agencies, we provide a direct connection to debtors seeking structured resolutions. There are no third-party fees, full transparency, and you maintain 100% control over settlement approvals.'
  },
  {
    question: 'What does integration look like?',
    answer: 'We offer both a web portal and API. Integration typically takes 1-2 weeks, and our technical team provides full support throughout the setup process.'
  }
]

export function LendersFAQ() {
  return (
    <section className="bg-secondary/20 py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-12 text-center text-balance">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-accent">
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
