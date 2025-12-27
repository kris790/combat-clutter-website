import type { Metadata } from 'next';
import { BRAND } from '@/lib/brand/constants';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Meet the ${BRAND.name} team. Professional organizers dedicated to creating calm, functional spaces for ${BRAND.location.city} homeowners.`,
};

const values = [
  {
    title: 'No Judgment',
    description: 'We understand life gets messy. We approach every space with compassion, not criticism.',
    icon: '💚',
  },
  {
    title: 'Lasting Systems',
    description: 'Quick fixes don\'t work. We create sustainable systems tailored to how you actually live.',
    icon: '🔄',
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees, no surprises. You\'ll know exactly what to expect before we begin.',
    icon: '💎',
  },
  {
    title: 'White-Glove Service',
    description: 'Every detail matters. From product selection to label placement, we handle it all.',
    icon: '✨',
  },
];

const certifications = [
  'Certified Professional Organizer (CPO)',
  'NAPO Member',
  'Insured & Bonded',
  'Background Checked',
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-20 text-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold sm:text-5xl md:text-6xl">
              About {BRAND.name}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-secondary/80">
              {BRAND.tagline}. We&apos;re on a mission to bring calm and 
              functionality to homes across {BRAND.location.metro}.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image Placeholder */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="mx-auto h-16 w-16 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <p className="mt-2 text-neutral-500">Founder Photo</p>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                Our Story
              </span>
              <h2 className="mt-2 font-serif text-3xl font-bold text-primary sm:text-4xl">
                From Chaos to Calm
              </h2>
              <div className="mt-6 space-y-4 text-neutral-600">
                <p>
                  {BRAND.name} was born from a simple realization: our spaces 
                  profoundly impact our mental well-being. When our homes are 
                  cluttered, our minds follow suit.
                </p>
                <p>
                  After years of helping friends and family transform their spaces, 
                  I realized this wasn&apos;t just a hobby—it was a calling. In 2023, 
                  I founded {BRAND.name} to bring professional organization 
                  services to {BRAND.location.city} homeowners who value their 
                  time and peace of mind.
                </p>
                <p>
                  Today, we&apos;ve helped dozens of families reclaim their homes and 
                  their calm. Every project reminds us why we do this work: that 
                  moment when a client walks into their newly organized space and 
                  takes a deep breath of relief.
                </p>
                <p className="font-medium text-primary">
                  That moment? That&apos;s everything.
                </p>
              </div>
              <div className="mt-8">
                <p className="font-serif text-xl text-primary">
                  — The {BRAND.name} Team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
              Our Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
              These principles guide everything we do at {BRAND.name}.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <span className="text-4xl">{value.icon}</span>
                <h3 className="mt-4 font-serif text-xl font-bold text-primary">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
                Why Trust {BRAND.name}?
              </h2>
              <p className="mt-4 text-neutral-600">
                Your home is your sanctuary. We take that responsibility seriously. 
                Here&apos;s what sets us apart:
              </p>
              <ul className="mt-8 space-y-4">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-center gap-3">
                    <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-primary">{cert}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/contact">Get to Know Us</Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8">
              <div className="rounded-2xl bg-primary p-8 text-center text-secondary">
                <p className="font-serif text-4xl font-bold">50+</p>
                <p className="mt-2 text-sm text-secondary/70">Projects Completed</p>
              </div>
              <div className="rounded-2xl bg-accent p-8 text-center text-primary">
                <p className="font-serif text-4xl font-bold">100%</p>
                <p className="mt-2 text-sm text-primary/70">Client Satisfaction</p>
              </div>
              <div className="rounded-2xl bg-accent p-8 text-center text-primary">
                <p className="font-serif text-4xl font-bold">500+</p>
                <p className="mt-2 text-sm text-primary/70">Hours of Organizing</p>
              </div>
              <div className="rounded-2xl bg-primary p-8 text-center text-secondary">
                <p className="font-serif text-4xl font-bold">2023</p>
                <p className="mt-2 text-sm text-secondary/70">Founded</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-secondary">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold sm:text-4xl">
            Let&apos;s Create Your Calm
          </h2>
          <p className="mt-4 text-secondary/80">
            Ready to transform your space? We&apos;d love to hear from you.
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
