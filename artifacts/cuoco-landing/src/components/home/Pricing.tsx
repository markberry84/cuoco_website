import { FadeIn } from "@/components/FadeIn";
import { SITE } from "@/content/site";

const PLANS = [
  { name: "Free trial", price: "7 days", unit: "", note: "Every feature, no card required" },
  { name: "Pro", price: SITE.prices.pro, unit: "a month", note: "Right for most home cooks" },
  { name: "Premium", price: SITE.prices.premium, unit: "a month", note: "For heavy voice users" },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 bg-cream px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn className="mb-12 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-brass">Pricing</p>
          <h2 className="text-4xl font-normal text-ink md:text-5xl">Simple pricing</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="grid gap-5 md:grid-cols-3">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl border border-line-soft bg-card-cream p-7 text-center"
              >
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-brass">
                  {plan.name}
                </p>
                <p className="mb-3 font-serif text-4xl text-ink">
                  {plan.price}
                  {plan.unit && <span className="ml-1.5 font-sans text-sm text-body">{plan.unit}</span>}
                </p>
                <p className="text-sm leading-relaxed text-body">{plan.note}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-body">
            Pro and Premium have the same features. The only difference is the monthly AI allowance,
            which is 150% higher on Premium.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
