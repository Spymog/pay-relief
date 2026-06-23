"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Share your debt details and financial situation. Our platform analyzes your case in minutes.",
  },
  {
    number: "02",
    title: "Get Your Strategy",
    description:
      "Receive a personalized negotiation strategy based on your debts, local laws, and creditor patterns.",
  },
  {
    number: "03",
    title: "We Handle the Calls",
    description:
      "Our team negotiates directly with creditors using proven tactics to reduce your debt.",
  },
  {
    number: "04",
    title: "Settle & Save",
    description:
      "Reach settlements for less than you owe. Most clients save 30-70% of their total debt.",
  },
];

export function DebtorsHowItWorks() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Four simple steps to get out of debt without the stress or
            complicated legal process.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex gap-8 items-start"
            >
              {/* Number */}
              <div className="flex-shrink-0">
                <div className="text-5xl font-serif font-bold text-accent/30">
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-foreground/60 text-lg">{step.description}</p>
              </div>

              {/* Checkmark */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex-shrink-0"
                >
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
