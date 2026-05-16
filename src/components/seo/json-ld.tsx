/**
 * JSON-LD structured data injector.
 *
 * Renders a <script type="application/ld+json"> with the given schema.
 * Use the helper factories below to construct schemas typed safely.
 *
 * Google reads these to power knowledge-panel results, rich snippets,
 * and the "About this page" surface. Without JSON-LD, search just sees
 * raw HTML and infers less.
 */

import { siteConfig } from "@/config/site";

interface JsonLdProps {
  data: Record<string, unknown> | readonly Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Stringifying server-side; safe by construction (we control the input).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ---------- Schema builders ----------

/**
 * Person schema for the site owner — used on About page and root layout.
 * Helps Google's Knowledge Graph recognize Ilona as an entity.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    jobTitle: "Shopify Developer (Liquid + Hydrogen)",
    sameAs: [siteConfig.socials.linkedin, siteConfig.socials.github],
    knowsAbout: [
      "Shopify Liquid",
      "Shopify Hydrogen",
      "React",
      "TypeScript",
      "Headless commerce",
      "E-commerce development",
    ],
  };
}

/**
 * Website schema — gives Google the site name + a sitelinks searchbox hint.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: ["en", "ru", "es", "pt"],
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };
}

/**
 * BlogPosting schema — emitted per blog post page.
 */
export interface BlogPostingArgs {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  tags: readonly string[];
}

export function blogPostingSchema(args: BlogPostingArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: args.title,
    description: args.description,
    datePublished: args.datePublished,
    dateModified: args.datePublished,
    keywords: args.tags.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": args.url },
    url: args.url,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };
}
