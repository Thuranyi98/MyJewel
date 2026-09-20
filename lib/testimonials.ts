import { SITE_URL } from "@/lib/site";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  // Path under /public, served by next/image.
  photo: string;
};

// Public JSON endpoint (app/api/testimonials/route.ts) that the Testimonials section fetches.
export const TESTIMONIALS_ENDPOINT = "/api/testimonials";
const REVALIDATE_SECONDS = 3600;

const ROLE = "Product Quality Engineer";

// The four people from the Figma design; the list cycles through them.
const PEOPLE = [
  { name: "Amira K", photo: "/images/testimonials/amira-k.png" },
  { name: "Sophia L", photo: "/images/testimonials/sophia-l.png" },
  { name: "Rania M", photo: "/images/testimonials/rania-m.png" },
  { name: "Daniel R Langosh", photo: "/images/testimonials/daniel-r-langosh.png" },
];

// The first four are the texts in the Figma design, character for character (including the double
// space in the fourth). The rest are placeholders in the same style so the carousel has three
// pages, as in the design's pagination.
const QUOTES = [
  "Absolutely breathtaking! The craftsmanship of my diamond ring.",
  "From the moment I stepped into iDiamond, I felt like royalty.",
  "Every detail, from the sparkle of the diamonds to the elegant packaging.",
  "Exceptional quality and outstanding service  doesn’t just sell jewelry.",
  "The custom design process was effortless and truly personal.",
  "My engagement ring exceeded every expectation I had.",
  "Beautifully crafted, delivered early and perfectly packaged.",
  "The team listened closely and brought my vision to life.",
  "Stunning quality and a lifetime warranty. Truly worth it.",
  "Every conversation felt warm, honest and professional.",
  "I still get compliments on my necklace every single day.",
  "From first sketch to final polish, an unforgettable experience.",
];

// Source of truth: served by the API route, and used as the fallback if the API can't be reached.
export const TESTIMONIALS: Testimonial[] = QUOTES.map((quote, index) => {
  const person = PEOPLE[index % PEOPLE.length];
  return {
    id: `testimonial-${index + 1}`,
    name: person.name,
    role: ROLE,
    quote,
    photo: person.photo,
  };
});

// In dev the endpoint is the local server; otherwise the deployed origin.
const API_ORIGIN =
  process.env.NODE_ENV === "development"
    ? `http://localhost:${process.env.PORT ?? 3000}`
    : SITE_URL;

// ISR: the response is cached by Next for an hour and refreshed in the background
// (`next.revalidate`). If the request fails (e.g. the very first deploy, before the endpoint
// exists) the built-in data, which is the same list, is used.
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await fetch(`${API_ORIGIN}${TESTIMONIALS_ENDPOINT}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: { testimonials?: Testimonial[] } = await response.json();
    if (!data.testimonials?.length) throw new Error("empty response");
    return data.testimonials;
  } catch (error) {
    console.warn("[testimonials] API unavailable, using built-in data:", error);
    return TESTIMONIALS;
  }
}
