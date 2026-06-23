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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Building2, Eye, EyeOff } from "lucide-react";
import type { Bank } from "@/lib/banks";
import { useUser } from "@/context/UserProvider";

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

function formatPhone(value: string) {
  return value.replace(/[^\d\s\-+().]/g, "").slice(0, 20);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function BankAccountForm({ banks }: { banks: Bank[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [bankPopoverOpen, setBankPopoverOpen] = useState(false);

  const [visible, setVisible] = useState({
    bankAccountNumber: false,
    ssnLast4: false,
  });

  const currentUser = useUser();

  const toggle = (field: keyof typeof visible) =>
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));

  const form = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      bankId: "",
      bankAccountNumber: "",
      phoneNumber: "",
      address: "",
      bankContactNumber: "",
      email: "",
      ssnLast4: "",
    },
  });

  async function onSubmit(values: BankAccountFormValues) {
    console.log("Form submitted:", values);
    setSubmitted(true);
    const response = await fetch("/api/make-call", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const result = await response.json();
    console.log("NLPearl call response:", result);
  }

  return (
    <div className="flex items-center justify-center p-4">
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

                  {/* Bank Search */}
                  <FormField
                    control={form.control}
                    name="bankId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank</FormLabel>
                        <Popover
                          open={bankPopoverOpen}
                          onOpenChange={setBankPopoverOpen}
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? banks.find((b) => b.id === field.value)
                                      ?.name
                                  : "Search for your bank..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Type a bank name..." />
                              <CommandList>
                                <CommandEmpty>No bank found.</CommandEmpty>
                                <CommandGroup>
                                  {banks.map((bank) => (
                                    <CommandItem
                                      key={bank.id}
                                      value={bank.name}
                                      onSelect={() => {
                                        field.onChange(bank.id);
                                        form.setValue(
                                          "bankContactNumber",
                                          bank.deferment_phone,
                                          {
                                            shouldValidate: true,
                                          },
                                        );
                                        setBankPopoverOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value === bank.id
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {bank.name}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
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
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Bank Contact Number */}
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
                            <Input type="email" {...field} />
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
                          <Input {...field} />
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
                  <div className="flex items-center justify-between pt-2">
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
