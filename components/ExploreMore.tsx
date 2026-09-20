import Image from "next/image";
import Link from "next/link";
import model from "@/public/images/explore-more/jewelry-model.png";
import modelMobile from "@/public/images/explore-more/jewelry-model-mobile.png";

// Each label sits in a 238×36 box next to the 50px icon (238 + 30 gap + 50 = 318). At the
// design width the labels don't wrap on their own ("How to Choose the Engagement Ring" is
// ~243px wide), so the line break in the first one is explicit and only applies from 1340px up.
const GUIDES = [
  {
    label: "How to Select the Ideal Wedding Band",
    content: (
      <>
        How to Select the Ideal Wedding
        <br className="hidden min-[1340px]:inline" /> Band
      </>
    ),
    underline: true,
  },
  {
    label: "How to Choose the Engagement Ring",
    content: "How to Choose the Engagement Ring",
  },
  // Figma sets this label 6px below the icon's centre line.
  {
    label: "Lab Grown Diamond Guide",
    content: "Lab Grown Diamond Guide",
    offset: true,
  },
  { label: "Ring Size Guide", content: "Ring Size Guide" },
];

export default function ExploreMore() {
  return (
    <section
      aria-labelledby="explore-more-heading"
      className="grid w-full lg:grid-cols-[minmax(0,1fr)_min(590px,41vw)] lg:gap-x-16"
    >
      <div className="px-[15px] pt-[70px] md:px-20 lg:pr-0 lg:pb-[101px] lg:pl-[max(80px,calc(50vw-640px))]">
        <h2
          id="explore-more-heading"
          className="relative top-[4.7px] font-playfair text-[26px] leading-none font-normal text-heading lg:top-[5.1px] lg:text-[32px] lg:tracking-[0.01em]"
        >
          Explore More
        </h2>
        <p className="mt-[19.4px] max-w-[330px] font-sans text-sm leading-[1.3] tracking-[0.0145em] text-muted md:max-w-[420px] lg:mt-[26.6px]">
          Looking for more diamond guides, buying tips or details about the 4Cs?
          Explore more of our diamond education pages:
        </p>

        <ul className="mt-10 grid gap-y-2.5 lg:mt-[30px] lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-2 lg:gap-x-[70px] lg:gap-y-[22.9px]">
          {GUIDES.map(({ label, content, offset, underline }) => (
            <li key={label}>
              <Link
                href="#"
                className="group flex min-h-11 items-center justify-between gap-[27px] font-sans text-xs leading-[1.3] tracking-[0.01em] text-ink lg:min-h-[50px] lg:gap-[30px] lg:text-sm lg:leading-[18px]"
              >
                <span className="flex min-h-[27px] max-w-[275px] min-w-0 flex-1 items-center lg:min-h-9 lg:max-w-[238px]">
                  <span
                    className={`min-[1340px]:whitespace-nowrap group-hover:underline group-focus-visible:underline ${underline ? "underline" : ""} ${offset ? "lg:relative lg:top-1.5" : ""}`}
                  >
                    {content}
                  </span>
                </span>
                <Image
                  src="/icons/ExternalLinkCircle.svg"
                  alt=""
                  width={50}
                  height={50}
                  className="size-11 shrink-0 lg:size-[50px]"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-[30px] lg:mt-0">
        <Image
          src={modelMobile}
          alt="Smiling woman wearing a diamond necklace, earring and ring"
          sizes="100vw"
          placeholder="blur"
          className="block h-auto w-full lg:hidden"
        />
        <Image
          src={model}
          alt="Smiling woman wearing a diamond necklace, earring and ring"
          fill
          sizes="(min-width: 1440px) 590px, 41vw"
          placeholder="blur"
          className="hidden object-cover lg:block"
        />
      </div>
    </section>
  );
}
