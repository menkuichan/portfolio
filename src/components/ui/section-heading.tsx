/**
 * SectionHeading — composite heading used at the top of each major
 * section. Combines: optional eyebrow → h2 → optional handwritten
 * subtitle → optional doodle underline.
 *
 * Designed as a small composition layer so the visual rhythm of
 * every section stays consistent without each section reinventing
 * its own heading layout.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ReactNode } from "react";
import { Squiggle } from "@/components/illustrations";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";

const headingVariants = cva("font-display text-ink leading-[1.1] tracking-tight", {
  variants: {
    size: {
      md: "text-3xl md:text-4xl",
      lg: "text-4xl md:text-5xl",
      xl: "text-5xl md:text-6xl",
    },
  },
  defaultVariants: { size: "lg" },
});

export interface SectionHeadingProps extends VariantProps<typeof headingVariants> {
  /** Small uppercase label above the heading (translated string) */
  eyebrow?: string;
  /** Eyebrow color tone */
  eyebrowTone?: "muted" | "peach" | "mint" | "lavender" | "sun";
  /** Main h2 text */
  title: ReactNode;
  /** Optional handwritten note below the title — playful accent */
  note?: string;
  /** Whether to show a peachy squiggle under the title */
  withDoodle?: boolean;
  /** Center align everything (default true) */
  centered?: boolean;
  className?: string;
}

export const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  function SectionHeading(
    {
      eyebrow,
      eyebrowTone = "muted",
      title,
      note,
      withDoodle = false,
      centered = true,
      size,
      className,
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-3",
          centered && "mx-auto items-center text-center",
          className,
        )}
      >
        {eyebrow ? <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow> : null}
        <h2 className={headingVariants({ size })}>{title}</h2>
        {withDoodle ? (
          <Squiggle className={cn("text-peach-500 h-3 w-40", centered ? "mt-1" : "mt-1 -ml-1")} />
        ) : null}
        {note ? <p className="font-hand text-ink-muted mt-1 text-xl">{note}</p> : null}
      </div>
    );
  },
);
