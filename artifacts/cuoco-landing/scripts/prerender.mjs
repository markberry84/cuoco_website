// Writes one ready-made HTML file per page, so visitors, search engines and AI
// assistants that never run JavaScript still receive each page's own title,
// description and full text. Runs as the last step of `pnpm run build`.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
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
    // Static hosts differ on which file answers "/connect", so write both forms.
    await mkdir(join(publicDir, path), { recursive: true });
    await writeFile(join(publicDir, path, "index.html"), html);
    await writeFile(join(publicDir, `${path}.html`), html);
  }
  console.log(`prerender: ${path}`);
}

await writeFile(join(publicDir, "404.html"), page(null, headHtml(null), "/page-not-found"));
console.log("prerender: 404.html");

await rm(serverDir, { recursive: true, force: true });
