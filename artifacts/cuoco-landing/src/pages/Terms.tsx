import { Link } from "wouter";
import markPath from "@assets/cuoco-mark-1024-transparent_(1)_1777737495347.png";

export default function Terms() {
  return (
    <div style={{ background: "hsl(40 50% 96%)", minHeight: "100vh" }}>
      {/* Nav */}
      <header
        className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between border-b"
        style={{
          background: "hsl(40 50% 96%)",
          borderColor: "hsl(36 18% 88%)",
        }}
      >
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <img src={markPath} alt="Cuoco" width={28} height={28} className="w-7 h-7" />
          <span
            className="text-base tracking-[0.22em] font-medium"
            style={{ fontFamily: "'Newsreader', Georgia, serif", color: "hsl(33 16% 11%)" }}
          >
            CUOCO
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm transition-colors duration-150"
          style={{ color: "hsl(33 12% 45%)" }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "hsl(33 16% 11%)")}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "hsl(33 12% 45%)")}
        >
          ← Back
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16 pb-24">
        {/* Page header */}
        <div className="mb-12 pb-8 border-b" style={{ borderColor: "hsl(36 18% 88%)" }}>
          <p
            className="text-xs tracking-[0.3em] uppercase font-medium mb-4"
            style={{ color: "hsl(33 39% 40%)" }}
          >
            Legal
          </p>
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontWeight: 400,
              color: "hsl(33 16% 11%)",
            }}
          >
            Terms of Service
          </h1>
          <p className="text-sm" style={{ color: "hsl(33 12% 45%)" }}>
            Last updated: 22 July 2026
          </p>
        </div>

        <div className="space-y-10" style={{ color: "hsl(33 16% 20%)" }}>

          <Section title="1. Who We Are">
            <p>Cuoco is operated by Mark Berry, a sole trader based in the United Kingdom.</p>
            <p className="mt-3">If you have any questions about these Terms of Service, please contact us at:</p>
            <p className="mt-3">
              <strong style={{ color: "hsl(33 16% 11%)" }}>Email:</strong>{" "}
              <a href="mailto:hello@get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>hello@get-cuoco.app</a>
              <br />
              <strong style={{ color: "hsl(33 16% 11%)" }}>Website:</strong>{" "}
              <a href="https://www.get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>www.get-cuoco.app</a>
            </p>
            <p className="mt-3">
              References to "we", "us", or "our" refer to Mark Berry trading as Cuoco. References to "you" or "your" refer to the person using the Cuoco app.
            </p>
          </Section>

          <Section title="2. Accepting These Terms">
            <p>By downloading, installing, or using Cuoco, you agree to be bound by these Terms of Service. If you do not agree, please do not use the app.</p>
            <p className="mt-3">These Terms form a legally binding agreement between you and us, governed by the laws of England and Wales.</p>
          </Section>

          <Section title="3. Eligibility">
            <p>You must be at least 13 years of age to use Cuoco. By using the app, you confirm that you meet this requirement. If you are between 13 and 18, you should review these Terms with a parent or guardian before using the app.</p>
            <p className="mt-3">We do not knowingly allow children under 13 to create accounts. If we become aware that a user is under 13, we will delete their account promptly.</p>
          </Section>

          <Section title="4. Your Account">
            <p>You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account. Please notify us immediately at{" "}
              <a href="mailto:hello@get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>hello@get-cuoco.app</a>{" "}
              if you suspect any unauthorised access to your account.</p>
            <p className="mt-3">You may only create one account per person. You may not transfer your account to another person.</p>
          </Section>

          <Section title="5. Subscriptions and Payments">
            <SubSection title="5.1 Subscription Tiers">
              <p>Cuoco offers a free trial and paid subscription tiers (Cuoco Pro and Cuoco Premium). The features available at each tier are described in the app and may change over time.</p>
            </SubSection>
            <SubSection title="5.2 Billing">
              <p>All payments are processed by Apple through the App Store. We do not receive, store, or process your payment card details. Your purchase is subject to Apple's own terms and conditions, which you can review at{" "}
                <a href="https://www.apple.com/legal/internet-services/itunes" style={{ color: "hsl(33 39% 40%)" }} target="_blank" rel="noopener noreferrer">apple.com/legal/internet-services/itunes</a>.
              </p>
            </SubSection>
            <SubSection title="5.3 Trial Period">
              <p>New accounts receive a free trial with access to a limited set of features. The trial period and its usage limits are displayed in the app. At the end of your trial, you will need to subscribe to continue using AI-powered features.</p>
            </SubSection>
            <SubSection title="5.4 Cancellation and Refunds">
              <p>You may cancel your subscription at any time through the App Store. Cancellation takes effect at the end of the current billing period — you will retain access until that date. We do not offer refunds for partial billing periods. All refund requests must be directed to Apple, as payments are processed entirely through the App Store and we have no ability to issue refunds directly.</p>
            </SubSection>
            <SubSection title="5.5 Changes to Pricing">
              <p>We reserve the right to change subscription prices. Where we do, we will give you reasonable notice through the app or by email before the change takes effect. Your continued use of a paid subscription after a price change constitutes acceptance of the new price.</p>
            </SubSection>
          </Section>

          <Section title="6. Acceptable Use">
            <p>You agree to use Cuoco only for lawful purposes and in a way that does not infringe the rights of others. You must not:</p>
            <ul className="mt-4 space-y-2 pl-5" style={{ listStyleType: "disc" }}>
              <BulletItem>Use the app for any unlawful purpose or in violation of any applicable law</BulletItem>
              <BulletItem>Attempt to gain unauthorised access to our systems or another user's account</BulletItem>
              <BulletItem>Reverse engineer, decompile, or otherwise attempt to extract the source code of the app</BulletItem>
              <BulletItem>Use automated tools to scrape, crawl, or extract data from the app</BulletItem>
              <BulletItem>Misuse the AI features in a way that is intended to generate harmful, misleading, or abusive content</BulletItem>
              <BulletItem>Abuse the free trial by creating multiple accounts to circumvent usage limits</BulletItem>
            </ul>
          </Section>

          <Section title="7. Your Content">
            <SubSection title="7.1 Recipes and Data You Create">
              <p>Any recipes, notes, or other content you create directly within Cuoco belong to you. We do not claim ownership over content you originate. We store it solely to provide the service to you, as described in our{" "}
                <Link href="/privacy" style={{ color: "hsl(33 39% 40%)" }}>Privacy Policy</Link>.
              </p>
            </SubSection>
            <SubSection title="7.2 Imported Content">
              <p>Cuoco allows you to import recipes from websites, books, and other external sources. You are solely responsible for ensuring that you have the right to store and use any content you import. We do not claim ownership of imported content, and we are not responsible for whether that content infringes the intellectual property rights of any third party. Copyright in recipes and associated content (including written instructions, headnotes, and photographs) may belong to the original publisher or author.</p>
            </SubSection>
            <SubSection title="7.3 Our Licence to Your Content">
              <p>By storing content in Cuoco, you grant us a limited, non-exclusive licence to store, process, and display that content solely for the purpose of providing the service to you. We do not use your recipes or personal content to train AI models. Data sent to third-party AI providers (such as OpenAI and ElevenLabs) as part of delivering app features is subject to those providers' own data use policies, which you can review via the links in our{" "}
                <Link href="/privacy" style={{ color: "hsl(33 39% 40%)" }}>Privacy Policy</Link>.
              </p>
            </SubSection>
          </Section>

          <Section title="8. AI-Powered Features">
            <SubSection title="8.1 Nature of AI Output">
              <p>Cuoco uses artificial intelligence to power features including recipe import, the voice assistant, and Cook Mode. AI-generated content may occasionally be inaccurate, incomplete, or unexpected. You should use your own judgement when relying on AI-generated recipe content, particularly in relation to ingredients, quantities, allergens, and cooking times. We are not liable for any loss or harm arising from reliance on AI-generated content.</p>
            </SubSection>
            <SubSection title="8.2 Third-Party AI Services">
              <p>AI features are powered by third-party providers including OpenAI and ElevenLabs. The availability of these features depends on those providers' services remaining operational. We do not guarantee that AI features will be available at all times and are not liable for any interruption caused by a third-party provider.</p>
            </SubSection>
            <SubSection title="8.3 Consent to AI Processing">
              <p>Recipe import and voice features are optional and turned off by default. Before either is used, the app explains what data is sent and to which third-party provider, and asks for your explicit permission. You can grant or withdraw this permission at any time in Settings. When enabled, your voice input is transcribed and processed by our AI providers; audio recordings are not retained after transcription. Further detail is set out in our{" "}
                <Link href="/privacy" style={{ color: "hsl(33 39% 40%)" }}>Privacy Policy</Link>.
              </p>
            </SubSection>
          </Section>

          <Section title="9. Intellectual Property">
            <p>All rights in the Cuoco app itself — including its design, branding, code, and original content — belong to us. Nothing in these Terms transfers any of those rights to you.</p>
            <p className="mt-3">You may not reproduce, distribute, or create derivative works from any part of the Cuoco app without our prior written consent.</p>
          </Section>

          <Section title="10. Availability and Changes to the Service">
            <p>We aim to keep Cuoco available and reliable, but we do not guarantee uninterrupted access. We may from time to time:</p>
            <ul className="mt-4 space-y-2 pl-5" style={{ listStyleType: "disc" }}>
              <BulletItem>Perform maintenance that temporarily affects availability</BulletItem>
              <BulletItem>Modify, suspend, or discontinue features or the app as a whole</BulletItem>
              <BulletItem>Update these Terms or our pricing</BulletItem>
            </ul>
            <p className="mt-4">Where changes are significant, we will aim to give you reasonable notice. Your continued use of the app after changes are posted constitutes your acceptance of the updated Terms.</p>
            <p className="mt-3">We are a small independent product and reserve the right to discontinue the service entirely with reasonable notice to users.</p>
          </Section>

          <Section title="11. Limitation of Liability">
            <SubSection title="11.1 What We Are Not Liable For">
              <p>To the fullest extent permitted by law, we are not liable for:</p>
              <ul className="mt-4 space-y-2 pl-5" style={{ listStyleType: "disc" }}>
                <BulletItem>Loss of data, recipes, or content (though we take reasonable steps to protect your data)</BulletItem>
                <BulletItem>Inaccuracies in AI-generated content</BulletItem>
                <BulletItem>Any interruption or unavailability of the service</BulletItem>
                <BulletItem>Any loss or damage arising from content you import from third-party sources</BulletItem>
                <BulletItem>Any indirect, consequential, or special loss of any kind</BulletItem>
              </ul>
            </SubSection>
            <SubSection title="11.2 Cap on Liability">
              <p>Where we are found to be liable for any loss or damage, our total liability to you will not exceed the amount you have paid us in subscription fees in the 12 months immediately preceding the event giving rise to the claim.</p>
            </SubSection>
            <SubSection title="11.3 Consumer Rights">
              <p>Nothing in these Terms limits or excludes our liability for death or personal injury caused by our negligence, for fraud or fraudulent misrepresentation, or for any other liability that cannot be excluded or limited under English law. Your statutory rights as a consumer are not affected.</p>
            </SubSection>
          </Section>

          <Section title="12. Termination">
            <SubSection title="12.1 By You">
              <p>You may stop using Cuoco at any time. You can delete your account from within the app via Settings. Deleting your account does not automatically cancel any active App Store subscription — you must cancel that separately through the App Store.</p>
            </SubSection>
            <SubSection title="12.2 By Us">
              <p>We reserve the right to suspend or terminate your account if you breach these Terms, abuse the service, or act in a way that is harmful to other users or to us. Where possible, we will notify you before taking such action.</p>
            </SubSection>
            <SubSection title="12.3 Effect of Termination">
              <p>On termination of your account, your access to the app and your data will cease in accordance with our{" "}
                <Link href="/privacy" style={{ color: "hsl(33 39% 40%)" }}>Privacy Policy</Link>.{" "}
                Usage and billing records are retained for 7 years as required by UK law.
              </p>
            </SubSection>
          </Section>

          <Section title="13. Governing Law and Disputes">
            <p>These Terms are governed by the laws of England and Wales. Any disputes arising from these Terms or your use of Cuoco will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
            <p className="mt-3">If you have a complaint or dispute, please contact us first at{" "}
              <a href="mailto:hello@get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>hello@get-cuoco.app</a>.{" "}
              We will always try to resolve issues directly and informally before any formal action is taken.
            </p>
          </Section>

          <Section title="14. Changes to These Terms">
            <p>We may update these Terms from time to time. When we do, we will update the "Last updated" date at the top of this page. If changes are significant, we will notify you through the app or by email. Your continued use of Cuoco after updated Terms are posted constitutes your acceptance of those Terms.</p>
          </Section>

          <Section title="15. Contact Us">
            <p>
              <strong style={{ color: "hsl(33 16% 11%)" }}>Email:</strong>{" "}
              <a href="mailto:hello@get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>hello@get-cuoco.app</a>
              <br />
              <strong style={{ color: "hsl(33 16% 11%)" }}>Website:</strong>{" "}
              <a href="https://www.get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>www.get-cuoco.app</a>
            </p>
            <p className="mt-3">We aim to respond to all enquiries within 5 business days.</p>
            <p className="mt-4 text-sm italic" style={{ color: "hsl(33 12% 45%)" }}>
              These Terms were written in plain English and are intended to be easy to understand. If anything is unclear, please get in touch.
            </p>
          </Section>

        </div>
      </main>

      {/* Footer */}
      <footer
        className="px-6 py-8 text-center text-xs border-t"
        style={{
          background: "hsl(40 50% 96%)",
          borderColor: "hsl(36 18% 88%)",
          color: "hsl(33 12% 45%)",
        }}
      >
        &copy; 2026 Cuoco. All rights reserved. &nbsp;·&nbsp;{" "}
        <Link href="/privacy" style={{ color: "hsl(33 39% 40%)" }}>Privacy Policy</Link>
        &nbsp;·&nbsp;{" "}
        <Link href="/terms" style={{ color: "hsl(33 39% 40%)" }}>Terms of Service</Link>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2
        className="text-xl font-medium mb-4 pb-2 border-b"
        style={{
          fontFamily: "'Newsreader', Georgia, serif",
          color: "hsl(33 16% 11%)",
          borderColor: "hsl(36 18% 88%)",
        }}
      >
        {title}
      </h2>
      <div className="text-sm leading-relaxed space-y-3" style={{ color: "hsl(33 16% 25%)" }}>
        {children}
      </div>
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3
        className="text-sm font-semibold mb-2"
        style={{ color: "hsl(33 16% 11%)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ color: "hsl(33 16% 25%)" }}>
      {children}
    </li>
  );
}
