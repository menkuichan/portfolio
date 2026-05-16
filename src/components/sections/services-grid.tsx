import { Container, Section } from "@/components/ui";
import { services } from "@/config/services";
import { ServiceCard } from "./service-card";

/**
 * ServicesGrid — full-page services list used on /services.
 *
 * Same data as `ServicesPreview` but rendered with `variant="full"`,
 * which adds the feature bullet list to each card. Layout adapts:
 * 1 column on mobile, 2 columns from the medium breakpoint.
 */
export function ServicesGrid() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} variant="full" />
          ))}
        </div>
      </Container>
    </Section>
  );
}
