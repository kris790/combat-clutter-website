/**
 * Combat Clutter LLC - Brand Constants
 * Central source of truth for all brand information
 * 
 * Usage:
 * - Use BRAND.legal for legal contexts (copyright, terms, privacy)
 * - Use BRAND.name for conversational contexts (marketing, CTAs)
 */

export const BRAND = {
  /** Legal name - use for copyright, terms, legal disclaimers */
  legal: 'Combat Clutter LLC',
  
  /** Short name - use for marketing, CTAs, conversational text */
  name: 'Combat Clutter',
  
  /** Brand tagline */
  tagline: 'Reclaim Your Space, Restore Your Calm',
  
  /** Brand positioning */
  positioning: 'Luxury Necessity',
  
  /** Location information */
  location: {
    city: 'Atlanta',
    state: 'GA',
    stateFull: 'Georgia',
    metro: 'Greater Atlanta',
    serviceRadius: '30 miles from Atlanta',
    display: 'Atlanta, GA',
  },
  
  /** Established information */
  established: {
    year: 2023,
    display: 'Serving Atlanta since 2023',
  },
  
  /** Domain information */
  domain: {
    primary: 'combatclutter.com',
    staging: 'staging.combatclutter.com',
    development: 'dev.combatclutter.com',
  },
  
  /** Social media handles */
  social: {
    instagram: '@combatclutteratl',
    facebook: 'CombatClutterLLC',
    linkedin: 'combat-clutter-llc',
  },
  
  /** Contact information */
  contact: {
    email: 'hello@combatclutter.com',
    phone: '(404) 555-0123', // Placeholder - update with real number
  },
  
  /** Copyright text generator */
  copyright: (year = new Date().getFullYear()) => 
    `© ${year} Combat Clutter LLC. All rights reserved.`,
  
  /** SEO metadata */
  seo: {
    titleTemplate: (pageTitle: string) => 
      `${pageTitle} | Combat Clutter LLC | Atlanta Home Organization`,
    defaultDescription: 
      'Combat Clutter LLC provides luxury home organization services in Atlanta, GA. Transparent pricing, proven process, stunning results. Serving Atlanta since 2023.',
  },
} as const;

/** Brand colors - matches Tailwind config */
export const COLORS = {
  primary: '#1A1A1A',      // Charcoal - Authority, luxury
  secondary: '#F5F5F0',    // Off-white - Clean, calm
  accent: '#D4AF37',       // Gold - Premium touch (use sparingly)
  neutral: {
    600: '#6B6B6B',
    200: '#E0E0E0',
    white: '#FFFFFF',
  },
} as const;

/** Typography settings */
export const TYPOGRAPHY = {
  fonts: {
    serif: 'Playfair Display, serif',    // Headings - Classic, elegant
    sans: 'Inter, sans-serif',           // Body - Modern, readable
  },
  sizes: {
    mobileBody: '14px',
    desktopBody: '16px',
  },
} as const;

/** Pricing tiers for services page */
export const PRICING_TIERS = [
  {
    id: 'focused-space',
    name: 'Focused Space',
    description: 'Perfect for a single problem area',
    priceRange: '$1,800 – $3,500',
    duration: '1–2 days (4–8 hours)',
    includes: [
      'One room or zone (e.g., primary closet, pantry, home office)',
      'Decluttering consultation + hands-on execution',
      'Custom storage solution recommendations',
      'Product shopping list with direct purchase links',
      '30-day maintenance check-in call',
    ],
    bestFor: 'Clients who want to test our process or address a specific pain point',
    featured: false,
  },
  {
    id: 'multi-room',
    name: 'Multi-Room Refresh',
    description: 'Our most popular package',
    priceRange: '$4,500 – $8,000',
    duration: '3–5 days',
    includes: [
      '2–4 rooms or zones',
      'Everything in Focused Space, plus:',
      'Cohesive whole-floor design strategy',
      'Labeled, photo-documented systems',
      'Household inventory spreadsheet',
      '60-day maintenance support (email + one call)',
    ],
    bestFor: 'Families preparing for a new chapter or reclaiming shared living spaces',
    featured: true,
  },
  {
    id: 'whole-home',
    name: 'Whole-Home Transformation',
    description: 'Complete peace of mind',
    priceRange: '$12,000 – $25,000+',
    duration: '2–4 weeks',
    includes: [
      'Every room, closet, and storage area',
      'Everything in Multi-Room Refresh, plus:',
      'Priority scheduling and dedicated project lead',
      'Custom cabinetry/closet system design coordination',
      'Donation pickup scheduling and drop-off',
      '90-day VIP maintenance support (unlimited calls)',
    ],
    bestFor: 'Clients seeking a total reset with white-glove service',
    featured: false,
  },
] as const;

export const PRICING_DISCLAIMER = 
  'Final pricing depends on scope, product selections, travel distance within the Atlanta metro area, and project complexity. Storage products, labels, and specialty items are billed at cost + 15%. We provide a detailed line-item estimate before any work begins.';

/** Hero content */
export const HERO_CONTENT = {
  headline: 'Reclaim Your Space, Restore Your Calm',
  subheadline: 'Bespoke organization solutions for discerning homeowners in Atlanta',
  primaryCta: {
    text: 'Book Your Consultation',
    href: '/contact',
  },
  secondaryCta: {
    text: 'View Our Work',
    href: '/portfolio',
  },
  trustIndicator: 'Serving Atlanta since 2023',
} as const;

export type PricingTier = typeof PRICING_TIERS[number];
