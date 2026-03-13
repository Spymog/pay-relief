"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/hooks/use-signup";

export function DebtorsHero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const result = await signup({
      email,
      signup_type: "debtor",
    });

    if (result.success) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-8 pb-20 px-4 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-8"
        >
          <Zap className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-accent">Coming Soon</span>
        </motion.div> */}

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          Negotiate Your Debt With Confidence
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto"
        >
          Expert negotiation strategies combined with AI-powered insights to
          help you settle your debts faster and save thousands.
        </motion.p>

        {/* Email signup form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
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

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-sm text-foreground/60"
        >
          Join 5,000+ people waiting to take control of their debt
        </motion.p>
      </div>
    </section>
  );
}
