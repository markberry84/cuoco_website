import { useEffect, useState } from "react";
import { ChatFrame } from "@/components/ChatFrame";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Clip } from "@/components/Clip";
import { AppStoreButton } from "@/components/AppStoreButton";
import { QrCode } from "@/components/QrCode";
import { usePageVisible } from "@/hooks/usePageVisible";
import { CAPTIONS, type Caption } from "@/content/media";
import { cn } from "@/lib/utils";

type Side = "chat" | "cook";

// If a clip never reports finishing, hand over anyway so the hero cannot stall.
const HANDOVER_SAFETY_MS = 20_000;
// Until a slot has a recording, its still counts as a clip of this length.
const STILL_SECONDS = 6;

/** Speech bubbles over the bottom of the phone, so the silent hero clip still reads. */
function SpeechBubbles({ captions, time, showAll }: { captions: Caption[]; time: number; showAll: boolean }) {
  return (
    <div
      className="pointer-events-none absolute -inset-x-6 bottom-10 flex flex-col gap-2"
      aria-hidden="true"
    >
      {captions.map((c) => {
        const on = showAll || time >= c.at;
        return (
          <p
            key={c.text}
            className={cn(
              "max-w-[85%] rounded-2xl px-3.5 py-2 text-left text-xs leading-snug shadow-lg transition-all duration-500",
              c.kind === "question"
                ? "self-end rounded-br-sm bg-ink text-cream"
                : "self-start rounded-bl-sm border border-line bg-card-cream font-serif text-[13px] italic text-ink",
              on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            {c.short ?? c.text}
          </p>
        );
      })}
    </div>
  );
}

export function Hero() {
  const [side, setSide] = useState<Side>("chat");
  // True when clips cannot play by themselves (reduced motion, autoplay refused, load error).
  const [stopped, setStopped] = useState(false);
  const pageVisible = usePageVisible();
  const [cookTime, setCookTime] = useState(0);
  const cookCaptions = CAPTIONS["hero-cook"] ?? [];

  // Bubbles start hidden each time the kitchen clip takes its turn.
  useEffect(() => {
    if (side === "cook") setCookTime(0);
  }, [side]);

  useEffect(() => {
    if (stopped || !pageVisible) return;
    const timer = window.setTimeout(
      () => setSide((s) => (s === "chat" ? "cook" : "chat")),
      HANDOVER_SAFETY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [side, stopped, pageVisible]);

  // On computers both frames are visible (the inactive one dimmed); when clips can't
  // autoplay both are shown at full strength. On phones one frame shows at a time,
  // in a box of fixed height, even when clips can't autoplay.
  const isOn = (s: Side) => stopped || side === s;

  const frameClass = (s: Side) =>
    cn(
      "absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-700 ease-out md:static",
      side === s ? "opacity-100" : "pointer-events-none opacity-0",
      isOn(s)
        ? "md:pointer-events-auto md:scale-100 md:opacity-100"
        : "md:pointer-events-auto md:scale-[0.97] md:opacity-30",
    );

  const lineClass = (s: Side) =>
    cn("transition-colors duration-700", isOn(s) ? "text-ink" : "text-ink/25");
  const accentClass = (s: Side) =>
    cn("italic transition-colors duration-700", isOn(s) ? "text-brass" : "text-brass/30");

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pt-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 35%, hsla(33, 39%, 40%, 0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* CSS entrance, so the hero is visible even before (or without) JavaScript */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          <p className="mb-5 font-serif text-sm font-medium tracking-[0.3em] text-brass">CUOCO</p>

          <p className="mb-5 font-serif text-[2.5rem] font-normal leading-[1.1] sm:text-5xl md:text-6xl">
            <span className={lineClass("chat")}>
              Plan it with <span className={accentClass("chat")}>your assistant.</span>
            </span>
            <br />
            <span className={lineClass("cook")}>
              Cook it <span className={accentClass("cook")}>by voice.</span>
            </span>
          </p>

          <h1 className="mx-auto mb-10 max-w-2xl font-sans text-base font-normal leading-relaxed text-body md:text-lg">
            Cuoco is the recipe app that works inside Claude and ChatGPT, and talks you through
            dinner while you cook.
          </h1>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-8 delay-200 duration-1000 fill-mode-both">
          <div
            className={cn(
              "relative mx-auto h-[440px] max-w-4xl md:grid md:h-auto md:grid-cols-[1.3fr_1fr] md:items-center md:gap-10",
            )}
          >
            <div className={frameClass("chat")} data-side="chat" data-on={isOn("chat")}>
              <ChatFrame className="w-full max-w-[20rem] md:max-w-none">
                <Clip
                  slot="hero-chat"
                  active={!stopped && side === "chat"}
                  loop={false}
                  stillSeconds={STILL_SECONDS}
                  onEnded={() => setSide("cook")}
                  onUnavailable={() => setStopped(true)}
                  manualPlay={stopped}
                />
              </ChatFrame>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brass">
                In your assistant
              </p>
            </div>

            <div className={frameClass("cook")} data-side="cook" data-on={isOn("cook")}>
              <div className="relative">
                <PhoneFrame className="w-[11.5rem] md:w-60">
                  <Clip
                    slot="hero-cook"
                    active={!stopped && side === "cook"}
                    loop={false}
                    stillSeconds={STILL_SECONDS}
                    onEnded={() => setSide("chat")}
                    onUnavailable={() => setStopped(true)}
                    onTime={setCookTime}
                    manualPlay={stopped}
                  />
                </PhoneFrame>
                {(stopped || side === "cook") && (
                  <SpeechBubbles captions={cookCaptions} time={cookTime} showAll={stopped} />
                )}
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brass">
                In your kitchen
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-1 md:hidden">
            {(["chat", "cook"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSide(s)}
                aria-label={s === "chat" ? "Show the assistant clip" : "Show the kitchen clip"}
                aria-pressed={side === s}
                className="flex h-6 items-center px-1"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-500",
                    side === s ? "w-5 bg-brass" : "w-1.5 bg-line",
                  )}
                />
              </button>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <AppStoreButton placement="hero" />
            <QrCode />
          </div>
        </div>
      </div>
    </section>
  );
}
