import { setRequestLocale } from "next-intl/server";
import { AboutSnippet, CTABanner, Hero, ServicesPreview, TechStack } from "@/components/sections";

/**
 * Home page — composed from independent section components.
 *
 * Each section owns its layout, copy, and visual rhythm. Adding,
 * removing, or reordering sections is a one-line change here.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ServicesPreview />
      <TechStack />
      <AboutSnippet />
      <CTABanner />
    </>
  );
}
