/**
 * Locale-detection + routing middleware.
 *
 * Matches all paths except:
 * - /api routes
 * - Next.js internals (/_next, /_vercel)
 * - Files with extensions (favicons, robots, images)
 */

import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
