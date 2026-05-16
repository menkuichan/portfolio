/**
 * Custom MDX component map.
 *
 * Maps standard markdown elements to styled React components so the
 * blog matches the site's doodle visual identity without writing CSS
 * for each MDX file.
 *
 * Used by the MDX renderer in `mdx-renderer.tsx`.
 */

import type { AnchorHTMLAttributes, HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

function H1({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "font-display text-ink mt-12 mb-4 text-4xl leading-tight tracking-tight first:mt-0 md:text-5xl",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

function H2({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "font-display text-ink mt-10 mb-3 text-3xl leading-tight tracking-tight first:mt-0",
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

function H3({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display text-ink mt-8 mb-2 text-2xl leading-tight", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

function P({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-ink mt-5 text-base leading-relaxed md:text-lg", className)} {...props}>
      {children}
    </p>
  );
}

function A({ className, children, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith("http");
  return (
    <a
      href={href}
      className={cn(
        "text-ink decoration-peach-300 hover:decoration-peach-500 underline decoration-2 underline-offset-4 transition-colors",
        className,
      )}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

function Ul({ className, children, ...props }: HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        "text-ink mt-5 ml-6 list-disc space-y-2 text-base leading-relaxed md:text-lg",
        "marker:text-peach-500",
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

function Ol({ className, children, ...props }: HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn(
        "text-ink mt-5 ml-6 list-decimal space-y-2 text-base leading-relaxed md:text-lg",
        "marker:text-peach-500 marker:font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

function Blockquote({ className, children, ...props }: HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        "border-peach-300 bg-peach-100 my-8 rounded-r-2xl border-l-4 px-6 py-4",
        "text-ink italic",
        className,
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
}

function InlineCode({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        "bg-cream-100 text-ink border-cream-300 rounded-md border px-1.5 py-0.5 font-mono text-[0.92em]",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}

function Pre({ className, children, ...props }: HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      className={cn(
        "bg-ink-900 my-6 overflow-x-auto rounded-(--radius-card) p-5 text-sm leading-relaxed",
        "text-cream-50 font-mono",
        // rehype-pretty-code sets a class on the pre — we accept its defaults
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  );
}

function Hr({ className, ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("border-cream-200 my-10 border-t", className)} {...props} />;
}

function Strong({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <strong className={cn("text-ink font-semibold", className)} {...props}>
      {children}
    </strong>
  );
}

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  a: A,
  ul: Ul,
  ol: Ol,
  blockquote: Blockquote,
  code: InlineCode,
  pre: Pre,
  hr: Hr,
  strong: Strong,
};
