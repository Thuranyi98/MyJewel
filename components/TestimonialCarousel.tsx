"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  photo: StaticImageData;
};

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M13.125 3.75L6.875 10L13.125 16.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Enabled arrows are dark, a disabled one (first/last page) is light, as in Figma's first-slide state.
// `aria-disabled` (not the `disabled` attribute) so browsers that restore form-control state on
// reload (Firefox) can't make the DOM differ from the server HTML and break hydration.
const ARROW_CLASS =
  "absolute top-[calc(50%+2.5px)] z-10 grid size-[35px] -translate-y-1/2 place-items-center rounded-full border border-ink bg-white p-[5px] text-ink transition-colors aria-disabled:cursor-default aria-disabled:border-stroke aria-disabled:text-muted md:top-1/2 md:size-[45px]";

// Below `md` only the first three cards are shown (Figma's mobile pagination has three dots).
function visibleCards(track: HTMLElement | null) {
  if (!track) return [];
  return (Array.from(track.children) as HTMLElement[]).filter(
    (card) => card.offsetWidth > 0,
  );
}

export default function TestimonialCarousel({
  items,
}: {
  items: Testimonial[];
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  // Assume the desktop layout (4 per page) until measured, so the dots and arrow states are
  // already correct in the server HTML.
  const [pageCount, setPageCount] = useState(
    Math.max(1, Math.ceil(items.length / 4)),
  );

  // Cards per page depends on the viewport, so derive it from the real layout.
  const measure = useCallback(() => {
    const track = trackRef.current;
    const cards = visibleCards(track);
    if (!track || cards.length === 0) return;
    const first = cards[0];
    const second = cards[1];
    const pitch = second
      ? second.offsetLeft - first.offsetLeft
      : first.offsetWidth;
    const gap = pitch - first.offsetWidth;
    const perView = Math.max(1, Math.round((track.clientWidth + gap) / pitch));
    const pages = Math.max(1, Math.ceil(cards.length / perView));
    const maxScroll = track.scrollWidth - track.clientWidth;
    const current =
      track.scrollLeft >= maxScroll - 2
        ? pages - 1
        : Math.min(pages - 1, Math.round(track.scrollLeft / (pitch * perView)));
    setPageCount(pages);
    setPage(current);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  const goTo = (target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = visibleCards(track);
    const first = cards[0];
    const second = cards[1];
    const pitch = second
      ? second.offsetLeft - first.offsetLeft
      : first.offsetWidth;
    const gap = pitch - first.offsetWidth;
    const perView = Math.max(1, Math.round((track.clientWidth + gap) / pitch));
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    track.scrollTo({
      left: target * perView * pitch,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="relative mx-auto w-[301px] max-w-full md:w-full">
        <button
          type="button"
          aria-label="Previous testimonials"
          aria-disabled={page === 0}
          onClick={() => page > 0 && goTo(page - 1)}
          className={`${ARROW_CLASS} -left-[18px] md:left-0 md:-translate-x-1/2`}
        >
          <Chevron />
        </button>
        <button
          type="button"
          aria-label="Next testimonials"
          aria-disabled={page >= pageCount - 1}
          onClick={() => page < pageCount - 1 && goTo(page + 1)}
          className={`${ARROW_CLASS} -right-[18px] md:right-0 md:translate-x-1/2`}
        >
          <Chevron className="rotate-180" />
        </button>

        <ul
          ref={trackRef}
          onScroll={measure}
          className="flex snap-x snap-mandatory gap-[15px] overflow-x-auto md:gap-[26.67px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map(({ id, name, role, quote, photo }) => (
            <li
              key={id}
              className="flex basis-full shrink-0 snap-start max-md:nth-[n+4]:hidden md:basis-[calc((100%-26.67px)/2)] lg:basis-[calc((100%-53.34px)/3)] xl:basis-[calc((100%-80.01px)/4)]"
            >
              <figure className="flex min-h-[326px] w-full flex-col items-center border border-line bg-white px-[25px] pt-[45.7px] pb-[44.6px] text-center">
                <Image
                  src={photo}
                  alt={`Portrait of ${name}`}
                  width={120}
                  height={120}
                  sizes="120px"
                  className="size-[120px] object-cover"
                />
                <figcaption className="mt-[20.2px]">
                  <p className="font-sans text-sm leading-none font-semibold text-ink">
                    {name}
                  </p>
                  <p className="mt-[8.1px] font-sans text-xs leading-none text-ink-soft">
                    {role}
                  </p>
                </figcaption>
                <blockquote className="mt-[19.4px]">
                  <p className="font-sans text-sm leading-5 text-ink">
                    {quote}
                  </p>
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {pageCount > 1 && (
        <div className="mt-5 flex justify-center gap-2.5 md:mt-[30px]">
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to testimonial group ${index + 1}`}
              aria-current={index === page}
              onClick={() => goTo(index)}
              className={`relative size-2 rounded-full transition-colors before:absolute before:-inset-2 before:content-[''] ${
                index === page ? "bg-muted" : "bg-line"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
