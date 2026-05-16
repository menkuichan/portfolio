/**
 * Hand-drawn curved arrow — for emphasis, redirecting attention,
 * or "from this to that" visual pointers.
 */

import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

export function Arrow({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 60 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-10 w-12", className)}
      {...props}
    >
      <path d="M5 10 C 20 0, 45 5, 50 30" />
      <path d="M42 22 L 51 32 L 41 38" />
    </svg>
  );
}
