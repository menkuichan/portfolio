/**
 * Blog data loader.
 *
 * Reads MDX files from `content/blog/{locale}/*.mdx`, parses frontmatter
 * with gray-matter, calculates reading time, and returns typed objects.
 *
 * Locale fallback: if a slug exists in default-locale but not in the
 * requested locale, the loader falls back to the default-locale version
 * (with a `fallbackLocale` flag on the result so the UI can hint at it).
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { defaultLocale, type Locale } from "@/i18n/config";

// ---------- Types ----------

export interface PostFrontmatter {
  /** Human-readable title */
  readonly title: string;
  /** ~155 chars — used in metadata + on cards */
  readonly description: string;
  /** ISO date (YYYY-MM-DD) */
  readonly date: string;
  /** Tags for filtering (e.g. ["shopify", "liquid"]) */
  readonly tags: readonly string[];
  /** Skip from production lists when true */
  readonly draft?: boolean;
}

export interface PostMeta extends PostFrontmatter {
  readonly slug: string;
  readonly locale: Locale;
  /** Reading time in minutes (rounded) */
  readonly readingTimeMin: number;
  /** True when the post was loaded from the default locale as fallback */
  readonly fallbackLocale: boolean;
}

export interface Post extends PostMeta {
  /** Raw MDX source — pass to the renderer */
  readonly source: string;
}

// ---------- Filesystem helpers ----------

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

function localeDir(locale: Locale): string {
  return path.join(CONTENT_ROOT, locale);
}

async function safeReaddir(dir: string): Promise<string[]> {
  try {
    return await fs.readdir(dir);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function readPostFile(
  locale: Locale,
  slug: string,
): Promise<{ source: string; data: PostFrontmatter } | null> {
  const filePath = path.join(localeDir(locale), `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { content, data } = matter(raw);
    return { source: content, data: data as PostFrontmatter };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

// ---------- Public API ----------

/**
 * Returns post metadata (no MDX body) for a locale, sorted newest first.
 * Drafts are excluded in production; included in development for preview.
 */
export async function listPosts(locale: Locale): Promise<PostMeta[]> {
  const isDev = process.env.NODE_ENV !== "production";

  // Collect slugs from both the requested locale and the default locale,
  // deduplicated. Requested-locale wins; default-locale fills the gap.
  const requestedFiles = await safeReaddir(localeDir(locale));
  const requestedSlugs = new Set(
    requestedFiles.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, "")),
  );

  const allSlugs = new Set(requestedSlugs);
  if (locale !== defaultLocale) {
    const defaultFiles = await safeReaddir(localeDir(defaultLocale));
    for (const f of defaultFiles) {
      if (f.endsWith(".mdx")) allSlugs.add(f.replace(/\.mdx$/, ""));
    }
  }

  const posts: PostMeta[] = [];
  for (const slug of allSlugs) {
    const fromRequested = requestedSlugs.has(slug);
    const loaded = fromRequested
      ? await readPostFile(locale, slug)
      : await readPostFile(defaultLocale, slug);

    if (!loaded) continue;
    if (loaded.data.draft && !isDev) continue;

    posts.push({
      slug,
      locale,
      ...loaded.data,
      readingTimeMin: Math.max(1, Math.round(readingTime(loaded.source).minutes)),
      fallbackLocale: !fromRequested,
    });
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Returns a single post by slug, with MDX body included.
 * Returns null if no post matches (in either the locale or the default).
 */
export async function getPost(locale: Locale, slug: string): Promise<Post | null> {
  const isDev = process.env.NODE_ENV !== "production";

  // Try requested locale first, then fall back to default.
  let loaded = await readPostFile(locale, slug);
  let fallbackLocale = false;

  if (!loaded && locale !== defaultLocale) {
    loaded = await readPostFile(defaultLocale, slug);
    fallbackLocale = true;
  }

  if (!loaded) return null;
  if (loaded.data.draft && !isDev) return null;

  return {
    slug,
    locale,
    fallbackLocale,
    ...loaded.data,
    readingTimeMin: Math.max(1, Math.round(readingTime(loaded.source).minutes)),
    source: loaded.source,
  };
}

/**
 * All slugs that should be statically generated.
 * Used by `generateStaticParams` on the post page.
 */
export async function getAllSlugs(): Promise<string[]> {
  const files = await safeReaddir(localeDir(defaultLocale));
  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}
