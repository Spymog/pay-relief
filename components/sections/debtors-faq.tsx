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
    question: 'Is PayRelief a loan or debt consolidation?',
    answer: 'No. PayRelief is a debt settlement service. We negotiate directly with your creditors to reduce the amount you owe. You pay a settlement (typically 30-70% of your original debt) as a lump sum or installments. We\'re not a loan—you pay less, not more.'
  },
  {
    question: 'Will this hurt my credit score?',
    answer: 'Settlements do appear on your credit report and may impact your score temporarily. However, most people see their score recover within 2-3 years after settling. A settled account is better than defaulting on debt or years of payment struggles.'
  },
  {
    question: 'How much does PayRelief cost?',
    answer: 'We only get paid when you get results. Our fee is typically 15-25% of the total amount saved (not of your original debt). So if we negotiate down $30,000 of debt, our fee would be $4,500-$7,500. This is significantly less than legal fees or credit counseling.'
  },
  {
    question: 'How long does the process take?',
    answer: 'Most debts settle within 2-4 months. However, it depends on your creditors and the complexity of your situation. We\'ll provide a timeline estimate once we review your case.'
  },
  {
    question: 'What if a creditor won\'t negotiate?',
    answer: 'Most creditors prefer settlement to long legal battles. However, if a creditor refuses to negotiate, we have strategies including leveraging local regulations and working with legal partners if needed. We\'ll discuss all options with you.'
  },
  {
    question: 'Is my information secure?',
    answer: 'Yes. We use bank-level encryption (AES-256) and comply with all financial regulations including FDCPA, CFPB standards, and state licensing requirements. Your data is never shared with third parties without your consent.'
  },
  {
    question: 'Can I still use my credit cards during settlement?',
    answer: 'Not during the settlement process. We recommend closing accounts being negotiated. We\'ll guide you on which accounts can stay open and help you rebuild credit once settlements are complete.'
  },
  {
    question: 'What if I have a lawsuit against me?',
    answer: 'We can still help. If you\'re being sued, PayRelief can often negotiate settlements that avoid judgment. This requires urgency—contact us immediately if you\'ve been sued.'
  }
]

export function DebtorsFAQ() {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Common Questions
          </h2>
          <p className="text-lg text-foreground/60">
            Everything you need to know about debt settlement with PayRelief.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-serif font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/60 text-base">
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
