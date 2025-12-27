import { Hero } from '@/components/sections/Hero';
import { PricingTiers } from '@/components/sections/PricingTiers';

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Pricing Section */}
      <PricingTiers />
    </main>
  );
}
