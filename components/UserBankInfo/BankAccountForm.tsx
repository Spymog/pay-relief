"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  CreditCard,
  Building2,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import type { Bank } from "@/lib/banks";

// ── Validation Schema ────────────────────────────────────────────────────────

const bankAccountSchema = z.object({
  bankId: z.string().min(1, "Please select a bank"),
  bankAccountNumber: z
    .string()
    .min(8, "Account number must be at least 8 digits")
    .max(17, "Account number must be at most 17 digits")
    .regex(/^\d+$/, "Account number must contain only digits"),

  phoneNumber: z
    .string()
    .regex(
      /^\+?[\d\s\-().]{7,20}$/,
      "Enter a valid phone number (e.g. +1 555-123-4567)",
    ),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address is too long"),

  creditCardNumber: z
    .string()
    .regex(
      /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/,
      "Enter a valid 16-digit card number",
    ),

  // NEW
  bankContactNumber: z
    .string()
    .regex(
      /^\+?[\d\s\-().]{7,20}$/,
      "Enter a valid phone number (e.g. +1 555-123-4567)",
    ),

  email: z.string().email("Enter a valid email address"),

  ssnLast4: z
    .string()
    .length(4, "Enter exactly 4 digits")
    .regex(/^\d{4}$/, "Must be 4 numeric digits"),
});

type BankAccountFormValues = z.infer<typeof bankAccountSchema>;

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function formatPhone(value: string) {
  return value.replace(/[^\d\s\-+().]/g, "").slice(0, 20);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function BankAccountForm({ banks }: { banks: Bank[] }) {
  const [submitted, setSubmitted] = useState(false);

  const [visible, setVisible] = useState({
    bankAccountNumber: false,
    creditCardNumber: false,
    ssnLast4: false,
  });

  const toggle = (field: keyof typeof visible) =>
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));

  const form = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      bankId: "",
      bankAccountNumber: "",
      phoneNumber: "",
      address: "",
      creditCardNumber: "",
      bankContactNumber: "", // NEW
      email: "",
      ssnLast4: "",
    },
  });

  function onSubmit(values: BankAccountFormValues) {
    // Replace with your actual submission logic (e.g. API call)
    console.log("Form submitted:", values);
    setSubmitted(true);
  }

  return (
    <div className="flex items-center justify-center p-4">
      {/* <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4"> */}
      {submitted ? (
        <Card className="w-full max-w-md text-center shadow-lg">
          <CardHeader>
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <ShieldCheck className="h-7 w-7 text-green-600" />
            </div>
            <CardTitle className="text-xl">Information Submitted</CardTitle>
            <CardDescription>
              Your bank account details have been received securely.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button
              variant="outline"
              onClick={() => {
                form.reset();
                setSubmitted(false);
              }}
            >
              Submit Another
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full max-w-2xl shadow-lg">
          {/* Header */}
          <CardHeader className="space-y-1 pb-2">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-slate-600" />
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Bank Account Details
              </CardTitle>
            </div>
            <CardDescription className="text-sm text-slate-500">
              Please fill in your banking information. All fields are required.
            </CardDescription>
            {/* <Badge
            variant="secondary"
            className="w-fit gap-1.5 bg-green-50 text-green-700 border border-green-200"
          >
            <Lock className="h-3 w-3" />
            Encrypted &amp; Secure
          </Badge> */}
          </CardHeader>

          <Separator />

          <CardContent className="pt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* ── Account Information ── */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Account Information
                  </p>
                  {/* Bank Selector */}
                  <FormField
                    control={form.control}
                    name="bankId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank</FormLabel>
                        <Select
                          onValueChange={(selectedId) => {
                            field.onChange(selectedId);
                            // Auto-fill bankContactNumber from the selected bank
                            const bank = banks.find((b) => b.id === selectedId);
                            if (bank) {
                              form.setValue(
                                "bankContactNumber",
                                bank.deferment_phone,
                                {
                                  shouldValidate: true,
                                },
                              );
                            }
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your bank" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {banks.map((bank) => (
                              <SelectItem key={bank.id} value={bank.id}>
                                {bank.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Bank Account Number */}
                  <FormField
                    control={form.control}
                    name="bankAccountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={
                                visible.bankAccountNumber ? "text" : "password"
                              }
                              // placeholder="e.g. 123456789012"
                              inputMode="numeric"
                              maxLength={17}
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value.replace(/\D/g, ""),
                                )
                              }
                              className="pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => toggle("bankAccountNumber")}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                              aria-label="Toggle account number visibility"
                            >
                              {visible.bankAccountNumber ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Your checking or savings account number.
                          {/* Your checking or savings account number (8–17 digits). */}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Credit Card Number + Bank Contact Number */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="creditCardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1.5">
                            <CreditCard className="h-3.5 w-3.5 text-slate-500" />
                            Credit Card Number
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={
                                  visible.creditCardNumber ? "text" : "password"
                                }
                                inputMode="numeric"
                                maxLength={19}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    formatCardNumber(e.target.value),
                                  )
                                }
                                className="pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => toggle("creditCardNumber")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                aria-label="Toggle credit card number visibility"
                              >
                                {visible.creditCardNumber ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormDescription>
                            16-digit number on the front of your card.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* NEW — Bank Contact Number */}
                    <FormField
                      control={form.control}
                      name="bankContactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Contact Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              inputMode="numeric"
                              {...field}
                              onChange={(e) =>
                                field.onChange(formatPhone(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Contact number associated with your bank.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* ── Contact Details ── */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Contact Details
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              // placeholder="you@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone Number */}
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              // placeholder="+1 555-123-4567"
                              {...field}
                              onChange={(e) =>
                                field.onChange(formatPhone(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input
                            // placeholder="123 Main St, City, State, ZIP"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Full mailing address associated with your account.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* ── Verification ── */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Verification
                  </p>
                  {/* Submit Row */}
                  <div className="flex items-center justify-between pt-2">
                    {/* <p className="text-xs text-slate-400">
                    Your data is protected with 256-bit encryption.
                  </p> */}
                    <FormField
                      control={form.control}
                      name="ssnLast4"
                      render={({ field }) => (
                        <FormItem className="max-w-[180px]">
                          <FormLabel>Last 4 Digits of SSN</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                className="placeholder:text-muted-foreground-200"
                                type={visible.ssnLast4 ? "text" : "password"}
                                // placeholder="••••"
                                inputMode="numeric"
                                maxLength={4}
                                autoComplete="off"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value
                                      .replace(/\D/g, "")
                                      .slice(0, 4),
                                  )
                                }
                              />
                              <button
                                type="button"
                                onClick={() => toggle("ssnLast4")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                aria-label="Toggle ssn visibility"
                              >
                                {visible.ssnLast4 ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormDescription>
                            Used for identity verification only.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="min-w-[140px]">
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
