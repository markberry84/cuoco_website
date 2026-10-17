export const CAPABILITIES = [
  {
    title: "Recipes",
    text: "Search your recipes and read any of them in your own units. Save a new one from a link or from text in your chat. Edit a recipe or mark it as a favourite.",
  },
  {
    title: "Collections",
    text: "See your collections, create or rename one, and add or remove recipes. See what you've cooked recently and most often.",
  },
  {
    title: "Meal plan",
    text: "See what's planned, add a recipe or a note to a day, or take one off.",
  },
  {
    title: "Shopping list",
    text: "See your list, add items or a whole recipe's ingredients, tick things off, edit or remove an item, and clear what you've ticked.",
  },
];

export const LIMITS = [
  "It asks before each change.",
  "It can't delete recipes or collections.",
  "It can't clear your whole meal plan or shopping list in one go.",
  "It can't touch your account or subscription.",
];

export const UNDO_NOTE =
  "Edits your assistant makes to a recipe can't be undone, so check what it's about to change before you allow it.";

export const CLAUDE_STEPS = [
  'In Claude (claude.ai or the Claude desktop app), open Settings, then Connectors, then choose "Add custom connector".',
  "Name it Cuoco, paste the address above, choose Add, then Connect.",
  "A Cuoco page opens. Sign in with the same Apple or Google account you use in the app, then choose Allow.",
  'Start a chat and ask, for example, "What recipes do I have in Cuoco?"',
];

export const CLAUDE_PLANS = {
  text: "Custom connectors are available on every Claude plan. Free accounts can add one.",
  link: {
    label: "Claude's guide to custom connectors",
    href: "https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp",
  },
};

export const CHATGPT_NOTE =
  "Set this up at chatgpt.com in a web browser, not in the ChatGPT desktop app.";

// Step 1 is rendered with the icon download button beside it.
export const CHATGPT_STEPS = [
  "Download the Cuoco icon first. You can only add it while setting up.",
  'At chatgpt.com, click your profile picture, then Settings, then Plugins, then Browse Directory, then Add, then "Add Custom MCP Server".',
  'Fill in the form. Icon: click + and choose the icon you downloaded. Name: Cuoco. Description: "Search my recipes, plan meals and manage my shopping list". Connection: leave on Server URL and paste the address above. Authentication: OAuth.',
  'Tick "I understand and want to continue" and confirm.',
  "A Cuoco page opens. Sign in with the same Apple or Google account you use in the app, then choose Allow.",
  "Start a new chat and ask away.",
];

export const CHATGPT_PLANS = {
  text: "Tested on ChatGPT Plus. Other ChatGPT plans may handle custom connectors differently.",
};

export const EXAMPLES = [
  "What recipes do I have in Cuoco that use chicken?",
  "What's on my meal plan this week?",
  "Add my lasagne to Friday's dinner.",
  "Add the ingredients for Friday's dinner to my shopping list.",
  "What's still on my shopping list?",
  "Save this recipe to Cuoco: ",
  "Make a collection called Quick weeknights and add my chilli to it.",
  "What have I cooked most often?",
];

export const GOOD_TO_KNOW = [
  "Saving recipes and adding to your shopping list use your Cuoco AI allowance, and need AI features switched on in the app.",
  "Disconnect any time in the app: Settings, then Connected Apps.",
];
