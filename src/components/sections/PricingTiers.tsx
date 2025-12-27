import { PRICING_TIERS, PRICING_DISCLAIMER, BRAND, COLORS } from '@/lib/brand/constants';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Check } from 'lucide-react';

/**
 * Pricing Tiers Section - Combat Clutter LLC
 *
 * Displays transparent pricing for all service tiers.
 * Key differentiator: No hidden fees, builds trust with prospects.
 *
 * Features:
 * - Three-tier pricing structure
 * - Featured tier highlighting (Multi-Room)
 * - Detailed includes list
 * - Disclaimer for transparency
 */

export function PricingTiers() {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-brand">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-heading mb-4 text-primary">
            Clear, Custom Investment
          </h2>
          <p className="text-subheading mb-12 text-neutral-600">
            Every project begins with a complimentary consultation. Below are typical 
            investment ranges—your proposal will be tailored to your specific needs, 
            space, and goals.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                'relative flex flex-col rounded-2xl border p-8 transition-all duration-300',
                tier.featured
                  ? 'border-accent bg-white shadow-xl ring-1 ring-accent/20'
                  : 'border-neutral-200 bg-white shadow-lg hover:shadow-xl'
              )}
            >
              {/* Featured Badge */}
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent px-4 py-1 text-sm font-semibold text-primary">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Header */}
              <div className="mb-6">
                <h3 className="mb-2 font-serif text-2xl font-bold text-primary">
                  {tier.name}
                </h3>
                <p className="mb-4 text-sm text-neutral-600">{tier.description}</p>
                
                {/* Price */}
                <div className="mb-2">
                  <span className="font-serif text-3xl font-bold text-primary">
                    {tier.priceRange}
                  </span>
                  <span className="ml-2 text-sm text-neutral-500">
                    • {tier.duration}
                  </span>
                </div>
                
                {/* Best For */}
                <p className="text-sm italic text-neutral-500">
                  Best for: {tier.bestFor}
                </p>
              </div>

              {/* Divider */}
              <div className={cn(
                'mb-6 h-px',
                tier.featured ? 'bg-accent/30' : 'bg-neutral-200'
              )} />

              {/* Included Features */}
              <div className="mb-8 flex-grow">
                <h4 className="mb-4 font-semibold text-primary">
                  What&apos;s included:
                </h4>
                <ul className="space-y-3">
                  {tier.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className={cn(
                        'mt-0.5 h-5 w-5 flex-shrink-0',
                        tier.featured ? 'text-accent' : 'text-neutral-400'
                      )} />
                      <span className="text-sm text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Button
                asChild
                variant={tier.featured ? 'primary' : 'secondary'}
                size="lg"
                className={cn(
                  'w-full',
                  tier.featured && 'bg-accent text-primary hover:bg-accent/90'
                )}
              >
                <Link href="/contact">
                  {tier.featured 
                    ? 'Book Your Consultation' 
                    : 'Learn More About This Tier'}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
            <h4 className="mb-2 font-semibold text-primary">
              Important Information
            </h4>
            <p className="text-sm text-neutral-600">{PRICING_DISCLAIMER}</p>
            
            {/* Additional Notes */}
            <div className="mt-4 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-neutral-400" />
                <span>Travel beyond 30 miles may incur additional fees</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-neutral-400" />
                <span>50% deposit required to secure your dates</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-neutral-400" />
                <span>All projects include a detailed written proposal</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-neutral-400" />
                <span>Cancellation policy: 7 days for full refund</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="mb-6 text-lg text-neutral-600">
            Not sure which tier is right for you? Let&apos;s discuss your specific needs.
          </p>
          <Button asChild size="xl" variant="outline" className="border-primary text-primary">
            <Link href="/contact">
              Schedule Your Free Assessment
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
