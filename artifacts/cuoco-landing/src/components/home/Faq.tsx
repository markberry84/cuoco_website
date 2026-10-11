import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/FadeIn";
import { FAQ } from "@/content/faq";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 bg-card-cream px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <FadeIn className="mb-12 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-brass">FAQ</p>
          <h2 className="text-4xl font-normal text-ink md:text-5xl">Questions answered</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQ.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`faq-${i}`}
                data-testid={`faq-item-${i}`}
                className="overflow-hidden rounded-xl border border-line-soft bg-cream"
              >
                <AccordionTrigger
                  data-testid={`faq-trigger-${i}`}
                  className="px-6 py-4 text-left font-serif text-base font-medium text-ink hover:no-underline"
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-sm leading-relaxed text-body">
                  <p>{item.a}</p>
                  {item.link && (
                    <p className="mt-3">
                      <Link href={item.link.href} className="text-brass underline underline-offset-4">
                        {item.link.label}
                      </Link>
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
