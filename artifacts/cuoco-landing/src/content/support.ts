export type SupportItem = {
  q: string;
  a: string;
  link?: { label: string; href: string };
};

export const SUPPORT: SupportItem[] = [
  {
    q: "How do I manage or cancel my subscription?",
    a: "In the app, go to Settings and choose Manage Subscription. You can also do it on your iPhone: open the Settings app, tap your name, then Subscriptions. Subscriptions are billed by Apple, so cancelling or changing plan happens there.",
  },
  {
    q: "I've paid but the app doesn't show my plan.",
    a: "Go to Settings in the app and choose Restore Purchases.",
  },
  {
    q: "What counts towards my monthly allowance?",
    a: "Using AI features: importing recipes, calculating nutrition, sorting your shopping list and talking to Cuoco. Browsing and cooking your recipes doesn't use any. You can see your usage in Settings.",
  },
  {
    q: "Why won't recipe import or voice work?",
    a: "They need AI features switched on. You can turn them on in Settings.",
  },
  {
    q: "Hey Cuoco isn't responding.",
    a: "Hey Cuoco needs iOS 26 or later, works in Cook Mode, and has to be switched on in Settings. You'll also be asked to allow speech recognition the first time.",
  },
  {
    q: "My assistant can't connect to Cuoco.",
    a: "Sign in with the same Apple or Google account you use in the app. For ChatGPT, set the connection up at chatgpt.com in a web browser.",
    link: { label: "Full connection steps", href: "/connect" },
  },
  {
    q: "I changed something through Claude or ChatGPT and can't see it in the app.",
    a: "Pull down on the screen to refresh.",
  },
  {
    q: "How do I disconnect Claude or ChatGPT?",
    a: "In the app, go to Settings, then Connected Apps, and choose Disconnect.",
  },
  {
    q: "How do I delete my account?",
    a: "In the app, go to Settings and choose Delete Account. This permanently deletes your account along with your recipes, collections, meal plan and shopping list. Usage and billing records are kept for 7 years, as UK law requires. Deleting your account doesn't cancel a subscription, so cancel it in the App Store first.",
  },
];
