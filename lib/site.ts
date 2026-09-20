export const SITE_NAME = "MyJewel";
export const SITE_TITLE = "MyJewel | Custom Jewelry & Bespoke Diamond Jewelry";
export const SITE_DESCRIPTION =
  "Create your masterpiece with MyJewel: bespoke custom jewelry designed with you, crafted from exquisite diamonds, precious metals and gemstones, and backed by a lifetime warranty.";

// Live deployment. Canonical, Open Graph, JSON-LD, sitemap.xml and robots.txt all use this origin.
export const LIVE_URL = "https://my-jewel-mauve.vercel.app";

// Override with NEXT_PUBLIC_SITE_URL (e.g. a custom domain). Otherwise Vercel's production domain
// is used, then the live URL above (also the value in local dev, so crawler files match production).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : LIVE_URL)
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
