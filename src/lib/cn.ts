/**
 * `cn` — merge Tailwind class strings safely.
 *
 * Combines `clsx` (handles conditionals & arrays) with `tailwind-merge`
 * (resolves conflicting utilities — e.g. `px-2 px-4` -> `px-4`).
 *
 * Usage:
 *   cn("px-2 py-1", isActive && "bg-peach-300", className)
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
