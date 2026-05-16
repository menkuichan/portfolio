/**
 * Working principles displayed on the About page.
 * Translations live under `About.values.items.<id>`.
 */

import type { AccentTone } from "./services";

export type ValueId = "direct" | "smallChunks" | "plainEnglish" | "ownership";

export interface ValueConfig {
  readonly id: ValueId;
  readonly tone: AccentTone;
  /** Emoji or short character marker — kept simple, no icon library */
  readonly marker: string;
}

export const values = [
  { id: "direct", tone: "peach", marker: "→" },
  { id: "smallChunks", tone: "mint", marker: "⇢" },
  { id: "plainEnglish", tone: "lavender", marker: "✦" },
  { id: "ownership", tone: "sun", marker: "✓" },
] as const satisfies readonly ValueConfig[];
