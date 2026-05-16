/**
 * Eyebrow — small uppercase label that sits above section headings.
 *
 * Visual purpose: gives quick category context ("WHAT I DO", "TECH STACK")
 * and creates a typographic rhythm across the page.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const eyebrowVariants = cva(
  ["inline-flex items-center gap-2", "text-xs font-semibold tracking-[0.18em] uppercase"],
  {
    variants: {
      tone: {
        muted: "text-ink-muted",
        peach: "text-peach-500",
        mint: "text-mint-500",
        lavender: "text-lavender-500",
        sun: "text-sun-500",
      },
    },
    defaultVariants: { tone: "muted" },
  },
);

export interface EyebrowProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof eyebrowVariants> {}

export const Eyebrow = forwardRef<HTMLSpanElement, EyebrowProps>(function Eyebrow(
  { className, tone, children, ...props },
  ref,
) {
  return (
    <span ref={ref} className={cn(eyebrowVariants({ tone }), className)} {...props}>
      <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-60" />
      {children}
    </span>
  );
});

export { eyebrowVariants };
