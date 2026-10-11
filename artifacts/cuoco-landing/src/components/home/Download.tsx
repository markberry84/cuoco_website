import { SiGoogleplay } from "react-icons/si";
import markLightPath from "@assets/cuoco-icon-light-transparent.png";
import { FadeIn } from "@/components/FadeIn";
import { WaitlistForm } from "@/components/WaitlistForm";
import { AppStoreButton } from "@/components/AppStoreButton";
import { QrCode } from "@/components/QrCode";

function GooglePlaySoon() {
  return (
    <div className="relative inline-flex" data-testid="download-cta-google">
      <div className="inline-flex cursor-default select-none items-center gap-3 rounded-xl border border-[hsl(33_14%_20%)] bg-ink px-5 py-3 text-cream opacity-55">
        <SiGoogleplay className="text-2xl text-brass-light" />
        <span className="flex flex-col text-left leading-tight">
          <span className="text-xs opacity-70">Get it on</span>
          <span className="text-sm font-medium tracking-wide">Google Play</span>
        </span>
      </div>
      <span className="absolute -right-2.5 -top-2.5 rounded-full bg-brass px-2 py-0.5 text-[10px] font-medium leading-none tracking-wide text-card-cream shadow">
        Soon
      </span>
    </div>
  );
}

export function Download() {
  return (
    <section id="download" className="relative scroll-mt-16 overflow-hidden bg-ink px-6 py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, hsla(33, 39%, 40%, 0.25) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <FadeIn>
          <img
            src={markLightPath}
            alt=""
            width={64}
            height={64}
            className="mx-auto mb-6 h-16 w-16 opacity-90"
          />
          <h2 className="mb-4 text-4xl font-normal text-cream md:text-5xl">Ready to cook smarter?</h2>
          <p className="mb-8 text-lg leading-relaxed text-[hsl(36_18%_65%)]">
            Available now for iPhone on the App Store. Android is on the way: leave your email and
            we'll tell you when it's ready.
          </p>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
            <AppStoreButton placement="download" />
            <GooglePlaySoon />
            <QrCode dark />
          </div>
          <WaitlistForm />
        </FadeIn>
      </div>
    </section>
  );
}
