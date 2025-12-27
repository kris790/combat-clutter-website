import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { BRAND } from '@/lib/brand/constants';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLdMultiple } from '@/components/seo/JsonLd';
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/seo/structured-data';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Combat Clutter LLC | Atlanta Home Organization',
    template: '%s | Combat Clutter LLC'
  },
  description: BRAND.seo.defaultDescription,
  keywords: [
    'professional organizer Atlanta',
    'home organization Atlanta',
    'Combat Clutter',
    'Combat Clutter LLC',
    'luxury home organization',
    'Atlanta organizer',
    'decluttering service Atlanta',
  ],
  authors: [{ name: BRAND.legal }],
  creator: BRAND.legal,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `https://${BRAND.domain.primary}`,
    siteName: BRAND.legal,
    title: `${BRAND.legal} | Professional Home Organization`,
    description: BRAND.seo.defaultDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND.legal,
    description: BRAND.seo.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <JsonLdMultiple schemas={[getOrganizationSchema(), getWebsiteSchema()]} />
        <GoogleAnalytics />
      </head>
      <body className="min-h-screen bg-secondary font-sans antialiased" suppressHydrationWarning>
        <Header />
        <div className="pt-16 md:pt-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
