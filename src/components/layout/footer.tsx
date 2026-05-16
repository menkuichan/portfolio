import { useTranslations } from "next-intl";
import { Container } from "@/components/ui";
import { siteConfig } from "@/config/site";

/**
 * Site footer.
 *
 * Two columns on desktop (tagline + socials), stacked on mobile.
 */
export function Footer() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-cream-200 mt-auto border-t">
      <Container className="flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
        <div className="flex flex-col gap-1">
          <p className="text-ink text-sm font-medium">{t("tagline")}</p>
          <p className="text-ink-muted text-xs">{t("copyright", { year })}</p>
        </div>

        <ul className="text-ink-muted flex items-center gap-5 text-sm">
          <li>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-ink transition-colors">
              Email
            </a>
          </li>
          <li>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              GitHub
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
