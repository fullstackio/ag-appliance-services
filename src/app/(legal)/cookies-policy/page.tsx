import { getSiteContent } from "@/lib/content/get-content";

import { LegalPage } from "../legal-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "What cookies and browser storage the AG Appliance Services website uses, why, and how you can control them.",
  alternates: { canonical: "/cookies-policy" },
};

export default async function CookiesPolicyPage() {
  const { settings } = await getSiteContent();
  return (
    <LegalPage
      pill="Cookies"
      title="Cookie"
      accent="Policy"
      updated="28 August 2026"
      intro="This policy explains what cookies and similar browser storage this website uses, what they do, and how you can manage them. It should be read together with our Privacy Policy."
    >
      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small text files placed on your device by a website. Similar technologies — such
        as <i>localStorage</i> — store small pieces of information in your browser. They let a
        website remember your actions and preferences so you don&apos;t have to re-enter them on
        every visit.
      </p>

      <h2>2. How we use them</h2>
      <p>We keep our use to a minimum. The storage used by this site falls into three groups:</p>

      <h3>Necessary (always on)</h3>
      <p>Required for the website to function. They cannot be switched off.</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ag-cookie-consent</td>
            <td>Remembers the cookie choices you made in the consent bar.</td>
            <td>12 months</td>
          </tr>
          <tr>
            <td>theme</td>
            <td>Remembers whether you chose the light or dark colour scheme.</td>
            <td>Until cleared</td>
          </tr>
          <tr>
            <td>ag-booking-draft</td>
            <td>Keeps an unsent booking form so you don&apos;t lose what you typed.</td>
            <td>Until submitted or cleared</td>
          </tr>
          <tr>
            <td>Session / security</td>
            <td>Protects forms from abuse and keeps the site secure.</td>
            <td>Session</td>
          </tr>
        </tbody>
      </table>

      <h3>Analytics (optional)</h3>
      <p>
        If you allow analytics, we may use privacy-respecting measurement tools to understand how
        visitors use the site — for example which pages are popular and whether the booking form
        works well. The data is aggregated and does not identify you personally.
      </p>

      <h3>Marketing (optional)</h3>
      <p>
        If you allow marketing cookies, advertising platforms (such as Google or Meta) may set
        cookies to measure the effectiveness of our ads and to show you relevant offers. These are
        set only after you opt in.
      </p>

      <h2>3. Third-party services</h2>
      <p>
        Some features link to third parties — for example our WhatsApp chat button and Google
        Business Profile. When you use them, those providers may set their own cookies under their
        own policies. We do not control these cookies.
      </p>

      <h2>4. Your choices</h2>
      <ul>
        <li>
          <b>Consent bar</b> — when you first visit, choose &ldquo;Necessary cookies only&rdquo; or
          &ldquo;Customize settings&rdquo; to switch analytics and marketing on or off.
        </li>
        <li>
          <b>Change your mind</b> — clear this site&apos;s data in your browser settings and the
          consent bar will appear again on your next visit.
        </li>
        <li>
          <b>Browser controls</b> — every browser lets you block or delete cookies. Blocking
          necessary storage may stop parts of the website (like the theme or booking form) from
          working properly.
        </li>
      </ul>

      <h2>5. Changes to this policy</h2>
      <p>
        We may update this policy when we add or remove tools. The date at the top shows when it was
        last revised.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about cookies: <a href={`mailto:${settings.email}`}>{settings.email}</a>
      </p>
    </LegalPage>
  );
}
