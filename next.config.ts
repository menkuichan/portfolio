import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Tells next-intl where the request-config lives (src/i18n/request.ts).
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
