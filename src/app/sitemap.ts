/**
 * Dynamic sitemap.
 *
 * Lists every (locale, path) pair across the static pages and every
 * blog post slug. Includes `alternates.languages` for proper hreflang
 * propagation to Google Search.
 */

import type { MetadataRoute } from "next";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { listPosts } from "@/lib/blog";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

const STATIC_PATHS = ["/", "/services", "/about", "/contact", "/blog"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages — one entry per locale, with full hreflang alternates.
  for (const locale of locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified: new Date(),
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1.0 : 0.7,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }

  // Blog posts — slugs come from the default locale, every locale gets an entry.
  const defaultPosts = await listPosts(defaultLocale as Locale);
  for (const post of defaultPosts) {
    const path = `/blog/${post.slug}`;
    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(locale, path),
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }

  return entries;
}
