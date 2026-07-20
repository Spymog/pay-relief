"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Clock,
  DollarSign,
  Landmark,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Landmark,
    title: "Connect Your Bank",
    description:
      "Securely link your accounts to identify the lenders and billers you owe",
  },
  {
    icon: Phone,
    title: "AI Makes the Call",
    description:
      "Our agent calls your lenders and requests deferments on your behalf",
  },
  {
    icon: Clock,
    title: "Save Hours Every Week",
    description: "Skip the hold times and contact center runarounds",
  },
  {
    icon: DollarSign,
    title: "Negotiate Better Terms",
    description: "Get payment plans, deferrals, and reduced rates",
  },
];

export function HomeLanding() {
  return (
    <section className="relative overflow-hidden">
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

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-accent/15 text-primary hover:bg-accent/15">
            Financial Advocacy Platform
          </Badge>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
            Negotiate Your Bills
            <span className="text-accent"> with AI</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Connect your accounts, tell us your situation, and let PayRelief
            call and notify your lenders for you. Save hours every week.
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div>
            <Card className="h-full border-2 border-primary/10 bg-gradient-to-br from-card to-secondary/40 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-3 w-fit rounded-xl bg-primary/10 mb-2">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  Request a Deferment Call
                </CardTitle>
                <CardDescription>
                  Our AI agent calls your bank, explains your situation, and
                  requests a payment deferment for you
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link href="/dashboard">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full border-2 border-accent/20 bg-gradient-to-br from-card to-accent/5 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="p-3 w-fit rounded-xl bg-accent/15 mb-2">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-xl">Notify Your Lenders</CardTitle>
                <CardDescription>
                  Send hardship notifications to all your creditors at once,
                  straight from your own inbox
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button
                  asChild
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <Link href="/notify">
                    Send a Notification
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-8">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="text-center border-0 shadow-sm bg-card/70 backdrop-blur"
                >
                  <CardContent className="pt-6">
                    <div className="inline-flex p-3 rounded-xl bg-secondary mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div>
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary-foreground/15">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-lg">
                      Ready to get relief?
                    </h3>
                    <p className="text-primary-foreground/70">
                      Start your first deferment call in minutes
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <Link href="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
