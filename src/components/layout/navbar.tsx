"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, UserCircle, LogOut, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useUser } from "@/context/UserProvider";
import { sbBrowserClient } from "@/lib/supabase/client";

const navLinks = [
  { href: "/for-debtors", label: "For Debtors" },
  { href: "/for-counselors", label: "For Counselors" },
  { href: "/for-lenders", label: "For Lenders" },
  { href: "/deferment-notification", label: "Deferment" },
  { href: "/notify", label: "Notification" },
];

// Dropdown menu items
const profileMenuItems = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const currentUser = useUser();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsProfileMenuOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    const supabase = sbBrowserClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setIsProfileMenuOpen(false);
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-40 bg-background",
        isScrolled ? "border-b border-border shadow-sm duration-90" : "",
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/for-debtors" className="flex items-center gap-2.5 group">
            <div className="relative w-11 h-11 transition-transform group-hover:scale-105">
              <Image
                src="/images/pay-relief-logo.png"
                alt="PayRelief logo"
                fill
                className="rounded-md object-cover"
              />
            </div>
            <span className="font-serif text-xl lg:text-2xl font-semibold text-foreground">
              PayRelief
            </span>
          </Link>

          {/* Desktop Nav Links — centered in middle column */}
          <div className="hidden md:flex items-center justify-center gap-8 min-w-fit">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium hover:text-accent relative py-2",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
                <AnimatePresence>
                  {pathname === link.href && (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </div>

          {/* Auth — pinned to right column */}
          <div className="flex items-center justify-end" ref={profileMenuRef}>
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  className={cn(
                    "text-muted-foreground hover:text-accent transition-colors",
                    (isProfileMenuOpen || pathname === "/profile") &&
                      "text-foreground",
                  )}
                  aria-label="Open profile menu"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="true"
                >
                  <UserCircle className="h-6 w-6" />
                </button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-background shadow-lg overflow-hidden"
                      role="menu"
                    >
                      {currentUser?.email && (
                        <div className="px-4 py-3 border-b border-border">
                          <p className="text-xs text-muted-foreground truncate">
                            {currentUser.email}
                          </p>
                        </div>
                      )}

                      {profileMenuItems.map(({ href, label, icon: Icon }) => (
                        <Link
                          key={href}
                          href={href}
                          role="menuitem"
                          className={cn(
                            "flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
                            pathname === href
                              ? "text-foreground bg-primary/5"
                              : "text-muted-foreground",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </Link>
                      ))}

                      <div className="border-t border-border">
                        <button
                          onClick={handleSignOut}
                          role="menuitem"
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button
                asChild
                size="sm"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium px-5"
              >
                <Link href="/login">Login</Link>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-foreground ml-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg"
          >
            <div className="py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="px-4 pt-2 space-y-1 border-t border-border">
                {currentUser ? (
                  <>
                    {profileMenuItems.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors",
                          pathname === href
                            ? "bg-primary/10 text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {label}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-base font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
                  >
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
