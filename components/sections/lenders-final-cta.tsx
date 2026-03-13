"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LendersFinalCTA() {
  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden py-20 lg:py-32">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full -ml-48 -mt-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full -mr-48 -mb-48" />

      <div className="relative container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-5xl lg:text-6xl font-semibold mb-6 text-balance leading-tight">
            Launch Partners Are Being Selected Now.
          </h2>

          <p className="text-lg lg:text-xl text-primary-foreground/80 mb-8 text-balance">
            Limited institutional partner slots remaining. Secure your spot and
            help shape the future of debt resolution.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-primary font-semibold"
            >
              Become a Launch Partner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {/* <Button size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10">
              Request a Preview Call
            </Button> */}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-primary-foreground/70"
          >
            Enterprise onboarding available. SOC 2 compliant. Limited launch
            partner slots remaining.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
