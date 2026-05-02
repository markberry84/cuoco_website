# Cuoco Landing Page

Marketing landing page for **Cuoco** — an AI-powered cooking companion app with a built-in voice assistant. Live domain: [get-cuoco.app](https://get-cuoco.app).

---

## Project overview

This is a single-page React application that serves as the public-facing website for the Cuoco mobile app. It is built inside a pnpm monorepo and runs as an artifact at `artifacts/cuoco-landing`.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React, react-icons/si |
| Routing | Wouter |
| UI primitives | Radix UI (via shadcn/ui) |
| Package manager | pnpm (workspace monorepo) |

---

## Brand

### Colours

| Name | Value | Usage |
|---|---|---|
| Cream | `hsl(40 50% 96%)` | Page background |
| Parchment | `hsl(38 33% 91%)` | Section background (alternate) |
| Ink | `hsl(33 16% 11%)` | Headings, dark sections, footer |
| Brass | `hsl(33 39% 40%)` | Accent colour, CTAs, highlights |
| Muted | `hsl(33 12% 45%)` | Body text, captions |

### Typography

| Role | Font | Notes |
|---|---|---|
| Display / headings | Newsreader (serif) | Loaded via Google Fonts |
| Body / UI | Inter (sans-serif) | Loaded via Google Fonts |

### Logo assets (`attached_assets/`)

| File | Usage |
|---|---|
| `cuoco-mark-1024-transparent_(1)_1777737495347.png` | Navbar, hero — dark mark on light backgrounds |
| `cuoco-icon-light-transparent.png` | Footer, dark CTA section — light mark on dark backgrounds (background-removed version of the dark icon) |
| `cuoco-icon-1024_1777737495348.png` | Favicon |

The Vite alias `@assets` resolves to `../../attached_assets` so assets can be imported directly in components.

---

## Page sections

| Section | ID | Notes |
|---|---|---|
| Navigation | — | Sticky, transparent → solid on scroll; mobile hamburger menu |
| Hero | — | Logo mark, wordmark, tagline "Less scrolling. / More cooking.", two download buttons, phone mockup |
| Features | `#features` | 4 features in an alternating left/right layout with phone screenshot placeholders |
| How it works | `#how-it-works` | 3 numbered steps |
| Download | `#download` | Dedicated CTA strip with App Store + Google Play buttons |
| Ready to cook smarter | — | Dark full-bleed CTA section with light logo |
| FAQ | `#faq` | 5 questions using an accordion |
| Contact | `#contact` | Email link to hello@get-cuoco.app |
| Footer | — | Logo mark (light), copyright, email |

### Features

1. **Voice-Assisted Cooking** — Hands-free voice guidance through every recipe step
2. **AI-Powered Recipes** — Automatic nutritional info, cuisine type, and allergen data
3. **Import From Anywhere** — URL, photo, or typed text
4. **Collect and Plan** — Collections and meal planning across days, weeks, and months

### How it works steps

1. Import from a URL, snap a photo, paste in text or create something new. Enhance it with AI.
2. Add recipes to your meal planner across days, weeks and months.
3. Open any recipe and Cuoco is right there with you to guide and help make every dish.

---

## SEO

- Full `<title>`, `<meta name="description">`, and canonical URL in `index.html`
- Open Graph tags for social sharing
- Twitter Card tags
- JSON-LD structured data (`MobileApplication` schema)
- `public/robots.txt` and `public/sitemap.xml` present

---

## Running locally

```bash
# From the repo root
pnpm install

# Start the landing page dev server
pnpm --filter @workspace/cuoco-landing run dev
```

The dev server reads `PORT` and `BASE_PATH` from environment variables (set automatically by Replit).

---

## Build

```bash
pnpm --filter @workspace/cuoco-landing run build
```

Output is written to `artifacts/cuoco-landing/dist/public`.

---

## Key files

```
artifacts/cuoco-landing/
├── index.html                  # HTML shell, SEO meta, JSON-LD
├── vite.config.ts              # Vite config, @assets alias
├── package.json
├── public/
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.tsx                # React entry point
    ├── App.tsx                 # Router (wouter)
    ├── index.css               # Brand palette CSS custom properties + font imports
    └── pages/
        └── Landing.tsx         # All page sections, FEATURES, STEPS, FAQS arrays
```

---

## Pending / placeholders

| Item | Status |
|---|---|
| App Store link | Placeholder `#` — update when live |
| Google Play link | Placeholder `#` — update when live |
| Feature screenshots | Phone frame placeholders in Features section — replace `src` per feature when ready |
| Hero phone mockup | Placeholder frame — replace with real screenshot |

---

## Contact

hello@get-cuoco.app
