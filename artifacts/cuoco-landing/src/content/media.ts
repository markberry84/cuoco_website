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
    alt: "A TikTok recipe shared into Cuoco and imported as a recipe card",
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

export function mediaUrl(slot: MediaSlot, ext: "jpg" | "mp4" | "webm"): string {
  return `${import.meta.env.BASE_URL}media/${slot}.${ext}`;
}
