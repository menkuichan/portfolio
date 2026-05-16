/**
 * Badge — small label/tag.
 *
 * Used for: tags in blog posts, "Open to work" pill, tech-stack chips.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  ["inline-flex items-center gap-1.5", "rounded-full font-medium", "border transition-colors"],
  {
    variants: {
      tone: {
        neutral: "bg-cream-100 text-ink border-cream-200",
        peach: "bg-peach-100 text-peach-500 border-peach-300",
        mint: "bg-mint-100 text-mint-500 border-mint-300",
        lavender: "bg-lavender-100 text-lavender-500 border-lavender-300",
        sun: "bg-sun-100 text-sun-500 border-sun-300",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      tone: "neutral",
      size: "sm",
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { className, tone, size, ...props },
  ref,
) {
  return <span ref={ref} className={cn(badgeVariants({ tone, size }), className)} {...props} />;
});

export { badgeVariants };
