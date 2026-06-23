import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toE164US(phone: string): string | null {
  // Strip everything except digits
  const digits = phone.replace(/\D/g, "");

  // Accept 10-digit numbers or 11-digit numbers starting with 1
  if (digits.length === 10) {
    return `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  return null; // Invalid
}
