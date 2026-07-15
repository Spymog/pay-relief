import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Verify Your Email — PayRelief",
  description: "Next steps to activate your PayRelief account.",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl md:mb-60 mb-30">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
              <MailCheck className="h-5 w-5" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Check your email
          </CardTitle>
          <CardDescription>
            Your account was created — one step left
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            We sent an activation link to{" "}
            {email ? (
              <span className="font-medium text-foreground">{email}</span>
            ) : (
              "your email address"
            )}
            . Click the link in that email to verify your account.
          </p>
          <ol className="list-decimal space-y-1.5 pl-5">
            <li>Open the email from PayRelief in your inbox.</li>
            <li>Click the activation link inside.</li>
            <li>Come back and sign in with your new account.</li>
          </ol>
          <p>
            Don&apos;t see it? Check your spam or junk folder — it can take a
            couple of minutes to arrive.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
