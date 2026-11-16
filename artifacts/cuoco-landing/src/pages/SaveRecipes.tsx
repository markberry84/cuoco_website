import { Check } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageIntro, Section } from "@/components/Section";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Clip } from "@/components/Clip";
import { AppStoreButton } from "@/components/AppStoreButton";
import { FadeIn } from "@/components/FadeIn";
import { QuestionList } from "@/components/QuestionList";
import { SAVE_PASTE_STEPS, SAVE_QUESTIONS, SAVE_RESULTS, SAVE_STEPS } from "@/content/guides";

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-5">
      {steps.map((step, i) => (
        <li key={step} className="flex gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-cream font-serif text-sm text-brass">
            {i + 1}
          </span>
          <p className="pt-1 text-base leading-relaxed text-ink">{step}</p>
        </li>
      ))}
    </ol>
  );
}

export default function SaveRecipes() {
  return (
    <PageShell>
      <PageIntro
        label="Save recipes"
        title="How to save a recipe from any website"
        text="Recipes get lost in open tabs, bookmarks and screenshots. Share a recipe into Cuoco and it becomes a proper recipe, with ingredients, steps and nutrition, that you can plan, shop for and cook from."
        media={
          <PhoneFrame className="mx-auto w-56 md:w-60">
            <Clip slot="save" />
          </PhoneFrame>
        }
      />

      <Section title="Save it in two taps" tone="card" narrow>
        <StepList steps={SAVE_STEPS} />
        <p className="mt-8 text-base leading-relaxed text-body">
          Cuoco reads the page and saves the recipe.
        </p>
        <h3 className="mb-5 mt-12 text-2xl font-normal text-ink">Or paste the link</h3>
        <StepList steps={SAVE_PASTE_STEPS} />
        <p className="mt-8 text-base leading-relaxed text-body">
          Handy when you're already in Cuoco, or when an app has no share button.
        </p>
      </Section>

      <Section title="From TikTok, the same way" narrow>
        <p className="text-center text-base leading-relaxed text-body">
          Found a recipe in a TikTok? Tap Share on the video and choose Cuoco. Cuoco reads the
          video's caption and saves the recipe, with the creator credited in its notes. Instagram
          is on the way.
        </p>
      </Section>

      <Section title="What you get" tone="card" narrow>
        <ul className="flex flex-col gap-3 text-base leading-relaxed text-ink">
          {SAVE_RESULTS.map((r) => (
            <li key={r} className="flex items-start gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0 text-brass" />
              {r}
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-cream px-6 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          <FadeIn>
            <PhoneFrame className="mx-auto w-56 md:w-60">
              <Clip slot="cook" />
            </PhoneFrame>
          </FadeIn>
          <FadeIn className="text-center md:text-left">
            <h2 className="mb-4 text-3xl font-normal text-ink md:text-4xl">Then cook it</h2>
            <p className="text-base leading-relaxed text-body">
              Add the recipe to your meal plan, send its ingredients to your shopping list in one
              tap, and open Cook Mode to go through it one step at a time. Press Ask Cuoco for the
              next step, a timer or a substitute.
            </p>
          </FadeIn>
        </div>
      </section>

      <Section title="Questions" tone="card" narrow>
        <QuestionList items={SAVE_QUESTIONS} />
      </Section>

      <section className="bg-ink px-6 py-20 text-center">
        <h2 className="mb-6 text-3xl font-normal text-cream md:text-4xl">
          Save your first recipe
        </h2>
        <AppStoreButton placement="save" />
      </section>
    </PageShell>
  );
}
