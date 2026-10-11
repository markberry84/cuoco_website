#!/usr/bin/env python3
"""Turn the app repo's legal documents into data the website renders.

The Privacy Policy and Terms of Service are written and maintained in the app
repo (chef_app). This script converts those Markdown files, word for word, into
JSON that src/components/LegalPage.tsx displays, so the website can never
drift from the source text.

Usage (from artifacts/cuoco-landing):
    python3 scripts/legal_from_md.py /path/to/chef_app
"""
import json
import re
import sys
from pathlib import Path

DOCS = {
    "privacy": "cuoco_privacy_policy.md",
    "terms": "cuoco_terms_of_service.md",
}

INLINE = re.compile(
    r"\*\*(?P<bold>.+?)\*\*"
    r"|\[(?P<label>[^\]]+)\]\((?P<href>[^)]+)\)"
    r"|(?P<email>[\w.+-]+@[\w-]+(?:\.[\w-]+)+)"
    r"|(?P<url>https?://[^\s)]+[^\s).,;])"
)


def inline(text):
    """Split a line into plain, bold and link segments."""
    segs, pos = [], 0
    for m in INLINE.finditer(text):
        if m.start() > pos:
            segs.append({"text": text[pos:m.start()]})
        if m.group("bold") is not None:
            inner = inline(m.group("bold"))
            for seg in inner:
                seg["bold"] = True
            segs.extend(inner)
        elif m.group("label") is not None:
            segs.append({"text": m.group("label"), "href": m.group("href")})
        elif m.group("email") is not None:
            segs.append({"text": m.group("email"), "href": "mailto:" + m.group("email")})
        else:
            segs.append({"text": m.group("url"), "href": m.group("url")})
        pos = m.end()
    if pos < len(text):
        segs.append({"text": text[pos:]})
    return segs


def convert(md):
    lines = md.splitlines()
    doc = {"title": "", "updated": "", "blocks": []}
    blocks = doc["blocks"]
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        if not line or line == "---":
            i += 1
        elif line.startswith("# "):
            doc["title"] = line[2:].strip()
            i += 1
        elif line == "**Cuoco**":
            i += 1
        elif line.startswith("Last updated:"):
            doc["updated"] = line.split(":", 1)[1].strip()
            i += 1
        elif line.startswith("### "):
            blocks.append({"type": "h3", "text": line[4:].strip()})
            i += 1
        elif line.startswith("## "):
            blocks.append({"type": "h2", "text": line[3:].strip()})
            i += 1
        elif line.startswith("- "):
            items = []
            while i < len(lines) and lines[i].startswith("- "):
                items.append(inline(lines[i][2:].strip()))
                i += 1
            blocks.append({"type": "ul", "items": items})
        elif line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-+:?", c) for c in cells):
                    rows.append([inline(c) for c in cells])
                i += 1
            blocks.append({"type": "table", "head": rows[0], "rows": rows[1:]})
        else:
            # A paragraph: consecutive lines; two trailing spaces mean a line break.
            para = []
            while i < len(lines):
                raw = lines[i]
                cur = raw.rstrip()
                if not cur or cur == "---" or cur.startswith(("#", "- ", "|")):
                    break
                para.append(cur)
                i += 1
            first = para[0]
            if first.startswith("**Legal basis (GDPR):**"):
                rest = " ".join(para)[len("**Legal basis (GDPR):**"):].strip()
                blocks.append({"type": "legal", "segs": inline(rest)})
            elif len(para) == 1 and re.fullmatch(r"\*[^*].*[^*]\*", first):
                blocks.append({"type": "note", "segs": inline(first[1:-1])})
            else:
                blocks.append({"type": "p", "lines": [inline(p) for p in para]})
    return doc


def plain(doc):
    """All visible words of a converted document, for checking against the source."""
    out = [doc["title"], "Last updated: " + doc["updated"]]
    seg_text = lambda segs: "".join(s["text"] for s in segs)
    for b in doc["blocks"]:
        if b["type"] in ("h2", "h3"):
            out.append(b["text"])
        elif b["type"] == "p":
            out.extend(seg_text(l) for l in b["lines"])
        elif b["type"] == "ul":
            out.extend(seg_text(it) for it in b["items"])
        elif b["type"] == "table":
            for row in [b["head"]] + b["rows"]:
                out.extend(seg_text(c) for c in row)
        elif b["type"] == "legal":
            out.append("Legal basis (GDPR): " + seg_text(b["segs"]))
        elif b["type"] == "note":
            out.append(seg_text(b["segs"]))
    return re.sub(r"\s+", " ", " ".join(out)).strip()


def source_words(md):
    """The source with Markdown punctuation removed, for the same check."""
    text = []
    for line in md.splitlines():
        s = line.strip()
        if not s or s == "---" or s == "**Cuoco**" or re.fullmatch(r"\|[\s:|-]+\|", s):
            continue
        s = re.sub(r"^#{1,3} ", "", s)
        s = re.sub(r"^- ", "", s)
        if s.startswith("|"):
            s = " ".join(c.strip() for c in s.strip("|").split("|"))
        s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)
        s = s.replace("**", "")
        s = re.sub(r"^\*(.*)\*$", r"\1", s)
        text.append(s)
    return re.sub(r"\s+", " ", " ".join(text)).strip()


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    app_repo = Path(sys.argv[1])
    out_dir = Path(__file__).resolve().parent.parent / "src" / "content" / "legal"
    out_dir.mkdir(parents=True, exist_ok=True)
    for name, filename in DOCS.items():
        md = (app_repo / filename).read_text(encoding="utf-8")
        doc = convert(md)
        got, want = plain(doc), source_words(md)
        if got != want:
            n = next((k for k, (a, b) in enumerate(zip(got, want)) if a != b), min(len(got), len(want)))
            sys.exit(f"{name}: converted text differs from the source near: ...{want[max(0, n - 60):n + 60]}...")
        (out_dir / f"{name}.json").write_text(
            json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        print(f"{name}: {len(doc['blocks'])} blocks, {len(want.split())} words, last updated {doc['updated']}")


if __name__ == "__main__":
    main()
