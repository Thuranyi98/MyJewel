import Image from "next/image";
import Link from "next/link";
import InlineIcon from "@/components/InlineIcon";
import NewsletterForm from "@/components/NewsletterForm";
import amex from "@/public/images/footer/amex.png";
import applePay from "@/public/images/footer/apple-pay.png";
import teddy from "@/public/images/footer/teddy.png";
import visa from "@/public/images/footer/visa.png";

// Figma uses different link lists for mobile and desktop, so both are kept.
const LINK_COLUMNS = [
  {
    title: "Contact Us",
    desktopLinks: [
      "Book Appointment",
      "Visit Our Stores",
      "Email Us",
      "Contact Us",
      "Schedule a consultation",
    ],
    mobileLinks: [
      "Blog",
      "Lab Grown Diamond Guide",
      "Moissanite vs. Diamond Guide",
      "Ring Size Guide",
    ],
  },
  {
    title: "The Art of Gifting",
    desktopLinks: [
      "Luxury Gift Wrapping",
      "Gift Cards",
      "Private & White-Glove Delivery",
    ],
    mobileLinks: [
      "Book Appointment",
      "Visit Our Stores",
      "Email Us",
      "Contact Us",
      "Schedule a consultation",
    ],
  },
  {
    title: "Bespoke & Services",
    desktopLinks: [
      "Custom Jewelry Design",
      "Private Jewelry Consultations",
      "Jewelry Restoration & Care",
    ],
    mobileLinks: [
      "Warranty",
      "Repairs & Returns",
      "FAQs",
      "Track Your Order",
      "Jewelry Insurance",
    ],
  },
];

const LEGAL_LINKS = ["Terms & Conditions", "Privacy Policy", "Site Map"];

const SOCIAL_LINKS = [
  { label: "Facebook", icon: "LiaFacebook" },
  { label: "Instagram", icon: "LiaInstagram" },
];

const TITLE_CLASS =
  "font-sans leading-none font-semibold tracking-[0.01em] text-ink";

function MastercardBadge() {
  return (
    <svg
      role="img"
      aria-label="Mastercard"
      viewBox="0 0 230 160"
      className="block h-auto w-[46.33px] md:w-[57.5px] lg:w-full"
    >
      <defs>
        <clipPath id="mastercard-overlap">
          <circle cx="95" cy="80" r="42" />
        </clipPath>
      </defs>
      <rect
        x="13"
        y="13"
        width="204"
        height="134"
        rx="26"
        fill="#fff"
        stroke="#dcdcdc"
        strokeWidth="6"
      />
      <circle cx="95" cy="80" r="42" fill="#434343" />
      <circle cx="135" cy="80" r="42" fill="#9b9b9b" />
      <circle
        cx="135"
        cy="80"
        r="42"
        fill="#6e6e6e"
        clipPath="url(#mastercard-overlap)"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-footer">
      <div className="mx-auto flex max-w-[1440px] flex-col pr-5 pb-2.5 pl-[15px] md:px-20 md:pb-0 lg:h-[415px]">
        <div className="grid pt-[50px] md:grid-cols-2 md:gap-10 md:pt-[86px] md:pb-12 lg:flex-1 lg:grid-cols-[254fr_264fr_264fr_454fr_44fr] lg:gap-0 lg:pb-0">
          {LINK_COLUMNS.map(({ title, desktopLinks, mobileLinks }) => (
            <nav
              key={title}
              aria-label={title}
              className="min-w-0 border-b border-line pt-2.5 pb-[9px] md:border-0 md:p-0"
            >
              <h2
                className={`${TITLE_CLASS} relative top-0.5 text-sm uppercase md:text-base`}
              >
                {title}
              </h2>
              <ul className="mt-1.5 md:hidden">
                {mobileLinks.map((label) => (
                  <li key={label}>
                    <Link
                      href="#"
                      className="font-sans text-sm leading-[30px] tracking-[0.01em] text-ink"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-3.5 hidden md:block">
                {desktopLinks.map((label) => (
                  <li key={label}>
                    <Link
                      href="#"
                      className="font-sans text-sm leading-[30px] tracking-[0.01em] text-ink hover:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="min-w-0 pt-7 md:pt-0">
            <h2 className={`${TITLE_CLASS} relative top-0.5 text-base`}>
              Let’s Keep In Touch
            </h2>
            <div className="mt-[15px]">
              <NewsletterForm />
            </div>

            <h2
              className={`${TITLE_CLASS} mt-[26px] text-[12.89px] md:mt-[38px] md:text-base`}
            >
              Payment Methods
            </h2>
            <ul className="mt-[15px] flex flex-wrap gap-3 md:mt-[17px] md:gap-[15px] lg:flex-nowrap">
              <li className="lg:max-w-[57.5px] lg:min-w-0 lg:flex-1">
                <Image
                  src={visa}
                  alt="Visa"
                  width={58}
                  height={39}
                  sizes="58px"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="low"
                  className="h-auto w-[46.33px] md:w-[57.5px] lg:w-full"
                />
              </li>
              <li className="lg:max-w-[57.5px] lg:min-w-0 lg:flex-1">
                <MastercardBadge />
              </li>
              <li className="lg:max-w-[57.5px] lg:min-w-0 lg:flex-1">
                <Image
                  src={amex}
                  alt="American Express"
                  width={58}
                  height={40}
                  sizes="58px"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="low"
                  className="h-auto w-[46.33px] md:w-[57.5px] lg:w-full"
                />
              </li>
              <li className="lg:max-w-[57.5px] lg:min-w-0 lg:flex-1">
                <Image
                  src={applePay}
                  alt="Apple Pay"
                  width={58}
                  height={40}
                  sizes="58px"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="low"
                  className="h-auto w-[46.33px] md:w-[57.5px] lg:w-full"
                />
              </li>
              <li className="lg:max-w-[57.5px] lg:min-w-0 lg:flex-1">
                <Image
                  src={teddy}
                  alt="Teddy"
                  width={58}
                  height={40}
                  sizes="58px"
                  loading="eager"
                  decoding="sync"
                  fetchPriority="low"
                  className="h-auto w-[46.33px] md:w-[57.5px] lg:w-full"
                />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[30px] flex shrink-0 flex-col-reverse pt-2.5 md:mt-0 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4 md:border-t md:border-line md:py-5 lg:h-[60px] lg:flex-nowrap lg:py-0">
          <p className="border-t border-line pt-[11px] pb-px text-center font-sans text-[10px] leading-none tracking-[0.01em] whitespace-nowrap text-ink md:border-0 md:p-0 md:text-left md:text-sm">
            <span className="relative left-[2.5px] md:left-0">
              © 2025, All Rights Reserved - MyJewel
            </span>
          </p>
          <div className="flex items-center justify-between pb-[5px] md:flex-wrap md:justify-start md:gap-x-[30px] md:gap-y-3 md:pb-0">
            <div className="flex gap-x-5 md:gap-x-[30px]">
              {LEGAL_LINKS.map((label) => (
                <Link
                  key={label}
                  href="#"
                  className="font-sans text-[8px] leading-none tracking-[0.01em] text-ink hover:underline md:text-xs"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-[4.5px] md:gap-[25px]">
              {SOCIAL_LINKS.map(({ label, icon }) => (
                <Link key={label} href="#" aria-label={label}>
                  <InlineIcon
                    name={icon}
                    size={25}
                    className="size-[18px] md:size-[25px]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
