import { BRAND } from '@/lib/brand/constants';

/**
 * Structured Data (JSON-LD) for Combat Clutter LLC
 * Schema.org markup for enhanced search results
 */

// Organization Schema
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://${BRAND.domain.primary}/#organization`,
    name: BRAND.legal,
    alternateName: BRAND.name,
    description: BRAND.seo.defaultDescription,
    url: `https://${BRAND.domain.primary}`,
    logo: `https://${BRAND.domain.primary}/images/logo.png`,
    image: `https://${BRAND.domain.primary}/images/og-image.jpg`,
    telephone: BRAND.contact.phone,
    email: BRAND.contact.email,
    foundingDate: BRAND.established.year.toString(),
    address: {
      '@type': 'PostalAddress',
      addressLocality: BRAND.location.city,
      addressRegion: BRAND.location.state,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.749,
      longitude: -84.388,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 33.749,
        longitude: -84.388,
      },
      geoRadius: '48280', // 30 miles in meters
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    sameAs: [
      `https://instagram.com/${BRAND.social.instagram.replace('@', '')}`,
      `https://facebook.com/${BRAND.social.facebook}`,
      `https://linkedin.com/company/${BRAND.social.linkedin}`,
    ],
  };
}

// Service Schema
export function getServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Home Organization',
    provider: {
      '@type': 'LocalBusiness',
      name: BRAND.legal,
      url: `https://${BRAND.domain.primary}`,
    },
    areaServed: {
      '@type': 'City',
      name: BRAND.location.city,
      containedInPlace: {
        '@type': 'State',
        name: BRAND.location.stateFull,
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Home Organization Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Focused Space',
            description: 'Single room or zone organization',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'USD',
            minPrice: 1800,
            maxPrice: 3500,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Multi-Room Refresh',
            description: '2-4 rooms organization package',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'USD',
            minPrice: 4500,
            maxPrice: 8000,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Whole-Home Transformation',
            description: 'Complete home organization',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'USD',
            minPrice: 12000,
          },
        },
      ],
    },
  };
}

// Website Schema
export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.legal,
    url: `https://${BRAND.domain.primary}`,
    description: BRAND.seo.defaultDescription,
    publisher: {
      '@type': 'Organization',
      name: BRAND.legal,
      logo: {
        '@type': 'ImageObject',
        url: `https://${BRAND.domain.primary}/images/logo.png`,
      },
    },
  };
}

// Breadcrumb Schema Generator
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// FAQ Schema Generator
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
