/**
 * Button primitive.
 *
 * Variants are declared with `cva` so all combinations are type-safe.
 * Add a new variant by extending the `cva` config below — TypeScript
 * will surface the new option everywhere `<Button />` is used.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  // base classes applied to every variant
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium whitespace-nowrap",
    "rounded-full transition-all duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-3",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-ink-900 text-cream-50",
          "hover:bg-ink-700 hover:shadow-card",
          "active:scale-[0.98]",
        ],
        secondary: [
          "bg-peach-300 text-ink-900",
          "hover:bg-peach-500 hover:shadow-card",
          "active:scale-[0.98]",
        ],
        outline: [
          "border-ink-900 text-ink-900 border-2 bg-transparent",
          "hover:bg-ink-900 hover:text-cream-50",
          "active:scale-[0.98]",
        ],
        ghost: ["text-ink-900 bg-transparent", "hover:bg-cream-100"],
        link: ["text-ink-900 bg-transparent underline-offset-4", "rounded-none hover:underline"],
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-13 px-8 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, fullWidth, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  );
});

export { buttonVariants };
