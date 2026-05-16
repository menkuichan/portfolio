import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CalendlyInline } from "@/components/calendly";
import { Star, Underline } from "@/components/illustrations";
import { Container, Eyebrow, Section } from "@/components/ui";
import { siteConfig } from "@/config/site";

/**
 * Contact page.
 *
 * Layout:
 *   - Hero with eyebrow + headline + subhead
 *   - Two-column body: Calendly inline embed on the left, contact
 *     methods on the right. Stacks on mobile.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.page" });
  return { title: t("metaTitle") };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tPage = await getTranslations("Contact.page");
  const tContact = await getTranslations("Contact");
  const tOther = await getTranslations("Contact.otherWays");

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" className="relative overflow-hidden">
        <Star className="text-mint-300 absolute top-16 left-[10%] h-5 w-5" aria-hidden="true" />
        <Star
          className="text-peach-300 absolute right-[12%] bottom-12 h-4 w-4"
          aria-hidden="true"
        />

        <Container size="prose" className="relative text-center">
          <Eyebrow tone="peach">{tPage("eyebrow")}</Eyebrow>
          <h1 className="font-display text-ink mt-4 text-4xl leading-[1.05] tracking-tight md:text-6xl">
            {tPage("title")}
          </h1>
          <Underline className="text-peach-300 mx-auto mt-2 h-2 w-2/3 max-w-xs" />
          <p className="text-ink-muted mt-6 text-lg leading-relaxed">{tPage("subhead")}</p>
        </Container>
      </Section>

      {/* Body: Calendly + Contact methods */}
      <Section spacing="md">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            {/* Calendar */}
            <div>
              <h2 className="font-display text-ink text-2xl tracking-tight md:text-3xl">
                {tContact("scheduleHeading")}
              </h2>
              <p className="text-ink-muted mt-2 text-base leading-relaxed">
                {tContact("scheduleHint")}
              </p>

              <CalendlyInline
                url={siteConfig.calendlyUrl}
                loadingLabel={tContact("loadingCalendar")}
                className="mt-6"
              />
            </div>

            {/* Other ways */}
            <aside className="bg-surface border-cream-200 rounded-(--radius-card) border p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-ink text-2xl tracking-tight">{tOther("heading")}</h2>

              <ul className="mt-6 space-y-5">
                <li>
                  <div className="text-ink-muted text-xs font-semibold tracking-[0.18em] uppercase">
                    {tOther("email")}
                  </div>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-ink hover:text-peach-500 mt-1 inline-block text-base underline-offset-4 transition-colors hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <div className="text-ink-muted text-xs font-semibold tracking-[0.18em] uppercase">
                    {tOther("linkedin")}
                  </div>
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-peach-500 mt-1 inline-block text-base underline-offset-4 transition-colors hover:underline"
                  >
                    {tOther("linkedinValue")} ↗
                  </a>
                </li>
                <li>
                  <div className="text-ink-muted text-xs font-semibold tracking-[0.18em] uppercase">
                    {tOther("github")}
                  </div>
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-peach-500 mt-1 inline-block text-base underline-offset-4 transition-colors hover:underline"
                  >
                    {tOther("githubValue")} ↗
                  </a>
                </li>
              </ul>

              <p className="font-hand text-ink-muted mt-8 text-base">{tOther("responseTime")}</p>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
