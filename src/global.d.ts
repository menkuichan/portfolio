/**
 * Augments next-intl's global types so that translation keys are
 * type-checked against the actual `messages/en.json` shape.
 *
 * After editing `messages/en.json`, TS will immediately flag any
 * `t('nonExistentKey')` call across the codebase.
 */

import type messages from "@/messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages;
  }
}
