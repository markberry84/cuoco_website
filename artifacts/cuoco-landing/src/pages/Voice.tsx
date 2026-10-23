import { useState } from "react";
import { Link } from "wouter";
import { Check, Mic } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Section } from "@/components/Section";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Clip, type Caption } from "@/components/Clip";
import { AppStoreButton } from "@/components/AppStoreButton";
import { FadeIn } from "@/components/FadeIn";
import { CAPTIONS, MEDIA, type MediaSlot } from "@/content/media";
import { cn } from "@/lib/utils";


const ASK_QUOTES = [
  "Find me dinner recipes I can cook in under 30 minutes.",
  "Add this to Thursday's dinner.",
  "Add 500 grams of chicken and a block of butter to my list.",
  "Do I have milk on my list?",
];

const COOK_QUOTES = [
  "What's the next step?",
  "Set a timer for ten minutes.",
  "I'm out of paprika, what can I use?",
  "What's 180 Celsius in Fahrenheit?",
];

const HEY_CUOCO_FACTS = ["You switch it on", "Works in Cook Mode", "Needs iOS 26 or later"];

const PRIVACY_POINTS = [
  "Hey Cuoco listens for the wake word on your iPhone itself.",
  "When you ask a question, the recording is sent for transcription and then discarded.",
  "Voice features only work once you've switched AI features on.",
];

/** A clip in a phone with its captions beside it; captions follow the clip's clock. */
function CaptionedClip({ slot, captions }: { slot: MediaSlot; captions: Caption[] }) {
  const [time, setTime] = useState(0);
  // With no recording yet there is no clock, so every caption is shown.
  const visible = (c: Caption) => !MEDIA[slot].hasVideo || time >= c.at;
  return (
    <div className="flex flex-col items-center gap-6">
      <PhoneFrame className="w-56 md:w-60">
        <Clip slot={slot} sound onTime={setTime} />
      </PhoneFrame>
      <div className="flex min-h-[5.5rem] w-full max-w-xs flex-col gap-2" aria-live="off">
        {captions.map((c) => (
          <p
            key={c.text}
            className={cn(
              "rounded-xl px-4 py-2 text-sm leading-snug transition-all duration-500",
              c.kind === "question"
                ? "self-end bg-ink text-cream"
                : "self-start border border-line bg-card-cream font-serif italic text-ink",
              visible(c) ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
            )}
          >
            {c.text}
          </p>
        ))}
      </div>
    </div>
  );
}

function Quotes({ quotes }: { quotes: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {quotes.map((q) => (
        <li key={q} className="flex items-start gap-3">
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass/15">
            <Mic className="h-3 w-3 text-brass" />
          </span>
          <span className="font-serif text-lg italic leading-snug text-ink">"{q}"</span>
        </li>
      ))}
    </ul>
  );
}

export default function Voice() {
  return (
    <PageShell>
      <section className="bg-cream px-6 pb-20 pt-32 md:pt-40">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <div className="text-center md:text-left">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-brass">
              Voice cooking
            </p>
            <h1 className="mb-5 text-4xl font-normal leading-[1.1] text-ink md:text-5xl">
              Ask, and Cuoco answers
            </h1>
            <p className="mb-8 text-base leading-relaxed text-body md:text-lg">
              Flour on your hands, pan on the heat. Ask Cuoco what you need to know and hear the
              answer, without scrolling back through the recipe.
            </p>
            <AppStoreButton placement="voice" />
          </div>
          <CaptionedClip slot="hero-cook" captions={CAPTIONS["hero-cook"] ?? []} />
        </div>
      </section>

      <section className="bg-card-cream px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <FadeIn className="order-2 md:order-1">
            <CaptionedClip slot="voice-ask" captions={CAPTIONS["voice-ask"] ?? []} />
          </FadeIn>
          <FadeIn className="order-1 md:order-2">
            <h2 className="mb-4 text-3xl font-normal text-ink md:text-4xl">
              Ask Cuoco, anywhere in the app
            </h2>
            <p className="mb-6 text-base leading-relaxed text-body">
              Press the Ask Cuoco button and say what you want.
            </p>
            <Quotes quotes={ASK_QUOTES} />
          </FadeIn>
        </div>
      </section>

      <Section title="In Cook Mode" narrow>
        <p className="mb-6 text-center text-base leading-relaxed text-body">
          Cook Mode shows one step at a time. Ask about the step you're on and Cuoco answers out
          loud.
        </p>
        <Quotes quotes={COOK_QUOTES} />
        <p className="mt-8 text-center text-base leading-relaxed text-body">
          Prefer to listen? Tap the speaker and Cuoco reads the step to you.
        </p>
      </Section>

      <Section title="Hey Cuoco" tone="card" narrow>
        <p className="text-center text-lg leading-relaxed text-ink">
          Switch on Hey Cuoco and you can ask hands-free while you cook: say "Hey Cuoco" and then
          your question. Everywhere else you press Ask Cuoco.
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-body">
          {HEY_CUOCO_FACTS.map((f) => (
            <li key={f} className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-brass" />
              {f}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="What happens to what you say" narrow>
        <ul className="flex flex-col gap-3 text-base leading-relaxed text-ink">
          {PRIVACY_POINTS.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0 text-brass" />
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center">
          <Link href="/privacy" className="text-brass underline underline-offset-4">
            Privacy Policy
          </Link>
        </p>
      </Section>

      <section className="bg-ink px-6 py-20 text-center">
        <h2 className="mb-6 text-3xl font-normal text-cream md:text-4xl">Cook with your voice</h2>
        <AppStoreButton placement="voice" />
      </section>
    </PageShell>
  );
}
