/**
 * Career journey milestones — visualized as a vertical timeline.
 * Translations live under `About.journey.steps.<id>`.
 */

import type { AccentTone } from "./services";

export type JourneyStepId = "start" | "midweb" | "fintech" | "stripe" | "shopify";

export interface JourneyStep {
  readonly id: JourneyStepId;
  readonly tone: AccentTone;
}

export const journeySteps = [
  { id: "start", tone: "lavender" },
  { id: "midweb", tone: "sun" },
  { id: "fintech", tone: "mint" },
  { id: "stripe", tone: "lavender" },
  { id: "shopify", tone: "peach" },
] as const satisfies readonly JourneyStep[];
