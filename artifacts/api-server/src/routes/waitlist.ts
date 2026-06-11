import { Router, type IRouter } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "..", "data", "waitlist.json");

function readEmails(): string[] {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function saveEmails(emails: string[]): void {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(emails, null, 2));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const router: IRouter = Router();

router.post("/waitlist", (req, res) => {
  const email = (req.body?.email ?? "").toString().trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: "Please enter a valid email address." });
    return;
  }
  const emails = readEmails();
  if (!emails.includes(email)) {
    emails.push(email);
    saveEmails(emails);
  }
  res.json({ ok: true });
});

router.get("/waitlist", (_req, res) => {
  res.json({ emails: readEmails() });
});

export default router;
