"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/hooks/use-signup";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/fdcpa-notice", label: "FDCPA Notice" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const result = await signup({
      email,
      signup_type: "debtor",
    });

    if (result.success) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <footer id="waitlist" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Logo & Links */}
          <div className="space-y-8">
            {/* Logo */}
            <Link
              href="/for-debtors"
              className="flex items-center gap-2.5 group"
            >
              <div className="relative w-11 h-11 transition-transform group-hover:scale-105">
                <Image
                  src="/images/pay-relief-logo.png"
                  alt="PayRelief logo"
                  fill
                  sizes="44px"
                  className="rounded-md object-cover brightness-110"
                  // className="rounded-lg object-cover brightness-110"
                />
              </div>
              <span className="font-serif text-xl lg:text-2xl font-semibold">
                PayRelief
              </span>
            </Link>

            {/* Tagline */}
            <p className="text-lg font-medium text-primary-foreground/90">
              Launching Soon — Be First in Line
            </p>

            {/* Navigation Links */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Column - Email Capture */}
          {/* <div className="space-y-6">
            <div>
              <h3 className="font-serif text-xl lg:text-2xl font-semibold mb-2">
                Get notified when we launch
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                Join the waitlist and be the first to know when PayRelief goes
                live.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:ring-accent h-12 disabled:opacity-50"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || isSubmitted}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium h-12 px-6 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent mr-2" />
                      Saving...
                    </>
                  ) : isSubmitted ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      Subscribed!
                    </motion.span>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-accent bg-primary-foreground/10 p-3 rounded-lg"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </form>
          </div> */}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-xs text-primary-foreground/50 text-center">
            Not a law firm. A financial advocacy service. ©{" "}
            {new Date().getFullYear()} PayRelief. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
