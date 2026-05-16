import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog";
import { Star, Underline } from "@/components/illustrations";
import { Container, Eyebrow, Section } from "@/components/ui";
import { locales, type Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { listPosts } from "@/lib/blog";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog.page" });
  return {
    title: t("metaTitle"),
    alternates: buildAlternates(locale as Locale, "/blog"),
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const tPage = await getTranslations("Blog.page");
  const tEmpty = await getTranslations("Blog.empty");

  const posts = await listPosts(locale as Locale);

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" className="relative overflow-hidden">
        <Star className="text-peach-300 absolute top-16 left-[10%] h-5 w-5" aria-hidden="true" />
        <Star className="text-mint-300 absolute right-[12%] bottom-12 h-4 w-4" aria-hidden="true" />

        <Container size="prose" className="relative text-center">
          <Eyebrow tone="peach">{tPage("eyebrow")}</Eyebrow>
          <h1 className="font-display text-ink mt-4 text-4xl leading-[1.05] tracking-tight md:text-6xl">
            {tPage("title")}
          </h1>
          <Underline className="text-peach-300 mx-auto mt-2 h-2 w-2/3 max-w-xs" />
          <p className="text-ink-muted mt-6 text-lg leading-relaxed">{tPage("subhead")}</p>
        </Container>
      </Section>

      {/* List or empty state */}
      <Section spacing="md">
        <Container>
          {posts.length === 0 ? (
            <div className="bg-surface border-cream-200 mx-auto max-w-xl rounded-(--radius-card) border p-10 text-center">
              <h2 className="font-display text-ink text-2xl tracking-tight">{tEmpty("title")}</h2>
              <p className="text-ink-muted mt-3 text-base leading-relaxed">
                {tEmpty("description")}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
