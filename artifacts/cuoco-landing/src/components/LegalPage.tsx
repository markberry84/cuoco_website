import { Fragment } from "react";
import { PageShell } from "@/components/PageShell";

// The documents are generated from the app repo by scripts/legal_from_md.py.
// Do not edit the JSON by hand: change the source document and run the script.

type Seg = { text: string; bold?: boolean; href?: string };
type Block =
  | { type: "h2" | "h3"; text: string }
  | { type: "p"; lines: Seg[][] }
  | { type: "ul"; items: Seg[][] }
  | { type: "table"; head: Seg[][]; rows: Seg[][][] }
  | { type: "legal" | "note"; segs: Seg[] };

export type LegalDoc = { title: string; updated: string; blocks: Block[] };

function Segs({ segs }: { segs: Seg[] }) {
  return (
    <>
      {segs.map((s, i) => {
        const text = s.bold ? <strong className="font-semibold text-ink">{s.text}</strong> : s.text;
        return s.href ? (
          <a
            key={i}
            href={s.href}
            className="text-brass underline underline-offset-2"
            {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {text}
          </a>
        ) : (
          <Fragment key={i}>{text}</Fragment>
        );
      })}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 border-b border-line-soft pb-3 text-xl font-normal text-ink first:mt-0">
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-7 text-base font-medium text-[hsl(33_16%_20%)]">{block.text}</h3>;
    case "p":
      return (
        <p className="mt-3">
          {block.lines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              <Segs segs={line} />
            </Fragment>
          ))}
        </p>
      );
    case "ul":
      return (
        <ul className="mt-3 flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
              <span>
                <Segs segs={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="mt-4 overflow-x-auto rounded-lg border border-line-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream text-ink">
              <tr>
                {block.head.map((cell, i) => (
                  <th key={i} className="px-4 py-2.5 font-medium">
                    <Segs segs={cell} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-line-soft">
                  {row.map((cell, c) => (
                    <td key={c} className="px-4 py-2.5 align-top">
                      <Segs segs={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "legal":
      return (
        <p className="mt-4 rounded-lg bg-brass/10 px-3 py-2 text-xs text-[hsl(33_16%_35%)]">
          <strong>Legal basis (GDPR):</strong> <Segs segs={block.segs} />
        </p>
      );
    case "note":
      return (
        <p className="mt-12 border-t border-line-soft pt-6 italic text-body">
          <Segs segs={block.segs} />
        </p>
      );
  }
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <PageShell>
      <div className="bg-card-cream">
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-brass">Legal</p>
          <h1 className="mb-2 text-4xl font-normal text-ink md:text-5xl">{doc.title}</h1>
          <p className="mb-12 text-sm text-body">Last updated: {doc.updated}</p>
          <div className="text-sm leading-relaxed text-[hsl(33_12%_30%)]">
            {doc.blocks.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
