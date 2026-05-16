/**
 * Services offered. Visual metadata lives here; translatable copy
 * (title, description, features) lives under "Services.items.<id>"
 * in messages/*.json.
 *
 * To add a new service: append an item, add an icon, add the
 * translation block under messages/en.json → Services.items.<id>.
 */

import type { ComponentType, SVGProps } from "react";
import { AppsIcon, HydrogenIcon, LiquidIcon, PerformanceIcon } from "@/components/illustrations";

export type AccentTone = "peach" | "mint" | "lavender" | "sun";

/**
 * Service identifiers — also used as translation keys under
 * `Services.items.<id>` in messages/*.json. Keep these in sync.
 */
export type ServiceId = "liquid" | "hydrogen" | "apps" | "performance";

export interface ServiceConfig {
  /** Slug — also used as translation key under Services.items.<id> */
  readonly id: ServiceId;
  /** Visual identity color */
  readonly accentTone: AccentTone;
  /** Doodle icon component */
  readonly Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Tech badges shown on the service card (3-6 items, brand names — no translation) */
  readonly stack: readonly string[];
}

export const services = [
  {
    id: "liquid",
    accentTone: "peach",
    Icon: LiquidIcon,
    stack: ["Liquid", "Online Store 2.0", "Sections", "Metaobjects"],
  },
  {
    id: "hydrogen",
    accentTone: "mint",
    Icon: HydrogenIcon,
    stack: ["Hydrogen", "Remix", "Storefront API", "GraphQL"],
  },
  {
    id: "apps",
    accentTone: "lavender",
    Icon: AppsIcon,
    stack: ["Sika", "Klaviyo", "Recharge", "Stripe"],
  },
  {
    id: "performance",
    accentTone: "sun",
    Icon: PerformanceIcon,
    stack: ["Lighthouse", "Core Web Vitals", "Caching", "Bundle"],
  },
] as const satisfies readonly ServiceConfig[];
