import amira from "@/public/images/testimonials/amira-k.png";
import daniel from "@/public/images/testimonials/daniel-r-langosh.png";
import rania from "@/public/images/testimonials/rania-m.png";
import sophia from "@/public/images/testimonials/sophia-l.png";
import TestimonialCarousel, {
  type Testimonial,
} from "@/components/TestimonialCarousel";

const QUOTES_URL = "https://dummyjson.com/quotes?limit=200";
const MAX_TESTIMONIALS = 12;

const PEOPLE = [
  { name: "Amira K", photo: amira },
  { name: "Sophia L", photo: sophia },
  { name: "Rania M", photo: rania },
  { name: "Daniel R Langosh", photo: daniel },
];
const ROLE = "Product Quality Engineer";

// Shown when the quotes API is unreachable.
const FALLBACK_QUOTES = [
  "Absolutely breathtaking! The craftsmanship of my diamond ring.",
  "From the moment I stepped into iDiamond, I felt like royalty.",
  "Every detail, from the sparkle of the diamonds to the elegant packaging.",
  "Exceptional quality and outstanding service doesn’t just sell jewelry.",
];

// The API returns some quotes in Title Case ("Can'T"); normalise those to sentence case.
function tidy(quote: string) {
  const words = quote.split(/\s+/).filter((word) => /^[A-Za-z]/.test(word));
  const titleCased =
    words.length > 3 && words.every((word) => /^[A-Z]/.test(word[0]));
  if (!titleCased) return quote;
  const lower = quote.toLowerCase().replace(/\bi\b/g, "I");
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

// ISR: the response is cached for an hour and refreshed in the background.
async function getQuotes(): Promise<string[]> {
  try {
    const response = await fetch(QUOTES_URL, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data: { quotes?: { quote: string }[] } = await response.json();
    const quotes = (data.quotes ?? [])
      .map(({ quote }) => tidy(quote.trim()))
      // Short enough for two lines in a 300px card.
      .filter((quote) => quote.length >= 30 && quote.length <= 64);
    const unique = [...new Set(quotes)].slice(0, MAX_TESTIMONIALS);
    if (unique.length < PEOPLE.length) throw new Error("not enough quotes");
    return unique;
  } catch (error) {
    console.error(
      "[testimonials] quotes API unavailable, using fallback:",
      error,
    );
    return FALLBACK_QUOTES;
  }
}

export default async function Testimonials() {
  const quotes = await getQuotes();
  const items: Testimonial[] = quotes.map((quote, index) => {
    const person = PEOPLE[index % PEOPLE.length];
    return {
      id: `${index}-${person.name}`,
      name: person.name,
      role: ROLE,
      quote,
      photo: person.photo,
    };
  });

  return (
    <section aria-labelledby="testimonials-heading" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-[15px] py-[70px] md:px-20 md:py-[100px]">
        <h2
          id="testimonials-heading"
          className="relative top-[4.2px] text-center font-playfair text-[26px] leading-none font-normal tracking-[0.01em] text-heading md:top-0 md:text-4xl md:leading-[50px]"
        >
          Testimonials
        </h2>
        <div className="mt-[29px] md:mt-[30px]">
          <TestimonialCarousel items={items} />
        </div>
      </div>
    </section>
  );
}
