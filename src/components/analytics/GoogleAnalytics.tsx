import Script from 'next/script';

/**
 * Google Analytics 4 Component
 * 
 * Add your GA4 Measurement ID to .env.local:
 * NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

/**
 * Track custom events in Google Analytics
 * 
 * Usage:
 * import { trackEvent } from '@/components/analytics/GoogleAnalytics';
 * trackEvent('contact_form_submit', { step: 'completed' });
 */
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).gtag) {
    ((window as unknown as Record<string, unknown>).gtag as (command: string, action: string, params?: Record<string, unknown>) => void)('event', action, params);
  }
}
