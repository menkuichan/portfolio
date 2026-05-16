import { useTranslations } from "next-intl";
import { Squiggle } from "@/components/illustrations";
import { buttonVariants, Container, Section } from "@/components/ui";
import { Link } from "@/i18n/navigation";

/**
 * Root not-found — fallback for routes the middleware doesn't catch.
 * In practice, the [locale]/not-found.tsx handles most 404s; this exists
 * so the root layout always has a renderable child.
 *
 * Localized via the root-layout's NextIntlClientProvider — uses the
 * locale resolved by middleware (or defaultLocale on first hit).
 */
export default function RootNotFound() {
  const t = useTranslations("NotFound");

  return (
    <Section spacing="lg">
      <Container size="prose">
        <div className="mx-auto text-center">
          <p className="font-hand text-peach-500 text-4xl">404</p>
          <h1 className="font-display text-ink mt-4 text-4xl leading-tight md:text-5xl">
            {t("title")}
          </h1>
          <Squiggle className="text-peach-300 mx-auto mt-3 h-3 w-48" />
          <p className="text-ink-muted mt-6 text-lg">{t("description")}</p>
          <Link href="/" className={`mt-10 ${buttonVariants({ variant: "primary", size: "lg" })}`}>
            ← {t("back")}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
