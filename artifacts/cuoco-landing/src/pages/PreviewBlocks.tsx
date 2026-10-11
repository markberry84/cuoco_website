import { useState } from "react";
import { PageShell } from "@/components/PageShell";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ChatFrame } from "@/components/ChatFrame";
import { Clip } from "@/components/Clip";
import { CopyButton } from "@/components/CopyButton";
import { QrCode } from "@/components/QrCode";
import { AppStoreButton } from "@/components/AppStoreButton";
import { SITE } from "@/content/site";

// Temporary page for checking the shared blocks. Removed before launch.
export default function PreviewBlocks() {
  const [ended, setEnded] = useState(0);
  const [unavailable, setUnavailable] = useState(0);
  return (
    <PageShell>
      <section className="mx-auto flex max-w-5xl flex-col gap-12 px-6 pb-24 pt-32">
        <h1 className="text-3xl text-ink">Building blocks</h1>
        <div className="grid items-start gap-10 md:grid-cols-3">
          <PhoneFrame className="mx-auto w-56">
            <Clip slot="hero-cook" sound />
          </PhoneFrame>
          <ChatFrame>
            <Clip slot="hero-chat" />
          </ChatFrame>
          <div>
            <PhoneFrame className="mx-auto w-56">
              <Clip
                slot="save"
                loop={false}
                stillSeconds={3}
                onEnded={() => setEnded((n) => n + 1)}
                onUnavailable={() => setUnavailable((n) => n + 1)}
              />
            </PhoneFrame>
            <p className="mt-3 text-center text-sm text-body" data-testid="ended-count">
              Ended {ended} times · unavailable {unavailable}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <code className="select-all rounded-lg border border-line bg-card-cream px-3 py-2 text-sm text-ink">
            {SITE.connectorUrl}
          </code>
          <CopyButton text={SITE.connectorUrl} />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <AppStoreButton placement="hero" />
          <AppStoreButton placement="nav" compact />
          <QrCode />
        </div>
        <div className="h-[120vh]" />
      </section>
    </PageShell>
  );
}
