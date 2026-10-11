import { SiAppstore } from "react-icons/si";
import { SITE } from "@/content/site";

export type Placement = "hero" | "nav" | "download" | "connect" | "voice" | "qr";

export function appStoreUrl(placement: Placement): string {
  if (!SITE.campaignProvider) return SITE.appStoreBase;
  return `${SITE.appStoreBase}?pt=${SITE.campaignProvider}&ct=${placement}&mt=8`;
}

export function AppStoreButton({
  placement,
  compact = false,
}: {
  placement: Placement;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <a
        href={appStoreUrl(placement)}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`cta-appstore-${placement}`}
        aria-label="Download Cuoco on the App Store"
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-ink bg-ink px-3 py-1.5 text-xs font-medium tracking-wide text-cream transition-colors duration-150 hover:border-brass"
      >
        <SiAppstore className="text-sm text-brass-light" />
        App Store
      </a>
    );
  }

  return (
    <a
      href={appStoreUrl(placement)}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`cta-appstore-${placement}`}
      className="inline-flex select-none items-center gap-3 rounded-xl border border-[hsl(33_14%_30%)] bg-ink px-5 py-3 text-cream transition-colors duration-150 hover:border-brass"
    >
      <SiAppstore className="text-2xl text-brass-light" />
      <span className="flex flex-col text-left leading-tight">
        <span className="text-xs opacity-70">Download on the</span>
        <span className="text-sm font-medium tracking-wide">App Store</span>
      </span>
    </a>
  );
}
