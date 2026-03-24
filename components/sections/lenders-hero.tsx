"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSignup } from "@/hooks/use-signup";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function LendersHero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!email) return;

    const result = await signup({
      email,
      signup_type: "lender",
    });

    if (result.success) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="relative bg-background text-foreground overflow-hidden min-h-screen">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -mr-48 -mt-48" />
      {/*  */}
      <div className="relative container mx-auto mt-[150px] px-4 lg:px-8 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Eyebrow */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-accent">
                Launching Soon · Now Accepting Institutional Partners
              </span>
            </div>
          </motion.div> */}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-5xl lg:text-6xl font-semibold text-foreground mb-6 text-balance leading-tight"
          >
            A Better Way to Resolve Delinquent Accounts Is Almost Here.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance"
          >
            A compliant negotiation platform connecting your institution with
            pre-screened debtors seeking structured resolutions. Better
            outcomes. Less legal overhead. Stronger customer relationships.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-primary font-semibold"
            >
              Become a Launch Partner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {/* <Button size="lg" variant="outline">
              Request a Preview
            </Button> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 max-w-xl mx-auto w-full"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 flex-1 bg-white border-border disabled:opacity-50"
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading || submitted}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 flex-shrink-0 disabled:opacity-50 hover:cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Saving...
                    </>
                  ) : submitted ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      You're in!
                    </>
                  ) : (
                    <>
                      Join the Waitlist
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Trust Badges */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              "FDCPA Compliant",
              "Pre-Screened Debtors",
              "No Litigation Required",
              "SOC 2 Infrastructure",
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg"
              >
                <Check className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  {badge}
                </span>
              </div>
            ))}
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
}
