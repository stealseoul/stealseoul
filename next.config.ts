import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    // Default is 1MB, which a batch of several compressed infographic
    // images (base64-encoded, plus multipart overhead) easily exceeds —
    // exceeding it throws a generic, hard-to-diagnose RSC render error.
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
};

export default withNextIntl(nextConfig);
