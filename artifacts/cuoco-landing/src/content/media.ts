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

const PHONE = "720 / 1561";

export const MEDIA: Record<MediaSlot, MediaEntry> = {
  "hero-chat": {
    hasVideo: true,
    hasStill: true,
    hasSound: false,
    aspect: "1000 / 904",
    alt: "A chat with ChatGPT adding chicken tikka masala to Friday's Cuoco meal plan and its ingredients to the shopping list",
  },
  "hero-cook": {
    hasVideo: false,
    hasStill: true,
    hasSound: true,
    aspect: PHONE,
    alt: "Cuoco in Cook Mode answering a spoken question about the current step",
  },
  save: {
    hasVideo: false,
    hasStill: true,
    hasSound: false,
    aspect: PHONE,
    alt: "A recipe being imported into Cuoco",
  },
  plan: {
    hasVideo: false,
    hasStill: true,
    hasSound: false,
    aspect: PHONE,
    alt: "Adding a recipe to the Cuoco meal planner",
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

export function mediaUrl(slot: MediaSlot, ext: "jpg" | "mp4" | "webm"): string {
  return `${import.meta.env.BASE_URL}media/${slot}.${ext}`;
}
