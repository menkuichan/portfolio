/**
 * Hand-drawn bracket — for "wrapping" content with personality.
 * Comes in left/right variants via the `side` prop.
 */

import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

interface BracketProps extends SVGProps<SVGSVGElement> {
  side?: "left" | "right";
}

export function Bracket({ side = "left", className, ...props }: BracketProps) {
  return (
    <svg
      viewBox="0 0 20 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-24 w-5", side === "right" && "scale-x-[-1]", className)}
      {...props}
    >
      <path d="M15 4 C 8 6, 4 14, 4 30 C 4 42, 6 48, 8 50 C 6 52, 4 58, 4 70 C 4 86, 8 94, 15 96" />
    </svg>
  );
}
