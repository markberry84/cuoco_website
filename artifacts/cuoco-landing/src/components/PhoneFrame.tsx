import { cn } from "@/lib/utils";

export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative rounded-[2.2rem] bg-ink-soft p-2 shadow-2xl", className)}>
      <div className="absolute left-1/2 top-4 z-10 h-1 w-14 -translate-x-1/2 rounded-full bg-[hsl(33_14%_25%)]" />
      <div className="overflow-hidden rounded-[1.8rem] bg-ink">{children}</div>
    </div>
  );
}
