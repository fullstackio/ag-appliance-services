import { getSiteContent } from "@/lib/content/get-content";

import { LegalPage } from "../legal-page";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for booking appliance repair services from AG Appliance Services in Kolkata: bookings, charges, warranty and liability.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default async function TermsPage() {
  const { settings } = await getSiteContent();
  const biz = settings.businessName;
  return (
    <LegalPage
      pill="Terms"
      title="Terms &"
      accent="Conditions"
      updated="28 August 2026"
      intro={`These terms govern your use of this website and any appliance repair, installation or maintenance service you book from ${biz}. By booking a service you agree to them.`}
    >
      <h2>1. Our services</h2>
      <p>
        {biz} provides doorstep repair, servicing and installation of home appliances — including
        air conditioners, refrigerators, geysers, microwave ovens, mixer grinders, induction
        cooktops and appliance PCB / electrical faults — within our service areas in and around
        Kolkata. Services outside these areas are at our discretion.
      </p>

      <h2>2. Bookings</h2>
      <ul>
        <li>
          A booking request made online, by phone or WhatsApp is confirmed only when we contact you
          and agree a visit time.
        </li>
        <li>
          Please provide accurate contact details and address, ensure an adult is present during the
          visit, and give our technician safe access to the appliance.
        </li>
        <li>
          Same-day service depends on technician availability and the time of booking; we will
          always tell you the earliest slot we can offer.
        </li>
      </ul>

      <h2>3. Inspection and charges</h2>
      <ul>
        <li>
          A visit / inspection charge applies for the technician&apos;s visit and diagnosis. If you
          proceed with the repair, this charge is adjusted against the final bill.
        </li>
        <li>
          Before any repair begins, the technician will explain the fault and give you a quotation
          covering labour and any spare parts. Work starts only after your approval.
        </li>
        <li>
          Prices quoted are inclusive of applicable taxes unless stated otherwise. Payment is due on
          completion, by cash, UPI or bank transfer.
        </li>
      </ul>

      <h2>4. Spare parts</h2>
      <p>
        We use genuine or OEM-grade spare parts wherever available and tell you the part details
        before replacement. Replaced parts are returned to you on request. Parts ordered specially
        for your appliance may require an advance and cannot be returned once fitted.
      </p>

      <h2>5. Service warranty</h2>
      <ul>
        <li>
          Repairs carry a 90-day service warranty covering the specific fault repaired and the parts
          we supplied, from the date of service.
        </li>
        <li>
          The warranty does not cover unrelated faults, normal wear, consumables, physical damage,
          power-supply or voltage problems, water damage, pest damage, or any work done by a third
          party after our repair.
        </li>
        <li>
          Gas charging for air conditioners and refrigerators is warranted against workmanship only;
          leaks arising from pre-existing corrosion or damage are not covered.
        </li>
      </ul>

      <h2>6. Cancellations and rescheduling</h2>
      <p>
        You may cancel or reschedule a booking free of charge before the technician is dispatched.
        If a technician has already reached your location, the visit charge applies.
      </p>

      <h2>7. Customer responsibilities</h2>
      <ul>
        <li>Disclose any previous repairs, known faults or safety hazards.</li>
        <li>Back up or remove personal items from around the appliance before the visit.</li>
        <li>Ensure a stable power supply and working earthing at the premises.</li>
      </ul>

      <h2>8. Limitation of liability</h2>
      <p>
        We take care to carry out every job professionally. To the extent permitted by law, our
        liability for any claim arising from a service is limited to the amount you paid for that
        service. We are not liable for indirect losses such as loss of food, business or income, or
        for pre-existing damage and defects in the appliance.
      </p>

      <h2>9. Use of this website</h2>
      <ul>
        <li>
          Content on this website is provided for general information and may change without notice.
        </li>
        <li>
          You must not misuse the website — for example by submitting false bookings, attempting to
          gain unauthorised access, or scraping content.
        </li>
        <li>
          All text, images, logos and design elements are the property of {biz} or their respective
          owners and may not be reproduced without permission. Brand names shown are trademarks of
          their owners and indicate the appliances we service; we are an independent service
          provider unless stated otherwise.
        </li>
      </ul>

      <h2>10. Privacy</h2>
      <p>
        Personal information you provide is handled in accordance with our{" "}
        <a href="/privacy-policy">Privacy Policy</a> and <a href="/cookies-policy">Cookie Policy</a>
        .
      </p>

      <h2>11. Governing law and disputes</h2>
      <p>
        These terms are governed by the laws of India. Any dispute will first be addressed through
        good-faith discussion with us; failing that, it is subject to the jurisdiction of the courts
        at Kolkata, West Bengal.
      </p>

      <h2>12. Changes</h2>
      <p>
        We may revise these terms from time to time. The version published on this page at the time
        of your booking applies to that booking.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${settings.email}`}>{settings.email}</a> ·{" "}
        <a href={`tel:${settings.phone}`}>{settings.phone}</a>
      </p>
    </LegalPage>
  );
}
