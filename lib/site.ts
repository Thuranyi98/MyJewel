export const SITE_NAME = "MyJewel";
export const SITE_TITLE = "MyJewel | Custom Jewelry & Bespoke Diamond Jewelry";
export const SITE_DESCRIPTION =
  "Create your masterpiece with MyJewel: bespoke custom jewelry designed with you, crafted from exquisite diamonds, precious metals and gemstones, and backed by a lifetime warranty.";

// Set NEXT_PUBLIC_SITE_URL in production; Vercel's production URL is used as a fallback.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

// Static 1200×630 Open Graph image in /public.
export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "MyJewel custom jewelry: bespoke diamond rings crafted for you",
};

// Crawlable routes. The site is a single landing page today; add new pages here and they
// appear in sitemap.xml automatically.
export const ROUTES: {
  path: string;
  changeFrequency:
    "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}[] = [{ path: "/", changeFrequency: "weekly", priority: 1 }];
