/**
 * Hand-drawn squiggle — used as a doodle accent under headings.
 *
 * Pure SVG component. Color via `stroke` (inherits `currentColor` by default
 * so you can colorize with Tailwind `text-peach-500`).
 */

import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

export function Squiggle({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 240 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-3 w-auto", className)}
      {...props}
    >
      <path d="M2 9 C 20 1, 40 17, 60 9 S 100 1, 120 9 S 160 17, 180 9 S 220 1, 238 9" />
    </svg>
  );
}
