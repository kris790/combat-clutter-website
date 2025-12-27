import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${BRAND.legal}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <main className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-primary">
          Privacy Policy
        </h1>
        <p className="mt-4 text-neutral-600">
          Last updated: December {currentYear}
        </p>

        <div className="prose prose-neutral mt-12 max-w-none">
          <h2 className="font-serif text-2xl font-bold text-primary">
            1. Introduction
          </h2>
          <p className="text-neutral-600">
            {BRAND.legal} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is 
            committed to protecting your personal information. This Privacy Policy 
            explains how we collect, use, disclose, and safeguard your information 
            when you visit our website or use our services.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            2. Information We Collect
          </h2>
          <h3 className="mt-4 font-serif text-xl font-bold text-primary">
            Personal Information
          </h3>
          <p className="text-neutral-600">
            We may collect personal information that you voluntarily provide when you:
          </p>
          <ul className="list-disc pl-6 text-neutral-600">
            <li>Fill out our contact or consultation request form</li>
            <li>Subscribe to our newsletter</li>
            <li>Communicate with us via email or phone</li>
            <li>Use our services</li>
          </ul>
          <p className="text-neutral-600">
            This information may include your name, email address, phone number, 
            home address, and details about your organizing needs.
          </p>

          <h3 className="mt-4 font-serif text-xl font-bold text-primary">
            Automatically Collected Information
          </h3>
          <p className="text-neutral-600">
            When you visit our website, we may automatically collect certain information, 
            including your IP address, browser type, operating system, referring URLs, 
            and information about how you interact with our website.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            3. How We Use Your Information
          </h2>
          <p className="text-neutral-600">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-neutral-600">
            <li>Respond to your inquiries and schedule consultations</li>
            <li>Provide and improve our home organization services</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Analyze website usage to improve user experience</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            4. Information Sharing
          </h2>
          <p className="text-neutral-600">
            We do not sell, trade, or rent your personal information to third parties. 
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 text-neutral-600">
            <li>Service providers who assist in our operations (e.g., CRM systems, email services)</li>
            <li>Professional advisors (lawyers, accountants) as necessary</li>
            <li>Law enforcement or government agencies when required by law</li>
          </ul>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            5. Data Security
          </h2>
          <p className="text-neutral-600">
            We implement appropriate technical and organizational measures to protect 
            your personal information against unauthorized access, alteration, disclosure, 
            or destruction. However, no method of transmission over the Internet is 
            100% secure.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            6. Your Rights
          </h2>
          <p className="text-neutral-600">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-neutral-600">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent where applicable</li>
          </ul>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            7. Cookies
          </h2>
          <p className="text-neutral-600">
            Our website uses cookies and similar tracking technologies to enhance 
            your browsing experience and analyze website traffic. You can control 
            cookie preferences through your browser settings.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            8. Third-Party Links
          </h2>
          <p className="text-neutral-600">
            Our website may contain links to third-party websites. We are not 
            responsible for the privacy practices of these external sites.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            9. Children&apos;s Privacy
          </h2>
          <p className="text-neutral-600">
            Our services are not directed to individuals under 18 years of age. 
            We do not knowingly collect personal information from children.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            10. Changes to This Policy
          </h2>
          <p className="text-neutral-600">
            We may update this Privacy Policy from time to time. We will notify 
            you of any changes by posting the new policy on this page and updating 
            the &quot;Last updated&quot; date.
          </p>

          <h2 className="mt-8 font-serif text-2xl font-bold text-primary">
            11. Contact Us
          </h2>
          <p className="text-neutral-600">
            If you have any questions about this Privacy Policy, please contact us at:
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
