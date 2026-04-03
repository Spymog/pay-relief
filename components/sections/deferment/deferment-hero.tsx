"use client";
import { useState } from "react";
import { ArrowRight, Zap, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DefermentHero() {
  async function handleLink() {
    const response = await fetch("../../api/link");
    console.log(response);
  }

  return (
    <section className="min-h-screen pt-8 pb-20 px-4 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Deferment
        </h1>
        <div className="">
          <h2>Get Started</h2>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-12 flex-shrink-0 disabled:opacity-50 hover:cursor-pointer"
            onClick={() => handleLink()}
          >
            Sign In to Your Bank
          </Button>
          <form></form>
        </div>
      </div>
    </section>
  );
}
