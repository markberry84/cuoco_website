export const SITE = {
  url: "https://get-cuoco.app",
  email: "hello@get-cuoco.app",
  appStoreId: "6766098644",
  appStoreBase: "https://apps.apple.com/app/apple-store/id6766098644",
  // App Store Connect provider number; empty until campaign links are set up
  campaignProvider: "",
  connectorUrl: "https://mcp.get-cuoco.app/mcp",
  instagram: "https://www.instagram.com/getcuoco.app/",
  tiktok: "https://www.tiktok.com/@getcuoco",
  prices: { pro: "£2.99", premium: "£4.99" },
  trial: "7-day free trial, no card required",
} as const;

export const NAV_LINKS = [
  { href: "/voice", label: "Voice" },
  { href: "/connect", label: "Connect" },
  { href: "/#features", label: "Features" },
  { href: "/support", label: "Support" },
] as const;
