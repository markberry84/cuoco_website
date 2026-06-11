import { Router, type IRouter } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "data", "waitlist.json");

const MAX_ENTRIES = 50_000;

async function readEmails(): Promise<string[]> {
  try {
    const raw = await fs.promises.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function saveEmails(emails: string[]): Promise<void> {
  await fs.promises.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.promises.writeFile(DATA_PATH, JSON.stringify(emails, null, 2));
}

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

const waitlistLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

const router: IRouter = Router();

router.post("/waitlist", waitlistLimiter, async (req, res) => {
  const email = (req.body?.email ?? "").toString().trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    res.status(400).json({ error: "Please enter a valid email address." });
    return;
  }

  const emails = await readEmails();

  if (emails.length >= MAX_ENTRIES) {
    res.status(503).json({ error: "Waitlist is currently unavailable." });
    return;
  }

  if (!emails.includes(email)) {
    emails.push(email);
    await saveEmails(emails);
  }

  res.json({ ok: true });
});

export default router;
