import Image from "next/image";
import Link from "next/link";

const CART_COUNT = 1;

const NAV_ITEMS = [
  { label: "Jewelry", hasMenu: true },
  { label: "Love and Engagement", hasMenu: true },
  { label: "Gifts", hasMenu: true },
  { label: "Custom Jewelry", hasMenu: false },
  { label: "About", hasMenu: false },
  { label: "Contact Us", hasMenu: false },
];

function Icon({
  name,
  size,
  className,
}: {
  name: string;
  size: number;
  className?: string;
}) {
  return (
    <Image
      src={`/icons/${name}.svg`}
      alt=""
      width={size}
      height={size}
      loading="eager"
      className={className}
    />
  );
}

function Logo() {
  return (
    <Image
      src="/icons/MyJewel.svg"
      alt="MyJewel"
      width={133}
      height={35}
      sizes="(min-width: 1024px) 134px, 94px"
      preload
      className="h-auto w-[94px] lg:w-[133.44px]"
    />
  );
}

export default function Header() {
  return (
    <header className="relative z-10 bg-white">
      {/* Sub header (border is full-bleed, content follows the 1440px page grid) */}
      <div className="h-[25px] border-b border-line lg:h-[35px]">
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10">
          <Link
            href="#"
            className="hidden items-center gap-2 font-open text-[10px] leading-[1.6] tracking-[0.03em] text-navy uppercase lg:flex"
          >
            <Icon name="HiOutlineCalendarDays" size={20} />
            Book an appointment
          </Link>

          <p className="flex items-center gap-1.5 text-center font-sans text-[8px] leading-[1.6] tracking-[0.03em] text-navy sm:gap-3 sm:text-[11px]">
            <span
              aria-hidden
              className="size-0.5 rounded-full bg-navy sm:size-1"
            />
            Exclusive Collection Launch: Discover Timeless Elegance Today
            <span
              aria-hidden
              className="size-0.5 rounded-full bg-navy sm:size-1"
            />
          </p>

          <div className="hidden items-center justify-end gap-5 lg:flex">
            <button type="button" aria-label="Account">
              <Icon name="HiOutlineUserCircle" size={17.22} />
            </button>
            <button type="button" aria-label="Wishlist">
              <Icon name="heart" size={17.22} />
            </button>
            <button type="button" aria-label="Cart">
              <Icon name="IoBagOutline" size={17.22} />
            </button>
          </div>
        </div>
      </div>

      {/* Main header: desktop */}
      <div className="hidden h-20 border-b border-line lg:block">
        <div className="mx-auto flex h-full max-w-[1440px]">
          <Link
            href="/"
            aria-label="MyJewel home"
            className="flex w-[200px] shrink-0 xl:w-[250px] items-center justify-center border-r border-line"
          >
            <Logo />
          </Link>

          <nav
            aria-label="Main"
            className="flex flex-1 items-center justify-center"
          >
            <ul className="flex items-center gap-x-5 xl:gap-x-10 min-[1440px]:gap-x-14">
              {NAV_ITEMS.map(({ label, hasMenu }) => (
                <li key={label}>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-center font-sans text-[13px] leading-[1.6] tracking-[0.08em] text-ink uppercase"
                  >
                    {label}
                    {hasMenu && <Icon name="FiChevronDown" size={13} />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            aria-label="Search"
            className="flex w-20 shrink-0 xl:w-[103px] items-center justify-center border-l border-line"
          >
            <Icon name="IoSearchOutline" size={30} />
          </button>
        </div>
      </div>

      {/* Main header: mobile */}
      <div className="grid h-[60px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8 shadow-[0_4px_8px_rgba(0,0,0,0.05)] lg:hidden">
        <div className="flex items-center gap-4">
          <button type="button" aria-label="Open menu">
            <Icon name="TbMenu2" size={18} />
          </button>
          <Link href="#" aria-label="Book an appointment">
            <Icon name="HiOutlineCalendarDays" size={18} />
          </Link>
        </div>

        <Link href="/" aria-label="MyJewel home">
          <Logo />
        </Link>

        <div className="flex items-center justify-end gap-4">
          <button type="button" aria-label="Wishlist">
            <Icon name="heart" size={18} />
          </button>
          <button
            type="button"
            aria-label={`Cart, ${CART_COUNT} item${CART_COUNT === 1 ? "" : "s"}`}
            className="relative"
          >
            <Icon name="IoBagOutline" size={18} />
            <span className="absolute -top-[7px] -right-[7px] flex size-3.5 items-center justify-center rounded-full bg-ink font-sans text-[9px] leading-none text-white">
              {CART_COUNT}
            </span>
          </button>
          <button type="button" aria-label="Search">
            <Icon name="IoSearchOutline" size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
