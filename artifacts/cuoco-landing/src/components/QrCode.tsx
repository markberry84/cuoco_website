import { cn } from "@/lib/utils";

// The image is generated once from appStoreUrl("qr") and stored with the site.
export function QrCode({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div className={cn("hidden items-center gap-3 lg:flex", className)}>
      <img
        src={`${import.meta.env.BASE_URL}qr-app-store.svg`}
        alt="QR code linking to Cuoco on the App Store"
        width={84}
        height={84}
        className="h-[84px] w-[84px] rounded-lg border border-line bg-white p-1"
      />
      <span
        className={cn(
          "max-w-[9rem] text-left text-xs leading-snug",
          dark ? "text-[hsl(36_18%_65%)]" : "text-body",
        )}
      >
        Scan to download on your iPhone
      </span>
    </div>
  );
}
