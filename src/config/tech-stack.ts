/**
 * Tech stack grouped by category.
 *
 * Tech names are brand strings (no translation needed).
 * Category labels are translated via "TechStack.categories.<id>".
 *
 * `level` is a soft hint shown as a tone variant on the chip:
 * - "expert" — daily-driver, deep experience
 * - "advanced" — solid production experience
 * - "intermediate" — comfortable but not core
 */

export type TechLevel = "expert" | "advanced" | "intermediate";

/**
 * Category ids — also translation keys under
 * `TechStack.categories.<id>` in messages/*.json.
 */
export type TechCategoryId = "shopify" | "frontend" | "backend" | "tools";

export interface TechItem {
  readonly name: string;
  readonly level: TechLevel;
}

export interface TechCategory {
  /** Slug — also translation key under TechStack.categories.<id> */
  readonly id: TechCategoryId;
  readonly items: readonly TechItem[];
}

export const techStack = [
  {
    id: "shopify",
    items: [
      { name: "Shopify Liquid", level: "expert" },
      { name: "Shopify Hydrogen", level: "expert" },
      { name: "Shopify Plus", level: "advanced" },
      { name: "Storefront API", level: "advanced" },
      { name: "Admin API", level: "advanced" },
      { name: "Online Store 2.0", level: "advanced" },
      { name: "Shopify CLI", level: "advanced" },
      { name: "Recharge", level: "intermediate" },
    ],
  },
  {
    id: "frontend",
    items: [
      { name: "React", level: "expert" },
      { name: "TypeScript", level: "expert" },
      { name: "Next.js", level: "advanced" },
      { name: "Remix", level: "advanced" },
      { name: "Tailwind CSS", level: "advanced" },
      { name: "Redux", level: "advanced" },
      { name: "Vue.js", level: "intermediate" },
      { name: "Framer Motion", level: "intermediate" },
    ],
  },
  {
    id: "backend",
    items: [
      { name: "GraphQL", level: "advanced" },
      { name: "REST", level: "advanced" },
      { name: "Node.js", level: "advanced" },
      { name: "Stripe API", level: "advanced" },
      { name: "Supabase", level: "intermediate" },
      { name: "Builder.io", level: "advanced" },
      { name: "Sanity", level: "intermediate" },
      { name: "MongoDB", level: "intermediate" },
    ],
  },
  {
    id: "tools",
    items: [
      { name: "Git", level: "advanced" },
      { name: "Vercel", level: "advanced" },
      { name: "Mixpanel", level: "advanced" },
      { name: "Klaviyo", level: "advanced" },
      { name: "Jest", level: "advanced" },
      { name: "Cursor", level: "advanced" },
      { name: "Webpack", level: "intermediate" },
      { name: "Docker", level: "intermediate" },
    ],
  },
] as const satisfies readonly TechCategory[];
