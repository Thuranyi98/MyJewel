import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Browsers and crawlers request /favicon.ico directly; the icon set lives in public/favicon_io.
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/favicon_io/favicon.ico",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
