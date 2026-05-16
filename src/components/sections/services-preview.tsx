import { useTranslations } from "next-intl";
import { Container, Section, SectionHeading } from "@/components/ui";
import { services } from "@/config/services";
import { Link } from "@/i18n/navigation";
import { ServiceCard } from "./service-card";

/**
 * ServicesPreview — Home page section. 2x2 grid of compact service cards
 * with a footer link to the full /services page.
 */
export function ServicesPreview() {
  const t = useTranslations("Services");

  return (
    <Section spacing="lg">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} note={t("note")} withDoodle />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} variant="compact" />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/services"
            className="text-ink hover:text-peach-500 inline-flex items-center gap-1 text-base font-medium underline-offset-4 transition-colors hover:underline"
          >
            {t("viewAll")}
          </Link>
        </div>
      </Container>
    </Section>
  );
}
