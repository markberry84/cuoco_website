# get-cuoco.app

The marketing website for **Cuoco**, the iPhone recipe app. Hosted on Hostinger; GitHub builds it from this repo (see Publishing). Until November 2026 it was hosted on Replit. The app itself is a separate repo (`markberry84/chef_app`).

The site was rebuilt in October 2026: a video-led home page leading with voice cooking and the Claude/ChatGPT connector, plus dedicated Connect, Voice and Support pages. Design and plan: `chef_app/docs/superpowers/specs/2026-10-10-website-rebuild-design.md` and `chef_app/docs/superpowers/plans/2026-10-11-website-rebuild.md`.

---

## Pages

| Address | File | What it is |
|---|---|---|
| `/` | `src/pages/Landing.tsx` | Home: taking-turns hero (ChatGPT chat ↔ Cook Mode), two lead panels, the Save / Plan / Shop / Cook journey, pricing, download + Android waitlist, FAQ |
| `/connect` | `src/pages/Connect.tsx` | Connect Cuoco to Claude and ChatGPT: what it can and can't do, setup steps for both, things to ask |
| `/voice` | `src/pages/Voice.tsx` | Ask Cuoco and Hey Cuoco, with captioned clips |
| `/support` | `src/pages/Support.tsx` | Help answers and contact email (no reply time is stated anywhere) |
| `/privacy`, `/terms` | `src/pages/Privacy.tsx`, `Terms.tsx` | Legal text, generated from the app repo — see below |

## Where things live

```
artifacts/cuoco-landing/
  index.html              page template; per-page <head> is written in at build time
  scripts/
    prerender.mjs         writes a ready-made HTML file for every page (runs in `build`)
    legal_from_md.py      converts the app repo's privacy policy and terms into src/content/legal/*.json
  public/
    media/<slot>.mp4|webm|jpg   the seven screen recordings and their stills
    cuoco-icon-256.png    connector icon ChatGPT users download (must stay under 10 KB)
    qr-app-store.svg      QR code for the App Store (campaign "qr")
    llms.txt  sitemap.xml  robots.txt
  src/
    content/              all copy and facts — edit these, not the components
      site.ts             prices, App Store id + campaign provider, connector address, email, socials
      faq.ts              home page FAQ (also feeds the FAQ structured data)
      connect.ts          connector capabilities, limits, setup steps, example requests
      support.ts          support questions
      media.ts            the seven clip slots, their sizes, and timed captions
      seo.ts              per-page titles, descriptions and structured data
      legal/              generated — do not edit by hand
    components/           shared blocks (header, footer, phone/chat frames, Clip player, App Store button, QR code, copy button)
    components/home/      home page sections
```

## Rules for the copy

- **Facts are written once**, in `src/content/`. Prices, the connector address and the App Store id come from `site.ts`.
- **"Hands-free"** appears only where Hey Cuoco is described, next to its conditions (switched on, Cook Mode, iOS 26 or later). Elsewhere voice is press-to-talk. One exception, agreed by Mark on 16 Nov 2026: the home page title, which matches the App Store name ("Cuoco: Hands-Free AI Cooking").
- **iPhone only.** Android is a waitlist.
- **The connector section** must only claim what the app's MCP tools do. The source of truth is `chef_app_reference.md` → MCP Connector → *How users connect*; update `src/content/connect.ts` whenever that changes.
- **Guide pages** (`/recipe-app-for-chatgpt-and-claude`, `/save-online-recipes`) each answer one question people search for. Their lists and questions live in `src/content/guides.ts`; the assistant page reuses `connect.ts`, so the connector rule above covers it too. The save page says "Instagram is on the way" until v1.5.0 is live, and its top clip is a web recipe until a TikTok recording exists. A new page needs: a route in `App.tsx`, an entry in `seo.ts`, a sitemap entry, `PAGE_SOURCES` in `scripts/prerender.mjs`, and a line in `llms.txt`.
- **Plan name is "Pro"**, never "Core". UK spelling. No exclamation marks.

## Privacy Policy and Terms

The wording lives in the app repo (`chef_app/cuoco_privacy_policy.md`, `cuoco_terms_of_service.md`). Never edit it here. After either file changes:

```bash
cd artifacts/cuoco-landing
python3 scripts/legal_from_md.py /Users/markberry/Desktop/Claude/chef_app
```

The script refuses to write anything if the converted text differs from the source by a single word.

## Videos

Clips are short, silent loops (except `hero-cook`, which has Cuoco's spoken answer) in seven named slots: `hero-chat`, `hero-cook`, `save`, `plan`, `shop`, `cook`, `voice-ask`. Each slot has `<slot>.mp4`, `<slot>.webm` and a `<slot>.jpg` still in `public/media/`, and an entry in `src/content/media.ts` (`hasVideo`, `hasSound`, aspect ratio, alt text). Captions for clips with speech are in `CAPTIONS` in the same file, timed in seconds into the edited clip.

The `Clip` component shows the still first, plays only while on screen, pauses when the tab is hidden, and falls back to the still with a play button if autoplay is refused, the file fails, or the visitor has "reduce motion" on.

Raw recordings are kept outside the repo (`Desktop/Claude/cuoco_recordings`). When editing iPhone recordings: remove the red screen-recording dot from the Dynamic Island, blur any contacts in share sheets, cut waiting time, export 720 px wide, and keep each file under about 2 MB.

## App Store links

Every App Store button and the QR code carry an App Store Connect campaign link (provider `128796440`, set in `site.ts`), with its own campaign name: `hero`, `nav`, `download`, `connect`, `voice`, `qr`, `assistants`, `save`. Downloads per placement show in App Store Connect → Analytics.

## Ready-made pages (search engines and AI assistants)

`pnpm run build` builds the site, renders every page to HTML (`scripts/prerender.mjs`) and writes `dist/public/<page>.html` with the page's own title, description, canonical address, social tags and structured data. Visitors and crawlers that never run JavaScript still get the full text. In the browser, `src/main.tsx` brings the ready-made page to life only if it matches the address; otherwise it renders from scratch.

`public/.htaccess` (Hostinger's page rules) serves `/<page>` from `<page>.html` for any page that has one, sends `/<page>/` to `/<page>`, `www` and plain `http` to `https://get-cuoco.app`, and unknown addresses to `404.html` with a real 404. A new page needs no change there. Do not write `<page>/` folders.

FAQ and Support answers are kept in the page while closed (`forceMount`) so they can be indexed.

## Running it on the Mac

Node is installed on the Mac; pnpm runs through `npx`.

- The lockfile covers the Mac (darwin-arm64) and GitHub Actions (linux-x64); `pnpm-workspace.yaml` excludes other platforms. New packages must be at least a day old (`minimumReleaseAge`).

```bash
npx -y pnpm@10 install --filter "@workspace/cuoco-landing..."
cd artifacts/cuoco-landing
PORT=18441 BASE_PATH=/ ./node_modules/.bin/vite --config vite.config.ts --host 127.0.0.1
```

Typecheck and production build, from the repo root:

```bash
PORT=1 BASE_PATH=/ npx -y pnpm@10 --filter @workspace/cuoco-landing run typecheck
PORT=1 BASE_PATH=/ npx -y pnpm@10 --filter @workspace/cuoco-landing run build
```

## Publishing

Push to `main`, and the site goes live by itself in a few minutes:

1. **GitHub Actions** (`.github/workflows/build-for-hostinger.yml`) installs, typechecks and builds the site, then saves the finished files to the **`hostinger`** branch. Never edit that branch by hand — every build replaces it. Progress: the repo's **Actions** tab.
2. **Hostinger** deploys the `hostinger` branch into `public_html` (hPanel → Advanced → Git, auto-deploy on push).

The production build reads `artifacts/cuoco-landing/.env.production`: `VITE_API_BASE_URL` points the Android waitlist form at the Cuoco backend (`POST /api/waitlist` in `markberry84/chef_app`). Sign-ups are stored in Supabase (`waitlist_signups`; Table Editor → Export CSV) and each one emails hello@get-cuoco.app through Resend.
