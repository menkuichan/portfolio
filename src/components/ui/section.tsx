/**
 * Section — semantic <section> with consistent vertical padding.
 *
 * Use one per page chunk (Hero, Services, Tech, etc.).
 * Padding presets keep rhythm across the site predictable.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      sm: "py-12 md:py-16",
      md: "py-16 md:py-24",
      lg: "py-24 md:py-32",
    },
    tone: {
      transparent: "",
      surface: "bg-surface",
      cream: "bg-cream-50",
    },
  },
  defaultVariants: {
    spacing: "md",
    tone: "transparent",
  },
});

export interface SectionProps
  extends HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { className, spacing, tone, ...props },
  ref,
) {
  return (
    <section ref={ref} className={cn(sectionVariants({ spacing, tone }), className)} {...props} />
  );
});

export { sectionVariants };
