import { Router, type IRouter } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import rateLimit from "express-rate-limit";
import { ReplitConnectors } from "@replit/connectors-sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, "..", "data", "waitlist.json");

const MAX_ENTRIES = 50_000;

const NOTIFY_TO = "hello@get-cuoco.app";
const NOTIFY_FROM = "Cuoco Waitlist <hello@get-cuoco.app>";

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

async function sendNotification(newEmail: string, total: number): Promise<void> {
  try {
    const connectors = new ReplitConnectors();
    const response = await connectors.proxy("resend", "/emails", {
      method: "POST",
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        subject: `New waitlist signup (#${total})`,
        html: `<p><strong>${newEmail}</strong> just joined the Cuoco waitlist.</p><p>Total signups: <strong>${total}</strong></p>`,
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      console.error("[waitlist] Resend error:", response.status, text);
    }
  } catch (err) {
    console.error("[waitlist] sendNotification failed:", err);
  }
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

router.get("/waitlist/export", (req, res) => {
  const token = process.env.WAITLIST_EXPORT_TOKEN;
  if (!token || req.query.token !== token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const emails: string[] = JSON.parse(raw);
    const csv = ["email", ...emails].join("\n");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=\"waitlist.csv\"");
    res.send(csv);
  } catch {
    res.status(500).json({ error: "Could not read waitlist." });
  }
});

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

  const isNew = !emails.includes(email);
  if (isNew) {
    emails.push(email);
    await saveEmails(emails);
    sendNotification(email, emails.length).catch((err) =>
      console.error("[waitlist] sendNotification failed:", err)
    );
  }

  res.json({ ok: true });
});

export default router;
