import { Link } from "wouter";
import markPath from "@assets/cuoco-mark-1024-transparent_(1)_1777737495347.png";

export default function Privacy() {
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
        <p
          className="text-xs tracking-[0.3em] uppercase font-medium mb-4"
          style={{ color: "hsl(33 39% 40%)" }}
        >
          Legal
        </p>
        <h1
          className="text-4xl md:text-5xl mb-2"
          style={{
            fontFamily: "'Newsreader', Georgia, serif",
            fontWeight: 400,
            color: "hsl(33 16% 11%)",
          }}
        >
          Privacy Policy
        </h1>
        <p className="text-sm mb-12" style={{ color: "hsl(33 12% 50%)" }}>
          Last updated: 22 July 2026
        </p>

        <div
          className="flex flex-col gap-10 text-sm leading-relaxed"
          style={{ color: "hsl(33 12% 30%)" }}
        >
          {/* Section */}
          <Section title="1. Who We Are">
            <p>Cuoco is operated by Mark Berry, a sole trader based in the United Kingdom.</p>
            <p className="mt-3">If you have any questions about this Privacy Policy or how we handle your data, please contact us at:</p>
            <p className="mt-3">
              <strong style={{ color: "hsl(33 16% 11%)" }}>Email:</strong>{" "}
              <a href="mailto:hello@get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>hello@get-cuoco.app</a>
              <br />
              <strong style={{ color: "hsl(33 16% 11%)" }}>Website:</strong>{" "}
              <a href="https://www.get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>www.get-cuoco.app</a>
            </p>
            <p className="mt-3">References to "we", "us", or "our" in this policy refer to Mark Berry trading as Cuoco.</p>
          </Section>

          <Section title="2. What This Policy Covers">
            <p>This Privacy Policy explains what personal data we collect when you use the Cuoco app, why we collect it, how we use it, and what rights you have over it.</p>
            <p className="mt-3">Cuoco is an AI-powered recipe management app that allows you to import, organise, and cook recipes using your voice. To provide these features, we work with a number of third-party services, each described below.</p>
          </Section>

          <Section title="3. Data We Collect and Why">
            <SubSection title="3.1 Account Information">
              <p>When you create an account, we collect:</p>
              <ul className="mt-3 flex flex-col gap-2">
                <BulletItem><strong style={{ color: "hsl(33 16% 11%)" }}>Email address</strong> — used to identify your account, communicate with you about your subscription, and provide account recovery. If you sign in with Apple and choose to hide your email, Apple provides a private relay address instead of your real address. We store whichever address Apple or Google provides and use it solely for account management purposes.</BulletItem>
                <BulletItem><strong style={{ color: "hsl(33 16% 11%)" }}>User ID</strong> — a unique identifier assigned by our authentication provider (Supabase) to link your data securely.</BulletItem>
              </ul>
              <Legal>Contract — necessary to provide the service you have signed up for.</Legal>
            </SubSection>

            <SubSection title="3.2 Recipe Data">
              <p>Recipes you import, create, or edit are stored securely in our database. This includes recipe titles, ingredients, steps, nutritional information, notes, and any metadata (cuisine type, meal type, dietary flags). This data belongs to you and is used solely to power your Cuoco experience.</p>
              <Legal>Contract — necessary to provide core app functionality.</Legal>
            </SubSection>

            <SubSection title="3.3 Usage and Billing Data">
              <p>To manage your subscription tier and enforce fair usage limits, we collect:</p>
              <ul className="mt-3 flex flex-col gap-2">
                <BulletItem>Your current subscription tier (Trial, Cuoco Pro, Cuoco Premium, or Admin)</BulletItem>
                <BulletItem>Monthly AI usage costs and counts (recipe imports, voice assistant calls, cook mode sessions)</BulletItem>
                <BulletItem>Trial start and end dates</BulletItem>
                <BulletItem>Subscription expiry dates</BulletItem>
              </ul>
              <p className="mt-3">This data is used to determine what features you can access and to display your usage in the app's Settings screen. It is not shared with third parties except as necessary to process your subscription (see Section 5).</p>
              <Legal>Contract — necessary to enforce the subscription terms you have agreed to.</Legal>
            </SubSection>

            <SubSection title="3.4 Device Information">
              <p>When you use Cuoco, we collect limited device information to help us understand how the app is being used and to detect misuse:</p>
              <ul className="mt-3 flex flex-col gap-2">
                <BulletItem>Device model and operating system version</BulletItem>
                <BulletItem>App version</BulletItem>
                <BulletItem>A hashed device identifier (we do not store your raw device ID)</BulletItem>
                <BulletItem>Approximate country and city (derived from IP address at the time of first use; IP address itself is stored as a hash and is not retained in readable form)</BulletItem>
              </ul>
              <Legal>Legitimate interests — to maintain the security and integrity of our service and prevent abuse of the free trial.</Legal>
            </SubSection>

            <SubSection title="3.5 Voice and AI Interactions">
              <p>Recipe import (from a photo, link, or pasted text) and the voice assistant are optional AI-powered features, turned off by default. Before you can use them, we explain what data is sent and to whom, and ask for your explicit permission — either during onboarding or the first time you try to use one of these features. You can turn this on or off at any time in Settings.</p>
              <p className="mt-3">When these features are enabled and you use them, your input is processed by our AI providers (see Section 5). Specifically:</p>
              <ul className="mt-3 flex flex-col gap-2">
                <BulletItem>Voice recordings are sent to OpenAI to be transcribed, and are then discarded — we do not store audio files</BulletItem>
                <BulletItem>Recipe text, URLs, and photos submitted for import are sent to OpenAI for processing and are not retained by us beyond what is returned as a recipe</BulletItem>
                <BulletItem>Cook Mode and voice assistant queries are sent to OpenAI for processing; spoken responses are sent to ElevenLabs to generate speech; we do not store the content of these conversations</BulletItem>
              </ul>
              <Legal>Consent — these features only operate once you have given explicit permission, which you may withdraw at any time via Settings.</Legal>
            </SubSection>

            <SubSection title="3.6 Error Logs">
              <p>When an AI feature fails (e.g. a recipe import error), we log structured error information including the endpoint, error code, and response time. This helps us diagnose and fix problems. Logs do not contain the content of your request.</p>
              <Legal>Legitimate interests — to maintain and improve the reliability of our service.</Legal>
            </SubSection>
          </Section>

          <Section title="4. Data We Do Not Collect">
            <p>We do not collect:</p>
            <ul className="mt-3 flex flex-col gap-2">
              <BulletItem>Payment card details (handled entirely by Apple; we never see your payment information)</BulletItem>
              <BulletItem>Precise location data</BulletItem>
              <BulletItem>Contacts, photos, or camera access beyond images you explicitly submit for recipe import</BulletItem>
              <BulletItem>Browsing history or data from other apps</BulletItem>
              <BulletItem>Any data from users under 13 years of age (the app is not directed at children)</BulletItem>
            </ul>
          </Section>

          <Section title="5. Third-Party Services">
            <p>To provide Cuoco, we share data with the following third-party services. Each is contractually obligated to handle your data securely and in accordance with applicable law.</p>
            <div className="mt-6 flex flex-col gap-6">
              {[
                { name: "Supabase", role: "Database and authentication provider", data: "Email address, user ID, recipes, preferences, usage data, device data", location: "United Kingdom (London, eu-west-2)", url: "https://supabase.com/privacy" },
                { name: "OpenAI", role: "AI processing for recipe import, voice transcription, cook mode, and the voice assistant (only when AI Features are enabled — see Section 3.5)", data: "Recipe text, URLs, photos submitted for import; voice transcriptions; voice assistant queries", location: "United States (OpenAI is subject to Standard Contractual Clauses for EU/UK data transfers)", url: "https://openai.com/privacy" },
                { name: "ElevenLabs", role: "Text-to-speech voice synthesis for the voice assistant and Cook Mode (only when AI Features are enabled — see Section 3.5)", data: "Text strings sent for audio synthesis (recipe steps, assistant responses)", location: "United States", url: "https://elevenlabs.io/privacy" },
                { name: "RevenueCat", role: "Subscription management and in-app purchase tracking", data: "User ID, email address, subscription status, purchase events", location: "United States", url: "https://www.revenuecat.com/privacy" },
                { name: "Apple", role: "Payment processing (App Store), Sign In with Apple authentication", data: "Apple manages payments directly — we receive only subscription status events via RevenueCat. For Sign In with Apple, Apple provides us with your email address or a private relay address at your choice.", location: "United States", url: "https://www.apple.com/legal/privacy" },
                { name: "Google", role: "Sign In with Google authentication", data: "Google provides us with your email address at sign-in. We store this solely for account identification and management.", location: "United States", url: "https://policies.google.com/privacy" },
              ].map((p) => (
                <div
                  key={p.name}
                  className="rounded-xl p-5"
                  style={{ background: "hsl(38 33% 91%)", border: "1px solid hsl(36 18% 84%)" }}
                >
                  <p className="font-medium mb-1" style={{ color: "hsl(33 16% 11%)", fontFamily: "'Newsreader', serif", fontSize: "1rem" }}>{p.name}</p>
                  <p className="mb-2"><strong style={{ color: "hsl(33 16% 25%)" }}>Role:</strong> {p.role}</p>
                  <p className="mb-2"><strong style={{ color: "hsl(33 16% 25%)" }}>Data shared:</strong> {p.data}</p>
                  <p className="mb-2"><strong style={{ color: "hsl(33 16% 25%)" }}>Location:</strong> {p.location}</p>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "hsl(33 39% 40%)" }}>Privacy policy →</a>
                </div>
              ))}
            </div>
          </Section>

          <Section title="6. Subscriptions and Payments">
            <p>All payments are processed by Apple through the App Store. We do not receive, store, or process your payment card details at any point.</p>
            <p className="mt-3">When you purchase a subscription, Apple notifies us via RevenueCat of the subscription status (active, cancelled, expired, etc.). We use this information to unlock the appropriate features in Cuoco.</p>
            <p className="mt-3">If you cancel your subscription, your access continues until the end of the paid period. After that point, your account reverts to an expired trial state and you will be asked to resubscribe to continue using AI features.</p>
          </Section>

          <Section title="7. Data Retention">
            <p>We retain your data for the following periods:</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ background: "hsl(38 33% 88%)" }}>
                    <th className="text-left px-4 py-3 rounded-tl-lg" style={{ color: "hsl(33 16% 11%)" }}>Data type</th>
                    <th className="text-left px-4 py-3 rounded-tr-lg" style={{ color: "hsl(33 16% 11%)" }}>Retention period</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Account data (email, preferences)", "For the lifetime of your account"],
                    ["Recipe data", "For the lifetime of your account"],
                    ["Usage and billing records", "7 years (UK legal and tax requirements)"],
                    ["Device information", "12 months from last activity"],
                    ["Error logs", "90 days"],
                    ["Voice recordings", "Not retained — discarded after transcription"],
                  ].map(([type, period], i) => (
                    <tr key={type} style={{ background: i % 2 === 0 ? "hsl(38 33% 91%)" : "hsl(38 33% 94%)" }}>
                      <td className="px-4 py-3">{type}</td>
                      <td className="px-4 py-3">{period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4">When you request account deletion (see Section 9), we will delete your account data and recipes within 30 days. Usage and billing records are retained for 7 years as required by law.</p>
          </Section>

          <Section title="8. Data Transfers Outside the UK">
            <p>Some of our third-party service providers are based in the United States. Where we transfer your personal data outside the UK, we ensure appropriate safeguards are in place, including:</p>
            <ul className="mt-3 flex flex-col gap-2">
              <BulletItem>Standard Contractual Clauses (SCCs) approved by the UK Information Commissioner's Office</BulletItem>
              <BulletItem>UK adequacy decisions where applicable</BulletItem>
            </ul>
            <p className="mt-3">If you would like more information about the specific safeguards in place for any transfer, please contact us at <a href="mailto:hello@get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>hello@get-cuoco.app</a>.</p>
          </Section>

          <Section title="9. Your Rights">
            <p>Under UK GDPR, you have the following rights regarding your personal data:</p>
            <ul className="mt-3 flex flex-col gap-2">
              <BulletItem><strong style={{ color: "hsl(33 16% 11%)" }}>Right of access</strong> — you can request a copy of the data we hold about you</BulletItem>
              <BulletItem><strong style={{ color: "hsl(33 16% 11%)" }}>Right to rectification</strong> — you can ask us to correct inaccurate data</BulletItem>
              <BulletItem><strong style={{ color: "hsl(33 16% 11%)" }}>Right to erasure</strong> — you can ask us to delete your data (subject to legal retention requirements)</BulletItem>
              <BulletItem><strong style={{ color: "hsl(33 16% 11%)" }}>Right to restriction</strong> — you can ask us to limit how we use your data</BulletItem>
              <BulletItem><strong style={{ color: "hsl(33 16% 11%)" }}>Right to data portability</strong> — you can ask for your data in a machine-readable format</BulletItem>
              <BulletItem><strong style={{ color: "hsl(33 16% 11%)" }}>Right to object</strong> — you can object to processing based on legitimate interests</BulletItem>
              <BulletItem><strong style={{ color: "hsl(33 16% 11%)" }}>Rights related to automated decision-making</strong> — Cuoco does not make solely automated decisions that have legal or significant effects on you</BulletItem>
            </ul>
            <p className="mt-4">To exercise any of these rights, please contact us at <a href="mailto:hello@get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>hello@get-cuoco.app</a>. We will respond within 30 days.</p>
            <p className="mt-3">You also have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: "hsl(33 39% 40%)" }}>ico.org.uk</a> if you believe we have not handled your data correctly.</p>
            <SubSection title="Account Deletion">
              <p>To request deletion of your account and associated data, please email <a href="mailto:hello@get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>hello@get-cuoco.app</a> with the subject line "Account Deletion Request" and the email address associated with your account. We will process your request within 30 days.</p>
            </SubSection>
          </Section>

          <Section title="10. Notifications">
            <p>We may in future send you notifications relating to your account, such as reminders that your free trial is nearing its end. You can control notification permissions at any time via your device's Settings app. We will always ask for your permission before sending notifications.</p>
            <p className="mt-3">We do not currently send marketing emails. If we introduce email marketing in future, we will obtain your explicit consent before doing so.</p>
          </Section>

          <Section title="11. Children's Privacy">
            <p>Cuoco is not directed at children under the age of 13. We do not knowingly collect personal data from children under 13. If you believe a child under 13 has provided us with personal data, please contact us at <a href="mailto:hello@get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>hello@get-cuoco.app</a> and we will delete it promptly.</p>
          </Section>

          <Section title="12. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. If the changes are significant, we will notify you through the app or by email. Your continued use of Cuoco after changes are posted constitutes your acceptance of the updated policy.</p>
          </Section>

          <Section title="13. Contact Us">
            <p>If you have any questions, concerns, or requests relating to this Privacy Policy or your personal data, please contact us:</p>
            <p className="mt-3">
              <strong style={{ color: "hsl(33 16% 11%)" }}>Email:</strong>{" "}
              <a href="mailto:hello@get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>hello@get-cuoco.app</a>
              <br />
              <strong style={{ color: "hsl(33 16% 11%)" }}>Website:</strong>{" "}
              <a href="https://www.get-cuoco.app" style={{ color: "hsl(33 39% 40%)" }}>www.get-cuoco.app</a>
            </p>
            <p className="mt-3">We aim to respond to all enquiries within 5 business days.</p>
          </Section>

          <p className="mt-4 italic" style={{ color: "hsl(33 12% 50%)" }}>
            This policy was written in plain English and is intended to be easy to understand. If anything is unclear, please get in touch.
          </p>
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
        className="text-xl mb-4 pb-3 border-b"
        style={{
          fontFamily: "'Newsreader', Georgia, serif",
          fontWeight: 400,
          color: "hsl(33 16% 11%)",
          borderColor: "hsl(36 18% 84%)",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3
        className="text-base mb-3"
        style={{
          fontFamily: "'Newsreader', Georgia, serif",
          fontWeight: 500,
          color: "hsl(33 16% 20%)",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span
        className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full"
        style={{ background: "hsl(33 39% 40%)" }}
      />
      <span>{children}</span>
    </li>
  );
}

function Legal({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-4 text-xs px-3 py-2 rounded-lg"
      style={{
        background: "hsla(33,39%,40%,0.08)",
        color: "hsl(33 16% 35%)",
      }}
    >
      <strong>Legal basis (GDPR):</strong> {children}
    </p>
  );
}
