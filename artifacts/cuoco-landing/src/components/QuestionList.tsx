import { Link } from "wouter";
import type { GuideQuestion } from "@/content/guides";

/** Questions and answers shown open, for the guide pages. */
export function QuestionList({ items }: { items: GuideQuestion[] }) {
  return (
    <dl className="flex flex-col gap-3">
      {items.map((item) => (
        <div key={item.q} className="rounded-xl border border-line-soft bg-cream px-6 py-5">
          <dt className="font-serif text-base font-medium text-ink">{item.q}</dt>
          <dd className="mt-2 text-sm leading-relaxed text-body">
            {item.a}
            {item.link && (
              <>
                {" "}
                <Link href={item.link.href} className="text-brass underline underline-offset-4">
                  {item.link.label}
                </Link>
              </>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
