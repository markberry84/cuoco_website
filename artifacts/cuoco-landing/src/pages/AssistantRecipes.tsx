import { Link } from "wouter";
import { Check, Info } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageIntro, Section } from "@/components/Section";
import { ChatFrame } from "@/components/ChatFrame";
import { Clip } from "@/components/Clip";
import { AppStoreButton } from "@/components/AppStoreButton";
import { QuestionList } from "@/components/QuestionList";
import { CAPABILITIES, EXAMPLES, LIMITS, UNDO_NOTE } from "@/content/connect";
import { ASSISTANT_NEEDS, ASSISTANT_QUESTIONS } from "@/content/guides";

const linkButton =
  "inline-flex items-center rounded-xl border border-ink bg-ink px-5 py-3 text-sm font-medium text-cream transition-colors duration-150 hover:border-brass";

export default function AssistantRecipes() {
  return (
    <PageShell>
      <PageIntro
        label="For ChatGPT and Claude"
        title="A recipe app your AI assistant can use"
        text="ChatGPT and Claude are good at suggesting what to cook. They can't see the recipes you've already saved, what you've planned for the week, or what's on your shopping list. Cuoco gives them that. Connect it once and your assistant works with your own recipes, meal plan and list."
        media={
          <ChatFrame>
            <Clip slot="hero-chat" />
          </ChatFrame>
        }
      />

      <Section title="What you can ask" tone="card">
        <ul className="grid gap-3 sm:grid-cols-2">
          {EXAMPLES.map((ex) => (
            <li
              key={ex}
              className="rounded-xl border border-line-soft bg-cream px-4 py-3 font-serif text-base italic text-ink"
            >
              {ex.trim()}
              {ex.endsWith(" ") && <span className="not-italic text-body"> (then paste a link)</span>}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="What your assistant can do">
        <div className="grid gap-5 sm:grid-cols-2">
          {CAPABILITIES.map((c) => (
            <div key={c.title} className="rounded-2xl border border-line-soft bg-card-cream p-7">
              <h3 className="mb-3 text-2xl font-normal text-ink">{c.title}</h3>
              <p className="text-base leading-relaxed text-body">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="You stay in control" tone="card" narrow>
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

      <Section title="How it works" narrow>
        <p className="text-center text-base leading-relaxed text-body">
          Cuoco has its own MCP connector. MCP (Model Context Protocol) is the open standard that
          lets AI assistants use other apps. You add Cuoco's address to Claude or ChatGPT as a
          custom connector, sign in with the account you use in the app, and choose Allow. It takes
          about a minute.
        </p>
        <p className="mt-8 text-center">
          <Link href="/connect" className={linkButton}>
            How to connect
          </Link>
        </p>
        <h3 className="mb-4 mt-12 text-center text-2xl font-normal text-ink">What you need</h3>
        <ul className="flex flex-col gap-3 text-base leading-relaxed text-ink">
          {ASSISTANT_NEEDS.map((n) => (
            <li key={n} className="flex items-start gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0 text-brass" />
              {n}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Questions" tone="card" narrow>
        <QuestionList items={ASSISTANT_QUESTIONS} />
      </Section>

      <section className="bg-ink px-6 py-20 text-center">
        <h2 className="mb-6 text-3xl font-normal text-cream md:text-4xl">Start with the app</h2>
        <AppStoreButton placement="assistants" />
      </section>
    </PageShell>
  );
}
