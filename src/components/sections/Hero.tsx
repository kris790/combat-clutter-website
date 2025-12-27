'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND, HERO_CONTENT } from '@/lib/brand/constants';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Simple loading placeholder until hydrated
  if (!isMounted) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-primary">
        <div className="container-brand px-4 text-center">
          <div className="h-96" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-neutral-900 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-neutral-900" />
        {/* Optional: Add pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="container-brand relative z-10 mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Trust Indicator */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            <span className="text-sm font-medium text-white">
              {BRAND.established.display}
            </span>
          </div>

          {/* Main Headline - FIXED SIZE */}
          <h1 className="mb-6 font-serif text-3xl font-bold leading-snug text-white sm:text-4xl md:text-5xl">
            Reclaim Your Space,
            <span className="block mt-4">Restore Your Calm</span>
          </h1>

          {/* Subheadline - FIXED SIZE */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/90 sm:text-xl">
            {HERO_CONTENT.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="primary"
              className="min-w-[200px] bg-accent text-primary hover:bg-accent/90"
            >
              <Link href={HERO_CONTENT.primaryCta.href}>
                {HERO_CONTENT.primaryCta.text}
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="min-w-[200px] border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Link href={HERO_CONTENT.secondaryCta.href}>
                {HERO_CONTENT.secondaryCta.text}
              </Link>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="h-8 w-px bg-white/50" />
          </div>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
    </section>
  );
}
