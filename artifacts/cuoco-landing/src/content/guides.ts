import { SITE } from "@/content/site";

export type GuideQuestion = { q: string; a: string; link?: { label: string; href: string } };

// Plain strings, so the same lists feed the pages and their FAQ structured data.

export const ASSISTANT_NEEDS = [
  "Cuoco on your iPhone, with a free 7-day trial or a subscription.",
  "Claude on any plan, or ChatGPT (tested on ChatGPT Plus).",
];

export const ASSISTANT_QUESTIONS: GuideQuestion[] = [
  {
    q: "Is Cuoco in the ChatGPT or Claude app directory?",
    a: "Not yet. You add it yourself as a custom connector, which takes about a minute.",
    link: { label: "How to connect", href: "/connect" },
  },
  {
    q: "Does it cost extra?",
    a: "No. Saving recipes and adding to your shopping list through an assistant use your normal Cuoco AI allowance.",
  },
  {
    q: "What is MCP?",
    a: "MCP (Model Context Protocol) is the open standard that lets AI assistants use other apps. Cuoco has its own MCP connector, which is what Claude and ChatGPT talk to.",
  },
  {
    q: "Can I disconnect?",
    a: "Yes, at any time. In the Cuoco app, go to Settings, then Connected Apps, and choose Disconnect.",
  },
];

export const SAVE_STEPS = [
  "On the recipe's page, tap Share. It works in Safari, Chrome or any app with a share button.",
  "Choose Cuoco.",
];

export const SAVE_PASTE_STEPS = [
  "Copy the link to the recipe or video.",
  "In Cuoco, open Add Recipe and choose From URL.",
  "Paste the link and import.",
];

export const SAVE_RESULTS = [
  "A clean list of ingredients and numbered steps, without the adverts and life story.",
  "Calories, protein, carbs and fat worked out for you.",
  "Cuisine, meal type, dietary tags and allergens added automatically.",
  "A link back to where the recipe came from.",
];

export const SAVE_QUESTIONS: GuideQuestion[] = [
  {
    q: "Which websites does it work with?",
    a: "Most pages with a recipe on them. Cuoco reads the page itself, so it doesn't depend on a list of supported sites. If a site won't let Cuoco read it, for example behind a paywall, paste the recipe text or use a screenshot instead.",
  },
  {
    q: "What if the recipe isn't written in the caption?",
    a: "For TikTok and Instagram, Cuoco reads the written caption. If the recipe is only spoken or shown on screen, or a post can't be read, take screenshots and import them as photos instead. Cuoco can read a recipe spread over several images.",
  },
  {
    q: "Can I save recipes that aren't online?",
    a: "Yes. Photograph a cookbook recipe, up to five pages in one go, or a handwritten card, or paste in text, and Cuoco turns it into a recipe in the same way.",
  },
  {
    q: "Is it free?",
    a: `Cuoco has a free 7-day trial of every feature, no card required. After that it's ${SITE.prices.pro} a month.`,
  },
  {
    q: "Does it work on Android?",
    a: "Not yet. Cuoco is on iPhone, and there is an Android waitlist on the home page.",
  },
];
