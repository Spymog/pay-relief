"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/fdcpa-notice", label: "FDCPA Notice" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
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
