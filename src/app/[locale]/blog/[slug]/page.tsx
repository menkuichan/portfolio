import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog";
import { MdxRenderer } from "@/components/mdx";
import { CTABanner } from "@/components/sections";
import { blogPostingSchema, JsonLd } from "@/components/seo";
import { Badge, Container, Section } from "@/components/ui";
import { locales, type Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAllSlugs, getPost, listPosts } from "@/lib/blog";
import { absoluteUrl, buildAlternates } from "@/lib/seo";

/**
 * Blog post page.
 *
 * Statically generated for every (locale, slug) pair. Falls back to the
 * default-locale source when a translation doesn't exist yet.
 */

interface PageParams {
  locale: string;
  slug: string;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const post = await getPost(locale as Locale, slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: buildAlternates(locale as Locale, `/blog/${slug}`),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: [...post.tags],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<PageParams> }) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const post = await getPost(locale as Locale, slug);
  if (!post) notFound();

  const t = await getTranslations("Blog.post");
  const format = await getFormatter();

  // Adjacent posts for prev/next nav
  const all = await listPosts(locale as Locale);
  const index = all.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  const postUrl = absoluteUrl(locale as Locale, `/blog/${post.slug}`);

  return (
    <>
      <JsonLd
        data={blogPostingSchema({
          title: post.title,
          description: post.description,
          url: postUrl,
          datePublished: post.date,
          tags: post.tags,
        })}
      />
      <Section spacing="md">
        <Container size="prose">
          {/* Back link */}
          <Link
            href="/blog"
            className="text-ink-muted hover:text-ink inline-flex items-center text-sm transition-colors"
          >
            {t("backToList")}
          </Link>

          {/* Header */}
          <header className="mt-8">
            <div className="text-ink-muted flex flex-wrap items-center gap-2 text-sm">
              <time dateTime={post.date}>
                {t("publishedOn", {
                  date: format.dateTime(new Date(post.date), { dateStyle: "long" }),
                })}
              </time>
              <span aria-hidden="true">·</span>
              <span>{t("minRead", { minutes: post.readingTimeMin })}</span>
            </div>

            <h1 className="font-display text-ink mt-4 text-4xl leading-[1.1] tracking-tight md:text-5xl">
              {post.title}
            </h1>
            <p className="text-ink-muted mt-4 text-lg leading-relaxed md:text-xl">
              {post.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} tone="neutral" size="sm">
                  #{tag}
                </Badge>
              ))}
            </div>

            {post.fallbackLocale ? (
              <div className="bg-sun-100 border-sun-300 text-ink mt-6 rounded-(--radius-card) border px-4 py-3 text-sm">
                ⚑ {t("fallbackNotice")}
              </div>
            ) : null}
          </header>

          {/* MDX body */}
          <article className="mt-10">
            <MdxRenderer source={post.source} />
          </article>

          {/* Prev / Next */}
          {(prev || next) && (
            <nav
              aria-label="Post navigation"
              className="border-cream-200 mt-16 grid gap-6 border-t pt-10 md:grid-cols-2"
            >
              {prev ? (
                <div>
                  <div className="text-ink-muted text-xs font-semibold tracking-[0.18em] uppercase">
                    {t("prev")}
                  </div>
                  <div className="mt-3">
                    <PostCard post={prev} />
                  </div>
                </div>
              ) : (
                <span aria-hidden="true" />
              )}
              {next ? (
                <div>
                  <div className="text-ink-muted text-xs font-semibold tracking-[0.18em] uppercase">
                    {t("next")}
                  </div>
                  <div className="mt-3">
                    <PostCard post={next} />
                  </div>
                </div>
              ) : (
                <span aria-hidden="true" />
              )}
            </nav>
          )}
        </Container>
      </Section>

      <CTABanner />
    </>
  );
}
