import { renderToString } from "react-dom/server";
import App from "./App";

export { PAGE_PATHS, headHtml } from "@/content/seo";

/** Render one page to HTML for scripts/prerender.mjs. */
export function render(path: string): string {
  return renderToString(<App ssrPath={path} />);
}
