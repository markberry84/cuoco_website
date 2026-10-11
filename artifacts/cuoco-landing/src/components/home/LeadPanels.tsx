import { Link } from "wouter";
import { ArrowRight, MessagesSquare, Mic } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

const PANELS = [
  {
    icon: Mic,
    title: "Cook by voice",
    text: "Press Ask Cuoco and ask for what you need: the next step, a substitute, a timer. In Cook Mode on iOS 26 or later you can switch on Hey Cuoco and just say it.",
    link: { href: "/voice", label: "How voice cooking works" },
  },
  {
    icon: MessagesSquare,
    title: "Works with Claude and ChatGPT",
    text: "Connect Cuoco to the assistant you already use. Ask it to plan your week, build your shopping list or save a recipe, and it's in the app.",
    link: { href: "/connect", label: "How to connect" },
  },
];

export function LeadPanels() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {PANELS.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-line-soft bg-card-cream p-8">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brass text-card-cream">
                <p.icon className="h-5 w-5" />
              </div>
              <h2 className="mb-3 text-2xl font-normal text-ink md:text-3xl">{p.title}</h2>
              <p className="mb-6 flex-1 text-base leading-relaxed text-body">{p.text}</p>
              <Link
                href={p.link.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brass transition-colors duration-150 hover:text-ink"
              >
                {p.link.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
