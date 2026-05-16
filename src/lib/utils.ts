import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Truncate a Stellar address for display */
export function truncateAddress(address: string, chars = 6): string {
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/** Format XLM amount with proper decimals */
export function formatXLM(amount: string | number, decimals = 2): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return `${num.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })} XLM`;
}

/** Format a date relative to now */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString();
}

/** Generate a unique ID (client-safe) */
export function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

/** Check if a string looks like a valid Stellar address */
export function isStellarAddress(value: string): boolean {
  return /^G[A-Z2-7]{55}$/.test(value);
}

/** Extract Stellar addresses from a string */
export function extractStellarAddresses(text: string): string[] {
  const matches = text.match(/G[A-Z2-7]{55}/g);
  return matches ? [...new Set(matches)] : [];
}
