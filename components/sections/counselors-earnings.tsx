"use client";

import { motion } from "framer-motion";

export function CounselorsEarnings() {
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
            What Could This Mean for Your Practice?
          </h2>
        </motion.div>

        {/* Projection Card */}
        <motion.div
          className="max-w-3xl mx-auto p-12 bg-card rounded-2xl border border-accent/30 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-lg lg:text-xl text-foreground/80 leading-relaxed mb-8">
            Counselors on similar platforms average{" "}
            <span className="font-semibold text-accent">
              15–20 clients/month
            </span>
            . At your own rates. On your own schedule.
          </p>

          <div className="space-y-4 pt-8 border-t border-border">
            <p className="text-sm text-foreground/60">
              Example: At an average $200 per client engagement, that's
              $3,000–$4,000/month in additional revenue. No platform fees for
              the first 6 months means keeping every penny.
            </p>
            <p className="text-xs text-foreground/50 italic">
              *Disclaimer: Actual earnings vary based on specialization, client
              demand, rates, and hours committed. Past performance does not
              guarantee future results.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
