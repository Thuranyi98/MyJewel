# Project Memory & Rules

## 1. Project Overview & Scope
- **Task:** Recreate a 5-section desktop landing page based on Figma design (Header, Footer, 5 main sections).
- **Framework:** Next.js 15 (App Router), TypeScript, Tailwind CSS.

## 2. Typography & Design System
- **Font Installation:** Import and setup all Google Fonts directly using `next/font/google` (Zero runtime overhead, optimized loading).
- **Fonts Required:** `DM Sans`, `Open Sans`, and `Playfair Display`.
- **Layout:** Optimized for desktop screens based on incoming design details.

## 3. Performance & Asset Rules (Core Web Vitals)
- **LCP & CLS:** Use `next/image` with explicit width, height, and proper `sizes` attribute. Apply `priority` for above-the-fold assets.
- **Blur Placeholders:** Use lightweight placeholders for smooth visual loading without bloating bundle sizes (do NOT convert all images to heavy Base64 strings).

## 4. Functional Requirements
- **Testimonial Section:** Use a public API endpoint (e.g., `https://dummyjson.com/quotes`) with Next.js ISR (`next: { revalidate: 3600 }`) for caching.
- **Newsletter Subscription:**
  - Client-side email validation.
  - Server Action / Route Handler simulating notification dispatch to `process.env.EMAIL_ADDRESS`.
  - Log server-side events and return UI feedback.

## 5. SEO & Metadata
- Fully configured static Metadata, Open Graph (OG) tags, and Twitter Cards.

## 6. Header Spec & Design Tokens (implemented in `components/Header.tsx`)
- **Tokens** (`app/globals.css` `@theme`): `navy` #15274B, `ink` #434343, `line` #E4E4E4. Fonts: `font-sans` = DM Sans, `font-open` = Open Sans, `font-playfair` = Playfair Display.
- **Assets:** SVG icons + logo live in `public/icons/` (rendered via `next/image`).
- **Desktop/mobile switch:** Tailwind `lg` (1024px). Below that the mobile header shows. Between 1024–1440 the logo/search cells and nav gaps shrink (`lg:` 200/80px, gap 20 → `xl:` 250/103px, gap 40 → 1440px gap 56). Announcement text is 8px below `sm`, 11px from `sm` up.
- **Sub header:** 35px desktop / 25px mobile, 1px `line` bottom border. Announcement dots: 4px desktop / 2px mobile, `navy`.
- **Main header:** 80px desktop / 60px mobile. Logo 133.44×34.99 desktop / 94×24.65 mobile.
- **Icons:** desktop calendar 20px, other sub header icons 17.22px, search 30px, chevron 13px; mobile icons 18px.
- **Nav / announcement text:** DM Sans 13px, lh 160%, ls 8%, uppercase, `ink`. Announcement 11px desktop (8px mobile, measured from design), ls 3%, `navy`. "Book an appointment": Open Sans 10px, ls 3%, uppercase, `navy`.
- **Next 16 note:** `priority` on `next/image` is deprecated; use `preload`.

## 7. Banner Spec (implemented in `components/Banner.tsx`)
- **Assets:** `public/images/banner/banner-*.png` (renamed from Figma exports), imported statically. `chevron-left/right` = desktop bg (468×420 each), `bg-mobile` = mobile bg (375×300).
- **Size:** 420px desktop (`xl`) / 300px mobile, bg `#F0F0F0` (`bg-banner`). Copy: Playfair 48/26px title (`ink`), DM Sans 20/14px subtitle, lh 100%, ls 1%.
- **Geometry** was fitted against the Figma screenshots (within ~1px), not copied from Figma numbers: Figma's ring/tweezers sizes and the -91.05° rotation don't reproduce the design. Desktop: diamonds 533×top 73/left 0, ring 540 wide top 105/right 0, tweezers 248 wide top 0/right 0. Mobile: diamonds 143 wide top 198, ring-mobile 155×123 flush bottom-right (natural ratio), tweezers-mobile 79 wide top 2/right 0.
- **Mobile ring:** separate asset `banner-ring-mobile.png` (636×504, tighter crop) via `<picture>`, fitted to 155 wide, natural ratio, bottom/right flush. Desktop keeps `banner-ring.png`.
- **Mobile tweezers:** uses a separate asset `banner-tweezers-mobile.png` (316×357, long arms) via `<picture>` art direction; fitted to 79×89, top 2, flush right (matches Figma's left 296). Desktop keeps `banner-tweezers.png`.
- **Figma spec heights are unreliable:** spec-literal sizes (pile 142.8×102, ring 194×194, tweezers 130.9×121 + rotation) scored 1.5–3.5× worse against the Figma screenshot than fitted ones, so widths/left/top are used and heights follow the image's natural ratio .
- **Mobile text:** subtitle line-height 1.3 (design measured, spec says 100%).
- **Perf/CLS:** fixed section height, explicit width/height on all images, `<picture>` art direction (`getImageProps`) so only one bg downloads, `fetchPriority="high"` on bg + diamonds, `loading="eager"` on jewelry. No `placeholder="blur"` — it shows gray boxes on transparent PNGs. Next 16 docs say prefer `loading="eager"`/`fetchPriority` over `preload` when LCP varies by viewport.

## 8. Responsive Behavior (between 375 and 1440)
- **Banner < `md` (768px):** the 375px mobile composition as designed; jewelry hugs the edges, text stays centered, height 300px.
- **Banner ≥ `md`:** the 1440px desktop composition scaled with the section width using container query units (`@container` + `cqw`), each size capped at its designed px value so it doesn't grow past 1440px. Height `clamp(260px, 29.17cqw, 420px)`; pile/ring anchored to the bottom, tweezers top-right. Title `clamp(32px, 3.33cqw, 48px)`, subtitle `clamp(15px, 1.39cqw, 20px)` wraps balanced in `44cqw`.
- **Art direction** via `<picture>` also switches at 768px (mobile bg/tweezers vs desktop frames/tweezers). Keep `md` in `media=` in sync with the Tailwind `md:` classes.
- Verified at 375 / 600 / 768 / 1024 / 1280 / 1440 / 1920. 375 and 1440 still match Figma within ~1px.

## 9. Footer Spec (implemented in `components/Footer.tsx`, `components/NewsletterForm.tsx`, `app/actions/newsletter.ts`)
- **Desktop (`lg`, 1024px+):** 415px tall, px 80, bg `#F8F8F8` (`bg-footer`), content starts at top 86. Grid `254fr 264fr 264fr 454fr 44fr` (= design column lefts 80/334/598/862 at 1440). Titles DM Sans 600 16px uppercase (col 4 titles not uppercase), links 14px lh 30px, all `ink`. Sub footer 60px, 1px `line` top border at y=355; legal links 12px gap 30, social icons 25px gap 25.
- **Newsletter:** input 376×46 white + send button 46×46 `bg-brand` (#0D4269) with 18px white `VscSend`. Client validation (`onSubmit`, `noValidate`, regex) → `useActionState` + Server Action. Action validates again, logs server-side (masked email), simulates dispatch to `process.env.EMAIL_ADDRESS` (only warns if unset), returns `{status, message}` shown in an absolutely positioned `aria-live` line (no layout shift). Verified in a real browser via CDP.
- **Payments:** `public/images/footer/{visa,amex,apple-pay,teddy}.png` at 57.5px wide, gap 15. Mastercard has no asset yet → inline SVG badge (`MastercardBadge`); replace with a PNG when provided. `visa.png`/`amex.png` originally had opaque black/white corners; they were flood-filled to transparent.
- **Padding/columns by width:** px 80 + pt 86 from `md` (768px); 4-column grid from `lg` (1024px) with payment cards shrinking (max 57.5px); 2 columns `md`–`lg`; below `md` the mobile layout.
- **Env:** set `EMAIL_ADDRESS` in `.env.local` (git-ignored) to see the recipient in the server log.

## 6. Google Lighthouse Audit & Performance Rules

### A. Performance (Target: 90-100)
- **LCP (Largest Contentful Paint):** 
  - Above-the-fold image (Hero Section) တွင် `priority={true}` နှင့် `loading="eager"` ကို သေချာပေါက် သုံးရန်။
  - Dynamic Google Fonts များကို `next/font/google` ဖြင့် Import လုပ်ပြီး `display: 'swap'` ပါဝင်ကြောင်း သေချာစေရန်။
- **CLS (Cumulative Layout Shift):** 
  - `<Image />` တိုင်းတွင် `width` နှင့် `height` တိတိကျကျ သတ်မှတ်ရန်။
  - Layout Jump မဖြစ်စေရန် Skeleton Loading သို့မဟုတ် `placeholder="blur"` (Tiny Base64 string) အသုံးပြုရန်။
- **FID / INP & TBT (Total Blocking Time):** 
  - Third-party scripts များ သုံးပါက `next/script` ၏ `strategy="lazyOnload"` သို့မဟုတ် `strategy="afterInteractive"` ကို သုံးရန်။
  - Unnecessary Heavy Client Components များကို ရှောင်ရှားပြီး Server Components (RSC) ကို တတ်နိုင်သမျှ Default အဖြစ် သုံးရန်။

### B. Accessibility (Target: 100)
- **Alt Texts:** ပုံရုပ်ပုံတိုင်းတွင် အဓိပ္ပာယ်ရှိသော `alt` attribute ထည့်ရန် (Decorative icons များအတွက် `alt=""` သို့မဟုတ် `aria-hidden="true"` သုံးရန်)။
- **Color Contrast:** Text နှင့် Background အရောင် contrast ratio အနည်းဆုံး 4.5:1 ရှိရမည် (Tailwind text colors များကို သတိထားရန်)။
- **Interactive Elements:** 
  - `<button>` နှင့် `<a>` Tag တိုင်းတွင် accessible name ပါရမည် (Icon-only button များအတွက် `aria-label` ထည့်ရန်)။
  - Semantic HTML tags (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`) ကို မှန်ကန်စွာ အသုံးပြုရန်။

### C. Best Practices (Target: 100)
- **Image Aspect Ratio & Formats:** Images များကို Modern Formats (WebP/AVIF) နှင့် သင့်တော်သော Resolution ဖြင့်သာ ပို့ပေးရန်။
- **Security & Console:** Production build တွင် Console error/warning များ ကင်းစင်စေရန်။
- **HTTPS & Aspect Ratio:** Fixed dimension containers များကို သုံး၍ Image distortion မဖြစ်စေရန်။

### D. SEO (Target: 100)
- **Heading Structure:** စာမျက်နှာတွင် `<h1>` tag တစ်ခုတည်းသာ ရှိရမည်။ Section ခေါင်းစဉ်များကို `<h2>`, `<h3>` အစဉ်လိုက် အသုံးပြုရန်။
- **Meta Description & Title:** Next.js `metadata` object ထဲတွင် Title, Description, Open Graph (OG), Twitter Card များကို ပြည့်စုံစွာ ထည့်သွင်းရန်။
- **Robots & Sitemap:** Dynamic `robots.txt` နှင့် `sitemap.ts` ကို App Router structure ထဲတွင် ထည့်သွင်းပေးရန်။

## 7. Crawlers, Sitemap & Image SEO Rules

### A. Dynamic Sitemap & Robots.txt Setup
- **`app/sitemap.ts`:** Next.js App Router ၏ dynamic `sitemap.ts` ကို အသုံးပြု၍ URL, `lastModified`, `changeFrequency`, နှင့် `priority` များ ပါဝင်သော `sitemap.xml` ကို ဖန်တီးရန်။
- **`app/robots.ts`:** Googlebot နှင့် အခြား Search Engine Crawlers များအတွက် `robots.txt` ကို စနစ်တကျ Config လုပ်ရန် (`User-agent: *`, `Allow: /`, `Sitemap: <DOMAIN>/sitemap.xml`)။

### B. Image SEO & Rich Metadata
- **Image Titles & Alt Attributes:** 
  - `<Image />` တိုင်းတွင် SEO Keyword ပါဝင်ပြီး Descriptive ဖြစ်သော `alt` စာသား ထည့်သွင်းရန်။
  - လိုအပ်သော အဓိက Images များတွင် HTML `title` attribute ပါဝင်စေရန်။
- **Open Graph (OG) Images:**
  - Dynamic သို့မဟုတ် Static `og-image.jpg` (1200x630 px) ကို `app/layout.tsx` သို့မဟုတ် `metadata` ထဲတွင် ထည့်သွင်းပြီး Social Media (Facebook, LinkedIn, Twitter) Preview များတွင် ပုံအပြည့်အဝ ပေါ်စေရန်။

### C. Advanced Meta Data & Structured Data (JSON-LD)
- **Canonical URLs:** Content ထပ်နေခြင်း (Duplicate Content) ကို ကာကွယ်ရန် `metadataBase` နှင့် `alternates.canonical` သတ်မှတ်ရန်။
- **Structured Data (Schema.org):** Search Engine Crawlers များ စာမျက်နှာ အကြောင်းအရာကို ပိုမို နားလည်လွယ်စေရန် JSON-LD (`Organization` သို့မဟုတ် `WebSite` Schema) ကို Script Tag ဖြင့် ထည့်သွင်းရန်။
## 10. Mobile Footer Spec (< `md`, 375px design; same `Footer.tsx`)
- Padding: pt 50, left 15, right 20 (Figma content is 340 wide in a 375 frame). Height ≈ 862px with 14 link items.
- Link groups stacked, each `pt 10 / title 14px 600 uppercase (visually nudged 2px down like desktop) / ul mt 6 / items 14px lh 30 / pb 9 / 1px line border-b` (group height = 40 + 30n). Border color `line`. "Let's Keep In Touch" is 16px (a `text-sm` default once overrode it — set sizes per element, not in the shared title class).
- "Let's Keep In Touch": pt 28 after last border; input 32px tall (placeholder 13px, px 10) + 32px send button (12px icon); "Payment Methods" 12.89px, mt 26; cards 46.33px wide, gap 12, mt 15.
- Sub footer: legal links (8px, gap 20) left + 18px social icons (gap 4.5) right, then 1px border, then centered 10px copyright (`flex-col-reverse` puts the desktop-first DOM order in this visual order). Sub footer box (56px) has `mt 30` below the payment cards plus 10px inner top padding (legal row starts 40px below the cards, as in the design) and the footer keeps `pb 10` under it.
- **Link content differs by breakpoint in Figma** and is kept that way in `LINK_COLUMNS` (`mobileLinks` < `md`, `desktopLinks` ≥ `md`). Mobile: Contact Us = Blog / Lab Grown Diamond Guide / Moissanite vs. Diamond Guide / Ring Size Guide; Art of Gifting = Book Appointment / Visit Our Stores / Email Us / Contact Us / Schedule a consultation; Bespoke & Services = Warranty / Repairs & Returns / FAQs / Track Your Order / Jewelry Insurance. Figma spells "Visti Our Stores" — corrected to "Visit".
