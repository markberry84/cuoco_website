export type FaqItem = {
  q: string;
  a: string;
  link?: { label: string; href: string };
};

// Plain strings, so the same list feeds the page and the FAQ structured data.
export const FAQ: FaqItem[] = [
  {
    q: "What is Cuoco?",
    a: "Cuoco is a recipe app for iPhone. Save recipes from anywhere, plan your meals, build your shopping list, and cook with a voice assistant that answers your questions as you go.",
  },
  {
    q: "How does the voice assistant work?",
    a: "Press the Ask Cuoco button and speak. You can find recipes, add to your meal plan or shopping list, and in Cook Mode ask about the step you're on, set timers or get a substitute. Cuoco answers out loud.",
  },
  {
    q: "What is Hey Cuoco?",
    a: 'Hey Cuoco is an optional wake word. If you switch it on, then in Cook Mode on iOS 26 or later you can say "Hey Cuoco" and ask your question hands-free, without pressing the button. Everywhere else, and on earlier versions of iOS, you press Ask Cuoco.',
  },
  {
    q: "Can I use Cuoco with Claude or ChatGPT?",
    a: "Yes. Connect Cuoco to Claude or ChatGPT and you can ask it to search your recipes, plan meals, manage your shopping list and save new recipes. It asks before each change, and you can disconnect at any time in Settings.",
    link: { label: "How to connect", href: "/connect" },
  },
  {
    q: "What are the paid plans?",
    a: "Start with a free 7-day trial of every feature, no card required. After that, Pro is £2.99 a month and suits most people. Premium is £4.99 a month for heavy voice users. The only difference is the monthly AI allowance, which is 150% higher on Premium.",
  },
  {
    q: "How does usage work?",
    a: "Usage is based on Cuoco's AI features. Adding recipes, calculating nutrition and speaking to Cuoco all count towards your monthly allowance. Browsing and cooking recipes manually doesn't. You can track your usage in Settings.",
  },
  {
    q: "What are the AI features in Cuoco?",
    a: "Cuoco uses AI to import recipes from photos, links and text, including recipes spread over several photos; to categorise meals and detect allergens; to calculate nutrition; to sort your shopping list into categories and combine duplicate items; to transcribe your voice; and to answer your cooking questions while you cook.",
  },
  {
    q: "Is my data private?",
    a: "Your recipes and personal details are stored securely. To provide AI features, Cuoco sends the relevant content to its AI providers, OpenAI and ElevenLabs, and only if you have switched AI features on. Voice recordings are sent for transcription and then discarded; Cuoco doesn't store them.",
    link: { label: "Privacy Policy", href: "/privacy" },
  },
  {
    q: "Is Cuoco on Android?",
    a: "Not yet. Leave your email in the download section and we'll tell you when it is.",
  },
];
