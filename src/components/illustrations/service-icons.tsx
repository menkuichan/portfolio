/**
 * Service icons — hand-drawn doodle glyphs for each service card.
 * Pure SVG, uses `stroke="currentColor"` so they pick up the parent's text color.
 *
 * Style: 32×32 viewBox, 2.5 stroke, rounded caps. Keep the style cohesive.
 */

import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/** Liquid — flowing droplet over wavy template lines */
export function LiquidIcon({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={cn("h-8 w-8", className)} {...props}>
      <path d="M16 4 C 11 11, 8 16, 8 21 C 8 25, 12 28, 16 28 C 20 28, 24 25, 24 21 C 24 16, 21 11, 16 4 Z" />
      <path d="M12 19 C 13 20, 14 20, 16 19 C 18 18, 19 18, 20 19" strokeOpacity="0.6" />
    </svg>
  );
}

/** Hydrogen — atom-ish orbits, signals headless/composable */
export function HydrogenIcon({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={cn("h-8 w-8", className)} {...props}>
      <circle cx="16" cy="16" r="3" fill="currentColor" />
      <ellipse cx="16" cy="16" rx="12" ry="5" />
      <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(-60 16 16)" />
    </svg>
  );
}

/** Apps — plug + socket / integration */
export function AppsIcon({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={cn("h-8 w-8", className)} {...props}>
      <rect x="5" y="11" width="10" height="10" rx="1.5" />
      <path d="M9 11 V 7" />
      <path d="M11 11 V 7" />
      <rect x="17" y="11" width="10" height="10" rx="1.5" />
      <path d="M21 21 V 25" />
      <path d="M23 21 V 25" />
      <path d="M15 16 H 17" strokeOpacity="0.6" />
    </svg>
  );
}

/** Performance — speedometer needle pointing up */
export function PerformanceIcon({ className, ...props }: IconProps) {
  return (
    <svg {...baseProps} className={cn("h-8 w-8", className)} {...props}>
      <path d="M5 22 C 5 14, 10 8, 16 8 C 22 8, 27 14, 27 22" />
      <path d="M16 22 L 21 11" />
      <circle cx="16" cy="22" r="1.5" fill="currentColor" />
      <path d="M8 22 L 9 22" strokeOpacity="0.5" />
      <path d="M24 22 L 23 22" strokeOpacity="0.5" />
    </svg>
  );
}
