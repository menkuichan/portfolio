/**
 * Dot grid — decorative background pattern.
 * Use as a "texture" behind cards or in negative space.
 */

import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

export function Dots({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-20 w-20", className)}
      {...props}
    >
      {Array.from({ length: 5 }).flatMap((_, row) =>
        Array.from({ length: 5 }).map((_unused, col) => (
          <circle key={`${row}-${col}`} cx={8 + col * 16} cy={8 + row * 16} r="1.5" />
        )),
      )}
    </svg>
  );
}
