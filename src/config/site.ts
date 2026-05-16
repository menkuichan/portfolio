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
  email: "ilona.hakalo@gmail.com",
  calendlyUrl: "https://calendly.com/ilonahakalo/intro-call-shopify-project",
  socials: {
    linkedin: "https://www.linkedin.com/in/menkuichan/",
    github: "https://github.com/menkuichan",
  },
} as const;

export type SiteConfig = typeof siteConfig;
