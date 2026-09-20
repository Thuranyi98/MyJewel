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
- **Wide screens:** the header's borders/background are full-bleed but its desktop content (top bar + main bar) sits in a centered `max-w-[1440px]` box, like every section, so the logo/nav/search stay aligned with the page grid on screens wider than 1440px. Figma itself puts the logo 22px left of the 80px content edge (logo centred in a 250px cell), and that offset is kept.
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

## 11. Custom Jewelry Section — left side (`components/CustomJewelry.tsx`, desktop first)
- Sits under the banner in `app/page.tsx`. Container `max-w 1440`, px 80 (`px-4` below `md`, interim), pt 21. **Section height 1102px from `lg` (1024px) up** (`lg:h-[1102px]`; the right column's last divider sits at ~1004px, image column ends at 909px); below `lg` the height follows the content.
- Breadcrumb "Home / Custom Jewelry" 14px lh 160%; "Home" and "/" `muted` (#7A7A7A), current page `ink`. Tokens added: `heading` #101010, `muted` #7A7A7A.
- Left block starts at y=100 from section top (breadcrumb ~43px → `mt 56.6`): h2 "Custom Jewelry" Playfair 36px in a 48px line box, colour `heading`; gap 20; description DM Sans 20px lh 160% ls 3%, **max-w 373px** (the layout box is 477 but the text wraps after "Bespoke"). Layout box = 132px tall.
- Images (assets renamed to `public/images/custom-jewelry/ring-solitaire.png` 373×476 and `ring-band.png` 252.44×330.24 incl. its baked 6.62px white border): container 517.8×645.6 starts 31.5px under the text box (y=263.5); small image at (265.38, 315.38) relative, z-above. Positioned in % so it scales down fluidly; `placeholder="blur"` (opaque photos, so no gray-box issue).
- **Right column** (same file): grid from `lg` `minmax(0,517.8fr) / minmax(0,678fr)`, gap 84.2 (= design at 1440: right column x 682→1360, 678 wide, top 100). Intro paragraph 16px lh 160% ls 3% `ink`, `max-w 560` (wraps after "…elegance—your"). Then `ol` at +40 (`mt 41.3` to match the design), items gap 30. Item = number `20px muted` in a 43.5px column + text block with `border-b line pb 29`: title DM Sans 500 24px ls 10% uppercase `heading`, description 20px lh 160% `muted`, gap 10 → item height 110.4.
- Design "Right Section Width 511.2" could not be mapped to anything measurable; 678 (layout width) is used.
- **Fluid:** the section is an `@container`; description font `clamp(15px, calc(1.75cqw - 2.4px), 20px)` so it stays on one line down to ~1280px. Section height is `min-h-[1102px]` from `lg` (not fixed) so wrapped text at 1024–1150px can grow it. Below `lg` the columns stack (interim).
- Verified against the Figma screenshot at 1440: text within ~1.3px, separator lines/section height exact (1102).

## 12. Custom Jewelry Section — mobile (< `md`, 375 design; same `CustomJewelry.tsx`)
- Padding: px 15, pt 18, pb 70 (image block bottom → section end; also used at `md`, `lg` uses the 1102px min-height instead). Breadcrumb 14px → **40px** → h2 Playfair 26px lh 160% ls 0 → 10px → description 14px lh 160% ls 3% (max-w 373) → 18px → steps → 20px → intro paragraph 14px lh 160% ls 0 → 30px → image block.
- **Order differs from desktop:** title, steps, intro, images. Below `lg` the two column wrappers are `display: contents` and the four blocks are ordered with `order-1..4`; from `lg` they become the two grid columns (left: title + images, right: intro + steps).
- Step (72px tall, gap 28): number 14px ls 1% muted, natural width + 10px gap (title x moves with the digit width, as in Figma); title 16px 500 lh 100% ls 6% `heading`; description 14px **lh 18px** (measured; not in the spec), `muted`, gap 8; text block `max-w 299.3` (that is what makes descriptions wrap like Figma), pb 9 + 1px `line` border. Content is nudged 2px down (`pt-0.5`) and the intro 2.6px to match the screenshot.
- Images: container 345×431.25 (aspect); big 251.73×321.25 at (0,0); small 161.43×213.94 (baked border included) at (183.57, 217.31); positioned in %. From `md` the desktop % values and typography apply, stacked, with the desktop fixed 43.5px number column.
- Verified at 375 against the Figma screenshot: text rows within ~0.5px (item 6 within ~2.5px), step border lines and section geometry match. 1440 unchanged.

## 13. Why Choose MyJewel Section — desktop (`components/WhyChoose.tsx`)
- Mounted after `CustomJewelry`; at 1440 it starts at y=1637 and is 478px tall (pt 77, title box 50, gap 40, cards 194, pb 117), px 80, bg `surface` (#FCFCFC, new token).
- Title Playfair 36px lh 50px ls 1% centered `heading`. Cards: `grid-cols-[repeat(3,minmax(0,400px))]` from `lg` — 400px wide (as Figma) and **fluid** (shrink) below 1440, gap 33.6 (measured; spec says 33), `min-h 194`, white, p 20, shadow `0 2px 14px rgba(0,0,0,.045)` (tuned to the screenshot).
- Card content: 45px icon (`PiUserCircleCheckLight`, `game-icons_diamond-hard`, `IoRibbonOutline`), title Playfair 600 20px ls 3% `navy` (line-height 1.2 so wrapped titles don't collide; margins compensate), description DM Sans 16px `muted`, **lh 1.3** (measured 20.7px; the spec's 100% doesn't match the screenshot). Titles/description offsets `mt 21.7 / 20.6` are fitted to the design.
- Description line breaks are forced (`<br>`) from 1300px up because the Figma breaks don't follow natural wrapping (card 1 breaks before "your"); below 1300 it wraps naturally with `text-balance`.
- Decoration: `public/images/why-choose/circles.svg` (was `Frame 1592.svg`), 629×254 at the section's bottom-right, behind the cards, `lg` and up only. Circle tops verified against the screenshot.
- Verified vs Figma at 1440: text/icons within ~0.7px, cards at x 80 / 513.6 / 947.2. Below `lg` cards stack (interim); mobile spec pending.

## 14. Why Choose MyJewel — mobile (< `lg`, 375 design; same `WhyChoose.tsx`)
- Section 786px tall at 375: pt 70, px 15, pb 120, bg `surface`. Title Playfair 26px lh 50 ls 0 → 20px → three cards stacked, gap 20.
- Card 345×162: p 20, 35px icon, title Playfair 600 16px lh 100% ls 3% `navy` (gap 15), description DM Sans 14px **lh 18px** (measured) `muted` (gap 15), `max-w 290` below `md` — this is what makes card 1 wrap "…create your / perfect piece." like Figma (the full card width would fit one more word). Title/description are nudged with `relative top-[2.3px]` / `top-[6px]` (visual only) to match the screenshot; the layout heights stay exact.
- Decoration on mobile: two SVGs instead of the single desktop one — `ellipse-left.svg` (372×130, left/bottom 0) and `ellipse-right.svg` (204×316, right/bottom 0), both `lg:hidden`; `circles.svg` is `hidden lg:block`. Placement derived from circle-arc positions in the screenshot (top edges match).
- From `md` the description is no longer width-limited; cards stay one column until `lg`. Verified at 375 vs the screenshot: text within ~0.5px.

## 15. Explore More Section — desktop (`components/ExploreMore.tsx`)
- After `WhyChoose`; at 1440 it starts at y=2115, is 418.9px tall (pt 70 + content + pb 101), white. Grid from `lg`: `minmax(0,1fr) / min(590px,41vw)`, gap 64. Right image `public/images/explore-more/jewelry-model.png` (was `Frame 1578.png`, 2360×1676 = 590×419 @4x) fills its cell (`fill` + `object-cover`), `placeholder="blur"`. The section is full-bleed: the image sits flush against the viewport's right edge at any width, and the left column's padding-left is `max(80px, 50vw − 640px)` so the text stays aligned with the 1440px grid on wide screens (the earlier `max-w 1440` container left a white strip right of the image at ≥1441px).
- Title Playfair 32px lh 100% ls 1% `heading`, nudged `top-[5.1px]` (visual) to match; 26.6px below: description DM Sans 14px **lh 1.3** (measured; spec says 100%), ls 1.45% (matches the screenshot line widths), `muted`, `max-w 420`; 30px below: 2×2 grid, column gap 70 (two 318px items at 1440), row gap 22.9 (measured; total height only works with this — the spec's "gap 30" doesn't).
- Item = `Link` with label + 50px circle icon (`public/icons/ExternalLinkCircle.svg`, was `Frame 1579.svg`), `justify-between`, min-h 50, label centred vertically. **Item label typography isn't in the spec**: measured 14px lh 1.3 ls 1% `ink` (#434343; the spec's #7A7A7A is the icon border). Each label sits in a **238×36 box** (`max-w 238`, `min-h 36`, lh 18px) with a **30px gap** to the 50px icon (238+30+50 = 318). The longest label ("How to Choose the Engagement Ring", 242.7px) is a few px wider than the box, so from 1340px up labels are `nowrap` and the first label has an explicit `<br>` before "Band" (Figma's break); below 1340px they wrap naturally inside the box.
- The first label ("How to Select the Ideal Wedding Band") is always underlined (`underline: true` in `GUIDES`, matches Figma); every label also underlines on hover/focus. "Lab Grown Diamond Guide" sits 6px below its row centre in Figma; reproduced with `top-1.5` on that label (remove `offset` in `GUIDES` if it was a design slip).
- Verified at 1440 vs the screenshot: text/icons within ~1px, image edges within ~1–2px. Below `lg` the image stacks under the text (interim); mobile spec pending.

## 16. Explore More — mobile (< `lg`, 375 design; same `ExploreMore.tsx`)
- Section 656px tall at 375: pt 70, px 15, **no bottom padding** (image flush to the section end). Title Playfair 26px lh 100% ls 0 (nudged `top-[4.7px]`), description DM Sans 14px lh 1.3 ls 1.45% `muted`, `max-w 330` (makes it wrap in 3 lines like Figma), title→description margin 19.4 (fitted), description→items 40.
- Items: one column, item 345×44, gap 10, label box 275×27 + 27px gap + 44px icon (`size-11`), label 12px lh 1.3 ls 1% `ink`; first label underlined. The "Lab Grown" 6px offset is desktop-only (`lg:`).
- **Order:** mobile order is Wedding Band → Engagement Ring → Lab Grown → Ring Size; the desktop 2×2 grid uses `grid-flow-col grid-rows-2` so column 1 = Wedding Band / Engagement Ring, column 2 = Lab Grown / Ring Size (same visual result as before).
- Image: mobile uses `public/images/explore-more/jewelry-model-mobile.png` (1500×840 = 375×210), 30px below the items, full width; desktop keeps `jewelry-model.png` (`fill`). Both are `<Image>`s toggled with `lg:hidden` / `hidden lg:block` (lazy, so only the visible one downloads).
- Verified at 375 vs the screenshot: text/icon rows within ~0.7px, description wraps and image top match. Desktop unchanged.

## 17. Testimonials — desktop (`components/Testimonials.tsx` server + `components/TestimonialCarousel.tsx` client)
- After `ExploreMore`; at 1440 it starts at y=2534, 644px tall (py 100, title box 50, 30px gap, cards 326, 30px gap, dots 8), white, px 80 in a `max-w 1440` box. Title Playfair 36px lh 50 ls 1% `heading`.
- **Data (project rule):** quote text comes from `https://dummyjson.com/quotes?limit=200` via `fetch(..., { next: { revalidate: 3600 } })` (ISR — the route shows `Revalidate 1h` in the build output). Quotes are filtered to 30–64 characters (fits two lines in a 300px card), de-duplicated, Title-Case ones are converted to sentence case, first 12 kept → 3 dots × 4 cards. If the API fails or returns too few quotes, the 4 Figma texts are used and the error is logged (`[testimonials] …`). Name/role/photo are local: 4 people (`public/images/testimonials/*.png`, renamed from the `testimonal` folder) cycled over the quotes, role "Product Quality Engineer". So the API texts differ from the Figma sample texts by design.
- **Card:** 300×326 (`min-h 326`), border 1px `line`, px 25, pt/pb 45.7 (spec 46.7 includes the border), photo 120×120, caption + quote spacings fitted to the screenshot (name mt 20.2, role mt 8.1, quote mt 19.4; spec says 16.8/5/16.8): name 14px 600 `ink`, role 12px `ink-soft` (#505050, new token), quote 14px lh 20 `ink`. Cards fill 1280px at 1440 with gap 26.67; per view: 4 from `xl`, 3 from `lg`, 2 from `md`, 1 (85% wide) below.
- **Carousel:** native scroll-snap track (works with touch swipe) + 45px arrow buttons (enabled = dark `ink` border + icon, disabled = light `stroke` #C4C4C4 border + `muted` icon, no opacity — this is exactly Figma's first-slide look: prev light, next dark) centred on the card row at left/right edges of the content box (57.5px / 1337.5px at 1440, matches Figma) and 8px dots (gap 10; inactive `line`, active `muted`). Page count/current page are derived from the real layout (ResizeObserver + scroll), arrows/dots use `scrollTo` (smooth unless `prefers-reduced-motion`). The chevron is an inline SVG (same path as `public/icons/HiOutlineChevronRight.svg`, which points left; rotated 180° for "next") so its colour can change on hover. Verified by simulated clicks: next/prev/dots update the page, ends disable the arrows.
- Verified at 1440 vs the screenshot: title/photo/name/role/quote rows within ~0.7px, dots and arrow positions match. 

## 18. Testimonials — mobile (< `md`, 375 design; same files)
- Section 549px tall at 375: py 70, px 15. Title Playfair 26px lh 100% ls 1% (nudged `top-[4.2px]`), 29px below it the card track (Figma says 20, the screenshot measures ~29 to the card top); dots 20px below the card (`mt-5`, desktop 30), 70px bottom padding.
- One 301×326 card visible, centered (track is `w-[301px]`, gap 15, snap scroll, swipeable), same card typography/spacing as desktop. **Only the first three cards are shown below `md`** (`max-md:nth-[n+4]:hidden`) so the pagination has 3 dots as in Figma; the carousel counts only visible cards (`visibleCards`).
- Arrows: 35px (`size-[35px]`, icon 20), left/right 18px outside the card edge (= x 19 / 321 at 375), centred 2.5px below the card centre (top 273 in Figma). Same enabled-dark / disabled-light rule as desktop.
- Verified at 375: card rows within ~0.5px, title/dots/arrow positions match, section height 549.

## 19. Gotchas found in review
- **Hydration mismatch on the carousel arrows:** the `disabled` attribute on the prev/next buttons could differ between server HTML and the first client render in browsers that restore form-control state on reload (Firefox), so they use `aria-disabled` (guarded click handlers, `aria-disabled:` styles). Not reproducible in Chrome; keep it that way.
- **`next/image` dev warning "either width or height modified":** the `width`/`height` attributes must round to the rendered desktop size (logo 133×35, banner diamonds 533×347, ring band 252×330) or React logs it once per image.

## 20. Implementation notes for the Lighthouse / Crawler rules (§6–§7 above are the user's rules and were not edited)
- `lib/site.ts` holds `SITE_URL` (`NEXT_PUBLIC_SITE_URL`, else `VERCEL_PROJECT_PRODUCTION_URL`, else `http://localhost:3000` — **set it before deploying**), title/description, the OG image and the `ROUTES` list used by the sitemap.
- `app/sitemap.ts` (url + lastModified + changeFrequency + priority per route), `app/robots.ts` (`*`, Googlebot, Bingbot → `Allow: /` + `Sitemap:`), `app/layout.tsx` (`metadataBase`, title template, description, `alternates.canonical`, Open Graph + Twitter `summary_large_image` with `/og-image.jpg`, robots, JSON-LD `Organization` + `WebSite` `@graph` in a `<script type="application/ld+json">`, fonts with explicit `display: "swap"`).
- `public/og-image.jpg` is a static 1200×630 composition of the banner assets (regenerate if the branding changes).
- Hero LCP image (`Banner` diamonds): `priority` + `loading="eager"`, explicit 533×347, `sizes`, descriptive `alt` + `title`, `placeholder="blur"` with a 1×1 transparent `blurDataURL` (the image is a transparent cut-out, a coloured blur shows as a grey box). Note Next 16 marks `priority` as deprecated in favour of `preload`; it still works and logs nothing on 16.3.5.
- Carousel fallback: 12 fallback quotes (not 4) + SSR-correct dots, because with only 4 items the carousel has a single page (no dots, disabled arrows) whenever the quotes API is unreachable.
- **Favicons:** the favicon.io set lives in `public/favicon_io/` and is wired through `metadata.icons` in `app/layout.tsx` (ico 48, png 32/16, apple-touch 180). The scaffold's default `app/favicon.ico` was deleted; `next.config.ts` redirects `/favicon.ico` → `/favicon_io/favicon.ico` for crawlers. `app/manifest.ts` replaces the generated `site.webmanifest` (its icon paths point at the site root and its name is empty), which is left unused in the folder.
