import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChatFrame } from "@/components/ChatFrame";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Clip } from "@/components/Clip";
import { AppStoreButton } from "@/components/AppStoreButton";
import { QrCode } from "@/components/QrCode";
import { usePageVisible } from "@/hooks/usePageVisible";
import { cn } from "@/lib/utils";

type Side = "chat" | "cook";

// If a clip never reports finishing, hand over anyway so the hero cannot stall.
const HANDOVER_SAFETY_MS = 20_000;
// Until a slot has a recording, its still counts as a clip of this length.
const STILL_SECONDS = 6;

export function Hero() {
  const [side, setSide] = useState<Side>("chat");
  // True when clips cannot play by themselves (reduced motion, autoplay refused, load error).
  const [stopped, setStopped] = useState(false);
  const pageVisible = usePageVisible();

  useEffect(() => {
    if (stopped || !pageVisible) return;
    const timer = window.setTimeout(
      () => setSide((s) => (s === "chat" ? "cook" : "chat")),
      HANDOVER_SAFETY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [side, stopped, pageVisible]);

  const isOn = (s: Side) => stopped || side === s;

  const frameClass = (s: Side) =>
    cn(
      "flex flex-col items-center gap-3 transition-all duration-700 ease-out",
      !stopped && "absolute inset-0 justify-center md:static",
      isOn(s)
        ? "opacity-100 scale-100"
        : "pointer-events-none opacity-0 md:pointer-events-auto md:scale-[0.97] md:opacity-30",
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className={cn(
              "mx-auto max-w-4xl md:grid md:h-auto md:grid-cols-[1.3fr_1fr] md:items-center md:gap-10",
              stopped ? "flex flex-col items-center gap-10" : "relative h-[440px]",
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
                />
              </ChatFrame>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brass">
                In your assistant
              </p>
            </div>

            <div className={frameClass("cook")} data-side="cook" data-on={isOn("cook")}>
              <PhoneFrame className="w-[11.5rem] md:w-60">
                <Clip
                  slot="hero-cook"
                  active={!stopped && side === "cook"}
                  loop={false}
                  stillSeconds={STILL_SECONDS}
                  onEnded={() => setSide("chat")}
                  onUnavailable={() => setStopped(true)}
                />
              </PhoneFrame>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brass">
                In your kitchen
              </p>
            </div>
          </div>

          {!stopped && (
            <div className="mt-4 flex justify-center gap-2 md:hidden" aria-hidden="true">
              {(["chat", "cook"] as const).map((s) => (
                <span
                  key={s}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    side === s ? "w-5 bg-brass" : "w-1.5 bg-line",
                  )}
                />
              ))}
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <AppStoreButton placement="hero" />
            <QrCode />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
