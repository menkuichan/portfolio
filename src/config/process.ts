/**
 * Process steps — how I work with clients.
 * Translations live under "Process.steps.<id>" (title + description).
 */

import type { AccentTone } from "./services";

/**
 * Step ids — also translation keys under `Process.steps.<id>`.
 */
export type ProcessStepId = "discovery" | "scope" | "build" | "ship";

export interface ProcessStep {
  readonly id: ProcessStepId;
  readonly number: string;
  readonly tone: AccentTone;
}

export const processSteps = [
  { id: "discovery", number: "01", tone: "peach" },
  { id: "scope", number: "02", tone: "mint" },
  { id: "build", number: "03", tone: "lavender" },
  { id: "ship", number: "04", tone: "sun" },
] as const satisfies readonly ProcessStep[];
