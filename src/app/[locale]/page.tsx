import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections";

/**
 * Home page — assembles top-level sections.
 *
 * Phase 1 only ships <Hero />. Phase 2 will add Services preview,
 * Tech stack, Featured posts, About snippet, CTA banner — they all
 * slot in as siblings here.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      {/* TODO Phase 2:
        <ServicesPreview />
        <TechStack />
        <FeaturedPosts />
        <AboutSnippet />
        <CTABanner />
      */}
    </>
  );
}
