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
    answer: 'We\'re targeting a public launch in Q2 2025. Founding counselors will get early access to the platform 2 weeks before the public launch to familiarize themselves with the tools.',
  },
  {
    question: 'What certifications do you accept?',
    answer: 'We currently accept NFCC, AFCPE, and NACCC certifications. If you have other relevant credentials, please mention them in your application and we\'ll review on a case-by-case basis.',
  },
  {
    question: 'What will the fee structure be after the 6-month period?',
    answer: 'After the founding period, we plan a competitive 15% platform fee for all counselors. This covers payment processing, platform maintenance, compliance tools, and client support. Founding counselors will have the option to lock in this rate permanently.',
  },
  {
    question: 'Can I use this alongside my existing practice?',
    answer: 'Absolutely. PayRelief is designed to complement your existing practice. You control your availability and rates, so you can take on as many or as few PayRelief clients as you want.',
  },
  {
    question: 'How will clients be matched to me?',
    answer: 'Our AI-powered matching system considers the client\'s debt type, location, and needs against your specializations, availability, and capacity. You always have the final say on which clients you accept.',
  },
  {
    question: 'What happens after I apply?',
    answer: 'We\'ll review your application within 48 hours. If approved, we\'ll send you an onboarding email with next steps, including verification documents needed and access to our founding counselor community Slack.',
  },
]

export function CounselorsFAQ() {
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
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index}
                value={`faq-${index}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-accent/50"
              >
                <AccordionTrigger className="font-semibold text-foreground hover:text-accent transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/60 pb-4">
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
