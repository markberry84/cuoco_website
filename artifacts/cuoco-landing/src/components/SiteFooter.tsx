import { Link } from "wouter";
import { SiInstagram, SiTiktok } from "react-icons/si";
import markLightPath from "@assets/cuoco-icon-light-transparent.png";
import { SITE } from "@/content/site";

const FOOTER_LINKS = [
  { href: "/voice", label: "Voice" },
  { href: "/connect", label: "Connect" },
  { href: "/support", label: "Support" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[hsl(33_14%_20%)] bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link href="/" className="flex items-center gap-3" aria-label="Cuoco home">
            <img src={markLightPath} alt="" width={28} height={28} className="h-7 w-7 opacity-90" />
            <span className="font-serif text-base font-medium tracking-[0.22em] text-[hsl(36_18%_65%)]">
              CUOCO
            </span>
          </Link>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-[hsl(36_18%_65%)] transition-colors duration-150 hover:text-brass-light"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cuoco on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[hsl(33_14%_25%)] text-[hsl(36_18%_65%)] transition-colors duration-150 hover:border-brass-light hover:text-brass-light"
            >
              <SiInstagram className="h-4 w-4" />
            </a>
            <a
              href={SITE.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cuoco on TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[hsl(33_14%_25%)] text-[hsl(36_18%_65%)] transition-colors duration-150 hover:border-brass-light hover:text-brass-light"
            >
              <SiTiktok className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 text-xs text-body md:flex-row">
          <p>&copy; 2026 Cuoco. All rights reserved.</p>
          <a
            href={`mailto:${SITE.email}`}
            data-testid="footer-contact-email"
            className="transition-colors duration-150 hover:text-brass-light"
          >
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
