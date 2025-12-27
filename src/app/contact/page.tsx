'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BRAND } from '@/lib/brand/constants';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRecaptcha } from '@/hooks/useRecaptcha';

type FormData = {
  // Step 1: Contact Info
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  // Step 2: Project Details
  projectType: string;
  rooms: string[];
  description: string;
  // Step 3: Timing & Budget
  timeframe: string;
  budgetRange: string;
  hearAboutUs: string;
  newsletter: boolean;
  // Honeypot (hidden)
  website: string;
};

const projectTypes = [
  'Residential Organization',
  'Move Support (Packing/Unpacking)',
  'Virtual Consulting',
  'Not Sure Yet',
];

const roomOptions = [
  'Kitchen/Pantry',
  'Primary Closet',
  'Kids Rooms',
  'Home Office',
  'Garage',
  'Living Areas',
  'Whole Home',
  'Other',
];

const timeframes = [
  'ASAP (within 2 weeks)',
  '1-2 months',
  '3+ months',
  'Flexible / Just exploring',
];

const budgetRanges = [
  'Focused Space ($1,800 - $3,500)',
  'Multi-Room ($4,500 - $8,000)',
  'Whole-Home ($12,000+)',
  'Not sure yet',
];

const hearAboutUsOptions = [
  'Google Search',
  'Instagram',
  'Facebook',
  'Friend/Family Referral',
  'Nextdoor',
  'Other',
];

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { executeRecaptcha } = useRecaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const totalSteps = 3;

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['name', 'email', 'phone', 'zipCode'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['projectType', 'description'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Get reCAPTCHA token
      const recaptchaToken = await executeRecaptcha('contact_form');
      
      // Submit to API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
          honeypot: data.website, // Honeypot field
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Submission failed');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Something went wrong. Please try again or contact us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-secondary py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-12 shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
              <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="mt-6 font-serif text-3xl font-bold text-primary">
              Thank You!
            </h1>
            <p className="mt-4 text-neutral-600">
              We&apos;ve received your consultation request. A member of the {BRAND.name} team 
              will be in touch within 24-48 hours to schedule your free consultation.
            </p>
            <p className="mt-4 text-sm text-neutral-500">
              Check your email for a confirmation message.
            </p>
            <div className="mt-8">
              <Button asChild variant="outline">
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-primary py-16 text-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold sm:text-5xl">
              Book Your Consultation
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-secondary/80">
              Take the first step toward a calmer, more organized home. 
              Fill out the form below and we&apos;ll be in touch within 24-48 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-primary">Step {currentStep} of {totalSteps}</span>
              <span className="text-neutral-500">
                {currentStep === 1 && 'Contact Info'}
                {currentStep === 2 && 'Project Details'}
                {currentStep === 3 && 'Timing & Budget'}
              </span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-neutral-200">
              <div
                className="h-2 rounded-full bg-accent transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-white p-8 shadow-sm">
            {/* Honeypot field - hidden from users, catches bots */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="website">
                Leave this field empty
                <input
                  type="text"
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('website')}
                />
              </label>
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
                <p className="font-medium">Submission Error</p>
                <p>{submitError}</p>
              </div>
            )}

            {/* Step 1: Contact Info */}
            <div className={currentStep === 1 ? 'block' : 'hidden'}>
              <h2 className="font-serif text-2xl font-bold text-primary">
                Let&apos;s Start with the Basics
              </h2>
              <p className="mt-2 text-neutral-600">
                Tell us how to reach you.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className={cn(
                      'mt-1 block w-full rounded-lg border px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
                      errors.name ? 'border-red-500' : 'border-neutral-200'
                    )}
                    placeholder="Jane Smith"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email',
                      },
                    })}
                    className={cn(
                      'mt-1 block w-full rounded-lg border px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
                      errors.email ? 'border-red-500' : 'border-neutral-200'
                    )}
                    placeholder="jane@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', { required: 'Phone number is required' })}
                    className={cn(
                      'mt-1 block w-full rounded-lg border px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
                      errors.phone ? 'border-red-500' : 'border-neutral-200'
                    )}
                    placeholder="(404) 555-0123"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-primary">
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    {...register('zipCode', { required: 'Zip code is required' })}
                    className={cn(
                      'mt-1 block w-full rounded-lg border px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
                      errors.zipCode ? 'border-red-500' : 'border-neutral-200'
                    )}
                    placeholder="30301"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.zipCode.message}</p>
                  )}
                  <p className="mt-1 text-xs text-neutral-500">
                    We serve clients within {BRAND.location.serviceRadius}.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Project Details */}
            <div className={currentStep === 2 ? 'block' : 'hidden'}>
              <h2 className="font-serif text-2xl font-bold text-primary">
                Tell Us About Your Project
              </h2>
              <p className="mt-2 text-neutral-600">
                Help us understand your organizing needs.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-primary">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    {...register('projectType', { required: 'Please select a project type' })}
                    className={cn(
                      'mt-1 block w-full rounded-lg border px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
                      errors.projectType ? 'border-red-500' : 'border-neutral-200'
                    )}
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.projectType && (
                    <p className="mt-1 text-sm text-red-500">{errors.projectType.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary">
                    Which spaces need attention? (Select all that apply)
                  </label>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {roomOptions.map((room) => (
                      <label key={room} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={room}
                          {...register('rooms')}
                          className="h-4 w-4 rounded border-neutral-300 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-neutral-600">{room}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-primary">
                    What&apos;s your biggest challenge? *
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    {...register('description', { required: 'Please describe your challenge' })}
                    className={cn(
                      'mt-1 block w-full rounded-lg border px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent',
                      errors.description ? 'border-red-500' : 'border-neutral-200'
                    )}
                    placeholder="Tell us about what's not working in your space and what you'd like to achieve..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3: Timing & Budget */}
            <div className={currentStep === 3 ? 'block' : 'hidden'}>
              <h2 className="font-serif text-2xl font-bold text-primary">
                Almost There!
              </h2>
              <p className="mt-2 text-neutral-600">
                Just a few more details to help us prepare for your consultation.
              </p>

              <div className="mt-8 space-y-6">
                <div>
                  <label htmlFor="timeframe" className="block text-sm font-medium text-primary">
                    Ideal Start Timeframe
                  </label>
                  <select
                    id="timeframe"
                    {...register('timeframe')}
                    className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">Select a timeframe</option>
                    {timeframes.map((tf) => (
                      <option key={tf} value={tf}>{tf}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="budgetRange" className="block text-sm font-medium text-primary">
                    Budget Range
                  </label>
                  <select
                    id="budgetRange"
                    {...register('budgetRange')}
                    className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">Select a budget range</option>
                    {budgetRanges.map((br) => (
                      <option key={br} value={br}>{br}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="hearAboutUs" className="block text-sm font-medium text-primary">
                    How did you hear about {BRAND.name}?
                  </label>
                  <select
                    id="hearAboutUs"
                    {...register('hearAboutUs')}
                    className="mt-1 block w-full rounded-lg border border-neutral-200 px-4 py-3 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">Select an option</option>
                    {hearAboutUsOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      {...register('newsletter')}
                      className="mt-1 h-4 w-4 rounded border-neutral-300 text-accent focus:ring-accent"
                    />
                    <span className="text-sm text-neutral-600">
                      I&apos;d like to receive organizing tips and inspiration from {BRAND.name} via email. 
                      (No spam, just helpful content!)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between border-t pt-6">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  ← Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <Button type="button" onClick={nextStep}>
                  Continue →
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              )}
            </div>
          </form>

          {/* reCAPTCHA Notice */}
          <p className="mt-4 text-center text-xs text-neutral-500">
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="https://policies.google.com/terms" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{' '}
            apply.
          </p>

          {/* Contact Info */}
          <div className="mt-12 text-center">
            <p className="text-neutral-600">
              Prefer to reach out directly?
            </p>
            <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={`mailto:${BRAND.contact.email}`}
                className="flex items-center gap-2 text-primary hover:text-accent"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {BRAND.contact.email}
              </a>
              <span className="hidden text-neutral-300 sm:inline">|</span>
              <a
                href={`tel:${BRAND.contact.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-2 text-primary hover:text-accent"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {BRAND.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
