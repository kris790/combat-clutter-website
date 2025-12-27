'use client';

import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

/**
 * useRecaptcha Hook
 * 
 * Loads and manages reCAPTCHA v3 for form protection.
 * Returns a function to execute reCAPTCHA and get a token.
 */
export function useRecaptcha() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    if (!siteKey) {
      console.warn('reCAPTCHA site key not configured');
      return;
    }

    // Check if script is already loaded
    if (document.querySelector(`script[src*="recaptcha"]`)) {
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount (optional)
      const badge = document.querySelector('.grecaptcha-badge');
      if (badge) {
        badge.remove();
      }
    };
  }, [siteKey]);

  const executeRecaptcha = useCallback(async (action: string = 'contact_form'): Promise<string | null> => {
    if (!siteKey) {
      console.warn('reCAPTCHA not configured - returning null');
      return null;
    }

    return new Promise((resolve) => {
      if (typeof window.grecaptcha === 'undefined') {
        console.warn('reCAPTCHA not loaded yet');
        resolve(null);
        return;
      }

      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey, { action });
          resolve(token);
        } catch (error) {
          console.error('reCAPTCHA execution failed:', error);
          resolve(null);
        }
      });
    });
  }, [siteKey]);

  return { executeRecaptcha, isConfigured: !!siteKey };
}
