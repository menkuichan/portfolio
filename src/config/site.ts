/**
 * Site-wide metadata, social links, contact info.
 *
 * Single source of truth — every component that needs the
 * site name, URL, or social handles imports from here.
 */

export const siteConfig = {
  name: "Ilona Hakalo",
  shortName: "Hakalo",
  url: "https://ilonahakalo.com", // TODO: confirm final domain
  email: "ilona.salomenskaya@gmail.com",
  calendlyUrl: "https://calendly.com/ilonahakalo/intro", // TODO: replace with real link
  socials: {
    linkedin: "https://www.linkedin.com/in/ilonahakalo",
    github: "https://github.com/ilonahakalo",
  },
} as const;

export type SiteConfig = typeof siteConfig;
