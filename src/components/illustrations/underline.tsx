/**
 * Hand-drawn underline — wavy stroke for emphasizing a word in a heading.
 * Subtler than `Squiggle` (which is more decorative). Use under inline text.
 */

import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

export function Underline({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={cn("h-2 w-full", className)}
      {...props}
    >
      <path d="M2 7 C 30 2, 60 11, 100 6 S 170 1, 198 5" />
    </svg>
  );
}
