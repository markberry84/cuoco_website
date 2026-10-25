import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");
      const res = await fetch(`${apiBase}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Couldn't connect. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium"
        style={{
          background: "hsla(33, 39%, 40%, 0.18)",
          color: "hsl(38 33% 85%)",
          border: "1px solid hsla(33, 39%, 40%, 0.35)",
        }}
      >
        <span style={{ color: "hsl(35 55% 65%)" }}>✓</span>
        You're on the list. We'll email you when Cuoco is on Android.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
      <input
        type="email"
        aria-label="Email address"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
        style={{
          background: "hsla(38, 33%, 100%, 0.07)",
          border: status === "error" ? "1px solid hsl(0 55% 55%)" : "1px solid hsla(38, 33%, 91%, 0.2)",
          color: "hsl(38 33% 91%)",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "hsl(33 39% 40%)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = status === "error" ? "hsl(0 55% 55%)" : "hsla(38, 33%, 91%, 0.2)")}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200"
        style={{
          background: "hsl(33 39% 40%)",
          color: "hsl(40 50% 96%)",
          opacity: status === "loading" ? 0.7 : 1,
          cursor: status === "loading" ? "default" : "pointer",
        }}
        onMouseEnter={(e) => { if (status !== "loading") e.currentTarget.style.background = "hsl(33 39% 33%)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "hsl(33 39% 40%)"; }}
      >
        {status === "loading" ? "Sending…" : "Notify me"}
      </button>
      {status === "error" && (
        <p className="sm:col-span-2 text-xs text-center w-full" style={{ color: "hsl(0 55% 65%)" }}>
          {errorMsg}
        </p>
      )}
    </form>
  );
}
