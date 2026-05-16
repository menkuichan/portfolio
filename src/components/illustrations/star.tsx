/**
 * Hand-drawn 4-point sparkle star — used as a decorative accent.
 */

import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

export function Star({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="M12 0 C 13 8, 16 11, 24 12 C 16 13, 13 16, 12 24 C 11 16, 8 13, 0 12 C 8 11, 11 8, 12 0 Z" />
    </svg>
  );
}
