import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${BRAND.legal}. Read our terms and conditions for using our website and services.`,
};

export default function TermsPage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <main className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-primary">
          Terms of Service
        </h1>
        <p className="mt-4 text-neutral-600">
          Last updated: December {currentYear}
        </p>

        <div className="prose prose-neutral mt-12 max-w-none">
          <h2 className="font-serif text-2xl font-bold text-primary">
            1. Agreement to Terms
          </h2>
          <p className="text-neutral-600">
            By accessing or using the website and services of {BRAND.legal} 
            (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these 
            Terms of Service. If you do not agree to these terms, please do not 
            use our website or services.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            2. Description of Services
          </h2>
          <p className="text-neutral-600">
            {BRAND.legal} provides professional home organization services in the 
            {BRAND.location.metro} area. Our services include but are not limited to:
          </p>
          <ul className="list-disc pl-6 text-neutral-600">
            <li>Residential organization (closets, kitchens, offices, etc.)</li>
            <li>Move support (packing, unpacking, new home setup)</li>
            <li>Virtual consulting services</li>
            <li>Donation and disposal coordination</li>
          </ul>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            3. Service Area
          </h2>
          <p className="text-neutral-600">
            We provide in-person services within {BRAND.location.serviceRadius}. 
            Virtual consulting is available to clients outside this area.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            4. Pricing and Payment
          </h2>
          <p className="text-neutral-600">
            Pricing for our services is provided as estimates on our website. 
            Final pricing is determined after an in-home assessment and depends on:
          </p>
          <ul className="list-disc pl-6 text-neutral-600">
            <li>Scope and complexity of the project</li>
            <li>Number of hours required</li>
            <li>Product and supply costs</li>
            <li>Travel distance</li>
          </ul>
          <p className="text-neutral-600">
            A detailed written estimate will be provided before any work begins. 
            Payment terms will be outlined in your service agreement.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            5. Cancellation Policy
          </h2>
          <p className="text-neutral-600">
            We require at least 48 hours notice for cancellations or rescheduling. 
            Cancellations with less than 48 hours notice may be subject to a 
            cancellation fee equal to 50% of the scheduled session cost.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            6. Client Responsibilities
          </h2>
          <p className="text-neutral-600">
            As a client, you agree to:
          </p>
          <ul className="list-disc pl-6 text-neutral-600">
            <li>Provide accurate information about your organizing needs</li>
            <li>Be present or available for decision-making during sessions (as agreed)</li>
            <li>Ensure a safe working environment for our team</li>
            <li>Make timely decisions about items to keep, donate, or discard</li>
            <li>Secure valuables and sensitive documents</li>
          </ul>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            7. Liability Limitations
          </h2>
          <p className="text-neutral-600">
            While we take great care with your belongings, {BRAND.legal} is not 
            responsible for:
          </p>
          <ul className="list-disc pl-6 text-neutral-600">
            <li>Pre-existing damage to items</li>
            <li>Items disposed of or donated with client approval</li>
            <li>Sentimental value of items</li>
            <li>Damage caused by third-party movers or service providers</li>
          </ul>
          <p className="text-neutral-600">
            Our liability is limited to the cost of services provided. We carry 
            general liability insurance for your protection.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            8. Confidentiality
          </h2>
          <p className="text-neutral-600">
            We respect your privacy and maintain confidentiality regarding your 
            home, belongings, and personal information. We will not share details 
            about your project without your express written consent.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            9. Photography and Testimonials
          </h2>
          <p className="text-neutral-600">
            With your permission, we may photograph completed projects for our 
            portfolio. You will be asked to sign a separate photo release form. 
            All identifying information will be kept confidential unless you 
            provide written consent.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            10. Intellectual Property
          </h2>
          <p className="text-neutral-600">
            All content on this website, including text, images, logos, and 
            graphics, is the property of {BRAND.legal} and is protected by 
            copyright laws. You may not reproduce, distribute, or create 
            derivative works without our written permission.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            11. Website Use
          </h2>
          <p className="text-neutral-600">
            You agree not to:
          </p>
          <ul className="list-disc pl-6 text-neutral-600">
            <li>Use our website for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Submit false or misleading information</li>
            <li>Interfere with the proper functioning of the website</li>
          </ul>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            12. Dispute Resolution
          </h2>
          <p className="text-neutral-600">
            Any disputes arising from these terms or our services shall be 
            resolved through good-faith negotiation. If a resolution cannot be 
            reached, disputes will be subject to binding arbitration in 
            {BRAND.location.city}, {BRAND.location.stateFull}.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            13. Governing Law
          </h2>
          <p className="text-neutral-600">
            These Terms of Service are governed by the laws of the State of 
            {BRAND.location.stateFull}, without regard to conflict of law principles.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            14. Changes to Terms
          </h2>
          <p className="text-neutral-600">
            We reserve the right to modify these terms at any time. Changes will 
            be effective immediately upon posting to the website. Your continued 
            use of our services constitutes acceptance of modified terms.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            15. Contact Information
          </h2>
          <p className="text-neutral-600">
            For questions about these Terms of Service, please contact us at:
          </p>
          <p className="text-neutral-600">
            <strong>{BRAND.legal}</strong><br />
            Email: {BRAND.contact.email}<br />
            Phone: {BRAND.contact.phone}<br />
            {BRAND.location.city}, {BRAND.location.state}
          </p>
        </div>
      </div>
    </main>
  );
}
