/**
 * Card primitives — compound pattern.
 *
 * Usage:
 *   <Card>
 *     <CardHeader>Title</CardHeader>
 *     <CardBody>Body content</CardBody>
 *     <CardFooter>Actions</CardFooter>
 *   </Card>
 *
 * The pieces are independent components so the order, omission,
 * and nesting are flexible — better than a single `<Card title=... body=... />`.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const cardVariants = cva(
  ["rounded-(--radius-card) border transition-shadow duration-200", "overflow-hidden"],
  {
    variants: {
      tone: {
        surface: "bg-surface border-cream-200",
        elevated: "bg-cream-50 border-cream-200 shadow-card hover:shadow-hover",
        accent: "bg-peach-100 border-peach-300",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      tone: "surface",
      padding: "md",
    },
  },
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, tone, padding, ...props },
  ref,
) {
  return <div ref={ref} className={cn(cardVariants({ tone, padding }), className)} {...props} />;
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props} />;
  },
);

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  function CardTitle({ className, children, ...props }, ref) {
    return (
      <h3
        ref={ref}
        className={cn("font-display text-ink text-2xl leading-tight", className)}
        {...props}
      >
        {children}
      </h3>
    );
  },
);

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("text-ink-muted text-sm", className)} {...props} />;
});

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardBody({ className, ...props }, ref) {
    return <div ref={ref} className={cn("mt-4", className)} {...props} />;
  },
);

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return <div ref={ref} className={cn("mt-6 flex items-center gap-3", className)} {...props} />;
  },
);

export { cardVariants };
