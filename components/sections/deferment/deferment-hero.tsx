"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Zap, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlaidLink } from "react-plaid-link";

interface LinkProps {
  linkToken: string | null;
}

export function DefermentHero() {
  const [linkToken, setLinkToken] = useState(null);
  const [loadingLink, setloadingLink] = useState(false);

  const [shouldOpen, setShouldOpen] = useState(false);

  const [publicToken, setPublicToken] = useState("");

  async function generateToken() {
    const response = await fetch("../../api/link", { method: "POST" });
    const data = await response.json();
    // console.log("Link Token data:\n", data);
    // console.log("Setting link_token:\n", data.link_token);
    setLinkToken(data.link_token);
  }

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      // console.log("Success:", public_token, metadata);
      setPublicToken(public_token);

      try {
        const response = await fetch("/api/exchange-public-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_token }),
        });

        const data = await response.json();
        // console.log("Exchange response:\n", data);
        // console.log("Item ID:\n", data.item_id);
      } catch (error) {
        // console.error("Error exchanging public token:\n", error);
      }
    },
    onLoad: () => {
      // console.log("onLoad test");
      setloadingLink(false);
    },
  });

  useEffect(() => {
    if (shouldOpen && ready && linkToken) {
      open();
      // setloadingLink(false);
      setShouldOpen(false);
    }
  }, [shouldOpen, ready, linkToken, open]);

  async function handleLink() {
    setloadingLink(true);
    await generateToken();
    setShouldOpen(true);
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
            {loadingLink ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            ) : (
              <>Sign In to Your Bank</>
            )}
          </Button>
          <form></form>
        </div>
      </div>
    </section>
  );
}
