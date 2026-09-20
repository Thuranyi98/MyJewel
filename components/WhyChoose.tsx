import Image from "next/image";

const REASONS = [
  {
    icon: "/icons/PiUserCircleCheckLight.svg",
    title: "Personal Design Consultation",
    lines: ["Work with our designers to create", "your perfect piece."],
  },
  {
    icon: "/icons/game-icons_diamond-hard.svg",
    title: "Crafted with Luxury Materials",
    lines: [
      "Only the finest diamonds, gemstones, and",
      "precious metals used.",
    ],
  },
  {
    icon: "/icons/IoRibbonOutline.svg",
    title: "Lifetime Warranty",
    lines: [
      "Lifetime warranty on every piece, ensuring",
      "quality and lasting beauty.",
    ],
  },
];

export default function WhyChoose() {
  return (
    <section
      aria-labelledby="why-choose-heading"
      className="relative overflow-hidden bg-surface"
    >
      <Image
        src="/images/why-choose/circles.svg"
        alt=""
        aria-hidden
        width={629}
        height={254}
        className="pointer-events-none absolute right-0 bottom-0 hidden h-[254px] w-[629px] lg:block"
      />
      <Image
        src="/images/why-choose/ellipse-left.svg"
        alt=""
        aria-hidden
        width={372}
        height={130}
        className="pointer-events-none absolute bottom-0 left-0 h-[130px] w-[372px] lg:hidden"
      />
      <Image
        src="/images/why-choose/ellipse-right.svg"
        alt=""
        aria-hidden
        width={204}
        height={316}
        className="pointer-events-none absolute right-0 bottom-0 h-[316px] w-[204px] lg:hidden"
      />

      <div className="relative mx-auto max-w-[1440px] px-[15px] pt-[70px] pb-[120px] md:px-20 lg:pt-[77px] lg:pb-[117px]">
        <h2
          id="why-choose-heading"
          className="text-center font-playfair text-[26px] leading-[50px] font-normal text-heading lg:text-4xl lg:tracking-[0.01em]"
        >
          Why Choose MyJewel?
        </h2>

        <ul className="mt-5 grid gap-5 lg:mt-10 lg:grid-cols-[repeat(3,minmax(0,400px))] lg:gap-[33.6px]">
          {REASONS.map(({ icon, title, lines }) => (
            <li
              key={title}
              className="flex min-h-[162px] flex-col items-center bg-white p-5 text-center shadow-[0_2px_14px_rgba(0,0,0,0.045)] lg:min-h-[194px]"
            >
              <Image
                src={icon}
                alt=""
                width={45}
                height={45}
                className="size-[35px] lg:size-[45px]"
              />
              <h3 className="relative top-[2.3px] mt-[15px] font-playfair text-base leading-none font-semibold tracking-[0.03em] text-navy lg:top-0 lg:mt-[21.7px] lg:text-xl lg:leading-[1.2] lg:text-balance">
                {title}
              </h3>
              <p className="relative top-[6px] mt-[15px] max-w-[290px] font-sans md:max-w-none text-sm leading-[18px] text-muted lg:top-0 lg:mt-[20.6px] lg:max-w-none lg:text-base lg:leading-[1.3] lg:text-balance">
                {lines[0]}
                <br className="hidden min-[1300px]:inline" /> {lines[1]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
