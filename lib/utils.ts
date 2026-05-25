import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(inputs.filter(Boolean).join(" "));
}

/** Builds a tel: href with country code +55. Input may be formatted or digits-only. */
export function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const withCountry = digits.startsWith("55") ? digits : `55${digits}`;
  return `tel:+${withCountry}`;
}

export function isPhoneLine(line: string): boolean {
  const trimmed = line.trim();
  return /^\+?\d[\d\s().-]+$/.test(trimmed) && !trimmed.includes("@");
}
