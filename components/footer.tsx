"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { PhoneCall, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/fdcpa-notice", label: "FDCPA Notice" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <footer id="waitlist" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Logo & Links */}
          <div className="space-y-8">
            {/* Logo */}
            <Link href="/for-debtors" className="flex items-center gap-2 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-foreground text-primary transition-transform group-hover:scale-105">
                <PhoneCall className="h-5 w-5" />
              </div>
              <span className="font-serif text-xl lg:text-2xl font-semibold">
                NegotiateNow
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
          <div className="space-y-6">
            <div>
              <h3 className="font-serif text-xl lg:text-2xl font-semibold mb-2">
                Get notified when we launch
              </h3>
              <p className="text-primary-foreground/70 text-sm">
                Join the waitlist and be the first to know when NegotiateNow goes live.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:ring-accent h-12"
                />
              </div>
              <Button
                type="submit"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium h-12 px-6"
              >
                {isSubmitted ? (
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
            </form>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <p className="text-xs text-primary-foreground/50 text-center">
            Not a law firm. A financial advocacy service. © {new Date().getFullYear()} NegotiateNow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
