import Image from "next/image";
import Link from "next/link";
import band from "@/public/images/custom-jewelry/ring-band.png";
import solitaire from "@/public/images/custom-jewelry/ring-solitaire.png";

const STEPS = [
  {
    title: "Consultation",
    description:
      "We discuss your vision and preferences to craft a unique design.",
  },
  {
    title: "Selecting Materials",
    description:
      "Choose from exquisite diamonds, precious metals, and gemstones.",
  },
  {
    title: "Creating a 3D Model",
    description:
      "Visualize your design with a precise 3D model before production.",
  },
  {
    title: "Manufacturing",
    description:
      "Expert artisans bring your piece to life with precision and care.",
  },
  {
    title: "Quality Assurance",
    description: "Every detail is inspected to ensure flawless craftsmanship.",
  },
  {
    title: "Delivery",
    description:
      "Your custom jewelry is elegantly packaged and delivered to you.",
  },
];

export default function CustomJewelry() {
  return (
    <section
      aria-labelledby="custom-jewelry-heading"
      className="@container mx-auto w-full max-w-[1440px] px-[15px] pt-[18px] pb-[70px] md:px-20 md:pt-[21px] lg:min-h-[1102px] lg:pb-0"
    >
      <nav
        aria-label="Breadcrumb"
        className="font-sans text-sm leading-[1.6] text-ink"
      >
        <Link href="/" className="text-muted hover:underline">
          Home
        </Link>{" "}
        <span className="text-muted" aria-hidden>
          /
        </span>{" "}
        <span aria-current="page">Custom Jewelry</span>
      </nav>

      {/* Below lg the wrappers use display: contents so the four blocks stack in
          the mobile order (title, steps, intro, images) via `order`. */}
      <div className="mt-10 flex flex-col md:mt-[56.6px] lg:grid lg:grid-cols-[minmax(0,517.8fr)_minmax(0,678fr)] lg:gap-x-[84.2px]">
        <div className="contents lg:block">
          <div className="order-1 md:max-w-[477px]">
            <h2
              id="custom-jewelry-heading"
              className="font-playfair text-[26px] leading-[1.6] font-normal text-heading md:text-4xl md:leading-[48px] md:tracking-[0.01em]"
            >
              Custom Jewelry
            </h2>
            <p className="relative mt-2.5 max-w-[373px] font-sans text-sm leading-[1.6] tracking-[0.03em] text-ink md:top-[1.3px] md:mt-5 md:text-xl">
              Create Your Masterpiece: Bespoke Jewelry Crafted for You
            </p>
          </div>

          <div className="relative order-4 mt-[30px] aspect-[345/431.25] w-full max-w-[517.8px] md:mt-12 md:aspect-[517.8/645.6] lg:mt-[31.5px]">
            <Image
              src={solitaire}
              alt="Solitaire ring held in a black glove"
              width={373}
              height={476}
              sizes="(min-width: 768px) 373px, 73vw"
              placeholder="blur"
              className="absolute top-0 left-0 h-[74.5%] w-[72.96%] object-cover md:h-[73.73%] md:w-[72.03%]"
            />
            <Image
              src={band}
              alt="Diamond and gold band held in a black glove"
              width={253}
              height={330}
              sizes="(min-width: 768px) 253px, 47vw"
              placeholder="blur"
              className="absolute top-[50.39%] left-[53.21%] h-[49.61%] w-[46.79%] object-cover md:top-[48.85%] md:left-[51.25%] md:h-[51.15%] md:w-[48.75%]"
            />
          </div>
        </div>

        <div className="contents lg:block">
          <p className="relative top-[2.6px] order-3 mt-5 font-sans text-sm leading-[1.6] text-ink md:top-0 md:mt-12 md:max-w-[560px] md:text-base md:tracking-[0.03em] lg:mt-0">
            Exquisite design, flawless craftsmanship, and timeless elegance—your
            vision, perfectly crafted.
          </p>

          <ol className="order-2 mt-[18px] flex flex-col gap-7 md:mt-10 md:gap-[30px] lg:mt-[41.3px]">
            {STEPS.map(({ title, description }, index) => (
              <li
                key={title}
                className="flex items-start gap-2.5 pt-0.5 md:gap-0 md:pt-0"
              >
                <span
                  aria-hidden
                  className="relative shrink-0 font-sans text-sm leading-[1.6] tracking-[0.01em] text-muted uppercase md:w-[43.5px] md:text-xl lg:top-[0.9px]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="max-w-[299.3px] min-w-0 flex-1 border-b border-line pb-[9px] md:max-w-none md:pb-[29px]">
                  <h3 className="relative font-sans text-base leading-none font-medium tracking-[0.06em] text-heading uppercase md:text-2xl md:leading-[1.6] md:tracking-[0.1em] lg:-top-[0.6px]">
                    {title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-[18px] text-muted md:mt-2.5 md:text-xl md:leading-[1.6] lg:text-[clamp(15px,calc(1.75cqw-2.4px),20px)]">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
