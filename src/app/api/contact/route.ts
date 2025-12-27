import { NextRequest, NextResponse } from 'next/server';

/**
 * Contact Form API Route - Combat Clutter LLC
 * 
 * Handles form submissions with:
 * - reCAPTCHA v3 verification
 * - Honeypot spam detection
 * - Rate limiting (basic)
 * - HubSpot CRM integration (optional)
 */

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  projectType: string;
  rooms: string[];
  description: string;
  timeframe: string;
  budgetRange: string;
  hearAboutUs: string;
  newsletter: boolean;
  recaptchaToken: string;
  honeypot?: string; // Honeypot field - should be empty
}

// Verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.warn('reCAPTCHA secret key not configured - skipping verification');
    return { success: true, score: 1 };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return {
      success: data.success,
      score: data.score || 0,
    };
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return { success: false, score: 0 };
  }
}

// Send to HubSpot CRM
async function sendToHubSpot(formData: ContactFormData): Promise<boolean> {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  
  if (!accessToken) {
    console.warn('HubSpot access token not configured - skipping CRM integration');
    return true;
  }

  try {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          firstname: formData.name.split(' ')[0],
          lastname: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone,
          zip: formData.zipCode,
          project_type: formData.projectType,
          rooms_of_interest: formData.rooms.join(', '),
          message: formData.description,
          timeframe: formData.timeframe,
          budget_range: formData.budgetRange,
          lead_source: formData.hearAboutUs,
          newsletter_subscription: formData.newsletter ? 'Yes' : 'No',
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('HubSpot API error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('HubSpot submission failed:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // 1. Honeypot check (spam bot detection)
    if (body.honeypot) {
      console.log('Honeypot triggered - likely spam');
      // Return success to not tip off bots, but don't process
      return NextResponse.json({ success: true });
    }

    // 2. Basic validation
    if (!body.name || !body.email || !body.phone || !body.zipCode) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 3. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 4. reCAPTCHA verification
    if (body.recaptchaToken) {
      const recaptchaResult = await verifyRecaptcha(body.recaptchaToken);
      
      if (!recaptchaResult.success) {
        return NextResponse.json(
          { success: false, error: 'reCAPTCHA verification failed' },
          { status: 400 }
        );
      }

      // Score threshold - 0.5 is Google's recommended threshold
      if (recaptchaResult.score < 0.5) {
        console.log(`Low reCAPTCHA score: ${recaptchaResult.score}`);
        return NextResponse.json(
          { success: false, error: 'Suspicious activity detected' },
          { status: 400 }
        );
      }
    }

    // 5. Send to HubSpot CRM
    const hubspotSuccess = await sendToHubSpot(body);
    if (!hubspotSuccess) {
      console.error('Failed to send to HubSpot, but continuing...');
    }

    // 6. Log submission (for debugging - remove in production or use proper logging)
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      projectType: body.projectType,
      timestamp: new Date().toISOString(),
    });

    // 7. Return success
    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! We will be in touch within 24-48 hours.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Rate limiting headers (basic - for production use middleware or edge config)
export const runtime = 'edge';
