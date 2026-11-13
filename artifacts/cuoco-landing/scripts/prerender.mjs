// Writes one ready-made HTML file per page, so visitors, search engines and AI
// assistants that never run JavaScript still receive each page's own title,
// description and full text. Runs as the last step of `pnpm run build`.
import { execFileSync } from "node:child_process";
import { readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "dist", "public");
const serverDir = join(root, "dist", "server");

const template = await readFile(join(publicDir, "index.html"), "utf8");
for (const marker of ["<!--head-->", '<div id="root"><!--app--></div>']) {
  if (!template.includes(marker)) {
    throw new Error(`prerender: index.html is missing ${marker}`);
  }
}

const { render, headHtml, PAGE_PATHS } = await import(
  pathToFileURL(join(serverDir, "entry-server.js")).href
);

function page(path, head, routePath) {
  const app = render(routePath);
  if (!app.includes("<main")) throw new Error(`prerender: ${routePath} rendered no content`);
  const attr = path === null ? "" : ` data-path="${path}"`;
  return template
    .replace("<!--head-->", head)
    .replace('<div id="root"><!--app--></div>', `<div id="root"${attr}>${app}</div>`);
}

for (const path of PAGE_PATHS) {
  const html = page(path, headHtml(path), path);
  if (path === "/") {
    await writeFile(join(publicDir, "index.html"), html);
  } else {
    // One file per page, reached through the rewrites in .replit-artifact/artifact.toml.
    // No <page>/ folder: the host would redirect "/connect" to "/connect/" and then
    // answer that with the home page's file.
    await writeFile(join(publicDir, `${path}.html`), html);
  }
  console.log(`prerender: ${path}`);
}

await writeFile(join(publicDir, "404.html"), page(null, headHtml(null), "/page-not-found"));
console.log("prerender: 404.html");

// Sitemap dates: each page's "last changed" is the date of the last commit that
// touched its own files. If git isn't available, the date already in
// public/sitemap.xml is left as it is.
const PAGE_SOURCES = {
  "/": ["src/pages/Landing.tsx", "src/components/home", "src/content/faq.ts", "src/content/site.ts"],
  "/connect": ["src/pages/Connect.tsx", "src/content/connect.ts"],
  "/voice": ["src/pages/Voice.tsx"],
  "/support": ["src/pages/Support.tsx", "src/content/support.ts"],
  "/privacy": ["src/content/legal/privacy.json"],
  "/terms": ["src/content/legal/terms.json"],
};

function lastChanged(files) {
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...files], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : null;
  } catch {
    return null;
  }
}

const sitemapFile = join(publicDir, "sitemap.xml");
let sitemap = await readFile(sitemapFile, "utf8");
for (const path of PAGE_PATHS) {
  const date = lastChanged(PAGE_SOURCES[path] ?? []);
  if (!date) continue;
  const loc = `<loc>https://get-cuoco.app${path}</loc>`;
  const at = sitemap.indexOf(loc);
  if (at === -1) throw new Error(`prerender: sitemap.xml is missing ${path}`);
  sitemap =
    sitemap.slice(0, at) + sitemap.slice(at).replace(/<lastmod>[^<]*/, `<lastmod>${date}`);
}
await writeFile(sitemapFile, sitemap);
console.log("prerender: sitemap.xml");

await rm(serverDir, { recursive: true, force: true });
