# Combat Clutter LLC - Website Launch Checklist

> **Project Status:** Phase 1 MVP Development  
> **Last Updated:** December 13, 2025

---

## ✅ Completed

### Project Setup
- [x] Initialize Next.js 15 project with App Router
- [x] Configure TypeScript with strict mode
- [x] Set up Tailwind CSS with brand colors
- [x] Create folder structure per spec
- [x] Install dependencies (npm install)
- [x] Create `.gitignore`
- [x] Create `.env.example` template

### Brand Foundation
- [x] Create brand constants file (`src/lib/brand/constants.ts`)
- [x] Set up VS Code snippets for brand consistency
- [x] Create brand validation script (`scripts/validate-brand.js`)

### Core Components
- [x] Button component with variants
- [x] Header with responsive navigation
- [x] Footer with contact info and social links
- [x] Hero section with video background
- [x] Pricing tiers section

### Pages
- [x] Home page (`/`)
- [x] Services page (`/services`)
- [x] Portfolio page (`/portfolio`)
- [x] About page (`/about`)
- [x] Contact page (`/contact`) with multi-step form
- [x] Privacy Policy (`/privacy`)
- [x] Terms of Service (`/terms`)

### SEO & Technical
- [x] Dynamic sitemap generation (`/sitemap.xml`)
- [x] Robots.txt (`/robots.txt`)
- [x] Structured data (JSON-LD) for LocalBusiness, Service, Website
- [x] Meta tags and Open Graph setup
- [x] Page-level metadata for all pages

### Form & Security
- [x] Multi-step contact form with validation
- [x] reCAPTCHA v3 integration (code ready)
- [x] Honeypot spam protection
- [x] API route for form submission
- [x] HubSpot CRM integration (code ready)

---

## 🔲 Pre-Launch Requirements

### Content Needed from Client
- [ ] **Hero video** - 10-15 second loop of organization transformation (MP4, <2MB)
- [ ] **Hero mobile image** - Fallback image for mobile devices (JPG, 1200x800)
- [ ] **Logo** - PNG with transparent background (multiple sizes: 200px, 400px)
- [ ] **Founder photo** - Professional headshot for About page
- [ ] **Team photos** - If applicable
- [ ] **Portfolio projects** (10-15 minimum):
  - [ ] Before photo for each project
  - [ ] After photo for each project
  - [ ] 2-3 detail shots per project
  - [ ] 150-word description per project
  - [ ] Client testimonial (optional per project)
- [ ] **Testimonials** (5-8):
  - [ ] Quote text (50-75 words each)
  - [ ] Client first name and last initial
  - [ ] Project type
  - [ ] Client photo (optional)
- [ ] **Verify contact information**:
  - [ ] Email address
  - [ ] Phone number
  - [ ] Service area details
- [ ] **Social media handles** - Confirm Instagram, Facebook, LinkedIn

### Third-Party Accounts & API Keys
- [ ] **Domain** - Purchase `combatclutter.com` (if not already owned)
- [ ] **Vercel account** - For hosting (free tier works for launch)
- [ ] **Google reCAPTCHA v3**:
  - [ ] Register at https://www.google.com/recaptcha/admin
  - [ ] Get Site Key and Secret Key
  - [ ] Add to `.env.local`
- [ ] **HubSpot CRM**:
  - [ ] Create free HubSpot account
  - [ ] Generate API access token
  - [ ] Create custom properties for form fields (project_type, rooms_of_interest, etc.)
  - [ ] Add to `.env.local`
- [ ] **Google Analytics 4**:
  - [ ] Create GA4 property
  - [ ] Get Measurement ID (G-XXXXXXXXXX)
  - [ ] Add tracking script to layout
- [ ] **Google Search Console**:
  - [ ] Verify domain ownership
  - [ ] Submit sitemap
- [ ] **Resend** (for email notifications):
  - [ ] Create account at https://resend.com
  - [ ] Verify sending domain
  - [ ] Get API key
  - [ ] Add to `.env.local`

### Environment Variables (`.env.local`)
```env
# Required for production
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_key
RECAPTCHA_SECRET_KEY=your_key
HUBSPOT_ACCESS_TOKEN=your_token
NEXT_PUBLIC_SITE_URL=https://combatclutter.com

# Optional but recommended
RESEND_API_KEY=your_key
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Assets to Create/Upload
- [ ] Upload hero video to `/public/videos/hero-organization.mp4`
- [ ] Upload hero mobile image to `/public/images/hero-mobile.jpg`
- [ ] Upload logo to `/public/images/logo.png`
- [ ] Upload OG image to `/public/images/og-image.jpg` (1200x630)
- [ ] Upload favicon to `/public/favicon.ico`
- [ ] Upload all portfolio images to `/public/images/portfolio/`
- [ ] Upload founder/team photos to `/public/images/team/`

---

## 🔲 Development Tasks

### Before First Deployment
- [ ] Create `.env.local` with all required variables
- [ ] Replace placeholder portfolio projects with real data
- [ ] Update contact phone number in brand constants
- [ ] Update contact email in brand constants
- [x] Add Google Analytics tracking code
- [ ] Test contact form submission end-to-end
- [x] Run `npm run validate-brand` to check brand consistency
- [x] Run `npm run build` to ensure no build errors
- [x] Run `npm run lint` to check for code issues

### Testing Checklist
- [ ] **Desktop browsers**:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] **Mobile browsers**:
  - [ ] iOS Safari
  - [ ] Android Chrome
- [ ] **Responsive breakpoints**:
  - [ ] Mobile (< 640px)
  - [ ] Tablet (768px)
  - [ ] Desktop (1024px+)
- [ ] **Forms**:
  - [ ] Contact form validation
  - [ ] Form submission success
  - [ ] Form error handling
  - [ ] reCAPTCHA working (check network tab)
- [ ] **Navigation**:
  - [ ] All links work
  - [ ] Mobile menu opens/closes
  - [ ] Active page highlighting
- [ ] **Performance**:
  - [ ] Lighthouse score > 90 (Performance)
  - [ ] Lighthouse score > 90 (Accessibility)
  - [ ] LCP < 2.5s
- [ ] **SEO**:
  - [ ] Sitemap accessible at /sitemap.xml
  - [ ] Robots.txt accessible at /robots.txt
  - [ ] Meta titles correct on all pages
  - [ ] OG images render in social preview

---

## 🔲 Deployment

### Vercel Deployment
- [ ] Connect GitHub repository to Vercel
- [ ] Add environment variables in Vercel dashboard
- [ ] Configure custom domain (`combatclutter.com`)
- [ ] Set up `www` redirect to non-www (or vice versa)
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Deploy production build

### DNS Configuration
- [ ] Point domain to Vercel nameservers
  - OR add CNAME record for `www` pointing to `cname.vercel-dns.com`
  - AND add A record for `@` pointing to Vercel IP
- [ ] Wait for DNS propagation (up to 48 hours)
- [ ] Verify SSL certificate is active

---

## 🔲 Post-Launch

### Immediate (Week 1)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify Google Analytics tracking
- [ ] Test contact form in production
- [ ] Monitor for errors in Vercel logs
- [ ] Share website on social media
- [ ] Update Instagram/Facebook bio with website link

### Ongoing
- [ ] Monitor Core Web Vitals in Vercel dashboard
- [ ] Check for 404 errors in Search Console
- [ ] Review form submissions in HubSpot
- [ ] Add new portfolio projects as completed
- [ ] Gather and add client testimonials
- [ ] Consider Phase 2 features (blog, filters, etc.)

---

## 📋 Phase 2 Features (Future)

These are out of scope for MVP but planned for later:

- [ ] Blog/Inspiration Hub with CMS (Sanity)
- [ ] Advanced portfolio filtering by room type
- [ ] Before/after image slider component
- [ ] Email marketing integration (ConvertKit/Mailchimp)
- [ ] Client testimonial carousel
- [ ] Video testimonials
- [ ] Cookie consent banner (GDPR)
- [ ] Live chat widget

---

## 📞 Key Contacts

| Role | Name | Contact |
|------|------|---------|
| Client | [TBD] | [TBD] |
| Developer | [TBD] | [TBD] |
| Designer | [TBD] | [TBD] |

---

## 📅 Timeline

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Development Complete | [TBD] | ✅ Done |
| Content Received | [TBD] | 🔲 Pending |
| Testing Complete | [TBD] | 🔲 Pending |
| Staging Review | [TBD] | 🔲 Pending |
| Production Deploy | [TBD] | 🔲 Pending |
| Go Live | [TBD] | 🔲 Pending |

---

*Generated for Combat Clutter LLC - December 2025*
