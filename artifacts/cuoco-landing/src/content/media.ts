export type MediaSlot =
  | "hero-chat"
  | "hero-cook"
  | "save"
  | "plan"
  | "shop"
  | "cook"
  | "voice-ask";

type MediaEntry = {
  hasVideo: boolean;
  hasStill: boolean;
  hasSound: boolean;
  // width / height of the recording, so the frame keeps its shape before anything loads
  aspect: string;
  alt: string;
  placeholder?: string;
};

const PHONE = "720 / 1560";

export const MEDIA: Record<MediaSlot, MediaEntry> = {
  "hero-chat": {
    hasVideo: true,
    hasStill: true,
    hasSound: false,
    aspect: "1000 / 1020",
    alt: "A chat with ChatGPT adding chicken tikka masala to Friday's Cuoco meal plan and its ingredients to the shopping list",
  },
  "hero-cook": {
    hasVideo: true,
    hasStill: true,
    hasSound: true,
    aspect: PHONE,
    alt: "Cuoco in Cook Mode answering \"Hey Cuoco, what are the first seven ingredients here?\"",
  },
  save: {
    hasVideo: true,
    hasStill: true,
    hasSound: false,
    aspect: PHONE,
    alt: "A BBC Food recipe shared from Chrome into Cuoco and imported as a recipe card",
  },
  plan: {
    hasVideo: true,
    hasStill: true,
    hasSound: false,
    aspect: PHONE,
    alt: "Adding recipes and a note to days in the Cuoco meal planner",
  },
  shop: {
    hasVideo: false,
    hasStill: true,
    hasSound: false,
    aspect: PHONE,
    alt: "The Cuoco shopping list sorted into categories",
  },
  cook: {
    hasVideo: false,
    hasStill: true,
    hasSound: false,
    aspect: PHONE,
    alt: "Stepping through a recipe in Cuoco's Cook Mode",
  },
  "voice-ask": {
    hasVideo: false,
    hasStill: true,
    hasSound: true,
    aspect: PHONE,
    alt: "Asking Cuoco to find a recipe by voice",
  },
};

export type Caption = {
  /** Seconds into the clip when the line appears. */
  at: number;
  text: string;
  /** Shorter wording for small spaces such as the home page hero. */
  short?: string;
  kind: "question" | "answer";
};

/** What is said in clips that have speech, timed to the edited clip. */
export const CAPTIONS: Partial<Record<MediaSlot, Caption[]>> = {
  "hero-cook": [
    { at: 1.5, kind: "question", text: "Hey Cuoco, what are the first seven ingredients here?" },
    {
      at: 5.2,
      kind: "answer",
      text: "The first seven ingredients are 0.5 onion, 60 g tomato purée, 1 tsp cumin seeds, 2.5 cm ginger root, 3 tbsp lemon juice, 2 cloves garlic, and 2 tsp chilli powder.",
      short: "Onion, tomato purée, cumin seeds, ginger, lemon juice, garlic and chilli powder.",
    },
  ],
};

export function mediaUrl(slot: MediaSlot, ext: "jpg" | "mp4" | "webm"): string {
  return `${import.meta.env.BASE_URL}media/${slot}.${ext}`;
}
