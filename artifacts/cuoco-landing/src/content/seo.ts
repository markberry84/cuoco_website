import { SITE } from "@/content/site";
import { FAQ } from "@/content/faq";
import { CHATGPT_STEPS, CLAUDE_STEPS } from "@/content/connect";

export type PagePath = "/" | "/connect" | "/voice" | "/support" | "/privacy" | "/terms";

export const PAGES: Record<PagePath, { title: string; description: string }> = {
  "/": {
    title: "Cuoco: Voice-Guided Cooking and Recipe App for iPhone",
    description:
      "Save recipes from anywhere, plan meals, build your shopping list and cook by voice. Works with Claude and ChatGPT. Free 7-day trial on the App Store.",
  },
  "/connect": {
    title: "Connect Cuoco to Claude and ChatGPT",
    description:
      "Use your Cuoco recipes, meal plan and shopping list inside Claude or ChatGPT. Step-by-step setup for both.",
  },
  "/voice": {
    title: "Voice Cooking with Ask Cuoco and Hey Cuoco",
    description:
      "Ask Cuoco for the next step, a timer or a substitute and hear the answer while you cook. Hey Cuoco wake word in Cook Mode on iOS 26 or later.",
  },
  "/support": {
    title: "Cuoco Support",
    description: "Help with subscriptions, usage, voice, and connecting Claude or ChatGPT.",
  },
  "/privacy": {
    title: "Privacy Policy — Cuoco",
    description: "How Cuoco handles your data.",
  },
  "/terms": {
    title: "Terms of Service — Cuoco",
    description: "The terms for using Cuoco.",
  },
};

export const PAGE_PATHS = Object.keys(PAGES) as PagePath[];
export const NOT_FOUND_TITLE = "Page not found — Cuoco";

export function normalisePath(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export function titleFor(path: string): string {
  return PAGES[normalisePath(path) as PagePath]?.title ?? NOT_FOUND_TITLE;
}

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cuoco",
  url: SITE.url,
  logo: `${SITE.url}/favicon.png`,
  contactPoint: { "@type": "ContactPoint", email: SITE.email, contactType: "customer support" },
  founder: { "@type": "Person", name: "Mark Berry" },
};

const mobileApplication = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Cuoco",
  description:
    "A recipe app for iPhone with a voice assistant for cooking, recipe import, a meal planner and a shopping list. Works with Claude and ChatGPT.",
  url: SITE.url,
  installUrl: SITE.appStoreBase,
  applicationCategory: "FoodApplication",
  applicationSubCategory: "Cooking",
  operatingSystem: "iOS",
  featureList: [
    "Voice assistant for cooking",
    "Hey Cuoco wake word in Cook Mode (iOS 26 or later, optional)",
    "Works with Claude and ChatGPT",
    "Import recipes from links, photos, text and TikTok",
    "Shopping list sorted by category",
    "Meal planner",
    "Recipe collections",
    "Nutrition and allergen information",
    "Cook Mode with timers",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "GBP",
    description: "Free 7-day trial, then from £2.99/month",
  },
  author: { "@type": "Person", name: "Mark Berry" },
  publisher: { "@type": "Organization", name: "Cuoco", url: SITE.url },
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

function howTo(assistant: string, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Connect Cuoco to ${assistant}`,
    description: `Add Cuoco to ${assistant} as a custom connector using the address ${SITE.connectorUrl}.`,
    step: steps.map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
  };
}

export function structuredData(path: PagePath): object[] {
  if (path === "/") return [organization, mobileApplication, faqPage];
  if (path === "/connect")
    return [organization, howTo("Claude", CLAUDE_STEPS), howTo("ChatGPT", CHATGPT_STEPS)];
  return [organization];
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The page-specific part of <head>, written into each ready-made page at build time. */
export function headHtml(path: PagePath | null): string {
  if (path === null) {
    return [`<title>${esc(NOT_FOUND_TITLE)}</title>`, `<meta name="robots" content="noindex" />`].join(
      "\n    ",
    );
  }
  const { title, description } = PAGES[path];
  const url = `${SITE.url}${path}`;
  const image = `${SITE.url}/opengraph.jpg`;
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Cuoco" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...structuredData(path).map(
      (data) =>
        `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`,
    ),
  ];
  return tags.join("\n    ");
}
