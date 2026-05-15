"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  AlertCircle,
  Mail,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const ERROR_MESSAGES: Record<string, string> = {
  access_denied: "You cancelled the Google sign-in. No email was sent.",
  token_exchange_failed:
    "Could not authenticate with Google. Please try again.",
  profile_fetch_failed:
    "Could not retrieve your Gmail address. Please try again.",
  send_failed: "The email failed to send. Please try again.",
  invalid_state: "Session expired or invalid. Please fill out the form again.",
};

export default function Notifier() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const error = searchParams.get("error");
  const sentFrom = searchParams.get("from");

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [validationError, setValidationError] = useState("");

  // If returning from OAuth with success, clear any leftover form data
  useEffect(() => {
    if (success) {
      setTo("");
      setSubject("");
      setBody("");
    }
  }, [success]);

  function validate() {
    if (!to.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to.trim())) {
      setValidationError("Please enter a valid recipient email address.");
      return false;
    }
    if (!subject.trim()) {
      setValidationError("Please enter a subject.");
      return false;
    }
    if (!body.trim()) {
      setValidationError("Please enter a message body.");
      return false;
    }
    setValidationError("");
    return true;
  }

  async function handleSend() {
    if (!validate()) return;

    // POST form data to the server — nothing sensitive touches the URL
    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, body }),
    });

    if (!res.ok) {
      const { error } = await res.json();
      setValidationError(error || "Something went wrong. Please try again.");
      return;
    }

    // Server returns the Google OAuth URL — redirect the browser to it
    const { redirectUrl } = await res.json();
    window.location.href = redirectUrl;
  }

  if (success) {
    return (
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-white shadow-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-500/10 p-2">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            </div>
            <CardTitle className="text-xl text-white">Email Sent!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-zinc-400 text-sm">
          {sentFrom && (
            <p>
              Your email was sent from{" "}
              <span className="font-medium text-zinc-200">
                {decodeURIComponent(sentFrom)}
              </span>{" "}
              using your Gmail account.
            </p>
          )}
          <p>
            Your Google access token was used immediately and was never stored —
            your account remains fully under your control.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            onClick={() => (window.location.href = "/notify")}
          >
            Send Another Email
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 text-white shadow-2xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Mail className="h-5 w-5 text-zinc-400" />
              Send from Your Gmail
            </CardTitle>
            <CardDescription className="text-zinc-500">
              Fill in the details, then authenticate with Google to send.
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="border-emerald-700 text-emerald-400 text-xs gap-1 shrink-0"
          >
            <ShieldCheck className="h-3 w-3" />
            No storage
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Error from OAuth callback */}
        {error && (
          <Alert className="border-red-800 bg-red-950/40 text-red-400">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {ERROR_MESSAGES[error] ?? "An unexpected error occurred."}
            </AlertDescription>
          </Alert>
        )}

        {/* Validation error */}
        {validationError && (
          <Alert className="border-amber-800 bg-amber-950/40 text-amber-400">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="to" className="text-zinc-300 text-sm">
            To
          </Label>
          <Input
            id="to"
            type="email"
            placeholder="recipient@example.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-500"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="subject" className="text-zinc-300 text-sm">
            Subject
          </Label>
          <Input
            id="subject"
            placeholder="What's this about?"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-500"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="body" className="text-zinc-300 text-sm">
            Message
          </Label>
          <Textarea
            id="body"
            placeholder="Write your message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-500 resize-none"
          />
        </div>

        {/* Privacy notice */}
        <div className="rounded-md border border-zinc-800 bg-zinc-800/40 p-3 text-xs text-zinc-500 space-y-1">
          <p className="font-medium text-zinc-400">How this works</p>
          <p>
            Clicking Send will open a Google sign-in window. After you
            authenticate, your email is sent immediately using the Gmail API.
            The access token is used once and never stored — not in our database
            or anywhere else.
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleSend}
          className="w-full bg-white text-zinc-900 hover:bg-zinc-100 font-medium gap-2"
        >
          Sign in with Google & Send
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
