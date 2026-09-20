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
