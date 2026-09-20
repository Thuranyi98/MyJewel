import Image, { getImageProps } from "next/image";
import chevronLeft from "@/public/images/banner/banner-chevron-left.png";
import chevronRight from "@/public/images/banner/banner-chevron-right.png";
import bgMobile from "@/public/images/banner/banner-bg-mobile.png";
import diamonds from "@/public/images/banner/banner-diamonds.png";
import ring from "@/public/images/banner/banner-ring.png";
import tweezers from "@/public/images/banner/banner-tweezers.png";

export default function Banner() {
  // Art direction: one <picture> so the browser fetches only the matching background.
  const {
    props: { srcSet: chevronLeftSrcSet },
  } = getImageProps({
    src: chevronLeft,
    alt: "",
    width: 468,
    height: 420,
    sizes: "468px",
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

  return (
    <section
      aria-labelledby="banner-title"
      className="relative h-[300px] overflow-hidden bg-banner xl:h-[420px]"
    >
      {/* Decorative background */}
      <picture className="pointer-events-none absolute inset-y-0 left-0 w-full xl:w-[468px]">
        <source
          media="(min-width: 1280px)"
          sizes="468px"
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
        sizes="468px"
        className="pointer-events-none absolute top-0 right-0 hidden h-[420px] w-[468px] xl:block"
      />

      {/* Decorative jewelry */}
      <Image
        src={diamonds}
        alt=""
        aria-hidden
        width={534}
        height={347}
        sizes="(min-width: 1280px) 534px, 143px"
        loading="eager"
        fetchPriority="high"
        className="pointer-events-none absolute top-[198px] left-0 h-auto w-[142.8px] xl:top-[73px] xl:w-[533.4px]"
      />
      <Image
        src={ring}
        alt=""
        aria-hidden
        width={540}
        height={314}
        sizes="(min-width: 1280px) 540px, 194px"
        loading="eager"
        className="pointer-events-none absolute top-[174px] -right-[35px] h-auto w-[194px] xl:top-[105px] xl:right-0 xl:w-[540px]"
      />
      <Image
        src={tweezers}
        alt=""
        aria-hidden
        width={248}
        height={157}
        sizes="(min-width: 1280px) 248px, 90px"
        loading="eager"
        className="pointer-events-none absolute top-0 -right-[13px] h-auto w-[90px] xl:right-0 xl:w-[248px]"
      />

      {/* Copy */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-4 pt-1.5 text-center text-ink xl:gap-[41px] xl:pt-[5px]">
        <h1
          id="banner-title"
          className="font-playfair text-[26px] leading-none font-normal tracking-[0.01em] xl:-translate-x-[34px] xl:text-[48px]"
        >
          Custom Jewelry
        </h1>
        <p className="max-w-[300px] font-sans text-sm leading-[1.3] font-normal tracking-[0.01em] xl:max-w-none xl:text-xl xl:leading-none">
          Create Your Masterpiece: Bespoke Jewelry Crafted for You
        </p>
      </div>
    </section>
  );
}
