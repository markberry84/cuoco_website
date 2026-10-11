import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import markPath from "@assets/cuoco-mark-1024-transparent_(1)_1777737495347.png";
import { NAV_LINKS } from "@/content/site";
import { AppStoreButton } from "@/components/AppStoreButton";

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// Hash links go to a section of the home page, so they need a real navigation
// rather than a client-side route change.
function NavLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  if (href.includes("#")) {
    const base = import.meta.env.BASE_URL.replace(/\/$/, "");
    return (
      <a href={`${base}${href}`} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const solid = scrolled || mobileOpen;

  return (
    <header
      data-testid="header-nav"
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300 ${
        solid
          ? "border-line bg-cream/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3" aria-label="Cuoco home">
          <img src={markPath} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-serif text-base font-medium tracking-[0.18em] text-ink sm:text-xl sm:tracking-[0.22em]">
            CUOCO
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              className="text-sm text-body transition-colors duration-150 hover:text-brass"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <AppStoreButton placement="nav" compact />
          <button
            className="rounded-lg p-2 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5 text-ink" />
            ) : (
              <Menu className="h-5 w-5 text-ink" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line bg-cream md:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4" aria-label="Mobile">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.href}
                  href={l.href}
                  className="py-1 text-base text-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
