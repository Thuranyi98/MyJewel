# MyJewel — Custom Jewelry Landing Page

A responsive, single-page landing page for **MyJewel**, a custom jewelry brand, rebuilt pixel-for-pixel from a Figma design (desktop 1440px and mobile 375px, with fluid behaviour in between). It is built with the Next.js App Router, TypeScript and Tailwind CSS.

| Layer | Choice |
|---|---|
| Framework | Next.js **16.3.5** (App Router, Turbopack), React 19.2 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (tokens in `app/globals.css`, no `tailwind.config`) |
| Fonts | `next/font/google` — DM Sans, Open Sans, Playfair Display |
| Images | `next/image` (+ `getImageProps` for art direction) |
| Lint | ESLint 9 with `eslint-config-next` |

## Table of contents

1. [Getting started](#1-getting-started)
2. [Folder structure](#2-folder-structure)
3. [Assessment requirements](#3-assessment-requirements)
4. [Performance & Core Web Vitals strategy](#4-performance--core-web-vitals-strategy)
5. [SEO, sitemap & robots](#5-seo-sitemap--robots)
6. [Responsive approach](#6-responsive-approach)
7. [Project notes](#7-project-notes)

---

## 1. Getting started

### Prerequisites

- **Node.js ≥ 20.9** (required by Next.js 16)
- npm (a `package-lock.json` is committed)

### Install and run

```bash
npm install            # or: npm ci
npm run dev            # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks and prerenders the page) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Stand-alone type check |

There is no test framework configured.

### Environment variables

Both are optional; create `.env.local` (git-ignored) to set them.

| Variable | Used for | Default |
|---|---|---|
| `EMAIL_ADDRESS` | Recipient of the simulated newsletter notification (see [3.1](#31-newsletter-subscription)) | unset → a warning is logged and the dispatch is still simulated |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for `metadataBase`, canonical URL, Open Graph, JSON-LD, `sitemap.xml` and `robots.txt` | `https://$VERCEL_PROJECT_PRODUCTION_URL` on Vercel, otherwise `http://localhost:3000` |

```bash
# .env.local
EMAIL_ADDRESS=owner@example.com
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com
```

> **Set `NEXT_PUBLIC_SITE_URL` before deploying**, otherwise the sitemap, canonical and Open Graph URLs point at `localhost`.

### Deploying

Any Node host works; the project is Vercel-ready. Add the two environment variables above in the project settings. The home page is prerendered and revalidated every hour (ISR, see 3.2).

---

## 2. Folder structure

```text
.
├── app/
│   ├── actions/
│   │   └── newsletter.ts        # Server Action: validates + simulates the notification
│   ├── favicon.ico
│   ├── globals.css              # Tailwind import + design tokens (@theme)
│   ├── layout.tsx               # Fonts, metadata, Open Graph/Twitter, JSON-LD, Header/Footer
│   ├── page.tsx                 # Composes the page sections
│   ├── robots.ts                # robots.txt
│   └── sitemap.ts               # sitemap.xml
├── components/
│   ├── Header.tsx               # Announcement bar + main nav (desktop ≥ lg, mobile < lg)
│   ├── Banner.tsx               # Hero banner (LCP element)
│   ├── CustomJewelry.tsx        # Breadcrumb, intro, images and the 6-step process
│   ├── WhyChoose.tsx            # "Why Choose MyJewel?" cards
│   ├── ExploreMore.tsx          # Guide links + photo
│   ├── Testimonials.tsx         # Server component: fetches quotes (ISR)
│   ├── TestimonialCarousel.tsx  # Client component: swipeable carousel
│   ├── Footer.tsx               # Link columns, newsletter, payments, legal
│   └── NewsletterForm.tsx       # Client component: form + validation UI
├── lib/
│   └── site.ts                  # Site URL, title/description, OG image, sitemap routes
├── public/
│   ├── icons/                   # SVG icons and logo
│   ├── images/
│   │   ├── banner/              # Hero assets (desktop + mobile variants)
│   │   ├── custom-jewelry/
│   │   ├── explore-more/
│   │   ├── footer/              # Payment method badges
│   │   ├── testimonials/        # Portraits
│   │   └── why-choose/          # Decorative circles
│   └── og-image.jpg             # 1200×630 Open Graph image
├── AGENTS.md / CLAUDE.md        # Guidance for AI coding agents working in the repo
├── memory.md                    # Project rules + measured design specs per section
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
└── tsconfig.json                # `@/*` → project root
```

Page order (top to bottom): **Header → Banner → CustomJewelry → WhyChoose → ExploreMore → Testimonials → Footer**. Only the newsletter form and the testimonial carousel are Client Components; everything else renders on the server.

---

## 3. Assessment requirements

### 3.1 Newsletter subscription

Implemented in `components/NewsletterForm.tsx` and `app/actions/newsletter.ts`.

1. **Client-side validation** — `onSubmit` checks the address with a regex (`noValidate` form, custom message). An invalid address never reaches the server.
2. **Server Action** — `useActionState` posts the form to `subscribeToNewsletter`, which validates again (never trust the client).
3. **Simulated notification dispatch** to `process.env.EMAIL_ADDRESS` — no email provider is wired up; the action waits ~500 ms and logs the dispatch. If `EMAIL_ADDRESS` is not set it logs a warning and continues.
4. **Server-side logging** — every outcome is logged, with the subscriber's address masked (`j***@example.com`):

   ```text
   [newsletter] rejected subscription: invalid email
   [newsletter] notification dispatched to owner@example.com: new subscriber j***@example.com
   ```
5. **UI feedback** — the result (`"Thank you for subscribing!"` or the error) is rendered in an absolutely positioned `aria-live` line so the layout never shifts; the button is disabled while pending and the field resets on success.

To try it: run the app with `EMAIL_ADDRESS` set, submit an email in the footer, and watch the terminal.

### 3.2 Testimonials (public API + ISR caching)

Implemented in `components/Testimonials.tsx` (server) and `components/TestimonialCarousel.tsx` (client).

- **Source:** `https://dummyjson.com/quotes?limit=200`.
- **Caching:** `fetch(url, { next: { revalidate: 3600 } })` — Incremental Static Regeneration. The build output lists the route with `Revalidate 1h`; the response is cached for an hour and refreshed in the background.
- **Processing:** quotes of 30–64 characters (so they fit two lines in a card) are kept, de-duplicated, sentence-cased if the API returned Title Case, and the first 12 are used → 3 carousel pages of 4 cards.
- **Presentation:** the API only supplies the quote text; names, role and portraits are local (`public/images/testimonials/`, cycled over the quotes).
- **Fallback:** if the API is unreachable or returns too few quotes, a built-in list of 12 quotes is used and the error is logged (`[testimonials] quotes API unavailable, using fallback: …`), so the carousel always works.
- **Carousel:** native scroll-snap (touch swipe works), prev/next buttons, pagination dots, keyboard-focusable controls, `prefers-reduced-motion` respected. Below `md` only the first three cards are shown (three dots, as in the design).

---

## 4. Performance & Core Web Vitals strategy

Targets: LCP < 2.5 s, CLS = 0, Lighthouse Performance/Accessibility/Best Practices/SEO 90–100. These are targets, not recorded results — measure them on a production build (`npm run build && npm run start`, then Lighthouse in an incognito window).

**LCP**
- The hero image in `Banner.tsx` uses `priority` + `loading="eager"`, explicit `width`/`height`, and a matching `sizes` attribute, so the browser can preload the right candidate.
- Art direction with `<picture>` + `getImageProps`: mobile and desktop backgrounds/ring/tweezers are separate assets and the browser downloads only the variant that matches the viewport.
- Fonts are self-hosted through `next/font/google` with `display: "swap"`; no external font requests at runtime.

**CLS = 0**
- Every `<Image>` has explicit `width`/`height`; decorative and photo blocks sit in fixed-height or aspect-ratio boxes (banner height, `aspect-[…]` image blocks, `min-h` cards).
- Images are positioned absolutely inside those boxes, so loading never moves text.
- `placeholder="blur"` is used on opaque photos (Custom Jewelry, Explore More). Transparent cut-outs use a 1×1 transparent `blurDataURL` because a coloured blur shows as a grey box behind them. No large Base64 strings are inlined.
- The newsletter message and the carousel state changes don't affect layout.

**JavaScript / INP / TBT**
- Server Components by default; only two Client Components (newsletter form, testimonial carousel).
- No animation or layout libraries. Fluid scaling uses CSS container query units (`cqw`) and `clamp()` instead of JS resize handlers.
- Below-the-fold images are lazy-loaded (the `next/image` default); only above-the-fold ones are eager.

**Accessibility**
- Landmarks (`header`, `nav`, `main`, `section`, `footer`), a single `<h1>` (banner), descriptive `alt` text (empty `alt` + `aria-hidden` for decorative images), `aria-label` on icon-only buttons, `aria-live` for form feedback, browser-default focus outlines kept on interactive elements.
- Known deviation: the design's muted grey `#7A7A7A` on white is 4.3:1, slightly under the 4.5:1 AA target. It is a Figma colour and was kept.

---

## 5. SEO, sitemap & robots

| Concern | Where |
|---|---|
| Site constants (URL, title, description, OG image, sitemap routes) | `lib/site.ts` |
| Metadata: `metadataBase`, title template, description, `alternates.canonical`, robots, Open Graph, Twitter Card (`summary_large_image`) | `app/layout.tsx` |
| Structured data: JSON-LD `@graph` with `Organization` + `WebSite` (`schema.org`) | `app/layout.tsx` (`<script type="application/ld+json">`) |
| `sitemap.xml` — `url`, `lastModified`, `changeFrequency`, `priority` per route | `app/sitemap.ts` |
| `robots.txt` — `*`, `Googlebot`, `Bingbot` → `Allow: /`, plus the sitemap link | `app/robots.ts` |
| Open Graph image, static 1200×630 | `public/og-image.jpg` |

Adding a page later: create the route, then add an entry to `ROUTES` in `lib/site.ts` — it appears in `sitemap.xml` automatically.

Verify after `npm run build && npm run start`:

```bash
curl http://localhost:3000/robots.txt
curl http://localhost:3000/sitemap.xml
curl -s http://localhost:3000 | grep -E 'og:|twitter:|canonical|ld\+json'
```

---

## 6. Responsive approach

- **Design widths:** 1440px (desktop) and 375px (mobile), matched against the Figma screenshots.
- **Breakpoints (Tailwind):** `md` 768px, `lg` 1024px, `xl` 1280px. The header switches to its desktop layout at `lg`; the banner uses its desktop composition from `md`.
- **Between the two designs** the layouts scale instead of jumping: the banner uses container query units capped at the designed pixel sizes, the footer and Custom Jewelry columns use proportional grids, and the cards/carousels reduce the number of columns.
- **Wide screens:** content sits in a centred `max-w-[1440px]` grid (header included); backgrounds and the Explore More photo stay full-bleed.

---

## 7. Project notes

- `memory.md` records the project rules and, per section, the measured specs and the decisions where the Figma numbers had to be adjusted. Read it before changing a component.
- `AGENTS.md` / `CLAUDE.md` contain instructions for AI coding agents (Next.js 16 differs from older versions — check `node_modules/next/dist/docs/` before using an API).
- Placeholder links (`href="#"`), the payment badges and the testimonial people/roles are sample content from the design.
