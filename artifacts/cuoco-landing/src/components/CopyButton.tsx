import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "copied" | "blocked";

export function CopyButton({
  text,
  label = "Copy",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const show = (next: Status, ms: number) => {
    setStatus(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), ms);
  };

  const copy = async () => {
    try {
      if (!navigator.clipboard) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(text);
      show("copied", 2000);
    } catch {
      show("blocked", 4000);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line bg-cream px-3 py-1.5 text-xs font-medium text-ink transition-colors duration-150 hover:border-brass",
        className,
      )}
    >
      {status === "copied" ? <Check className="h-3.5 w-3.5 text-brass" /> : <Copy className="h-3.5 w-3.5" />}
      {status === "copied" ? "Copied" : status === "blocked" ? "Select and copy the text" : label}
    </button>
  );
}
