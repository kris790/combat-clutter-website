import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand/constants';
import { PricingTiers } from '@/components/sections/PricingTiers';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services',
  description: `Discover ${BRAND.name}'s bespoke organizing services: Focused Space, Multi-Room, and Whole-Home solutions. Transparent pricing starting at $1,800. Serving ${BRAND.location.display}.`,
};

const services = [
  {
    id: 'residential',
    name: 'Residential Organization',
    description: 'Transform your living spaces into calm, functional havens.',
    details: [
      'Whole-home organization systems',
      'Kitchen & pantry optimization',
      'Closet & wardrobe curation',
      'Garage & storage solutions',
      'Kids rooms & playrooms',
      'Home office setup',
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    id: 'move-support',
    name: 'Move Support',
    description: 'Make your transition seamless with expert packing and unpacking.',
    details: [
      'Pre-move decluttering',
      'Strategic packing & labeling',
      'Unpacking & placement',
      'New home setup systems',
      'Donation coordination',
      'Estate cleanouts',
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    id: 'virtual',
    name: 'Virtual Consulting',
    description: 'Get expert guidance from the comfort of your home.',
    details: [
      'Video assessment calls',
      'Customized action plans',
      'Product recommendations',
      'DIY guidance & coaching',
      'Follow-up support',
      'Perfect for out-of-area clients',
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
];

const process = [
  {
    step: 1,
    title: 'Discovery Call',
    description: 'We start with a free 15-minute call to understand your goals, challenges, and vision for your space.',
  },
  {
    step: 2,
    title: 'In-Home Assessment',
    description: 'We visit your home to evaluate the scope, take measurements, and create a detailed proposal with transparent pricing.',
  },
  {
    step: 3,
    title: 'Transform',
    description: 'Our team arrives with supplies, systems, and solutions. We declutter, organize, and install custom solutions.',
  },
  {
    step: 4,
    title: 'Maintain',
    description: 'We provide follow-up support to ensure your systems stick. Ongoing maintenance packages available.',
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-20 text-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold sm:text-5xl md:text-6xl">
              Our Services
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-secondary/80">
              Bespoke organization solutions tailored to your lifestyle. 
              {BRAND.name} brings calm and order to homes across {BRAND.location.metro}.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent">
                  {service.icon}
                </div>
                <h2 className="font-serif text-2xl font-bold text-primary">
                  {service.name}
                </h2>
                <p className="mt-2 text-neutral-600">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {service.details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-neutral-600">
                      <svg className="h-4 w-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              Our Proven Process
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
              A streamlined approach that respects your time and delivers lasting results.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {process.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-xl font-bold text-primary">
                  {item.step}
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingTiers />

      {/* FAQ Section */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-serif text-3xl font-bold text-primary sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-6">
            <details className="group rounded-lg bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-primary">
                How long does a typical project take?
                <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-neutral-600">
                Project duration varies by scope. A single room (Focused Space) typically takes 4-8 hours over 1-2 days. 
                Multi-room projects span 3-5 days, while whole-home transformations require 2-4 weeks.
              </p>
            </details>
            <details className="group rounded-lg bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-primary">
                Do I need to be home during the project?
                <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-neutral-600">
                We recommend being present for the first session to make decisions about items. 
                After that, many clients provide access and let us work independently.
              </p>
            </details>
            <details className="group rounded-lg bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-primary">
                What happens to items I no longer want?
                <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-neutral-600">
                We help coordinate donations to local charities, schedule pickups, and can arrange 
                consignment for high-value items. Disposal of remaining items is also available.
              </p>
            </details>
            <details className="group rounded-lg bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-primary">
                Are organizing products included in the price?
                <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-neutral-600">
                Products are billed separately at cost + 15%. We provide a detailed product list 
                for approval before purchasing. You&apos;re welcome to source items yourself if preferred.
              </p>
            </details>
            <details className="group rounded-lg bg-white p-6 shadow-sm">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-primary">
                Do you serve areas outside {BRAND.location.city}?
                <span className="ml-2 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-4 text-neutral-600">
                We serve clients within {BRAND.location.serviceRadius}. For clients further away, 
                we offer virtual consulting services with personalized action plans.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-secondary">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">
            Ready to Reclaim Your Space?
          </h2>
          <p className="mt-4 text-secondary/80">
            Book a free consultation and take the first step toward a calmer, 
            more organized home.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="accent">
              <Link href="/contact">Book Your Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
