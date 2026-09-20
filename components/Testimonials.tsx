import TestimonialCarousel from "@/components/TestimonialCarousel";
import { getTestimonials } from "@/lib/testimonials";

export default async function Testimonials() {
  const items = await getTestimonials();

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
