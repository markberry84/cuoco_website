import { Link } from "wouter";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="mx-auto max-w-xl px-6 pb-24 pt-40 text-center">
        <h1 className="mb-4 text-4xl font-normal text-ink md:text-5xl">Page not found</h1>
        <p className="mb-8 text-base text-body">
          That page doesn't exist, or it has moved.
        </p>
        <Link href="/" className="text-brass underline underline-offset-4">
          Back to the home page
        </Link>
      </section>
    </PageShell>
  );
}
