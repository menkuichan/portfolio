/**
 * Portrait placeholder — stylized doodle silhouette used until a real
 * photo is ready. Looks intentional, not "forgot to add the image".
 *
 * When you have a photo:
 *   1. Drop it at /public/ilona.jpg (or .webp)
 *   2. Replace usages of this component with <Image src="/ilona.jpg" ... />
 */

import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

export function PortraitPlaceholder({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 200 250"
      fill="none"
      aria-hidden="true"
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
      {...props}
    >
      {/* Background blob */}
      <ellipse cx="100" cy="135" rx="95" ry="120" className="fill-peach-100" />

      {/* Shoulders / body */}
      <path
        d="M 30 250 C 30 200, 60 175, 100 175 C 140 175, 170 200, 170 250 Z"
        className="fill-ink-900"
      />

      {/* Neck */}
      <rect x="88" y="155" width="24" height="30" className="fill-peach-300" />

      {/* Head */}
      <ellipse cx="100" cy="115" rx="38" ry="44" className="fill-peach-300" />

      {/* Hair — long flowing locks */}
      <path
        d="M 62 110 C 55 80, 70 50, 100 50 C 130 50, 145 80, 138 110 C 145 130, 145 155, 138 175 L 130 175 C 132 145, 128 125, 120 115 L 80 115 C 72 125, 68 145, 70 175 L 62 175 C 55 155, 55 130, 62 110 Z"
        className="fill-ink-900"
      />

      {/* Subtle face accents */}
      <circle cx="86" cy="115" r="2" className="fill-ink-900" />
      <circle cx="114" cy="115" r="2" className="fill-ink-900" />
      <path
        d="M 90 130 C 95 134, 105 134, 110 130"
        stroke="currentColor"
        className="stroke-ink-900"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Sparkle on shoulder */}
      <path
        d="M 145 195 L 147 200 L 152 202 L 147 204 L 145 209 L 143 204 L 138 202 L 143 200 Z"
        className="fill-sun-300"
      />
    </svg>
  );
}
