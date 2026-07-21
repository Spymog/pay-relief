import { z } from "zod";

export const ACCOUNT_TYPES = [
  "checking",
  "savings",
  "credit_card",
  "loan",
  "line_of_credit",
  "other",
] as const;

export type AccountType = (typeof ACCOUNT_TYPES)[number];

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  checking: "Checking",
  savings: "Savings",
  credit_card: "Credit Card",
  loan: "Loan",
  line_of_credit: "Line of Credit",
  other: "Other",
};

export const StatementExtractionSchema = z.object({
  institution_name: z
    .string()
    .describe(
      "The full legal name of the financial institution that issued this statement.",
    ),
  institution_aliases: z
    .array(z.string())
    .describe(
      "Other common names, abbreviations, or trade names for the institution, if any. Empty array if none.",
    ),
  account_type: z.enum(ACCOUNT_TYPES),
  last4: z
    .string()
    .nullable()
    .describe(
      "The last 4 digits of the account number, if visible on the statement. Null if not found.",
    ),
  confidence: z
    .enum(["high", "medium", "low"])
    .describe(
      "How confident you are in the institution_name and account_type fields above.",
    ),
});

export type StatementExtraction = z.infer<typeof StatementExtractionSchema>;
