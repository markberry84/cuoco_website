import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/home/Hero";
import { LeadPanels } from "@/components/home/LeadPanels";
import { Journey } from "@/components/home/Journey";
import { Pricing } from "@/components/home/Pricing";
import { Download } from "@/components/home/Download";
import { Faq } from "@/components/home/Faq";

export default function Landing() {
  return (
    <PageShell>
      <Hero />
      <LeadPanels />
      <Journey />
      <Pricing />
      <Download />
      <Faq />
    </PageShell>
  );
}
