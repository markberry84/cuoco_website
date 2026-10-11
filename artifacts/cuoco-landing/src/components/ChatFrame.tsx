import { cn } from "@/lib/utils";

export function ChatFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-card-cream shadow-xl",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-line-soft px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
      </div>
      {children}
    </div>
  );
}
