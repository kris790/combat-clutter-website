import { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand/constants';

/**
 * Robots.txt for Combat Clutter LLC
 * Controls search engine crawling behavior
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${BRAND.domain.primary}`;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
