import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageShell } from "@/components/PageShell";
import { SITE } from "@/content/site";
import { SUPPORT } from "@/content/support";

export default function Support() {
  return (
    <PageShell>
      <section className="bg-cream px-6 pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-brass">Help</p>
            <h1 className="mb-5 text-4xl font-normal text-ink md:text-5xl">Support</h1>
            <p className="text-base leading-relaxed text-body md:text-lg">
              Answers to common questions. If yours isn't here, email us at{" "}
              <a
                href={`mailto:${SITE.email}`}
                data-testid="link-contact-email"
                className="text-brass underline underline-offset-4"
              >
                {SITE.email}
              </a>
              .
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {SUPPORT.map((item, i) => (
              <AccordionItem
                key={item.q}
                value={`support-${i}`}
                className="overflow-hidden rounded-xl border border-line-soft bg-card-cream"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-serif text-base font-medium text-ink hover:no-underline">
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

          <nav className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm" aria-label="Related">
            <Link href="/connect" className="text-brass underline underline-offset-4">
              Connect to Claude and ChatGPT
            </Link>
            <Link href="/privacy" className="text-brass underline underline-offset-4">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-brass underline underline-offset-4">
              Terms of Service
            </Link>
          </nav>
        </div>
      </section>
    </PageShell>
  );
}
