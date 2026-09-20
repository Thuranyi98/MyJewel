import { TESTIMONIALS } from "@/lib/testimonials";

// GET /api/testimonials — public, read-only JSON.
// Cached: `revalidate` makes Next generate the response once and regenerate it in the background
// at most once an hour (ISR); `Cache-Control` lets the CDN and browsers reuse it the same way.
export const revalidate = 3600;

export function GET() {
  return Response.json(
    { count: TESTIMONIALS.length, testimonials: TESTIMONIALS },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
