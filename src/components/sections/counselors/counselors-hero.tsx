"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

export function CounselorsHero() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32 flex items-center justify-center min-h-screen">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Eyebrow */}
          {/* <motion.div 
            className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Award className="h-4 w-4" />
            <span className="text-sm font-semibold">Now Accepting Founding Counselors · Limited Spots</span>
          </motion.div> */}

          {/* Headline */}
          <motion.h1
            className="font-serif text-5xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Be One of the First Counselors on the Platform That's Changing Debt
            Relief.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-lg lg:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Join our founding cohort of elite financial counselors. Help shape
            the future of debt negotiation while gaining exclusive benefits and
            early access before our public launch.
          </motion.p>

          {/* Incentive Badge */}
          {/* <motion.div
            className="inline-flex items-center gap-2 bg-accent text-primary px-6 py-3 rounded-lg mb-8 font-semibold text-sm lg:text-base"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Award className="h-5 w-5" />
            Early signup promotion here!
          </motion.div> */}
          <motion.div
            className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Award className="h-4 w-4" />
            <span className="text-sm font-semibold">
              Now Accepting Founding Counselors · Limited Spots
            </span>
          </motion.div>

          {/* CTAs */}
          {/* Trust indicator */}
          <motion.p
            className="text-sm text-foreground/50 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Trusted by 500+ financial counselors across the country
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
