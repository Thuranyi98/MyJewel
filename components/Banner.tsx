import Image, { getImageProps } from "next/image";
import chevronLeft from "@/public/images/banner/banner-chevron-left.png";
import chevronRight from "@/public/images/banner/banner-chevron-right.png";
import bgMobile from "@/public/images/banner/banner-bg-mobile.png";
import diamonds from "@/public/images/banner/banner-diamonds.png";
import ring from "@/public/images/banner/banner-ring.png";
import ringMobile from "@/public/images/banner/banner-ring-mobile.png";
import tweezers from "@/public/images/banner/banner-tweezers.png";
import tweezersMobile from "@/public/images/banner/banner-tweezers-mobile.png";

/*
 * Below `md` the 375px mobile composition is used as designed. From `md` up the
 * 1440px desktop composition is scaled with the section width (cqw), capped at its
 * designed pixel size so it stays put on screens wider than 1440px.
 */
export default function Banner() {
  // Art direction: one <picture> per slot so the browser fetches only the matching asset.
  const {
    props: { srcSet: chevronLeftSrcSet },
  } = getImageProps({
    src: chevronLeft,
    alt: "",
    width: 468,
    height: 420,
    sizes: "(min-width: 1440px) 468px, 33vw",
  });
  const { props: bgMobileProps } = getImageProps({
    src: bgMobile,
    alt: "",
    width: 375,
    height: 300,
    sizes: "100vw",
    loading: "eager",
    fetchPriority: "high",
  });
  const {
    props: { srcSet: ringSrcSet },
  } = getImageProps({
    src: ring,
    alt: "",
    width: 540,
    height: 314,
    sizes: "(min-width: 1440px) 540px, 38vw",
  });
  const { props: ringMobileProps } = getImageProps({
    src: ringMobile,
    alt: "",
    width: 155,
    height: 123,
    sizes: "155px",
    loading: "eager",
  });
  const {
    props: { srcSet: tweezersSrcSet },
  } = getImageProps({
    src: tweezers,
    alt: "",
    width: 248,
    height: 157,
    sizes: "(min-width: 1440px) 248px, 18vw",
  });
  const { props: tweezersMobileProps } = getImageProps({
    src: tweezersMobile,
    alt: "",
    width: 79,
    height: 89,
    sizes: "79px",
    loading: "eager",
  });

  return (
    <section aria-labelledby="banner-title" className="@container bg-banner">
      <div className="relative h-[300px] overflow-hidden md:h-[clamp(260px,29.1667cqw,420px)]">
        {/* Decorative background */}
        <picture className="pointer-events-none absolute inset-y-0 left-0 w-full md:w-[min(32.5cqw,468px)]">
          <source
            media="(min-width: 768px)"
            sizes="(min-width: 1440px) 468px, 33vw"
            srcSet={chevronLeftSrcSet}
          />
          <img
            {...bgMobileProps}
            alt=""
            aria-hidden
            className="size-full object-cover"
          />
        </picture>
        <Image
          src={chevronRight}
          alt=""
          aria-hidden
          width={468}
          height={420}
          sizes="(min-width: 1440px) 468px, 33vw"
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[min(32.5cqw,468px)] object-cover md:block"
        />

        {/* Decorative jewelry */}
        <Image
          src={diamonds}
          alt=""
          aria-hidden
          width={534}
          height={347}
          sizes="(min-width: 1440px) 534px, (min-width: 768px) 37vw, 143px"
          loading="eager"
          fetchPriority="high"
          className="pointer-events-none absolute bottom-[9px] left-0 h-auto w-[142.8px] md:bottom-0 md:w-[min(37.04cqw,533.4px)]"
        />
        <picture className="pointer-events-none absolute right-0 bottom-0">
          <source
            media="(min-width: 768px)"
            sizes="(min-width: 1440px) 540px, 38vw"
            srcSet={ringSrcSet}
          />
          <img
            {...ringMobileProps}
            alt=""
            aria-hidden
            className="block h-[123px] w-[155px] md:aspect-[540/314] md:h-auto md:w-[min(37.5cqw,540px)]"
          />
        </picture>
        <picture className="pointer-events-none absolute top-[2px] right-0 md:top-0">
          <source
            media="(min-width: 768px)"
            sizes="(min-width: 1440px) 248px, 18vw"
            srcSet={tweezersSrcSet}
          />
          <img
            {...tweezersMobileProps}
            alt=""
            aria-hidden
            className="block h-[89px] w-[79px] md:aspect-[248/157] md:h-auto md:w-[min(17.22cqw,248px)]"
          />
        </picture>

        {/* Copy */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-4 pt-1.5 text-center text-ink md:gap-[clamp(20px,2.8472cqw,41px)] md:pt-[min(0.3472cqw,5px)]">
          <h1
            id="banner-title"
            className="font-playfair text-[26px] leading-none font-normal tracking-[0.01em] md:-translate-x-[min(2.3611cqw,34px)] md:text-[clamp(32px,3.3333cqw,48px)]"
          >
            Custom Jewelry
          </h1>
          <p className="max-w-[300px] font-sans text-sm leading-[1.3] font-normal tracking-[0.01em] md:max-w-[min(44cqw,576px)] md:text-balance md:text-[clamp(15px,1.3889cqw,20px)] min-[1200px]:leading-none">
            Create Your Masterpiece: Bespoke Jewelry Crafted for You
          </p>
        </div>
      </div>
    </section>
  );
}
