import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mic,
  Sparkles,
  Camera,
  CalendarDays,
  ChevronDown,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import markPath from "@assets/cuoco-mark-1024-transparent_(1)_1777737495347.png";
import markDarkPath from "@assets/cuoco-icon-light-transparent.png";
import screenshotRecipeList from "@assets/Recipe_List_Dark_1780859066605.png";
import screenshotAIVoice from "@assets/AI_Voice_1780859066604.png";
import screenshotRecipeDetail from "@assets/Recipe_Detail_Dark_1780859066603.png";
import screenshotRecipeImport from "@assets/Recipe_Import_Dark_1780859066605.png";
import screenshotPlanner from "@assets/Planner_Dark_1780859066604.png";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FEATURE_SCREENSHOTS = [
  screenshotAIVoice,
  screenshotRecipeDetail,
  screenshotRecipeImport,
  screenshotPlanner,
];

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const FEATURES = [
  {
    icon: Mic,
    title: "Voice-Assisted Cooking",
    desc: "Hands full of dough? No problem. Cuoco can find recipes, guide cooking and answer questions, hands-free.",
    examples: [
      "Find me dinner recipes I can cook in under 30 minutes.",
      "I am out of paprika, what's a good substitute?",
    ],
  },
  {
    icon: Sparkles,
    title: "AI-Powered Recipes",
    desc: "Add nutritional info, meal and cuisine-type, and allergen information to any recipe — automatically.",
  },
  {
    icon: Camera,
    title: "Import From Anywhere",
    desc: "Snap a photo of a recipe card, paste a URL, or type it out. Cuoco captures it and makes it yours.",
  },
  {
    icon: CalendarDays,
    title: "Collect and Plan",
    desc: "Organize recipes into collections. Plan your days, weeks and month in minutes.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Add your recipes",
    desc: "Import from a URL, snap a photo, paste in text or create something new. Enhance it with AI.",
  },
  {
    num: "02",
    title: "Plan your meals",
    desc: "Add recipes to your meal planner across days, weeks and months.",
  },
  {
    num: "03",
    title: "Cook hands-free",
    desc: "Open any recipe and Cuoco is right there with you to guide and help make every dish.",
  },
];

const FAQS: { q: string; content: React.ReactNode }[] = [
  {
    q: "What is Cuoco?",
    content: (
      <p>Cuoco is an AI-powered cooking companion app. It helps you discover, plan, and cook recipes with the help of an integrated voice assistant and smart AI tools.</p>
    ),
  },
  {
    q: "What are the different paid plans?",
    content: (
      <p>Start with a free 7-day trial and try out all Cuoco's features. Then, most people will be fine on our core plan (£2.99 per month). Our premium plan (£4.99 per month) is targeted at heavy voice users. The only difference in the plans is the usage cap, which is 100% higher on the premium plan compared to core.</p>
    ),
  },
  {
    q: "How does usage work?",
    content: (
      <>
        <p>Usage is based on using Cuoco's AI features. Adding recipes, calculating nutrition and speaking to Cuoco all count towards your monthly allowance. Browsing and cooking recipes manually doesn't consume usage.</p>
        <p className="mt-3">You can track your monthly usage in the Settings page.</p>
      </>
    ),
  },
  {
    q: "What are the AI features in Cuoco?",
    content: (
      <>
        <p>Cuoco uses AI to:</p>
        <ul className="mt-3 flex flex-col gap-2">
          {[
            "Import recipes from photos, URLs, and text — including multiple photos where a recipe spans multiple pages.",
            "Categorise meals and detect allergen information automatically.",
            "Calculate nutritional information based on ingredients.",
            "Transcribe your voice so you can control the app hands-free.",
            "Answer your cooking questions in real time while you cook.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "hsl(33 39% 40%)" }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    q: "Is my data and privacy secure with Cuoco?",
    content: (
      <>
        <p>Yes. Your recipes and personal information are stored securely in an encrypted database and are never shared with third parties. Cuoco uses industry-standard authentication to protect your account, and your data is only ever used to power your own experience — never to train AI models or for advertising purposes.</p>
        <p className="mt-3">When you use voice features, your audio is transcribed and then discarded — we don't store recordings of your voice.</p>
      </>
    ),
  },
];

function AppStoreButton({
  store,
  "data-testid": testId,
}: {
  store: "apple" | "google";
  "data-testid": string;
}) {
  const isApple = store === "apple";
  return (
    <a
      href="#"
      data-testid={testId}
      className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-200 group"
      style={{
        background: "hsl(33 16% 11%)",
        borderColor: "hsl(33 14% 20%)",
        color: "hsl(38 33% 91%)",
      }}
    >
      <span
        className="text-2xl transition-transform duration-200 group-hover:scale-110"
        style={{ color: "hsl(35 32% 60%)" }}
      >
        {isApple ? <SiAppstore /> : <SiGoogleplay />}
      </span>
      <span className="flex flex-col leading-tight text-left">
        <span className="text-xs opacity-70">
          {isApple ? "Download on the" : "Get it on"}
        </span>
        <span className="text-sm font-medium tracking-wide">
          {isApple ? "App Store" : "Google Play"}
        </span>
      </span>
    </a>
  );
}

export default function Landing() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#download", label: "Download" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "hsl(38 33% 91%)" }}>
      {/* NAV */}
      <header
        data-testid="header-nav"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "hsla(38, 33%, 91%, 0.95)"
            : "hsla(38, 33%, 91%, 0.0)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid hsl(36 18% 80%)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3" aria-label="Cuoco home">
            <img
              src={markPath}
              alt="Cuoco mark"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span
              className="text-xl tracking-[0.22em] font-medium"
              style={{ fontFamily: "'Newsreader', Georgia, serif", color: "hsl(33 16% 11%)" }}
            >
              CUOCO
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                className="text-sm transition-colors duration-150"
                style={{ color: "hsl(33 12% 45%)" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "hsl(33 39% 40%)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "hsl(33 12% 45%)")
                }
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" style={{ color: "hsl(33 16% 11%)" }} />
            ) : (
              <Menu className="w-5 h-5" style={{ color: "hsl(33 16% 11%)" }} />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
              style={{
                background: "hsl(38 33% 91%)",
                borderTop: "1px solid hsl(36 18% 80%)",
              }}
            >
              <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                    className="text-base py-1"
                    style={{ color: "hsl(33 16% 11%)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
                <div className="flex gap-3 pt-2">
                  <AppStoreButton store="apple" data-testid="mobile-cta-appstore" />
                  <AppStoreButton store="google" data-testid="mobile-cta-google" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 40%, hsla(33, 39%, 40%, 0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-8"
          >
            <img
              src={markPath}
              alt="Cuoco"
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </motion.div>

          {/* Wordmark */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl tracking-[0.22em] font-medium mb-6"
            style={{ fontFamily: "'Newsreader', Georgia, serif", color: "hsl(33 39% 40%)" }}
          >
            CUOCO
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl leading-[1.1] mb-6"
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontWeight: 400,
              color: "hsl(33 16% 11%)",
            }}
          >
            Less scrolling.
            <br />
            <span style={{ color: "hsl(33 39% 40%)", fontStyle: "italic" }}>
              More cooking.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35 }}
            className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "hsl(33 12% 45%)" }}
          >
            Your AI-powered cooking companion with a built-in voice assistant.
            Discover, plan, and cook — hands-free.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <AppStoreButton store="apple" data-testid="hero-cta-appstore" />
            <AppStoreButton store="google" data-testid="hero-cta-google" />
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto"
            style={{ maxWidth: 320 }}
          >
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-[2.5rem] blur-2xl opacity-30"
              style={{ background: "hsl(33 39% 40%)" }}
            />
            {/* Phone shell */}
            <div
              className="relative mx-auto w-64 md:w-72 rounded-[2.5rem] p-2 shadow-2xl"
              style={{ background: "hsl(33 16% 16%)" }}
            >
              {/* Speaker notch */}
              <div
                className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full"
                style={{ background: "hsl(33 14% 25%)" }}
              />
              {/* Screen */}
              <div
                className="rounded-[2rem] overflow-hidden"
                style={{ minHeight: 480 }}
              >
                <img
                  src={screenshotRecipeList}
                  alt="Cuoco recipe list"
                  className="w-full h-full object-cover object-top"
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "hsl(33 12% 55%)" }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="py-24 px-6"
        style={{ background: "hsl(40 50% 96%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p
              className="text-xs tracking-[0.3em] uppercase font-medium mb-4"
              style={{ color: "hsl(33 39% 40%)" }}
            >
              Features
            </p>
            <h2
              className="text-4xl md:text-5xl"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontWeight: 400,
                color: "hsl(33 16% 11%)",
              }}
            >
              Meet your <em>cuoco</em>
            </h2>
          </FadeIn>

          <div className="flex flex-col gap-20">
            {FEATURES.map((f, i) => {
              const isEven = i % 2 === 0;
              return (
                <FadeIn key={f.title} delay={0.05}>
                  <div
                    className={`flex flex-col gap-10 items-center justify-center ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Text block */}
                    <div className="flex flex-col justify-start pt-4 w-full md:w-80" style={{ maxWidth: 320 }}>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-6"
                        style={{ background: "hsl(33 39% 40%)", color: "hsl(40 50% 96%)" }}
                      >
                        <f.icon className="w-5 h-5" />
                      </div>
                      <h3
                        className="text-3xl md:text-4xl mb-4"
                        style={{
                          fontFamily: "'Newsreader', Georgia, serif",
                          fontWeight: 400,
                          color: "hsl(33 16% 11%)",
                        }}
                      >
                        {f.title}
                      </h3>
                      <p
                        className="text-base leading-relaxed"
                        style={{ color: "hsl(33 12% 45%)" }}
                      >
                        {f.desc}
                      </p>
                      {f.examples && (
                        <ul className="mt-5 flex flex-col gap-3">
                          {f.examples.map((ex) => (
                            <li
                              key={ex}
                              className="flex items-start gap-2"
                            >
                              <span
                                className="mt-0.5 flex-shrink-0 w-4 h-4 flex items-center justify-center rounded-full"
                                style={{ background: "hsla(33,39%,40%,0.12)" }}
                              >
                                <Mic className="w-2.5 h-2.5" style={{ color: "hsl(33 39% 40%)" }} />
                              </span>
                              <span
                                className="text-sm leading-relaxed"
                                style={{
                                  fontFamily: "'Newsreader', Georgia, serif",
                                  fontStyle: "italic",
                                  color: "hsl(33 16% 35%)",
                                }}
                              >
                                "{ex}"
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Phone screenshot */}
                    <div
                      data-testid={`feature-screenshot-${i}`}
                      className="flex-shrink-0"
                      style={{ width: 220 }}
                    >
                      <div
                        className="relative w-full rounded-[2rem] p-1.5 shadow-2xl"
                        style={{ background: "hsl(33 16% 10%)" }}
                      >
                        {/* Speaker notch */}
                        <div
                          className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full z-10"
                          style={{ background: "hsl(33 14% 20%)" }}
                        />
                        {/* Screen */}
                        <div className="rounded-[1.6rem] overflow-hidden">
                          <img
                            src={FEATURE_SCREENSHOTS[i]}
                            alt={f.title}
                            className="w-full object-cover object-top"
                            style={{ display: "block", height: 420 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="py-24 px-6"
        style={{ background: "hsl(38 33% 91%)" }}
      >
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p
              className="text-xs tracking-[0.3em] uppercase font-medium mb-4"
              style={{ color: "hsl(33 39% 40%)" }}
            >
              How it works
            </p>
            <h2
              className="text-4xl md:text-5xl"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontWeight: 400,
                color: "hsl(33 16% 11%)",
              }}
            >
              From phone to plate
            </h2>
          </FadeIn>

          <div className="relative flex flex-col gap-0">
            {/* Connector line */}
            <div
              className="absolute left-6 md:left-8 top-8 bottom-8 w-px hidden md:block"
              style={{ background: "hsl(36 18% 78%)" }}
            />

            {STEPS.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.12}>
                <div className="flex gap-8 md:gap-12 items-start pb-12 last:pb-0">
                  {/* Step number */}
                  <div className="flex-shrink-0 relative z-10">
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: "hsl(40 50% 96%)",
                        border: "1px solid hsl(36 18% 78%)",
                      }}
                    >
                      <span
                        className="text-sm font-medium tracking-wider"
                        style={{
                          fontFamily: "'Newsreader', Georgia, serif",
                          color: "hsl(33 39% 40%)",
                        }}
                      >
                        {step.num}
                      </span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3
                      className="text-2xl mb-2"
                      style={{
                        fontFamily: "'Newsreader', Georgia, serif",
                        fontWeight: 500,
                        color: "hsl(33 16% 11%)",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "hsl(33 12% 45%)" }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD SECTION */}
      <section
        id="download"
        className="py-24 px-6 relative overflow-hidden"
        style={{ background: "hsl(33 16% 11%)" }}
      >
        {/* Decorative glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, hsla(33, 39%, 40%, 0.25) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-2xl mx-auto text-center">
          <FadeIn>
            <img
              src={markDarkPath}
              alt="Cuoco"
              width={64}
              height={64}
              className="w-16 h-16 mx-auto mb-6 opacity-90"
            />
            <h2
              className="text-4xl md:text-5xl mb-4"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontWeight: 400,
                color: "hsl(38 33% 91%)",
              }}
            >
              Ready to cook smarter?
            </h2>
            <p
              className="text-lg mb-10 leading-relaxed"
              style={{ color: "hsl(36 18% 65%)" }}
            >
              Cuoco is coming soon to iOS and Android. Join the waitlist or grab
              it the moment it launches.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <AppStoreButton store="apple" data-testid="download-cta-appstore" />
              <AppStoreButton store="google" data-testid="download-cta-google" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-24 px-6"
        style={{ background: "hsl(40 50% 96%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p
              className="text-xs tracking-[0.3em] uppercase font-medium mb-4"
              style={{ color: "hsl(33 39% 40%)" }}
            >
              FAQ
            </p>
            <h2
              className="text-4xl md:text-5xl"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontWeight: 400,
                color: "hsl(33 16% 11%)",
              }}
            >
              Questions answered
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  data-testid={`faq-item-${i}`}
                  className="rounded-xl border overflow-hidden"
                  style={{
                    borderColor: "hsl(36 18% 84%)",
                    background: "hsl(38 33% 91%)",
                  }}
                >
                  <AccordionTrigger
                    data-testid={`faq-trigger-${i}`}
                    className="px-6 py-4 text-left hover:no-underline text-base font-medium"
                    style={{
                      fontFamily: "'Newsreader', Georgia, serif",
                      color: "hsl(33 16% 11%)",
                    }}
                  >
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="px-6 pb-5 text-sm leading-relaxed"
                    style={{ color: "hsl(33 12% 45%)" }}
                  >
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-24 px-6"
        style={{ background: "hsl(38 33% 91%)" }}
      >
        <div className="max-w-xl mx-auto text-center">
          <FadeIn>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6"
              style={{ background: "hsl(40 50% 96%)", border: "1px solid hsl(36 18% 80%)" }}
            >
              <Mail className="w-5 h-5" style={{ color: "hsl(33 39% 40%)" }} />
            </div>
            <h2
              className="text-4xl mb-4"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontWeight: 400,
                color: "hsl(33 16% 11%)",
              }}
            >
              Get in touch
            </h2>
            <p
              className="text-base mb-8 leading-relaxed"
              style={{ color: "hsl(33 12% 45%)" }}
            >
              Have questions, feedback, or just want to say hello? We would love to
              hear from you.
            </p>
            <a
              href="mailto:hello@get-cuoco.app"
              data-testid="link-contact-email"
              className="inline-flex items-center gap-2 text-lg font-medium transition-all duration-200 group"
              style={{ color: "hsl(33 39% 40%)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget.style.color = "hsl(33 39% 30%)")
              )}
              onMouseLeave={(e) =>
                ((e.currentTarget.style.color = "hsl(33 39% 40%)")
              )}
            >
              <span
                className="border-b transition-all duration-200"
                style={{ borderColor: "hsla(33, 39%, 40%, 0.3)" }}
              >
                hello@get-cuoco.app
              </span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "hsl(33 16% 11%)",
          borderTop: "1px solid hsl(33 14% 20%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={markDarkPath}
              alt="Cuoco"
              width={28}
              height={28}
              className="w-7 h-7 opacity-90"
            />
            <span
              className="text-base tracking-[0.22em] font-medium"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                color: "hsl(36 18% 65%)",
              }}
            >
              CUOCO
            </span>
          </div>

          <p
            className="text-xs"
            style={{ color: "hsl(33 12% 45%)" }}
          >
            &copy; 2025 Cuoco. All rights reserved.
          </p>

          <a
            href="mailto:hello@get-cuoco.app"
            data-testid="footer-contact-email"
            className="text-xs transition-colors duration-150"
            style={{ color: "hsl(33 12% 45%)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget.style.color = "hsl(35 32% 60%)")
            )}
            onMouseLeave={(e) =>
              ((e.currentTarget.style.color = "hsl(33 12% 45%)")
            )}
          >
            hello@get-cuoco.app
          </a>
        </div>
      </footer>
    </div>
  );
}
