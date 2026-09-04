import { getSiteContent } from "@/lib/content/get-content";

import { LegalPage } from "../legal-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AG Appliance Services collects, uses and protects the personal information you share when booking an appliance repair.",
  alternates: { canonical: "/privacy-policy" },
};

export default async function PrivacyPolicyPage() {
  const { settings } = await getSiteContent();
  const biz = settings.businessName;
  return (
    <LegalPage
      pill="Privacy"
      title="Privacy"
      accent="Policy"
      updated="28 August 2026"
      intro={`${biz} respects your privacy. This policy explains what personal information we collect through this website and our booking process, why we collect it, how we protect it, and the choices you have.`}
    >
      <h2>1. Who we are</h2>
      <p>
        {biz} is a home appliance repair service operating in {settings.address}
        . For anything related to this policy you can reach us at{" "}
        <a href={`mailto:${settings.email}`}>{settings.email}</a> or{" "}
        <a href={`tel:${settings.phone}`}>{settings.phone}</a>.
      </p>

      <h2>2. Information we collect</h2>
      <p>We only collect information that we need to provide our service:</p>
      <ul>
        <li>
          <b>Booking details</b> — your name, email, mobile number, service
          address (including city, state, country and zip code), the
          appliance/service type and a description of the problem, plus optional
          company and preferred date.
        </li>
        <li>
          <b>Enquiries</b> — your name, mobile number and message when you
          contact us through the website, phone or WhatsApp.
        </li>
        <li>
          <b>Technical data</b> — standard server logs (IP address, browser
          type, pages visited, time of visit) generated automatically when you
          use the site.
        </li>
        <li>
          <b>Preferences</b> — settings such as your light/dark theme choice and
          an unsent booking-form draft, stored in your own browser.
        </li>
      </ul>

      <h2>3. How we use your information</h2>
      <ul>
        <li>
          To contact you and confirm, schedule and carry out the repair you
          requested.
        </li>
        <li>
          To send service updates, quotations, invoices and warranty
          information.
        </li>
        <li>To respond to your questions and provide customer support.</li>
        <li>
          To keep the website secure, prevent misuse and diagnose technical
          problems.
        </li>
        <li>To meet our legal, accounting and tax obligations.</li>
      </ul>
      <p>
        We do not sell your personal information and we do not use it for
        automated decision-making.
      </p>

      <h2>4. Legal basis</h2>
      <p>
        We process your information to perform the service contract you request,
        with your consent (for example when you submit a form or accept optional
        cookies), and where we have a legitimate interest in running and
        protecting our business, in line with the Information Technology Act,
        2000 and the Digital Personal Data Protection Act, 2023.
      </p>

      <h2>5. Sharing your information</h2>
      <p>We share information only when necessary:</p>
      <ul>
        <li>With our technicians so they can attend your booking.</li>
        <li>
          With service providers who host our website and database or help us
          communicate with you (for example SMS/WhatsApp messaging). They act on
          our instructions only.
        </li>
        <li>
          With authorities when required by law or to protect our legal rights.
        </li>
      </ul>

      <h2>6. Data retention</h2>
      <p>
        Booking and enquiry records are kept for as long as needed to provide
        the service and honour our warranty, and afterwards for the period
        required by accounting and tax law. Server logs are retained for a
        limited time for security purposes and then deleted.
      </p>

      <h2>7. Security</h2>
      <p>
        We use encrypted connections (HTTPS), access controls and
        password-protected systems to protect your information. No method of
        transmission over the internet is completely secure, so we cannot
        guarantee absolute security, but we take reasonable steps to keep your
        data safe.
      </p>

      <h2>8. Your rights</h2>
      <p>You may ask us at any time to:</p>
      <ul>
        <li>access the personal information we hold about you;</li>
        <li>correct information that is inaccurate or incomplete;</li>
        <li>delete your information where we no longer need it;</li>
        <li>withdraw consent you previously gave;</li>
        <li>stop receiving promotional messages.</li>
      </ul>
      <p>
        To exercise these rights, contact us at{" "}
        <a href={`mailto:${settings.email}`}>{settings.email}</a>. We will
        respond within a reasonable time and may need to verify your identity
        first.
      </p>

      <h2>9. Cookies</h2>
      <p>
        Our website uses a small number of cookies and similar storage. Details,
        including how to change your choices, are in our{" "}
        <a href="/cookies-policy">Cookie Policy</a>.
      </p>

      <h2>10. Children</h2>
      <p>
        Our services are intended for adults. We do not knowingly collect
        information from anyone under 18. If you believe a minor has provided us
        information, please contact us and we will delete it.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The latest version will
        always be published on this page with the date it was last updated.
      </p>

      <h2>12. Contact</h2>
      <p>
        {biz}
        <br />
        {settings.address}
        <br />
        Phone / WhatsApp: <a href={`tel:${settings.phone}`}>{settings.phone}</a>
        <br />
        Email: <a href={`mailto:${settings.email}`}>{settings.email}</a>
      </p>
    </LegalPage>
  );
}
