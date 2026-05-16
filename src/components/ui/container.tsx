/**
 * Container — max-width wrapper with horizontal padding.
 *
 * Use to align content to the site's content column.
 * Defaults to "content" width (72rem ≈ 1152px). Switch to "prose"
 * for long-form text (blog posts) and "wide" for hero/feature areas.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const containerVariants = cva("mx-auto w-full px-6 md:px-8", {
  variants: {
    size: {
      prose: "max-w-prose", // ~65ch — reading width
      content: "max-w-(--container-content)", // 72rem
      wide: "max-w-7xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "content",
  },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
  as?: ElementType;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { className, size, as: Component = "div", ...props },
  ref,
) {
  return <Component ref={ref} className={cn(containerVariants({ size }), className)} {...props} />;
});

export { containerVariants };
