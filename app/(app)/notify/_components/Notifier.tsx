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

    const { redirectUrl } = await res.json();
    window.location.href = redirectUrl;
  }

  if (success) {
    return (
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-accent/10 p-2">
              <CheckCircle2 className="h-6 w-6 text-accent" />
            </div>
            <CardTitle className="text-xl">Email Sent!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground text-sm">
          {sentFrom && (
            <p>
              Your email was sent from{" "}
              <span className="font-medium text-foreground">
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
            className="w-full"
            onClick={() => (window.location.href = "/notify")}
          >
            Send Another Email
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              Send from Your Gmail
            </CardTitle>
            <CardDescription>
              Fill in the details, then authenticate with Google to send.
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className="border-accent text-accent text-xs gap-1 shrink-0"
          >
            <ShieldCheck className="h-3 w-3" />
            No storage
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Error from OAuth callback */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {ERROR_MESSAGES[error] ?? "An unexpected error occurred."}
            </AlertDescription>
          </Alert>
        )}

        {/* Validation error */}
        {validationError && (
          <Alert className="border-accent/50 bg-accent/10 text-accent-foreground">
            <AlertCircle className="h-4 w-4 text-accent" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="to" className="text-sm">
            To
          </Label>
          <Input
            id="to"
            type="email"
            placeholder="recipient@example.com"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="subject" className="text-sm">
            Subject
          </Label>
          <Input
            id="subject"
            placeholder="What's this about?"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="body" className="text-sm">
            Message
          </Label>
          <Textarea
            id="body"
            placeholder="Write your message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="resize-none"
          />
        </div>

        {/* Privacy notice */}
        <div className="rounded-md border border-border bg-muted/40 p-3 text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">How this works</p>
          <p>
            Clicking Send will open a Google sign-in window. After you
            authenticate, your email is sent immediately using the Gmail API.
            The access token is used once and never stored — not in our database
            or anywhere else.
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full font-medium gap-2">
          Sign in with Google & Send
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
