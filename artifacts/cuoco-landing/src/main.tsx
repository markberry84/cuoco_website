import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import { normalisePath } from "@/content/seo";
import "./index.css";

const root = document.getElementById("root")!;
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const current = normalisePath(window.location.pathname.slice(base.length) || "/");

// Published pages arrive ready-made and are brought to life in place. The host
// also serves the home page's file for unknown addresses, so only hydrate when
// the ready-made page is the one being asked for; otherwise start from scratch.
if (root.dataset.path === current) {
  hydrateRoot(root, <App />);
} else {
  root.replaceChildren();
  createRoot(root).render(<App />);
}
