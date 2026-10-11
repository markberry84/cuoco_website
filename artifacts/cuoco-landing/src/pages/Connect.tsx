import { Link } from "wouter";
import { Check, Download, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageShell } from "@/components/PageShell";
import { PageIntro, Section } from "@/components/Section";
import { ChatFrame } from "@/components/ChatFrame";
import { Clip } from "@/components/Clip";
import { CopyButton } from "@/components/CopyButton";
import { AppStoreButton } from "@/components/AppStoreButton";
import { SITE } from "@/content/site";
import {
  CAPABILITIES,
  CHATGPT_NOTE,
  CHATGPT_PLANS,
  CHATGPT_STEPS,
  CLAUDE_PLANS,
  CLAUDE_STEPS,
  EXAMPLES,
  GOOD_TO_KNOW,
  LIMITS,
  UNDO_NOTE,
} from "@/content/connect";

const ICON_URL = `${import.meta.env.BASE_URL}cuoco-icon-256.png`;

function Steps({ steps, extra }: { steps: string[]; extra?: (index: number) => React.ReactNode }) {
  return (
    <ol className="flex flex-col gap-5">
      {steps.map((step, i) => (
        <li key={step} className="flex gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-card-cream font-serif text-sm text-brass">
            {i + 1}
          </span>
          <div className="pt-1 text-base leading-relaxed text-ink">
            <p>{step}</p>
            {extra?.(i)}
          </div>
        </li>
      ))}
    </ol>
  );
}

const tabTrigger =
  "flex-1 rounded-lg px-4 py-2 text-sm font-medium text-body data-[state=active]:bg-ink data-[state=active]:text-cream data-[state=active]:shadow-none";

export default function Connect() {
  return (
    <PageShell>
      <PageIntro
        label="Works with Claude and ChatGPT"
        title="Your recipes, inside Claude and ChatGPT"
        text="Connect Cuoco to the assistant you already use. Ask in your own words and it reads and updates your recipes, meal plan and shopping list."
        media={
          <ChatFrame>
            <Clip slot="hero-chat" />
          </ChatFrame>
        }
      />

      <Section title="What your assistant can do" tone="card">
        <div className="grid gap-5 sm:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="rounded-2xl border border-line-soft bg-cream p-7">
              <h3 className="mb-3 text-2xl font-normal text-ink">{c.title}</h3>
              <p className="text-base leading-relaxed text-body">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="You stay in control" narrow>
        <ul className="flex flex-col gap-3">
          {LIMITS.map((l) => (
            <li key={l} className="flex items-start gap-3 text-base leading-relaxed text-ink">
              <Check className="mt-1 h-4 w-4 shrink-0 text-brass" />
              {l}
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-start gap-3 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm leading-relaxed text-ink">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
          {UNDO_NOTE}
        </p>
      </Section>

      <Section title="Connect in a minute" tone="card" narrow>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-cream px-4 py-3">
          <code className="min-w-0 select-all break-all font-mono text-sm text-ink">
            {SITE.connectorUrl}
          </code>
          <CopyButton text={SITE.connectorUrl} label="Copy address" />
        </div>

        <Tabs defaultValue="claude">
          <TabsList className="mb-8 flex h-auto w-full gap-1 rounded-xl border border-line bg-cream p-1">
            <TabsTrigger value="claude" className={tabTrigger}>
              Claude
            </TabsTrigger>
            <TabsTrigger value="chatgpt" className={tabTrigger}>
              ChatGPT
            </TabsTrigger>
          </TabsList>

          {/* Both panels stay in the page so search engines can read both sets of steps */}
          <TabsContent value="claude" forceMount className="data-[state=inactive]:hidden">
            <Steps steps={CLAUDE_STEPS} />
            <p className="mt-8 text-sm leading-relaxed text-body">
              {CLAUDE_PLANS.text}{" "}
              <a
                href={CLAUDE_PLANS.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass underline underline-offset-4"
              >
                {CLAUDE_PLANS.link.label}
              </a>
            </p>
          </TabsContent>

          <TabsContent value="chatgpt" forceMount className="data-[state=inactive]:hidden">
            <p className="mb-6 flex items-start gap-3 rounded-xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm leading-relaxed text-ink">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
              {CHATGPT_NOTE}
            </p>
            <Steps
              steps={CHATGPT_STEPS}
              extra={(i) =>
                i === 0 ? (
                  <a
                    href={ICON_URL}
                    download="cuoco-icon.png"
                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-line bg-cream px-3 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:border-brass"
                  >
                    <img src={ICON_URL} alt="" width={20} height={20} className="h-5 w-5 rounded" />
                    Download the Cuoco icon
                    <Download className="h-3.5 w-3.5" />
                  </a>
                ) : null
              }
            />
            <p className="mt-8 text-sm leading-relaxed text-body">{CHATGPT_PLANS.text}</p>
          </TabsContent>
        </Tabs>
      </Section>

      <Section title="Things to ask">
        <ul className="grid gap-3 sm:grid-cols-2">
          {EXAMPLES.map((ex) => (
            <li
              key={ex}
              className="flex items-center justify-between gap-3 rounded-xl border border-line-soft bg-card-cream px-4 py-3"
            >
              <span className="select-all font-serif text-base italic text-ink">
                {ex.trim()}
                {ex.endsWith(" ") && <span className="not-italic text-body"> (then paste a link)</span>}
              </span>
              <CopyButton text={ex} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Good to know" tone="card" narrow>
        <ul className="flex flex-col gap-3 text-base leading-relaxed text-ink">
          {GOOD_TO_KNOW.map((g) => (
            <li key={g} className="flex items-start gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0 text-brass" />
              {g}
            </li>
          ))}
          <li className="flex items-start gap-3">
            <Check className="mt-1 h-4 w-4 shrink-0 text-brass" />
            <span>
              What your assistant can see and do is set out in our{" "}
              <Link href="/privacy" className="text-brass underline underline-offset-4">
                Privacy Policy
              </Link>
              .
            </span>
          </li>
        </ul>
      </Section>

      <section className="bg-ink px-6 py-20 text-center">
        <h2 className="mb-6 text-3xl font-normal text-cream md:text-4xl">Don't have Cuoco yet?</h2>
        <AppStoreButton placement="connect" />
      </section>
    </PageShell>
  );
}
