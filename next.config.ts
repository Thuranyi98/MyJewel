import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Tailwind stylesheet is ~10 KB: inline it so first paint doesn't wait for a render-blocking
  // CSS request (production builds only).
  experimental: { inlineCss: true },
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
  // Files in public/ default to `Cache-Control: max-age=0`, so the browser re-checks every icon
  // and image on each visit. Let them be reused for a day (and served stale while revalidating).
  async headers() {
    const cache = [
      {
        key: "Cache-Control",
        value: "public, max-age=86400, stale-while-revalidate=604800",
      },
    ];
    return [
      { source: "/icons/:path*", headers: cache },
      { source: "/images/:path*", headers: cache },
    ];
  },
};

export default nextConfig;
