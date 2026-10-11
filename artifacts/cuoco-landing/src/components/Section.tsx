import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/FadeIn";

/** A page section with the site's small label + serif heading. */
export function Section({
  label,
  title,
  tone = "cream",
  narrow = false,
  children,
}: {
  label?: string;
  title: string;
  tone?: "cream" | "card";
  narrow?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("px-6 py-20", tone === "card" ? "bg-card-cream" : "bg-cream")}>
      <div className={cn("mx-auto", narrow ? "max-w-2xl" : "max-w-5xl")}>
        <FadeIn className="mb-10 text-center">
          {label && (
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-brass">{label}</p>
          )}
          <h2 className="text-3xl font-normal text-ink md:text-4xl">{title}</h2>
        </FadeIn>
        <FadeIn delay={0.1}>{children}</FadeIn>
      </div>
    </section>
  );
}

/** The opening block of an inner page: label, h1, paragraph, with media beside it. */
export function PageIntro({
  label,
  title,
  text,
  media,
}: {
  label: string;
  title: string;
  text: string;
  media: React.ReactNode;
}) {
  return (
    <section className="bg-cream px-6 pb-20 pt-32 md:pt-40">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <div className="text-center md:text-left">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-brass">{label}</p>
          <h1 className="mb-5 text-4xl font-normal leading-[1.1] text-ink md:text-5xl">{title}</h1>
          <p className="text-base leading-relaxed text-body md:text-lg">{text}</p>
        </div>
        <div>{media}</div>
      </div>
    </section>
  );
}
