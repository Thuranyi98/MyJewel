# MyJewel — Custom Jewelry Landing Page

A responsive, single-page landing page for **MyJewel**, a custom jewelry brand, rebuilt pixel-for-pixel from a Figma design (desktop 1440px and mobile 375px, with fluid behaviour in between). It is built with the Next.js App Router, TypeScript and Tailwind CSS.

**Live site:** <https://my-jewel-mauve.vercel.app/>

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
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for `metadataBase`, canonical URL, Open Graph, JSON-LD, `sitemap.xml` and `robots.txt` | `https://$VERCEL_PROJECT_PRODUCTION_URL` on Vercel, otherwise the live URL `https://my-jewel-mauve.vercel.app` (`LIVE_URL` in `lib/site.ts`) |

```bash
# .env.local
EMAIL_ADDRESS=owner@example.com
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com   # only needed for a custom domain
```

> The SEO URLs already point at the live site (`https://my-jewel-mauve.vercel.app`). Set `NEXT_PUBLIC_SITE_URL` only if you attach a custom domain.

### Deploying

Deployed on Vercel: <https://my-jewel-mauve.vercel.app/>. Any Node host works. Add `EMAIL_ADDRESS` in the project settings (and `NEXT_PUBLIC_SITE_URL` for a custom domain). The home page is prerendered and revalidated every hour (ISR, see 3.2).

> Linux builds are case-sensitive: keep asset file names identical to their imports (`amex.png`, not `Amex.png`).

---

## 2. Folder structure

```text
.
├── app/
│   ├── actions/
│   │   └── newsletter.ts        # Server Action: validates + simulates the notification
│   ├── globals.css              # Tailwind import + design tokens (@theme)
│   ├── layout.tsx               # Fonts, metadata (incl. icons), Open Graph/Twitter, JSON-LD, Header/Footer
│   ├── manifest.ts              # Web app manifest (points at /favicon_io/ icons)
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
│   ├── favicon_io/              # Favicon set (ico, 16/32 png, apple-touch, android-chrome)
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

`components/NewsletterForm.tsx` + `app/actions/newsletter.ts`

- Client-side email validation; invalid input never reaches the server.
- Server Action re-validates, then **simulates** a notification to `process.env.EMAIL_ADDRESS` (no email provider; logs a warning if the variable is unset).
- Server logs every outcome with the address masked (`[newsletter] notification dispatched to owner@example.com: new subscriber j***@example.com`).
- UI feedback via an `aria-live` message under the input (no layout shift).

Try it: set `EMAIL_ADDRESS`, submit an email in the footer, watch the terminal.

### 3.2 Testimonials (API + ISR)

`components/Testimonials.tsx` (server) + `components/TestimonialCarousel.tsx` (client)

- Quotes come from `https://dummyjson.com/quotes` via `fetch(url, { next: { revalidate: 3600 } })` → cached for 1 hour (the build output shows `Revalidate 1h`).
- Short quotes are filtered, 12 are used (3 pages × 4 cards); names and portraits are local.
- If the API fails, 12 built-in quotes are used and the error is logged.

---

## 4. Performance & Core Web Vitals strategy

Targets: LCP < 2.5 s, CLS = 0, Lighthouse 90–100 (targets — verify on a production build).

- **LCP:** hero image uses `priority` + `loading="eager"`, explicit size and `sizes`; mobile/desktop variants are separate assets via `<picture>`, so only one downloads.
- **CLS:** every `<Image>` has `width`/`height`; media sits in fixed-height or aspect-ratio boxes; blur placeholders on photos only.
- **Fonts:** `next/font/google` (self-hosted, `display: "swap"`); Open Sans (desktop-only label) is not preloaded.
- **CSS:** the small Tailwind stylesheet is inlined (`experimental.inlineCss`), so no render-blocking CSS request.
- **JavaScript:** Server Components by default; only the newsletter form and carousel are client-side; large below-the-fold photos are lazy, while small icons/badges are inlined SVG or eager so they never pop in on reload. `/icons` and `/images` are served with a 1-day `Cache-Control`.
- **Accessibility:** semantic landmarks, one `<h1>`, `alt` on every image, `aria-label` on icon buttons. Muted text uses `#757575` (4.6:1 on white; the Figma `#7A7A7A` is 4.3:1, below the AA 4.5:1 minimum).

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
| Favicons (`icons` metadata) + web app manifest; `/favicon.ico` redirects to `/favicon_io/favicon.ico` | `app/layout.tsx`, `app/manifest.ts`, `next.config.ts`, `public/favicon_io/` |

Adding a page later: create the route, then add an entry to `ROUTES` in `lib/site.ts` — it appears in `sitemap.xml` automatically.

Live SEO files: [robots.txt](https://my-jewel-mauve.vercel.app/robots.txt) · [sitemap.xml](https://my-jewel-mauve.vercel.app/sitemap.xml) · [manifest](https://my-jewel-mauve.vercel.app/manifest.webmanifest) · [og-image.jpg](https://my-jewel-mauve.vercel.app/og-image.jpg)

Verify on the live site (or on `http://localhost:3000` after `npm run build && npm run start`):

```bash
curl https://my-jewel-mauve.vercel.app/robots.txt
curl https://my-jewel-mauve.vercel.app/sitemap.xml
curl -s https://my-jewel-mauve.vercel.app | grep -E 'og:|twitter:|canonical|ld\+json'
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
