import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Clip } from "@/components/Clip";
import { FadeIn } from "@/components/FadeIn";
import type { MediaSlot } from "@/content/media";
import { cn } from "@/lib/utils";

const STEPS: { num: string; title: string; slot: MediaSlot; text: string }[] = [
  {
    num: "01",
    title: "Save",
    slot: "save",
    text: "Import a recipe from a link, a photo, or text you paste in. Share one straight into Cuoco from TikTok, Safari or any app with a share button. Cuoco adds nutrition, cuisine, meal type and allergens for you.",
  },
  {
    num: "02",
    title: "Plan",
    slot: "plan",
    text: "Group recipes into collections and drop them onto your meal planner, a day, a week or a month at a time.",
  },
  {
    num: "03",
    title: "Shop",
    slot: "shop",
    text: "Add a recipe's ingredients to your shopping list in one tap. Cuoco sorts everything into categories and can combine items that are already on the list.",
  },
  {
    num: "04",
    title: "Cook",
    slot: "cook",
    text: "Cook Mode shows one step at a time, keeps your timers running and answers when you ask.",
  },
];

function StepText({ step }: { step: (typeof STEPS)[number] }) {
  return (
    <>
      <p className="mb-3 font-serif text-sm tracking-[0.2em] text-brass">{step.num}</p>
      <h3 className="mb-4 text-4xl font-normal text-ink md:text-5xl">{step.title}</h3>
      <p className="text-base leading-relaxed text-body md:text-lg">{step.text}</p>
    </>
  );
}

export function Journey() {
  const [current, setCurrent] = useState(0);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);

  // The current step is whichever text block is crossing the middle of the screen.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCurrent(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    blocks.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="scroll-mt-16 bg-card-cream px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="mb-12 text-center lg:mb-4">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-brass">Features</p>
          <h2 className="text-4xl font-normal text-ink md:text-5xl">From saved to served</h2>
        </FadeIn>

        {/* Computer widths: one pinned phone, text scrolls past it */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            {STEPS.map((step, i) => (
              <div
                key={step.slot}
                ref={(el) => {
                  blocks.current[i] = el;
                }}
                data-index={i}
                className={cn(
                  "flex min-h-[70vh] flex-col justify-center transition-opacity duration-500",
                  current === i ? "opacity-100" : "opacity-40",
                )}
              >
                <StepText step={step} />
              </div>
            ))}
          </div>
          <div>
            <div className="sticky top-[14vh] flex h-[72vh] items-center justify-center">
              <div className="flex flex-col items-center gap-4">
              <PhoneFrame className="w-[min(17rem,calc(60vh*0.461))]">
                <div className="relative w-full" style={{ aspectRatio: "720 / 1561" }}>
                  {STEPS.map((step, i) => (
                    <div
                      key={step.slot}
                      className={cn(
                        "absolute inset-0 transition-opacity duration-300",
                        current === i ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <Clip slot={step.slot} active={current === i} />
                    </div>
                  ))}
                </div>
              </PhoneFrame>
              {/* Names the step the phone is showing, so the pairing is never in doubt */}
              <p className="font-serif text-sm tracking-[0.2em] text-brass" aria-live="polite">
                {STEPS[current].num} · {STEPS[current].title.toUpperCase()}
              </p>
              </div>
            </div>
          </div>
        </div>

        {/* Phone and tablet widths: each step stacked with its own clip */}
        <div className="flex flex-col gap-8 lg:hidden">
          {STEPS.map((step) => (
            <FadeIn key={step.slot}>
              {/* Each step is its own card, so a phone can't be read as belonging to the next step */}
              <div className="mx-auto max-w-md rounded-3xl border border-line-soft bg-cream px-6 py-10 text-center">
                <StepText step={step} />
                <PhoneFrame className="mx-auto mt-8 w-56">
                  <Clip slot={step.slot} />
                </PhoneFrame>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
